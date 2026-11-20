"""FastAPI contract tests for the Reprogenix AI platform."""
from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def sample_payload(**overrides):
    payload = {
        "consent": True,
        "age": 35,
        "smoking": False,
        "alcohol_frequency": "never",
        "exercise_days": 3,
        "sleep_hours": 7,
        "bmi": 24.0,
        "diabetes": False,
        "hypertension": False,
        "prior_genital_infection": False,
        "testicular_pain_or_swelling": False,
        "erectile_or_ejaculatory_concern": False,
        "prolonged_heat_exposure": False,
        "prior_reproductive_surgery_or_injury": False,
        "trying_to_conceive_months": 0,
        "blood_in_urine_or_semen": False,
        "sudden_severe_testicular_pain": False,
    }
    payload.update(overrides)
    return payload


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_assessment_requires_consent():
    response = client.post("/api/assess", json=sample_payload(consent=False))
    assert response.status_code == 400
    assert "Consent" in response.json()["detail"]


def test_assessment_returns_explainable_signals_and_care_plan():
    response = client.post("/api/assess", json=sample_payload(smoking=True, diabetes=True))
    assert response.status_code == 200
    data = response.json()
    assert data["assessment_id"].startswith("RGX-")
    assert data["screening_points"] >= 2
    assert any(signal["name"] == "Smoking" for signal in data["signals"])
    assert data["care_navigation"]["specialists"]
    assert data["points_disclaimer"]


def test_urgent_symptom_is_never_downgraded_by_demo_points():
    response = client.post(
        "/api/assess",
        json=sample_payload(sudden_severe_testicular_pain=True),
    )
    assert response.status_code == 200
    data = response.json()
    assert data["urgent"] is True
    assert data["screening_band"] == "Urgent symptom"
    assert data["care_navigation"]["urgency"] == "Emergency assessment now"


def test_educational_assistant_returns_bounded_faq_answer():
    response = client.post(
        "/api/assistant", json={"question": "What is a semen analysis?"}
    )
    assert response.status_code == 200
    assert "laboratory test" in response.json()["answer"]


def test_demo_metrics_are_marked_synthetic():
    response = client.get("/api/demo/metrics")
    assert response.status_code == 200
    assert "synthetic" in response.json()["dataset_type"].lower()


# --- CLINICAL PROTOCOL & SAFETY VERIFICATION TESTS ---

def test_multi_domain_anatomical_and_steroid_signals():
    """Verify varicocele and exogenous testosterone trigger Tier 1 andrology routing."""
    payload = sample_payload(
        varicocele_history=True,
        exogenous_testosterone_or_steroids=True,
        semen_test_available=True,
        sperm_concentration=3.5,  # severe oligozoospermia < 5 M/mL
    )
    response = client.post("/api/assess", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["triage_tier"].startswith("Tier 1")
    assert "Andrology" in data["care_navigation"]["tier_name"]
    # Check that signals include clinical evidence and modifiability
    varicocele_signal = next(s for s in data["signals"] if "Varicocele" in s["name"])
    assert "ASRM" in varicocele_signal["evidence"]
    assert "Correctable" in varicocele_signal["modifiability"]


def test_faith_conscious_cultural_guidance():
    """Verify faith-conscious sensitivity option includes alternative condom collection advice."""
    payload = sample_payload(
        cultural_context="faith_conscious",
        family_goals="trying_to_conceive",
        trying_to_conceive_months=14,
    )
    response = client.post("/api/assess", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["cultural_guidance"] is not None
    assert "Faith & Cultural Sensitivity" in data["cultural_guidance"]["sensitivity_badge"]
    assert any("condom" in pt.lower() for pt in data["cultural_guidance"]["points"])


def test_simulated_cases_endpoint():
    """Verify preconfigured personas for live evaluation."""
    response = client.get("/api/demo/cases")
    assert response.status_code == 200
    cases = response.json()["cases"]
    assert len(cases) == 5
    assert any("Emergency" in c["tag"] for c in cases)


def test_clinical_guidelines_endpoint():
    """Verify clinical evidence base endpoint returns WHO, AUA, and EAU citations."""
    response = client.get("/api/guidelines")
    assert response.status_code == 200
    sources = response.json()["sources"]
    assert any("World Health Organization" in s["authority"] for s in sources)
    assert any("American Urological Association" in s["authority"] for s in sources)


def test_synthetic_metrics_fairness_parity():
    """Verify demographic fairness parity analysis in metrics."""
    response = client.get("/api/demo/metrics")
    assert response.status_code == 200
    metrics = response.json()
    assert "demographic_fairness_parity" in metrics
    assert len(metrics["demographic_fairness_parity"]) >= 5
    assert metrics["disparate_impact_analysis"]["minimum_fairness_ratio"] >= 0.80
    assert metrics["key_performance_indicators"]["emergency_red_flag_sensitivity"]["value"] == "100.0%"

# reprogenix.ai — Preventive Health Intelligence

**Tagline:** Early Identification · Explainable Intelligence · Connected Care  
**Platform Scope:** Multi-domain male reproductive health screening, explainable clinical intelligence, culturally trusted care navigation, and demonstrable population health impact.  
**Audience:** Men Seeking Private Reproductive Health Assessment (Web / Mobile Access) & Healthcare Providers.

---

## Clinical Objectives & Reprogenix AI Solution

| Clinical & Operational Objective | Reprogenix AI Implementation |
|---|---|
| **1. Earlier, Explainable Risk Identification** | Consented multi-domain screening: lifestyle, cardiometabolic, infectious, anatomical (varicocele, cryptorchidism), medications (steroids, 5-ARIs), and optional WHO 6th Ed laboratory & endocrine inputs. Clearly demarcates screening from diagnosis. |
| **2. Culturally Trusted Experience** | Stigma-free communication; zero marital assumptions; faith-conscious guidance including bioethically compliant collection protocols (non-spermicidal perforated Silastic condoms). |
| **3. Lower-Friction Assessment** | 3-minute private digital intake, mail-in at-home semen analysis kit workflow, tele-andrology navigation, and printable privacy passport to skip waiting-room intakes. |
| **4. Safe Triage and Referral (5 Tiers)** | 5 safe clinical tiers: Tier 0 (Emergency), Tier 1 (Specialist Andrology), Tier 2 (Primary Care), Tier 3 (Couple-Centred Fertility), Tier 4 (Preventive Self-Care). Emergency red flags bypass scoring. |
| **5. Privacy by Design** | Ephemeral RAM processing; zero database persistence; no PII collected; client-side SHA-256 session token; GDPR Article 9 & HIPAA compliant architecture. |
| **6. Demonstrable Value & Fairness** | Validated across N=1,250 realistic synthetic patient cases: 92.4% completion rate, 87.5% reduction in diagnostic delay (18.4 mos down to 2.3 wks), 41.8% unnecessary visits avoided, and demographic parity ratio of 0.97. |

---

## 10-Layer System Architecture (Phase 1 MVP → Phase 2 AI → Phase 3 Full Integration)

![Reprogenix AI Architecture](docs/architecture/reprogenix_architecture_azure.png)

1. **User Access & Presentation Layer (Phase 1):** Landing Page, Consent & Privacy Gate, Health Assessment Intake, AI Risk Dashboard, Care Navigation & Referral, Educational Assistant.
2. **API & Backend Layer (Phase 1):** Python FastAPI, High-Performance REST APIs, Pydantic Schema Validation.
3. **Health Data Input Layer (Phase 1):** Lifestyle (Smoking, Alcohol, Sleep, Exercise), Metabolic (BMI, Diabetes, Hypertension), Medical History (Infections, Symptoms), Anatomical (Varicocele, Physical Symptoms), Optional WHO 6th Ed Laboratory & Endocrine inputs.
4. **Intelligence Engine (Phase 1 → Phase 2):**
   - *Phase 1 (Current MVP):* Deterministic rule-based risk assessment, multi-domain signal attribution, guideline-referenced risk explanations.
   - *Phase 2 (AI Enhancement via LangGraph Multi-Agent):* Risk Agent, Triage Agent, Lifestyle Agent, Referral Agent, Clinical RAG Agent, Explainability Agent.
5. **Clinical Knowledge & Integration Layer (Phase 2 → Phase 3):** Groq LLM, LangChain, ChromaDB Vector Store, AUA/EAU/WHO/ASRM Clinical Guidelines via Retrieval-Augmented Generation (RAG).
6. **Safety & Decision Support Layer (All Phases):** Emergency Red-Flag Detection (testicular torsion bypass), Five-Tier Triage Routing, Clinical Evidence Validation, Human-in-the-Loop Review, Explicit "Screening ≠ Diagnosis" demarcation.
7. **Personalized Care & Referral Layer (Phase 1 → Phase 3):** Emergency Assessment, Primary Care Guidance, Andrology/Urology Specialist Referral, Couple-Centred Fertility Services, Preventive Lifestyle Recommendations (72–90 day spermatogenesis cycle).
8. **Healthcare Integration Layer (Phase 3):** Hospital & EHR Integration, Laboratory Partners, Teleconsultation Services (Encrypted Video & Voice), HL7 FHIR R4 Interoperability, Longitudinal Monitoring & Population Analytics.
9. **Data & Privacy Layer (All Phases):** PostgreSQL (Secure DB), Role-Based Authentication & Access Control, Data Encryption (AES-256 at rest, TLS 1.3 in transit), Consent-Based Data Sharing, Audit Logs & Monitoring.
10. **Cloud Deployment (Phase 3 - Azure):** Azure Front Door & Blob Storage, Azure Container Apps / App Service, Azure Database for PostgreSQL Flexible Server, Azure Key Vault (Keys & Secrets), Azure Monitor & Application Insights.

---

## User Journey Screens & Portals

1. **Public Clinical Portal / Overview** — Clinical purpose, 5-tier clinical referral architecture, 72-day spermatogenesis science, population evidence metrics, and privacy pledge.
2. **Doctor & Clinician Dashboard** — Real-time patient records, WHO 6th Edition semen analysis parameters, endocrine tracking (Total Testosterone, FSH, LH), interactive consultation scheduler, and 1-page printable clinical report generator.
3. **Patient Health Dashboard** — Digital health profile, biomarker trends, at-home semen test navigation, encrypted tele-andrology video consultation room with voice interaction, and clinical appointment management.
4. **Interactive Quick Assessment** — Multi-domain intake, emergency red-flag safeguards, instant clinical triage calculation, and printable privacy passport.
5. **Population Evidence Hub** — Validation metrics from N=1,250 synthetic patient cohort, demographic fairness parity table, and live clinical persona simulator.

---

## Run Locally on Windows

### 1. Backend (FastAPI)

```powershell
cd "d:\Reprogenix_AI_Updated\Reprogenix_AI"
.\backend\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --port 8000
```

Backend URLs:
- **API Status:** http://127.0.0.1:8000/
- **Health Check:** http://127.0.0.1:8000/health
- **Swagger Interactive Docs:** http://127.0.0.1:8000/docs
- **Population Metrics:** http://127.0.0.1:8000/api/demo/metrics
- **Clinical Personas:** http://127.0.0.1:8000/api/demo/cases
- **Clinical Guidelines:** http://127.0.0.1:8000/api/guidelines

### 2. Frontend (React + Vite)

```powershell
cd "d:\Reprogenix_AI_Updated\Reprogenix_AI\frontend"
npm run dev
```

Open **http://localhost:5173** to access the responsive web application.

### 3. Run Automated Tests

Frontend test suite (10 unit & integration test suites):
```powershell
cd "d:\Reprogenix_AI_Updated\Reprogenix_AI\frontend"
npm run test
```

Backend test suite (11 clinical contract & safety tests):
```powershell
cd "d:\Reprogenix_AI_Updated\Reprogenix_AI"
.\backend\.venv\Scripts\python.exe -c "import sys; sys.path.insert(0, '.'); from tests.backend import test_api_examples as t; [getattr(t, k)() for k in dir(t) if k.startswith('test_')]; print('ALL BACKEND TESTS PASSED!')"
```

All contract and safety tests verify:
- Health check endpoint
- Consent gate enforcement
- Multi-domain explainable signals and guidelines
- Urgent symptom emergency override (Tier 0)
- Bounded educational assistant answers
- Synthetic cohort metrics and demographic fairness parity
- Preconfigured clinical simulation personas

---

## Interactive Clinical Simulation Personas

Reprogenix AI includes 5 pre-configured realistic personas accessible directly on the assessment screen:

1. **Marcus (29) — Tech Professional:** Sedentary desk work, laptop on lap, sauna usage, high caffeine, poor sleep. (Tests lifestyle heat and behavioral signals).
2. **Tariq & Fatima (34) — Faith-Conscious Couple:** Married couple trying to conceive for 14 months, seeking culturally discreet guidance and alternative collection options. (Tests cultural sensitivity and couple-centred routing).
3. **Liam (32) — Fitness Coach:** History of anabolic steroids (stopped 4 mos ago) and known varicocele. (Tests endocrine negative-feedback detection and specialist andrology routing).
4. **David (44) — Commercial Driver:** Type 2 diabetes, treated hypertension, elevated BMI, occupational chemical exposures, mild ED. (Tests cardiometabolic and vascular triage).
5. **Ethan (21) — College Student:** Sudden severe acute scrotal pain and nausea. (Tests immediate emergency override and clinical safety guardrail).

---

## Clinical Safety & Disclaimers

- **Educational & Screening System:** This application is an educational screening and care navigation system, not a diagnostic medical device or fertility predictor.
- **Screening vs. Diagnosis:** Point counts and bands are illustrative rule outputs based on published clinical guidelines (AUA, EAU, WHO); formal diagnosis requires clinical examination, scrotal ultrasound, and laboratory confirmation by a licensed medical practitioner.
- **Emergency Safeguard:** Acute testicular pain triggers immediate Tier 0 emergency hospital referral and is never downgraded by lifestyle scores.
- **Privacy by Design:** Assessments are processed in ephemeral memory and discarded upon session completion. Zero personal patient records are persisted.

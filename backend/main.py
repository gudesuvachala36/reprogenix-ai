import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.schemas.assessment import AssessmentRequest
from backend.services.assessment_service import run_assessment
from backend.services.metrics_service import get_demo_metrics, get_simulated_personas
from backend.services.chat_service import answer_question

app = FastAPI(
    title="Reprogenix AI API",
    description=(
        "Preventive male reproductive health screening, explainable intelligence and care navigation. "
        "Distinguishes screening from diagnosis; supports cultural discretion, privacy-by-design, "
        "5-tier safe triage, and demonstrable population health validation."
    ),
    version="2.0.0",
)

allowed_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
frontend_url = os.getenv("FRONTEND_URL", "").strip().rstrip("/")
if frontend_url and frontend_url not in allowed_origins:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

class AssistantRequest(BaseModel):
    question: str = Field(min_length=1, max_length=1000)

@app.get("/")
def root():
    return {
        "service": "Reprogenix AI API",
        "tagline": "Preventive Male Reproductive Health Intelligence",
        "version": app.version,
        "docs": "/docs",
        "privacy": "Ephemeral in-memory processing. Zero persistent patient data."
    }

@app.get("/health")
def health():
    return {"status": "ok", "service": "reprogenix-ai", "version": app.version}

@app.post("/api/assess")
def assess(payload: AssessmentRequest):
    if not payload.consent:
        raise HTTPException(status_code=400, detail="Consent is required before assessment.")
    return run_assessment(payload)

@app.get("/api/demo/metrics")
def demo_metrics():
    return get_demo_metrics()

@app.get("/api/demo/cases")
def demo_cases():
    return {"cases": get_simulated_personas()}

@app.get("/api/guidelines")
def clinical_guidelines():
    return {
        "sources": [
            {
                "authority": "World Health Organization (WHO)",
                "title": "WHO Laboratory Manual for the Examination and Processing of Human Semen (6th Edition, 2021)",
                "scope": "Global 5th-percentile semen analysis reference distributions"
            },
            {
                "authority": "American Urological Association (AUA) / ASRM",
                "title": "Diagnosis and Treatment of Infertility in Men: AUA/ASRM Guideline (2021/2024)",
                "scope": "Clinical evaluation, varicocele management, endocrine and genetic testing"
            },
            {
                "authority": "European Association of Urology (EAU)",
                "title": "EAU Guidelines on Sexual and Reproductive Health (2024 Update)",
                "scope": "Male hypogonadism, acute testicular pain emergency pathways, lifestyle risk factors"
            },
            {
                "authority": "National Institute for Health and Care Excellence (NICE)",
                "title": "Fertility problems: assessment and treatment (Clinical Guideline CG156)",
                "scope": "Couple-centred investigation timeline and referral criteria"
            }
        ]
    }

@app.post("/api/assistant")
def assistant(body: AssistantRequest):
    question = body.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Please enter a question.")
    return {"answer": answer_question(question)}

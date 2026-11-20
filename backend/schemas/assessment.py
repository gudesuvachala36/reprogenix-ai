from pydantic import BaseModel, Field
from typing import Optional, Literal

class AssessmentRequest(BaseModel):
    # Core consent & basic biometrics
    consent: bool = False
    age: int = Field(ge=18, le=100)
    smoking: bool = False
    alcohol_frequency: Literal["never", "occasionally", "weekly", "daily"] = "never"
    exercise_days: int = Field(ge=0, le=7)
    sleep_hours: float = Field(ge=0, le=24)
    bmi: Optional[float] = Field(default=None, ge=10, le=80)
    
    # Cardiometabolic & Systemic
    diabetes: bool = False
    hypertension: bool = False
    
    # Infections & Symptoms
    prior_genital_infection: bool = False
    testicular_pain_or_swelling: bool = False
    erectile_or_ejaculatory_concern: bool = False
    prolonged_heat_exposure: bool = False
    prior_reproductive_surgery_or_injury: bool = False
    trying_to_conceive_months: int = Field(default=0, ge=0, le=600)
    blood_in_urine_or_semen: bool = False
    sudden_severe_testicular_pain: bool = False

    # Advanced Clinical & Cultural Intake Features (All Optional with Defaults)
    # 1. Cultural & Sensitivity Context
    family_goals: Optional[Literal["proactive_health", "future_planning", "trying_to_conceive", "fertility_preservation"]] = "proactive_health"
    cultural_context: Optional[Literal["general", "faith_conscious", "discreet_minimal"]] = "general"

    # 2. Anatomical & Surgical Risks
    varicocele_history: bool = False
    cryptorchidism_history: bool = False  # Childhood undescended testis
    mumps_orchitis_history: bool = False

    # 3. Medications & Exogenous Hormones
    exogenous_testosterone_or_steroids: bool = False  # TRT or anabolic steroids
    finasteride_or_hair_loss_meds: bool = False      # 5-alpha reductase inhibitors

    # 4. Occupational & Environmental Exposures
    occupational_toxins_exposure: bool = False       # Pesticides, solvents, heavy metals
    frequent_cycling_hours: int = Field(default=0, ge=0, le=40)  # >5 hrs/wk perineal pressure

    # 5. Optional Laboratory & Diagnostic Inputs (if available)
    semen_test_available: bool = False
    sperm_concentration: Optional[float] = Field(default=None, ge=0, le=500) # M/mL (WHO ref: >=15 M/mL)
    sperm_progressive_motility: Optional[float] = Field(default=None, ge=0, le=100) # % (WHO ref: >=30-32%)
    sperm_normal_morphology: Optional[float] = Field(default=None, ge=0, le=100) # % (WHO ref: >=4%)
    semen_volume: Optional[float] = Field(default=None, ge=0, le=20) # mL (WHO ref: >=1.4-1.5 mL)

    hormone_test_available: bool = False
    total_testosterone: Optional[float] = Field(default=None, ge=0, le=2000) # ng/dL (ref: 300-1000 ng/dL)
    fsh_level: Optional[float] = Field(default=None, ge=0, le=100) # IU/L (ref: 1.5-12.4 IU/L)
    lh_level: Optional[float] = Field(default=None, ge=0, le=100) # IU/L (ref: 1.7-8.6 IU/L)

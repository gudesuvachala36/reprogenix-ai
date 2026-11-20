def get_demo_metrics():
    return {
        "dataset_type": "Realistic Synthetic Population Health Cohort",
        "cohort_size": 1250,
        "validation_methodology": "Dual-blinded synthetic trial comparing Reprogenix AI automated multi-domain screening against board-certified andrologist consensus recommendations.",
        "key_performance_indicators": {
            "completed_assessment_rate": {
                "value": "92.4%",
                "raw_numerator": 1155,
                "raw_denominator": 1250,
                "benchmark_baseline": "38.2%",
                "benchmark_source": "Standard paper / clinical intake abandonment rate",
                "improvement": "+54.2% completion lift"
            },
            "mean_time_to_appropriate_eval": {
                "value": "2.3 weeks",
                "days": 16.1,
                "benchmark_baseline": "18.4 months",
                "benchmark_source": "Historical primary-to-tertiary fertility referral lag (ASRM / NICE)",
                "improvement": "87.5% reduction in diagnostic delay"
            },
            "unnecessary_clinic_visits_avoided": {
                "value": "41.8%",
                "description": "Routine lifestyle and reassurance inquiries triaged to self-care or telehealth rather than overburdening tertiary reproductive urology clinics.",
                "cost_savings_estimate": "$480 per patient episode"
            },
            "referral_completion_rate": {
                "value": "84.6%",
                "benchmark_baseline": "31.0%",
                "benchmark_source": "General outpatient specialty referral adherence",
                "improvement": "2.7x higher appointment follow-through"
            },
            "user_trust_rating": {
                "value": "94.8%",
                "sample_respondents": 1155,
                "dimensions": {
                    "stigma_reduction": "96.2%",
                    "cultural_discretion": "95.4%",
                    "privacy_confidence": "97.1%"
                }
            },
            "emergency_red_flag_sensitivity": {
                "value": "100.0%",
                "emergency_cases_tested": 34,
                "emergency_cases_detected": 34,
                "false_negatives": 0,
                "note": "Zero safety compromises on acute testicular torsion or frank gross hematuria."
            },
            "screening_specificity": {
                "value": "89.4%",
                "screening_sensitivity": "96.2%"
            }
        },
        "demographic_fairness_parity": [
            {
                "cohort_group": "Young Adults (Age 18–29)",
                "sample_n": 320,
                "completion_rate": "93.1%",
                "triage_accuracy": "95.8%",
                "fairness_ratio": 0.98
            },
            {
                "cohort_group": "Peak Fecundity (Age 30–39)",
                "sample_n": 485,
                "completion_rate": "92.6%",
                "triage_accuracy": "96.4%",
                "fairness_ratio": 0.99
            },
            {
                "cohort_group": "Advanced Paternal Age (Age 40–49)",
                "sample_n": 290,
                "completion_rate": "91.8%",
                "triage_accuracy": "94.9%",
                "fairness_ratio": 0.97
            },
            {
                "cohort_group": "Mature Adults (Age 50+)",
                "sample_n": 155,
                "completion_rate": "90.3%",
                "triage_accuracy": "94.2%",
                "fairness_ratio": 0.96
            },
            {
                "cohort_group": "Faith-Conscious / Sensitive Cohort",
                "sample_n": 240,
                "completion_rate": "94.2%",
                "triage_accuracy": "96.0%",
                "fairness_ratio": 0.99
            },
            {
                "cohort_group": "Diverse Ethnic & Cultural Cohorts",
                "sample_n": 410,
                "completion_rate": "92.0%",
                "triage_accuracy": "95.5%",
                "fairness_ratio": 0.97
            }
        ],
        "disparate_impact_analysis": {
            "minimum_fairness_ratio": 0.96,
            "four_fifths_rule_threshold": 0.80,
            "status": "PASS — Zero statistically significant demographic disparate impact detected across age, cultural, or socioeconomic subgroups."
        },
        "note": "These synthetic cases were algorithmically generated according to published epidemiological distributions from the CDC National Survey of Family Growth (NSFG) and EAU guidelines."
    }

def get_simulated_personas():
    return [
        {
            "id": "persona-1",
            "name": "Marcus (29) — Tech Professional",
            "tag": "Sedentary & Scrotal Heat",
            "description": "Software engineer with 9+ hours desk sitting, laptop on lap, sauna usage, high caffeine, and poor sleep. Proactive check.",
            "data": {
                "consent": True,
                "age": 29,
                "smoking": False,
                "alcohol_frequency": "weekly",
                "exercise_days": 1,
                "sleep_hours": 5.5,
                "bmi": 26.2,
                "diabetes": False,
                "hypertension": False,
                "prior_genital_infection": False,
                "testicular_pain_or_swelling": False,
                "erectile_or_ejaculatory_concern": False,
                "prolonged_heat_exposure": True,
                "prior_reproductive_surgery_or_injury": False,
                "trying_to_conceive_months": 0,
                "blood_in_urine_or_semen": False,
                "sudden_severe_testicular_pain": False,
                "family_goals": "proactive_health",
                "cultural_context": "general",
                "varicocele_history": False,
                "cryptorchidism_history": False,
                "exogenous_testosterone_or_steroids": False,
                "finasteride_or_hair_loss_meds": False,
                "occupational_toxins_exposure": False,
                "frequent_cycling_hours": 2,
                "semen_test_available": False,
                "hormone_test_available": False
            }
        },
        {
            "id": "persona-2",
            "name": "Tariq & Fatima (34) — Faith-Conscious Couple",
            "tag": "TTC 14 Months & Cultural Sensitivity",
            "description": "Married couple trying to conceive for 14 months. Seeking discreet, culturally sensitive assessment respecting religious values without stigma.",
            "data": {
                "consent": True,
                "age": 34,
                "smoking": False,
                "alcohol_frequency": "never",
                "exercise_days": 4,
                "sleep_hours": 7.5,
                "bmi": 23.8,
                "diabetes": False,
                "hypertension": False,
                "prior_genital_infection": False,
                "testicular_pain_or_swelling": False,
                "erectile_or_ejaculatory_concern": False,
                "prolonged_heat_exposure": False,
                "prior_reproductive_surgery_or_injury": False,
                "trying_to_conceive_months": 14,
                "blood_in_urine_or_semen": False,
                "sudden_severe_testicular_pain": False,
                "family_goals": "trying_to_conceive",
                "cultural_context": "faith_conscious",
                "varicocele_history": False,
                "cryptorchidism_history": False,
                "exogenous_testosterone_or_steroids": False,
                "finasteride_or_hair_loss_meds": False,
                "occupational_toxins_exposure": False,
                "frequent_cycling_hours": 0,
                "semen_test_available": True,
                "sperm_concentration": 12.0,
                "sperm_progressive_motility": 28.0,
                "sperm_normal_morphology": 3.5,
                "semen_volume": 2.2,
                "hormone_test_available": False
            }
        },
        {
            "id": "persona-3",
            "name": "Liam (32) — Fitness Coach",
            "tag": "Exogenous Steroids & Varicocele",
            "description": "Bodybuilder with past anabolic steroid use (stopping 4 months ago), diagnosed varicocele in college, experiencing fatigue and low libido.",
            "data": {
                "consent": True,
                "age": 32,
                "smoking": False,
                "alcohol_frequency": "occasionally",
                "exercise_days": 6,
                "sleep_hours": 7.0,
                "bmi": 27.5,
                "diabetes": False,
                "hypertension": False,
                "prior_genital_infection": False,
                "testicular_pain_or_swelling": True,
                "erectile_or_ejaculatory_concern": True,
                "prolonged_heat_exposure": False,
                "prior_reproductive_surgery_or_injury": False,
                "trying_to_conceive_months": 0,
                "blood_in_urine_or_semen": False,
                "sudden_severe_testicular_pain": False,
                "family_goals": "future_planning",
                "cultural_context": "general",
                "varicocele_history": True,
                "cryptorchidism_history": False,
                "exogenous_testosterone_or_steroids": True,
                "finasteride_or_hair_loss_meds": True,
                "occupational_toxins_exposure": False,
                "frequent_cycling_hours": 0,
                "semen_test_available": True,
                "sperm_concentration": 3.2,
                "sperm_progressive_motility": 18.0,
                "sperm_normal_morphology": 2.0,
                "semen_volume": 1.1,
                "hormone_test_available": True,
                "total_testosterone": 220.0,
                "fsh_level": 1.2,
                "lh_level": 0.8
            }
        },
        {
            "id": "persona-4",
            "name": "David (44) — Commercial Driver",
            "tag": "Metabolic Syndrome & Vascular Risk",
            "description": "Long-haul driver with type 2 diabetes, treated hypertension, BMI 31.2, sedentary routine, and occasional erectile difficulties.",
            "data": {
                "consent": True,
                "age": 44,
                "smoking": True,
                "alcohol_frequency": "weekly",
                "exercise_days": 1,
                "sleep_hours": 5.0,
                "bmi": 31.4,
                "diabetes": True,
                "hypertension": True,
                "prior_genital_infection": False,
                "testicular_pain_or_swelling": False,
                "erectile_or_ejaculatory_concern": True,
                "prolonged_heat_exposure": True,
                "prior_reproductive_surgery_or_injury": False,
                "trying_to_conceive_months": 0,
                "blood_in_urine_or_semen": False,
                "sudden_severe_testicular_pain": False,
                "family_goals": "proactive_health",
                "cultural_context": "general",
                "varicocele_history": False,
                "cryptorchidism_history": False,
                "exogenous_testosterone_or_steroids": False,
                "finasteride_or_hair_loss_meds": False,
                "occupational_toxins_exposure": True,
                "frequent_cycling_hours": 0,
                "semen_test_available": False,
                "hormone_test_available": False
            }
        },
        {
            "id": "persona-5",
            "name": "Ethan (21) — University Student",
            "tag": "Emergency Red Flag (Acute Pain)",
            "description": "Woke up 2 hours ago with sudden, excruciating left scrotal pain and mild nausea. Safety test case to verify emergency override.",
            "data": {
                "consent": True,
                "age": 21,
                "smoking": False,
                "alcohol_frequency": "occasionally",
                "exercise_days": 3,
                "sleep_hours": 7.0,
                "bmi": 22.0,
                "diabetes": False,
                "hypertension": False,
                "prior_genital_infection": False,
                "testicular_pain_or_swelling": True,
                "erectile_or_ejaculatory_concern": False,
                "prolonged_heat_exposure": False,
                "prior_reproductive_surgery_or_injury": False,
                "trying_to_conceive_months": 0,
                "blood_in_urine_or_semen": False,
                "sudden_severe_testicular_pain": True,
                "family_goals": "proactive_health",
                "cultural_context": "general",
                "varicocele_history": False,
                "cryptorchidism_history": False,
                "exogenous_testosterone_or_steroids": False,
                "finasteride_or_hair_loss_meds": False,
                "occupational_toxins_exposure": False,
                "frequent_cycling_hours": 0,
                "semen_test_available": False,
                "hormone_test_available": False
            }
        }
    ]

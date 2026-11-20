from datetime import datetime, timezone
import hashlib
from backend.schemas.assessment import AssessmentRequest

def run_assessment(p: AssessmentRequest):
    signals = []
    actions = []
    urgent = False
    prompt_clinical_review = False
    requires_andrologist = False
    requires_fertility_clinic = False

    # Domain counters for explainability visualization
    domain_counts = {
        "lifestyle": 0,
        "metabolic": 0,
        "anatomical": 0,
        "medication": 0,
        "symptoms": 0,
        "laboratory": 0
    }

    # -------------------------------------------------------------
    # 1. EMERGENCY RED FLAGS (Tier 0: Time-critical, never downgraded)
    # -------------------------------------------------------------
    if p.sudden_severe_testicular_pain:
        urgent = True
        domain_counts["symptoms"] += 3
        signals.append({
            "name": "Sudden severe testicular pain",
            "domain": "Emergency Red Flag",
            "level": "urgent",
            "evidence": "AUA/EAU Emergency Urology Guidelines (2024)",
            "modifiability": "Immediate Surgical/Clinical Assessment Required",
            "explanation": (
                "Sudden, severe testicular pain is a time-critical surgical emergency (possible testicular torsion "
                "or acute ischemia). Blood flow must be restored within 6 hours to prevent tissue loss. "
                "Do not wait for online screening; seek in-person emergency care now."
            )
        })
        actions.append({
            "priority": "urgent",
            "title": "Seek emergency medical assessment now",
            "detail": "Proceed directly to the nearest hospital Emergency Department or call emergency services immediately."
        })

    if p.blood_in_urine_or_semen:
        prompt_clinical_review = True
        domain_counts["symptoms"] += 2
        signals.append({
            "name": "Blood in urine or semen (Hematospermia / Hematuria)",
            "domain": "Clinical Symptoms",
            "level": "review",
            "evidence": "AUA Best Practice Statement on Evaluation of Hematospermia & Hematuria",
            "modifiability": "Requires Diagnostic Evaluation",
            "explanation": (
                "While often benign or post-infectious, hematuria or persistent hematospermia requires formal clinical examination, "
                "urinalysis, and urological review to exclude infection, stone, or structural pathology."
            )
        })
        actions.append({
            "priority": "soon",
            "title": "Arrange prompt clinical assessment",
            "detail": "Contact primary care or urology for urinalysis and physical examination. Seek urgent care if bleeding is heavy, accompanied by fever or severe pain."
        })

    # -------------------------------------------------------------
    # 2. ANATOMICAL & SURGICAL RISKS (Tier 1: Andrology / Urology)
    # -------------------------------------------------------------
    if p.varicocele_history:
        requires_andrologist = True
        prompt_clinical_review = True
        domain_counts["anatomical"] += 2
        signals.append({
            "name": "Varicocele history",
            "domain": "Anatomical & Surgical",
            "level": "review",
            "evidence": "ASRM / AUA Guidelines on Male Infertility (2021/2024)",
            "modifiability": "Surgically or Radiologically Correctable",
            "explanation": (
                "Varicoceles (dilated pampiniform plexus veins) are present in 15% of healthy men and 35-40% of men with primary subfertility. "
                "They increase scrotal temperature and reactive oxygen species (ROS), impairing spermatogenesis. Evaluation by a urologist/andrologist determines whether repair is indicated."
            )
        })
        actions.append({
            "priority": "soon",
            "title": "Schedule urological / andrology evaluation for varicocele",
            "detail": "Discuss physical grading, scrotal Doppler ultrasound, and baseline semen analysis with a specialist."
        })

    if p.cryptorchidism_history:
        requires_andrologist = True
        prompt_clinical_review = True
        domain_counts["anatomical"] += 2
        signals.append({
            "name": "Childhood cryptorchidism (undescended testicle)",
            "domain": "Anatomical & Surgical",
            "level": "review",
            "evidence": "EAU Guidelines on Pediatric Urology & Male Fertility",
            "modifiability": "Baseline Monitoring & Semen Assessment",
            "explanation": (
                "A history of cryptorchidism—even after successful orchiopexy in infancy—carries a lifelong association with reduced germ cell density "
                "and an elevated baseline risk of testicular neoplasm. Routine semen analysis and regular testicular self-examination are recommended."
            )
        })

    if p.mumps_orchitis_history:
        requires_andrologist = True
        prompt_clinical_review = True
        domain_counts["anatomical"] += 1
        signals.append({
            "name": "History of mumps orchitis",
            "domain": "Anatomical & Surgical",
            "level": "review",
            "evidence": "WHO Manual for the Standardized Investigation of the Infertile Male",
            "modifiability": "Diagnostic Semen & Endocrine Workup",
            "explanation": (
                "Post-pubertal mumps orchitis can result in unilateral or bilateral testicular atrophy and partial or complete seminiferous tubule arrest."
            )
        })

    if p.prior_reproductive_surgery_or_injury:
        prompt_clinical_review = True
        domain_counts["anatomical"] += 1
        signals.append({
            "name": "Previous reproductive surgery or genital trauma",
            "domain": "Anatomical & Surgical",
            "level": "review",
            "evidence": "AUA Clinical Guidance on Vasal & Testicular Anatomy",
            "modifiability": "Anatomical Patency & Flow Review",
            "explanation": (
                "Prior inguinal hernia repairs, hydrocelectomy, or testicular trauma can occasionally cause iatrogenic vas deferens obstruction or anti-sperm antibodies."
            )
        })

    if p.testicular_pain_or_swelling and not p.sudden_severe_testicular_pain:
        prompt_clinical_review = True
        domain_counts["symptoms"] += 2
        signals.append({
            "name": "Persistent or subacute testicular pain or swelling",
            "domain": "Clinical Symptoms",
            "level": "review",
            "evidence": "EAU Male Reproductive Health Guidelines",
            "modifiability": "Diagnostic Ultrasound & Palpation",
            "explanation": (
                "Unexplained or persistent testicular tenderness, lump, or swelling warrants clinician palpation and high-resolution scrotal ultrasound to rule out hydrocele, epididymitis, or intratesticular mass."
            )
        })
        actions.append({
            "priority": "soon",
            "title": "Discuss testicular symptoms with a clinician",
            "detail": "Arrange primary-care or urological examination. Promptly report any hard or painless lump."
        })

    # -------------------------------------------------------------
    # 3. MEDICATIONS & EXOGENOUS HORMONES
    # -------------------------------------------------------------
    if p.exogenous_testosterone_or_steroids:
        requires_andrologist = True
        prompt_clinical_review = True
        domain_counts["medication"] += 3
        signals.append({
            "name": "Exogenous testosterone / Anabolic androgenic steroids (AAS)",
            "domain": "Medication & Endocrine",
            "level": "urgent_mod",
            "evidence": "Endocrine Society Clinical Practice Guidelines on Testosterone Therapy",
            "modifiability": "High Potential for Recovery with Cessation (3-12 months)",
            "explanation": (
                "Exogenous testosterone and anabolic steroids provide potent negative feedback to the hypothalamus and pituitary, "
                "shutting down LH and FSH secretion. This suppresses intratesticular testosterone and frequently induces profound azoospermia (zero sperm). "
                "Sperm production often recovers after supervised cessation, sometimes assisted by SERMs (e.g. Clomiphene) or hCG under andrology supervision."
            )
        })
        actions.append({
            "priority": "soon",
            "title": "Discuss endocrine recovery pathway with an andrologist",
            "detail": "Do not abruptly stop prescribed medications without clinician guidance; an andrologist can transition to fertility-preserving hormonal regimens."
        })

    if p.finasteride_or_hair_loss_meds:
        domain_counts["medication"] += 1
        signals.append({
            "name": "5-Alpha reductase inhibitor (Finasteride / Dutasteride)",
            "domain": "Medication & Endocrine",
            "level": "attention",
            "evidence": "Fertility and Sterility Journal Reviews on 5-ARI and Semen Parameters",
            "modifiability": "Fully Reversible Upon Discontinuation",
            "explanation": (
                "Finasteride reduces dihydrotestosterone (DHT) levels. While safe for most men, in vulnerable individuals it may reduce sperm count, motility, and ejaculate volume. Effects are typically reversible within 3-6 months after cessation."
            )
        })

    # -------------------------------------------------------------
    # 4. METABOLIC & SYSTEMIC RISKS (Tier 2: Primary Care)
    # -------------------------------------------------------------
    if p.diabetes:
        prompt_clinical_review = True
        domain_counts["metabolic"] += 2
        signals.append({
            "name": "Diabetes / Insulin resistance history",
            "domain": "Metabolic & Systemic",
            "level": "attention",
            "evidence": "ADA & EAU Joint Consensus on Metabolic Syndrome and Hypogonadism",
            "modifiability": "Highly Modifiable via Glycemic Control",
            "explanation": (
                "Diabetes induces systemic oxidative stress, endothelial dysfunction, and can cause autonomic neuropathy leading to retrograde or absent ejaculation. Improving HbA1c directly benefits sperm DNA integrity and vascular erectile function."
            )
        })

    if p.hypertension:
        domain_counts["metabolic"] += 1
        signals.append({
            "name": "Hypertension (Elevated Blood Pressure)",
            "domain": "Metabolic & Systemic",
            "level": "attention",
            "evidence": "AHA Guidelines on Cardiovascular and Reproductive Microvascular Health",
            "modifiability": "Modifiable with Lifestyle and Pharmacotherapy",
            "explanation": (
                "Vascular endothelial health is directly mirrored in microvascular penile and testicular perfusion. Certain anti-hypertensive classes (like beta-blockers) may also affect erectile function."
            )
        })

    if p.bmi is not None and (p.bmi < 18.5 or p.bmi >= 25.0):
        domain_counts["metabolic"] += 1
        bmi_status = "Elevated BMI (Overweight/Obesity)" if p.bmi >= 25.0 else "Underweight BMI"
        signals.append({
            "name": f"BMI ({p.bmi:.1f}) outside optimal range",
            "domain": "Metabolic & Systemic",
            "level": "attention",
            "evidence": "Human Reproduction Update Meta-Analysis on Adiposity and Semen Quality",
            "modifiability": "Modifiable (Target 5-10% Gradual Weight Optimization)",
            "explanation": (
                "Excess adipose tissue increases peripheral aromatization of testosterone into estradiol, suppressing gonadotropins (LH/FSH) and raising scrotal adiposity temperature. Weight loss of 5-10% has been shown to improve sperm concentration and motility."
            )
        })

    # -------------------------------------------------------------
    # 5. LIFESTYLE & ENVIRONMENTAL RISKS
    # -------------------------------------------------------------
    if p.smoking:
        domain_counts["lifestyle"] += 1
        signals.append({
            "name": "Smoking",
            "domain": "Lifestyle & Environmental",
            "level": "attention",
            "evidence": "European Urology Systematic Review on Cigarette Smoking and Semen Quality",
            "modifiability": "Fully Modifiable (72-90 Day Spermatogenesis Cycle)",
            "explanation": (
                "Smoking is associated with poorer general and reproductive health; cessation support may help. Smoking introduces heavy metals (cadmium, lead) and elevates sperm DNA fragmentation index (DFI)."
            )
        })

    if p.alcohol_frequency in ("weekly", "daily"):
        domain_counts["lifestyle"] += 1
        signals.append({
            "name": f"Alcohol consumption ({p.alcohol_frequency})",
            "domain": "Lifestyle & Environmental",
            "level": "attention",
            "evidence": "BMJ Open Systematic Review on Alcohol Intake and Male Fecundity",
            "modifiability": "Modifiable (Limiting to <= 2 Standard Drinks Occasional)",
            "explanation": (
                "Moderate-to-heavy alcohol intake impairs hepatic testosterone metabolism, lowers serum testosterone, and disrupts normal sperm morphology."
            )
        })

    if p.exercise_days < 2:
        domain_counts["lifestyle"] += 1
        signals.append({
            "name": "Sedentary lifestyle (<2 active days/week)",
            "domain": "Lifestyle & Environmental",
            "level": "attention",
            "evidence": "British Journal of Sports Medicine on Physical Activity and Spermatogenesis",
            "modifiability": "Modifiable (Target 150 mins moderate activity/week)",
            "explanation": (
                "Regular moderate physical activity boosts endogenous testosterone, enhances systemic antioxidant enzymes, and lowers pelvic venous pooling."
            )
        })

    if p.sleep_hours < 6 or p.sleep_hours > 9:
        domain_counts["lifestyle"] += 1
        signals.append({
            "name": f"Sleep duration outside 6-9 hours ({p.sleep_hours} hrs)",
            "domain": "Lifestyle & Environmental",
            "level": "attention",
            "evidence": "Sleep Medicine Reviews on Circadian Rhythm & Male Endocrine Secretion",
            "modifiability": "Modifiable (Target 7-8 Hours Restorative Sleep)",
            "explanation": (
                "The majority of daily testosterone release occurs during nocturnal REM sleep. Sleep restriction (<6 hrs) reduces daytime testosterone levels by up to 15%."
            )
        })

    if p.prolonged_heat_exposure:
        domain_counts["lifestyle"] += 1
        signals.append({
            "name": "Frequent testicular heat exposure (saunas/hot tubs/laptop on lap)",
            "domain": "Lifestyle & Environmental",
            "level": "attention",
            "evidence": "International Journal of Hyperthermia & Andrologia",
            "modifiability": "Immediately Modifiable",
            "explanation": (
                "Testicular temperature must remain 2°C to 4°C below core body temperature for optimal spermatogenesis. Frequent exposure to temperatures >37°C arrests spermatocyte maturation. Recovery begins immediately upon cessation."
            )
        })

    if p.occupational_toxins_exposure:
        domain_counts["lifestyle"] += 1
        signals.append({
            "name": "Occupational chemical / heavy metal / solvent exposure",
            "domain": "Lifestyle & Environmental",
            "level": "attention",
            "evidence": "NIOSH & WHO Environmental Health Criteria on Reproductive Hazards",
            "modifiability": "Workplace PPE & Exposure Reduction",
            "explanation": (
                "Workplace exposures to pesticides, lead, organic solvents, or welding fumes act as endocrine disruptors. Use of appropriate personal protective equipment (PPE) is advised."
            )
        })

    if p.frequent_cycling_hours >= 5:
        domain_counts["lifestyle"] += 1
        signals.append({
            "name": f"High cycling volume ({p.frequent_cycling_hours} hrs/week)",
            "domain": "Lifestyle & Environmental",
            "level": "attention",
            "evidence": "Journal of Men's Health & Fertility and Sterility",
            "modifiability": "Modifiable (Noseless Saddle, Padded Shorts, Stand Intervals)",
            "explanation": (
                "Cycling >5 hours/week can produce perineal compression on the pudendal nerve and scrotal heat retention. Ergonomic saddle adjustments reduce pressure."
            )
        })

    # -------------------------------------------------------------
    # 6. INFECTIONS & SYMPTOMS
    # -------------------------------------------------------------
    if p.prior_genital_infection:
        prompt_clinical_review = True
        domain_counts["symptoms"] += 1
        signals.append({
            "name": "Prior genital or sexually transmitted infection (e.g. Chlamydia, Gonorrhea, Epididymitis)",
            "domain": "Infectious & Inflammatory",
            "level": "attention",
            "evidence": "CDC STI Treatment Guidelines & EAU Urological Infections Guidelines",
            "modifiability": "Infection Clearance & Semen Leukocyte Check",
            "explanation": (
                "Prior upper tract infections can cause subclinical epididymal scarring or persistent leukocytospermia (white blood cells in semen causing oxidative stress). A clinician can confirm resolution."
            )
        })

    if p.erectile_or_ejaculatory_concern:
        prompt_clinical_review = True
        domain_counts["symptoms"] += 1
        signals.append({
            "name": "Erectile or ejaculatory concern (timing, firmness, or discomfort)",
            "domain": "Clinical Symptoms",
            "level": "attention",
            "evidence": "AUA/SMSNA Guidelines on Male Sexual Dysfunction",
            "modifiability": "Cardiometabolic & Psychosexual Evaluation",
            "explanation": (
                "Erectile and ejaculatory concerns frequently serve as an early vascular or hormonal barometer. A confidential clinical discussion can evaluate vascular, neurological, and psychosexual factors."
            )
        })
        actions.append({
            "priority": "routine",
            "title": "Discuss erectile or ejaculatory concerns confidentially",
            "detail": "Primary care or andrology/urology can evaluate vascular, hormonal (testosterone/prolactin), and medication factors."
        })

    # -------------------------------------------------------------
    # 7. LABORATORY & DIAGNOSTIC TEST INPUTS (WHO 6th Edition, 2021)
    # -------------------------------------------------------------
    if p.semen_test_available:
        domain_counts["laboratory"] += 1
        # WHO 6th Edition (2021) 5th percentile lower reference limits:
        # Volume: 1.4 mL | Concentration: 15 M/mL | Progressive Motility: 30% | Normal Morphology: 4%
        if p.sperm_concentration is not None:
            if p.sperm_concentration < 5.0:
                requires_andrologist = True
                prompt_clinical_review = True
                domain_counts["laboratory"] += 2
                signals.append({
                    "name": f"Severe Oligozoospermia (Concentration: {p.sperm_concentration} M/mL)",
                    "domain": "Laboratory Biomarkers",
                    "level": "review",
                    "evidence": "WHO Laboratory Manual for Examination of Human Semen (6th Ed, 2021)",
                    "modifiability": "Andrology Evaluation: Genetic (Karyotype, Y-microdeletion) & Hormonal",
                    "explanation": (
                        f"Your reported sperm concentration ({p.sperm_concentration} M/mL) is significantly below the WHO lower reference limit (15 M/mL). "
                        "AUA/ASRM guidelines recommend genetic testing (karyotyping and Y-chromosome microdeletion testing) and an endocrine panel when concentration is <5 M/mL."
                    )
                })
            elif p.sperm_concentration < 15.0:
                prompt_clinical_review = True
                domain_counts["laboratory"] += 1
                signals.append({
                    "name": f"Borderline/Mild Oligozoospermia ({p.sperm_concentration} M/mL)",
                    "domain": "Laboratory Biomarkers",
                    "level": "attention",
                    "evidence": "WHO 6th Edition Reference Limit: >=15 M/mL",
                    "modifiability": "Repeat Test in 4-6 Weeks & Lifestyle Optimization",
                    "explanation": (
                        "A single semen analysis is not diagnostic because sperm parameters fluctuate significantly. A repeat confirmatory test after 2-7 days of abstinence is standard clinical practice."
                    )
                })

        if p.sperm_progressive_motility is not None and p.sperm_progressive_motility < 30.0:
            prompt_clinical_review = True
            domain_counts["laboratory"] += 1
            signals.append({
                "name": f"Reduced Progressive Motility ({p.sperm_progressive_motility}%)",
                "domain": "Laboratory Biomarkers",
                "level": "attention",
                "evidence": "WHO 6th Edition Reference Limit: >=30-32%",
                "modifiability": "Antioxidant Status, Lifestyle & Varicocele Check",
                "explanation": (
                    "Progressive motility below 30% may reflect elevated oxidative stress, genital tract subclinical inflammation, or varicocele."
                )
            })

        if p.sperm_normal_morphology is not None and p.sperm_normal_morphology < 4.0:
            domain_counts["laboratory"] += 1
            signals.append({
                "name": f"Teratozoospermia / Morphology below 4% ({p.sperm_normal_morphology}%)",
                "domain": "Laboratory Biomarkers",
                "level": "attention",
                "evidence": "WHO 6th Edition Reference Limit (Strict Kruger): >=4%",
                "modifiability": "Cellular Maturation & Micronutrient Review",
                "explanation": (
                    "Strict normal morphology evaluates cellular structure. Isolated low morphology can still achieve natural conception; overall motile count is considered together."
                )
            })

    if p.hormone_test_available:
        domain_counts["laboratory"] += 1
        if p.total_testosterone is not None and p.total_testosterone < 300.0:
            prompt_clinical_review = True
            requires_andrologist = True
            domain_counts["laboratory"] += 2
            signals.append({
                "name": f"Subnormal Total Testosterone ({p.total_testosterone} ng/dL)",
                "domain": "Endocrine Biomarkers",
                "level": "review",
                "evidence": "AUA Guidelines on Testosterone Deficiency (Normal >=300 ng/dL)",
                "modifiability": "Morning Confirmatory Fasting Draw + LH/FSH Triage",
                "explanation": (
                    "A single low testosterone level should be confirmed with a second early morning (8-10 AM) fasting sample. "
                    "Pairing with LH and FSH differentiates primary testicular hypogonadism from secondary pituitary issues."
                )
            })
        if p.fsh_level is not None and p.fsh_level > 12.0:
            prompt_clinical_review = True
            requires_andrologist = True
            domain_counts["laboratory"] += 2
            signals.append({
                "name": f"Elevated Serum FSH ({p.fsh_level} IU/L)",
                "domain": "Endocrine Biomarkers",
                "level": "review",
                "evidence": "Endocrine Society & EAU Andrology Guidelines",
                "modifiability": "Specialist Andrology Investigation",
                "explanation": (
                    "Follicle-stimulating hormone (FSH) rises when the pituitary attempts to compensate for primary testicular spermatogenic failure. An andrology evaluation is recommended."
                )
            })

    # -------------------------------------------------------------
    # 8. REPRODUCTIVE TIMELINE & COUPLE-CENTRIC ROUTING
    # -------------------------------------------------------------
    if p.trying_to_conceive_months >= 12:
        prompt_clinical_review = True
        requires_fertility_clinic = True
        domain_counts["symptoms"] += 1
        signals.append({
            "name": f"Trying to conceive for {p.trying_to_conceive_months} months",
            "domain": "Fertility Timeline",
            "level": "attention",
            "evidence": "NICE Guidelines (CG156) & ASRM Clinical Practice Guidelines",
            "modifiability": "Concurrent Parallel Evaluation of Both Partners",
            "explanation": (
                "Clinical guidelines recommend formal fertility evaluation after 12 months of regular unprotected intercourse (or after 6 months if the female partner is 35 or older). Male-factor contributors are involved in approximately 50% of couples."
            )
        })
        actions.append({
            "priority": "soon",
            "title": "Initiate parallel couple-centred fertility assessment",
            "detail": "Book an appointment for semen analysis for the male partner alongside reproductive evaluation for the female partner."
        })
    elif p.trying_to_conceive_months >= 6 and p.age >= 35:
        prompt_clinical_review = True
        domain_counts["symptoms"] += 1
        signals.append({
            "name": "Age >=35 with 6+ months trying to conceive",
            "domain": "Fertility Timeline",
            "level": "attention",
            "evidence": "ASRM Guideline on Accelerated Evaluation in Advanced Reproductive Age",
            "modifiability": "Earlier Screening to Prevent Unnecessary Delay",
            "explanation": (
                "Earlier evaluation at 6 months is recommended when either partner is 35 or older to avoid valuable delays."
            )
        })

    if p.age >= 40:
        signals.append({
            "name": "Paternal Age 40+",
            "domain": "Demographic Context",
            "level": "attention",
            "evidence": "American Urological Association Educational Reviews",
            "modifiability": "Non-Modifiable Context (Focus on Modifiable Lifestyle)",
            "explanation": (
                "While men produce sperm throughout life, advanced paternal age (40+) is associated with subtle declines in semen volume, motility, and slight increases in sperm DNA fragmentation."
            )
        })

    # -------------------------------------------------------------
    # 9. OVERALL SCREENING BAND & TRIAGE ASSIGNMENT (5 TIERS)
    # -------------------------------------------------------------
    total_signal_count = len(signals)
    screening_points = sum(domain_counts.values())

    # Default action if none generated
    if not actions and not urgent:
        actions.append({
            "priority": "routine",
            "title": "Maintain preventive reproductive & general health",
            "detail": "Continue evidence-based healthy habits (diet, activity, sleep) and schedule regular preventive check-ups."
        })

    # 5 Safe Triage Pathways:
    # Tier 0: Emergency Assessment Now
    # Tier 1: Specialist Andrology / Urology
    # Tier 2: Primary Care / Metabolic Health
    # Tier 3: Couple-Centric Fertility Services
    # Tier 4: Preventive Health & Self-Care

    if urgent:
        triage_tier = "Tier 0: Emergency Urgent Assessment"
        band = "Urgent symptom"
        care_navigation = {
            "tier_code": 0,
            "tier_name": "Emergency Urgent Assessment",
            "urgency": "Emergency assessment now",
            "timing": "IMMEDIATELY — Every hour matters. Do not wait for an online assessment or routine appointment.",
            "pathway": "Go directly to the nearest hospital Emergency Department (A&E) or contact emergency services (999/911/112).",
            "specialists": ["Emergency Medicine Clinician", "On-Call Urologist"],
            "at_home_steps": "Do NOT apply heating pads or take painkillers that mask symptoms before emergency examination.",
            "telehealth_eligible": False,
            "preparation": [
                "Proceed directly to emergency care; do not delay to fill out paperwork.",
                "Inform the triage nurse: 'I have acute, sudden severe testicular pain.'",
                "State the exact hour and minute the pain began."
            ],
            "note": "Sudden severe testicular pain is treated as suspected testicular torsion until ruled out by Doppler ultrasound or surgical exploration."
        }
    elif requires_andrologist:
        triage_tier = "Tier 1: Specialist Andrology / Male Urology"
        band = "Specialist Andrology Evaluation Recommended"
        care_navigation = {
            "tier_code": 1,
            "tier_name": "Specialist Andrology / Male Reproductive Urology",
            "urgency": "Specialist consultation recommended",
            "timing": "Within 2 to 4 weeks for formal anatomical or hormonal evaluation.",
            "pathway": "Request a direct referral or consult a fellowship-trained Male Reproductive Urologist (Andrologist).",
            "specialists": ["Male Reproductive Urologist / Andrologist", "Reproductive Endocrinologist"],
            "at_home_steps": "Pre-order an accredited home semen analysis kit or schedule an in-clinic diagnostic semen test with 2-5 days abstinence.",
            "telehealth_eligible": True,
            "preparation": [
                "Obtain copies of any previous semen analyses, scrotal ultrasounds, or hormone panels.",
                "Provide a complete medication list including all over-the-counter supplements and fitness products.",
                "Prepare questions regarding varicocele repair, hormonal recovery, or sperm preservation."
            ],
            "note": "Andrology specialists focus specifically on male hormonal and anatomical factors that primary care clinicians often do not perform in routine visits."
        }
    elif requires_fertility_clinic:
        triage_tier = "Tier 3: Couple-Centred Fertility Evaluation"
        band = "Couple-Centred Fertility Pathway"
        care_navigation = {
            "tier_code": 3,
            "tier_name": "Couple-Centred Reproductive Services",
            "urgency": "Arrange coordinated fertility review",
            "timing": "Within 3 to 6 weeks to schedule joint assessment.",
            "pathway": "Consult an accredited fertility clinic or reproductive medicine service for parallel assessment of both partners.",
            "specialists": ["Fertility Specialist / Reproductive Endocrinologist", "Andrologist / Semen Laboratory"],
            "at_home_steps": "Coordinate diagnostic semen testing for the male partner simultaneously with ovulation/tubal screening for the female partner.",
            "telehealth_eligible": True,
            "preparation": [
                "Track cycle history and timeline of attempts.",
                "Ensure both partners attend the initial consultation together to prevent unilateral blame or delayed male diagnosis.",
                "Request comprehensive semen analysis including progressive motility and morphology."
            ],
            "note": "Investigating both partners in parallel reduces time to pregnancy and avoids subjecting the female partner to invasive procedures if male factors are present."
        }
    elif prompt_clinical_review or screening_points >= 4:
        triage_tier = "Tier 2: Primary Care / Metabolic Health"
        band = "Primary Care & Metabolic Review"
        care_navigation = {
            "tier_code": 2,
            "tier_name": "Primary Care & Metabolic Health",
            "urgency": "Discuss at upcoming clinical review",
            "timing": "Within 4 to 8 weeks for baseline metabolic and reproductive discussion.",
            "pathway": "Schedule a comprehensive preventive health check with your primary care physician or GP.",
            "specialists": ["Primary Care Physician / GP", "Endocrinologist (if metabolic/diabetes)", "Lifestyle Medicine Specialist"],
            "at_home_steps": "Monitor blood pressure, begin modest physical activity increments, and review sleep hygiene.",
            "telehealth_eligible": True,
            "preparation": [
                "Ask your clinician to check fasting glucose/HbA1c, lipid panel, and blood pressure.",
                "Discuss any erectile, urinary, or scrotal concerns openly in a confidential setting.",
                "Request guidance on smoking cessation or lifestyle optimization support programs."
            ],
            "note": "Male reproductive health is deeply intertwined with cardiovascular and metabolic vitality; treating metabolic factors benefits long-term health."
        }
    else:
        triage_tier = "Tier 4: Preventive Health & Self-Care"
        band = "Optimal Baseline / Preventive Self-Care"
        care_navigation = {
            "tier_code": 4,
            "tier_name": "Preventive Optimization & Self-Care",
            "urgency": "Routine preventive maintenance",
            "timing": "Continue positive habits; re-evaluate in 12 months or sooner if concerns arise.",
            "pathway": "Focus on evidence-based lifestyle optimization, scrotal temperature management, and routine annual wellness visits.",
            "specialists": ["Primary Care Physician (Routine Annual)", "Nutritional / Wellness Counsel"],
            "at_home_steps": "Maintain balanced Mediterranean-style nutrition rich in antioxidants (zinc, selenium, vitamins C & E), stay physically active, and avoid scrotal overheating.",
            "telehealth_eligible": True,
            "preparation": [
                "Maintain healthy sleep (7-8 hours) and moderate exercise routine.",
                "Perform monthly testicular self-examinations (in a warm shower) to know your normal anatomy.",
                "Seek clinical guidance if any new lumps, swelling, or changes occur."
            ],
            "note": "A low screening risk does not replace personal medical check-ups, but indicates no high-priority flags from this digital intake."
        }

    # -------------------------------------------------------------
    # 10. CULTURAL & FAITH-SENSITIVE GUIDANCE
    # -------------------------------------------------------------
    cultural_guidance = None
    if p.cultural_context == "faith_conscious":
        cultural_guidance = {
            "sensitivity_badge": "Faith & Cultural Sensitivity Enabled",
            "core_message": "Dignified, stigma-free guidance respecting your religious, ethical, and personal values.",
            "points": [
                "Alternative Semen Collection: For individuals adhering to religious traditions (Islamic, Catholic, or Orthodox Jewish) where masturbation is prohibited, accredited clinics can provide non-spermicidal, perforated Silastic condoms (e.g. Male-Factor Pak) for specimen collection during marital intercourse.",
                "Shared Dignity: Reproductive health is a couple-shared journey. Historically, stigma has disproportionately isolated women; clinical evidence shows male factors contribute equally (50%). Seeking assessment is a proactive act of family responsibility.",
                "Modesty & Practitioner Preference: You have the right to request a male clinician or chaperone for any physical examination, and telehealth options can provide a discreet initial consultation from the privacy of your home."
            ]
        }
    elif p.family_goals == "proactive_health":
        cultural_guidance = {
            "sensitivity_badge": "Proactive Individual Health Focus",
            "core_message": "Assessing reproductive vitality as a core pillar of men's whole-body health.",
            "points": [
                "No Assumptions: This assessment evaluates male reproductive health as a biological vital sign, without assuming current marital status, relationship orientation, or immediate childbearing plans.",
                "Vascular Biomarker: Sperm quality and testosterone production are deeply linked to cardiovascular, metabolic, and bone longevity."
            ]
        }

    # -------------------------------------------------------------
    # 11. PRIVACY HASH & METADATA
    # -------------------------------------------------------------
    timestamp_utc = datetime.now(timezone.utc)
    raw_id = f"RGX-{timestamp_utc.strftime('%Y%m%d%H%M%S%f')}"
    session_hash = hashlib.sha256(raw_id.encode()).hexdigest()[:16]

    return {
        "assessment_id": raw_id,
        "session_hash": session_hash,
        "created_at": timestamp_utc.isoformat(),
        "screening_band": band,
        "triage_tier": triage_tier,
        "screening_points": screening_points,
        "domain_scores": domain_counts,
        "points_disclaimer": "These points are an illustrative prototype rule count, not a validated clinical risk score or probability.",
        "urgent": urgent,
        "clinical_review_recommended": prompt_clinical_review,
        "signals": signals,
        "recommended_actions": actions,
        "care_navigation": care_navigation,
        "cultural_guidance": cultural_guidance,
        "reversibility_cycle": {
            "spermatogenesis_days": "72 to 90 days",
            "explanation": "Human spermatogenesis (the cycle of creating new mature sperm) takes approximately 74 days, plus 12-14 days of epididymal transport. Positive lifestyle and dietary changes made today will reflect in your semen parameters in roughly 3 months."
        },
        "safety": [
            "This digital tool provides educational screening and care navigation only; it DOES NOT diagnose infertility, hypogonadism, or any medical condition.",
            "Screening identifies factors for discussion with a doctor; a low number of flags never rules out an underlying medical issue.",
            "Clinical evaluation, physical examination, and laboratory confirmation by a licensed medical practitioner are mandatory for any diagnosis.",
            "If sudden, severe testicular pain occurs at any time, stop and seek emergency hospital medical assessment immediately."
        ]
    }

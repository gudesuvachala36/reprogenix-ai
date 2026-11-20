FAQ = [
    (
        "semen analysis",
        (
            "A semen analysis is the foundational laboratory test for male reproductive evaluation. According to WHO 6th Edition (2021) guidelines, "
            "standard parameters include: Ejaculate Volume (>= 1.4 mL), Sperm Concentration (>= 15 million/mL), Total Motility (>= 42%), Progressive Motility (>= 30%), "
            "and Normal Strict Morphology (>= 4%). A sample requires 2 to 7 days of sexual abstinence before collection. "
            "Importantly, a single test alone is not diagnostic because sperm counts naturally fluctuate; clinicians typically recommend a confirmatory repeat test 4 to 6 weeks later."
        )
    ),
    (
        "who guidelines",
        (
            "The World Health Organization (WHO) published its 6th Edition Laboratory Manual for the Examination and Processing of Human Semen in 2021. "
            "It establishes global 5th-percentile lower reference limits based on fertile men whose partners conceived within 12 months. Values below reference limits "
            "indicate subfertility risk but do not prove infertility, as men with sub-threshold numbers can still father biological children."
        )
    ),
    (
        "privacy",
        (
            "Reprogenix AI employs strict Privacy by Design: assessments are processed purely in ephemeral RAM and are never written to a persistent database or disk. "
            "We do not collect names, phone numbers, email addresses, or government IDs. Zero data is shared with insurers, employers, or ad networks. "
            "Users hold full control to generate, print, or immediately wipe their session summary."
        )
    ),
    (
        "when to seek help",
        (
            "Seek IMMEDIATE hospital emergency care (A&E/ER) for sudden, severe testicular pain, as testicular torsion requires surgical correction within 6 hours to preserve tissue. "
            "Schedule a prompt clinical appointment for any persistent lump, firmness, swelling, or blood in urine or semen. "
            "For family planning, consult a healthcare provider after 12 months of regular unprotected intercourse, or after 6 months if the female partner is 35 or older."
        )
    ),
    (
        "emergency",
        (
            "Acute sudden severe testicular pain is an absolute emergency. It can indicate testicular torsion—a twisting of the spermatic cord that cuts off blood supply. "
            "Do not delay for online screenings, hot baths, or painkillers. Proceed immediately to the nearest Emergency Department."
        )
    ),
    (
        "fertility",
        (
            "Male fertility is an equal 50% contributor to couple conception. Evaluation should always be conducted in parallel for both partners to avoid unnecessary diagnostic delays. "
            "Initial male workup includes detailed medical/surgical history, lifestyle review, physical examination, and two semen analyses."
        )
    ),
    (
        "varicocele",
        (
            "A varicocele is an abnormal enlargement of the pampiniform venous plexus within the scrotum, resembling a 'bag of worms' on examination. "
            "It occurs in ~15% of all adult men and ~35-40% of men presenting with primary subfertility. Varicoceles increase scrotal temperature and elevate oxidative stress. "
            "Microscopic varicocelectomy or percutaneous embolization performed by a urologist has been shown in clinical trials to improve semen parameters in 60-70% of treated men."
        )
    ),
    (
        "testosterone",
        (
            "Exogenous testosterone (including TRT, injections, gels, or anabolic steroids) acts as a powerful male contraceptive. "
            "It suppresses pituitary secretion of LH and FSH through negative feedback, which paradoxically halts intratesticular testosterone production and causes severe oligozoospermia or complete azoospermia (zero sperm). "
            "Fortunately, sperm production often recovers after stopping testosterone, frequently facilitated by andrologists using SERMs (e.g. Clomiphene) or hCG."
        )
    ),
    (
        "steroid",
        (
            "Anabolic androgenic steroids (AAS) suppress the hypothalamic-pituitary-gonadal (HPG) axis, frequently shutting down spermatogenesis completely. "
            "Recovery following cessation takes between 3 to 18 months depending on compound type, dosage, and duration. An andrologist can perform an endocrine recovery workup."
        )
    ),
    (
        "cultural",
        (
            "Male reproductive health carries social stigma across many communities, with fertility often mistakenly conflated with virility or manhood. "
            "In reality, reproductive health is a clinical vital sign linked to vascular and hormonal longevity. For religious adherents (Islamic, Catholic, Orthodox Jewish) "
            "who cannot produce semen through masturbation, clinical protocols allow the use of special non-spermicidal, perforated Silastic condoms (e.g., Male-Factor Pak) during marital relations."
        )
    ),
    (
        "faith",
        (
            "Many faith traditions have specific bioethical guidance regarding reproductive testing. Major traditions encourage seeking medical assessment to care for one's family and spouse. "
            "Where masturbation is forbidden, non-spermicidal perforated condoms allow specimen collection during marital intimacy. Discuss your faith preferences with your clinician."
        )
    ),
    (
        "home test",
        (
            "At-home semen testing options range from rapid smartphone-connected optical microscopes to accredited mail-in laboratory kits. "
            "Mail-in kits with temperature-stabilized transport buffers provide comprehensive parameters (concentration, motility, morphology) verified by CLIA/CAP-certified labs, "
            "serving as a low-friction, discreet initial assessment before an in-person clinic visit."
        )
    ),
    (
        "reversibility",
        (
            "The human spermatogenesis cycle (production, maturation, and transport of new sperm) takes approximately 72 to 90 days. "
            "Because of this biological cycle, positive changes you make today—such as quitting smoking, reducing scrotal heat, correcting nutrient deficiencies, or exercising—will be evident in your semen parameters in about 3 months."
        )
    ),
    (
        "finasteride",
        (
            "Finasteride (used for male pattern hair loss or benign prostatic hyperplasia) inhibits the 5-alpha reductase enzyme that converts testosterone to DHT. "
            "In a subset of men, it may mildly reduce sperm count, motility, or ejaculate volume. These changes are typically fully reversible within 3 to 6 months of discontinuation."
        )
    ),
    (
        "cryptorchidism",
        (
            "Cryptorchidism (an undescended testicle in infancy or childhood) is one of the most established risk factors for male subfertility and testicular cancer. "
            "Even if surgically corrected in childhood (orchiopexy), men with a history of undescended testis should undergo baseline semen analysis and practice regular monthly testicular self-examinations."
        )
    )
]

def answer_question(question: str) -> str:
    q = question.lower().strip()
    if not q:
        return "Please ask a question regarding male reproductive health, testing, or care navigation."
    
    for key, answer in FAQ:
        if key in q:
            return answer
            
    return (
        "I can share general, evidence-based educational information on male reproductive health, screening tests, and care navigation, "
        "but I cannot provide a medical diagnosis or interpret individual clinical cases. "
        "You can ask about semen analysis reference values (WHO guidelines), varicocele, testosterone/steroid impacts, "
        "at-home testing, 90-day lifestyle reversibility, faith-sensitive collection methods, or privacy guarantees."
    )

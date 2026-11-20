export const DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Johnson',
    nameKey: 'nameDrSarahJohnson',
    specialty: 'Lead Andrologist & Reproductive Specialist',
    specialtyKey: 'doc1Specialty',
    avatar: 'SJ',
    avatarColor: 'bg-emerald-500 text-white',
    status: 'Available',
    statusKey: 'available',
    patients: 234,
    rating: 4.9,
    experience: 15,
    email: 's.johnson@reprogenix.health',
    phone: '+1 (555) 382-9011'
  },
  {
    id: 'doc-2',
    name: 'Dr. Michael Chen',
    nameKey: 'nameDrMichaelChen',
    specialty: 'Urologic Surgeon & Male Fertility',
    specialtyKey: 'doc2Specialty',
    avatar: 'MC',
    avatarColor: 'bg-teal-600 text-white',
    status: 'In Surgery',
    statusKey: 'inSurgery',
    patients: 189,
    rating: 4.8,
    experience: 12,
    email: 'm.chen@reprogenix.health',
    phone: '+1 (555) 491-2300'
  },
  {
    id: 'doc-3',
    name: 'Dr. Emily Roberts',
    nameKey: 'nameDrEmilyRoberts',
    specialty: 'Reproductive Endocrinologist',
    specialtyKey: 'doc3Specialty',
    avatar: 'ER',
    avatarColor: 'bg-lime-600 text-white',
    status: 'Available',
    statusKey: 'available',
    patients: 312,
    rating: 5.0,
    experience: 10,
    email: 'e.roberts@reprogenix.health',
    phone: '+1 (555) 723-8841'
  },
  {
    id: 'doc-4',
    name: 'Dr. James Wilson',
    nameKey: 'nameDrJamesWilson',
    specialty: 'Genomics & Male Subfertility',
    specialtyKey: 'doc4Specialty',
    avatar: 'JW',
    avatarColor: 'bg-cyan-600 text-white',
    status: 'On Leave',
    statusKey: 'onLeave',
    patients: 156,
    rating: 4.7,
    experience: 18,
    email: 'j.wilson@reprogenix.health',
    phone: '+1 (555) 834-1192'
  }
]

export const NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New Patient Registered',
    titleKey: 'notifNewPatient',
    message: 'Carlos Mendoza has completed the pre-conception digital intake.',
    messageKey: 'notifNewPatientMsg',
    time: '5 min ago',
    timeKey: 'time5MinAgo',
    type: 'patient',
    read: false,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'notif-2',
    title: 'Appointment Scheduled',
    titleKey: 'notifAptScheduled',
    message: 'New tele-consultation with Marcus Vance confirmed for 3:00 PM.',
    messageKey: 'notifAptScheduledMsg',
    time: '18 min ago',
    timeKey: 'time18MinAgo',
    type: 'calendar',
    read: false,
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'notif-3',
    title: 'Lab Results Ready',
    titleKey: 'notifLabReady',
    message: 'WHO 6th Ed semen analysis for Tariq Al-Mansoor is available for review.',
    messageKey: 'notifLabReadyMsg',
    time: '1 hour ago',
    timeKey: 'time1HourAgo',
    type: 'lab',
    read: false,
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'notif-4',
    title: 'High Risk Anomaly Flagged',
    titleKey: 'notifHighRisk',
    message: 'Liam Gallagher: Total testosterone 220 ng/dL + severe oligozoospermia.',
    messageKey: 'notifHighRiskMsg',
    time: '2 hours ago',
    timeKey: 'time2HoursAgo',
    type: 'alert',
    read: true,
    color: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'notif-5',
    title: '72-Day Milestone Due',
    titleKey: 'notif72Day',
    message: 'Marcus Vance has reached spermatogenesis day 48; mid-cycle checkup due.',
    messageKey: 'notif72DayMsg',
    time: '1 day ago',
    timeKey: 'time1DayAgo',
    type: 'cycle',
    read: true,
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  }
]

export const PATIENTS = [
  {
    id: 'pat-1',
    mrn: 'MRN-882194',
    name: 'Marcus Vance',
    nameKey: 'nameMarcusVance',
    age: 29,
    occupation: 'Lead Software Architect',
    occupationKey: 'occSoftwareArchitect',
    avatar: 'MV',
    avatarColor: 'bg-emerald-600 text-white',
    riskLevel: 'Moderate Risk',
    riskScore: 68,
    triageTier: 'Tier 2: Primary Care & Lifestyle Optimization',
    status: 'Action Required',
    doctor: 'Dr. Sarah Johnson',
    doctorNameKey: 'nameDrSarahJohnson',
    lastAssessment: '2025-11-10',
    tryingToConceiveMonths: 0,
    primaryConcern: 'Prolonged laptop heat, sedentary 10h/day, poor sleep (5.5h)',
    concernKey: 'concernPat1',
    semenParameters: {
      volume: 2.4, // WHO >= 1.4 mL
      concentration: 14.0, // WHO >= 16 M/mL (mildly low)
      progressiveMotility: 29.0, // WHO >= 30% (borderline low)
      normalMorphology: 4.2, // WHO >= 4.0%
      ph: 7.6,
      viability: 68,
    },
    endocrine: {
      totalTestosterone: 380, // ng/dL (normal 300-1000)
      fsh: 3.4, // mIU/mL
      lh: 3.1, // mIU/mL
      estradiol: 24, // pg/mL
    },
    lifestyle: {
      bmi: 26.2,
      smoking: 'Non-smoker',
      alcohol: 'Weekly (1-2 drinks)',
      sleepHours: 5.5,
      exerciseDays: 1,
      heatExposure: 'Daily laptop on lap (6h+) & hot tubs',
      cyclingHours: 2,
    },
    medicalHistory: {
      varicocele: 'No evidence',
      cryptorchidism: 'None',
      surgeries: 'None',
      medications: 'Occasional NSAIDs, Multivitamin',
      familyHistory: 'No known genetic reproductive disorders',
    },
    spermatogenesisProgress: {
      currentDay: 48,
      totalDays: 75,
      milestone: 'Mid-Cycle Temperature Control & Antioxidant Phase',
      targetTestDate: '2025-12-15'
    },
    signals: [
      {
        domain: 'Thermal Stress & Lifestyle',
        severity: 'high',
        text: 'Frequent laptop thermal transfer to scrotal area increases intra-testicular temp by 1.8°C, impairing motility enzymes.',
        guideline: 'EAU Male Infertility Guidelines (2024)'
      },
      {
        domain: 'Sleep Deprivation & Cortisol',
        severity: 'medium',
        text: 'Chronically restricted sleep (<6h) suppresses nocturnal LH pulses and peak early-morning testosterone synthesis.',
        guideline: 'AUA/ASRM Guidelines on Male Infertility (2024)'
      },
      {
        domain: 'Semen Analysis (WHO 6th)',
        severity: 'medium',
        text: 'Sperm concentration at 14 M/mL sits slightly below the WHO 5th percentile reference threshold (16 M/mL). Fully modifiable within 72 days.',
        guideline: 'WHO Laboratory Manual 6th Edition (2021)'
      }
    ]
  },
  {
    id: 'pat-2',
    mrn: 'MRN-741902',
    name: 'Tariq Al-Mansoor',
    nameKey: 'nameTariqAlMansoor',
    age: 34,
    occupation: 'Senior Urban Architect',
    occupationKey: 'occUrbanArchitect',
    avatar: 'TA',
    avatarColor: 'bg-teal-700 text-white',
    riskLevel: 'Moderate Risk',
    riskScore: 62,
    triageTier: 'Tier 3: Couple-Centred Subfertility Investigation',
    status: 'In Consultation',
    doctor: 'Dr. Sarah Johnson',
    doctorNameKey: 'nameDrSarahJohnson',
    lastAssessment: '2025-11-08',
    tryingToConceiveMonths: 14,
    primaryConcern: 'Trying to conceive 14 months, seeking faith-aligned dignified care',
    semenParameters: {
      volume: 2.2,
      concentration: 12.0,
      progressiveMotility: 28.0,
      normalMorphology: 3.5,
      ph: 7.4,
      viability: 62,
    },
    endocrine: {
      totalTestosterone: 420,
      fsh: 4.2,
      lh: 3.8,
      estradiol: 26,
    },
    lifestyle: {
      bmi: 23.8,
      smoking: 'Never',
      alcohol: 'Never (Faith-aligned)',
      sleepHours: 7.5,
      exerciseDays: 4,
      heatExposure: 'Minimal',
      cyclingHours: 0,
    },
    medicalHistory: {
      varicocele: 'Subclinical left varicocele',
      cryptorchidism: 'None',
      surgeries: 'None',
      medications: 'None',
      culturalProtocol: 'Faith-conscious, non-spermicidal collection preferred',
    },
    spermatogenesisProgress: {
      currentDay: 72,
      totalDays: 75,
      milestone: '72-Day End-of-Cycle Evaluation Due',
      targetTestDate: '2025-11-18'
    },
    signals: [
      {
        domain: 'TTC Duration (14 Months)',
        severity: 'high',
        text: 'Exceeds 12-month clinical definition of couple subfertility; concurrent female & male parallel workup recommended.',
        guideline: 'NICE Clinical Guideline CG156 / AUA 2024'
      },
      {
        domain: 'Mild Asthenoteratozoospermia',
        severity: 'medium',
        text: 'Motility 28% and morphology 3.5% indicate sub-optimal fertilizing capacity. High response rate to CoQ10 & Zinc.',
        guideline: 'WHO Laboratory Manual 6th Edition'
      }
    ]
  },
  {
    id: 'pat-3',
    mrn: 'MRN-618420',
    name: 'Liam Gallagher',
    nameKey: 'nameLiamGallagher',
    age: 32,
    occupation: 'Fitness Trainer & Bodybuilding Coach',
    occupationKey: 'occFitnessTrainer',
    avatar: 'LG',
    avatarColor: 'bg-rose-600 text-white',
    riskLevel: 'High Risk',
    riskScore: 34,
    triageTier: 'Tier 1: Specialist Andrologist & Endocrine Referral',
    triageTierKey: 'triagePat3',
    status: 'High Risk',
    doctor: 'Dr. Michael Chen',
    doctorNameKey: 'nameDrMichaelChen',
    lastAssessment: '2025-11-11',
    tryingToConceiveMonths: 6,
    primaryConcern: 'History of anabolic steroid use (stopped 4 mos ago) + Grade II Varicocele',
    semenParameters: {
      volume: 1.1,
      concentration: 3.2,
      progressiveMotility: 18.0,
      normalMorphology: 2.0,
      ph: 7.2,
      viability: 45,
    },
    endocrine: {
      totalTestosterone: 220,
      fsh: 1.2,
      lh: 0.8,
      estradiol: 42,
    },
    lifestyle: {
      bmi: 27.5,
      smoking: 'Non-smoker',
      alcohol: 'Occasional',
      sleepHours: 7.0,
      exerciseDays: 6,
      heatExposure: 'Saunas 3x/week',
      heatExposureKey: 'heatExposureSaunas',
      cyclingHours: 1,
    },
    medicalHistory: {
      varicocele: 'Palpable Grade II left-sided varicocele with testicular discomfort',
      varicoceleKey: 'varicocelePat3',
      cryptorchidism: 'None',
      surgeries: 'None',
      medications: 'Past testosterone cypionate / trenbolone; Finasteride 1mg (hair loss)',
      medicationsKey: 'medicationsPat3',
    },
    spermatogenesisProgress: {
      currentDay: 21,
      totalDays: 90,
      milestone: 'Endocrine Axis Restart & Clomiphene / HCG Induction',
      milestoneKey: 'milestonePat3',
      targetTestDate: '2026-01-15'
    },
    signals: [
      {
        domain: 'Exogenous Androgen Hypogonadism',
        severity: 'critical',
        text: 'Suppressed LH (0.8) and FSH (1.2) with total T of 220 ng/dL demonstrates prolonged HPTA negative feedback shutdown.',
        guideline: 'AUA/ASRM Guideline (2024 Update)'
      },
      {
        domain: 'Grade II Clinical Varicocele',
        severity: 'high',
        text: 'Palpable varicocele with severe oligozoospermia (3.2 M/mL). Surgical microsurgical repair indicated to rescue spermatogenesis.',
        guideline: 'EAU Guidelines on Male Infertility (2024)'
      },
      {
        domain: '5-Alpha Reductase Inhibitor (Finasteride)',
        severity: 'medium',
        text: 'Finasteride 1mg may suppress semen count and volume in sensitive individuals; cessation recommended under supervision.',
        guideline: 'AUA Guideline Statement 14'
      }
    ]
  },
  {
    id: 'pat-4',
    mrn: 'MRN-529013',
    name: 'David Chen',
    nameKey: 'nameDavidChen',
    age: 44,
    occupation: 'Commercial Fleet Manager',
    occupationKey: 'occFleetManager',
    avatar: 'DC',
    avatarColor: 'bg-amber-600 text-white',
    riskLevel: 'High Risk',
    riskScore: 42,
    triageTier: 'Tier 1: Cardiometabolic & Andrological Evaluation',
    status: 'Action Required',
    doctor: 'Dr. Emily Roberts',
    doctorNameKey: 'nameDrEmilyRoberts',
    lastAssessment: '2025-11-05',
    tryingToConceiveMonths: 0,
    primaryConcern: 'Type 2 Diabetes, Treated Hypertension, BMI 31.4, mild erectile fatigue',
    semenParameters: {
      volume: 1.8,
      concentration: 8.5,
      progressiveMotility: 22.0,
      normalMorphology: 3.1,
      ph: 7.3,
      viability: 54,
    },
    endocrine: {
      totalTestosterone: 295,
      fsh: 6.8,
      lh: 5.4,
      estradiol: 38,
    },
    lifestyle: {
      bmi: 31.4,
      smoking: 'Active (10 cig/day)',
      alcohol: 'Weekly (4-5 drinks)',
      sleepHours: 5.0,
      exerciseDays: 1,
      heatExposure: 'Commercial driving 8h/day (heated cab seats)',
      cyclingHours: 0,
    },
    medicalHistory: {
      varicocele: 'None',
      cryptorchidism: 'None',
      surgeries: 'Appendectomy (2012)',
      medications: 'Metformin 1000mg, Lisinopril 10mg',
    },
    spermatogenesisProgress: {
      currentDay: 35,
      totalDays: 75,
      milestone: 'Metabolic Glucose Control & Smoking Cessation Support',
      targetTestDate: '2025-12-20'
    },
    signals: [
      {
        domain: 'Cardiometabolic Vascular Disease',
        severity: 'high',
        text: 'T2D and elevated BMI cause microvascular endothelial dysfunction, directly reducing testicular perfusion and Leydig cell steroidogenesis.',
        guideline: 'EAU Sexual & Reproductive Health Guidelines (2024)'
      },
      {
        domain: 'Cigarette Smoking & ROS Damage',
        severity: 'high',
        text: 'Active smoking induces seminal reactive oxygen species (ROS), driving sperm DNA fragmentation index (DFI) >30%.',
        guideline: 'WHO Manual 6th Edition (2021)'
      }
    ]
  },
  {
    id: 'pat-5',
    mrn: 'MRN-990142',
    name: 'Ethan Wright',
    nameKey: 'nameEthanWright',
    age: 21,
    occupation: 'University Student',
    occupationKey: 'occUniversityStudent',
    avatar: 'EW',
    avatarColor: 'bg-red-700 text-white',
    riskLevel: 'Emergency Flag',
    riskScore: 15,
    triageTier: 'Tier 0: Immediate Emergency Department Referral',
    status: 'Emergency Flag',
    doctor: 'Dr. Sarah Johnson',
    doctorNameKey: 'nameDrSarahJohnson',
    lastAssessment: '2025-11-13',
    tryingToConceiveMonths: 0,
    primaryConcern: 'Sudden onset (2h ago) severe acute unilateral testicular pain with nausea',
    concernKey: 'concernPat7',
    semenParameters: {
      volume: null,
      concentration: null,
      progressiveMotility: null,
      normalMorphology: null,
    },
    endocrine: null,
    lifestyle: {
      bmi: 22.1,
      smoking: 'Non-smoker',
      alcohol: 'Occasional',
      sleepHours: 7.0,
      exerciseDays: 3,
      heatExposure: 'None',
      cyclingHours: 0,
    },
    medicalHistory: {
      varicocele: 'Acute tender hemiscrotum, high-riding testis, absent cremasteric reflex',
      cryptorchidism: 'None',
      surgeries: 'None',
      medications: 'None',
    },
    spermatogenesisProgress: {
      currentDay: 1,
      totalDays: 1,
      milestone: 'EMERGENCY: Immediate Scrotal Color Doppler Ultrasound & Surgical Exploration',
      targetTestDate: 'TODAY'
    },
    signals: [
      {
        domain: 'Suspected Testicular Torsion',
        severity: 'critical',
        text: 'Acute onset severe testicular pain with nausea and unilateral swelling is a surgical emergency. Testicular salvage rate decreases sharply after 6 hours.',
        guideline: 'AUA Acute Scrotal Pain Emergency Protocol'
      }
    ]
  },
  {
    id: 'pat-6',
    mrn: 'MRN-430981',
    name: 'Carlos Mendoza',
    nameKey: 'nameCarlosMendoza',
    age: 36,
    occupation: 'Senior Research Biologist',
    occupationKey: 'occResearchBiologist',
    avatar: 'CM',
    avatarColor: 'bg-emerald-700 text-white',
    riskLevel: 'Low Risk',
    riskScore: 89,
    triageTier: 'Tier 4: Preventive Self-Care & Optimal Longevity',
    status: 'Confirmed',
    doctor: 'Dr. James Wilson',
    doctorNameKey: 'nameDrJamesWilson',
    lastAssessment: '2025-11-09',
    tryingToConceiveMonths: 2,
    primaryConcern: 'Proactive pre-conception check, optimizing fertility before pregnancy',
    concernKey: 'concernPat6',
    semenParameters: {
      volume: 3.2,
      concentration: 48.0,
      progressiveMotility: 62.0,
      normalMorphology: 7.5,
      ph: 7.5,
      viability: 82,
    },
    endocrine: {
      totalTestosterone: 590,
      fsh: 3.1,
      lh: 3.0,
      estradiol: 22,
    },
    lifestyle: {
      bmi: 23.4,
      smoking: 'Non-smoker',
      alcohol: 'Rarely',
      sleepHours: 8.0,
      exerciseDays: 4,
      heatExposure: 'None',
      cyclingHours: 1,
    },
    medicalHistory: {
      varicocele: 'None',
      cryptorchidism: 'None',
      surgeries: 'None',
      medications: 'CoQ10 200mg, Vitamin D3',
    },
    spermatogenesisProgress: {
      currentDay: 60,
      totalDays: 75,
      milestone: 'Excellent Baseline Maintenance & Preconception Readiness',
      targetTestDate: '2025-11-30'
    },
    signals: [
      {
        domain: 'Optimal Semen Profile',
        severity: 'low',
        text: 'All semen parameters exceed WHO 6th Edition 50th percentile benchmarks. Excellent progressive motility (62%).',
        guideline: 'WHO Laboratory Manual 6th Edition'
      }
    ]
  },
  {
    id: 'pat-7',
    mrn: 'MRN-331088',
    name: 'Alexander Dubois',
    nameKey: 'nameAlexanderDubois',
    age: 39,
    occupation: 'Private Equity Analyst',
    occupationKey: 'occPrivateEquity',
    avatar: 'AD',
    avatarColor: 'bg-blue-600 text-white',
    riskLevel: 'Moderate Risk',
    riskScore: 58,
    triageTier: 'Tier 2: Primary Care Lifestyle & Repeat Test',
    status: 'Scheduled',
    doctor: 'Dr. Michael Chen',
    doctorNameKey: 'nameDrMichaelChen',
    lastAssessment: '2025-11-02',
    tryingToConceiveMonths: 8,
    primaryConcern: 'High cortisol, 70h work weeks, mild oligozoospermia',
    semenParameters: {
      volume: 2.0,
      concentration: 11.0,
      progressiveMotility: 31.0,
      normalMorphology: 3.8,
      ph: 7.4,
      viability: 60,
    },
    endocrine: {
      totalTestosterone: 340,
      fsh: 5.1,
      lh: 4.2,
      estradiol: 30,
    },
    lifestyle: {
      bmi: 25.8,
      smoking: 'Non-smoker',
      alcohol: 'Weekly (3-4 drinks)',
      sleepHours: 5.8,
      exerciseDays: 2,
      heatExposure: 'Frequent business travel, tight clothing',
      cyclingHours: 0,
    },
    medicalHistory: {
      varicocele: 'Grade I left (non-palpable, detected on US)',
      cryptorchidism: 'None',
      surgeries: 'None',
      medications: 'None',
    },
    spermatogenesisProgress: {
      currentDay: 42,
      totalDays: 75,
      milestone: 'Stress Modulation & Sleep Hygiene Protocol',
      targetTestDate: '2025-12-10'
    },
    signals: [
      {
        domain: 'Occupational Stress & Sleep',
        severity: 'medium',
        text: 'Elevated stress and short sleep duration disrupt normal HPTA circadian signaling.',
        guideline: 'AUA 2024 Guidelines'
      }
    ]
  },
  {
    id: 'pat-8',
    mrn: 'MRN-210943',
    name: "Samuel O'Connor",
    nameKey: 'nameSamuelOConnor',
    age: 28,
    occupation: 'Cloud Infrastructure Engineer',
    occupationKey: 'occCloudEngineer',
    avatar: 'SO',
    avatarColor: 'bg-indigo-600 text-white',
    riskLevel: 'Low Risk',
    riskScore: 74,
    triageTier: 'Tier 4: Preventive Self-Care & Thermal Protection',
    status: 'Completed',
    doctor: 'Dr. Emily Roberts',
    doctorNameKey: 'nameDrEmilyRoberts',
    lastAssessment: '2025-10-25',
    tryingToConceiveMonths: 0,
    primaryConcern: 'Intense road cycling (15 hrs/week) causing perineal numbness and heat',
    concernKey: 'concernPat8',
    semenParameters: {
      volume: 2.8,
      concentration: 24.0,
      progressiveMotility: 44.0,
      normalMorphology: 5.0,
      ph: 7.5,
      viability: 74,
    },
    endocrine: {
      totalTestosterone: 480,
      fsh: 2.8,
      lh: 2.9,
      estradiol: 21,
    },
    lifestyle: {
      bmi: 22.0,
      smoking: 'Non-smoker',
      alcohol: 'Rarely',
      sleepHours: 7.8,
      exerciseDays: 5,
      heatExposure: 'Padded cycling shorts & saddle friction (15h/wk)',
      cyclingHours: 15,
    },
    medicalHistory: {
      varicocele: 'None',
      cryptorchidism: 'None',
      surgeries: 'None',
      medications: 'Electrolytes, Protein isolate',
    },
    spermatogenesisProgress: {
      currentDay: 68,
      totalDays: 75,
      milestone: 'Noseless Saddle Adopted & Heat Dissipation Validated',
      targetTestDate: '2025-11-25'
    },
    signals: [
      {
        domain: 'Bicycle Saddle Compression & Temperature',
        severity: 'medium',
        text: 'Extended road cycling (>10h/week) causes mechanical compression of pudendal nerve and elevated scrotal surface temperatures.',
        guideline: 'EAU Guidelines on Sexual & Reproductive Health'
      }
    ]
  }
]

export const APPOINTMENTS = [
  {
    id: 'apt-1',
    patientId: 'pat-1',
    patientName: 'Marcus Vance',
    patientNameKey: 'nameMarcusVance',
    doctorName: 'Dr. Sarah Johnson',
    doctorNameKey: 'nameDrSarahJohnson',
    date: '2025-11-16',
    time: '3:00 PM - 3:30 PM',
    type: 'Tele-Andrology Initial Review',
    typeKey: 'aptTypeTeleAndrology',
    status: 'Confirmed',
    location: 'Encrypted Video Room 4B',
    locationKey: 'locEncryptedRoom4B',
    notes: 'Review baseline WHO 6th Ed semen metrics; discuss laptop thermal management & 72-day reversibility plan.',
    notesKey: 'aptNotes1',
    isTelehealth: true
  },
  {
    id: 'apt-2',
    patientId: 'pat-2',
    patientName: 'Tariq Al-Mansoor',
    patientNameKey: 'nameTariqAlMansoor',
    doctorName: 'Dr. Sarah Johnson',
    doctorNameKey: 'nameDrSarahJohnson',
    date: '2025-11-17',
    time: '10:30 AM - 11:15 AM',
    type: 'Couple-Centred Subfertility Consultation',
    typeKey: 'aptTypeCouple',
    status: 'Confirmed',
    location: 'Consultation Suite 201',
    locationKey: 'locSuite201',
    notes: 'Faith-conscious subfertility workup; review partner status and discuss non-spermicidal collection protocols.',
    notesKey: 'aptNotes2',
    isTelehealth: false
  },
  {
    id: 'apt-3',
    patientId: 'pat-3',
    patientName: 'Liam Gallagher',
    patientNameKey: 'nameLiamGallagher',
    doctorName: 'Dr. Michael Chen',
    doctorNameKey: 'nameDrMichaelChen',
    date: '2025-11-18',
    time: '1:15 PM - 2:00 PM',
    type: 'Microsurgical Varicocele & Endocrine Plan',
    typeKey: 'aptTypeMicrosurgical',
    status: 'Waiting',
    location: 'Urology Clinical Wing C',
    locationKey: 'locWingC',
    notes: 'Scrotal duplex ultrasound review. Grade II left varicocele with persistent subfertility following AAS cessation.',
    notesKey: 'aptNotes3',
    isTelehealth: false
  },
  {
    id: 'apt-4',
    patientId: 'pat-4',
    patientName: 'David Chen',
    patientNameKey: 'nameDavidChen',
    doctorName: 'Dr. Emily Roberts',
    doctorNameKey: 'nameDrEmilyRoberts',
    date: '2025-11-19',
    time: '11:00 AM - 11:45 AM',
    type: 'Cardiometabolic & Testosterone Workup',
    typeKey: 'aptTypeCardiometabolic',
    status: 'Confirmed',
    location: 'Telehealth Room 2A',
    locationKey: 'locRoom2A',
    notes: 'Metabolic syndrome, HbA1c review, smoking cessation and Leydig cell hypogonadism management.',
    notesKey: 'aptNotes4',
    isTelehealth: true
  },
  {
    id: 'apt-5',
    patientId: 'pat-6',
    patientName: 'Carlos Mendoza',
    patientNameKey: 'nameCarlosMendoza',
    doctorName: 'Dr. James Wilson',
    doctorNameKey: 'nameDrJamesWilson',
    date: '2025-11-20',
    time: '4:00 PM - 4:30 PM',
    type: 'Pre-Conception Preventive Wrap-up',
    typeKey: 'aptTypePreConception',
    status: 'Confirmed',
    location: 'Telehealth Room 1B',
    locationKey: 'locRoom1B',
    notes: 'Review excellent semen parameters (48 M/mL) and confirm preconception micronutrient optimization.',
    notesKey: 'aptNotes5',
    isTelehealth: true
  }
]

export const FOLLOW_UPS = [
  {
    id: 'fu-1',
    patientId: 'pat-1',
    patientName: 'Marcus Vance',
    patientNameKey: 'nameMarcusVance',
    title: 'Mid-Cycle 72-Day Semen Re-Check',
    titleKey: 'followUpTitle1',
    dueDate: '2025-12-15',
    status: 'Due Soon',
    progress: 64, // 48 / 75
    category: 'WHO 6th Ed Semen Analysis',
    assignedTo: 'Dr. Sarah Johnson',
    notes: 'Verify sperm concentration rebound (>16 M/mL) following 6 weeks of scrotal heat dissipation.',
    notesKey: 'fuNotes1'
  },
  {
    id: 'fu-2',
    patientId: 'pat-2',
    patientName: 'Tariq Al-Mansoor',
    patientNameKey: 'nameTariqAlMansoor',
    title: 'Post-72 Day Spermatogenesis Final Evaluation',
    titleKey: 'followUpTitle2',
    dueDate: '2025-11-18',
    status: 'Due This Week',
    progress: 96, // 72 / 75
    category: 'Couple Fertility Re-Assessment',
    assignedTo: 'Dr. Sarah Johnson',
    notes: 'Evaluate motility gains after 12 weeks of antioxidant supplementation (CoQ10 + Zinc).',
    notesKey: 'fuNotes2'
  },
  {
    id: 'fu-3',
    patientId: 'pat-3',
    patientName: 'Liam Gallagher',
    patientNameKey: 'nameLiamGallagher',
    title: 'Endocrine Panel & LH/FSH Recovery',
    titleKey: 'followUpTitle3',
    dueDate: '2025-12-05',
    status: 'Scheduled',
    progress: 23, // 21 / 90
    category: 'Serum Hormone Biomarkers',
    assignedTo: 'Dr. Michael Chen',
    notes: 'Re-test morning serum Total Testosterone, LH, and FSH to evaluate spontaneous hypothalamic recovery.',
    notesKey: 'fuNotes3'
  },
  {
    id: 'fu-4',
    patientId: 'pat-4',
    patientName: 'David Chen',
    patientNameKey: 'nameDavidChen',
    title: 'Cardiometabolic Glucose & DFI Test',
    titleKey: 'followUpTitle4',
    dueDate: '2025-12-20',
    status: 'Pending',
    progress: 46, // 35 / 75
    category: 'DNA Fragmentation Index (DFI)',
    assignedTo: 'Dr. Emily Roberts',
    notes: 'Assess reduction in reactive oxygen species (ROS) and sperm DNA fragmentation after smoking reduction.',
    notesKey: 'fuNotes4'
  }
]

export const CLINICAL_ANALYTICS = {
  totalCohortPatients: 1250,
  highRiskTriageRate: '24.2%',
  moderateRiskRate: '45.6%',
  lowRiskRate: '30.2%',
  diagnosticDelayDaysBefore: 552, // 18.4 months
  diagnosticDelayDaysAfter: 16, // 2.3 weeks
  delayReductionPercent: '87.5%',
  avoidedUnnecessaryVisits: '41.8%',
  fairnessParityRatio: 0.97,
  triageDistribution: [
    { tier: 'Tier 0: Emergency Scrotal', count: 32, percent: 2.6, color: '#e11d48' },
    { tier: 'Tier 1: Specialist Andrology', count: 270, percent: 21.6, color: '#ea580c' },
    { tier: 'Tier 2: Primary Care Review', count: 420, percent: 33.6, color: '#f59e0b' },
    { tier: 'Tier 3: Couple Fertility', count: 215, percent: 17.2, color: '#0284c7' },
    { tier: 'Tier 4: Preventive Health', count: 313, percent: 25.0, color: '#10b981' }
  ],
  spermatogenesisReversibility: [
    { day: 'Day 0 (Baseline)', motility: 22, concentration: 11, normalMorphology: 2.8 },
    { day: 'Day 25 (Early)', motility: 26, concentration: 13, normalMorphology: 3.2 },
    { day: 'Day 50 (Mid-Cycle)', motility: 33, concentration: 16, normalMorphology: 3.9 },
    { day: 'Day 72 (Full Regeneration)', motility: 42, concentration: 22, normalMorphology: 4.8 }
  ]
}

export const PATIENT_REPORTS = [
  {
    id: 'rep-1',
    patientId: 'pat-1',
    title: 'Comprehensive Reproductive Risk & Biomarker Summary',
    titleKey: 'reportTitle1',
    date: '2025-11-10',
    type: 'Full Clinical Report',
    typeKey: 'reportTypeFull',
    format: 'PDF',
    size: '1.4 MB',
    status: 'Verified by Dr. Sarah Johnson',
    statusKey: 'verifiedSignedStatus',
    summary: 'Multi-domain screening identified sedentary thermal elevation and borderline motility (29%). 72-day reversibility protocol initiated.'
  },
  {
    id: 'rep-2',
    patientId: 'pat-1',
    title: 'WHO 6th Edition Standard Semen Analysis',
    titleKey: 'reportTitle2',
    date: '2025-11-08',
    type: 'Diagnostic Laboratory Report',
    typeKey: 'reportTypeDiagnostic',
    format: 'PDF',
    size: '890 KB',
    status: 'Laboratory Validated',
    statusKey: 'verifiedSignedStatus',
    summary: 'Volume: 2.4 mL, Concentration: 14.0 M/mL, Progressive Motility: 29.0%, Normal Morphology: 4.2%.'
  },
  {
    id: 'rep-3',
    patientId: 'pat-1',
    title: 'Endocrine & Metabolic Serum Profile',
    titleKey: 'reportTitle3',
    date: '2025-10-28',
    type: 'Endocrine Panel',
    typeKey: 'reportTypeEndocrine',
    format: 'PDF',
    size: '620 KB',
    status: 'Verified',
    statusKey: 'verifiedSignedStatus',
    summary: 'Total Testosterone: 380 ng/dL (Normal: 300-1000), LH: 3.1 mIU/mL, FSH: 3.4 mIU/mL, Fasting Glucose: 92 mg/dL.'
  },
  {
    id: 'rep-4',
    patientId: 'pat-1',
    title: 'At-Home Mail-in Biomarker Collection Kit Report',
    titleKey: 'reportTitle4',
    date: '2025-10-15',
    type: 'At-Home Screening Kit',
    typeKey: 'reportTypeAtHome',
    format: 'PDF',
    size: '1.1 MB',
    status: 'Completed',
    statusKey: 'verifiedSignedStatus',
    summary: 'Specimen integrity preserved (temperature indicator intact, liquefaction complete). Clean baseline.'
  }
]

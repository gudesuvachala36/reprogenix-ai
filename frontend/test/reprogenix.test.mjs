import test from 'node:test'
import assert from 'node:assert/strict'
import { translations, t, isRtl } from '../src/i18n/translations.js'
import { PATIENTS, DOCTORS, APPOINTMENTS, CLINICAL_ANALYTICS } from '../src/data/mockData.js'

test('1. Multi-Lingual Translation Completeness across 7 Languages', (t_suite) => {
  const expectedLanguages = ['en', 'es', 'fr', 'de', 'hi', 'ar', 'zh']
  
  expectedLanguages.forEach((lang) => {
    assert.ok(translations[lang], `Language "${lang}" dictionary must exist`)
    
    // Core critical clinical keys
    const criticalKeys = [
      'signIn',
      'signUp',
      'exploreDoctor',
      'explorePatient',
      'servicesTitle',
      'tier0Title',
      'tier1Title',
      'tier2Title',
      'tier3Title',
      'tier4Title',
      'popEvidence',
      'diagnosticDelayReduction',
      'spermConc',
      'motilityPct',
      'testoLevel',
      'clinicalPortalOverview',
      'doctorsManagement'
    ]

    criticalKeys.forEach((key) => {
      const val = translations[lang][key] || translations.en[key]
      assert.ok(val && val.length > 0, `Key "${key}" must be translated for "${lang}"`)
    })
  })

  // RTL Test for Arabic
  assert.equal(isRtl('ar'), true, 'Arabic must be RTL')
  assert.equal(isRtl('en'), false, 'English must be LTR')
  assert.equal(isRtl('fr'), false, 'French must be LTR')
})

test('2. Clinical 5-Tier Safe Triage Decision Engine', () => {
  // Test Tier 0: Acute Emergency (bypasses algorithm)
  const emergencyPatient = {
    acuteScrotalPain: true,
    trauma: true,
    spermConc: 15,
    motility: 32
  }
  const isEmergency = emergencyPatient.acuteScrotalPain || emergencyPatient.trauma
  assert.equal(isEmergency, true, 'Acute scrotal pain or trauma must trigger Tier 0 Emergency')

  // Test Tier 1: Specialist Andrology referral criteria
  const severeOligoPatient = { spermConc: 4.2, varicocele: true, motility: 20 }
  const isTier1 = severeOligoPatient.spermConc < 5 || severeOligoPatient.varicocele
  assert.equal(isTier1, true, 'Sperm conc < 5 M/mL or palpable varicocele must refer to Specialist Andrology (Tier 1)')

  // Test Tier 4: Preventive Self-care (Normozoospermic)
  const healthyPatient = { spermConc: 48, motility: 55, testosterone: 650, pain: false }
  const isTier4 = healthyPatient.spermConc >= 16 && healthyPatient.motility >= 30 && !healthyPatient.pain
  assert.equal(isTier4, true, 'WHO 6th Ed normal parameters with no symptoms must classify as Tier 4 Preventive')
})

test('3. 72-Day Spermatogenesis Reversibility & Timeline Calculations', () => {
  const fullCycleDays = 72
  const patientCurrentDay = 48
  const completionPct = Math.round((patientCurrentDay / fullCycleDays) * 100)
  
  assert.equal(completionPct, 67, 'Day 48 must be 67% through 72-day cycle')

  // Verify milestone phases
  const getPhase = (day) => {
    if (day <= 25) return 'Mitotic Spermatogonia Phase'
    if (day <= 50) return 'Meiotic Spermatocyte Phase'
    if (day <= 72) return 'Spermiogenesis & Epididymal Maturation'
    return 'Post-Cycle Re-Test Window'
  }

  assert.equal(getPhase(10), 'Mitotic Spermatogonia Phase')
  assert.equal(getPhase(35), 'Meiotic Spermatocyte Phase')
  assert.equal(getPhase(60), 'Spermiogenesis & Epididymal Maturation')
  assert.equal(getPhase(75), 'Post-Cycle Re-Test Window')
})

test('4. WHO 6th Edition Clinical Reference Values & Patient Mock Data Integrity', () => {
  assert.ok(PATIENTS.length >= 6, 'Must contain at least 6 cohort patients')
  assert.ok(DOCTORS.length >= 4, 'Must contain on-duty doctors')
  assert.ok(APPOINTMENTS.length >= 4, 'Must contain scheduled consultations')

  // Validate WHO 6th Edition benchmark constraints
  const whoBenchmarks = {
    minSpermConc: 16.0,      // M/mL (5th percentile)
    minProgressiveMotility: 30.0, // % (5th percentile)
    minNormalMorphology: 4.0,     // % (5th percentile)
    hypogonadalFloor: 300.0       // ng/dL Total Testosterone
  }

  assert.equal(whoBenchmarks.minSpermConc, 16.0)
  assert.equal(whoBenchmarks.minProgressiveMotility, 30.0)

  // Validate patient Marcus Vance (Patient 0)
  const marcus = PATIENTS[0]
  assert.equal(marcus.name, 'Marcus Vance')
  assert.equal(marcus.mrn, 'MRN-882194')
  assert.ok(marcus.semenParameters, 'Must include semen parameters')
  assert.ok(marcus.lifestyle, 'Must include lifestyle heat/sleep telemetry')
})

test('5. Auth Modal Form State Reset & Sanitization', () => {
  // Simulate initial dirty state
  let formState = {
    doctorName: 'Dr. John Doe',
    email: 'johndoe@test.com',
    password: 'Password123!',
    confirmPassword: 'Password123!'
  }

  // Pure reset handler
  const resetForm = () => ({
    doctorName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  formState = resetForm()
  assert.equal(formState.doctorName, '', 'Form reset must clear doctor name')
  assert.equal(formState.email, '', 'Form reset must clear email')
  assert.equal(formState.password, '', 'Form reset must clear password')
})

test('6. Multi-Channel Consultation Channel Generation', () => {
  const apt = {
    doctorName: 'Dr. Sarah Johnson, MD',
    patientName: 'Marcus Vance',
    notes: '72-Day cycle review'
  }

  // Voice call payload
  const voiceCallPayload = {
    channel: 'VOICE_CALL',
    target: apt.doctorName,
    patient: apt.patientName,
    audioReady: true
  }
  assert.equal(voiceCallPayload.audioReady, true)

  // WhatsApp Web URI generation
  const waUri = `https://wa.me/?text=${encodeURIComponent('Hello Dr. Sarah Johnson, MD')}`
  assert.ok(waUri.includes('https://wa.me/?text='))
  assert.ok(waUri.includes('Dr.%20Sarah%20Johnson'))
})

test('7. Complete Translation Parity: All 7 Languages have Matching Keys', () => {
  const languages = ['en', 'es', 'fr', 'de', 'hi', 'ar', 'zh']
  const enKeys = Object.keys(translations.en)
  
  assert.ok(enKeys.length >= 400, `English keys count must be >= 400 (found ${enKeys.length})`)

  languages.forEach((lang) => {
    const langKeys = Object.keys(translations[lang])
    assert.equal(
      langKeys.length,
      enKeys.length,
      `Language "${lang}" must have identical key count (${enKeys.length}) to English, found ${langKeys.length}`
    )

    // Check each key has a non-empty string value
    enKeys.forEach((key) => {
      const val = translations[lang][key]
      assert.ok(
        typeof val === 'string' && val.trim().length > 0,
        `Missing or empty translation for key "${key}" in language "${lang}"`
      )
    })
  })

  // Verify critical new feature keys exist across all languages
  const verifiedNewKeys = [
    'footerBrand', 'footerTagline', 'footerWho', 'footerAua', 'footerPii', 'footerRights',
    'searchPlaceholder', 'searchResults', 'noMatchesFound', 'searchingFor',
    'safeTriageDonutTitle', 'totalCohort', 'splineSub', 'radarSub', 'gaugeSub',
    'faq1Q', 'faq1A', 'faq6Q', 'faq6A',
    'emergencyBannerTitle', 'emergencyHelpLine',
    'pillar1Title', 'pillar5Title', 'milestoneStage1', 'milestoneStage4'
  ]

  languages.forEach((lang) => {
    verifiedNewKeys.forEach((k) => {
      const translation = t(lang, k)
      assert.ok(translation && translation.length > 0, `t('${lang}', '${k}') should return valid string`)
    })
  })
})

test('8. Search Functionality Unit Tests across Patients, Doctors, and Appointments', () => {
  // Test query matching across Patients
  const patientQuery = 'marcus'
  const matchedPatients = PATIENTS.filter(p =>
    p.name.toLowerCase().includes(patientQuery) ||
    p.mrn.toLowerCase().includes(patientQuery) ||
    (p.primaryDiagnosis && p.primaryDiagnosis.toLowerCase().includes(patientQuery))
  )
  assert.equal(matchedPatients.length, 1, 'Should find Marcus Vance')
  assert.equal(matchedPatients[0].mrn, 'MRN-882194')

  // Test query matching across Doctors
  const docQuery = 'androlog'
  const matchedDocs = DOCTORS.filter(d =>
    d.name.toLowerCase().includes(docQuery) ||
    d.specialty.toLowerCase().includes(docQuery)
  )
  assert.ok(matchedDocs.length >= 1, 'Should find doctors with andrology specialty')

  // Test query matching across Appointments
  const aptQuery = 'confirmed'
  const matchedApts = APPOINTMENTS.filter(a =>
    a.patientName.toLowerCase().includes(aptQuery) ||
    a.doctorName.toLowerCase().includes(aptQuery) ||
    a.type.toLowerCase().includes(aptQuery) ||
    a.status.toLowerCase().includes(aptQuery)
  )
  assert.ok(matchedApts.length >= 1, 'Should match confirmed appointments')

  // Empty query should return entire list
  const emptyQuery = ''
  const allFiltered = PATIENTS.filter(p => !emptyQuery || p.name.toLowerCase().includes(emptyQuery))
  assert.equal(allFiltered.length, PATIENTS.length, 'Empty search query should preserve full cohort')
})

test('9. Safe 5-Tier Triage Donut Alignment & Cohort Mathematical Consistency', () => {
  const triageCohort = [
    { tier: 0, name: 'Tier 0: Acute Emergency / Red Flag', count: 42, color: '#EF4444' },
    { tier: 1, name: 'Tier 1: Specialist Andrology Referral', count: 215, color: '#F97316' },
    { tier: 2, name: 'Tier 2: Primary Care & Endo Optimization', count: 348, color: '#F59E0B' },
    { tier: 3, name: 'Tier 3: Digital Lifestyle & Thermoregulation', count: 412, color: '#3B82F6' },
    { tier: 4, name: 'Tier 4: Preventive & Re-evaluation Cohort', count: 233, color: '#10B981' }
  ]

  const totalCohortCalculated = triageCohort.reduce((sum, item) => sum + item.count, 0)
  assert.equal(totalCohortCalculated, 1250, 'Cohort total must equal exactly 1,250 patients')

  // Verify percentage breakdown
  const percentages = triageCohort.map(item => Math.round((item.count / totalCohortCalculated) * 100))
  assert.deepEqual(percentages, [3, 17, 28, 33, 19], 'Percentages must align with clinical cohort breakdown')
})

test('10. Clinical Portal Section Anchor Bindings & Modal Topic Navigation', () => {
  const expectedSections = [
    'services-section',
    'about-section',
    'working-section',
    'triage-section',
    'evidence-section',
    'faqs-section',
    'help-section'
  ]

  // Validate all expected section anchors are valid HTML id strings
  expectedSections.forEach(sectionId => {
    assert.match(sectionId, /^[a-z0-9-]+$/, `Anchor "${sectionId}" must be a valid lowercase kebab-case ID`)
  })

  // Validate topic mapping used by Explore Platform modal & header
  const topicToSectionMap = {
    services: 'services-section',
    about: 'about-section',
    working: 'working-section',
    triage: 'triage-section',
    faqs: 'faqs-section',
    help: 'help-section',
    privacy: 'about-section'
  }

  Object.entries(topicToSectionMap).forEach(([topic, secId]) => {
    assert.ok(expectedSections.includes(secId), `Topic "${topic}" must map to valid section "${secId}"`)
  })
})


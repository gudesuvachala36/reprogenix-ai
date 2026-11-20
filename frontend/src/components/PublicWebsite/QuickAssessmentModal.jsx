import { useState } from 'react'
import {
  X,
  Sparkles,
  ShieldAlert,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  BookOpen
} from 'lucide-react'

export default function QuickAssessmentModal({ isOpen, onClose, onFinish, t }) {
  const [age, setAge] = useState('32')
  const [sleepHours, setSleepHours] = useState('6.5')
  const [exerciseDays, setExerciseDays] = useState('2')
  const [laptopHeat, setLaptopHeat] = useState(true)
  const [smoking, setSmoking] = useState(false)
  const [ttcMonths, setTtcMonths] = useState('6')
  const [varicocele, setVaricocele] = useState(false)
  const [hasLabs, setHasLabs] = useState(true)
  const [concentration, setConcentration] = useState('14')
  const [motility, setMotility] = useState('28')
  const [testosterone, setTestosterone] = useState('380')
  const [acutePain, setAcutePain] = useState(false)
  const [consent, setConsent] = useState(true)

  const [result, setResult] = useState(null)

  if (!isOpen) return null

  const handleCompute = (e) => {
    e.preventDefault()
    if (!consent) {
      alert('Please check the informed consent box to proceed.')
      return
    }

    if (acutePain) {
      setResult({
        score: 15,
        tier: 'Tier 0: Immediate Emergency Scrotal Referral',
        tierClass: 'bg-rose-600 text-white',
        status: 'EMERGENCY RED FLAG',
        recommendation:
          'Sudden severe testicular pain is a surgical emergency (suspected testicular torsion). Do not wait for online screening. Proceed immediately to the nearest emergency department.',
        guideline: 'AUA Emergency Scrotal Protocol (2024)'
      })
      return
    }

    let calculatedScore = 85
    const concNum = parseFloat(concentration) || 16
    const motNum = parseFloat(motility) || 35
    const testNum = parseFloat(testosterone) || 450

    if (concNum < 5) calculatedScore -= 35
    else if (concNum < 16) calculatedScore -= 15

    if (motNum < 20) calculatedScore -= 25
    else if (motNum < 30) calculatedScore -= 12

    if (testNum < 300) calculatedScore -= 25
    else if (testNum < 400) calculatedScore -= 10

    if (varicocele) calculatedScore -= 20
    if (laptopHeat) calculatedScore -= 12
    if (smoking) calculatedScore -= 12
    if (parseInt(ttcMonths) > 12) calculatedScore -= 15

    calculatedScore = Math.max(10, Math.min(95, calculatedScore))

    if (calculatedScore < 45 || varicocele || testNum < 250) {
      setResult({
        score: calculatedScore,
        tier: 'Tier 1: Specialist Andrology & Microsurgical Referral',
        tierClass: 'bg-rose-50 text-rose-700 border border-rose-300',
        status: 'High Clinical Risk',
        recommendation:
          'Evaluation by a specialist reproductive urologist/andrologist for clinical varicocele examination and endocrine axis evaluation.',
        guideline: 'AUA/ASRM Male Infertility Guidelines (2024)'
      })
    } else if (calculatedScore < 72) {
      setResult({
        score: calculatedScore,
        tier: 'Tier 2: Primary Care Lifestyle & 72-Day Reversibility',
        tierClass: 'bg-amber-50 text-amber-800 border border-amber-300',
        status: 'Moderate Risk',
        recommendation:
          'Eliminate scrotal thermal exposure (avoid laptop on lap), commence antioxidant supplementation (CoQ10 + Zinc), and repeat semen analysis in 72 days.',
        guideline: 'WHO Laboratory Manual 6th Ed / EAU 2024'
      })
    } else {
      setResult({
        score: calculatedScore,
        tier: 'Tier 4: Preventive Health & Pre-Conception Readiness',
        tierClass: 'bg-emerald-50 text-emerald-800 border border-emerald-300',
        status: 'Low Clinical Risk',
        recommendation:
          'Semen biomarkers indicate healthy fertility potential. Continue proactive wellness and balanced nutrition.',
        guideline: 'Global Preventive Andrology Guidelines'
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#08283a] via-[#061f30] to-[#087e78] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles size={20} className="text-[#0c9d91]" />
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white">
                {t('screeningTitle')}
              </h3>
              <p className="text-[11px] text-slate-300">
                {t('screeningSub')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body or Results */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {result ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Screening Output
                </span>
                <span className="text-base font-black px-3 py-1 rounded-full bg-slate-100 text-[#08283a]">
                  Risk Score: {result.score}/100
                </span>
              </div>

              {/* Triage Tier */}
              <div className={`p-4 rounded-2xl font-bold ${result.tierClass}`}>
                <div className="text-[10px] uppercase tracking-wider opacity-80 mb-0.5">
                  Safe Triage Recommendation
                </div>
                <div className="text-base font-extrabold leading-tight">{result.tier}</div>
              </div>

              {/* Pathway */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="font-extrabold text-[#08283a]">Clinical Action Plan:</div>
                <p className="text-slate-600 leading-relaxed">{result.recommendation}</p>
                <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-bold text-[#087e78]">
                  <BookOpen size={13} className="text-[#0c9d91]" />
                  <span>Guideline Citation: {result.guideline}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Modify Inputs
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    if (onFinish) onFinish()
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] rounded-xl shadow-xs transition-colors"
                >
                  View in Patient Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCompute} className="space-y-4 text-xs">
              {/* Demographics */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t('ageYears')}</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t('sleepHoursLabel')}</label>
                  <input
                    type="number"
                    step="0.5"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t('exerciseDaysLabel')}</label>
                  <input
                    type="number"
                    value={exerciseDays}
                    onChange={(e) => setExerciseDays(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] font-semibold"
                  />
                </div>
              </div>

              {/* Lifestyle Risks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={laptopHeat}
                    onChange={(e) => setLaptopHeat(e.target.checked)}
                    className="rounded text-[#0c9d91] focus:ring-[#0c9d91] h-4 w-4"
                  />
                  <span>{t('laptopHeatLabel')}</span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smoking}
                    onChange={(e) => setSmoking(e.target.checked)}
                    className="rounded text-[#0c9d91] focus:ring-[#0c9d91] h-4 w-4"
                  />
                  <span>{t('smokingLabel')}</span>
                </label>
              </div>

              {/* Medical & Anatomical */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={varicocele}
                    onChange={(e) => setVaricocele(e.target.checked)}
                    className="rounded text-[#0c9d91] focus:ring-[#0c9d91] h-4 w-4"
                  />
                  <span>{t('varicoceleLabel')}</span>
                </label>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t('ttcLabel')}</label>
                  <input
                    type="number"
                    value={ttcMonths}
                    onChange={(e) => setTtcMonths(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] font-semibold"
                  />
                </div>
              </div>

              {/* Lab Inputs Toggle */}
              <div className="pt-2 border-t border-slate-200">
                <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasLabs}
                    onChange={(e) => setHasLabs(e.target.checked)}
                    className="rounded text-[#0c9d91] focus:ring-[#0c9d91] h-4 w-4"
                  />
                  <span>{t('haveLabsLabel')}</span>
                </label>

                {hasLabs && (
                  <div className="grid grid-cols-3 gap-3 mt-2.5 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">
                        {t('spermConc')}
                      </label>
                      <input
                        type="number"
                        value={concentration}
                        onChange={(e) => setConcentration(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">
                        {t('motilityPct')}
                      </label>
                      <input
                        type="number"
                        value={motility}
                        onChange={(e) => setMotility(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">
                        {t('testoLevel')}
                      </label>
                      <input
                        type="number"
                        value={testosterone}
                        onChange={(e) => setTestosterone(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none font-bold"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Emergency Guardrail */}
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
                <label className="flex items-center gap-2 text-rose-800 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acutePain}
                    onChange={(e) => setAcutePain(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500 h-4 w-4"
                  />
                  <span>{t('emergencyCheck')}</span>
                </label>
              </div>

              {/* Consent Gate */}
              <div className="pt-2">
                <label className="flex items-start gap-2 text-[11px] text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="rounded text-[#0c9d91] focus:ring-[#0c9d91] h-4 w-4 mt-0.5"
                  />
                  <span>{t('consentCheck')}</span>
                </label>
              </div>

              {/* Submit */}
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] rounded-xl shadow-sm shadow-[#0c9d91]/25 transition-all"
                >
                  <Sparkles size={14} />
                  <span>{t('computeRisk')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { toast } from 'react-toastify'
import {
  User,
  Heart,
  Clock,
  Flame,
  Moon,
  Activity,
  ShieldCheck,
  Edit3,
  Check,
  Target,
  Sparkles
} from 'lucide-react'
import DynamicLiveEChart from '../Charts/DynamicLiveEChart'

export default function HealthProfile({
  patient,
  onRetakeAssessment,
  searchQuery = '',
  currentLang = 'en',
  t = (k) => k
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [goal, setGoal] = useState(t('defaultReproductiveGoal') || 'Trying to conceive within 12 months & optimize semen quality')
  const [savedSuccess, setSavedSuccess] = useState(false);
const goalSuggestions = [
  t('goalSuggestion1') || 'Improve semen quality',
  t('goalSuggestion2') || 'Conceive within 6 months',
  t('goalSuggestion3') || 'Maintain healthy lifestyle',
];

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setSavedSuccess(true)
    toast.success(t('goalUpdatedMsg') || 'Reproductive health goal updated successfully!', { icon: '🎯' })
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white font-black text-xl flex items-center justify-center shadow-md">
            {patient.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-extrabold text-slate-900">
                {patient.nameKey ? (t(patient.nameKey) || patient.name) : patient.name}
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                {patient.mrn}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                patient.riskLevel.includes('High') ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                patient.riskLevel.includes('Moderate') ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {patient.riskLevel === 'High Risk' ? (t('highRisk') || 'High Risk') :
                 patient.riskLevel === 'Moderate Risk' ? (t('moderateRisk') || 'Moderate Risk') :
                 (t('lowRisk') || 'Low Risk')}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {t('age') || 'Age'} {patient.age} • {patient.occupationKey ? (t(patient.occupationKey) || patient.occupation) : patient.occupation} • {t('attendingLabel') || 'Attending'}: {patient.doctorNameKey ? (t(patient.doctorNameKey) || patient.doctor) : patient.doctor}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <button
            type="button"
            onClick={onRetakeAssessment}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <Sparkles size={14} />
            <span>{t('retakeAssessment')}</span>
          </button>
        </div>
      </div>

      {/* Reproductive Health Goal Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-5 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Target size={15} /> {t('primaryReproductiveGoal')}
            </div>
            {isEditing ? (
              <form onSubmit={handleSave} className="mt-2 space-y-2">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder={t('primaryGoalPlaceholder')}
                  list="goal-suggestions"
                  className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white rounded-xl outline-none"
                />
                <datalist id="goal-suggestions">
                  {goalSuggestions.map((s, i) => (
                    <option key={i} value={s} />
                  ))}
                </datalist>
                <button
                  type="submit"
                  className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg"
                >
                  {t('saveAction') || 'Save'}
                </button>
              </form>
            ) : (
              <p className="text-sm font-bold text-emerald-50 max-w-xl">{goal}</p>
            )}
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-xs text-emerald-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Edit3 size={13} /> {t('editAction') || 'Edit'}
            </button>
          )}
        </div>
        {savedSuccess && (
          <div className="mt-2 text-xs text-emerald-300 flex items-center gap-1">
            <Check size={13} /> {t('goalUpdatedMsg')}
          </div>
        )}
      </div>

      {/* 4 Lifestyle & Biological Vitals Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Spermatogenesis Progress */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('cycleDay')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">{t('day48') || 'Day 48'}</div>
            <div className="text-xs font-semibold text-purple-600 mt-1">
              {t('cycleDayMid')}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            {t('retestInDays')}
          </div>
        </div>

        {/* Thermal Stress Status */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('thermalExposure')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-600">
              {t('thermalExposureModerate')}
            </div>
            <div className="text-xs font-semibold text-amber-700 mt-1">
              {t('laptopDeskPadStatus') || 'Laptop desk pad in use (improved)'}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            {t('thermalExposureSub')}
          </div>
        </div>

        {/* Sleep Quality */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('sleepDuration')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Moon size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">6.8 {t('hrsDuration') || 'hrs'}</div>
            <div className="text-xs font-semibold text-blue-600 mt-1">
              {t('sleepDurationTarget')}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            {t('sleepDurationSub')}
          </div>
        </div>

        {/* Active Care Recommendations */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('activeCareActions')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Activity size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-600">{t('fourActive') || '4 Active'}</div>
            <div className="text-xs font-semibold text-emerald-700 mt-1">
              {t('adherenceWeekly')}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            {t('activeCareProtocols')}
          </div>
        </div>
      </div>

      {/* Dynamic Live Physiological Telemetry EChart */}
      <DynamicLiveEChart
        title={t('liveTelemetryTitle')}
        subtitle={t('liveTelemetrySub')}
        mode="patient"
        patientName={patient.nameKey ? (t(patient.nameKey) || patient.name) : patient.name}
        currentLang={currentLang}
        t={t}
      />

      {/* Cultural & Privacy Safeguards */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
          <ShieldCheck size={18} className="text-emerald-600" />
          {t('culturalPrivacyTitle')}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {t('culturalPrivacyDesc')}
        </p>
      </div>
    </div>
  )
}

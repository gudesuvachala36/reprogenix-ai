import { useState } from 'react'
import {
  X,
  FileSpreadsheet,
  Calendar,
  AlertTriangle,
  Activity,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
  Flame,
  Award,
  BookOpen
} from 'lucide-react'

export default function PatientDetailModal({
  patient,
  isOpen,
  onClose,
  onSchedule,
  onGenerateReport,
  t
}) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!isOpen || !patient) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-5 sm:p-6 text-white flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-md ${patient.avatarColor}`}
            >
              {patient.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-extrabold tracking-tight text-white">{patient.nameKey ? (t(patient.nameKey) || patient.name) : patient.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-emerald-300 font-semibold">
                  {patient.mrn}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {patient.riskLevel === 'High Risk' ? (t('highRisk') || 'High Risk') : patient.riskLevel === 'Moderate Risk' ? (t('moderateRisk') || 'Moderate Risk') : (t('lowRisk') || 'Low Risk')}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {t('age') || 'Age'} {patient.age} • {patient.occupationKey ? (t(patient.occupationKey) || patient.occupation) : patient.occupation} • {t('attendingLabel') || 'Attending'}: {patient.doctorNameKey ? (t(patient.doctorNameKey) || patient.doctor) : patient.doctor}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-200/80 bg-slate-50/70 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('tabClinicalOverview') || 'Clinical Overview'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('semen')}
            className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap ${
              activeTab === 'semen'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('tabWhoSemen') || 'WHO 6th Ed Semen Analysis'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('endocrine')}
            className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap ${
              activeTab === 'endocrine'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('tabEndocrineHormones') || 'Endocrine & Hormones'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signals')}
            className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap ${
              activeTab === 'signals'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('tabAiSignals') || 'Explainable AI Signals'} ({patient.signals?.length || 0})
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Safe Triage Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500 text-white flex-shrink-0">
                  <Activity size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    {t('recommendedTriagePathway') || 'Recommended Triage Pathway'}
                  </h4>
                  <div className="text-sm font-extrabold text-emerald-950 mt-0.5">
                    {patient.triageTierKey ? (t(patient.triageTierKey) || patient.triageTier) : patient.triageTier}
                  </div>
                  <p className="text-xs text-emerald-800/80 mt-1">
                    {t('triageGuidelineCalibrated') || 'Calibrated according to AUA/ASRM 2024 and EAU male reproductive health guidelines.'}
                  </p>
                </div>
              </div>

              {/* 72-Day Spermatogenesis Progress */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <Clock size={15} /> {t('trackerSpermatogenesis') || '72-90 Day Spermatogenesis Regenerative Tracker'}
                  </span>
                  <span className="text-slate-600">
                    Day {patient.spermatogenesisProgress.currentDay} / {patient.spermatogenesisProgress.totalDays}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (patient.spermatogenesisProgress.currentDay /
                          patient.spermatogenesisProgress.totalDays) *
                          100
                      )}%`
                    }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-medium">
                  <span>{t('currentPhaseLabel') || 'Current Phase'}: {patient.spermatogenesisProgress.milestoneKey ? (t(patient.spermatogenesisProgress.milestoneKey) || patient.spermatogenesisProgress.milestone) : patient.spermatogenesisProgress.milestone}</span>
                  <span className="font-semibold text-slate-700">
                    {t('reTestTargetLabel') || 'Re-Test Target'}: {patient.spermatogenesisProgress.targetTestDate}
                  </span>
                </div>
              </div>

              {/* Demographic & Lifestyle Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">BMI</span>
                  <div className="text-base font-extrabold text-slate-800 mt-0.5">
                    {patient.lifestyle?.bmi || 'N/A'}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {parseFloat(patient.lifestyle?.bmi) >= 30
                      ? (t('bmiObese') || 'Obese Class I')
                      : parseFloat(patient.lifestyle?.bmi) >= 25
                      ? (t('bmiOverweight') || 'Overweight')
                      : (t('bmiNormal') || 'Normal')}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{t('sleepHoursLabel') || 'Sleep Hours'}</span>
                  <div className="text-base font-extrabold text-slate-800 mt-0.5">
                    {patient.lifestyle?.sleepHours || 'N/A'} {t('hrsNight') || 'hrs/night'}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {patient.lifestyle?.sleepHours < 6 ? (t('sleepDeprived') || 'Sleep Deprived') : (t('sleepAdequate') || 'Adequate')}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{t('exerciseLabel') || 'Exercise'}</span>
                  <div className="text-base font-extrabold text-slate-800 mt-0.5">
                    {patient.lifestyle?.exerciseDays || 0} {t('daysWk') || 'days/wk'}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{t('cardioStrength') || 'Cardio & Strength'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{t('smokingLabelShort') || 'Smoking'}</span>
                  <div className="text-base font-extrabold text-slate-800 mt-0.5">
                    {patient.lifestyle?.smoking === 'None' || !patient.lifestyle?.smoking ? (t('nonSmoker') || 'Non-smoker') : patient.lifestyle.smoking}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{t('rosRiskFactor') || 'ROS Risk Factor'}</span>
                </div>
              </div>

              {/* Thermal & Anatomical History */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Flame size={14} className="text-amber-600" />
                  {t('thermalStressAnatomicalTitle') || 'Thermal Stress & Anatomical Profile'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">{t('heatExposureLabel') || 'Heat Exposure'}: </span>
                    <span className="font-semibold text-slate-800">
                      {patient.lifestyle?.heatExposureKey ? (t(patient.lifestyle.heatExposureKey) || patient.lifestyle.heatExposure) : (patient.lifestyle?.heatExposure || t('noneReported') || 'None reported')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">{t('varicoceleLabel') || 'Varicocele'}: </span>
                    <span className="font-semibold text-slate-800">
                      {patient.medicalHistory?.varicoceleKey ? (t(patient.medicalHistory.varicoceleKey) || patient.medicalHistory.varicocele) : (patient.medicalHistory?.varicocele || t('none') || 'None')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">{t('medicationsLabel') || 'Medications'}: </span>
                    <span className="font-semibold text-slate-800">
                      {patient.medicalHistory?.medicationsKey ? (t(patient.medicalHistory.medicationsKey) || patient.medicalHistory.medications) : (patient.medicalHistory?.medications || t('none') || 'None')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">{t('ttcDurationLabel') || 'TTC Duration'}: </span>
                    <span className="font-semibold text-slate-800">
                      {patient.tryingToConceiveMonths > 0
                        ? `${patient.tryingToConceiveMonths} months`
                        : (t('proactiveHealth') || 'Proactive health')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Semen Analysis */}
          {activeTab === 'semen' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{t('whoEvalCutoffs') || 'Evaluated against WHO Laboratory Manual (6th Edition, 2021) 5th-Percentile Cutoffs'}</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {t('calibratedEngine') || 'Calibrated Engine'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Concentration */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700">{t('spermConc') || 'Sperm Concentration'}</span>
                    <span className="text-[10px] font-semibold text-slate-400">WHO 6th: ≥ 16.0 M/mL</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {patient.semenParameters.concentration !== null
                      ? `${patient.semenParameters.concentration} M/mL`
                      : 'Not Analyzed'}
                  </div>
                  <div className="text-xs font-semibold mt-1">
                    {patient.semenParameters.concentration >= 16 ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 size={13} /> {t('aboveRefNormozoospermia') || 'Above reference limit (Normozoospermia)'}
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <AlertTriangle size={13} /> {t('mildOligozoospermia') || 'Mild Oligozoospermia'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progressive Motility */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700">{t('progressiveMotility') || 'Progressive Motility'}</span>
                    <span className="text-[10px] font-semibold text-slate-400">WHO 6th: ≥ 30.0%</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {patient.semenParameters.progressiveMotility !== null
                      ? `${patient.semenParameters.progressiveMotility}%`
                      : 'Not Analyzed'}
                  </div>
                  <div className="text-xs font-semibold mt-1">
                    {patient.semenParameters.progressiveMotility >= 30 ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 size={13} /> {t('normalForwardMotility') || 'Normal forward progressive motility'}
                      </span>
                    ) : (
                      <span className="text-amber-600 flex items-center gap-1">
                        <AlertTriangle size={13} /> {t('asthenoSubOptimal') || 'Asthenozoospermia (Sub-optimal motility)'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Normal Morphology */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700">{t('normalMorphology') || 'Normal Morphology'}</span>
                    <span className="text-[10px] font-semibold text-slate-400">WHO 6th: ≥ 4.0%</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {patient.semenParameters.normalMorphology !== null
                      ? `${patient.semenParameters.normalMorphology}%`
                      : 'Not Analyzed'}
                  </div>
                  <div className="text-xs font-semibold mt-1">
                    {patient.semenParameters.normalMorphology >= 4 ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 size={13} /> {t('normalStrictKruger') || 'Normal strict Kruger criteria'}
                      </span>
                    ) : (
                      <span className="text-amber-600 flex items-center gap-1">
                        <AlertTriangle size={13} /> {t('teratozoospermia') || 'Teratozoospermia'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Semen Volume */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700">{t('ejaculateVolume') || 'Ejaculate Volume'}</span>
                    <span className="text-[10px] font-semibold text-slate-400">WHO 6th: ≥ 1.4 mL</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {patient.semenParameters.volume !== null
                      ? `${patient.semenParameters.volume} mL`
                      : 'Not Analyzed'}
                  </div>
                  <div className="text-xs font-semibold mt-1">
                    {patient.semenParameters.volume >= 1.4 ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 size={13} /> {t('adequateSeminalContribution') || 'Adequate seminal vesicle contribution'}
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <AlertTriangle size={13} /> {t('hypospermia') || 'Hypospermia'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Endocrine */}
          {activeTab === 'endocrine' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  {t('hpgAxisTitle') || 'Hypothalamic-Pituitary-Gonadal (HPG) Axis'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {t('totalTestosterone') || 'Total Testosterone'}
                    </span>
                    <div className="text-lg font-black text-slate-900 mt-1">
                      {patient.endocrine?.totalTestosterone
                        ? `${patient.endocrine.totalTestosterone} ng/dL`
                        : 'Pending'}
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">{t('refPrefix') || 'Ref'}: 300 - 1000</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{t('fshLevel') || 'FSH Level'}</span>
                    <div className="text-lg font-black text-slate-900 mt-1">
                      {patient.endocrine?.fsh ? `${patient.endocrine.fsh} mIU/mL` : 'Pending'}
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">{t('refPrefix') || 'Ref'}: 1.5 - 12.4</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{t('lhLevel') || 'LH Level'}</span>
                    <div className="text-lg font-black text-slate-900 mt-1">
                      {patient.endocrine?.lh ? `${patient.endocrine.lh} mIU/mL` : 'Pending'}
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">{t('refPrefix') || 'Ref'}: 1.7 - 8.6</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{t('estradiolLabel') || 'Estradiol'}</span>
                    <div className="text-lg font-black text-slate-900 mt-1">
                      {patient.endocrine?.estradiol ? `${patient.endocrine.estradiol} pg/mL` : 'Pending'}
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">{t('refPrefix') || 'Ref'}: 10 - 40</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Explainable AI Signals */}
          {activeTab === 'signals' && (
            <div className="space-y-3">
              {patient.signals?.map((signal, idx) => {
                const getSafeTrans = (key, fallback) => {
                  if (!key) return fallback
                  const res = t(key)
                  return (res && res !== key) ? res : fallback
                }

                // Explicit mappings
                let dKey = signal.domainKey
                if (!dKey) {
                  if (signal.domain?.includes('Exogenous')) dKey = 'sig_exogenous_androgen_hypogona'
                  else if (signal.domain?.includes('Varicocele')) dKey = 'sig_grade_ii_clinical_varicoce'
                  else if (signal.domain?.includes('Finasteride')) dKey = 'sig_5_alpha_reductase_inhibito'
                  else if (signal.domain?.includes('Cardiometabolic')) dKey = 'sig_cardiometabolic_vascular_d'
                  else if (signal.domain?.includes('Smoking')) dKey = 'sig_cigarette_smoking___ros_da'
                  else if (signal.domain?.includes('Sleep')) dKey = 'sig_sleep_deprivation___cortis'
                  else if (signal.domain?.includes('Thermal')) dKey = 'sig_thermal_stress___lifestyle'
                  else if (signal.domain?.includes('Astheno')) dKey = 'sig_mild_asthenoteratozoosper'
                }

                let tKey = signal.textKey
                if (!tKey) {
                  if (signal.text?.includes('Suppressed LH')) tKey = 'sigTextExogenousHypogonadism'
                  else if (signal.text?.includes('Palpable varicocele')) tKey = 'sigTextVaricoceleRepair'
                  else if (signal.text?.includes('Finasteride 1mg')) tKey = 'sigTextFinasterideSuppression'
                }

                let gKey = signal.guidelineKey
                if (!gKey) {
                  if (signal.guideline?.includes('AUA/ASRM')) gKey = 'guidelineAuaAsrm'
                  else if (signal.guideline?.includes('EAU Guidelines on Male Infertility')) gKey = 'guidelineEau'
                  else if (signal.guideline?.includes('Statement 14')) gKey = 'guidelineAua14'
                }

                const domainDisplay = getSafeTrans(dKey, signal.domain)
                const textDisplay = getSafeTrans(tKey, signal.text)
                const guidelineDisplay = getSafeTrans(gKey, signal.guideline)

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-emerald-300 transition-colors shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <ShieldAlert
                          size={15}
                          className={
                            signal.severity === 'critical'
                              ? 'text-rose-600'
                              : signal.severity === 'high'
                              ? 'text-amber-600'
                              : 'text-emerald-600'
                          }
                        />
                        {domainDisplay}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-slate-100 text-slate-600">
                        {signal.severity === 'critical' ? (t('severityCritical') || 'CRITICAL') : signal.severity === 'high' ? (t('severityHigh') || 'HIGH') : signal.severity === 'medium' ? (t('severityMedium') || 'MEDIUM') : signal.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{textDisplay}</p>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-emerald-800">
                      <BookOpen size={12} className="text-emerald-600" />
                      <span>{t('evidence') || 'Evidence'}: {guidelineDisplay}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-colors"
          >
            {t('close')}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onGenerateReport(patient)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl shadow-xs transition-colors"
            >
              <FileSpreadsheet size={14} className="text-emerald-600" />
              <span>{t('exportPdf')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose()
                onSchedule(patient)
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs shadow-emerald-600/20 transition-all"
            >
              <Calendar size={14} />
              <span>{t('schedule')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

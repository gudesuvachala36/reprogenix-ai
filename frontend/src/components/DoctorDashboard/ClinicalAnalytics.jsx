import {
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Award,
  Users,
  Clock,
  Sparkles,
  BarChart3,
  CheckCircle2
} from 'lucide-react'
import {
  SpermatogenesisSplineChart,
  SafeTriageDonutChart,
  ReproductiveBiomarkerRadar
} from '../Charts/EChartsBiomarkers'
import DynamicLiveEChart from '../Charts/DynamicLiveEChart'
import { CLINICAL_ANALYTICS, PATIENTS } from '../../data/mockData'

export default function ClinicalAnalytics({ t = (k) => k, currentLang = 'en' }) {
  const {
    delayReductionPercent,
    avoidedUnnecessaryVisits,
    fairnessParityRatio
  } = CLINICAL_ANALYTICS

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#08283a] tracking-tight">
          {t('overviewAnalytics')}
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {t('popEvidenceSub') || 'Dual-blinded population health evidence from N=1,250 synthetic patient cohort and longitudinal outcomes.'}
        </p>
      </div>

      {/* Top 4 Impact KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Diagnostic Delay Reduction */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('diagnosticDelayReduction')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#dff5f1] text-[#087e78] flex items-center justify-center">
              <TrendingDown size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#08283a]">{delayReductionPercent}</div>
            <div className="text-xs font-semibold text-[#0c9d91] mt-1">
              {t('delayReductionSaved')}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            {t('delayReductionDetail')}
          </div>
        </div>

        {/* Unnecessary Visits Avoided */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('invasiveVisitsAvoided')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#08283a]">{avoidedUnnecessaryVisits}</div>
            <div className="text-xs font-semibold text-teal-600 mt-1">
              {t('lowRiskSelfCare')}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            {t('preservesCapacity')}
          </div>
        </div>

        {/* Demographic Fairness Ratio */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('demographicFairnessTitle')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Award size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#08283a]">{fairnessParityRatio}</div>
            <div className="text-xs font-semibold text-blue-600 mt-1">
              {t('parityRatio')}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            {t('fourFifthsRule')}
          </div>
        </div>

        {/* Total Cohort Analyzed */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('cohortPopulationTitle')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#08283a]">1,250</div>
            <div className="text-xs font-semibold text-purple-600 mt-1">
              {t('cohortSimulations')}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            {t('completionRate')}
          </div>
        </div>
      </div>

      {/* Flagship Dynamic Real-Time Telemetry EChart */}
      <DynamicLiveEChart
        title={t('liveTelemetryTitle')}
        subtitle={t('liveTelemetrySub')}
        mode="doctor"
        t={t}
        currentLang={currentLang}
      />

      {/* Interactive ECharts Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 72-Day Spermatogenesis Spline Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-base font-extrabold text-[#08283a]">
                {t('trajectoryChartTitle')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('trajectoryChartSub')}
              </p>
            </div>
            <Sparkles size={18} className="text-[#0c9d91]" />
          </div>

          <SpermatogenesisSplineChart t={t} currentLang={currentLang} />

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-[#0c9d91]">
              <CheckCircle2 size={13} /> {t('spermatogenicMaturation')}
            </span>
            <span className="text-slate-400">{t('whoBenchmarkLabel')}</span>
          </div>
        </div>

        {/* Right: Safe Triage Cohort Donut Chart (5 Cols) - Aligned & Enhanced */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-base font-extrabold text-[#08283a]">
                {t('safeTriageChartTitle')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('safeTriageChartSub')}
              </p>
            </div>
            <BarChart3 size={18} className="text-[#0c9d91]" />
          </div>

          <SafeTriageDonutChart t={t} currentLang={currentLang} />

          <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
            {t('emergencyBypassNotice')}
          </div>
        </div>
      </div>

      {/* Cohort Multi-Domain Radar Analysis */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-[#08283a]">
              {t('radarChartTitle')}
            </h3>
            <p className="text-xs text-slate-500">
              {t('radarChartSub')}
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#dff5f1] text-[#087e78]">
            6-Axis Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <ReproductiveBiomarkerRadar patient={PATIENTS[0]} t={t} currentLang={currentLang} />
          </div>
          <div className="md:col-span-5 space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                        <div className="font-bold text-[#08283a] text-sm">{t('takeawaysTitle')}:</div>
            <div className="space-y-2 text-slate-600">
              {['takeaway1', 'takeaway2', 'takeaway3'].map((key) => {
                const text = t(key) || ''
                const colonIdx = text.indexOf(':') !== -1 ? text.indexOf(':') : text.indexOf('：')
                if (colonIdx !== -1) {
                  return (
                    <p key={key}>
                      • <strong className="text-slate-800">{text.slice(0, colonIdx + 1)}</strong>
                      {text.slice(colonIdx + 1)}
                    </p>
                  )
                }
                return <p key={key}>• {text}</p>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

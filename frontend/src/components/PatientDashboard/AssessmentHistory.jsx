import { useState } from 'react'
import {
  History,
  TrendingUp,
  Sparkles,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowRight,
  BarChart3
} from 'lucide-react'
import { PatientBiomarkerGainsBarChart } from '../Charts/EChartsBiomarkers'

export default function AssessmentHistory({
  patient,
  onRetakeAssessment,
  onOpenReport,
  searchQuery = '',
  currentLang = 'en',
  t = (k) => k
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#08283a] tracking-tight">
            {t('assessmentHistory')}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {t('biomarkerImpSub') || 'Track objective reproductive biomarker progression and risk transitions over time.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onRetakeAssessment}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] active:scale-95 rounded-xl shadow-sm shadow-[#0c9d91]/25 transition-all self-start sm:self-auto"
        >
          <Sparkles size={15} />
          <span>{t('retakeAssessment')}</span>
        </button>
      </div>

      {/* Before / After Biological Progress Card with ECharts */}
      <div className="bg-gradient-to-br from-white to-emerald-50/40 rounded-3xl p-6 border border-emerald-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#dff5f1] text-[#087e78] flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#08283a]">
                {t('biomarkerImpTitle')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('biomarkerImpSub')}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#dff5f1] text-[#087e78]">
            {t('positiveTrajectory')}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Motility */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              {t('motilityAxis') || 'Progressive Motility'}
            </span>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="text-sm font-bold text-slate-400 line-through">22%</span>
              <ArrowRight size={13} className="text-slate-400" />
              <span className="text-lg font-black text-[#0c9d91]">29%</span>
            </div>
            <span className="text-[10px] font-bold text-[#0c9d91]">{t('gainMotility')}</span>
          </div>

          {/* Concentration */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              {t('concAxis') || 'Sperm Concentration'}
            </span>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="text-sm font-bold text-slate-400 line-through">11 M</span>
              <ArrowRight size={13} className="text-slate-400" />
              <span className="text-lg font-black text-[#0c9d91]">14 M/mL</span>
            </div>
            <span className="text-[10px] font-bold text-[#0c9d91]">{t('gainConc')}</span>
          </div>

          {/* Testosterone */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              {t('testoAxis') || 'Total Testosterone'}
            </span>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="text-sm font-bold text-slate-400 line-through">340</span>
              <ArrowRight size={13} className="text-slate-400" />
              <span className="text-lg font-black text-[#0c9d91]">380 ng/dL</span>
            </div>
            <span className="text-[10px] font-bold text-[#0c9d91]">{t('gainTesto')}</span>
          </div>

          {/* Health Index */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              {t('overallScore') || 'Health Index'}
            </span>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="text-sm font-bold text-slate-400 line-through">62</span>
              <ArrowRight size={13} className="text-slate-400" />
              <span className="text-lg font-black text-[#0c9d91]">74/100</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600">+12 Pts Gain</span>
          </div>
        </div>

        {/* ECharts: Multi-Biomarker Gains Bar Chart */}
        <div className="pt-2">
          <PatientBiomarkerGainsBarChart t={t} currentLang={currentLang} />
        </div>
      </div>

      {/* Historical Milestones Timeline */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-[#08283a]">
          {t('longitudinalHistoryTitle') || 'Longitudinal Clinical History'}
        </h3>

        <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200">
          {/* Record 1 */}
          <div className="relative flex items-start gap-4 pl-1">
            <div className="w-7 h-7 rounded-full bg-[#0c9d91] text-white flex items-center justify-center z-10 flex-shrink-0 shadow-xs">
              <CheckCircle2 size={16} />
            </div>
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#08283a]">
                  {t('historyItem1Title') || 'Follow-up Review (Day 30 Intermediate)'}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">Nov 12, 2025</span>
              </div>
              <p className="text-xs text-slate-500">
                {t('historyItem1Desc') || 'Progressive motility improved from 22% to 29% following continuous laptop pad adoption and 200mg daily CoQ10.'}
              </p>
            </div>
          </div>

          {/* Record 2 */}
          <div className="relative flex items-start gap-4 pl-1">
            <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center z-10 flex-shrink-0 shadow-xs">
              <Calendar size={15} />
            </div>
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#08283a]">
                  {t('historyItem2Title') || 'Initial Intake & WHO 6th Ed Baseline'}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">Oct 14, 2025</span>
              </div>
              <p className="text-xs text-slate-500">
                {t('historyItem2Desc') || 'Baseline semen evaluation completed at Diagnostic Center. Primary concern: Borderline motility and 6+ daily hours of seated laptop heat.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

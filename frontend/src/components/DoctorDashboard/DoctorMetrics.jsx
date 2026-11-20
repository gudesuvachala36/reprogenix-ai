import { Users, AlertTriangle, CalendarCheck, ClockAlert, CheckCircle2, TrendingUp } from 'lucide-react'

export default function DoctorMetrics({ patients = [], appointments = [], followUps = [], t }) {
  const totalCount = patients.length
  const highRiskCount = patients.filter((p) => p.riskLevel.includes('High') || p.riskLevel.includes('Emergency')).length
  const moderateCount = patients.filter((p) => p.riskLevel.includes('Moderate')).length
  const scheduledTodayCount = appointments.filter((a) => a.date === '2025-11-16' || a.status === 'Confirmed').length
  const followUpsDueCount = followUps.filter((f) => f.status.includes('Due')).length

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
      {/* Total Patients Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold text-slate-500">{t('totalPatients')}</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users size={16} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">48</span>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp size={12} /> {t('plus12Mo') || '+12% this mo'}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-medium">
          {t('activeMaleFertilityCohort') || 'Active male fertility & andrology cohort'}
        </div>
      </div>

      {/* Available / Low Risk */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold text-slate-500">{t('availableNow')}</span>
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <CheckCircle2 size={16} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">35</span>
          <span className="text-[11px] font-semibold text-slate-400">
            {t('cliniciansActive') || 'clinicians active'}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-medium">
          {t('readyForTeleAndrology') || 'Ready for tele-andrology intake'}
        </div>
      </div>

      {/* High Risk / In Surgery */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold text-slate-500">{t('highRiskCases')}</span>
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle size={16} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 tracking-tight">8</span>
          <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
            {t('priorityAction') || 'Priority Action'}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-medium">
          {t('severeOligoVaricocele') || 'Severe oligozoospermia & varicocele'}
        </div>
      </div>

      {/* Follow-ups Due */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold text-slate-500">{t('pendingFollowUps')}</span>
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ClockAlert size={16} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {followUpsDueCount || 4}
          </span>
          <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
            {t('milestones72Day') || '72-Day Milestones'}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-medium">
          {t('repeatSemenHormone') || 'Repeat semen analysis & hormone re-tests'}
        </div>
      </div>
    </div>
  )
}

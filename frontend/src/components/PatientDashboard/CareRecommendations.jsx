import { useState } from 'react'
import {
  Heart,
  Clock,
  Flame,
  Moon,
  Pill,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { SpermatogenesisGauge } from '../Charts/EChartsBiomarkers'

export default function CareRecommendations({
  patient,
  onOpenSchedule,
  searchQuery = '',
  currentLang = 'en',
  t = (k) => k
}) {
  const [checklist, setChecklist] = useState({
    laptopPad: true,
    coq10: true,
    zinc: true,
    sleep7h: false,
    hydration: true,
  })

  const toggleCheck = (key) => {
    const nextState = { ...checklist, [key]: !checklist[key] }
    setChecklist(nextState)

    // Trigger confetti if all 5 completed
    if (Object.values(nextState).filter(Boolean).length === 5) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
    }
  }

  const completedCount = Object.values(checklist).filter(Boolean).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#08283a] tracking-tight">
          {t('careRecommendations')}
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {t('careNavSub')}
        </p>
      </div>

      {/* 72-90 Day Spermatogenesis Regenerative Tracker with ECharts */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0c9d91]" />
              <h3 className="text-base font-extrabold text-[#08283a]">
                {t('cycleProgressHeader') || t('careNavTitle')}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('currentLabel') || 'Current'}: <span className="font-bold text-[#0c9d91]">{t('day48of75') || 'Day 48 of 75'}</span> ({t('cycleSpermiogenesisPhase')})
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#dff5f1] text-[#087e78] border border-emerald-200 self-start sm:self-auto">
            {t('cycleCompletedPct')}
          </span>
        </div>

        {/* ECharts Gauge & Cycle Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex items-center justify-center">
            <SpermatogenesisGauge currentDay={48} totalDays={75} t={t} currentLang={currentLang} />
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-emerald-200 bg-emerald-50/30">
              <div className="flex items-center justify-between text-xs font-bold text-[#087e78]">
                <span>Day 0</span>
                <CheckCircle2 size={13} className="text-[#0c9d91]" />
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">{t('cycleM0Title')}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{t('cycleM0Desc')}</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-emerald-200 bg-emerald-50/30">
              <div className="flex items-center justify-between text-xs font-bold text-[#087e78]">
                <span>Day 25</span>
                <CheckCircle2 size={13} className="text-[#0c9d91]" />
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">{t('cycleM25Title')}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{t('cycleM25Desc')}</div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border-2 border-[#0c9d91] shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-[#087e78]">
                <span>Day 50 ({t('statusDueSoon') || 'Current Phase'})</span>
                <span className="w-2 h-2 rounded-full bg-[#0c9d91] animate-ping" />
              </div>
              <div className="text-xs font-extrabold text-slate-900 mt-1">{t('cycleM50Title')}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{t('cycleM50Desc')}</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Day 72–75</span>
                <Calendar size={13} />
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">{t('cycleM72Title')}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{t('cycleM72Desc')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily 5-Pillar Care Adherence Checklist */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#08283a]">
              {t('dailyPillarChecklistTitle') || 'Daily 5-Pillar Care Checklist'}
            </h3>
            <p className="text-xs text-slate-500">
              {t('dailyPillarChecklistDesc') || 'Tap each intervention to log adherence. Full adherence drives maximum biomarker gain.'}
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#dff5f1] text-[#087e78] border border-emerald-200">
            {completedCount}/5 {t('loggedTodaySuffix') || 'Logged Today'}
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Item 1 */}
          <div
            onClick={() => toggleCheck('laptopPad')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              checklist.laptopPad
                ? 'bg-emerald-50/40 border-emerald-200/80'
                : 'bg-white border-slate-200/70 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  checklist.laptopPad ? 'bg-[#0c9d91] text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Flame size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('thermalTitle')}</h4>
                <p className="text-[11px] text-slate-500">{t('thermalDesc')}</p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                checklist.laptopPad ? 'bg-[#0c9d91] border-[#0c9d91] text-white' : 'border-slate-300'
              }`}
            >
              {checklist.laptopPad && <CheckCircle2 size={14} />}
            </div>
          </div>

          {/* Item 2 */}
          <div
            onClick={() => toggleCheck('coq10')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              checklist.coq10
                ? 'bg-emerald-50/40 border-emerald-200/80'
                : 'bg-white border-slate-200/70 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  checklist.coq10 ? 'bg-[#0c9d91] text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Pill size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('coq10Title')}</h4>
                <p className="text-[11px] text-slate-500">{t('coq10Desc')}</p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                checklist.coq10 ? 'bg-[#0c9d91] border-[#0c9d91] text-white' : 'border-slate-300'
              }`}
            >
              {checklist.coq10 && <CheckCircle2 size={14} />}
            </div>
          </div>

          {/* Item 3 */}
          <div
            onClick={() => toggleCheck('zinc')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              checklist.zinc
                ? 'bg-emerald-50/40 border-emerald-200/80'
                : 'bg-white border-slate-200/70 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  checklist.zinc ? 'bg-[#0c9d91] text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('zincTitle')}</h4>
                <p className="text-[11px] text-slate-500">{t('zincDesc')}</p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                checklist.zinc ? 'bg-[#0c9d91] border-[#0c9d91] text-white' : 'border-slate-300'
              }`}
            >
              {checklist.zinc && <CheckCircle2 size={14} />}
            </div>
          </div>

          {/* Item 4 */}
          <div
            onClick={() => toggleCheck('sleep7h')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              checklist.sleep7h
                ? 'bg-emerald-50/40 border-emerald-200/80'
                : 'bg-white border-slate-200/70 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  checklist.sleep7h ? 'bg-[#0c9d91] text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Moon size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('sleepTitle')}</h4>
                <p className="text-[11px] text-slate-500">{t('sleepDesc')}</p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                checklist.sleep7h ? 'bg-[#0c9d91] border-[#0c9d91] text-white' : 'border-slate-300'
              }`}
            >
              {checklist.sleep7h && <CheckCircle2 size={14} />}
            </div>
          </div>

          {/* Item 5 */}
          <div
            onClick={() => toggleCheck('hydration')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              checklist.hydration
                ? 'bg-emerald-50/40 border-emerald-200/80'
                : 'bg-white border-slate-200/70 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  checklist.hydration ? 'bg-[#0c9d91] text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Heart size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('hydrationTitle')}</h4>
                <p className="text-[11px] text-slate-500">{t('hydrationDesc')}</p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                checklist.hydration ? 'bg-[#0c9d91] border-[#0c9d91] text-white' : 'border-slate-300'
              }`}
            >
              {checklist.hydration && <CheckCircle2 size={14} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

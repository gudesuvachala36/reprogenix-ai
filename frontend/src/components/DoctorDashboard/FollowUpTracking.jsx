import { useState } from 'react'
import {
  Clock,
  CheckCircle2,
  Send,
  Calendar,
  AlertTriangle,
  RotateCw,
  BellRing,
  Award,
  Search
} from 'lucide-react'

export default function FollowUpTracking({
  followUps = [],
  onSendReminder,
  onMarkDone,
  searchQuery = '',
  currentLang = 'en',
  t = (k) => k
}) {
  const [filter, setFilter] = useState('ALL') // 'ALL', 'DUE', 'COMPLETED'

  const filteredFollowUps = followUps.filter((fu) => {
    // 1. Filter tab
    if (filter === 'DUE' && !fu.status.includes('Due') && !fu.status.includes('Week') && !fu.status.includes('Soon')) {
      return false
    }
    if (filter === 'COMPLETED' && fu.status !== 'Completed') {
      return false
    }

    // 2. Search query
    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim()
      const match =
        fu.patientName?.toLowerCase().includes(q) ||
        fu.title?.toLowerCase().includes(q) ||
        fu.status?.toLowerCase().includes(q) ||
        fu.dueDate?.toLowerCase().includes(q)
      if (!match) return false
    }

    return true
  })

  const getStatusLabel = (status) => {
    if (status.includes('Week')) return t('statusDueThisWeek') || 'Due This Week'
    if (status.includes('Soon')) return t('statusDueSoon') || 'Due Soon'
    if (status === 'Scheduled') return t('statusScheduled') || 'Scheduled'
    if (status === 'Completed') return t('statusCompleted') || 'Completed'
    return status
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t('followUpTracking')}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {t('milestones72Day') || 'Biological 72-90 day spermatogenesis cycle milestones, repeat semen analyses, and hormonal recovery checks.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'ALL'
                ? 'bg-white text-[#087e78] font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('allFollowUps')} ({followUps.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('DUE')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'DUE'
                ? 'bg-[#087e78] text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('dueFollowUps')} ({followUps.filter((f) => f.status.includes('Due') || f.status.includes('Week') || f.status.includes('Soon')).length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('COMPLETED')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'COMPLETED'
                ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('completedFollowUps')} ({followUps.filter((f) => f.status === 'Completed').length})
          </button>
        </div>
      </div>

      {/* Biological Explanation Banner */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
        <div className="p-2 rounded-xl bg-emerald-600 text-white flex-shrink-0">
          <RotateCw size={18} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
            {t('followUpRationaleTitle')}
          </h4>
          <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
            {t('followUpRationaleDesc')}
          </p>
        </div>
      </div>

      {/* Search Results Notice if filtered */}
      {searchQuery && (
        <div className="px-3 py-2 bg-slate-100 rounded-xl text-xs text-slate-600 flex items-center justify-between">
          <span>
            {t('searchResultsFor')}: <strong>"{searchQuery}"</strong> • {filteredFollowUps.length} {t('searchMatchesCount')}
          </span>
        </div>
      )}

      {/* Follow-up Cards */}
      <div className="space-y-4">
        {filteredFollowUps.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
            {t('noSearchResults')}
          </div>
        ) : (
          filteredFollowUps.map((fu) => (
            <div
              key={fu.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 font-extrabold text-sm flex items-center justify-center">
                    <Clock size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-slate-900 text-sm">{fu.titleKey ? (t(fu.titleKey) || fu.title) : fu.title}</h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          fu.status.includes('Week')
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : fu.status.includes('Soon')
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : fu.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {getStatusLabel(fu.status)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {t('patientLabel') || 'Patient'}: <span className="font-bold text-slate-800">{fu.patientNameKey ? (t(fu.patientNameKey) || fu.patientName) : fu.patientName}</span> • {t('targetDueDate')}:{' '}
                      <span className="font-semibold text-emerald-700">{fu.dueDate}</span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => onSendReminder(fu)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                  >
                    <Send size={13} className="text-emerald-600" />
                    <span>{t('sendReminder')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onMarkDone(fu.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
                  >
                    <CheckCircle2 size={13} />
                    <span>{t('markDone')}</span>
                  </button>
                </div>
              </div>

              {/* Cycle Progress Bar */}
              <div className="pt-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
                  <span>{t('spermatogenesisProgress')}</span>
                  <span className="text-emerald-700 font-extrabold">{fu.progress}% {t('percentComplete')}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                    style={{ width: `${fu.progress}%` }}
                  />
                </div>
              </div>

              {fu.notes && (
                <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                  "{fu.notesKey ? (t(fu.notesKey) || fu.notes) : fu.notes}"
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

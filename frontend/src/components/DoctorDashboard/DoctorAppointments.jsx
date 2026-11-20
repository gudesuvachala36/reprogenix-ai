import { useState } from 'react'
import {
  Calendar,
  Video,
  Phone,
  MessageCircle,
  Clock,
  User,
  Plus,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  MapPin
} from 'lucide-react'

export default function DoctorAppointments({
  appointments = [],
  onOpenScheduleModal,
  onJoinTelehealth,
  onStartVoiceCall,
  onOpenWhatsApp,
  onUpdateStatus,
  searchQuery = '',
  t = (k) => k
}) {
  const [filterStatus, setFilterStatus] = useState('ALL')

  const filteredAppointments = appointments.filter((apt) => {
    if (filterStatus === 'CONFIRMED' && apt.status !== 'Confirmed') return false
    if (filterStatus === 'WAITING' && apt.status !== 'Waiting') return false

    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim()
      const matches =
        apt.patientName?.toLowerCase().includes(q) ||
        apt.doctorName?.toLowerCase().includes(q) ||
        apt.type?.toLowerCase().includes(q) ||
        apt.status?.toLowerCase().includes(q) ||
        apt.date?.toLowerCase().includes(q) ||
        apt.notes?.toLowerCase().includes(q)
      if (!matches) return false
    }

    return true
  })

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#08283a] tracking-tight">
            {t('appointments')}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {t('aptManageSub') || 'Manage daily tele-andrology consultations, in-clinic exams, and multidisciplinary reviews.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenScheduleModal}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] active:scale-95 rounded-xl shadow-sm shadow-[#0c9d91]/25 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>{t('newAppointment') || 'New Appointment'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 pb-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setFilterStatus('ALL')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
            filterStatus === 'ALL'
              ? 'bg-[#08283a] text-white'
              : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          {t('allFilter') || 'All'} ({appointments.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus('CONFIRMED')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
            filterStatus === 'CONFIRMED'
              ? 'bg-[#087e78] text-white'
              : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          {t('confirmed') || 'Confirmed'}
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus('WAITING')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
            filterStatus === 'WAITING'
              ? 'bg-amber-600 text-white'
              : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          {t('waiting') || 'Waiting in Lobby'}
        </button>
      </div>

      {/* Search Results Notice if filtered */}
      {searchQuery && (
        <div className="px-3 py-2 bg-slate-100 rounded-xl text-xs text-slate-600 flex items-center justify-between">
          <span>
            {t('searchResultsFor')}: <strong>"{searchQuery}"</strong> • {filteredAppointments.length} {t('searchMatchesCount')}
          </span>
        </div>
      )}

      {/* Appointment Cards List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
            {t('noSearchResults')}
          </div>
        ) : (
          filteredAppointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0c9d91]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Left: Patient & Appointment Details */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#dff5f1] text-[#087e78] flex items-center justify-center flex-shrink-0 font-bold text-xs border border-emerald-100">
                <Calendar size={20} />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-base font-extrabold text-[#08283a]">{apt.patientNameKey ? (t(apt.patientNameKey) || apt.patientName) : apt.patientName}</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                    {apt.typeKey ? (t(apt.typeKey) || apt.type) : apt.type}
                  </span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      apt.status === 'Confirmed'
                        ? 'bg-[#dff5f1] text-[#087e78] border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {apt.status === 'Confirmed' ? (t('aptStatusConfirmed') || 'Confirmed') : apt.status === 'Waiting' ? (t('aptStatusWaiting') || 'Waiting') : (t('aptStatusCompleted') || apt.status)}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1 text-[#08283a] font-semibold">
                    <Clock size={13} className="text-[#0c9d91]" />
                    {apt.date} • {apt.time}
                  </span>
                  <span>{t('attendingLabel') || 'Attending'}: {apt.doctorNameKey ? (t(apt.doctorNameKey) || apt.doctorName) : apt.doctorName}</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin size={12} /> {apt.locationKey ? (t(apt.locationKey) || apt.location) : apt.location}
                  </span>
                </div>

                {apt.notes && (
                  <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="font-semibold text-slate-700">{t('clinicalFocusLabel') || 'Clinical Focus'}:</span> {apt.notesKey ? (t(apt.notesKey) || apt.notes) : apt.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Actions (Video, Call, WhatsApp, Complete) */}
            <div className="flex items-center gap-2 self-end md:self-auto flex-wrap flex-shrink-0">
              {/* 1. Video Consultation */}
              {apt.isTelehealth && (
                <button
                  type="button"
                  onClick={() => onJoinTelehealth(apt)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] rounded-xl shadow-xs transition-all active:scale-95"
                  title="Join live encrypted video call"
                >
                  <Video size={13} />
                  <span>{t('videoConsult') || 'Video'}</span>
                </button>
              )}

              {/* 2. Direct Voice Call */}
              <button
                type="button"
                onClick={() => onStartVoiceCall && onStartVoiceCall(apt)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#087e78] bg-[#dff5f1] hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-all active:scale-95"
                title="Start phone audio consultation"
              >
                <Phone size={13} />
                <span>{t('voiceCall') || 'Call'}</span>
              </button>

              {/* 3. WhatsApp Consultation */}
              <button
                type="button"
                onClick={() => onOpenWhatsApp && onOpenWhatsApp(apt)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-all active:scale-95"
                title="Send reminder or chat on WhatsApp"
              >
                <MessageCircle size={13} />
                <span>{t('whatsAppConsult') || 'WhatsApp'}</span>
              </button>

              {/* Status Update */}
              <button
                type="button"
                onClick={() =>
                  onUpdateStatus(
                    apt.id,
                    apt.status === 'Confirmed' ? 'In-Consultation' : 'Completed'
                  )
                }
                className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
              >
{apt.status === 'Confirmed' ? (t('startConsult') || 'Start Consult') : (t('complete') || 'Complete')}
              </button>
            </div>
          </div>
        )))}
      </div>
    </div>
  )
}

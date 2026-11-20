import {
  Calendar,
  Video,
  Phone,
  MessageCircle,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  Sparkles
} from 'lucide-react'

export default function PatientAppointments({
  onJoinTelehealth,
  onStartVoiceCall,
  onOpenWhatsApp,
  searchQuery = '',
  currentLang = 'en',
  t = (k) => k
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#08283a] tracking-tight">
          {t('patientAppointments')}
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {t('patAptSub') || 'Join your upcoming specialist video consults, audio call lines, or WhatsApp messaging.'}
        </p>
      </div>

      {/* Primary Upcoming Appointment Banner */}
      <div className="bg-gradient-to-br from-white to-[#dff5f1]/40 rounded-3xl p-6 border-2 border-[#0c9d91]/40 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0c9d91] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#087e78]">
              {t('nextConsultationToday')}
            </span>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#087e78] text-white self-start sm:self-auto shadow-xs">
            {t('confirmedReady')}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-1">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#08283a] via-[#087e78] to-[#0c9d91] text-white font-extrabold text-base flex items-center justify-center shadow-xs flex-shrink-0">
              SJ
            </div>
            <div>
              <h3 className="text-lg font-black text-[#08283a]">{t('doctorTitle') || 'Dr. Sarah Johnson, MD'}</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {t('leadAndrologist') || 'Lead Andrologist & Male Reproductive Specialist'}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold mt-2 flex-wrap">
                <span className="flex items-center gap-1 text-[#087e78]">
                  <Clock size={14} className="text-[#0c9d91]" />
                  {t('todayConsultTime') || 'Today, 3:00 PM – 3:30 PM (30 Mins)'}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <MapPin size={13} /> {t('locEncryptedRoom4B') || 'Encrypted Video Room 4B'}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Channels: Video, Phone Call, WhatsApp */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 flex-shrink-0">
            {/* 1. Video Consultation */}
            <button
              type="button"
              onClick={onJoinTelehealth}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] active:scale-95 rounded-xl shadow-md shadow-[#0c9d91]/25 transition-all"
              title="Join video consult"
            >
              <Video size={15} />
              <span>{t('videoConsultBtn') || 'Video Consult'}</span>
            </button>

            {/* 2. Direct Audio Phone Call */}
            <button
              type="button"
              onClick={onStartVoiceCall}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-[#087e78] bg-[#dff5f1] hover:bg-emerald-100 active:scale-95 rounded-xl border border-emerald-200 transition-all"
              title="Start audio call"
            >
              <Phone size={14} />
              <span>{t('voiceCallBtn') || 'Voice Call'}</span>
            </button>

            {/* 3. WhatsApp Messaging */}
            <button
              type="button"
              onClick={onOpenWhatsApp}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 active:scale-95 rounded-xl border border-emerald-200 transition-all"
              title="Open WhatsApp consultation"
            >
              <MessageCircle size={14} />
              <span>{t('whatsAppBtn') || 'WhatsApp'}</span>
            </button>
          </div>
        </div>

        {/* Clinical Preparation Guidance Note */}
        <div className="pt-3 border-t border-slate-200/60 text-xs text-slate-600 flex items-start gap-2 bg-white/70 p-3 rounded-2xl">
          <Sparkles size={16} className="text-[#0c9d91] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#08283a]">{t('preparationChecklist') || 'Preparation Checklist'}:</span> {t('preparationChecklistDesc') || 'Have your recent semen analysis report and lifestyle tracking log ready. Dr. Sarah will review your 72-Day spermatogenesis recovery progress.'}
          </div>
        </div>
      </div>
    </div>
  )
}

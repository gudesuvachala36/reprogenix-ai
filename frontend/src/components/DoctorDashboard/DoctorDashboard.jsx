import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  Calendar,
  ClockAlert,
  Settings,
  Stethoscope,
  Activity,
  FileSpreadsheet,
  BookOpen
} from 'lucide-react'
import DoctorMetrics from './DoctorMetrics'
import PatientRecords from './PatientRecords'
import PatientDetailModal from './PatientDetailModal'
import RiskAssessmentResults from './RiskAssessmentResults'
import ClinicalAnalytics from './ClinicalAnalytics'
import DoctorAppointments from './DoctorAppointments'
import FollowUpTracking from './FollowUpTracking'
import ScheduleModal from './ScheduleModal'
import ReportGeneratorModal from './ReportGeneratorModal'

export default function DoctorDashboard({
  patients = [],
  appointments = [],
  followUps = [],
  onUpdateAppointmentStatus,
  onJoinTelehealth,
  onStartVoiceCall,
  onOpenWhatsApp,
  onScheduleAppointment,
  onSendFollowUpReminder,
  onMarkFollowUpDone,
  searchQuery,
  currentLang,
  currentUser,
  t
}) {
  const [activeTab, setActiveTab] = useState('patients') // 'patients', 'risk', 'analytics', 'appointments', 'followups', 'settings'
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [scheduleInitialData, setScheduleInitialData] = useState(null)

  // Dynamic doctor details based on active authenticated user
  const doctorDisplayName =
    currentUser?.role === 'doctor' && currentUser?.name
      ? currentUser.name
      : 'Dr. Sarah Johnson, MD'
  const doctorSpecialty =
    currentUser?.specialty || 'Lead Clinical Andrologist & Infertility'
  const doctorInitials =
    doctorDisplayName
      .replace(/Dr\.\s*/i, '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase() || 'DR'

  const handleOpenDetail = (patient) => {
    setSelectedPatient(patient)
    setIsDetailOpen(true)
  }

  const handleOpenSchedule = (patientOrDoctor) => {
    if (patientOrDoctor?.doctor) {
      setScheduleInitialData({ doctor: patientOrDoctor.doctor })
    } else if (patientOrDoctor?.id) {
      setScheduleInitialData({ patientId: patientOrDoctor.id })
    } else {
      setScheduleInitialData(null)
    }
    setIsScheduleOpen(true)
  }

  const handleOpenReport = (patient) => {
    setSelectedPatient(patient || patients[0])
    setIsReportOpen(true)
  }

  return (
    <div className="max-w-[1520px] mx-auto px-3 sm:px-6 py-6 flex flex-col md:flex-row gap-6">
      {/* Left Sidebar matching Medicare Pro reference styling */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-3xl p-3.5 border border-slate-200/80 shadow-xs sticky top-20">
          <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
            {t('doctorPortal') || 'Doctor Portal'}
          </div>

          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'patients'
                  ? 'bg-[#dff5f1] text-[#087e78] font-extrabold shadow-2xs border-l-4 border-[#0c9d91]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Users
                size={16}
                className={activeTab === 'patients' ? 'text-[#087e78]' : 'text-slate-400'}
              />
              <span>{t('patientRecords')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('risk')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'risk'
                  ? 'bg-[#dff5f1] text-[#087e78] font-extrabold shadow-2xs border-l-4 border-[#0c9d91]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <ShieldAlert
                size={16}
                className={activeTab === 'risk' ? 'text-[#087e78]' : 'text-slate-400'}
              />
              <span>{t('riskAssessment')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-[#dff5f1] text-[#087e78] font-extrabold shadow-2xs border-l-4 border-[#0c9d91]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Activity
                size={16}
                className={activeTab === 'analytics' ? 'text-[#087e78]' : 'text-slate-400'}
              />
              <span>{t('overviewAnalytics')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'appointments'
                  ? 'bg-[#dff5f1] text-[#087e78] font-extrabold shadow-2xs border-l-4 border-[#0c9d91]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Calendar
                size={16}
                className={activeTab === 'appointments' ? 'text-[#087e78]' : 'text-slate-400'}
              />
              <span>{t('appointments')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('followups')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'followups'
                  ? 'bg-[#dff5f1] text-[#087e78] font-extrabold shadow-2xs border-l-4 border-[#0c9d91]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <ClockAlert
                size={16}
                className={activeTab === 'followups' ? 'text-[#087e78]' : 'text-slate-400'}
              />
              <span>{t('followUpTracking')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#dff5f1] text-[#087e78] font-extrabold shadow-2xs border-l-4 border-[#0c9d91]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Settings
                size={16}
                className={activeTab === 'settings' ? 'text-[#087e78]' : 'text-slate-400'}
              />
              <span>{t('settings')}</span>
            </button>
          </nav>

          {/* Dynamic Authenticated Doctor Summary Card */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#08283a] via-[#087e78] to-[#0c9d91] text-white font-black text-sm mx-auto flex items-center justify-center shadow-sm">
              {doctorInitials}
            </div>
            <div className="text-xs font-extrabold text-[#08283a] mt-2 truncate">
              {(!currentUser?.name || currentUser?.name === 'Dr. Sarah Johnson, MD') ? (t('doctorTitle') || 'Dr. Sarah Johnson, MD') : (currentUser?.nameKey ? (t(currentUser.nameKey) || doctorDisplayName) : doctorDisplayName)}
            </div>
            <div className="text-[10px] text-slate-500 font-medium truncate">
              {t('leadAndrologistSpecialty') || t('doctorRole') || doctorSpecialty}
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/70 flex justify-between text-[10px] font-bold text-slate-600">
              <span>{t('onDuty') || 'On-Duty'}</span>
              <span className="text-[#087e78] font-extrabold">● {t('available') || 'Available'}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        {/* Metric Summary Cards */}
        <DoctorMetrics
          patients={patients}
          appointments={appointments}
          followUps={followUps}
          t={t}
        />

        {/* View Switcher based on active tab */}
        {activeTab === 'patients' && (
          <PatientRecords
            patients={patients}
            onSelectPatient={handleOpenDetail}
            onSchedulePatient={handleOpenSchedule}
            searchQuery={searchQuery}
            t={t}
          />
        )}

        {activeTab === 'risk' && (
          <RiskAssessmentResults
            patients={patients}
            onSelectPatient={handleOpenDetail}
            t={t}
          />
        )}

        {activeTab === 'analytics' && <ClinicalAnalytics t={t} currentLang={currentLang} />}

        {activeTab === 'appointments' && (
          <DoctorAppointments
            appointments={appointments}
            onOpenScheduleModal={() => handleOpenSchedule()}
            onJoinTelehealth={onJoinTelehealth}
            onStartVoiceCall={onStartVoiceCall}
            onOpenWhatsApp={onOpenWhatsApp}
            onUpdateStatus={onUpdateAppointmentStatus}
            searchQuery={searchQuery}
            t={t}
          />
        )}

        {activeTab === 'followups' && (
          <FollowUpTracking
            followUps={followUps}
            onSendReminder={onSendFollowUpReminder}
            onMarkDone={onMarkFollowUpDone}
            searchQuery={searchQuery}
            currentLang={currentLang}
            t={t}
          />
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">
              {t('clinicalGuidelinesTitle') || 'Clinical Guidelines & AI Governance Framework'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('clinicalGuidelinesSub') || 'Reprogenix AI adheres to internationally recognized andrological standards:'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <div className="font-bold text-xs text-slate-900">
                  {t('whoGuideTitle') || 'World Health Organization (WHO)'}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  {t('whoGuideSub') || 'WHO Semen Analysis Manual 6th Edition (2021)'}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {t('whoGuideDesc') || 'Global 5th-percentile benchmark distributions for semen concentration (16 M/mL), progressive motility (30%), and morphology (4%).'}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <div className="font-bold text-xs text-slate-900">
                  {t('auaGuideTitle') || 'AUA / ASRM Guidelines'}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  {t('auaGuideSub') || 'Diagnosis and Treatment of Male Infertility (2024 Update)'}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {t('auaGuideDesc') || 'Endocrine evaluation, varicocelectomy surgical indications, and couple-centred parallel workups.'}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <div className="font-bold text-xs text-slate-900">
                  {t('eauGuideTitle') || 'European Association of Urology (EAU)'}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  {t('eauGuideSub') || 'Guidelines on Sexual and Reproductive Health (2024)'}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {t('eauGuideDesc') || 'Acute scrotal pain emergency management, thermal and environmental stress mitigation.'}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <div className="font-bold text-xs text-slate-900">
                  {t('privacyGuideTitle') || 'Privacy & Ephemeral Memory'}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  {t('privacyGuideSub') || 'HIPAA & GDPR Article 9 Compliant Architecture'}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {t('privacyGuideDesc') || 'Ephemeral in-memory processing. Zero persistent patient identifiers or database logging.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Connected Modals */}
      <PatientDetailModal
        patient={selectedPatient}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onSchedule={(p) => handleOpenSchedule(p)}
        onGenerateReport={(p) => handleOpenReport(p)}
        t={t}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSave={(newApt) => {
          onScheduleAppointment(newApt)
          setIsScheduleOpen(false)
        }}
        initialData={scheduleInitialData}
        t={t}
      />

      <ReportGeneratorModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        selectedPatient={selectedPatient}
        patientsList={patients}
        onSelectPatient={setSelectedPatient}
        t={t}
      />
    </div>
  )
}

import { useState } from 'react'
import {
  User,
  History,
  FileText,
  Calendar,
  Sparkles,
  Heart,
  Clock,
  ShieldCheck,
  Activity,
  Award
} from 'lucide-react'
import HealthProfile from './HealthProfile'
import AssessmentHistory from './AssessmentHistory'
import PatientReports from './PatientReports'
import PatientAppointments from './PatientAppointments'
import CareRecommendations from './CareRecommendations'
import TeleConsultModal from './TeleConsultModal'
import ReportGeneratorModal from '../DoctorDashboard/ReportGeneratorModal'

export default function PatientDashboard({
  patient,
  currentUser,
  onJoinTelehealth,
  onStartVoiceCall,
  onOpenWhatsApp,
  onRetakeAssessment,
  searchQuery = '',
  currentLang = 'en',
  t = (k) => k
}) {
  const [activeTab, setActiveTab] = useState('profile') // 'profile', 'history', 'reports', 'appointments', 'care'
  const [isTelehealthOpen, setIsTelehealthOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)

  return (
    <div className="max-w-[1520px] mx-auto px-3 sm:px-6 py-6 flex flex-col md:flex-row gap-6">
      {/* Patient Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-3xl p-3.5 border border-slate-200/80 shadow-xs sticky top-20">
          <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
            {t('patientDashboard')}
          </div>

          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#dff5f1] text-[#087e78] font-extrabold shadow-2xs border-l-4 border-[#0c9d91]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <User
                size={16}
                className={activeTab === 'profile' ? 'text-[#087e78]' : 'text-slate-400'}
              />
              <span>{t('healthProfile')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'history'
                  ? 'bg-[#dff5f1] text-[#087e78] font-extrabold shadow-2xs border-l-4 border-[#0c9d91]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <History
                size={16}
                className={activeTab === 'history' ? 'text-[#087e78]' : 'text-slate-400'}
              />
              <span>{t('assessmentHistory')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'reports'
                  ? 'bg-[#dff5f1] text-[#087e78] font-extrabold shadow-2xs border-l-4 border-[#0c9d91]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <FileText
                size={16}
                className={activeTab === 'reports' ? 'text-[#087e78]' : 'text-slate-400'}
              />
              <span>{t('reports')}</span>
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
              <span>{t('patientAppointments')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('care')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'care'
                  ? 'bg-[#dff5f1] text-[#087e78] font-extrabold shadow-2xs border-l-4 border-[#0c9d91]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Heart
                size={16}
                className={activeTab === 'care' ? 'text-[#087e78]' : 'text-slate-400'}
              />
              <span>{t('careRecommendations')}</span>
            </button>
          </nav>

          {/* Quick Care Snapshot Box */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-[#dff5f1]/40 border border-slate-200/70 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {t('cycleDay')}
            </span>
            <div className="text-2xl font-black text-[#08283a] mt-1">Day 48</div>
            <span className="text-[11px] text-[#087e78] font-bold">
              {t('cycleDayMid') || 'of 75-Day Protocol'}
            </span>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div className="bg-[#0c9d91] h-1.5 rounded-full" style={{ width: '64%' }} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        {activeTab === 'profile' && (
          <HealthProfile
            patient={patient}
            onRetakeAssessment={onRetakeAssessment}
            searchQuery={searchQuery}
            currentLang={currentLang}
            t={t}
          />
        )}

        {activeTab === 'history' && (
          <AssessmentHistory
            patient={patient}
            onRetakeAssessment={onRetakeAssessment}
            onOpenReport={() => setIsReportOpen(true)}
            searchQuery={searchQuery}
            currentLang={currentLang}
            t={t}
          />
        )}

        {activeTab === 'reports' && (
          <PatientReports
            onOpenReportModal={() => setIsReportOpen(true)}
            searchQuery={searchQuery}
            currentLang={currentLang}
            t={t}
          />
        )}

        {activeTab === 'appointments' && (
          <PatientAppointments
            onJoinTelehealth={onJoinTelehealth ? () => onJoinTelehealth({ doctorName: patient.doctor, patientName: patient.name }) : () => setIsTelehealthOpen(true)}
            onStartVoiceCall={onStartVoiceCall ? () => onStartVoiceCall({ doctorName: patient.doctor, patientName: patient.name }) : null}
            onOpenWhatsApp={onOpenWhatsApp ? () => onOpenWhatsApp({ doctorName: patient.doctor, patientName: patient.name }) : null}
            searchQuery={searchQuery}
            currentLang={currentLang}
            t={t}
          />
        )}

        {activeTab === 'care' && (
          <CareRecommendations
            patient={patient}
            onOpenSchedule={() => setActiveTab('appointments')}
            searchQuery={searchQuery}
            currentLang={currentLang}
            t={t}
          />
        )}
      </main>

      {/* Telehealth Video Room Modal */}
      <TeleConsultModal
        isOpen={isTelehealthOpen}
        onClose={() => setIsTelehealthOpen(false)}
        doctorName={patient.doctor}
        patientName={patient.name}
        t={t}
      />

      {/* Clinical Report Preview Modal */}
      <ReportGeneratorModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        selectedPatient={patient}
        t={t}
      />
    </div>
  )
}

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import PublicWebsite from './components/PublicWebsite/PublicWebsite'
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard'
import PatientDashboard from './components/PatientDashboard/PatientDashboard'
import TeleConsultModal from './components/PatientDashboard/TeleConsultModal'
import VoiceCallModal from './components/PatientDashboard/VoiceCallModal'
import ReportGeneratorModal from './components/DoctorDashboard/ReportGeneratorModal'
import QuickAssessmentModal from './components/PublicWebsite/QuickAssessmentModal'
import AuthModal from './components/Auth/AuthModal'
import PatientDetailModal from './components/DoctorDashboard/PatientDetailModal'
import PublicInfoModal from './components/PublicWebsite/PublicInfoModal'
import {
  PATIENTS,
  DOCTORS,
  APPOINTMENTS,
  NOTIFICATIONS,
  FOLLOW_UPS
} from './data/mockData'
import { translations, t, isRtl } from './i18n/translations'

export default function App() {
  const [activeRole, setActiveRole] = useState('doctor') // 'public', 'doctor', 'patient'
  const [currentLang, setCurrentLang] = useState('en')
  const [searchQuery, setSearchQuery] = useState('')

  // User Auth State
  const [currentUser, setCurrentUser] = useState({
    name: 'Dr. Sarah Johnson, MD',
    role: 'doctor'
  })
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authInitialMode, setAuthInitialMode] = useState('signin') // 'signin' or 'signup'

  // Central Interactive State
  const [patientsList, setPatientsList] = useState(PATIENTS)
  const [appointmentsList, setAppointmentsList] = useState(APPOINTMENTS)
  const [notificationsList, setNotificationsList] = useState(NOTIFICATIONS)
  const [followUpsList, setFollowUpsList] = useState(FOLLOW_UPS)

  // Modals controlled at top level
  const [isGlobalReportOpen, setIsGlobalReportOpen] = useState(false)
  const [isGlobalTelehealthOpen, setIsGlobalTelehealthOpen] = useState(false)
  const [activeTelehealthApt, setActiveTelehealthApt] = useState(null)
  const [isQuickAssessmentOpen, setIsQuickAssessmentOpen] = useState(false)
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false)
  const [activeVoiceCallApt, setActiveVoiceCallApt] = useState(null)
  const [isPublicInfoOpen, setIsPublicInfoOpen] = useState(false)
  const [publicInfoTopic, setPublicInfoTopic] = useState('services')

  // Notification-triggered modal
  const [notificationSelectedPatient, setNotificationSelectedPatient] = useState(null)
  const [isNotificationDetailOpen, setIsNotificationDetailOpen] = useState(false)

  // Selected patient for patient dashboard (defaults to Marcus Vance)
  const [currentPatient, setCurrentPatient] = useState(PATIENTS[0])

  // Handle RTL for Arabic
  useEffect(() => {
    if (isRtl(currentLang)) {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = currentLang
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = currentLang
    }
  }, [currentLang])

  // Translate helper with current language
  const translate = (key) => t(key, currentLang)

  // Open Auth Modal
  const handleOpenAuth = (mode = 'signin') => {
    setAuthInitialMode(mode)
    setIsAuthOpen(true)
  }

  // Handle successful login or registration
  const handleSuccessLogin = (role, userName, meta = {}) => {
    const newUser = {
      name: userName,
      role: role,
      ...meta
    }
    setCurrentUser(newUser)
    setActiveRole(role)

    if (role === 'patient') {
      const initials = userName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase() || 'PT'
      setCurrentPatient((prev) => ({
        ...prev,
        name: userName,
        avatar: initials,
        email: meta.email || prev.email,
        dob: meta.dob || prev.dob,
        goal: meta.goal || prev.goal
      }))
    }

    const welcomeMsg = role === 'doctor'
      ? `${translate('welcomeToastDoctor') || 'Welcome!'} (${userName})`
      : `${translate('welcomeToastPatient') || 'Welcome!'} (${userName})`
    toast.success(welcomeMsg, {
      icon: role === 'doctor' ? '🩺' : '👤',
      position: 'top-right',
      autoClose: 3500
    })
  }

  // Handle user logout (resets session, redirects to public portal, notifies via react-toastify)
  const handleLogout = () => {
    const prevName = currentUser?.name || 'User'
    setCurrentUser(null)
    setActiveRole('public')
    toast.info(`${translate('logoutToast') || 'Logged out. See you soon!'} (${prevName})`, {
      icon: '👋',
      position: 'top-right',
      autoClose: 3000
    })
  }

  // Notification click routing handler (addresses user feedback: "some of them like notifications on click of that its not working")
  const handleNotificationClick = (item) => {
    // 1. Mark as read in state
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    )

    // 2. Perform intelligent action based on notification type
    if (item.type === 'patient') {
      // Carlos Mendoza registered -> open Carlos's record
      const carlos = patientsList.find((p) => p.name.includes('Carlos')) || patientsList[5]
      setActiveRole('doctor')
      setNotificationSelectedPatient(carlos)
      setIsNotificationDetailOpen(true)
    } else if (item.type === 'calendar') {
      // Appointment scheduled -> open Telehealth video call simulator
      setActiveRole('doctor')
      setActiveTelehealthApt({
        doctorName: 'Dr. Sarah Johnson, MD',
        patientName: 'Marcus Vance'
      })
      setIsGlobalTelehealthOpen(true)
    } else if (item.type === 'lab') {
      // Lab results ready -> open Tariq's WHO 6th Ed report
      const tariq = patientsList.find((p) => p.name.includes('Tariq')) || patientsList[1]
      setCurrentPatient(tariq)
      setIsGlobalReportOpen(true)
    } else if (item.type === 'alert') {
      // High risk flagged -> open Liam Gallagher's high-risk varicocele record
      const liam = patientsList.find((p) => p.name.includes('Liam')) || patientsList[2]
      setActiveRole('doctor')
      setNotificationSelectedPatient(liam)
      setIsNotificationDetailOpen(true)
    } else if (item.type === 'cycle') {
      // 72-Day milestone due -> switch to patient portal or doctor follow-ups
      setActiveRole('patient')
    }
  }

  const handleMarkAllNotificationsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  // Appointment actions
  const handleScheduleAppointment = (newApt) => {
    setAppointmentsList((prev) => [newApt, ...prev])
    setNotificationsList((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Appointment Scheduled',
        message: `New consultation with ${newApt.patientName} booked for ${newApt.date} at ${newApt.time}.`,
        time: 'Just now',
        type: 'calendar',
        read: false
      },
      ...prev
    ])
    toast.success(`Consultation booked with ${newApt.patientName || 'Doctor'} on ${newApt.date} at ${newApt.time}`, {
      icon: '📅'
    })
  }

  const handleUpdateAppointmentStatus = (aptId, newStatus) => {
    setAppointmentsList((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status: newStatus } : a))
    )
    toast.info(`Appointment status updated to "${newStatus}"`, { icon: '🔄' })
  }

  const handleJoinTelehealth = (apt) => {
    setActiveTelehealthApt(apt)
    setIsGlobalTelehealthOpen(true)
    toast.info(`Connecting to encrypted telehealth room with ${apt?.doctorName || 'Dr. Sarah Johnson, MD'}...`, {
      icon: '📹'
    })
  }

  const handleStartVoiceCall = (apt) => {
    setActiveVoiceCallApt(apt)
    setIsVoiceCallOpen(true)
    toast.info(`Initiating secure clinical audio call with ${apt?.doctorName || 'Dr. Sarah Johnson, MD'}...`, {
      icon: '📞'
    })
  }

  const handleOpenWhatsApp = (apt) => {
    const docName = apt?.doctorName || 'Dr. Sarah Johnson, MD'
    const ptName = apt?.patientName || currentPatient.name
    const textMsg = encodeURIComponent(
      `Hello ${docName}, this is ${ptName} from Reprogenix AI Portal. Regarding my male reproductive health consultation: ${apt?.notes || '72-Day cycle review and lab verification'}.`
    )
    window.open(`https://wa.me/?text=${textMsg}`, '_blank')
    toast.success(`WhatsApp clinical chat session launched with ${docName}`, {
      icon: '💬'
    })
  }

  const handleOpenPublicInfo = (topic = 'services') => {
    setPublicInfoTopic(topic)
    setIsPublicInfoOpen(true)
  }

  // Follow-up actions
  const handleSendFollowUpReminder = (fu) => {
    toast.success(`Automated SMS & Email reminder dispatched to ${fu.patientName} for "${fu.title}".`, {
      icon: '📲'
    })
  }

  const handleMarkFollowUpDone = (fuId) => {
    setFollowUpsList((prev) =>
      prev.map((f) => (f.id === fuId ? { ...f, status: 'Completed', progress: 100 } : f))
    )
    toast.success(`Clinical milestone marked as completed!`, { icon: '✅' })
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans antialiased selection:bg-[#0c9d91] selection:text-white">
      {/* Top Application Header matching Reprogenix AI & Medicare Pro styling */}
      <Header
        activeRole={activeRole}
        onSelectRole={setActiveRole}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        notifications={notificationsList}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onNotificationClick={handleNotificationClick}
        onOpenReportModal={() => setIsGlobalReportOpen(true)}
        onOpenAuthModal={handleOpenAuth}
        onOpenPublicInfo={handleOpenPublicInfo}
        onLogout={handleLogout}
        currentUser={currentUser}
        t={translate}
      />

      {/* Main Experience Routing */}
      <div className="flex-1">
        {activeRole === 'public' && (
          <PublicWebsite
            onLaunchDoctor={() => setActiveRole('doctor')}
            onLaunchPatient={() => setActiveRole('patient')}
            onOpenAuthModal={handleOpenAuth}
            onOpenPublicInfo={handleOpenPublicInfo}
            searchQuery={searchQuery}
            currentLang={currentLang}
            t={translate}
          />
        )}

        {activeRole === 'doctor' && (
          <DoctorDashboard
            patients={patientsList}
            appointments={appointmentsList}
            followUps={followUpsList}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            onJoinTelehealth={handleJoinTelehealth}
            onStartVoiceCall={handleStartVoiceCall}
            onOpenWhatsApp={handleOpenWhatsApp}
            onScheduleAppointment={handleScheduleAppointment}
            onSendFollowUpReminder={handleSendFollowUpReminder}
            onMarkFollowUpDone={handleMarkFollowUpDone}
            searchQuery={searchQuery}
            currentLang={currentLang}
            currentUser={currentUser}
            t={translate}
          />
        )}

        {activeRole === 'patient' && (
          <PatientDashboard
            patient={currentPatient}
            currentUser={currentUser}
            onJoinTelehealth={handleJoinTelehealth}
            onStartVoiceCall={handleStartVoiceCall}
            onOpenWhatsApp={handleOpenWhatsApp}
            onRetakeAssessment={() => setIsQuickAssessmentOpen(true)}
            searchQuery={searchQuery}
            currentLang={currentLang}
            t={translate}
          />
        )}
      </div>

      {/* Global Modals */}
      <ReportGeneratorModal
        isOpen={isGlobalReportOpen}
        onClose={() => setIsGlobalReportOpen(false)}
        selectedPatient={currentPatient}
        patientsList={patientsList}
        onSelectPatient={setCurrentPatient}
        t={translate}
      />

      <TeleConsultModal
        isOpen={isGlobalTelehealthOpen}
        onClose={() => setIsGlobalTelehealthOpen(false)}
        doctorName={activeTelehealthApt?.doctorName || 'Dr. Sarah Johnson, MD'}
        patientName={activeTelehealthApt?.patientName || currentPatient.name}
        t={translate}
      />

      <VoiceCallModal
        isOpen={isVoiceCallOpen}
        onClose={() => setIsVoiceCallOpen(false)}
        doctorName={activeVoiceCallApt?.doctorName || 'Dr. Sarah Johnson, MD'}
        patientName={activeVoiceCallApt?.patientName || currentPatient.name}
        t={translate}
      />

      <PublicInfoModal
        isOpen={isPublicInfoOpen}
        onClose={() => setIsPublicInfoOpen(false)}
        initialTopic={publicInfoTopic}
        onNavigateToSection={(sectionId) => {
          setActiveRole('public')
          setTimeout(() => {
            const el = document.getElementById(sectionId)
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' })
              el.classList.add('ring-4', 'ring-[#0c9d91]/30', 'rounded-3xl', 'transition-all')
              setTimeout(() => {
                el.classList.remove('ring-4', 'ring-[#0c9d91]/30')
              }, 2000)
            }
          }, 150)
        }}
        t={translate}
      />

      <QuickAssessmentModal
        isOpen={isQuickAssessmentOpen}
        onClose={() => setIsQuickAssessmentOpen(false)}
        onFinish={() => setActiveRole('patient')}
        t={translate}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authInitialMode}
        onSuccessLogin={handleSuccessLogin}
        t={translate}
      />

      <PatientDetailModal
        patient={notificationSelectedPatient}
        isOpen={isNotificationDetailOpen}
        onClose={() => setIsNotificationDetailOpen(false)}
        onSchedule={() => {
          setIsNotificationDetailOpen(false)
          setActiveRole('doctor')
        }}
        onGenerateReport={(p) => {
          setCurrentPatient(p)
          setIsNotificationDetailOpen(false)
          setIsGlobalReportOpen(true)
        }}
        t={translate}
      />

      {/* Fully Translated Clinical Portal Footer with Quality Standards */}
      <footer className="mt-auto py-5 px-6 border-t border-slate-200/80 bg-white/80 text-center text-xs text-slate-500">
        <div className="max-w-[1520px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="font-extrabold text-[#08283a]">{translate('footerBrand') || 'Reprogenix AI'}</span>
            <span>•</span>
            <span>{translate('footerTagline') || 'Preventive Male Reproductive Health & Clinical AI Screening'}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium flex-wrap justify-center sm:justify-end">
            <span>{translate('footerWho') || 'WHO 6th Ed Reference'}</span>
            <span>•</span>
            <span>{translate('footerAua') || 'AUA / EAU Guidelines'}</span>
            <span>•</span>
            <span>{translate('footerPii') || 'Zero Persistent PII'}</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} {translate('footerRights') || 'All Rights Reserved'}</span>
          </div>
        </div>
      </footer>

      {/* Global React Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={isRtl(currentLang)}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

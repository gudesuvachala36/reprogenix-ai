import { useState, useRef, useEffect } from 'react'
import {
  Search,
  Calendar,
  FileSpreadsheet,
  Bell,
  Stethoscope,
  User,
  Globe,
  Activity,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  Info,
  HelpCircle,
  ShieldCheck,
  HeartPulse,
  Layers,
  BookOpen,
  X,
  ArrowRight,
  ShieldAlert,
  Clock,
  PhoneCall
} from 'lucide-react'
import LanguageSelector from './Common/LanguageSelector'
import NotificationFlyout from './NotificationFlyout'
import { PATIENTS, DOCTORS, APPOINTMENTS } from '../data/mockData'

export default function Header({
  activeRole,
  onSelectRole,
  currentLang,
  onSelectLang,
  searchQuery = '',
  onSearchChange,
  notifications,
  onMarkAllRead,
  onNotificationClick,
  onOpenReportModal,
  onOpenAuthModal,
  onOpenPublicInfo,
  onLogout,
  currentUser,
  t
}) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showExploreMenu, setShowExploreMenu] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)

  const bellRef = useRef(null)
  const exploreRef = useRef(null)
  const searchRef = useRef(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  const todayFormatted = new Intl.DateTimeFormat(
    currentLang === 'hi' ? 'hi-IN' : currentLang === 'ar' ? 'ar-SA' : 'en-US',
    {
      month: 'short',
      day: 'numeric'
    }
  ).format(new Date())

  useEffect(() => {
    function handleClickOutside(event) {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setShowExploreMenu(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Smooth scroll helper for clinical portal sections
  const handleScrollToSection = (sectionId, topicFallback = 'services') => {
    if (activeRole === 'public') {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        el.classList.add('ring-4', 'ring-[#0c9d91]/30', 'rounded-3xl', 'transition-all')
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-[#0c9d91]/30')
        }, 2000)
      }
    } else {
      if (onOpenPublicInfo) {
        onOpenPublicInfo(topicFallback)
      }
    }
  }

  // Live matching results for the search dropdown
  const q = searchQuery.trim().toLowerCase()
  const matchingPatients = q
    ? PATIENTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.mrn.toLowerCase().includes(q) ||
          p.riskLevel.toLowerCase().includes(q) ||
          p.primaryConcern.toLowerCase().includes(q)
      ).slice(0, 3)
    : []

  const matchingDoctors = q
    ? DOCTORS.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q)
      ).slice(0, 3)
    : []

  const matchingAppointments = q
    ? APPOINTMENTS.filter(
        (a) =>
          a.patientName.toLowerCase().includes(q) ||
          a.doctorName.toLowerCase().includes(q) ||
          a.type.toLowerCase().includes(q)
      ).slice(0, 2)
    : []

  const platformTopics = [
    { id: 'services-section', topic: 'services', label: t('services') || 'Healthcare Services', icon: Activity, keywords: ['service', 'services', 'semen', 'analysis', 'thermal', 'heat', 'testosterone', 'consultation'] },
    { id: 'about-section', topic: 'about', label: t('aboutUs') || 'About Reprogenix AI', icon: Info, keywords: ['about', 'mission', 'andrologist', 'who', 'pii', 'privacy', 'board', 'team'] },
    { id: 'working-section', topic: 'working', label: t('howItWorks') || 'How It Works (72-Day Cycle)', icon: Layers, keywords: ['work', 'working', 'how', '72', 'spermatogenesis', 'step', 'cycle', 'regenerative'] },
    { id: 'triage-section', topic: 'working', label: t('clinicalGuardrails') || 'Safe 5-Tier Triage', icon: ShieldAlert, keywords: ['triage', 'tier', 'safe', 'emergency', 'referral', 'scrotal', 'guardrail'] },
    { id: 'faqs-section', topic: 'faqs', label: t('faqs') || 'Frequently Asked Questions', icon: BookOpen, keywords: ['faq', 'faqs', 'question', 'questions', 'answer', 'help', 'who 6th'] },
    { id: 'help-section', topic: 'help', label: t('helpSupport') || 'Help, Emergency & Support', icon: HelpCircle, keywords: ['help', 'support', 'emergency', 'acute', 'phone', 'call', 'hotline', 'contact', 'email'] }
  ]

  const matchingTopics = q
    ? platformTopics.filter(
        (pt) =>
          pt.label.toLowerCase().includes(q) ||
          pt.keywords.some((k) => k.includes(q))
      ).slice(0, 3)
    : []

  const totalMatches =
    matchingPatients.length +
    matchingDoctors.length +
    matchingAppointments.length +
    matchingTopics.length

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-[1520px] mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-3 relative overflow-visible">
        {/* Brand Section */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div
            onClick={() => onSelectRole('public')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#08283a] via-[#087e78] to-[#0c9d91] flex items-center justify-center text-white shadow-md shadow-[#0c9d91]/20 group-hover:scale-105 transition-transform">
              <Activity size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-[#08283a] group-hover:text-[#0c9d91] transition-colors">
                  Reprogenix
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#dff5f1] text-[#087e78]">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 tracking-wide hidden sm:block">
                Clinical Health Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Global Search Bar with Live Interactive Results Dropdown */}
        <div className="flex-none max-w-[150px] mr-2 hidden md:block relative" ref={searchRef}>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value)
                setShowSearchDropdown(true)
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder={t('searchPlaceholder')}
              className="w-full h-9 pl-9 pr-8 text-xs bg-slate-100/70 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-[#0c9d91]/50 focus:ring-2 focus:ring-[#0c9d91]/20 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  onSearchChange('')
                  setShowSearchDropdown(false)
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-md"
                title={t('clearSearch') || 'Clear search'}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Interactive Search Results Dropdown */}
          {showSearchDropdown && q.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 z-50 max-h-[420px] overflow-y-auto animate-in fade-in zoom-in-95 duration-100 text-xs">
              <div className="flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-slate-400 border-b border-slate-100 mb-1">
                <span>{t('searchResultsFor')}: "{searchQuery}"</span>
                <span>{totalMatches} {t('searchMatchesCount') || 'matches'}</span>
              </div>

              {totalMatches === 0 ? (
                <div className="p-4 text-center text-slate-400 text-xs">
                  {t('noSearchResults') || 'No matching records found'}
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Matching Platform Knowledge & Sections */}
                  {matchingTopics.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-[#087e78]">
                        {t('searchTopicsTitle') || 'Platform Sections & Knowledge'}
                      </div>
                      {matchingTopics.map((pt) => {
                        const Icon = pt.icon
                        return (
                          <div
                            key={pt.id}
                            onClick={() => {
                              setShowSearchDropdown(false)
                              handleScrollToSection(pt.id, pt.topic)
                            }}
                            className="flex items-center justify-between px-2.5 py-1.5 hover:bg-[#dff5f1]/60 rounded-xl cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Icon size={14} className="text-[#0c9d91]" />
                              <span className="font-bold text-slate-800">{pt.label}</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#087e78]">Jump to →</span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Matching Patients */}
                  {matchingPatients.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {t('searchPatientsTitle') || 'Patients'}
                      </div>
                      {matchingPatients.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            setShowSearchDropdown(false)
                            onSelectRole('doctor')
                            if (onNotificationClick) {
                              onNotificationClick({ type: 'patient' })
                            }
                          }}
                          className="flex items-center justify-between px-2.5 py-1.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 font-bold text-[10px] flex items-center justify-center">
                              {p.avatar || 'PT'}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800">{p.nameKey ? (t(p.nameKey) || p.name) : p.name}</div>
                              <div className="text-[10px] text-slate-400">{p.mrn} • {p.concernKey ? (t(p.concernKey) || p.primaryConcern) : p.primaryConcern}</div>
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            p.riskLevel.includes('High') ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {p.riskLevel.includes('High') ? (t('highRisk') || p.riskLevel) : p.riskLevel.includes('Moderate') ? (t('moderateRisk') || p.riskLevel) : (t('lowRisk') || p.riskLevel)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Matching Doctors */}
                  {matchingDoctors.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {t('searchDoctorsTitle') || 'Doctors'}
                      </div>
                      {matchingDoctors.map((d) => (
                        <div
                          key={d.id}
                          onClick={() => {
                            setShowSearchDropdown(false)
                            onSelectRole('doctor')
                          }}
                          className="flex items-center justify-between px-2.5 py-1.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-[#087e78] text-white font-bold text-[10px] flex items-center justify-center">
                              {d.name.replace(/Dr\.\s*/i, '').slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800">{d.nameKey ? (t(d.nameKey) || d.name) : d.name}</div>
                              <div className="text-[10px] text-slate-400">{d.specialtyKey ? (t(d.specialtyKey) || d.specialty) : d.specialty}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                            {d.status === 'Available' ? (t('available') || d.status) : d.status === 'In Surgery' ? (t('inSurgery') || d.status) : d.status === 'On Leave' ? (t('onLeave') || d.status) : d.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Matching Appointments */}
                  {matchingAppointments.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {t('searchAppointmentsTitle') || 'Appointments'}
                      </div>
                      {matchingAppointments.map((a) => (
                        <div
                          key={a.id}
                          onClick={() => {
                            setShowSearchDropdown(false)
                            onSelectRole('doctor')
                          }}
                          className="flex items-center justify-between px-2.5 py-1.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                        >
                          <div>
                            <div className="font-bold text-slate-800">{a.patientName}</div>
                            <div className="text-[10px] text-slate-400">{a.date} • {a.time} • {a.type}</div>
                          </div>
                          <span className="text-[10px] font-bold text-[#0c9d91]">
                            {a.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Role Pill Switcher (Public, Doctor, Patient) */}
        <div className="flex items-center bg-slate-100/80 p-0.5 rounded-2xl border border-slate-200/60 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onSelectRole('public')}
            className={`flex items-center gap-1.5 px-3 h-8 rounded-xl transition-all ${
              activeRole === 'public'
                ? 'bg-white text-[#08283a] shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe size={13} className={activeRole === 'public' ? 'text-[#0c9d91]' : 'text-slate-400'} />
            <span className="hidden lg:inline">{t('clinicalPortalOverview') || 'Clinical Portal'}</span>
            <span className="lg:hidden">Portal</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectRole('doctor')}
            className={`flex items-center gap-1.5 px-3 h-8 rounded-xl transition-all ${
              activeRole === 'doctor'
                ? 'bg-[#087e78] text-white shadow-xs font-bold shadow-[#087e78]/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope size={13} />
            <span className="hidden lg:inline">{t('doctorDashboard')}</span>
            <span className="lg:hidden">Doctor</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectRole('patient')}
            className={`flex items-center gap-1.5 px-3 h-8 rounded-xl transition-all ${
              activeRole === 'patient'
                ? 'bg-[#08283a] text-white shadow-xs font-bold shadow-[#08283a]/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User size={13} />
            <span className="hidden lg:inline">{t('patientDashboard')}</span>
            <span className="lg:hidden">Patient</span>
          </button>
        </div>

        {/* Action Controls & User Meta */}
        <div className="flex items-center gap-2">
          {/* Platform Explore Dropdown (Services, About, How It Works, Triage, FAQs, Help, Privacy) */}
          <div className="relative" ref={exploreRef}>
            <button
              type="button"
              onClick={() => setShowExploreMenu(!showExploreMenu)}
              className="flex items-center gap-1 px-2.5 sm:px-3 h-9 text-xs font-bold text-slate-700 hover:text-[#08283a] bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-colors shadow-2xs"
            >
              <Globe size={14} className="text-[#0c9d91]" />
              <span className="hidden sm:inline">{t('exploreMenu') || 'Explore'}</span>
              <ChevronDown size={13} className={`text-slate-400 transition-transform ${showExploreMenu ? 'rotate-180' : ''}`} />
            </button>

            {showExploreMenu && (
              <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
                {/* 1. Services */}
                <button
                  type="button"
                  onClick={() => {
                    setShowExploreMenu(false)
                    handleScrollToSection('services-section', 'services')
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-[#dff5f1]/60 hover:text-[#087e78] font-semibold text-left transition-colors"
                >
                  <Activity size={15} className="text-[#0c9d91]" />
                  <span>{t('services') || 'Healthcare Services'}</span>
                </button>

                {/* 2. About Us */}
                <button
                  type="button"
                  onClick={() => {
                    setShowExploreMenu(false)
                    handleScrollToSection('about-section', 'about')
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-[#dff5f1]/60 hover:text-[#087e78] font-semibold text-left transition-colors"
                >
                  <Info size={15} className="text-[#087e78]" />
                  <span>{t('aboutUs') || 'About Reprogenix AI'}</span>
                </button>

                {/* 3. How It Works */}
                <button
                  type="button"
                  onClick={() => {
                    setShowExploreMenu(false)
                    handleScrollToSection('working-section', 'working')
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-[#dff5f1]/60 hover:text-[#087e78] font-semibold text-left transition-colors"
                >
                  <Layers size={15} className="text-emerald-600" />
                  <span>{t('howItWorks') || 'How It Works (72-Day)'}</span>
                </button>

                {/* 4. Safe 5-Tier Triage */}
                <button
                  type="button"
                  onClick={() => {
                    setShowExploreMenu(false)
                    handleScrollToSection('triage-section', 'working')
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-[#dff5f1]/60 hover:text-[#087e78] font-semibold text-left transition-colors"
                >
                  <ShieldAlert size={15} className="text-rose-600" />
                  <span>{t('clinicalGuardrails') || 'Safe 5-Tier Triage'}</span>
                </button>

                {/* 5. FAQs */}
                <button
                  type="button"
                  onClick={() => {
                    setShowExploreMenu(false)
                    handleScrollToSection('faqs-section', 'faqs')
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-[#dff5f1]/60 hover:text-[#087e78] font-semibold text-left transition-colors"
                >
                  <BookOpen size={15} className="text-blue-600" />
                  <span>{t('faqs') || 'FAQs'}</span>
                </button>

                {/* 6. Help & Support */}
                <button
                  type="button"
                  onClick={() => {
                    setShowExploreMenu(false)
                    handleScrollToSection('help-section', 'help')
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-[#dff5f1]/60 hover:text-[#087e78] font-semibold text-left transition-colors"
                >
                  <HelpCircle size={15} className="text-amber-600" />
                  <span>{t('helpSupport') || 'Help & Support'}</span>
                </button>

                {/* 7. Privacy & Security */}
                <button
                  type="button"
                  onClick={() => {
                    setShowExploreMenu(false)
                    if (onOpenPublicInfo) onOpenPublicInfo('privacy')
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-[#dff5f1]/60 hover:text-[#087e78] font-semibold text-left transition-colors"
                >
                  <ShieldCheck size={15} className="text-teal-600" />
                  <span>{t('privacyCompliance') || 'Privacy & Security'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Today Button/Date */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 h-9 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/70 rounded-xl whitespace-normal">
            <Calendar size={13} className="text-[#0c9d91]" />
            <span>
              {t('today')}: {todayFormatted}
            </span>
          </div>

          {/* Generate Report Button */}
          <button
            type="button"
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3.5 h-9 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] active:scale-95 rounded-xl shadow-xs shadow-[#0c9d91]/25 transition-all duration-150"
          >
            <FileSpreadsheet size={14} />
            <span className="hidden sm:inline">{t('generateReport')}</span>
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={bellRef}>
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-xs"
              title="Notifications"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0c9d91] text-[10px] font-bold text-white flex items-center justify-center border-2 border-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <NotificationFlyout
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
              notifications={notifications}
              onMarkAllRead={onMarkAllRead}
              onNotificationClick={(item) => {
                setShowNotifications(false)
                if (onNotificationClick) onNotificationClick(item)
              }}
              t={t}
            />
          </div>

          {/* Language Selector */}
          <LanguageSelector currentLang={currentLang} onSelectLang={onSelectLang} />

          {/* Auth Controls & User Profile / Logout */}
          <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200/80">
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs text-white shadow-xs ${
                    currentUser.role === 'doctor'
                      ? 'bg-[#087e78] ring-2 ring-[#0c9d91]/30'
                      : 'bg-[#08283a] ring-2 ring-[#08283a]/30'
                  }`}
                  title={`${currentUser.name} (${currentUser.role})`}
                >
                  {currentUser.role === 'doctor' ? 'SJ' : 'MV'}
                </div>

                <div className="hidden 2xl:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#08283a] leading-tight truncate max-w-[130px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-slate-400 capitalize leading-tight">
                    {currentUser.role}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onLogout}
                  className="flex items-center gap-1 px-2.5 h-9 text-xs font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200/80 transition-colors shadow-2xs"
                  title="Log out of session"
                >
                  <LogOut size={13} />
                  <span className="hidden sm:inline">{t('logOut')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onOpenAuthModal && onOpenAuthModal('signin')}
                  className="flex items-center gap-1.5 px-3 h-9 text-xs font-bold text-[#08283a] bg-slate-100 hover:bg-slate-200 border border-slate-200/90 active:scale-95 rounded-xl transition-all shadow-2xs"
                  title="Sign In to existing account"
                >
                  <LogIn size={13} className="text-[#087e78]" />
                  <span>{t('signIn') || 'Sign In'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAuthModal && onOpenAuthModal('signup')}
                  className="flex items-center gap-1.5 px-3.5 h-9 text-xs font-bold text-white bg-gradient-to-r from-[#0c9d91] to-[#087e78] hover:from-[#087e78] hover:to-[#0c9d91] active:scale-95 rounded-xl transition-all shadow-xs shadow-[#0c9d91]/25"
                  title="Register new doctor or patient account"
                >
                  <UserPlus size={13} />
                  <span>{t('signUp') || 'Register'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

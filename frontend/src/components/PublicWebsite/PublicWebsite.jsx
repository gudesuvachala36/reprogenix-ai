import { useState } from 'react'
import {
  Activity,
  Stethoscope,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Clock,
  Heart,
  Globe,
  FileSpreadsheet,
  Calendar,
  Lock,
  Layers,
  Award,
  LogIn,
  UserPlus,
  HelpCircle,
  BookOpen,
  Info,
  Flame,
  PhoneCall,
  Mail,
  Building2,
  AlertTriangle,
  ChevronDown,
  HeartPulse,
  RotateCw,
  Search
} from 'lucide-react'
import QuickAssessmentModal from './QuickAssessmentModal'

export default function PublicWebsite({
  onLaunchDoctor,
  onLaunchPatient,
  onOpenAuthModal,
  onOpenPublicInfo,
  searchQuery = '',
  currentLang = 'en',
  t = (k) => k
}) {
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)
  const [activeHoverSeg, setActiveHoverSeg] = useState(null)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const handleScrollTo = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      el.classList.add('ring-4', 'ring-[#0c9d91]/30', 'rounded-3xl', 'transition-all')
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-[#0c9d91]/30')
      }, 2000)
    }
  }

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') }
  ]

  return (
    <div className="space-y-16 py-6 pb-20">
      {/* 1. Hero Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 sm:pt-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dff5f1] border border-[#0c9d91]/30 text-[#087e78] text-xs font-bold tracking-wide shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#0c9d91] animate-pulse" />
          <span>{t('tagline')}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#08283a] tracking-tight max-w-4xl mx-auto leading-[1.12]">
          {t('heroTitle')}
        </h1>

        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          {t('heroSubtitle')}
        </p>

        {/* Hero Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onLaunchDoctor}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-[#087e78] hover:bg-[#0c9d91] active:scale-95 rounded-2xl shadow-lg shadow-[#087e78]/25 transition-all"
          >
            <Stethoscope size={16} />
            <span>{t('exploreDoctor')}</span>
          </button>

          <button
            type="button"
            onClick={onLaunchPatient}
            style={{ color: '#ffffff', backgroundColor: '#08283a' }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-[#08283a] hover:bg-[#061f30] active:scale-95 rounded-2xl shadow-lg shadow-[#08283a]/25 transition-all"
          >
            <User size={16} />
            <span>{t('explorePatient')}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAssessmentModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 active:scale-95 border border-slate-200/80 rounded-2xl shadow-sm transition-all"
          >
            <Sparkles size={16} className="text-[#0c9d91]" />
            <span>{t('startFreeScreening')}</span>
          </button>
        </div>

        {/* Registration Options Strip */}
        <div className="flex items-center justify-center gap-4 text-xs font-bold pt-2">
          <button
            type="button"
            onClick={() => onOpenAuthModal && onOpenAuthModal('signup')}
            className="inline-flex items-center gap-1.5 text-[#087e78] hover:text-[#0c9d91] underline"
          >
            <UserPlus size={14} />
            <span>{t('newUserPrompt') || 'New user? Create a Patient or Clinician Account'}</span>
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenAuthModal && onOpenAuthModal('signin')}
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
          >
            <LogIn size={14} />
            <span>{t('signIn') || 'Sign In'}</span>
          </button>
        </div>

        {/* Clinical Trust Strip */}
        <div className="pt-6 border-t border-slate-200/80 max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold text-slate-400 flex items-center justify-center gap-2 flex-wrap">
            <ShieldCheck size={14} className="text-[#0c9d91]" />
            <span>{t('trustNotice')}</span>
          </p>
        </div>
      </section>

      {/* 2. Platform Directory Navigation Bar (Cleanly separating About, Services, Working, Triage, Evidence, Help, FAQs with Icons) */}
      <section id="directory-bar" className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#087e78] flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#0c9d91]" />
              {t('platformDirectoryTitle') || 'Platform Directory & Clinical Segregation'}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
              {t('platformDirectorySub') || 'Click or hover to explore specific modules'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* 1. Services */}
            <div
              onMouseEnter={() => setActiveHoverSeg('services')}
              onMouseLeave={() => setActiveHoverSeg(null)}
              onClick={() => handleScrollTo('services-section')}
              className="p-3.5 rounded-2xl border border-slate-200/70 hover:border-[#0c9d91] bg-slate-50/70 hover:bg-[#dff5f1]/40 cursor-pointer transition-all group relative"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#087e78] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Activity size={17} />
              </div>
              <div className="text-xs font-black text-[#08283a] group-hover:text-[#087e78]">
                {t('services') || 'Healthcare Services'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{t('semenAnalysisCare') || 'Semen Analysis & Care'}</div>
            </div>

            {/* 2. About Us */}
            <div
              onMouseEnter={() => setActiveHoverSeg('about')}
              onMouseLeave={() => setActiveHoverSeg(null)}
              onClick={() => handleScrollTo('about-section')}
              className="p-3.5 rounded-2xl border border-slate-200/70 hover:border-[#0c9d91] bg-slate-50/70 hover:bg-[#dff5f1]/40 cursor-pointer transition-all group relative"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Info size={17} />
              </div>
              <div className="text-xs font-black text-[#08283a] group-hover:text-[#087e78]">
                {t('aboutUs') || 'About Reprogenix'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{t('missionAndrologists') || 'Mission & Andrologists'}</div>
            </div>

            {/* 3. Working / How It Works */}
            <div
              onMouseEnter={() => setActiveHoverSeg('work')}
              onMouseLeave={() => setActiveHoverSeg(null)}
              onClick={() => handleScrollTo('working-section')}
              className="p-3.5 rounded-2xl border border-slate-200/70 hover:border-[#0c9d91] bg-slate-50/70 hover:bg-[#dff5f1]/40 cursor-pointer transition-all group relative"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Layers size={17} />
              </div>
              <div className="text-xs font-black text-[#08283a] group-hover:text-[#087e78]">
                {t('howItWorks') || 'How It Works'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{t('seventyTwoDaySpermatogenesis') || '72-Day Spermatogenesis'}</div>
            </div>

            {/* 4. Safe 5-Tier Triage */}
            <div
              onMouseEnter={() => setActiveHoverSeg('triage')}
              onMouseLeave={() => setActiveHoverSeg(null)}
              onClick={() => handleScrollTo('triage-section')}
              className="p-3.5 rounded-2xl border border-slate-200/70 hover:border-[#0c9d91] bg-slate-50/70 hover:bg-[#dff5f1]/40 cursor-pointer transition-all group relative"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <ShieldCheck size={17} />
              </div>
              <div className="text-xs font-black text-[#08283a] group-hover:text-[#087e78]">
                {t('clinicalGuardrails') || '5-Tier Safe Triage'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{t('emergencyToWellness') || 'Emergency to Wellness'}</div>
            </div>

            {/* 5. Frequently Asked Questions (FAQs) */}
            <div
              onMouseEnter={() => setActiveHoverSeg('faqs')}
              onMouseLeave={() => setActiveHoverSeg(null)}
              onClick={() => handleScrollTo('faqs-section')}
              className="p-3.5 rounded-2xl border border-slate-200/70 hover:border-[#0c9d91] bg-slate-50/70 hover:bg-[#dff5f1]/40 cursor-pointer transition-all group relative"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <BookOpen size={17} />
              </div>
              <div className="text-xs font-black text-[#08283a] group-hover:text-[#087e78]">
                {t('faqs') || 'FAQs'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{t('clinicalQuestions') || 'Clinical Questions'}</div>
            </div>

            {/* 6. Help & Support */}
            <div
              onMouseEnter={() => setActiveHoverSeg('help')}
              onMouseLeave={() => setActiveHoverSeg(null)}
              onClick={() => handleScrollTo('help-section')}
              className="p-3.5 rounded-2xl border border-slate-200/70 hover:border-[#0c9d91] bg-slate-50/70 hover:bg-[#dff5f1]/40 cursor-pointer transition-all group relative"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <HelpCircle size={17} />
              </div>
              <div className="text-xs font-black text-[#08283a] group-hover:text-[#087e78]">
                {t('helpSupport') || 'Help & Support'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{t('careLine') || '24/7 Care & Helpline'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Section (Separated with Rich Features & Icons) */}
      <section id="about-section" className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#087e78] flex items-center justify-center gap-1.5">
              <Info size={15} />
              {t('aboutUs') || 'About Reprogenix AI'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08283a] tracking-tight">
{t('aboutPioneeringTitle') || 'Pioneering Explainable AI for Male Reproductive Health'}
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
{t('aboutPioneeringDesc') || 'Founded by board-certified andrologists and clinical AI engineers to transform reactive infertility workups into confidential, early, and evidence-grounded screening.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#dff5f1] text-[#087e78] flex items-center justify-center">
                <Stethoscope size={20} />
              </div>
              <h3 className="font-extrabold text-[#08283a] text-sm">{t('aboutBoardTitle') || 'Board of Andrologists'}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
{t('aboutBoardDesc') || 'Supervised by specialists in male reproductive urology, microsurgical varicocelectomy, and endocrine optimization.'}
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-extrabold text-[#08283a] text-sm">{t('aboutZeroPIITitle') || 'Zero Persistent PII'}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
{t('aboutZeroPIIDesc') || 'All data is computed ephemerally in volatile RAM and destroyed upon session exit, strictly HIPAA & GDPR Article 9 compliant.'}
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <h3 className="font-extrabold text-[#08283a] text-sm">{t('aboutWHOTitle') || 'WHO 6th Ed Benchmark'}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
{t('aboutWHODesc') || 'Benchmarked against the 2021 WHO Manual 5th percentile thresholds (Conc ≥16 M/mL, Motility ≥30%, Morphology ≥4%).'}
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <HeartPulse size={20} />
              </div>
              <h3 className="font-extrabold text-[#08283a] text-sm">{t('aboutFaithTitle') || 'Faith & Cultural Respect'}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
{t('aboutFaithDesc') || 'Supports non-spermicidal perforated Silastic collection sheaths during marital intercourse for faith-conscious semen collection.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Healthcare Services Section (Separated with Rich Features & Icons) */}
      <section id="services-section" className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#087e78] flex items-center justify-center gap-1.5">
            <Activity size={15} />
            {t('clinicalScope')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08283a] tracking-tight mt-1">
            {t('servicesTitle')}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t('servicesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Service 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0c9d91]/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#dff5f1] text-[#087e78] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Activity size={24} />
              </div>
              <h3 className="font-extrabold text-[#08283a] text-base mb-2">
                {t('service1Title')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('service1Desc')}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#0c9d91] flex items-center gap-1">
              <span>{t('serviceLink1') || 'AUA & EAU Guidelines'}</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0c9d91]/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#087e78] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <FileSpreadsheet size={24} />
              </div>
              <h3 className="font-extrabold text-[#08283a] text-base mb-2">
                {t('service2Title')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('service2Desc')}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#087e78] flex items-center gap-1">
              <span>{t('serviceLink2') || '5th Percentile Reference'}</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0c9d91]/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Stethoscope size={24} />
              </div>
              <h3 className="font-extrabold text-[#08283a] text-base mb-2">
                {t('service3Title')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('service3Desc')}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-blue-700 flex items-center gap-1">
              <span>{t('serviceLink3') || 'Faith-Conscious Protocols'}</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* Service 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0c9d91]/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Clock size={24} />
              </div>
              <h3 className="font-extrabold text-[#08283a] text-base mb-2">
                {t('service4Title')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('service4Desc')}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-purple-700 flex items-center gap-1">
              <span>{t('serviceLink4') || '72-Day Biological Cycle'}</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* Service 5 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0c9d91]/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Flame size={24} />
              </div>
              <h3 className="font-extrabold text-[#08283a] text-base mb-2">
                {t('service5Title') || 'Thermal Stress & Scrotal Defense'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('service5Desc') || 'Continuous thermoregulation tracking to detect and avoid hyperthermic laptop and sedentary stress on developing spermatocytes.'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-700 flex items-center gap-1">
              <span>{t('serviceLink5') || 'Target <34.5°C Scrotal Temp'}</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* Service 6 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0c9d91]/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <HeartPulse size={24} />
              </div>
              <h3 className="font-extrabold text-[#08283a] text-base mb-2">
                {t('service6Title') || 'Couple Subfertility Parallel Assessment'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('service6Desc') || 'Synchronized dual-partner intake preventing the female partner from undergoing invasive testing before male semen parameters are ruled out.'}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-rose-700 flex items-center gap-1">
              <span>{t('serviceLink6') || 'Parallel Couple Evaluation'}</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Working / How It Works Section (Separated with 4 Sequential Steps & Icons) */}
      <section id="working-section" className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-slate-900 via-[#08283a] to-[#087e78] rounded-3xl p-6 sm:p-10 text-white space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#61d6c3] flex items-center justify-center gap-1.5">
              <Layers size={15} />
              {t('howItWorks') || 'How It Works'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t('workingTitle')}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('workingSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-teal-500/30 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-[#0c9d91] text-white flex items-center justify-center font-black text-sm shadow-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-white">{t('step1Title')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t('step1Desc')}</p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-teal-500/30 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-[#087e78] text-white flex items-center justify-center font-black text-sm shadow-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-white">{t('step2Title')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t('step2Desc')}</p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-teal-500/30 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-white">{t('step3Title')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t('step3Desc')}</p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-teal-500/30 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow-sm">
                4
              </div>
              <h3 className="font-bold text-sm text-white">{t('step4Title')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t('step4Desc')}</p>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setIsAssessmentModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0c9d91] hover:bg-[#087e78] text-white font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95"
            >
              <Sparkles size={15} />
              <span>{t('startFreeScreening') || 'Try 2-Minute AI Screening'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. Safe 5-Tier Clinical Triage Architecture */}
      <section id="triage-section" className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-[#08283a] rounded-3xl p-6 sm:p-10 text-white space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#61d6c3] flex items-center justify-center gap-1.5">
              <ShieldCheck size={15} />
              {t('clinicalGuardrails') || 'Clinical Guardrails & Triage'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t('safeTriageArchitecture') || 'Safe 5-Tier Clinical Referral Architecture'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('triageArchitectureSub') || 'Designed to distinguish screening from diagnosis; acute emergencies bypass scoring completely.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-rose-500/40">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-rose-400 tracking-wider">
                  Tier 0
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              </div>
              <h4 className="text-sm font-bold text-white mt-1">{t('tier0Title') || 'Emergency Scrotal'}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                {t('tier0Desc') || 'Acute testicular torsion or trauma. Bypasses scoring for immediate ED.'}
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-orange-500/40">
              <span className="text-[10px] font-black uppercase text-orange-400 tracking-wider">
                Tier 1
              </span>
              <h4 className="text-sm font-bold text-white mt-1">{t('tier1Title') || 'Specialist Andrology'}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                {t('tier1Desc') || 'Palpable Grade II/III varicocele, severe oligozoospermia, HPTA shutdown.'}
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-amber-500/40">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                Tier 2
              </span>
              <h4 className="text-sm font-bold text-white mt-1">{t('tier2Title') || 'Primary Care Review'}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                {t('tier2Desc') || 'Sedentary heat, borderline motility, metabolic flags. 72-day modifiable.'}
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-blue-500/40">
              <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">
                Tier 3
              </span>
              <h4 className="text-sm font-bold text-white mt-1">{t('tier3Title') || 'Couple Subfertility'}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                {t('tier3Desc') || 'TTC >12 months, parallel dual-partner evaluation, faith-conscious options.'}
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-emerald-500/40">
              <span className="text-[10px] font-black uppercase text-[#61d6c3] tracking-wider">
                Tier 4
              </span>
              <h4 className="text-sm font-bold text-white mt-1">{t('tier4Title') || 'Preventive Self-Care'}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                {t('tier4Desc') || 'Normozoospermic parameters, optimal testosterone, proactive health tracking.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Population Evidence & Quantified Clinical Impact */}
      <section id="evidence-section" className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-[#dff5f1]/60 border border-emerald-200/80 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#087e78] flex items-center justify-center gap-1.5">
              <Award size={15} />
              {t('popEvidence') || 'Population Health Evidence'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08283a] tracking-tight">
              {t('popEvidenceTitle') || 'Validated on N=1,250 Synthetic Patient Cases'}
            </h2>
            <p className="text-xs text-slate-600">
              {t('popEvidenceSub') || 'Dual-blinded evaluation measuring diagnostic turnaround, cost avoidance, and ethnic fairness.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-5 rounded-2xl border border-emerald-200/60 shadow-xs text-center">
              <div className="text-3xl font-black text-[#0c9d91]">87.5%</div>
              <div className="text-xs font-bold text-[#08283a] mt-1">
                {t('diagnosticDelayReduction') || 'Diagnostic Delay Reduction'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {t('diagnosticDelaySavedDesc') || 'From 18.4 months traditional wait time down to 2.3 weeks with Reprogenix AI.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200/60 shadow-xs text-center">
              <div className="text-3xl font-black text-[#0c9d91]">41.8%</div>
              <div className="text-xs font-bold text-[#08283a] mt-1">
                {t('unnecessaryVisitsAvoided') || 'Unnecessary Visits Avoided'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {t('unnecessaryVisitsDesc') || 'Low-risk patients guided to lifestyle care, preserving specialist capacity.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200/60 shadow-xs text-center">
              <div className="text-3xl font-black text-[#0c9d91]">0.97</div>
              <div className="text-xs font-bold text-[#08283a] mt-1">
                {t('demographicFairness') || 'Demographic Fairness Parity'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {t('demographicFairnessDesc') || 'Four-fifths rule satisfied across racial and socioeconomic cohorts.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions (FAQs) Section (Separated & Expandable) */}
      <section id="faqs-section" className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#087e78] flex items-center justify-center gap-1.5">
              <BookOpen size={15} />
              {t('faqs') || 'Frequently Asked Questions'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08283a] tracking-tight">
              {t('frequentlyAskedQuestions') || 'Frequently Asked Questions'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Everything you need to know about 72-day spermatogenesis, semen analysis, and clinical AI accuracy.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/40 hover:border-[#0c9d91]/50 transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 text-xs sm:text-sm hover:bg-white transition-colors"
                >
                  <span className="pr-3 leading-snug">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 flex-shrink-0 transition-transform ${openFaqIndex === idx ? 'rotate-180 text-[#0c9d91]' : ''}`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 pt-1 bg-white border-t border-slate-100 text-slate-600 text-xs leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Help & Support Section (Separated with Features & Icons) */}
      <section id="help-section" className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#087e78] flex items-center justify-center gap-1.5">
              <HelpCircle size={15} />
              {t('helpSupport') || 'Help & Support'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08283a] tracking-tight">
              {t('helpSupportTitle')}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {t('helpSupportSubtitle')}
            </p>
          </div>

          {/* Emergency Warning Card */}
          <div className="p-4 sm:p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-950 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-600 text-white flex-shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-rose-900 mb-1">
                {t('emergencyGuidanceTitle')}
              </h4>
              <p className="text-xs leading-relaxed text-rose-800">
                {t('emergencyGuidanceDesc')}
              </p>
            </div>
          </div>

          {/* Contact Support Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#dff5f1] text-[#087e78] flex items-center justify-center">
                <Mail size={18} />
              </div>
              <h3 className="font-bold text-[#08283a] text-sm">{t('clinicalHelpDesk')}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t('clinicalHelpDeskDesc')}</p>
              <div className="pt-1 font-mono text-xs text-[#087e78] font-bold">
                support@reprogenix.health
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <PhoneCall size={18} />
              </div>
              <h3 className="font-bold text-[#08283a] text-sm">{t('teleAndrologyHelpline')}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t('teleAndrologyHelplineDesc')}</p>
              <div className="pt-1 font-mono text-xs text-[#087e78] font-bold">
                +1 (800) 492-MALE
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Building2 size={18} />
              </div>
              <h3 className="font-bold text-[#08283a] text-sm">{t('hospitalReferrals')}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t('hospitalReferralsDesc')}</p>
              <div className="pt-1 text-xs text-blue-700 font-bold">
                Accredited Urology Centers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Call to Action Banner */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-tr from-[#08283a] via-[#061f30] to-[#087e78] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight max-w-xl mx-auto">
            {t('readyToExplore') || 'Ready to Explore the Reprogenix AI Platform?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto">
            {t('readyToExploreSub') || 'Switch between the Doctor Dashboard for clinical management or the Patient Portal for personalized care and progress tracking.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onLaunchDoctor}
              className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] rounded-2xl shadow-lg shadow-[#0c9d91]/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Stethoscope size={15} />
              <span>{t('enterDoctor') || 'Enter Doctor Dashboard'}</span>
            </button>
            <button
              type="button"
              onClick={onLaunchPatient}
              style={{ color: '#08283a', backgroundColor: '#ffffff' }}
              className="w-full sm:w-auto px-7 py-3.5 text-xs font-black !text-[#08283a] bg-white hover:bg-[#dff5f1] hover:!text-[#087e78] border-2 border-slate-200 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <User size={15} className="!text-[#087e78]" />
              <span className="!text-[#08283a] font-extrabold">{t('enterPatient') || 'Enter Patient Portal'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Screener Modal */}
      <QuickAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        onFinish={onLaunchPatient}
        t={t}
      />
    </div>
  )
}

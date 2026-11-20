import { useState, useEffect } from 'react'
import {
  X,
  ShieldCheck,
  HeartPulse,
  HelpCircle,
  FileText,
  Activity,
  Stethoscope,
  PhoneCall,
  Mail,
  Clock,
  CheckCircle2,
  BookOpen,
  Layers,
  Sparkles,
  Info,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  Building2,
  Users
} from 'lucide-react'

export default function PublicInfoModal({
  isOpen,
  onClose,
  initialTopic = 'about',
  onNavigateToSection,
  t = (k) => k
}) {
  const [activeTab, setActiveTab] = useState(initialTopic)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  useEffect(() => {
    if (initialTopic) {
      setActiveTab(initialTopic)
    }
  }, [initialTopic])

  if (!isOpen) return null

  const tabs = [
    { id: 'about', label: t('aboutUs') || 'About Us', icon: Info },
    { id: 'services', label: t('services') || 'Services', icon: Activity },
    { id: 'working', label: t('howItWorks') || 'How It Works', icon: Layers },
    { id: 'faqs', label: t('faqs') || 'FAQs', icon: BookOpen },
    { id: 'help', label: t('helpSupport') || 'Help & Support', icon: HelpCircle },
    { id: 'privacy', label: t('privacyCompliance') || 'Privacy', icon: ShieldCheck }
  ]

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') }
  ]

  const handleGoToSection = (sectionId) => {
    onClose()
    if (onNavigateToSection) {
      onNavigateToSection(sectionId)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto text-slate-800">
        {/* Top Modal Header */}
        <div className="bg-gradient-to-r from-[#08283a] via-[#061f30] to-[#087e78] p-5 sm:p-6 text-white flex items-start justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0c9d91] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#61d6c3]">
                {t('brand') || 'Reprogenix AI'} • {t('platformDirectoryTitle') || 'Platform Explorer'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {t('tagline') || 'Preventive Male Reproductive Health & Clinical AI Screening'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher Strip */}
        <div className="flex items-center gap-1 p-2 bg-slate-100/90 border-b border-slate-200 overflow-x-auto flex-shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#087e78] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-[#0c9d91]' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs leading-relaxed flex-1">
          {/* 1. About Us */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#dff5f1]/60 rounded-2xl border border-[#0c9d91]/30">
                <h3 className="font-extrabold text-[#08283a] text-sm mb-1">{t('modalAboutMissionTitle') || 'Our Clinical Mission'}</h3>
                <p className="text-slate-700">
                  {t('modalAboutMissionDesc') || 'Reprogenix AI transforms reactive, stigmatized infertility workups into early, proactive, and confidential clinical intelligence.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2 font-bold text-[#08283a] mb-1">
                    <Stethoscope size={16} className="text-[#087e78]" />
                    <span>{t('modalBoardTitle') || 'Board of Andrologists'}</span>
                  </div>
                  <p className="text-slate-500">
                    {t('modalBoardDesc') || 'Led by board-certified male reproductive urologists specializing in microsurgery, endocrine restoration, and scrotal thermal defense.'}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2 font-bold text-[#08283a] mb-1">
                    <ShieldCheck size={16} className="text-[#087e78]" />
                    <span>{t('modalZeroPIITitle') || 'Zero Persistent PII'}</span>
                  </div>
                  <p className="text-slate-500">
                    {t('modalZeroPIIDesc') || 'Strict volatile RAM computation. No identifying names or health records persisted to disk, fully satisfying HIPAA & GDPR Article 9.'}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2 font-bold text-[#08283a] mb-1">
                    <BookOpen size={16} className="text-[#087e78]" />
                    <span>{t('modalWHOTitle') || 'WHO 6th Edition Grounding'}</span>
                  </div>
                  <p className="text-slate-500">
                    {t('modalWHODesc') || 'Calibrated against global 5th percentile semen parameters from fertile reference cohorts.'}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2 font-bold text-[#08283a] mb-1">
                    <Users size={16} className="text-[#087e78]" />
                    <span>{t('modalDualPartnerTitle') || 'Dual-Partner Consideration'}</span>
                  </div>
                  <p className="text-slate-500">
                    {t('modalDualPartnerDesc') || 'Recognizes that male factor accounts for 50% of couple subfertility, avoiding unilateral delayed testing.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleGoToSection('about-section')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#0c9d91]/40 text-[#087e78] font-bold hover:bg-[#dff5f1]/40 transition-colors"
              >
                <span>{t('goToPortalSection') || 'Go to Portal Section'}</span>
                <ExternalLink size={14} />
              </button>
            </div>
          )}

          {/* 2. Healthcare Services */}
          {activeTab === 'services' && (
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#dff5f1] text-[#087e78] flex items-center justify-center flex-shrink-0">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#08283a] text-sm">{t('service1Title')}</h4>
                  <p className="text-slate-500 mt-1">{t('service1Desc')}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#087e78] flex items-center justify-center flex-shrink-0">
                  <HeartPulse size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#08283a] text-sm">{t('service2Title')}</h4>
                  <p className="text-slate-500 mt-1">{t('service2Desc')}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#08283a] text-sm">{t('service3Title')}</h4>
                  <p className="text-slate-500 mt-1">{t('service3Desc')}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#08283a] text-sm">{t('service4Title')}</h4>
                  <p className="text-slate-500 mt-1">{t('service4Desc')}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleGoToSection('services-section')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#0c9d91]/40 text-[#087e78] font-bold hover:bg-[#dff5f1]/40 transition-colors"
              >
                <span>{t('goToPortalSection') || 'Go to Portal Section'}</span>
                <ExternalLink size={14} />
              </button>
            </div>
          )}

          {/* 3. Working / How It Works */}
          {activeTab === 'working' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#dff5f1]/60 rounded-2xl border border-[#0c9d91]/30">
                <h3 className="font-extrabold text-[#08283a] text-sm mb-1">{t('workingTitle')}</h3>
                <p className="text-slate-700">{t('workingSubtitle')}</p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#08283a] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t('step1Title')}</h4>
                    <p className="text-slate-500 mt-0.5">{t('step1Desc')}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#087e78] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t('step2Title')}</h4>
                    <p className="text-slate-500 mt-0.5">{t('step2Desc')}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0c9d91] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t('step3Title')}</h4>
                    <p className="text-slate-500 mt-0.5">{t('step3Desc')}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t('step4Title')}</h4>
                    <p className="text-slate-500 mt-0.5">{t('step4Desc')}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleGoToSection('working-section')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#0c9d91]/40 text-[#087e78] font-bold hover:bg-[#dff5f1]/40 transition-colors"
              >
                <span>{t('goToPortalSection') || 'Go to Portal Section'}</span>
                <ExternalLink size={14} />
              </button>
            </div>
          )}

          {/* 4. FAQs */}
          {activeTab === 'faqs' && (
            <div className="space-y-3">
              <p className="text-slate-500 font-medium">
                Frequently asked clinical questions regarding semen analysis, 72-day spermatogenesis, and data security:
              </p>

              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs pr-2">{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-4 pt-1 bg-slate-50/70 border-t border-slate-100 text-slate-600 text-xs leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleGoToSection('faqs-section')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#0c9d91]/40 text-[#087e78] font-bold hover:bg-[#dff5f1]/40 transition-colors"
              >
                <span>{t('goToPortalSection') || 'Go to Portal Section'}</span>
                <ExternalLink size={14} />
              </button>
            </div>
          )}

          {/* 5. Help & Support */}
          {activeTab === 'help' && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1">
                  <AlertTriangle size={16} className="text-rose-600" />
                  <span>{t('emergencyGuidanceTitle')}</span>
                </div>
                <p className="text-xs leading-relaxed">{t('emergencyGuidanceDesc')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-bold text-[#08283a] flex items-center gap-2 mb-1">
                    <Mail size={15} className="text-[#087e78]" />
                    <span>{t('clinicalHelpDesk')}</span>
                  </div>
                  <p className="text-slate-500 mb-2">{t('clinicalHelpDeskDesc')}</p>
                  <span className="font-mono text-[#087e78] font-bold">{t("contactComingSoon")} </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-bold text-[#08283a] flex items-center gap-2 mb-1">
                    <PhoneCall size={15} className="text-[#087e78]" />
                    <span>{t('teleAndrologyHelpline')}</span>
                  </div>
                  <p className="text-slate-500 mb-2">{t('teleAndrologyHelplineDesc')}</p>
                  <span className="font-mono text-[#087e78] font-bold">+971 2 XXX XXXX
</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="font-bold text-[#08283a] flex items-center gap-2 mb-1">
                  <Building2 size={15} className="text-[#087e78]" />
                  <span>{t('hospitalReferrals')}</span>
                </div>
                <p className="text-slate-500">{t('hospitalReferralsDesc')}</p>
              </div>

              <button
                type="button"
                onClick={() => handleGoToSection('help-section')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#0c9d91]/40 text-[#087e78] font-bold hover:bg-[#dff5f1]/40 transition-colors"
              >
                <span>{t('goToPortalSection') || 'Go to Portal Section'}</span>
                <ExternalLink size={14} />
              </button>
            </div>
          )}

          {/* 6. Privacy & Compliance */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#dff5f1]/60 rounded-2xl border border-[#0c9d91]/30 text-slate-700">
                <h4 className="font-bold text-xs text-[#087e78] uppercase tracking-wider mb-1">
                  {t('privacyComplianceHeader') || 'Zero-Persistence Architecture'}
                </h4>
                <p>
                  {t('privacyComplianceDesc') || 'Reprogenix AI adheres to the strictest clinical data safeguards. We operate under zero-persistence architecture: your biomarker inputs are analyzed ephemerally in RAM and wiped upon session close.'}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <CheckCircle2 size={16} className="text-[#0c9d91]" />
                  <span>{t('privacyBullet1') || 'No persistent storage of identifying names or medical numbers.'}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <CheckCircle2 size={16} className="text-[#0c9d91]" />
                  <span>{t('privacyBullet2') || 'End-to-end encrypted WebRTC audio & video consultation streams.'}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <CheckCircle2 size={16} className="text-[#0c9d91]" />
                  <span>{t('privacyBullet3') || 'Audit-logged clinical verification by board-certified andrologists.'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <span className="text-[11px] text-slate-400">
            Reprogenix AI • Clinical Health Intelligence
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] rounded-xl transition-colors shadow-xs"
          >
            {t('close') || 'Close'}
          </button>
        </div>
      </div>
    </div>
  )
}

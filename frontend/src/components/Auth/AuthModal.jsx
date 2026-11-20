import { useState, useEffect } from 'react'
import {
  X,
  Stethoscope,
  User,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Building2,
  Award,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  RotateCcw,
  LogIn,
  UserPlus
} from 'lucide-react'
import confetti from 'canvas-confetti'

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'signin', // 'signin' or 'signup'
  onSuccessLogin,
  t
}) {
  const [roleType, setRoleType] = useState('doctor') // 'doctor' or 'patient'
  const [mode, setMode] = useState('signin') // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Doctor Fields
  const [doctorName, setDoctorName] = useState('')
  const [doctorEmail, setDoctorEmail] = useState('')
  const [medicalLicense, setMedicalLicense] = useState('')
  const [specialty, setSpecialty] = useState('Andrology & Male Infertility')
  const [hospital, setHospital] = useState('')

  // Patient Fields
  const [patientName, setPatientName] = useState('')
  const [patientEmail, setPatientEmail] = useState('')
  const [patientDob, setPatientDob] = useState('')
  const [patientGoal, setPatientGoal] = useState('Trying to conceive within 12 months')

  // Password Fields
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Clear/Reset all input fields
  const handleResetForm = () => {
    setDoctorName('')
    setDoctorEmail('')
    setMedicalLicense('')
    setSpecialty('Andrology & Male Infertility')
    setHospital('')
    setPatientName('')
    setPatientEmail('')
    setPatientDob('')
    setPatientGoal('Trying to conceive within 12 months')
    setPassword('')
    setConfirmPassword('')
  }

  // Pre-fill demo credentials if in signin mode
  const handleLoadDemoCreds = (role) => {
    if (role === 'doctor') {
      setDoctorName('Dr. Sarah Johnson, MD')
      setDoctorEmail('s.johnson@reprogenix.health')
      setMedicalLicense('MED-NPI-88392019')
      setSpecialty('Andrology & Male Infertility')
      setHospital('University Center for Reproductive Health')
      setPassword('SecureMedicalPass123!')
    } else {
      setPatientName('Marcus Vance')
      setPatientEmail('marcus.vance@tech.co')
      setPatientDob('1996-05-14')
      setPatientGoal('Trying to conceive within 12 months')
      setPassword('SecureMedicalPass123!')
    }
  }

  // Synchronize on open or mode switch - ensure fresh clean form state
  useEffect(() => {
    if (isOpen) {
      handleResetForm()
      if (initialMode === 'signup') {
        setMode('signup')
      } else {
        setMode('signin')
      }
    }
  }, [isOpen, initialMode])

  // When switching between signin and signup, completely refresh form fields so old details don't stay
  const handleSwitchMode = (newMode) => {
    setMode(newMode)
    handleResetForm()
  }

  // When switching role tab, completely refresh form fields
  const handleSwitchRole = (newRole) => {
    setRoleType(newRole)
    handleResetForm()
  }

  if (!isOpen) return null

  // 1-Click Instant Demo Login
  const handleQuickDemo = (role) => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } })
    const demoName = role === 'doctor' ? 'Dr. Sarah Johnson, MD' : 'Marcus Vance'
    onSuccessLogin(role, demoName, {
      name: demoName,
      email: role === 'doctor' ? 's.johnson@reprogenix.health' : 'marcus.vance@tech.co',
      specialty: role === 'doctor' ? 'Andrology & Male Infertility' : null,
      hospital: role === 'doctor' ? 'University Center for Reproductive Health' : null,
      goal: role === 'patient' ? 'Trying to conceive within 12 months' : null
    })
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (mode === 'signup' && password !== confirmPassword) {
      alert('Passwords do not match. Please re-enter.')
      return
    }

    const activeName =
      roleType === 'doctor'
        ? (doctorName.trim() || 'Dr. Alex Mercer, MD')
        : (patientName.trim() || 'Alexander Wright')

    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } })

    onSuccessLogin(roleType, activeName, {
      name: activeName,
      email: roleType === 'doctor' ? (doctorEmail || 'doctor@reprogenix.health') : (patientEmail || 'patient@mail.com'),
      specialty: roleType === 'doctor' ? specialty : null,
      hospital: roleType === 'doctor' ? (hospital || 'General Clinical Center') : null,
      medicalLicense: roleType === 'doctor' ? (medicalLicense || 'NPI-102938') : null,
      goal: roleType === 'patient' ? patientGoal : null,
      dob: roleType === 'patient' ? (patientDob || '1995-04-12') : null
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden my-auto text-slate-800">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#08283a] via-[#061f30] to-[#087e78] p-6 text-white flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0c9d91] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#61d6c3]">
                {t('portalAccess') || 'Portal Access'}
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white">
              {mode === 'signin'
                ? (t('signInTitle') || 'Welcome Back to Reprogenix AI')
                : (t('registerTitle') || 'Create Your Reprogenix AI Account')}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {roleType === 'doctor'
                ? (t('verifiedClinicianPortal') || 'Verified Clinician & Andrology Decision Support Portal')
                : (t('personalizedPatientPortal') || 'Personalized Male Reproductive Health & Biomarker Screening')}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. Clear Separation of Patient and Doctor Account */}
        <div className="p-4 bg-slate-50 border-b border-slate-200/80">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            {t('selectAccountType') || 'Select Account Type'}
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleSwitchRole('doctor')}
              className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                roleType === 'doctor'
                  ? 'border-[#0c9d91] bg-white text-[#08283a] ring-2 ring-[#0c9d91]/25 shadow-sm'
                  : 'border-slate-200 bg-slate-100/70 text-slate-600 hover:bg-white'
              }`}
            >
              <div
                className={`p-2 rounded-xl flex-shrink-0 text-white ${
                  roleType === 'doctor' ? 'bg-[#087e78]' : 'bg-slate-400'
                }`}
              >
                <Stethoscope size={18} />
              </div>
              <div>
                <div className="text-xs font-extrabold">
                  {t('doctorPortalTab') || 'Doctor / Clinician'}
                </div>
                <div className="text-[10px] text-slate-500">{t('medicalPortalLabel') || 'Medical Portal'}</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchRole('patient')}
              className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                roleType === 'patient'
                  ? 'border-[#0c9d91] bg-white text-[#08283a] ring-2 ring-[#0c9d91]/25 shadow-sm'
                  : 'border-slate-200 bg-slate-100/70 text-slate-600 hover:bg-white'
              }`}
            >
              <div
                className={`p-2 rounded-xl flex-shrink-0 text-white ${
                  roleType === 'patient' ? 'bg-[#08283a]' : 'bg-slate-400'
                }`}
              >
                <User size={18} />
              </div>
              <div>
                <div className="text-xs font-extrabold">
                  {t('patientPortalTab') || 'Patient Portal'}
                </div>
                <div className="text-[10px] text-slate-500">{t('healthProfileLabel') || 'Health Profile'}</div>
              </div>
            </button>
          </div>
        </div>

        {/* 2. Sub-Toggle: Sign In vs Register (New Account) */}
        <div className="flex items-center justify-between px-6 pt-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold gap-1">
            <button
              type="button"
              onClick={() => handleSwitchMode('signin')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                mode === 'signin'
                  ? 'bg-white text-[#08283a] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn size={13} />
              <span>{t('signIn') || 'Sign In'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchMode('signup')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-white text-[#08283a] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus size={13} />
              <span>{t('signUp') || 'Register (New)'}</span>
            </button>
          </div>

          {/* Form Actions: Autofill Demo & Reset / Clear Form Buttons */}
          <div className="flex items-center gap-2">
            {mode === 'signin' && (
              <button
                type="button"
                onClick={() => handleLoadDemoCreds(roleType)}
                className="flex items-center gap-1 text-[11px] font-bold text-[#087e78] hover:text-[#0c9d91] bg-[#dff5f1] px-2.5 py-1 rounded-lg transition-colors"
                title="Autofill demo credentials for testing"
              >
                <Sparkles size={12} />
                <span>{t('autofillDemo') || 'Autofill Demo'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleResetForm}
              className="flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline px-2 py-1 rounded-lg transition-colors"
              title="Clear all fields"
            >
              <RotateCcw size={12} />
              <span>{t('clearResetForm') || 'Clear Form'}</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 pt-4 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {roleType === 'doctor' ? (
              /* Doctor Fields */
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t('fullName') || 'Full Name'} & Medical Title
                  </label>
                  <input
                    type="text"
                    required
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="e.g. Dr. Alex Mercer, MD"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t('emailAddress') || 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={doctorEmail}
                    onChange={(e) => setDoctorEmail(e.target.value)}
                    placeholder="e.g. a.mercer@hospital.org"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] text-slate-800"
                  />
                </div>

                {mode === 'signup' && (
                  <>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          {t('medicalLicense') || 'Medical License / NPI'}
                        </label>
                        <input
                          type="text"
                          required
                          value={medicalLicense}
                          onChange={(e) => setMedicalLicense(e.target.value)}
                          placeholder="e.g. NPI-882194"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] font-mono text-xs text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          {t('clinicalSpecialty') || 'Specialty'}
                        </label>
                        <select
                          value={specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] font-semibold text-slate-800"
                        >
                          <option value="Andrology & Male Infertility">Andrology & Infertility</option>
                          <option value="Urology & Microsurgery">Urology & Microsurgery</option>
                          <option value="Reproductive Endocrinology">Reproductive Endocrinology</option>
                          <option value="Clinical Genomics">Clinical Genomics</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {t('affiliatedHospital') || 'Affiliated Hospital / Clinic'}
                      </label>
                      <input
                        type="text"
                        required
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                        placeholder="e.g. Johns Hopkins Center for Reproductive Medicine"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] text-slate-800"
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              /* Patient Fields */
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t('fullName') || 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Alexander Wright"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t('emailAddress') || 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="e.g. alex.wright@mail.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] text-slate-800"
                  />
                </div>

                {mode === 'signup' && (
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {t('dob') || 'Date of Birth'}
                      </label>
                      <input
                        type="date"
                        required
                        value={patientDob}
                        onChange={(e) => setPatientDob(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {t('reproductiveGoal') || 'Primary Goal'}
                      </label>
                      <select
                        value={patientGoal}
                        onChange={(e) => setPatientGoal(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] font-semibold text-slate-800"
                      >
                        <option value="Trying to conceive within 12 months">
                          Trying to conceive (TTC)
                        </option>
                        <option value="Proactive Reproductive Health Baseline">
                          Proactive baseline
                        </option>
                        <option value="Hormonal Optimization & Testosterone">
                          Hormone / Testosterone
                        </option>
                        <option value="Post-Varicocele Recovery Follow-up">
                          Varicocele follow-up
                        </option>
                      </select>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Password Field with Eye Toggle */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t('password') || 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] font-medium text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  title={showPassword ? t('hidePassword') : t('showPassword')}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register mode only) with Eye Toggle */}
            {mode === 'signup' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t('confirmPassword') || 'Confirm Password'}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0c9d91] font-medium text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    title={showConfirmPassword ? t('hidePassword') : t('showPassword')}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] active:scale-95 rounded-2xl shadow-md shadow-[#0c9d91]/25 transition-all"
              >
                <span>
                  {mode === 'signin'
                    ? `${t('signIn')} ${t('as') || 'as'} ${roleType === 'doctor' ? (t('doctorLabel') || 'Doctor') : (t('patientLabel') || 'Patient')}`
                    : t('createAccount') || 'Complete Registration'}
                </span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>

          {/* Quick 1-Click Demo Login Shortcuts */}
          <div className="pt-3 border-t border-slate-200/80">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2">
              {t('instantDemoAccess') || 'Instant Demo Access'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('doctor')}
                className="flex items-center justify-center gap-1.5 p-2 px-3 text-[11px] font-bold text-[#087e78] bg-[#dff5f1]/60 hover:bg-[#dff5f1] rounded-xl border border-emerald-200/80 transition-colors"
              >
                <Stethoscope size={13} />
                <span>{t('demoDoctor') || 'Demo Doctor'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('patient')}
                className="flex items-center justify-center gap-1.5 p-2 px-3 text-[11px] font-bold text-[#08283a] bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors"
              >
                <User size={13} />
                <span>{t('demoPatient') || 'Demo Patient'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

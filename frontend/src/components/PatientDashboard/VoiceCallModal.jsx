import { useState, useEffect, useRef } from 'react'
import {
  X,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ShieldCheck,
  Activity,
  User,
  Stethoscope,
  Sparkles
} from 'lucide-react'

export default function VoiceCallModal({
  isOpen,
  onClose,
  doctorName = 'Dr. Sarah Johnson, MD',
  patientName = 'Marcus Vance',
  t
}) {
  const [callState, setCallState] = useState('ringing') // 'ringing', 'connected', 'ended'
  const [seconds, setSeconds] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaker, setIsSpeaker] = useState(true)
  const [doctorSpeaking, setDoctorSpeaking] = useState(false)
  const audioCtxRef = useRef(null)

  // Web Audio Ringtone / Ringing Simulator
  const playRingtone = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()

      osc1.frequency.value = 440
      osc2.frequency.value = 480

      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(ctx.destination)

      osc1.start()
      osc2.start()
      osc1.stop(ctx.currentTime + 1.2)
      osc2.stop(ctx.currentTime + 1.2)
    } catch (e) {}
  }

  // Doctor Audio Voice on Call
  const speakDoctorOnCall = (text) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()

    const msg =
      text ||
      `Hello ${patientName}, this is ${doctorName} calling for your scheduled male reproductive follow-up. I'm reviewing your 72-day progress. Can you hear me clearly?`

    const utterance = new SpeechSynthesisUtterance(msg)
    utterance.rate = 0.96
    utterance.pitch = 1.05

    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Natural'))
    )
    if (preferredVoice) utterance.voice = preferredVoice

    utterance.onstart = () => setDoctorSpeaking(true)
    utterance.onend = () => setDoctorSpeaking(false)
    utterance.onerror = () => setDoctorSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  // Handle Call Lifecycle
  useEffect(() => {
    if (!isOpen) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
      setCallState('ringing')
      setSeconds(0)
      return
    }

    // Play initial ring
    playRingtone()
    const ringInterval = setInterval(playRingtone, 2500)

    // Connect after 2.5 seconds
    const connectTimer = setTimeout(() => {
      clearInterval(ringInterval)
      setCallState('connected')
      setTimeout(() => {
        speakDoctorOnCall()
      }, 600)
    }, 2400)

    return () => {
      clearInterval(ringInterval)
      clearTimeout(connectTimer)
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [isOpen])

  // Call duration timer
  useEffect(() => {
    if (callState !== 'connected' || !isOpen) return
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [callState, isOpen])

  if (!isOpen) return null

  const formatTimer = (s) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-gradient-to-b from-[#08283a] via-[#061f30] to-[#041420] rounded-3xl shadow-2xl border border-slate-800 max-w-md w-full overflow-hidden my-auto text-white p-6 sm:p-8 flex flex-col items-center justify-between min-h-[480px]">
        {/* Top Header */}
        <div className="w-full flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[#0c9d91]">
            <ShieldCheck size={14} />
            <span className="font-semibold text-[11px]">HIPAA Secure Audio Call</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Doctor Avatar & Calling Information */}
        <div className="flex flex-col items-center text-center my-6 space-y-4">
          <div className="relative">
            <div
              className={`w-28 h-28 rounded-full bg-gradient-to-tr from-[#087e78] to-[#0c9d91] flex items-center justify-center text-white font-black text-3xl shadow-2xl transition-all ${
                doctorSpeaking
                  ? 'ring-8 ring-[#0c9d91]/50 scale-105 shadow-[#0c9d91]/40'
                  : callState === 'ringing'
                  ? 'animate-pulse ring-4 ring-emerald-500/30'
                  : 'ring-4 ring-slate-700'
              }`}
            >
              SJ
            </div>

            {doctorSpeaking && (
              <span className="absolute -bottom-1 px-2.5 py-0.5 rounded-full bg-[#0c9d91] text-slate-950 text-[10px] font-black uppercase tracking-wider animate-pulse">
                Speaking
              </span>
            )}
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">{doctorName}</h3>
            <p className="text-xs text-[#0c9d91] font-medium mt-0.5">
              Lead Andrologist & Male Fertility Specialist
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Reprogenix Clinical Tele-Line 1</p>
          </div>

          {/* Call Status & Live Timer */}
          <div className="pt-2">
            {callState === 'ringing' ? (
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Ringing Clinician Line...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-slate-900/80 px-3 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Connected • {formatTimer(seconds)}</span>
                </div>

                {/* Animated frequency soundwave */}
                <div className="flex items-center gap-1 mt-3 h-5">
                  {[6, 14, 20, 10, 18, 24, 16, 8, 12].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-[#0c9d91] rounded-full transition-all duration-150"
                      style={{
                        height: doctorSpeaking
                          ? `${Math.floor(Math.random() * 22) + 6}px`
                          : '4px',
                        opacity: doctorSpeaking ? 1 : 0.35
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Voice Prompt / Action */}
        {callState === 'connected' && (
          <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center mb-4 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">
              Live Patient Consultation
            </span>
            <p className="text-xs text-slate-300">
              &quot;Dr. Johnson is reviewing your Day 48 spermatogenesis biomarkers.&quot;
            </p>
            <button
              type="button"
              onClick={() =>
                speakDoctorOnCall(
                  `Your sperm concentration is stable at 14 million, and motility is showing promising response to scrotal heat avoidance. Keep taking your daily CoQ10.`
                )
              }
              className="mt-1 text-[11px] font-bold text-[#0c9d91] hover:text-[#61d6c3] underline"
            >
              Ask Doctor for Lab Update
            </button>
          </div>
        )}

        {/* Call Controls Bar */}
        <div className="w-full flex items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-full transition-all ${
              isMuted
                ? 'bg-rose-600 text-white shadow-lg'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
            title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            type="button"
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`p-3.5 rounded-full transition-all ${
              isSpeaker
                ? 'bg-[#0c9d91] text-white shadow-lg'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
            title="Speakerphone"
          >
            {isSpeaker ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <button
            type="button"
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel()
              onClose()
            }}
            className="p-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-600/30 transition-all active:scale-95"
            title="End Call"
          >
            <PhoneOff size={22} />
          </button>
        </div>
      </div>
    </div>
  )
}

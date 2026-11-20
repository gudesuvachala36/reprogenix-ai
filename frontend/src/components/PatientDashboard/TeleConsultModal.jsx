import { useState, useEffect, useRef } from 'react'
import {
  X,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Share2,
  MessageSquare,
  ShieldCheck,
  User,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  PlayCircle,
  HelpCircle,
  Radio
} from 'lucide-react'

export default function TeleConsultModal({ isOpen, onClose, doctorName, patientName, t }) {
  const [micOn, setMicOn] = useState(true)
  const [videoOn, setVideoOn] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [seconds, setSeconds] = useState(145) // Starts at 02:25
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef(null)
  const recognitionRef = useRef(null)

  const [messages, setMessages] = useState([
    {
      sender: doctorName || 'Dr. Sarah Johnson, MD',
      text: 'Hello Marcus, good to see you. How is your scrotal heat avoidance and CoQ10 protocol working out?',
      time: '02:10'
    },
    {
      sender: patientName || 'Marcus Vance',
      text: 'Much better! I haven’t had the laptop directly on my lap for over 3 weeks now.',
      time: '02:18'
    },
    {
      sender: doctorName || 'Dr. Sarah Johnson, MD',
      text: 'Excellent. Your motility rebound from 22% to 29% demonstrates strong biological response.',
      time: '02:24'
    }
  ])
  const [inputMsg, setInputMsg] = useState('')

  // Play pleasant medical chime via Web Audio API
  const playChime = (freq = 440) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.3)
      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.4)
    } catch (e) {}
  }

  // Voice synthesis: Clinician speaks aloud
  const speakClinicianVoice = (textToSpeak) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()

    const defaultMsg =
      textToSpeak ||
      `Hello ${patientName || 'Marcus'}, ${doctorName || 'Dr. Sarah Johnson'} here. I am reviewing your mid-cycle biomarkers, and your progressive motility rebound from twenty-two percent to twenty-nine percent is very encouraging. How have you been feeling on the antioxidant protocol?`

    const utterance = new SpeechSynthesisUtterance(defaultMsg)
    utterance.rate = 0.95
    utterance.pitch = 1.05

    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Natural'))
    )
    if (preferredVoice) utterance.voice = preferredVoice

    utterance.onstart = () => {
      setIsSpeaking(true)
      playChime(523.25)
    }
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  // Intelligent clinical reply engine based on patient's question
  const generateDoctorAnswer = (question) => {
    const q = question.toLowerCase()
    if (q.includes('motility') || q.includes('sperm') || q.includes('count') || q.includes('concentration')) {
      return `Your progressive motility has improved from 22% up to 29%, which is right at the WHO 6th edition normal threshold. Continuing your daily CoQ10 antioxidant regimen will support progressive motility through Day 72.`
    }
    if (q.includes('heat') || q.includes('laptop') || q.includes('temperature') || q.includes('hot')) {
      return `Scrotal hyperthermia directly damages spermatocyte mitochondria. Keep maintaining at least 15 inches distance and use desk trays to preserve scrotal cooling below 34.5 degrees Celsius.`
    }
    if (q.includes('surgery') || q.includes('varicocele') || q.includes('operation') || q.includes('pain')) {
      return `Your varicocele is clinical Grade 1. AUA guidelines recommend 72 days of non-surgical lifestyle reversibility and antioxidant therapy before considering microsurgical subinguinal varicocelectomy.`
    }
    if (q.includes('repeat') || q.includes('test') || q.includes('cycle') || q.includes('day') || q.includes('when')) {
      return `A complete human spermatogenesis cycle requires 72 to 75 days. Your follow-up automated semen analysis and serum endocrine test are scheduled for Day 72.`
    }
    if (q.includes('diet') || q.includes('food') || q.includes('supplement') || q.includes('zinc')) {
      return `Zinc and selenium support chromatin condensation, while CoQ10 boosts ATP energy in the sperm midpiece. Continue 200 milligrams daily with healthy fats for optimal absorption.`
    }
    return `I have reviewed your clinical inquiry regarding your reproductive health. Your biological biomarkers are responding positively to our protocol. I have documented this in your medical chart.`
  }

  // Process a question asked by patient (via mic speech or text)
  const processPatientQuestion = (questionText) => {
    if (!questionText || !questionText.trim()) return

    const patientMsg = {
      sender: patientName || 'Marcus Vance',
      text: questionText.trim(),
      time: formatTimer(seconds)
    }
    setMessages((prev) => [...prev, patientMsg])
    setInputMsg('')

    // Doctor generates medical answer and speaks it aloud
    setTimeout(() => {
      const docAnswer = generateDoctorAnswer(questionText)
      const docReply = {
        sender: doctorName || 'Dr. Sarah Johnson, MD',
        text: docAnswer,
        time: formatTimer(seconds + 2)
      }
      setMessages((prev) => [...prev, docReply])
      speakClinicianVoice(docAnswer)
    }, 900)
  }

  // Web Speech Recognition: Patient speaks through microphone
  const handleStartSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can click the voice questions below or type your question.')
      return
    }

    try {
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop()
        setIsListening(false)
        return
      }

      const recognition = new SpeechRecognition()
      recognitionRef.current = recognition
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
        playChime(659.25)
      }

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setIsListening(false)
        processPatientQuestion(transcript)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch (e) {
      setIsListening(false)
    }
  }

  // Auto-speak greeting on open
  useEffect(() => {
    if (isOpen) {
      playChime(587.33)
      const timer = setTimeout(() => {
        speakClinicianVoice()
      }, 800)
      return () => clearTimeout(timer)
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [isOpen])

  // Call timer
  useEffect(() => {
    if (!isOpen) return
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [isOpen])

  // Toggle user camera
  const handleToggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
        videoRef.current.srcObject = null
      }
      setCameraActive(false)
    } else {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            videoRef.current.play()
            setCameraActive(true)
          }
        }
      } catch (err) {
        setCameraActive(true)
      }
    }
  }

  if (!isOpen) return null

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60)
    const rem = secs % 60
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    processPatientQuestion(inputMsg)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-[#08283a] rounded-3xl shadow-2xl border border-slate-800 max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden my-auto text-white">
        {/* Call Header */}
        <div className="bg-[#061f30] px-6 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0c9d91] animate-pulse" />
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>Tele-Andrology Consultation • {doctorName || 'Dr. Sarah Johnson, MD'}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0c9d91]/20 text-[#61d6c3] border border-[#0c9d91]/30">
                  {t('liveEncrypted') || 'LIVE ENCRYPTED'}
                </span>
              </h3>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span>HIPAA Encrypted Audio/Video Stream</span>
                <span>•</span>
                <span className="font-mono text-[#0c9d91] font-bold">{formatTimer(seconds)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Voice Synthesizer Toggle */}
            <button
              type="button"
              onClick={() => speakClinicianVoice()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#0c9d91] hover:bg-[#087e78] text-white rounded-xl shadow-xs transition-all active:scale-95"
              title="Click to hear Dr. Sarah Johnson speak aloud"
            >
              <Volume2 size={14} className={isSpeaking ? 'animate-bounce' : ''} />
              <span>{isSpeaking ? (t('doctorSpeaking') || 'Speaking...') : (t('playDoctorVoice') || 'Play Doctor Voice')}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Feeds + Live Notes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-[480px] overflow-hidden">
          {/* Main Video Stage (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950 p-4 flex flex-col justify-between relative">
            {/* Primary Video Feed: Clinician */}
            <div className="w-full h-full rounded-2xl bg-gradient-to-b from-[#08283a] to-[#041522] flex flex-col items-center justify-center relative overflow-hidden border border-slate-800/80 p-6">
              {/* Doctor Avatar with Speaking Pulse */}
              <div className="relative mb-3">
                <div
                  className={`w-28 h-28 rounded-full bg-gradient-to-tr from-[#087e78] to-[#0c9d91] text-white font-black text-3xl flex items-center justify-center shadow-2xl transition-all ${
                    isSpeaking
                      ? 'ring-8 ring-[#0c9d91]/50 scale-105 shadow-[#0c9d91]/50'
                      : 'ring-4 ring-[#0c9d91]/25'
                  }`}
                >
                  SJ
                </div>
                {isSpeaking && (
                  <span className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-[#0c9d91] text-slate-950 text-[10px] font-black uppercase tracking-wider animate-pulse">
                    Speaking
                  </span>
                )}
              </div>

              <div className="text-center">
                <div className="font-extrabold text-white text-base">
                  {doctorName || 'Dr. Sarah Johnson, MD'}
                </div>
                <div className="text-xs text-[#0c9d91] font-medium mt-0.5">
                  Lead Andrologist & Male Fertility Specialist
                </div>

                {/* Animated Equalizer Soundwave Bars */}
                <div className="flex items-center justify-center gap-1.5 mt-3 h-5">
                  {[4, 12, 18, 10, 16, 22, 14, 8].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-[#0c9d91] rounded-full transition-all duration-150"
                      style={{
                        height: isSpeaking ? `${Math.floor(Math.random() * 22) + 6}px` : '4px',
                        opacity: isSpeaking ? 1 : 0.4
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Patient Self-View Picture-in-Picture */}
              <div className="absolute bottom-4 right-4 w-36 sm:w-44 h-28 sm:h-32 rounded-2xl bg-slate-900 border-2 border-[#0c9d91]/70 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                />
                {!cameraActive && (
                  <div className="flex flex-col items-center justify-center p-2 text-center">
                    <div className="w-10 h-10 rounded-full bg-[#08283a] text-white font-black text-xs flex items-center justify-center mb-1">
                      MV
                    </div>
                    <span className="text-[10px] font-bold text-slate-200 truncate max-w-[120px]">
                      {patientName || 'Marcus Vance'}
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleCamera}
                      className="mt-1 text-[9px] font-semibold text-[#0c9d91] hover:text-[#61d6c3] underline"
                    >
                      {t('enableWebcam') || 'Enable Webcam'}
                    </button>
                  </div>
                )}
                {cameraActive && (
                  <div className="absolute bottom-1 left-2 text-[9px] font-bold text-white bg-black/60 px-1.5 rounded">
                    You (Live)
                  </div>
                )}
              </div>
            </div>

            {/* In-Call Controls Bar */}
            <div className="pt-4 flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setMicOn(!micOn)}
                className={`p-3 rounded-2xl transition-all ${
                  micOn
                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                    : 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                }`}
                title={micOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {micOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>

              <button
                type="button"
                onClick={handleToggleCamera}
                className={`p-3 rounded-2xl transition-all ${
                  cameraActive
                    ? 'bg-[#0c9d91] text-white shadow-lg shadow-[#0c9d91]/30'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
                title={cameraActive ? 'Stop Camera' : 'Turn on Webcam'}
              >
                {cameraActive ? <Video size={18} /> : <VideoOff size={18} />}
              </button>

              {/* Patient Voice Mic Button to Speak Aloud to Doctor */}
              <button
                type="button"
                onClick={handleStartSpeechRecognition}
                className={`px-3.5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all active:scale-95 ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/40'
                    : 'bg-[#0c9d91] hover:bg-[#087e78] text-white shadow-md'
                }`}
                title="Click and speak into your microphone to get Doctor's audible response"
              >
                <Radio size={16} className={isListening ? 'animate-spin' : ''} />
                <span>{isListening ? (t('listeningVoice') || 'Listening to you...') : (t('speakToDoctor') || '🎤 Speak to Doctor')}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playChime(329.63)
                  onClose()
                }}
                className="px-4 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all active:scale-95"
              >
                <PhoneOff size={16} />
                <span>{t('endConsultation') || 'End Call'}</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Interactive Voice Q&A & Live Notes (5 Cols) */}
          <div className="lg:col-span-5 bg-[#061f30] border-l border-slate-800 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold text-slate-300">
                <span className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-[#0c9d91]" />
                  <span>{t('consultationNotes') || 'Consultation Notes & Live Chat'}</span>
                </span>
                <span className="text-[10px] text-[#0c9d91] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0c9d91] animate-ping" />
                  Voice AI Active
                </span>
              </div>

              {/* Quick Clickable Patient Voice Queries */}
              <div className="pt-2 pb-1 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Patient Voice Questions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => processPatientQuestion('How do my motility results look?')}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-[#0c9d91] hover:text-white text-slate-300 transition-colors border border-slate-700 text-left"
                  >
                    💬 Motility results?
                  </button>
                  <button
                    type="button"
                    onClick={() => processPatientQuestion('What should I do about laptop heat on my lap?')}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-[#0c9d91] hover:text-white text-slate-300 transition-colors border border-slate-700 text-left"
                  >
                    💬 Laptop heat?
                  </button>
                  <button
                    type="button"
                    onClick={() => processPatientQuestion('Do I need varicocele surgery?')}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-[#0c9d91] hover:text-white text-slate-300 transition-colors border border-slate-700 text-left"
                  >
                    💬 Need surgery?
                  </button>
                  <button
                    type="button"
                    onClick={() => processPatientQuestion('When should I repeat my semen test?')}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-[#0c9d91] hover:text-white text-slate-300 transition-colors border border-slate-700 text-left"
                  >
                    💬 When is Day 72 test?
                  </button>
                </div>
              </div>

              {/* Messages Stream */}
              <div className="space-y-3 py-3 max-h-[260px] overflow-y-auto">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                      m.sender.includes('Sarah')
                        ? 'bg-slate-800/90 border-[#0c9d91]/40 text-slate-200'
                        : 'bg-[#08283a] border-[#0c9d91]/50 text-[#61d6c3]'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] mb-1">
                      <span className="font-extrabold text-[#0c9d91]">{m.sender}</span>
                      <span className="text-slate-500">{m.time}</span>
                    </div>
                    <p>{m.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input & Mic Trigger */}
            <form onSubmit={handleFormSubmit} className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder={t('askQuestionPlaceholder') || 'Ask Dr. Sarah a question (voice or text)...'}
                className="flex-1 px-3 py-2 text-xs bg-slate-800 text-white placeholder-slate-400 rounded-xl outline-none border border-slate-700 focus:border-[#0c9d91]"
              />

              <button
                type="button"
                onClick={handleStartSpeechRecognition}
                className={`p-2.5 rounded-xl transition-all ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-800 text-[#0c9d91] hover:bg-slate-700'
                }`}
                title="Speak question via mic"
              >
                <Mic size={15} />
              </button>

              <button
                type="submit"
                className="p-2.5 bg-[#0c9d91] text-white rounded-xl hover:bg-[#087e78] transition-colors"
                title="Send"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

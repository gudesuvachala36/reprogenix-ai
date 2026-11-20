import { useState } from 'react'
import { X, Calendar, Clock, User, Stethoscope, Video, Check } from 'lucide-react'
import { PATIENTS, DOCTORS } from '../../data/mockData'

export default function ScheduleModal({ isOpen, onClose, onSave, initialData, t = (k) => k }) {
  const [patientId, setPatientId] = useState(initialData?.patientId || PATIENTS[0]?.id || '')
  const [doctorName, setDoctorName] = useState(initialData?.doctor || DOCTORS[0]?.name || '')
  const [date, setDate] = useState('2025-11-20')
  const [time, setTime] = useState('02:00 PM - 02:45 PM')
  const [type, setType] = useState('Tele-Andrology Consultation')
  const [notes, setNotes] = useState('Review 72-day progress and lifestyle biomarkers.')

  if (!isOpen) return null

  const selectedPatient = PATIENTS.find((p) => p.id === patientId) || PATIENTS[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      id: `apt-${Date.now()}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      doctorName,
      date,
      time,
      type,
      status: 'Confirmed',
      location: type.includes('Tele') ? 'Encrypted Video Room 3A' : 'Suite 204',
      notes,
      isTelehealth: type.includes('Tele')
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar size={20} />
            <h3 className="font-extrabold text-base tracking-tight">
              {t('scheduleConsultation') || 'Schedule Consultation'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Patient Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t('selectPatient') || 'Select Patient'}
            </label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-semibold"
            >
              {PATIENTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nameKey ? (t(p.nameKey) || p.name) : p.name} ({p.mrn}) — {p.riskLevel === 'High Risk' ? (t('highRisk') || 'High Risk') : p.riskLevel === 'Moderate Risk' ? (t('moderateRisk') || 'Moderate Risk') : (t('lowRisk') || 'Low Risk')}
                </option>
              ))}
            </select>
          </div>

          {/* Attending Doctor */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t('attendingClinician') || 'Attending Clinician'}
            </label>
            <select
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-semibold"
            >
              {DOCTORS.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.doctorNameKey ? (t(d.doctorNameKey) || d.name) : (d.nameKey ? (t(d.nameKey) || d.name) : d.name)} ({d.specialtyKey ? (t(d.specialtyKey) || d.specialty) : d.specialty})
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('date') || 'Date'}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('timeSlot') || 'Time Slot'}
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 03:00 PM - 03:30 PM"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Consultation Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t('consultationModality') || 'Consultation Modality'}
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
            >
              <option value="Tele-Andrology Initial Review">
                {t('modalityTeleVideo') || 'Tele-Andrology Initial Review (Video)'}
              </option>
              <option value="WHO 6th Ed Semen Diagnostic Review">
                {t('modalityWhoReview') || 'WHO 6th Ed Semen Diagnostic Review'}
              </option>
              <option value="Couple-Centred Subfertility Consultation">
                {t('modalityCoupleConsult') || 'Couple-Centred Subfertility Consultation'}
              </option>
              <option value="In-Clinic Varicocele & Scrotal Ultrasound">
                {t('modalityUltrasound') || 'In-Clinic Varicocele & Scrotal Ultrasound'}
              </option>
              <option value="72-Day Spermatogenesis Post-Cycle Review">
                {t('modalityPostCycle') || '72-Day Spermatogenesis Post-Cycle Review'}
              </option>
            </select>
          </div>

          {/* Clinical Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t('clinicalNotesAgenda') || 'Clinical Notes / Agenda'}
            </label>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {t('cancel') || 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <Check size={14} />
              <span>{t('confirmSchedule') || 'Confirm & Schedule'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

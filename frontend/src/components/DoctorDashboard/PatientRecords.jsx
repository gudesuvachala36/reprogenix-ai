import { useState } from 'react'
import {
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Mail,
  Phone,
  Maximize2,
  Stethoscope,
  Users,
  ShieldAlert,
  CheckCircle,
  FileText
} from 'lucide-react'
import { DOCTORS } from '../../data/mockData'

export default function PatientRecords({
  patients = [],
  onSelectPatient,
  onSchedulePatient,
  searchQuery,
  t
}) {
  const [viewMode, setViewMode] = useState('doctors') // 'doctors' or 'patients'
  const [localSearch, setLocalSearch] = useState('')
  const [filterRisk, setFilterRisk] = useState('ALL') // 'ALL', 'HIGH', 'MODERATE', 'LOW'

  const effectiveSearch = searchQuery || localSearch

  // Filtered patients
  const filteredPatients = patients.filter((p) => {
    const locName = p.nameKey ? (t(p.nameKey) || p.name) : p.name
    const matchesSearch =
      p.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      locName.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      p.mrn.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      p.primaryConcern.toLowerCase().includes(effectiveSearch.toLowerCase())
    if (!matchesSearch) return false

    if (filterRisk === 'HIGH') return p.riskLevel.includes('High') || p.riskLevel.includes('Emergency')
    if (filterRisk === 'MODERATE') return p.riskLevel.includes('Moderate')
    if (filterRisk === 'LOW') return p.riskLevel.includes('Low')
    return true
  })

  // Filtered doctors (for the reference image layout)
  const filteredDoctors = DOCTORS.filter((d) => {
    const locName = d.nameKey ? (t(d.nameKey) || d.name) : d.name
    const locSpec = d.specialtyKey ? (t(d.specialtyKey) || d.specialty) : d.specialty
    return (
      d.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      locName.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      d.specialty.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      locSpec.toLowerCase().includes(effectiveSearch.toLowerCase())
    )
  })

  // Intelligent auto-switch: if searching and only patients match, display patients
  const currentDisplayMode =
    effectiveSearch && filteredPatients.length > 0 && filteredDoctors.length === 0
      ? 'patients'
      : viewMode

  const getStatusBadge = (status) => {
    if (status === 'Available') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {t('available')}
        </span>
      )
    }
    if (status === 'In Surgery' || status === 'In Consultation') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {status === 'In Surgery' ? (t('inSurgery') || status) : (t('inConsultation') || status)}
        </span>
      )
    }
    if (status.includes('High') || status.includes('Emergency')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          {t('highRisk')}
        </span>
      )
    }
    if (status.includes('Moderate') || status.includes('Action')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          {t('moderateRisk')}
        </span>
      )
    }
    if (status === 'On Leave') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          {t('onLeave') || 'On Leave'}
        </span>
      )
    }
    if (status === 'Low Risk' || status.includes('Low')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {t('lowRisk') || 'Low Risk'}
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        {status}
      </span>
    )
  }

  return (
    <div className="space-y-5">
      {/* Top Header Section matching reference image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-slate-400 mb-0.5">
            {t('clinicalDutyDate') || 'Sunday, November 16, 2025'}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {currentDisplayMode === 'doctors' ? (t('doctorsManagement') || 'Doctors Management') : t('patientRecords')}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {currentDisplayMode === 'doctors'
              ? `${filteredDoctors.length} ${t('doctorsOnDuty') || 'doctors on clinical duty'}`
              : `${filteredPatients.length} ${t('activePatientsUnderCare') || 'active patients under reproductive care'}`}
          </p>
        </div>

        {/* View Toggle (Doctors Reference Grid vs Patient Clinical Cohort) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/70 text-xs font-semibold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('doctors')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              currentDisplayMode === 'doctors'
                ? 'bg-white text-emerald-800 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope size={14} className={currentDisplayMode === 'doctors' ? 'text-emerald-600' : 'text-slate-400'} />
            <span>{t('doctorsDirectory') || 'Doctors Directory'} ({filteredDoctors.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('patients')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              currentDisplayMode === 'patients'
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users size={14} />
            <span>{t('patientRecords')} ({filteredPatients.length})</span>
          </button>
        </div>
      </div>

      {/* Sub-Search Bar & Filters matching reference image */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder={
              currentDisplayMode === 'doctors'
                ? (t('searchDoctorsPlaceholder') || 'Search doctors by name or specialty...')
                : (t('searchPatientsPlaceholder') || 'Search patients by name, MRN, or risk tier...')
            }
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200/70 focus:border-emerald-500/50 outline-none transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {currentDisplayMode === 'patients' && (
            <>
              <button
                type="button"
                onClick={() => setFilterRisk('ALL')}
                className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-colors ${
                  filterRisk === 'ALL'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t('allFilter') || 'All'}
              </button>
              <button
                type="button"
                onClick={() => setFilterRisk('HIGH')}
                className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-colors ${
                  filterRisk === 'HIGH'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                {t('highRisk')}
              </button>
              <button
                type="button"
                onClick={() => setFilterRisk('MODERATE')}
                className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-colors ${
                  filterRisk === 'MODERATE'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                {t('moderateRisk')}
              </button>
              <button
                type="button"
                onClick={() => setFilterRisk('LOW')}
                className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-colors ${
                  filterRisk === 'LOW'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                {t('lowRisk')}
              </button>
            </>
          )}

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors ml-auto sm:ml-0"
          >
            <Filter size={14} className="text-slate-500" />
            <span>{t('filter')}</span>
          </button>
        </div>
      </div>

      {/* Grid of Cards matching user reference screenshot */}
      {currentDisplayMode === 'doctors' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/30 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Card Top: Initials avatar, name, subtitle, status, 3-dots */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs ${doc.avatarColor}`}
                    >
                      {doc.avatar}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                        {doc.nameKey ? (t(doc.nameKey) || doc.name) : (doc.doctorNameKey ? (t(doc.doctorNameKey) || doc.name) : doc.name)}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        {doc.specialtyKey ? (t(doc.specialtyKey) || doc.specialty) : doc.specialty}
                      </p>
                      <div className="mt-2">{getStatusBadge(doc.status)}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors"
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>

                {/* 3 Key Stats Columns matching reference image */}
                <div className="grid grid-cols-3 gap-2 py-4 my-3 border-y border-slate-100 text-center">
                  <div>
                    <div className="text-lg font-black text-slate-900">{doc.patients}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t('patientsCol') || 'Patients'}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900">{doc.rating}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t('ratingCol') || 'Rating'}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900">{doc.experience}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t('expYearsCol') || 'Exp. Years'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Schedule button & quick action icons */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onSchedulePatient && onSchedulePatient({ doctor: doc.name })}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200/80 hover:border-emerald-300 rounded-xl transition-all"
                >
                  <Calendar size={13} />
                  <span>{t('schedule')}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`mailto:${doc.email}`}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/60"
                    title="Send Email"
                  >
                    <Mail size={14} />
                  </a>
                  <a
                    href={`tel:${doc.phone}`}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/60"
                    title="Direct Phone"
                  >
                    <Phone size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('patients')
                      setLocalSearch(doc.name)
                    }}
                    className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200/60"
                    title="View Assigned Patients"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Patients Cohort Cards styled in the same clean medical card system */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/30 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs ${patient.avatarColor}`}
                    >
                      {patient.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                          {patient.nameKey ? (t(patient.nameKey) || patient.name) : patient.name}
                        </h3>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                          {patient.mrn}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        {t('age') || 'Age'} {patient.age} • {patient.occupationKey ? (t(patient.occupationKey) || patient.occupation) : patient.occupation}
                      </p>
                      <div className="mt-2">{getStatusBadge(patient.riskLevel)}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPatient(patient)}
                    className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors"
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>

                {/* 3 Reproductive Biomarker Metrics Columns */}
                <div className="grid grid-cols-3 gap-2 py-4 my-3 border-y border-slate-100 text-center">
                  <div>
                    <div className="text-lg font-black text-slate-900">
                      {patient.semenParameters.concentration !== null
                        ? `${patient.semenParameters.concentration}`
                        : '—'}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t('concMMl') || 'Conc (M/mL)'}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900">
                      {patient.semenParameters.progressiveMotility !== null
                        ? `${patient.semenParameters.progressiveMotility}%`
                        : '—'}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t('motilityPct') || 'Motility (%)'}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900">
                      {patient.endocrine?.totalTestosterone
                        ? `${patient.endocrine.totalTestosterone}`
                        : '—'}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t('testoLevel') || 'Testo (ng/dL)'}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-1 italic mb-2">
                  <span className="font-semibold text-slate-600 not-italic">
                    {t('clinicalConcern') || 'Clinical Concern'}:
                  </span>{' '}
                  {patient.concernKey ? (t(patient.concernKey) || patient.primaryConcern) : patient.primaryConcern}
                </p>
              </div>

              {/* Card Action Footer */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onSchedulePatient(patient)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200/80 hover:border-emerald-300 rounded-xl transition-all"
                >
                  <Calendar size={13} />
                  <span>{t('schedule')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectPatient(patient)}
                  className="flex items-center gap-1.5 py-2 px-3.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
                >
                  <FileText size={13} />
                  <span>{t('viewDetails')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

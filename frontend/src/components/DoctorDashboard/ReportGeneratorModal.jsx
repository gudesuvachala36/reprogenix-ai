import { useState, useEffect } from 'react'
import {
  X,
  Printer,
  Download,
  FileText,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Award
} from 'lucide-react'
import { PATIENTS } from '../../data/mockData'

export default function ReportGeneratorModal({
  isOpen,
  onClose,
  selectedPatient,
  patientsList = PATIENTS,
  onSelectPatient,
  t = (k) => k
}) {
  const [activePatient, setActivePatient] = useState(selectedPatient || PATIENTS[0])

  useEffect(() => {
    if (selectedPatient) {
      setActivePatient(selectedPatient)
    }
  }, [selectedPatient])

  if (!isOpen) return null

  const patient = activePatient || selectedPatient || PATIENTS[0]

  const getTriageDetails = (tierStr) => {
    if (tierStr?.includes('Tier 0') || tierStr?.includes('Emergency')) {
      return {
        title: t('tier0TitleFull') || 'Tier 0: Acute Emergency Clinical Flag',
        desc: t('tier0DescFull') || 'Acute clinical emergency flag — severe symptoms or acute trauma detected. Immediate specialist intervention and emergency department evaluation required.'
      }
    }
    if (tierStr?.includes('Tier 1')) {
      return {
        title: t('tier1TitleFull') || 'Tier 1: Specialist Urology & Andrology Referral',
        desc: t('tier1DescFull') || 'Specialist referral required. Findings suggest clinically significant pathology (e.g., palpable varicocele, severe oligozoospermia, or endocrine axis impairment). Recommend scrotal Doppler ultrasound and hormonal workup within 2 weeks.'
      }
    }
    if (tierStr?.includes('Tier 2')) {
      return {
        title: t('tier2TitleFull') || 'Tier 2: Primary Care & Lifestyle Optimization',
        desc: t('tier2DescFull') || 'Primary care interventions and lifestyle optimization recommended: reduce scrotal heat exposure, improve sleep hygiene (≥7 hrs), adopt antioxidant-rich nutrition (CoQ10, Zinc, Selenium), increase moderate exercise to 4–5 days/week, and schedule a follow-up semen analysis after one full 72–90 day spermatogenesis cycle.'
      }
    }
    if (tierStr?.includes('Tier 3')) {
      return {
        title: t('tier3TitleFull') || 'Tier 3: Couple-Centred Subfertility Investigation',
        desc: t('tier3DescFull') || 'Couple-centred subfertility investigation warranted. Refer to andrology specialist for advanced semen analysis (DNA fragmentation, ROS assay), hormonal panel review, and parallel partner fertility evaluation. Consider tele-consultation for culturally sensitive guidance.'
      }
    }
    if (tierStr?.includes('Tier 4') || tierStr?.includes('Preventive')) {
      return {
        title: t('tier4TitleFull') || 'Tier 4: Preventive Self-Care & Monitoring',
        desc: t('tier4DescFull') || 'No immediate clinical concern identified. Continue routine preventive health practices including balanced nutrition, regular physical activity, adequate sleep (7–8 hrs), and annual reproductive health check-ups.'
      }
    }
    return {
      title: patient.triageTier || t('standardCare') || 'Standard Care',
      desc: t('reportRecommendationText') || 'Clinical recommendation pending further assessment. Please consult your attending clinician for a personalized care pathway.'
    }
  }

  const triageDetails = getTriageDetails(patient.triageTier)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto print:p-0 print:m-0 print:bg-white print:static print:block print:overflow-visible">
            <style>{`
        @media print {
          @page { margin: 8mm; size: auto; }
          body { margin: 0 !important; padding: 0 !important; }
          #printable-report { margin-top: 0 !important; padding-top: 0 !important; }
        }
      `}</style>
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto print:my-0 print:max-w-none print:w-full print:max-h-none print:rounded-none print:shadow-none print:border-0 print:m-0 print:p-0 print:overflow-visible">
        {/* Top bar with Patient Selector, Print, and Download actions (hidden during print) */}
        <div className="bg-[#08283a] text-white p-3.5 sm:p-4 px-4 sm:px-6 flex items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
            <FileText size={18} className="text-[#0c9d91] flex-shrink-0" />
            <h3 className="text-xs sm:text-sm font-extrabold tracking-tight truncate">
              {t('reportTitle') || 'Clinical Semen & Endocrine Report'}
            </h3>

            {/* Patient Switcher Dropdown for Header Report Generation */}
            {patientsList && patientsList.length > 0 && (
              <div className="flex items-center gap-1.5 bg-[#0e3b52] px-2 py-1 rounded-xl border border-teal-500/25">
                <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider hidden md:inline">
                  {t('patientLabel') || 'Patient:'}
                </span>
                <select
                  value={patient.id}
                  onChange={(e) => {
                    const found = patientsList.find((p) => p.id === e.target.value)
                    if (found) {
                      setActivePatient(found)
                      if (onSelectPatient) onSelectPatient(found)
                    }
                  }}
                  className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer pr-1"
                >
                  {patientsList.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#08283a] text-white">
                      {p.name} ({p.mrn})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] rounded-xl transition-colors shadow-xs"
              title={t('printSinglePage') || 'Print report on single page'}
            >
              <Printer size={13} />
              <span className="hidden sm:inline">{t('printReport') || 'Print Report'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl transition-colors"
              title={t('close') || 'Close'}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Report Printable Document Body - Optimized for 1-Page Output */}
        <div
          className="p-5 sm:p-7 overflow-y-auto space-y-4 text-slate-800 bg-white print:p-0 print:pt-0 print:mt-0 print:space-y-2 print:overflow-visible print:w-full print:m-0"
          id="printable-report"
        >
          {/* Document Letterhead */}
          <div className="flex justify-between items-start border-b-2 border-[#08283a] pb-3 print:pb-2 print:break-inside-avoid">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl print:text-lg font-black tracking-tight text-[#08283a]">REPROGENIX AI</span>
                <span className="text-[10px] print:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#dff5f1] text-[#087e78] print:border print:border-[#087e78]/30">
                  {t('reportClinicalHeader') || 'CLINICAL REPORT'}
                </span>
              </div>
              <p className="text-[11px] print:text-[10px] text-slate-500 font-medium mt-0.5">
                {t('reportSubtitle')}
              </p>
              <p className="text-[10px] print:text-[9px] text-slate-400">
                {t('reportAccreditation')}
              </p>
            </div>

            <div className="text-right text-xs print:text-[11px]">
              <div className="font-mono font-bold text-[#08283a]">{patient.mrn}</div>
              <div className="text-slate-500 text-[11px] print:text-[10px]">
                {t('reportDateLabel') || 'Report Date:'} Nov 16, 2025
              </div>
              <div className="text-slate-400 text-[10px] print:text-[9px]">
                {t('reportVersionLabel') || 'Version 2.4.0 (Calibrated)'}
              </div>
            </div>
          </div>

          {/* Patient Demographics Box */}
          <div className="bg-slate-50 p-3.5 print:p-2 rounded-2xl print:rounded-xl border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs print:text-[11px] print:break-inside-avoid">
            <div>
              <span className="text-slate-400 text-[10px] print:text-[9px] font-bold uppercase">{t('fullName')}</span>
              <div className="font-extrabold text-[#08283a]">{patient.nameKey ? (t(patient.nameKey) || patient.name) : patient.name}</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] print:text-[9px] font-bold uppercase">{t('ageYears')}</span>
              <div className="font-semibold text-slate-800">{patient.age} {t('yrsMale') || 'Yrs / Male'}</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] print:text-[9px] font-bold uppercase">
                {t('attendingClinician') || 'Attending Clinician'}
              </span>
              <div className="font-semibold text-slate-800">{patient.doctorNameKey ? (t(patient.doctorNameKey) || patient.doctor) : patient.doctor}</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] print:text-[9px] font-bold uppercase">
                {t('triageClassification') || 'Triage Classification'}
              </span>
              <div className="font-extrabold text-[#087e78]">{patient.riskLevel === 'High Risk' ? (t('highRisk') || 'High Risk') : patient.riskLevel === 'Moderate Risk' ? (t('moderateRisk') || 'Moderate Risk') : (t('lowRisk') || 'Low Risk')}</div>
            </div>
          </div>

          {/* 1. Diagnostic Findings & Semen Analysis */}
          <div className="print:break-inside-avoid">
            <h4 className="text-xs print:text-[11px] font-black uppercase tracking-wider text-[#08283a] mb-1.5 border-b border-slate-200 pb-1">
              {t('reportFindings')}
            </h4>
            <table className="w-full text-xs print:text-[11px] text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] print:text-[9px]">
                  <th className="py-1 print:py-0.5">{t('parameter')}</th>
                  <th className="py-1 print:py-0.5">{t('measuredValue')}</th>
                  <th className="py-1 print:py-0.5">{t('referenceLimit')}</th>
                  <th className="py-1 print:py-0.5">{t('clinicalStatus')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-1.5 print:py-0.5 font-medium">{t('ejaculateVolume') || 'Ejaculate Volume'}</td>
                  <td className="py-1.5 print:py-0.5 font-bold text-[#08283a]">{patient.semenParameters.volume} mL</td>
                  <td className="py-1.5 print:py-0.5 text-slate-500">≥ 1.4 mL</td>
                  <td className="py-1.5 print:py-0.5 font-semibold text-[#087e78]">{t('normospermia') || 'Normospermia'}</td>
                </tr>
                <tr>
                  <td className="py-1.5 print:py-0.5 font-medium">{t('spermConc')}</td>
                  <td className="py-1.5 print:py-0.5 font-bold text-[#08283a]">{patient.semenParameters.concentration} M/mL</td>
                  <td className="py-1.5 print:py-0.5 text-slate-500">≥ 16.0 M/mL</td>
                  <td className="py-1.5 print:py-0.5 font-semibold text-amber-600">
                    {patient.semenParameters.concentration < 16 ? (t('borderlineOligo') || 'Borderline / Oligo') : (t('normal') || 'Normal')}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 print:py-0.5 font-medium">{t('motilityPct')} (PR)</td>
                  <td className="py-1.5 print:py-0.5 font-bold text-[#08283a]">{patient.semenParameters.progressiveMotility}%</td>
                  <td className="py-1.5 print:py-0.5 text-slate-500">≥ 30.0%</td>
                  <td className="py-1.5 print:py-0.5 font-semibold text-amber-600">
                    {patient.semenParameters.progressiveMotility < 30 ? (t('asthenozoospermia') || 'Asthenozoospermia') : (t('normal') || 'Normal')}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 print:py-0.5 font-medium">{t('normalMorphologyStrict') || 'Normal Morphology (Strict)'}</td>
                  <td className="py-1.5 print:py-0.5 font-bold text-[#08283a]">{patient.semenParameters.normalMorphology}%</td>
                  <td className="py-1.5 print:py-0.5 text-slate-500">≥ 4.0%</td>
                  <td className="py-1.5 print:py-0.5 font-semibold text-[#087e78]">{t('normal') || 'Normal'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2. Endocrine HPG Axis Profile */}
          {patient.endocrine && (
            <div className="print:break-inside-avoid">
              <h4 className="text-xs print:text-[11px] font-black uppercase tracking-wider text-[#08283a] mb-1.5 border-b border-slate-200 pb-1">
                {t('reportEndocrine')}
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs print:text-[11px] bg-slate-50 p-2.5 print:p-2 rounded-xl border border-slate-200/60">
                <div>
                  <span className="text-[10px] print:text-[9px] text-slate-400 font-bold uppercase">{t('testoLevel')}</span>
                  <div className="font-extrabold text-[#08283a] mt-0.5">
                    {patient.endocrine.totalTestosterone} ng/dL
                  </div>
                  <span className="text-[10px] print:text-[9px] text-slate-500">{t('referenceRange') || 'Reference:'} 300 - 1000</span>
                </div>
                <div>
                  <span className="text-[10px] print:text-[9px] text-slate-400 font-bold uppercase">{t('serumFsh') || 'Serum FSH'}</span>
                  <div className="font-extrabold text-[#08283a] mt-0.5">{patient.endocrine.fsh} mIU/mL</div>
                  <span className="text-[10px] print:text-[9px] text-slate-500">{t('referenceRange') || 'Reference:'} 1.5 - 12.4</span>
                </div>
                <div>
                  <span className="text-[10px] print:text-[9px] text-slate-400 font-bold uppercase">{t('serumLh') || 'Serum LH'}</span>
                  <div className="font-extrabold text-[#08283a] mt-0.5">{patient.endocrine.lh} mIU/mL</div>
                  <span className="text-[10px] print:text-[9px] text-slate-500">{t('referenceRange') || 'Reference:'} 1.7 - 8.6</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Safe Triage Recommendation & Pathway */}
          <div className="print:break-inside-avoid">
            <h4 className="text-xs print:text-[11px] font-black uppercase tracking-wider text-[#08283a] mb-1.5 border-b border-slate-200 pb-1">
              {t('reportRecommendation')}
            </h4>
            <div className="p-3 print:p-2 bg-[#dff5f1]/60 rounded-xl border border-[#0c9d91]/30 text-xs print:text-[11px] text-[#08283a] space-y-1 print:space-y-0.5">
              <div className="font-bold text-[#087e78]">{triageDetails.title}</div>
              <p className="text-slate-700 leading-relaxed print:text-[10px]">
                {triageDetails.desc}
              </p>
            </div>
          </div>

          {/* Signatures & Accreditation Footer */}
          <div className="pt-3 print:pt-2 border-t border-slate-200 flex items-center justify-between text-xs print:text-[11px] print:break-inside-avoid">
            <div>
              <div className="font-bold text-[#08283a]">{patient.doctorNameKey ? (t(patient.doctorNameKey) || patient.doctor) : patient.doctor}</div>
              <div className="text-[11px] print:text-[10px] text-slate-500">{t('verifiedBy')}</div>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-slate-700 text-[10px] print:text-[9px]">{t('digitallyVerified')}</div>
              <div className="text-[10px] print:text-[9px] text-[#087e78] font-semibold">
                {t('zeroPiiExecution') || 'Zero-PII Ephemeral Execution'}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (hidden during print) */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {t('close')}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0c9d91] hover:bg-[#087e78] rounded-xl shadow-xs transition-colors"
            title="Export clean 1-page PDF"
          >
            <Download size={14} />
            <span>{t('exportPdf')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

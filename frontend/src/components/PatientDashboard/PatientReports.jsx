import { useState } from 'react'
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  FileSpreadsheet,
  Calendar,
  Filter,
  Search
} from 'lucide-react'
import { PATIENT_REPORTS } from '../../data/mockData'

export default function PatientReports({
  onOpenReportModal,
  searchQuery = '',
  currentLang = 'en',
  t = (k) => k
}) {
  const [filterType, setFilterType] = useState('ALL')

  const filteredReports = PATIENT_REPORTS.filter((rep) => {
    if (filterType === 'SEMEN' && !rep.type.includes('Semen')) return false
    if (filterType === 'ENDOCRINE' && !rep.type.includes('Endocrine')) return false

    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim()
      const match =
        rep.title?.toLowerCase().includes(q) ||
        rep.type?.toLowerCase().includes(q) ||
        rep.format?.toLowerCase().includes(q) ||
        rep.status?.toLowerCase().includes(q) ||
        rep.date?.toLowerCase().includes(q)
      if (!match) return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t('reports')}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {t('patientReportsSub') || 'Access, view, and export your accredited laboratory findings and reproductive AI summaries.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              filterType === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {t('allReportsFilter') || 'All Reports'} ({PATIENT_REPORTS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('SEMEN')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              filterType === 'SEMEN'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {t('semenAnalysisFilter') || 'Semen Analysis'}
          </button>
          <button
            type="button"
            onClick={() => setFilterType('ENDOCRINE')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              filterType === 'ENDOCRINE'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {t('endocrinePanelFilter') || 'Endocrine Panel'}
          </button>
        </div>
      </div>

      {/* Search Filter Notice */}
      {searchQuery && (
        <div className="px-3 py-2 bg-slate-100 rounded-xl text-xs text-slate-600 flex items-center justify-between">
          <span>
            {t('searchResultsFor')}: <strong>"{searchQuery}"</strong> • {filteredReports.length} {t('searchMatchesCount')}
          </span>
        </div>
      )}

      {/* Reports List */}
      <div className="space-y-3.5">
        {filteredReports.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
            {t('noSearchResults')}
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-emerald-100">
                  <FileText size={22} />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base font-extrabold text-slate-900">
                      {report.titleKey ? (t(report.titleKey) || report.title) : report.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {report.format} • {report.size}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 size={11} /> {t('verifiedSignedStatus') || report.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-2">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{t('dateLabel') || 'Date'}: {report.date}</span>
                    <span>•</span>
                    <span>{t('categoryLabel') || 'Category'}: {report.typeKey ? (t(report.typeKey) || report.type) : report.type}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                  type="button"
                  onClick={onOpenReportModal}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-colors shadow-2xs"
                >
                  <Eye size={14} className="text-[#087e78]" />
                  <span>{t('viewReportBtn') || 'View Report'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenReportModal}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
                >
                  <Download size={14} />
                  <span>{t('downloadPdfBtn') || 'Download PDF'}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

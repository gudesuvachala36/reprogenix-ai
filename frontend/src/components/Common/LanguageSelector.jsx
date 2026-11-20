import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { SUPPORTED_LANGUAGES } from '../../i18n/translations'

export default function LanguageSelector({ currentLang, onSelectLang }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const activeLang = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0]

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-emerald-500/40 shadow-sm transition-all duration-150"
        title="Select Language / Seleccionar Idioma"
      >
        <span className="text-base leading-none">{activeLang.flag}</span>
        <span className="hidden sm:inline font-medium text-slate-800">{activeLang.native}</span>
        <span className="sm:hidden font-bold uppercase text-[10px]">{activeLang.code}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-black/5 border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Language / لغة</span>
          </div>
          <div className="space-y-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLang
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    onSelectLang(lang.code)
                    setOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-medium transition-colors ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div className="flex flex-col text-left">
                      <span className="leading-tight">{lang.native}</span>
                      <span className="text-[10px] text-slate-400 leading-tight">{lang.name}</span>
                    </div>
                  </div>
                  {isSelected && <Check size={14} className="text-emerald-600" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

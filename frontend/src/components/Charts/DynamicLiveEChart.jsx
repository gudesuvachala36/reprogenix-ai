import { useState, useEffect, useRef } from 'react'
import ReactECharts from 'echarts-for-react'
import { Activity, Play, Pause, RefreshCw, Zap, TrendingUp, ShieldCheck } from 'lucide-react'

export default function DynamicLiveEChart({
  title,
  subtitle,
  mode = 'patient', // 'patient' or 'doctor'
  patientName = 'Marcus Vance',
  t = (k) => k,
  currentLang = 'en'
}) {
  const [isLive, setIsLive] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState('thermal') // 'thermal', 'motility', 'endocrine'
  const [timeWindow, setTimeWindow] = useState('realtime') // 'realtime', '24h', '72d'
  const echartsRef = useRef(null)

  const effectiveTitle = title || t('liveTelemetryTitle') || 'Real-Time Biological & Thermal Telemetry'
  const effectiveSubtitle = subtitle || t('liveTelemetrySub') || 'Continuous non-invasive scrotal thermal index & kinetic motility telemetry'

  // Initial Real-time streaming series data
  const [seriesData, setSeriesData] = useState(() => {
    const initialPoints = []
    const now = new Date()
    for (let i = 15; i >= 0; i--) {
      const timeStr = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date(now.getTime() - i * 2000))

      initialPoints.push({
        time: timeStr,
        temp: +(33.8 + Math.sin(i * 0.4) * 0.4 + (Math.random() * 0.2 - 0.1)).toFixed(2),
        motility: +(28.5 + (15 - i) * 0.15 + (Math.random() * 0.4 - 0.2)).toFixed(1),
        testo: +(378 + Math.cos(i * 0.3) * 6 + (Math.random() * 4 - 2)).toFixed(0)
      })
    }
    return initialPoints
  })

  // Live interval simulation: appends dynamic point every 2.5s
  useEffect(() => {
    if (!isLive || timeWindow !== 'realtime') return

    const interval = setInterval(() => {
      setSeriesData((prev) => {
        const last = prev[prev.length - 1]
        const now = new Date()
        const timeStr = new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now)

        // Micro-fluctuation around physiological normal
        const deltaT = (Math.random() - 0.48) * 0.18
        const newTemp = Math.min(35.5, Math.max(33.2, +(last.temp + deltaT).toFixed(2)))
        const newMotility = Math.min(42, Math.max(25, +(last.motility + (Math.random() - 0.45) * 0.25).toFixed(1)))
        const newTesto = Math.min(450, Math.max(350, +(last.testo + (Math.random() - 0.5) * 3).toFixed(0)))

        const updated = [...prev.slice(1), { time: timeStr, temp: newTemp, motility: newMotility, testo: newTesto }]
        return updated
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [isLive, timeWindow])

  // Get current active value
  const latestPoint = seriesData[seriesData.length - 1] || { temp: 34.1, motility: 29.2, testo: 382 }

  // Configure ECharts Dynamic Options
  const getChartOption = () => {
    let yName = `${t('scrotalTempMetric') || 'Scrotal Surface Temp'} (°C)`
    let seriesName = t('scrotalTempMetric') || 'Scrotal Surface Temp'
    let unit = '°C'
    let dataVals = []
    let lineColor = '#0c9d91'
    let gradientStart = 'rgba(12, 157, 145, 0.40)'
    let gradientEnd = 'rgba(12, 157, 145, 0.02)'
    let markThreshold = 35.0
    let thresholdLabel = t('safetyFloorLabel') || 'Safety Floor (<35.0°C)'

    if (selectedMetric === 'thermal') {
      yName = `${t('scrotalTempMetric') || 'Scrotal Surface Temp'} (°C)`
      seriesName = t('scrotalTempMetric') || 'Scrotal Surface Temp'
      unit = '°C'
      dataVals = seriesData.map((d) => d.temp)
      lineColor = '#0c9d91'
      gradientStart = 'rgba(12, 157, 145, 0.40)'
      gradientEnd = 'rgba(12, 157, 145, 0.02)'
      markThreshold = 35.0
      thresholdLabel = t('safetyFloorLabel') || 'Safety Floor (<35.0°C)'
    } else if (selectedMetric === 'motility') {
      yName = `${t('progressiveMotilityMetric') || 'Progressive Motility'} (%)`
      seriesName = t('progressiveMotilityMetric') || 'Progressive Motility'
      unit = '%'
      dataVals = seriesData.map((d) => d.motility)
      lineColor = '#087e78'
      gradientStart = 'rgba(8, 126, 120, 0.40)'
      gradientEnd = 'rgba(8, 126, 120, 0.02)'
      markThreshold = 30.0
      thresholdLabel = t('whoFloorLabel') || 'WHO 6th Ed Floor (30%)'
    } else if (selectedMetric === 'endocrine') {
      yName = `${t('testosteroneMetric') || 'Total Testosterone'} (ng/dL)`
      seriesName = t('testosteroneMetric') || 'Total Testosterone'
      unit = 'ng/dL'
      dataVals = seriesData.map((d) => d.testo)
      lineColor = '#08283a'
      gradientStart = 'rgba(8, 40, 58, 0.35)'
      gradientEnd = 'rgba(8, 40, 58, 0.02)'
      markThreshold = 300
      thresholdLabel = t('hypogonadalFloorLabel') || 'Hypogonadal Floor (300 ng/dL)'
    }

    const bandLabel = t('optimalPhysiologicalBand') || 'Safe Physiological Band: Optimal'

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#08283a',
        borderColor: '#0c9d91',
        borderWidth: 1,
        textStyle: { color: '#ffffff', fontSize: 11 },
        formatter: (params) => {
          if (!params || !params[0]) return ''
          const item = params[0]
          return `<div style="font-weight: bold; margin-bottom: 2px;">${item.name}</div>
                  <div style="color: #61d6c3;">● ${seriesName}: <b>${item.value} ${unit}</b></div>
                  <div style="font-size: 10px; color: #cbd5e1; margin-top: 2px;">${bandLabel}</div>`
        }
      },
      legend: {
        data: [seriesName],
        top: 0,
        textStyle: { fontSize: 11, color: '#334155', fontWeight: 600 }
      },
      grid: {
        left: '2%',
        right: '4%',
        bottom: '8%',
        top: '38px',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: seriesData.map((d) => d.time),
        axisLine: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: { color: '#64748b', fontSize: 10, rotate: 0 }
      },
      yAxis: {
        type: 'value',
        name: yName,
        nameTextStyle: { color: '#64748b', fontSize: 10, padding: [0, 0, 0, 10] },
        scale: true,
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
        axisLabel: { color: '#64748b', fontSize: 10 }
      },
      series: [
        {
          name: seriesName,
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: dataVals,
          lineStyle: { width: 3, color: lineColor },
          itemStyle: { color: lineColor },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: gradientStart },
                { offset: 1, color: gradientEnd }
              ]
            }
          },
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: { color: '#f43f5e', type: 'dashed', width: 1.5 },
            data: [
              {
                yAxis: markThreshold,
                label: {
                  formatter: thresholdLabel,
                  position: 'insideEndTop',
                  fontSize: 10,
                  color: '#e11d48'
                }
              }
            ]
          }
        }
      ]
    }
  }

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
      {/* Top Header with Live Indicator & Metric Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-extrabold text-[#08283a] tracking-tight">
              {effectiveTitle}
            </h3>
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/60 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {t('liveStreamBtn') || 'LIVE STREAM'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                {t('pausedBtn') || 'PAUSED'}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{effectiveSubtitle}</p>
        </div>

        {/* Action Controls: Live Toggle & Metric Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSelectedMetric('thermal')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedMetric === 'thermal'
                  ? 'bg-white text-[#087e78] font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('scrotalTempMetric') || 'Scrotal Temp'} (°C)
            </button>
            <button
              type="button"
              onClick={() => setSelectedMetric('motility')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedMetric === 'motility'
                  ? 'bg-white text-[#087e78] font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('progressiveMotilityMetric') || 'Motility'} (%)
            </button>
            <button
              type="button"
              onClick={() => setSelectedMetric('endocrine')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedMetric === 'endocrine'
                  ? 'bg-white text-[#087e78] font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('testosteroneMetric') || 'Testo'} (ng/dL)
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border ${
              isLive
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600 shadow-xs'
            }`}
            title={isLive ? (t('pauseLiveStream') || 'Pause Live Stream') : (t('resumeLiveStream') || 'Resume Live Stream')}
          >
            {isLive ? <Pause size={12} /> : <Play size={12} />}
            <span>{isLive ? (t('pauseBtn') || 'Pause') : (t('resumeBtn') || 'Resume')}</span>
          </button>
        </div>
      </div>

      {/* Real-Time Live Status Pill Box */}
      <div className="grid grid-cols-3 gap-3 p-3 bg-gradient-to-r from-slate-50 via-[#dff5f1]/30 to-slate-50 rounded-2xl border border-slate-200/60 text-center">
        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400">
            {t('scrotalTempMetric') || 'Current Temp'}
          </span>
          <div className="text-base sm:text-lg font-black text-[#08283a] flex items-center justify-center gap-1">
            <span>{latestPoint.temp}°C</span>
            <span className="text-[10px] font-bold text-emerald-600">Norm</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400">
            {t('progressiveMotilityMetric') || 'Active Motility'}
          </span>
          <div className="text-base sm:text-lg font-black text-[#087e78] flex items-center justify-center gap-1">
            <span>{latestPoint.motility}%</span>
            <span className="text-[10px] font-bold text-emerald-600">+1.2%</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400">
            {t('testosteroneMetric') || 'Total Testo'}
          </span>
          <div className="text-base sm:text-lg font-black text-[#08283a] flex items-center justify-center gap-1">
            <span>{latestPoint.testo}</span>
            <span className="text-[10px] text-slate-400 font-normal">ng/dL</span>
          </div>
        </div>
      </div>

      {/* Main ECharts Canvas */}
      <div className="w-full">
        <ReactECharts
          ref={echartsRef}
          option={getChartOption()}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: '270px', width: '100%' }}
        />
      </div>

      {/* Bottom Clinical Insight */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
        <span className="flex items-center gap-1.5 font-semibold text-[#087e78]">
          <ShieldCheck size={14} className="text-[#0c9d91]" />
          {t('footerAua') || 'Intra-testicular normothermia maintained (ideal: 2.0°C below core body temperature)'}
        </span>
        <span className="text-[11px] text-slate-400">
          WHO 6th Ed • Zero Persistent PII
        </span>
      </div>
    </div>
  )
}

import ReactECharts from 'echarts-for-react'

// 1. Radar Chart: Multi-domain reproductive health profile
export function ReproductiveBiomarkerRadar({ patient, t = (k) => k, currentLang = 'en' }) {
  const conc = patient?.semenParameters?.concentration || 14
  const motility = patient?.semenParameters?.progressiveMotility || 29
  const morph = (patient?.semenParameters?.normalMorphology || 3.5) * 10
  const testo = ((patient?.endocrine?.totalTestosterone || 380) / 1000) * 100
  const sleep = ((patient?.lifestyle?.sleepHours || 6.5) / 9) * 100
  const thermal = 65 // Thermal regulation score

  const currentLabel = t('patientCurrentSeries') || 'Patient Current'
  const optimalLabel = t('optimalBenchmarkSeries') || 'Optimal Benchmark'
  const whoLabel = t('who5thPercentileSeries') || 'WHO 5th %ile'

  const option = {
    color: ['#0c9d91', '#08283a', '#e11d48'],
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
      textStyle: { fontSize: 11, color: '#475569', fontWeight: 600 },
      data: [currentLabel, optimalLabel, whoLabel]
    },
    radar: {
      shape: 'polygon',
      indicator: [
        { name: t('concAxis') || 'Concentration', max: 100 },
        { name: t('motilityAxis') || 'Motility %', max: 100 },
        { name: t('morphologyAxis') || 'Morphology', max: 100 },
        { name: t('testoAxis') || 'Testosterone', max: 100 },
        { name: t('sleepQualityAxis') || 'Sleep Quality', max: 100 },
        { name: t('thermalDefenseAxis') || 'Thermal Defense', max: 100 }
      ],
      axisName: {
        color: '#08283a',
        fontWeight: 'bold',
        fontSize: 10
      },
      splitArea: {
        areaStyle: {
          color: ['#f8fafc', '#f1f5f9', '#f8fafc', '#ecfdf5']
        }
      },
      splitLine: {
        lineStyle: { color: '#e2e8f0' }
      }
    },
    series: [
      {
        name: t('radarChartTitle') || 'Biomarker Profile',
        type: 'radar',
        data: [
          {
            value: [conc * 2, motility * 1.5, morph * 2, testo, sleep, thermal],
            name: currentLabel,
            areaStyle: { color: 'rgba(12, 157, 145, 0.25)' },
            lineStyle: { width: 2.5, color: '#0c9d91' },
            itemStyle: { color: '#0c9d91' }
          },
          {
            value: [90, 85, 80, 85, 90, 95],
            name: optimalLabel,
            areaStyle: { color: 'rgba(8, 40, 58, 0.08)' },
            lineStyle: { width: 1.5, type: 'dashed', color: '#08283a' },
            itemStyle: { color: '#08283a' }
          },
          {
            value: [32, 45, 40, 30, 50, 40],
            name: whoLabel,
            lineStyle: { width: 1.5, type: 'dotted', color: '#e11d48' },
            itemStyle: { color: '#e11d48' }
          }
        ]
      }
    ]
  }

  return <ReactECharts option={option} style={{ height: '280px', width: '100%' }} />
}

// 2. Spline Area Chart: 72-Day Spermatogenesis Reversibility Trajectory
export function SpermatogenesisSplineChart({ t = (k) => k, currentLang = 'en' }) {
  const motilityLabel = t('splineMotilitySeries') || 'Progressive Motility (%)'
  const concLabel = t('splineConcSeries') || 'Sperm Conc (M/mL)'
  const morphLabel = t('splineMorphologySeries') || 'Strict Morphology (%)'

  const d0Label = t('day0Baseline') || 'Day 0\n(Baseline)'
  const d25Label = t('day25Mitotic') || 'Day 25\n(Mitotic Phase)'
  const d50Label = t('day50Spermiogenesis') || 'Day 50\n(Spermiogenesis)'
  const d72Label = t('day72FullCycle') || 'Day 72\n(Full Cycle)'

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross', label: { backgroundColor: '#08283a' } }
    },
    legend: {
      data: [motilityLabel, concLabel, morphLabel],
      top: 0,
      textStyle: { fontSize: 11, color: '#475569', fontWeight: 600 }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '40px', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [d0Label, d25Label, d50Label, d72Label],
      axisLabel: { color: '#64748b', fontSize: 10, fontWeight: 600 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b', fontSize: 10 }
    },
    series: [
      {
        name: motilityLabel,
        type: 'line',
        smooth: true,
        data: [22, 26, 33, 42],
        lineStyle: { width: 3, color: '#0c9d91' },
        itemStyle: { color: '#0c9d91' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(12, 157, 145, 0.4)' },
              { offset: 1, color: 'rgba(12, 157, 145, 0.02)' }
            ]
          }
        }
      },
      {
        name: concLabel,
        type: 'line',
        smooth: true,
        data: [11, 13, 16, 22],
        lineStyle: { width: 2.5, color: '#08283a' },
        itemStyle: { color: '#08283a' }
      },
      {
        name: morphLabel,
        type: 'line',
        smooth: true,
        data: [2.8, 3.2, 3.9, 4.8],
        lineStyle: { width: 2, color: '#0284c7', type: 'dashed' },
        itemStyle: { color: '#0284c7' }
      }
    ]
  }

  return <ReactECharts option={option} style={{ height: '260px', width: '100%' }} />
}

// 3. Cohort Safe Triage Donut Chart (Enhanced with Center Metric & Aligned Multi-Lingual Legends)
export function SafeTriageDonutChart({ t = (k) => k, currentLang = 'en' }) {
  const tier4Name = t('tier4Title') || 'Tier 4: Preventive'
  const tier2Name = t('tier2Title') || 'Tier 2: Primary Care'
  const tier1Name = t('tier1Title') || 'Tier 1: Specialist Andrology'
  const tier3Name = t('tier3Title') || 'Tier 3: Couple Subfertility'
  const tier0Name = t('tier0Title') || 'Tier 0: Emergency Scrotal'
  const patientsWord = t('patientsUnit') || 'patients'
  const seriesName = t('safeReferralTier') || 'Safe Referral Tier'
  const totalCohortWord = t('totalCohortLabel') || 'Total Cohort'

  const tierData = [
    { value: 313, name: tier4Name, color: '#0c9d91', pct: '25.0%' },
    { value: 420, name: tier2Name, color: '#f59e0b', pct: '33.6%' },
    { value: 270, name: tier1Name, color: '#ea580c', pct: '21.6%' },
    { value: 215, name: tier3Name, color: '#0284c7', pct: '17.2%' },
    { value: 32, name: tier0Name, color: '#e11d48', pct: '2.6%' }
  ]

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#08283a',
      borderColor: '#0c9d91',
      borderWidth: 1,
      textStyle: { color: '#ffffff', fontSize: 11 },
      formatter: (params) => {
        return `<div style="font-weight: bold; margin-bottom: 2px;">${params.name}</div>
                <div style="color: #61d6c3;">● ${params.value} ${patientsWord} (<b>${params.percent}%</b>)</div>
                <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">${t('whoAuaProtocol') || 'WHO / AUA Protocol'}</div>`
      }
    },
    // Centered donut hole graphic with Total Cohort count
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '38%',
        style: {
          text: '1,250',
          fill: '#08283a',
          fontSize: 22,
          fontWeight: '900',
          textAlign: 'center'
        }
      },
      {
        type: 'text',
        left: 'center',
        top: '48%',
        style: {
          text: totalCohortWord,
          fill: '#64748b',
          fontSize: 10,
          fontWeight: '700',
          textAlign: 'center'
        }
      }
    ],
    // Clean, aligned legend positioned at bottom
    legend: {
      orient: 'horizontal',
      bottom: '0%',
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10,
      textStyle: { fontSize: 10, color: '#334155', fontWeight: 600 },
      formatter: (name) => {
        const found = tierData.find((d) => d.name === name)
        return found ? `${name} (${found.value})` : name
      }
    },
    series: [
      {
        name: seriesName,
        type: 'pie',
        radius: ['50%', '72%'],
        center: ['50%', '44%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: {
          scale: true,
          scaleSize: 8,
          label: {
            show: true,
            fontSize: 11,
            fontWeight: 'bold',
            formatter: '{b}\n{c} ({d}%)'
          }
        },
        data: tierData.map((d) => ({
          value: d.value,
          name: d.name,
          itemStyle: { color: d.color }
        }))
      }
    ]
  }

  return (
    <div className="space-y-3">
      <ReactECharts option={option} style={{ height: '280px', width: '100%' }} />

      {/* Structured, responsive legend badges for complete alignment */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-1 text-center">
        {tierData.map((tier) => (
          <div
            key={tier.name}
            className="p-1.5 rounded-xl border border-slate-200/70 bg-slate-50/60 flex flex-col items-center justify-center text-[10px]"
          >
            <div className="flex items-center gap-1 font-bold text-slate-800 truncate max-w-full">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: tier.color }} />
              <span className="truncate">{tier.name}</span>
            </div>
            <div className="text-slate-500 font-semibold mt-0.5">
              <strong className="text-slate-900">{tier.value}</strong> ({tier.pct})
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 4. Circular Gauge: 72-Day Spermatogenesis Day
export function SpermatogenesisGauge({ currentDay = 48, totalDays = 75, t = (k) => k, currentLang = 'en' }) {
  const percentage = Math.round((currentDay / totalDays) * 100)
  const dayWord = t('today') || 'Day'

  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: totalDays,
        splitNumber: 5,
        radius: '90%',
        center: ['50%', '65%'],
        itemStyle: { color: '#0c9d91' },
        progress: {
          show: true,
          roundCap: true,
          width: 14
        },
        pointer: { show: false },
        axisLine: {
          roundCap: true,
          lineStyle: { width: 14, color: [[1, '#e2e8f0']] }
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        title: {
          show: true,
          fontSize: 11,
          color: '#64748b',
          offsetCenter: [0, '28%']
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '-22%'],
          fontSize: 20,
          fontWeight: '900',
          formatter: `${dayWord} ${currentDay}`,
          color: '#08283a'
        },
        data: [{ value: currentDay, name: `${currentDay}/${totalDays} (${percentage}%)` }]
      }
    ]
  }

  return <ReactECharts option={option} style={{ height: '170px', width: '100%' }} />
}

// 5. Patient Dashboard: Biomarker Progress Comparison Bar Chart (Baseline vs Current vs Target)
export function PatientBiomarkerGainsBarChart({ t = (k) => k, currentLang = 'en' }) {
  const baselineLabel = t('day0Baseline')?.replace('\n', ' ') || 'Baseline (Day 0)'
  const currentLabel = t('patientCurrentSeries') || 'Current (Day 48)'
  const targetLabel = t('cycleMilestonesTitle') || '72-Day Target'

  const motilityCat = t('motilityAxis') || 'Motility (%)'
  const concCat = t('concAxis') || 'Conc (M/mL)'
  const testoCat = t('testoAxis') || 'Testosterone (x10)'
  const sleepCat = t('sleepQualityAxis') || 'Sleep (Hrs)'

  const option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: {
      data: [baselineLabel, currentLabel, targetLabel],
      top: 0,
      textStyle: { fontSize: 10, color: '#475569', fontWeight: 600 }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '35px', containLabel: true },
    xAxis: {
      type: 'category',
      data: [motilityCat, concCat, testoCat, sleepCat],
      axisLabel: { color: '#08283a', fontSize: 10, fontWeight: 'bold' }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b', fontSize: 10 }
    },
    series: [
      {
        name: baselineLabel,
        type: 'bar',
        data: [22, 11, 34, 5.5],
        itemStyle: { color: '#94a3b8', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: currentLabel,
        type: 'bar',
        data: [29, 14, 38, 6.8],
        itemStyle: { color: '#0c9d91', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: targetLabel,
        type: 'bar',
        data: [40, 22, 45, 7.5],
        itemStyle: { color: '#08283a', borderRadius: [4, 4, 0, 0] }
      }
    ]
  }

  return <ReactECharts option={option} style={{ height: '220px', width: '100%' }} />
}

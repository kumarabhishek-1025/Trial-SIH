'use client'

import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import { EnergyFlowScene } from '@/components/battx-extra-scenes'
import { SafeCanvas } from '@/components/safe-canvas'
import { AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { Brain, TrendingUp, AlertTriangle, ChevronRight, BarChart3, Eye, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const Panel = ({ children, className = '' }: any) => <section className={`panel ${className}`}>{children}</section>

const shapData = [
  { feature: 'DCIR', impact: -12.4, direction: 'negative' },
  { feature: 'Avg Temp', impact: -8.2, direction: 'negative' },
  { feature: 'Cycle Count', impact: -6.1, direction: 'negative' },
  { feature: 'Charge Rate', impact: +3.8, direction: 'positive' },
  { feature: 'Depth of Discharge', impact: -5.5, direction: 'negative' },
  { feature: 'Calendar Age', impact: -4.3, direction: 'negative' },
  { feature: 'Humidity Exposure', impact: -2.1, direction: 'negative' },
  { feature: 'Fast Charge %', impact: -7.6, direction: 'negative' },
]

const radarData = [
  { model: 'Accuracy', xgb: 95, lstm: 92, transformer: 97, pinn: 93, bayesian: 91 },
  { model: 'Speed', xgb: 98, lstm: 78, transformer: 82, pinn: 75, bayesian: 80 },
  { model: 'Robustness', xgb: 88, lstm: 90, transformer: 94, pinn: 96, bayesian: 95 },
  { model: 'Uncertainty', xgb: 60, lstm: 55, transformer: 65, pinn: 85, bayesian: 98 },
  { model: 'Interpretability', xgb: 92, lstm: 45, transformer: 50, pinn: 78, bayesian: 82 },
]

const timelineData = [
  { cycle: 0, soh: 100, predicted: 100, upper: 100, lower: 100 },
  { cycle: 200, soh: 97.2, predicted: 97.5, upper: 98.1, lower: 96.9 },
  { cycle: 400, soh: 94.8, predicted: 95.1, upper: 96.2, lower: 94.0 },
  { cycle: 600, soh: 92.1, predicted: 92.6, upper: 94.0, lower: 91.2 },
  { cycle: 800, soh: 89.4, predicted: 90.1, upper: 91.8, lower: 88.4 },
  { cycle: 1000, soh: 86.2, predicted: 87.5, upper: 89.6, lower: 85.4 },
  { cycle: 1200, soh: null, predicted: 84.9, upper: 87.4, lower: 82.4 },
  { cycle: 1400, soh: null, predicted: 82.1, upper: 85.2, lower: 79.0 },
  { cycle: 1600, soh: null, predicted: 79.3, upper: 83.0, lower: 75.6 },
  { cycle: 1800, soh: null, predicted: 76.2, upper: 80.5, lower: 71.9 },
]

const modelEnsemble = [
  { name: 'XGBoost', soh: '94.8%', accuracy: '95.2%', weight: '20%', color: '#23d9ff' },
  { name: 'LSTM', soh: '94.1%', accuracy: '93.8%', weight: '20%', color: '#8d6cff' },
  { name: 'Transformer', soh: '95.3%', accuracy: '97.1%', weight: '25%', color: '#b7f36b' },
  { name: 'PINN', soh: '93.7%', accuracy: '94.5%', weight: '20%', color: '#ffb14a' },
  { name: 'Bayesian NN', soh: '93.9%', accuracy: '92.8%', weight: '15%', color: '#ff4a6a' },
  { name: 'Ensemble', soh: '94.2%', accuracy: '97.8%', weight: '100%', color: '#23d9ff' },
]

export function AIInsightsPage() {
  const [activeTab, setActiveTab] = useState<'shap' | 'ensemble' | 'rul' | 'counterfactual'>('shap')

  const counterfactuals = [
    { current: 'DCIR = 48 mΩ', suggestion: 'If DCIR was 35 mΩ → Grade A (+16%)', impact: '+16.2%', color: '#23d9ff' },
    { current: 'Avg ΔT = 9.2°C', suggestion: 'If ΔT was 5.0°C → Grade A (+8%)', impact: '+8.4%', color: '#b7f36b' },
    { current: 'Fast Charge = 72%', suggestion: 'If Fast Charge was 40% → Grade A (+5%)', impact: '+5.1%', color: '#8d6cff' },
  ]

  return <div className="page-content">
    <div className="section-heading">
      <div>
        <p className="eyebrow">AI-POWERED ASSESSMENT ENGINE</p>
        <h2>Ensemble intelligence. Explainable decisions.</h2>
        <p className="muted">5+ state-of-the-art models combined with SHAP, LIME, and counterfactual explanations.</p>
      </div>
      <span className="live-chip"><span className="pulse" />MODELS ACTIVE</span>
    </div>

    <div className="ai-overview-grid">
      <Panel className="ai-3d-panel">
        <p className="eyebrow">NEURAL NETWORK TOPOLOGY</p>
        <div style={{ height: 240 }}>
          <SafeCanvas camera={{ position: [3, 2, 4], fov: 42 }} mode="energyflow">
            <color attach="background" args={['#06101b']} />
            <ambientLight intensity={1.2} />
            <pointLight position={[3, 3, 3]} intensity={14} color="#23d9ff" />
            <pointLight position={[-3, 2, -2]} intensity={10} color="#8d6cff" />
            <EnergyFlowScene />
            <OrbitControls enablePan={false} minDistance={3} maxDistance={8} autoRotate autoRotateSpeed={0.4} />
          </SafeCanvas>
        </div>
      </Panel>
      <Panel className="ai-result-panel">
        <p className="eyebrow">ENSEMBLE PREDICTION</p>
        <div className="big-score">
          <div className="score-ring large"><strong>94.2</strong><span>%</span></div>
          <div>
            <h3>State of Health</h3>
            <p className="muted">± 1.2% confidence interval</p>
          </div>
        </div>
        <div className="rul-display">
          <span className="rul-label">Remaining Useful Life</span>
          <span className="rul-value">1,247 cycles <small>(~8.4 years)</small></span>
        </div>
        <div className="grade-badge large">A<small>GRADE</small></div>
      </Panel>
    </div>

    <div className="ai-tabs">
      {['shap', 'ensemble', 'rul', 'counterfactual'].map(tab => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab as any)}>
        {tab === 'shap' ? <><BarChart3 size={15} /> SHAP Analysis</> : tab === 'ensemble' ? <><Brain size={15} /> Model Comparison</> : tab === 'rul' ? <><TrendingUp size={15} /> RUL Prediction</> : <><Eye size={15} /> Counterfactuals</>}
      </button>)}
    </div>

    {activeTab === 'shap' && <Panel className="shap-panel">
      <div className="panel-heading">
        <div><p className="eyebrow">SHAP FEATURE IMPORTANCE</p><h2>Why this battery scored 94.2%</h2></div>
      </div>
      <div className="shap-chart">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={shapData} layout="vertical" margin={{ left: 20, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a3a4c" />
            <XAxis type="number" tick={{ fill: '#7f9aaa', fontSize: 11 }} domain={[-15, 5]} />
            <YAxis type="category" dataKey="feature" tick={{ fill: '#eaf6ff', fontSize: 11 }} width={120} />
            <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
            <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
              {shapData.map((entry, i) => <rect key={i} fill={entry.direction === 'positive' ? '#b7f36b' : '#ff4a6a'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="shap-insight">
        <AlertTriangle size={16} style={{ color: '#ffb14a' }} />
        <span><strong>Key Insight:</strong> DCIR degradation is the #1 contributor (-12.4%). Consider impedance spectroscopy for deeper diagnosis.</span>
      </div>
    </Panel>}

    {activeTab === 'ensemble' && <div className="ensemble-grid">
      <Panel className="radar-panel">
        <div className="panel-heading"><div><p className="eyebrow">MODEL COMPARISON</p><h2>Radar: 5 axes of performance</h2></div></div>
        <ResponsiveContainer width="100%" height={340}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#1a3a4c" />
            <PolarAngleAxis dataKey="model" tick={{ fill: '#7f9aaa', fontSize: 11 }} />
            <PolarRadiusAxis tick={{ fill: '#7f9aaa', fontSize: 10 }} domain={[0, 100]} />
            <Radar name="XGBoost" dataKey="xgb" stroke="#23d9ff" fill="#23d9ff" fillOpacity={0.1} />
            <Radar name="LSTM" dataKey="lstm" stroke="#8d6cff" fill="#8d6cff" fillOpacity={0.1} />
            <Radar name="Transformer" dataKey="transformer" stroke="#b7f36b" fill="#b7f36b" fillOpacity={0.1} />
            <Radar name="PINN" dataKey="pinn" stroke="#ffb14a" fill="#ffb14a" fillOpacity={0.1} />
            <Radar name="Bayesian" dataKey="bayesian" stroke="#ff4a6a" fill="#ff4a6a" fillOpacity={0.1} />
            <Legend wrapperStyle={{ color: '#7f9aaa', fontSize: 11 }} />
            <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
          </RadarChart>
        </ResponsiveContainer>
      </Panel>
      <Panel className="model-list-panel">
        <div className="panel-heading"><div><p className="eyebrow">ENSEMBLE WEIGHTS</p><h2>Model contributions</h2></div></div>
        {modelEnsemble.map((m, i) => <div key={i} className="model-row">
          <div className="model-dot" style={{ background: m.color }} />
          <span className="model-name">{m.name}</span>
          <span className="model-soh">{m.soh}</span>
          <span className="model-acc">{m.accuracy}</span>
          <span className="model-weight">{m.weight}</span>
        </div>)}
      </Panel>
    </div>}

    {activeTab === 'rul' && <Panel className="rul-panel">
      <div className="panel-heading">
        <div><p className="eyebrow">REMAINING USEFUL LIFE PREDICTION</p><h2>SoH degradation with uncertainty bounds</h2></div>
        <div className="rul-legend">
          <span><span className="legend-dot" style={{ background: '#23d9ff' }} /> Actual</span>
          <span><span className="legend-dot" style={{ background: '#b7f36b' }} /> Predicted</span>
          <span><span className="legend-dot" style={{ background: '#b7f36b33' }} /> 95% CI</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="ciGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b7f36b" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#b7f36b" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a3a4c" />
          <XAxis dataKey="cycle" tick={{ fill: '#7f9aaa', fontSize: 11 }} label={{ value: 'Cycle Count', position: 'bottom', fill: '#7f9aaa', fontSize: 11 }} />
          <YAxis tick={{ fill: '#7f9aaa', fontSize: 11 }} domain={[65, 102]} label={{ value: 'SoH %', angle: -90, position: 'insideLeft', fill: '#7f9aaa', fontSize: 11 }} />
          <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
          <Area type="monotone" dataKey="upper" stroke="none" fill="url(#ciGrad)" />
          <Area type="monotone" dataKey="lower" stroke="none" fill="#06101b" />
          <Area type="monotone" dataKey="predicted" stroke="#b7f36b" strokeWidth={2} fill="none" dot={false} />
          <Area type="monotone" dataKey="soh" stroke="#23d9ff" strokeWidth={2.5} fill="none" dot={{ fill: '#23d9ff', r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    </Panel>}

    {activeTab === 'counterfactual' && <Panel className="counter-panel">
      <div className="panel-heading">
        <div><p className="eyebrow">COUNTERFACTUAL EXPLANATIONS</p><h2>What would make this battery Grade A?</h2></div>
      </div>
      <div className="counterfactual-list">
        {counterfactuals.map((c, i) => <motion.div key={i} className="counter-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
          <div className="counter-current">
            <span className="eyebrow">CURRENT STATE</span>
            <span>{c.current}</span>
          </div>
          <div className="counter-arrow"><ChevronRight size={24} style={{ color: c.color }} /></div>
          <div className="counter-suggestion">
            <span className="eyebrow">COUNTERFACTUAL</span>
            <span>{c.suggestion}</span>
          </div>
          <div className="counter-impact" style={{ color: c.color }}>{c.impact}</div>
        </motion.div>)}
      </div>
      <div className="shap-insight">
        <Sparkles size={16} style={{ color: '#8d6cff' }} />
        <span><strong>XAI Trust:</strong> Counterfactual explanations improve user trust by 40% (2024 research). Each suggestion is grounded in physics-based degradation models.</span>
      </div>
    </Panel>}
  </div>
}

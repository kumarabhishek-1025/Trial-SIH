'use client'

import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import { ThermalMapScene } from '@/components/battx-extra-scenes'
import { SafeCanvas } from '@/components/safe-canvas'
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { ShieldAlert, AlertTriangle, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react'

const Panel = ({ children, className = '' }: any) => <section className={`panel ${className}`}>{children}</section>

const thermalData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  cell1: 25 + Math.random() * 20,
  cell2: 24 + Math.random() * 18,
  cell3: 26 + Math.random() * 25,
  cell4: 23 + Math.random() * 15,
}))

const rules = [
  { rule: 'Insulation Resistance < 500 Ω', status: 'pass', value: '2,400 Ω', icon: ShieldCheck, color: '#b7f36b' },
  { rule: 'Cell Voltage Imbalance > 200mV', status: 'fail', value: '342 mV', icon: XCircle, color: '#ff4a6a' },
  { rule: 'Temperature > 65°C', status: 'warn', value: '62.4°C', icon: AlertTriangle, color: '#ffb14a' },
  { rule: 'Internal Resistance > 150 mΩ', status: 'pass', value: '48 mΩ', icon: ShieldCheck, color: '#b7f36b' },
  { rule: 'Self-Discharge Rate > 5%/month', status: 'pass', value: '1.2%/month', icon: ShieldCheck, color: '#b7f36b' },
  { rule: 'Capacity Fade > 2%/100 cycles', status: 'warn', value: '1.8%/100 cycles', icon: AlertTriangle, color: '#ffb14a' },
]

const anomalyDetections = [
  { type: 'Voltage Spike', cell: '#7 (Module 3)', severity: 'high', time: '2 hrs ago', confidence: '94.2%', detectedBy: 'Autoencoder' },
  { type: 'Thermal Imbalance', cell: '#12 (Module 4)', severity: 'medium', time: '5 hrs ago', confidence: '87.6%', detectedBy: 'GNN' },
  { type: 'Impedance Drift', cell: '#3 (Module 1)', severity: 'low', time: '12 hrs ago', confidence: '82.1%', detectedBy: 'LSTM' },
]

export function SafetyPage() {
  return <div className="page-content">
    <div className="section-heading">
      <div>
        <p className="eyebrow">HYBRID SAFETY ENGINE</p>
        <h2>Rule-based + ML anomaly detection.</h2>
        <p className="muted">Graph Neural Networks model cell-to-cell interactions. Detects thermal runaway risk 2-3x earlier.</p>
      </div>
      <span className="live-chip"><span className="pulse amber-pulse" />MONITORING</span>
    </div>

    <div className="safety-hero-grid">
      <Panel className="thermal-3d">
        <p className="eyebrow">THERMAL MAP · PACK BMS-042</p>
        <div style={{ height: 300 }}>
          <SafeCanvas camera={{ position: [4, 2.5, 4], fov: 42 }} mode="thermal">
            <color attach="background" args={['#06101b']} />
            <ambientLight intensity={1.2} />
            <pointLight position={[3, 3, 3]} intensity={14} color="#ff4a6a" />
            <ThermalMapScene />
            <OrbitControls enablePan={false} minDistance={3} maxDistance={8} autoRotate autoRotateSpeed={0.3} />
          </SafeCanvas>
        </div>
      </Panel>

      <Panel className="rules-panel">
        <div className="panel-heading"><div><p className="eyebrow">SAFETY RULES ENGINE</p><h2>Hard rules + ML</h2></div></div>
        <div className="rules-list">
          {rules.map((r, i) => <div key={i} className={`rule-row ${r.status}`}>
            <r.icon size={16} style={{ color: r.color }} />
            <span className="rule-text">{r.rule}</span>
            <span className="rule-value" style={{ color: r.color }}>{r.value}</span>
            <span className={`rule-status ${r.status}`}>{r.status}</span>
          </div>)}
        </div>
        <div className="rule-summary">
          <span><CheckCircle2 size={14} style={{ color: '#b7f36b' }} /> 4 passed</span>
          <span><AlertTriangle size={14} style={{ color: '#ffb14a' }} /> 2 warnings</span>
          <span><XCircle size={14} style={{ color: '#ff4a6a' }} /> 1 failed</span>
        </div>
      </Panel>
    </div>

    <Panel className="thermal-chart-panel">
      <div className="panel-heading"><div><p className="eyebrow">THERMAL TIMELINE</p><h2>24-hour cell temperature monitoring</h2></div></div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={thermalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a3a4c" />
          <XAxis dataKey="hour" tick={{ fill: '#7f9aaa', fontSize: 10 }} />
          <YAxis tick={{ fill: '#7f9aaa', fontSize: 11 }} domain={[20, 55]} />
          <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
          <Legend wrapperStyle={{ color: '#7f9aaa', fontSize: 11 }} />
          <Line type="monotone" dataKey="cell1" stroke="#23d9ff" strokeWidth={1.5} dot={false} name="Cell #1" />
          <Line type="monotone" dataKey="cell2" stroke="#8d6cff" strokeWidth={1.5} dot={false} name="Cell #2" />
          <Line type="monotone" dataKey="cell3" stroke="#ff4a6a" strokeWidth={2} dot={false} name="Cell #3 (hot)" />
          <Line type="monotone" dataKey="cell4" stroke="#b7f36b" strokeWidth={1.5} dot={false} name="Cell #4" />
        </LineChart>
      </ResponsiveContainer>
    </Panel>

    <Panel className="anomaly-panel">
      <div className="panel-heading"><div><p className="eyebrow">ML ANOMALY DETECTIONS</p><h2>Autoencoder + GNN flagged events</h2></div></div>
      <div className="anomaly-list">
        {anomalyDetections.map((a, i) => <div key={i} className={`anomaly-row ${a.severity}`}>
          <div className="anomaly-severity" style={{ background: a.severity === 'high' ? '#ff4a6a' : a.severity === 'medium' ? '#ffb14a' : '#23d9ff' }} />
          <div className="anomaly-body">
            <span className="anomaly-type">{a.type}</span>
            <span className="anomaly-cell">{a.cell}</span>
          </div>
          <span className="anomaly-confidence">{a.confidence}</span>
          <span className="anomaly-detector">{a.detectedBy}</span>
          <span className="anomaly-time">{a.time}</span>
        </div>)}
      </div>
    </Panel>

    <Panel className="gnn-info-banner">
      <ShieldAlert size={20} style={{ color: '#ff4a6a' }} />
      <div>
        <strong>Graph Neural Network Active</strong>
        <p className="muted">Modeling 32 cell-to-cell thermal interactions per module. Detects weak cells before cascading failure.</p>
      </div>
    </Panel>
  </div>
}

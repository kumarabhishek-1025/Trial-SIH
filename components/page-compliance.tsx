'use client'

import { OrbitControls } from '@react-three/drei'
import { ComplianceScene } from '@/components/battx-extra-scenes'
import { SafeCanvas } from '@/components/safe-canvas'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ShieldCheck, FileText, Download, CheckCircle2, Clock, AlertTriangle, ArrowUpRight, ChevronRight, Calendar, Building2 } from 'lucide-react'

const Panel = ({ children, className = '' }: any) => <section className={`panel ${className}`}>{children}</section>

const complianceData = [
  { name: 'Recycled', value: 42, color: '#b7f36b' },
  { name: 'Repurposed', value: 28, color: '#23d9ff' },
  { name: 'In Use', value: 22, color: '#8d6cff' },
  { name: 'Pending', value: 8, color: '#ffb14a' },
]

const quarterlyTargets = [
  { quarter: 'Q1', target: 35, actual: 38, status: 'exceeded' },
  { quarter: 'Q2', target: 40, actual: 42, status: 'exceeded' },
  { quarter: 'Q3', target: 45, actual: 41, status: 'behind' },
  { quarter: 'Q4', target: 50, actual: null, status: 'upcoming' },
]

const recentReports = [
  { type: 'Annual Compliance Return (ACR)', date: '2026-03-15', status: 'submitted', batteries: 847 },
  { type: 'Q3 EPR Report', date: '2026-09-30', status: 'draft', batteries: 234 },
  { type: 'Battery Passport Batch', date: '2026-10-01', status: 'generated', batteries: 156 },
  { type: 'Recycler Audit Report', date: '2026-10-05', status: 'pending', batteries: 89 },
]

const timelineSteps = [
  { label: 'Battery Received', status: 'done', icon: '📦' },
  { label: 'AI Assessment', status: 'done', icon: '🧠' },
  { label: 'Grade Assigned', status: 'done', icon: '✅' },
  { label: 'EPR Entry Created', status: 'done', icon: '📝' },
  { label: 'CPCB Portal Updated', status: 'active', icon: '🏛️' },
  { label: 'ACR Filed', status: 'pending', icon: '📋' },
]

export function CompliancePage() {
  return <div className="page-content">
    <div className="section-heading">
      <div>
        <p className="eyebrow">CPCB EPR COMPLIANCE AUTOMATION</p>
        <h2>Automate 70% of compliance work.</h2>
        <p className="muted">Auto-generate ACR, EPR plans, and Battery Passport entries. Aligned with Battery Waste Management Rules, 2022.</p>
      </div>
      <span className="live-chip"><span className="pulse" />COMPLIANT</span>
    </div>

    <div className="compliance-hero-grid">
      <Panel className="compliance-3d">
        <div style={{ height: 280 }}>
          <SafeCanvas camera={{ position: [4, 2, 4], fov: 42 }} mode="compliance">
            <color attach="background" args={['#06101b']} />
            <ambientLight intensity={1.2} />
            <pointLight position={[3, 3, 3]} intensity={14} color="#b7f36b" />
            <ComplianceScene />
            <OrbitControls enablePan={false} minDistance={3} maxDistance={8} autoRotate autoRotateSpeed={0.4} />
          </SafeCanvas>
        </div>
      </Panel>

      <Panel className="compliance-status-panel">
        <div className="panel-heading"><div><p className="eyebrow">COMPLIANCE STATUS</p><h2>2026–27 Targets</h2></div></div>
        <div className="compliance-donut">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie data={complianceData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4}>
                {complianceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center"><strong>70%</strong><span>compliant</span></div>
        </div>
        <div className="compliance-legend">
          {complianceData.map((c, i) => <div key={i} className="legend-item"><span className="legend-dot" style={{ background: c.color }} />{c.name} {c.value}%</div>)}
        </div>
      </Panel>
    </div>

    <Panel className="quarterly-panel">
      <div className="panel-heading"><div><p className="eyebrow">QUARTERLY EPR TARGETS</p><h2>Recycling & repurposing progress</h2></div></div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={quarterlyTargets} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a3a4c" />
          <XAxis dataKey="quarter" tick={{ fill: '#7f9aaa', fontSize: 11 }} />
          <YAxis tick={{ fill: '#7f9aaa', fontSize: 11 }} />
          <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
          <Bar dataKey="target" fill="#8d6cff" radius={[4, 4, 0, 0]} name="Target %" />
          <Bar dataKey="actual" fill="#b7f36b" radius={[4, 4, 0, 0]} name="Actual %" />
        </BarChart>
      </ResponsiveContainer>
    </Panel>

    <div className="compliance-bottom-grid">
      <Panel className="timeline-panel">
        <div className="panel-heading"><div><p className="eyebrow">BATTERY LIFECYCLE TRACKER</p><h2>End-to-end compliance flow</h2></div></div>
        <div className="compliance-timeline">
          {timelineSteps.map((step, i) => <div key={i} className={`timeline-step ${step.status}`}>
            <div className="timeline-dot">{step.icon}</div>
            <div className="timeline-line" />
            <span className="timeline-label">{step.label}</span>
            <span className={`timeline-status ${step.status}`}>{step.status === 'done' ? '✓' : step.status === 'active' ? '●' : '○'}</span>
          </div>)}
        </div>
      </Panel>

      <Panel className="reports-panel">
        <div className="panel-heading"><div><p className="eyebrow">AUTO-GENERATED REPORTS</p><h2>Ready to download</h2></div></div>
        {recentReports.map((r, i) => <div key={i} className="report-row">
          <FileText size={18} style={{ color: r.status === 'submitted' ? '#b7f36b' : r.status === 'draft' ? '#23d9ff' : '#ffb14a' }} />
          <div className="report-info">
            <span className="report-type">{r.type}</span>
            <span className="report-meta">{r.date} · {r.batteries} batteries</span>
          </div>
          <span className={`status-badge ${r.status}`}>{r.status}</span>
          <button className="icon-btn small"><Download size={14} /></button>
        </div>)}
      </Panel>
    </div>

    <Panel className="nlp-insight-banner">
      <Building2 size={20} style={{ color: '#8d6cff' }} />
      <div>
        <strong>NLP Auto-Fill Active</strong>
        <p className="muted">Extracting data from 891 test reports and populating CPCB templates. Next ACR deadline: March 15, 2027.</p>
      </div>
      <button className="ghost"><ArrowUpRight size={16} /> View CPCB Portal</button>
    </Panel>
  </div>
}

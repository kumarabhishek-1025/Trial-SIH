'use client'

import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Scene, cyan, violet, lime, amber } from '@/components/battx-scenes'
import { SafeCanvas } from '@/components/safe-canvas'
import { Activity, AlertTriangle, ArrowUpRight, Bell, Bot, CheckCircle2, ChevronRight, Cpu, Database, FileText, Gauge, Globe2, LayoutDashboard, LogOut, Menu, Orbit, Plus, Radio, Recycle, Search, Settings, ShieldCheck, ShieldAlert, Sparkles, TrendingUp, UserRound, Users, X, Zap, QrCode, BarChart3, Upload, Trophy } from 'lucide-react'

import { DataIngestionPage } from '@/components/page-data-ingestion'
import { AIInsightsPage } from '@/components/page-ai-insights'
import { EconomicRoutingPage } from '@/components/page-economic-routing'
import { CompliancePage } from '@/components/page-compliance'
import { NotificationsPage } from '@/components/page-notifications'
import { BlockchainPassportPage } from '@/components/page-blockchain-passport'
import { FleetAnalyticsPage } from '@/components/page-fleet-analytics'
import { SafetyPage } from '@/components/page-safety'
import { RecyclerDashboardPage } from '@/components/page-recycler'

const Metric = ({ label, value, detail, color = cyan, icon: Icon = Activity }: any) => <div className="metric"><div className="metric-icon" style={{ color }}><Icon size={17} /></div><div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-detail">{detail}</div></div></div>
const Panel = ({ children, className = '' }: any) => <section className={`panel ${className}`}>{children}</section>

function SceneCanvas({ mode, exploded = false, scan = false, selected = 7, fleetRisk = 'low', charge = .8 }: any) {
  const isVehicle = mode === 'vehicle'
  return <SafeCanvas dpr={[1, 2]} camera={{ position: isVehicle ? [4.8, 2.4, 5.8] : [5, 3.2, 6], fov: isVehicle ? 42 : 38 }} mode={mode} charge={charge} fleetRisk={fleetRisk} scan={scan}>
    <color attach="background" args={['#06101b']} />
    <fog attach="fog" args={['#06101b', 8, 18]} />
    <ambientLight intensity={1.1} />
    <pointLight position={[3, 4, 4]} intensity={18} color={cyan} />
    <pointLight position={[-4, 2, -3]} intensity={14} color={violet} />
    <Scene mode={mode} exploded={exploded} scan={scan} selected={selected} fleetRisk={fleetRisk} charge={charge} />
    <OrbitControls enablePan={false} minDistance={3.5} maxDistance={10} autoRotate={!scan} autoRotateSpeed={isVehicle ? .5 : .35} />
  </SafeCanvas>
}

function Auth({ onEnter }: { onEnter: (role: 'owner' | 'admin') => void }) {
  const [role, setRole] = useState<'owner' | 'admin'>('owner')
  const [exploded, setExploded] = useState(false)
  const [scan, setScan] = useState(false)
  const [selected, setSelected] = useState(7)
  return <main className="auth-page">
    <div className="auth-visual">
      <div className="brand-mark"><div className="brand-symbol"><Zap size={25} fill="currentColor" /></div><span>BATT<span>-X</span></span></div>
      <div className="auth-copy">
        <p className="eyebrow">BATTERY INTELLIGENCE OS</p>
        <h1>Know your battery.<br /><em>Own your future.</em></h1>
        <p>Turn every electron into an advantage with the intelligence layer for modern energy systems.</p>
      </div>
      <div className="auth-orbit vehicle-hero">
        <SceneCanvas mode="owner" exploded={exploded} scan={scan} selected={selected} fleetRisk="low" charge={.94} />
        <div className="vehicle-badge"><span className={scan ? 'pulse amber-pulse' : 'pulse'} />{scan ? 'DIAGNOSTIC SCAN · ACTIVE' : exploded ? 'MODULE MAP · EXPLODED' : 'EV-42 · LIVE TELEMETRY'} </div>
        <div className="auth-twin-controls">
          <button className={exploded ? 'active' : ''} onClick={() => setExploded(!exploded)}><Orbit size={15} /> {exploded ? 'Assemble view' : 'Explode view'}</button>
          <button className={scan ? 'active scan' : ''} onClick={() => setScan(!scan)}><Radio size={15} /> {scan ? 'Stop diagnostics' : 'Run diagnostics'}</button>
        </div>
        <div className="auth-module-map" aria-label="Battery module selector">
          {Array.from({ length: 16 }, (_, i) => <button key={i} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)} aria-label={`Select module ${i + 1}`}><span /></button>)}
        </div>
      </div>
      <div className="hero-stats">
        <span><strong>2,847</strong> assets understood</span>
        <span><strong>97.4%</strong> prediction trust</span>
      </div>
    </div>
    <div className="auth-card">
      <div className="auth-top"><span className="eyebrow">WELCOME BACK</span><span className="demo-pill">DEMO MODE</span></div>
      <h2>Sign in to BATT-X</h2>
      <p className="muted">Enter the command center for your battery.</p>
      <div className="role-tabs">
        <button className={role === 'owner' ? 'active' : ''} onClick={() => setRole('owner')}><UserRound size={16} /> Owner</button>
        <button className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}><LayoutDashboard size={16} /> Admin</button>
      </div>
      <label>Email address<input defaultValue={role === 'owner' ? 'alex@northstar.energy' : 'ops@battx.energy'} /></label>
      <label>Password<input type="password" defaultValue="battx-demo" /></label>
      <button className="primary wide" onClick={() => onEnter(role)}>Enter command center <ArrowUpRight size={16} /></button>
      <div className="auth-divider"><span />or<span /></div>
      <button className="ghost wide" onClick={() => onEnter(role)}><Globe2 size={16} /> Continue with SSO</button>
      <p className="fine-print">By continuing, you agree to BATT-X Terms and Privacy.</p>
    </div>
  </main>
}

function Sidebar({ role, view, setView, onLogout, setMobileOpen }: any) {
  const ownerItems: [string, any, string][] = [
    ['overview', LayoutDashboard, 'Overview'],
    ['ingestion', Upload, 'Data Ingestion'],
    ['ai', Sparkles, 'AI Insights'],
    ['routing', TrendingUp, 'Economic Routing'],
    ['safety', ShieldAlert, 'Safety & Thermal'],
    ['passport', ShieldCheck, 'Battery Passport'],
    ['blockchain', QrCode, 'Blockchain'],
    ['compliance', FileText, 'CPCB EPR'],
    ['doctor', Bot, 'Battery Doctor'],
    ['simulator', Orbit, 'What-If Sim'],
    ['notifications', Bell, 'Notifications'],
  ]
  const adminItems: [string, any, string][] = [
    ['admin', LayoutDashboard, 'Command Center'],
    ['fleet', Users, 'Fleet Analytics'],
    ['fleet-intel', BarChart3, 'Fleet Intelligence'],
    ['ingestion', Upload, 'Data Ingestion'],
    ['ai', Sparkles, 'AI Insights'],
    ['routing', TrendingUp, 'Economic Routing'],
    ['safety', ShieldAlert, 'Safety & Thermal'],
    ['compliance', FileText, 'CPCB EPR'],
    ['recycler', Trophy, 'Recycler Hub'],
    ['alerts', Bell, 'Alerts & Events'],
    ['settings', Settings, 'System Settings'],
  ]

  return <aside className="sidebar">
    <div className="brand-mark"><div className="brand-symbol"><Zap size={20} fill="currentColor" /></div><span>BATT<span>-X</span></span></div>
    <div className="workspace">
      <div className="avatar">{role === 'admin' ? 'O' : 'A'}</div>
      <div><strong>{role === 'admin' ? 'Operations' : 'Alex Morgan'}</strong><small>{role === 'admin' ? 'Admin workspace' : 'Model X-42'}</small></div>
      <ChevronRight size={15} />
    </div>
    <nav>
      <p className="nav-label">{role === 'admin' ? 'CONTROL PLANE' : 'YOUR BATTERY'}</p>
      {(role === 'admin' ? adminItems : ownerItems).map(([id, Icon, name]) => <button key={id} className={view === id ? 'nav-item active' : 'nav-item'} onClick={() => { setView(id); setMobileOpen?.(false) }}><Icon size={17} />{name}{id === 'alerts' && <span className="nav-count">3</span>}</button>)}
    </nav>
    <div className="sidebar-bottom">
      <div className="system-status"><span className="pulse" /><div><strong>All systems operational</strong><small>Last sync 2m ago</small></div></div>
      <button className="nav-item" onClick={onLogout}><LogOut size={17} />Sign out</button>
    </div>
  </aside>
}

function Header({ role, setRole, onMenu }: any) {
  return <header className="topbar">
    <button className="mobile-menu" onClick={onMenu}><Menu size={20} /></button>
    <div>
      <p className="eyebrow">{role === 'admin' ? 'OPERATIONS / COMMAND CENTER' : 'NORTHSTAR ENERGY / MODEL X-42'}</p>
      <h1>BATT-X Command Center</h1>
    </div>
    <div className="top-actions">
      <button className="icon-btn"><Search size={17} /></button>
      <button className="icon-btn"><Bell size={17} /><span className="notification-dot" /></button>
      <div className="top-avatar">AM</div>
      <button className="role-switch" onClick={() => setRole(role === 'owner' ? 'admin' : 'owner')}>View {role === 'owner' ? 'Admin' : 'Owner'} <ArrowUpRight size={14} /></button>
    </div>
  </header>
}

function BatteryTwin({ exploded, setExploded, scan, setScan, selected, setSelected }: any) {
  return <div className="twin-wrap">
    <SceneCanvas mode="owner" exploded={exploded} scan={scan} selected={selected} />
    <div className="twin-label"><span className={scan ? 'pulse amber-pulse' : 'pulse'} />{scan ? 'Diagnostic scan active' : 'Live twin · Model X-42'}</div>
    <div className="twin-controls">
      <button className="explode-btn" onClick={() => setExploded(!exploded)}><Orbit size={15} /> {exploded ? 'Assemble modules' : 'Explode view'}</button>
      <button className={scan ? 'scan-btn active' : 'scan-btn'} onClick={() => setScan(!scan)}><Radio size={15} /> {scan ? 'Stop scan' : 'Run diagnostics'}</button>
    </div>
    <div className="cell-selector" aria-label="Select battery module">
      {Array.from({ length: 16 }, (_, i) => <button key={i} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)} aria-label={`Module ${i + 1}`}><span /></button>)}
    </div>
  </div>
}

function OwnerOverview({ setView }: any) {
  const [exploded, setExploded] = useState(false)
  const [scan, setScan] = useState(false)
  const [selected, setSelected] = useState(7)
  const [charge, setCharge] = useState(80)
  return <div className="page-content">
    <div className="status-banner"><div className="status-icon"><CheckCircle2 size={20} /></div><div><strong>Your battery is in excellent health</strong><p>Confidence is high. We are monitoring 48 signals in real time.</p></div><span className="status-time">Updated 2 min ago</span></div>
    <div className="overview-grid">
      <Panel className="health-panel">
        <div className="panel-heading"><div><p className="eyebrow">BATTERY HEALTH PASSPORT</p><h2>Healthy & performing</h2></div><span className="grade">A<small>GRADE</small></span></div>
        <div className="health-score"><div className="score-ring"><strong>94</strong><span>/100</span></div><div><div className="score-title"><span className="dot-lime" />Excellent health</div><p>Top 8% of similar batteries</p><button className="text-link" onClick={() => setView('passport')}>View full passport <ChevronRight size={15} /></button></div></div>
        <div className="metrics-row"><Metric label="STATE OF HEALTH" value="94.2%" detail="+0.8% this month" color={lime} /><Metric label="REMAINING LIFE" value="8.4 yrs" detail="High confidence" color={cyan} /><Metric label="TRUST SCORE" value="98.7%" detail="Data quality" color={violet} /></div>
      </Panel>
      <Panel className="twin-panel">
        <div className="panel-heading"><div><p className="eyebrow">DIGITAL TWIN · EV-42</p><h2>Battery meets motion</h2></div><span className="live-chip"><span className="pulse" />LIVE</span></div>
        <div className="vehicle-owner-stage"><SceneCanvas mode="vehicle" scan={scan} fleetRisk="low" charge={charge / 100} /><div className="vehicle-readout"><span><strong>94.2%</strong> battery pack</span><span><strong>48</strong> live signals</span><span><strong>{scan ? 'SCANNING' : 'READY'}</strong> diagnostics</span></div></div>
        <BatteryTwin exploded={exploded} setExploded={setExploded} scan={scan} setScan={setScan} selected={selected} setSelected={setSelected} />
      </Panel>
    </div>
    <div className="lower-grid">
      <Panel className="actions-panel">
        <p className="eyebrow">QUICK ACTIONS</p>
        <button className="primary" onClick={() => setView('ai')}><Sparkles size={16} /> AI Assessment</button>
        <button className="ghost" onClick={() => setView('routing')}><TrendingUp size={16} /> Economic Routing</button>
        <button className="ghost" onClick={() => setView('compliance')}><FileText size={16} /> CPCB Report</button>
        <button className="ghost" onClick={() => setView('blockchain')}><QrCode size={16} /> Battery Passport</button>
      </Panel>
      <Panel className="chart-panel">
        <div className="panel-heading"><div><p className="eyebrow">SOH DEGRADATION CURVE</p><h2>Health over time</h2></div></div>
        <div className="mini-chart-placeholder"><div className="chart-bars">{[94, 93, 92, 91, 90, 89, 88, 87, 86].map((v, i) => <div key={i} className="chart-bar" style={{ height: `${v}%` }} />)}</div></div>
      </Panel>
      <Panel className="metrics-panel">
        <p className="eyebrow">KEY METRICS</p>
        <Metric label="DCIR" value="48 mΩ" detail="Normal range" color={lime} />
        <Metric label="CYCLES" value="1,247" detail="of 3,000 rated" color={cyan} />
        <Metric label="CAPACITY" value="60.4 kWh" detail="Rated 64 kWh" color={violet} />
      </Panel>
    </div>
  </div>
}

function AdminOverview() {
  const [fleetRisk, setFleetRisk] = useState<'low' | 'medium' | 'high'>('low')
  const [acknowledged, setAcknowledged] = useState(false)
  const fleet = [
    { id: 'BX-1042', owner: 'Northstar Energy', soh: '96.8%', status: 'Optimal', risk: 'Low' },
    { id: 'BX-0987', owner: 'Lumina Grid', soh: '91.4%', status: 'Healthy', risk: 'Low' },
    { id: 'BX-1104', owner: 'Apex Mobility', soh: '84.1%', status: 'Watch', risk: 'Medium' },
    { id: 'BX-0872', owner: 'Northstar Energy', soh: '72.6%', status: 'Attention', risk: 'High' },
  ]
  return <div className="page-content">
    <div className="admin-hero">
      <div>
        <p className="eyebrow">LIVE FLEET PULSE · 09:42 UTC</p>
        <h2>One command center.<br /><em>Every battery understood.</em></h2>
        <p className="muted">Monitor 2,847 assets across 18 operating regions with confidence.</p>
      </div>
      <div className="admin-scene">
        <SceneCanvas mode={fleetRisk === 'high' ? 'vehicle' : 'admin'} fleetRisk={fleetRisk} scan={fleetRisk === 'high'} charge={fleetRisk === 'high' ? .72 : .96} />
        <span className="scene-caption"><span className={fleetRisk === 'high' ? 'pulse amber-pulse' : 'pulse'} />{fleetRisk === 'high' ? 'Vehicle risk focus · scanning' : 'Fleet mesh online'}</span>
      </div>
      <button className="primary"><Plus size={16} /> Add data source</button>
    </div>
    <div className="admin-kpis">
      <Metric label="FLEET HEALTH" value="91.8%" detail="↑ 2.4% vs last month" color={lime} icon={Gauge} />
      <Metric label="AT-RISK ASSETS" value="47" detail="12 require attention" color={amber} icon={AlertTriangle} />
      <Metric label="PREDICTION TRUST" value="97.4%" detail="Across all models" color={violet} icon={Cpu} />
      <Metric label="VALUE UNLOCKED" value="$2.4M" detail="This quarter" color={cyan} icon={TrendingUp} />
    </div>
    <div className="admin-grid">
      <Panel className="chart-panel">
        <div className="panel-heading"><div><p className="eyebrow">FLEET HEALTH DISTRIBUTION</p><h2>Assets by health score</h2></div><button className="ghost small">Last 30 days <ChevronRight size={14} /></button></div>
        <div className="bars">{[{ l: '95–100%', v: 342, c: lime }, { l: '85–95%', v: 891, c: cyan }, { l: '75–85%', v: 654, c: violet }, { l: '65–75%', v: 234, c: amber }, { l: '<65%', v: 47, c: '#ff4a6a' }].map((b, i) => <div key={i} className="bar-row"><span>{b.l}</span><div className="bar-track"><div className="bar-fill" style={{ width: `${(b.v / 891) * 100}%`, background: b.c }} /></div><span>{b.v}</span></div>)}</div>
      </Panel>
      <Panel className="fleet-panel">
        <div className="panel-heading"><div><p className="eyebrow">ACTIVE FLEET</p><h2>Priority assets</h2></div></div>
        <div className="fleet-table">
          {fleet.map((f, i) => <div key={i} className="fleet-row">
            <span className="mono">{f.id}</span>
            <span>{f.owner}</span>
            <span style={{ color: f.risk === 'High' ? '#ff4a6a' : f.risk === 'Medium' ? amber : lime }}>{f.soh}</span>
            <span className={`risk-badge ${f.risk.toLowerCase()}`}>{f.risk}</span>
          </div>)}
        </div>
        <div className="fleet-risk-selector">
          {(['low', 'medium', 'high'] as const).map(r => <button key={r} className={fleetRisk === r ? 'active' : ''} onClick={() => setFleetRisk(r)}>{r.charAt(0).toUpperCase() + r.slice(1)} risk</button>)}
        </div>
      </Panel>
    </div>
    {fleetRisk === 'high' && !acknowledged && <div className="alert-banner"><AlertTriangle size={20} style={{ color: '#ff4a6a' }} /><div><strong>Critical: BX-0872 requires immediate attention</strong><p>Cell thermal anomaly detected. Battery quarantined. Action required.</p></div><button className="primary" onClick={() => setAcknowledged(true)}>Acknowledge</button></div>}
  </div>
}

function VehicleLab() {
  const [scan, setScan] = useState(false)
  const [charge, setCharge] = useState(80)
  const [driving, setDriving] = useState(true)
  return <div className="page-content">
    <div className="section-heading">
      <div>
        <p className="eyebrow">WHAT-IF SIMULATOR · EV-42</p>
        <h2>Model the motion behind the battery.</h2>
        <p className="muted">Change operating conditions and watch the vehicle telemetry respond in real time.</p>
      </div>
      <span className="live-chip"><span className="pulse" />SIMULATION LIVE</span>
    </div>
    <div className="lab-grid">
      <Panel className="lab-vehicle">
        <SceneCanvas mode="vehicle" scan={scan} charging={charge > 20} driving={driving} charge={charge / 100} />
        <div className="lab-overlay">
          <span><strong>{charge}%</strong> predicted charge</span>
          <span><strong>{scan ? 'ACTIVE' : 'READY'}</strong> battery scan</span>
        </div>
      </Panel>
      <Panel className="lab-controls">
        <p className="eyebrow">CONTROL SURFACE</p>
        <h3>Operating scenario</h3>
        <label>Charge level <strong>{charge}%</strong><input type="range" min="10" max="100" value={charge} onChange={e => setCharge(Number(e.target.value))} /></label>
        <button className={scan ? 'primary wide' : 'ghost wide'} onClick={() => setScan(!scan)}><Radio size={16} /> {scan ? 'Stop live battery scan' : 'Run live battery scan'}</button>
        <button className={driving ? 'ghost wide active-control' : 'ghost wide'} onClick={() => setDriving(!driving)}><Gauge size={16} /> {driving ? 'Pause drivetrain motion' : 'Start drivetrain motion'}</button>
        <div className="lab-note"><Zap size={16} /><div><strong>Why this matters</strong><p>Battery state, thermal load, and drivetrain behavior are modeled together so recommendations stay grounded in the vehicle's actual operating context.</p></div></div>
      </Panel>
    </div>
  </div>
}

export default function BattxApp() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setRole] = useState<'owner' | 'admin'>('owner')
  const [view, setView] = useState('overview')
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!loggedIn) return <Auth onEnter={r => { setRole(r); setView(r === 'admin' ? 'admin' : 'overview'); setLoggedIn(true) }} />

  const renderView = () => {
    switch (view) {
      case 'ingestion': return <DataIngestionPage />
      case 'ai': return <AIInsightsPage />
      case 'routing': return <EconomicRoutingPage />
      case 'safety': return <SafetyPage />
      case 'passport': return <OwnerOverview setView={setView} />
      case 'blockchain': return <BlockchainPassportPage />
      case 'compliance': return <CompliancePage />
      case 'notifications': return <NotificationsPage />
      case 'fleet': return <FleetAnalyticsPage />
      case 'fleet-intel': return <FleetAnalyticsPage />
      case 'recycler': return <RecyclerDashboardPage />
      case 'simulator': return <VehicleLab />
      case 'doctor': return <OwnerOverview setView={setView} />
      case 'admin': return <AdminOverview />
      case 'alerts': return <NotificationsPage />
      case 'settings': return <AdminOverview />
      default: return role === 'admin' ? <AdminOverview /> : <OwnerOverview setView={setView} />
    }
  }

  return <div className="app-shell">
    <Sidebar role={role} view={view} setView={setView} onLogout={() => setLoggedIn(false)} setMobileOpen={setMobileOpen} />
    <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
      <button onClick={() => setMobileOpen(false)}><X /></button>
      <Sidebar role={role} view={view} setView={setView} onLogout={() => setLoggedIn(false)} setMobileOpen={setMobileOpen} />
    </div>
    <div className="main">
      <Header role={role} setRole={(r: 'owner' | 'admin') => { setRole(r); setView(r === 'admin' ? 'admin' : 'overview') }} onMenu={() => setMobileOpen(true)} />
      {renderView()}
    </div>
  </div>
}

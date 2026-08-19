'use client'

import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import { RecyclingScene } from '@/components/battx-extra-scenes'
import { SafeCanvas } from '@/components/safe-canvas'
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts'
import { DollarSign, TrendingUp, Truck, Recycle, Zap, BarChart3 } from 'lucide-react'

const Panel = ({ children, className = '' }: any) => <section className={`panel ${className}`}>{children}</section>

const routingOptions = [
  { option: 'Reuse in EV', lcos: 0.042, revenue: 5400, cycles: 1200, confidence: 94, icon: Truck, color: '#23d9ff', recommended: false },
  { option: 'Repurpose Stationary', lcos: 0.031, revenue: 3200, cycles: 4800, confidence: 89, icon: Zap, color: '#b7f36b', recommended: true },
  { option: 'Recycle', lcos: null, revenue: 180, cycles: 0, confidence: 100, icon: Recycle, color: '#ffb14a', recommended: false },
]

const commodityPrices = [
  { metal: 'Lithium', price: '$24,800', change: '+3.2%', color: '#23d9ff' },
  { metal: 'Cobalt', price: '$32,100', change: '-1.4%', color: '#8d6cff' },
  { metal: 'Nickel', price: '$16,400', change: '+0.8%', color: '#b7f36b' },
  { metal: 'Copper', price: '$9,200', change: '+2.1%', color: '#ffb14a' },
  { metal: 'Manganese', price: '$2,100', change: '+0.3%', color: '#ff4a6a' },
]

const lcosData = [
  { scenario: 'Year 1', reuse: 0.042, repurpose: 0.038, recycle: 0.055 },
  { scenario: 'Year 2', reuse: 0.040, repurpose: 0.035, recycle: 0.052 },
  { scenario: 'Year 3', reuse: 0.038, repurpose: 0.033, recycle: 0.050 },
  { scenario: 'Year 4', reuse: 0.037, repurpose: 0.031, recycle: 0.048 },
  { scenario: 'Year 5', reuse: 0.036, repurpose: 0.030, recycle: 0.046 },
  { scenario: 'Year 6', reuse: 0.035, repurpose: 0.029, recycle: 0.045 },
  { scenario: 'Year 7', reuse: 0.035, repurpose: 0.029, recycle: 0.044 },
]

const materialValue = [
  { name: 'Lithium', value: 820, color: '#23d9ff' },
  { name: 'Cobalt', value: 540, color: '#8d6cff' },
  { name: 'Nickel', value: 310, color: '#b7f36b' },
  { name: 'Copper', value: 180, color: '#ffb14a' },
  { name: 'Other', value: 50, color: '#ff4a6a' },
]

const fleetRouting = [
  { id: 'BX-1042', soh: '96.8%', route: 'Reuse in EV', value: '$5,800', status: 'recommended' },
  { id: 'BX-0987', soh: '91.4%', route: 'Repurpose', value: '$3,400', status: 'active' },
  { id: 'BX-1104', soh: '84.1%', route: 'Repurpose', value: '$3,100', status: 'active' },
  { id: 'BX-0872', soh: '72.6%', route: 'Recycle', value: '$210', status: 'pending' },
  { id: 'BX-0651', soh: '68.3%', route: 'Recycle', value: '$195', status: 'pending' },
  { id: 'BX-1298', soh: '78.9%', route: 'Repurpose', value: '$3,250', status: 'active' },
]

export function EconomicRoutingPage() {
  const [selected, setSelected] = useState(1)

  return <div className="page-content">
    <div className="section-heading">
      <div>
        <p className="eyebrow">ECONOMIC ROUTING ENGINE</p>
        <h2>Maximize value. Minimize waste.</h2>
        <p className="muted">LCOS optimization with real-time commodity prices (LME API).</p>
      </div>
      <span className="live-chip"><span className="pulse" />PRICES LIVE</span>
    </div>

    <div className="routing-hero-grid">
      <Panel className="routing-3d">
        <p className="eyebrow">RECYCLING PIPELINE</p>
        <div style={{ height: 280 }}>
          <SafeCanvas camera={{ position: [4, 2, 4], fov: 42 }} mode="recycling">
            <color attach="background" args={['#06101b']} />
            <ambientLight intensity={1.2} />
            <pointLight position={[3, 3, 3]} intensity={14} color="#b7f36b" />
            <RecyclingScene />
            <OrbitControls enablePan={false} minDistance={3} maxDistance={8} autoRotate autoRotateSpeed={0.4} />
          </SafeCanvas>
        </div>
      </Panel>

      <Panel className="commodity-panel">
        <div className="panel-heading"><div><p className="eyebrow">COMMODITY PRICES · LME</p><h2>Material value recovery</h2></div></div>
        <div className="commodity-list">
          {commodityPrices.map((c, i) => <div key={i} className="commodity-row">
            <div className="commodity-dot" style={{ background: c.color }} />
            <span className="commodity-name">{c.metal}</span>
            <span className="commodity-price">{c.price}/t</span>
            <span className={`commodity-change ${c.change.startsWith('+') ? 'positive' : 'negative'}`}>{c.change}</span>
          </div>)}
        </div>
        <div className="material-recovery">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={materialValue} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                {materialValue.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="material-total"><strong>$1,900</strong><span>total recovery</span></div>
        </div>
      </Panel>
    </div>

    <div className="routing-options">
      {routingOptions.map((r, i) => <Panel key={i} className={`routing-card ${selected === i ? 'selected' : ''} ${r.recommended ? 'recommended' : ''}`} onClick={() => setSelected(i)}>
        {r.recommended && <div className="recommended-badge">RECOMMENDED</div>}
        <div className="routing-icon" style={{ color: r.color }}><r.icon size={28} /></div>
        <h3>{r.option}</h3>
        <div className="routing-metrics">
          <div><span className="routing-label">Revenue</span><span className="routing-value" style={{ color: r.color }}>${r.revenue.toLocaleString()}</span></div>
          {r.lcos && <div><span className="routing-label">LCOS</span><span className="routing-value">${r.lcos}/kWh</span></div>}
          {r.cycles > 0 && <div><span className="routing-label">Cycles</span><span className="routing-value">{r.cycles.toLocaleString()}</span></div>}
          <div><span className="routing-label">Confidence</span><span className="routing-value">{r.confidence}%</span></div>
        </div>
      </Panel>)}
    </div>

    <div className="routing-bottom-grid">
      <Panel className="lcos-chart-panel">
        <div className="panel-heading"><div><p className="eyebrow">LCOS PROJECTION</p><h2>Levelized cost over time</h2></div></div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={lcosData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a3a4c" />
            <XAxis dataKey="scenario" tick={{ fill: '#7f9aaa', fontSize: 11 }} />
            <YAxis tick={{ fill: '#7f9aaa', fontSize: 11 }} domain={[0.02, 0.06]} />
            <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
            <Legend wrapperStyle={{ color: '#7f9aaa', fontSize: 11 }} />
            <Line type="monotone" dataKey="reuse" stroke="#23d9ff" strokeWidth={2} dot={{ fill: '#23d9ff', r: 3 }} name="Reuse EV" />
            <Line type="monotone" dataKey="repurpose" stroke="#b7f36b" strokeWidth={2} dot={{ fill: '#b7f36b', r: 3 }} name="Repurpose" />
            <Line type="monotone" dataKey="recycle" stroke="#ffb14a" strokeWidth={2} dot={{ fill: '#ffb14a', r: 3 }} name="Recycle" />
          </LineChart>
        </ResponsiveContainer>
      </Panel>

      <Panel className="fleet-routing-panel">
        <div className="panel-heading"><div><p className="eyebrow">FLEET ROUTING QUEUE</p><h2>Batch optimization</h2></div></div>
        <div className="fleet-routing-table">
          {fleetRouting.map((f, i) => <div key={i} className="fleet-route-row">
            <span className="mono">{f.id}</span>
            <span>{f.soh}</span>
            <span className="route-badge" style={{ color: f.route === 'Recycle' ? '#ffb14a' : f.route === 'Repurpose' ? '#b7f36b' : '#23d9ff' }}>{f.route}</span>
            <span className="route-value">{f.value}</span>
          </div>)}
        </div>
      </Panel>
    </div>

    <Panel className="value-unlock-banner">
      <DollarSign size={28} style={{ color: '#b7f36b' }} />
      <div>
        <h3>Total value unlocked this quarter: <em>$2.4M</em></h3>
        <p className="muted">Optimal routing saved $4,300/pack average vs naive recycling.</p>
      </div>
      <button className="primary"><BarChart3 size={16} /> Export Report</button>
    </Panel>
  </div>
}

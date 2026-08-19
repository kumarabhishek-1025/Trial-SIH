'use client'

import { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { Users, TrendingUp, AlertTriangle, DollarSign, Gauge, Calendar, Download, RefreshCw } from 'lucide-react'

const Panel = ({ children, className = '' }: any) => <section className={`panel ${className}`}>{children}</section>

const healthDistribution = [
  { range: '95-100%', count: 342, color: '#b7f36b' },
  { range: '85-95%', count: 891, color: '#23d9ff' },
  { range: '75-85%', count: 654, color: '#8d6cff' },
  { range: '65-75%', count: 234, color: '#ffb14a' },
  { range: '<65%', count: 47, color: '#ff4a6a' },
]

const monthlyTrend = [
  { month: 'Apr', health: 91.2, assets: 2100, value: 1.8 },
  { month: 'May', health: 91.8, assets: 2200, value: 1.9 },
  { month: 'Jun', health: 92.1, assets: 2350, value: 2.0 },
  { month: 'Jul', health: 91.5, assets: 2500, value: 2.1 },
  { month: 'Aug', health: 92.4, assets: 2650, value: 2.2 },
  { month: 'Sep', health: 91.8, assets: 2847, value: 2.4 },
]

const topBatteries = [
  { id: 'BX-1042', owner: 'Northstar Energy', soh: 96.8, cycles: 342, risk: 'low', value: '$5,800' },
  { id: 'BX-0987', owner: 'Lumina Grid', soh: 91.4, cycles: 687, risk: 'low', value: '$3,400' },
  { id: 'BX-1104', owner: 'Apex Mobility', soh: 84.1, cycles: 1023, risk: 'medium', value: '$3,100' },
  { id: 'BX-0872', owner: 'Northstar Energy', soh: 72.6, cycles: 1567, risk: 'high', value: '$210' },
  { id: 'BX-0651', owner: 'GreenVolt', soh: 68.3, cycles: 1890, risk: 'high', value: '$195' },
  { id: 'BX-1298', owner: 'Apex Mobility', soh: 78.9, cycles: 1245, risk: 'medium', value: '$3,250' },
  { id: 'BX-1421', owner: 'Lumina Grid', soh: 93.7, cycles: 512, risk: 'low', value: '$4,200' },
  { id: 'BX-1567', owner: 'GreenVolt', soh: 87.2, cycles: 891, risk: 'low', value: '$3,600' },
]

const chemBreakdown = [
  { name: 'NMC', value: 42, color: '#23d9ff' },
  { name: 'LFP', value: 35, color: '#b7f36b' },
  { name: 'NCA', value: 15, color: '#8d6cff' },
  { name: 'LMO', value: 8, color: '#ffb14a' },
]

const regionData = [
  { region: 'Delhi NCR', packs: 487, health: 92.1 },
  { region: 'Maharashtra', packs: 342, health: 91.4 },
  { region: 'Karnataka', packs: 298, health: 93.2 },
  { region: 'Tamil Nadu', packs: 267, health: 90.8 },
  { region: 'Gujarat', packs: 234, health: 91.9 },
  { region: 'Rajasthan', packs: 189, health: 89.7 },
  { region: 'Uttar Pradesh', packs: 156, health: 91.2 },
  { region: 'Others', packs: 874, health: 92.0 },
]

export function FleetAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m')

  return <div className="page-content">
    <div className="section-heading">
      <div>
        <p className="eyebrow">FLEET INTELLIGENCE ANALYTICS</p>
        <h2>Every battery. Every metric. One view.</h2>
        <p className="muted">2,847 assets across 18 regions with real-time health scoring.</p>
      </div>
      <div className="top-actions-inline">
        <button className="ghost"><Calendar size={15} /> {timeRange.toUpperCase()}</button>
        <button className="ghost"><Download size={15} /> Export</button>
        <button className="primary"><RefreshCw size={15} /> Refresh</button>
      </div>
    </div>

    <div className="fleet-kpi-row">
      <Panel className="fleet-kpi">
        <div className="kpi-icon" style={{ color: '#b7f36b' }}><Gauge size={20} /></div>
        <div><span className="kpi-value">91.8%</span><span className="kpi-label">Avg Fleet Health</span></div>
        <span className="kpi-change positive">↑ 2.4%</span>
      </Panel>
      <Panel className="fleet-kpi">
        <div className="kpi-icon" style={{ color: '#23d9ff' }}><Users size={20} /></div>
        <div><span className="kpi-value">2,847</span><span className="kpi-label">Total Assets</span></div>
        <span className="kpi-change positive">+147</span>
      </Panel>
      <Panel className="fleet-kpi">
        <div className="kpi-icon" style={{ color: '#ffb14a' }}><AlertTriangle size={20} /></div>
        <div><span className="kpi-value">47</span><span className="kpi-label">At-Risk Assets</span></div>
        <span className="kpi-change negative">↑ 3</span>
      </Panel>
      <Panel className="fleet-kpi">
        <div className="kpi-icon" style={{ color: '#8d6cff' }}><DollarSign size={20} /></div>
        <div><span className="kpi-value">$2.4M</span><span className="kpi-label">Value Unlocked</span></div>
        <span className="kpi-change positive">↑ $0.3M</span>
      </Panel>
    </div>

    <div className="fleet-charts-grid">
      <Panel className="chart-panel">
        <div className="panel-heading"><div><p className="eyebrow">HEALTH DISTRIBUTION</p><h2>Assets by SoH range</h2></div></div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={healthDistribution} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a3a4c" />
            <XAxis dataKey="range" tick={{ fill: '#7f9aaa', fontSize: 11 }} />
            <YAxis tick={{ fill: '#7f9aaa', fontSize: 11 }} />
            <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {healthDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel className="chart-panel">
        <div className="panel-heading"><div><p className="eyebrow">HEALTH TREND</p><h2>6-month fleet health</h2></div></div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={monthlyTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b7f36b" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#b7f36b" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a3a4c" />
            <XAxis dataKey="month" tick={{ fill: '#7f9aaa', fontSize: 11 }} />
            <YAxis tick={{ fill: '#7f9aaa', fontSize: 11 }} domain={[88, 95]} />
            <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
            <Area type="monotone" dataKey="health" stroke="#b7f36b" strokeWidth={2} fill="url(#healthGrad)" dot={{ fill: '#b7f36b', r: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <Panel className="chart-panel">
        <div className="panel-heading"><div><p className="eyebrow">CHEMISTRY BREAKDOWN</p><h2>By battery type</h2></div></div>
        <div className="chem-chart">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie data={chemBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={4}>
                {chemBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="chem-legend">
            {chemBreakdown.map((c, i) => <div key={i} className="legend-item"><span className="legend-dot" style={{ background: c.color }} />{c.name} {c.value}%</div>)}
          </div>
        </div>
      </Panel>

      <Panel className="chart-panel">
        <div className="panel-heading"><div><p className="eyebrow">VALUE TREND</p><h2>Quarterly value unlock</h2></div></div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthlyTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a3a4c" />
            <XAxis dataKey="month" tick={{ fill: '#7f9aaa', fontSize: 11 }} />
            <YAxis tick={{ fill: '#7f9aaa', fontSize: 11 }} />
            <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
            <Line type="monotone" dataKey="value" stroke="#8d6cff" strokeWidth={2} dot={{ fill: '#8d6cff', r: 3 }} name="Value ($M)" />
          </LineChart>
        </ResponsiveContainer>
      </Panel>
    </div>

    <div className="fleet-bottom-grid">
      <Panel className="fleet-table-panel">
        <div className="panel-heading"><div><p className="eyebrow">TOP ASSETS</p><h2>Fleet leaderboard</h2></div></div>
        <div className="fleet-table">
          <div className="table-header">
            <span>ID</span><span>Owner</span><span>SoH</span><span>Cycles</span><span>Risk</span><span>Value</span>
          </div>
          {topBatteries.map((b, i) => <div key={i} className="table-row">
            <span className="mono">{b.id}</span>
            <span>{b.owner}</span>
            <span style={{ color: b.soh > 90 ? '#b7f36b' : b.soh > 80 ? '#23d9ff' : b.soh > 70 ? '#ffb14a' : '#ff4a6a' }}>{b.soh}%</span>
            <span>{b.cycles.toLocaleString()}</span>
            <span className={`risk-badge ${b.risk}`}>{b.risk}</span>
            <span>{b.value}</span>
          </div>)}
        </div>
      </Panel>

      <Panel className="region-panel">
        <div className="panel-heading"><div><p className="eyebrow">REGIONAL FLEET</p><h2>Distribution by region</h2></div></div>
        <div className="region-list">
          {regionData.map((r, i) => <div key={i} className="region-row">
            <span className="region-name">{r.region}</span>
            <div className="region-bar-wrap">
              <div className="region-bar" style={{ width: `${(r.packs / 874) * 100}%`, background: r.health > 92 ? '#b7f36b' : r.health > 90 ? '#23d9ff' : '#ffb14a' }} />
            </div>
            <span className="region-packs">{r.packs}</span>
            <span className="region-health">{r.health}%</span>
          </div>)}
        </div>
      </Panel>
    </div>
  </div>
}

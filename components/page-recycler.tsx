'use client'

import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { Recycle, Trophy, Award, Target, Upload } from 'lucide-react'

const Panel = ({ children, className = '' }: any) => <section className={`panel ${className}`}>{children}</section>

const leaderboard = [
  { rank: 1, name: 'EcoRecycle Mumbai', accuracy: 98.7, batteries: 1247, badges: ['🏆', '⭐', '🎯'], score: 9870 },
  { rank: 2, name: 'GreenCell Delhi', accuracy: 97.2, batteries: 1089, badges: ['🥈', '⭐'], score: 9720 },
  { rank: 3, name: 'ReVolt Bangalore', accuracy: 96.8, batteries: 956, badges: ['🥉', '🎯'], score: 9680 },
  { rank: 4, name: 'BatteryFirst Chennai', accuracy: 95.1, batteries: 834, badges: ['⭐'], score: 9510 },
  { rank: 5, name: 'PowerCycle Pune', accuracy: 93.4, batteries: 712, badges: [], score: 9340 },
]

const monthlyPerformance = [
  { month: 'Apr', accuracy: 94.2, volume: 180 },
  { month: 'May', accuracy: 95.1, volume: 210 },
  { month: 'Jun', accuracy: 95.8, volume: 245 },
  { month: 'Jul', accuracy: 96.2, volume: 280 },
  { month: 'Aug', accuracy: 96.8, volume: 320 },
  { month: 'Sep', accuracy: 97.2, volume: 345 },
]

const gradeDistribution = [
  { grade: 'A', count: 124, color: '#b7f36b' },
  { grade: 'B', count: 89, color: '#23d9ff' },
  { grade: 'C', count: 45, color: '#ffb14a' },
  { grade: 'D', count: 12, color: '#ff4a6a' },
]

const recentAssessments = [
  { id: 'R-2026-0847', battery: 'BX-1042', grade: 'A', soh: '96.8%', accuracy: '99.1%', time: '5 min ago' },
  { id: 'R-2026-0846', battery: 'BX-0987', grade: 'B', soh: '84.1%', accuracy: '97.8%', time: '12 min ago' },
  { id: 'R-2026-0845', battery: 'BX-1104', grade: 'C', soh: '72.6%', accuracy: '96.2%', time: '20 min ago' },
  { id: 'R-2026-0844', battery: 'BX-0872', grade: 'D', soh: '61.3%', accuracy: '95.4%', time: '28 min ago' },
]

export function RecyclerDashboardPage() {
  return <div className="page-content">
    <div className="section-heading">
      <div>
        <p className="eyebrow">RECYCLER DASHBOARD</p>
        <h2>Accuracy leaderboard. Gamified performance.</h2>
        <p className="muted">Compare against lab ground truth. Earn badges. Climb the ranks.</p>
      </div>
      <button className="primary"><Upload size={15} /> Upload Test Report</button>
    </div>

    <div className="recycler-kpi-row">
      <Panel className="recycler-kpi">
        <Trophy size={22} style={{ color: '#ffb14a' }} />
        <div><span className="kpi-value">#2</span><span className="kpi-label">Your Rank</span></div>
      </Panel>
      <Panel className="recycler-kpi">
        <Target size={22} style={{ color: '#b7f36b' }} />
        <div><span className="kpi-value">97.2%</span><span className="kpi-label">Accuracy</span></div>
      </Panel>
      <Panel className="recycler-kpi">
        <Recycle size={22} style={{ color: '#23d9ff' }} />
        <div><span className="kpi-value">1,089</span><span className="kpi-label">Assessed</span></div>
      </Panel>
      <Panel className="recycler-kpi">
        <Award size={22} style={{ color: '#8d6cff' }} />
        <div><span className="kpi-value">5</span><span className="kpi-label">Badges Earned</span></div>
      </Panel>
    </div>

    <div className="recycler-charts-grid">
      <Panel className="chart-panel">
        <div className="panel-heading"><div><p className="eyebrow">YOUR PERFORMANCE</p><h2>Accuracy vs volume trend</h2></div></div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthlyPerformance} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a3a4c" />
            <XAxis dataKey="month" tick={{ fill: '#7f9aaa', fontSize: 11 }} />
            <YAxis tick={{ fill: '#7f9aaa', fontSize: 11 }} domain={[90, 100]} />
            <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
            <Line type="monotone" dataKey="accuracy" stroke="#b7f36b" strokeWidth={2} dot={{ fill: '#b7f36b', r: 3 }} name="Accuracy %" />
          </LineChart>
        </ResponsiveContainer>
      </Panel>

      <Panel className="chart-panel">
        <div className="panel-heading"><div><p className="eyebrow">GRADE DISTRIBUTION</p><h2>Your assessments</h2></div></div>
        <div className="grade-chart">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="count" paddingAngle={4}>
                {gradeDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0a1522', border: '1px solid #1a3a4c', borderRadius: 8, color: '#eaf6ff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grade-legend">
            {gradeDistribution.map((g, i) => <div key={i} className="legend-item"><span className="legend-dot" style={{ background: g.color }} />Grade {g.grade}: {g.count}</div>)}
          </div>
        </div>
      </Panel>
    </div>

    <Panel className="leaderboard-panel">
      <div className="panel-heading"><div><p className="eyebrow">RECYCLER LEADERBOARD</p><h2>Top performers this quarter</h2></div></div>
      <div className="leaderboard-list">
        {leaderboard.map((r, i) => <div key={i} className={`leaderboard-row ${i === 1 ? 'highlight' : ''}`}>
          <span className="lb-rank">{r.rank <= 3 ? ['🥇', '🥈', '🥉'][r.rank - 1] : `#${r.rank}`}</span>
          <span className="lb-name">{r.name}</span>
          <span className="lb-accuracy">{r.accuracy}%</span>
          <span className="lb-volume">{r.batteries.toLocaleString()}</span>
          <span className="lb-badges">{r.badges.join(' ')}</span>
          <span className="lb-score">{r.score.toLocaleString()}</span>
        </div>)}
      </div>
    </Panel>

    <Panel className="recent-assessments-panel">
      <div className="panel-heading"><div><p className="eyebrow">RECENT ASSESSMENTS</p><h2>Your latest submissions</h2></div></div>
      {recentAssessments.map((a, i) => <div key={i} className="assessment-row">
        <span className="mono">{a.id}</span>
        <span>{a.battery}</span>
        <span className={`grade-mini ${a.grade.toLowerCase()}`}>{a.grade}</span>
        <span>{a.soh}</span>
        <span>{a.accuracy}</span>
        <span className="muted">{a.time}</span>
      </div>)}
    </Panel>
  </div>
}

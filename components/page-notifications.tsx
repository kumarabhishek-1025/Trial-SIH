'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Bell, Mail, MessageSquare, Webhook, CheckCircle2, Clock, AlertTriangle, Send, Settings, Archive, Trash2, Eye } from 'lucide-react'

const Panel = ({ children, className = '' }: any) => <section className={`panel ${className}`}>{children}</section>

const notifications = [
  { id: 1, type: 'grade', title: 'Battery IN-BP-2026-XYZ123 graded B', detail: 'SoH 78.2% · Repurpose recommended · Value: $3,200', time: '2 min ago', read: false, channel: 'email', icon: '🔋', priority: 'high' },
  { id: 2, type: 'compliance', title: 'CPCB ACR deadline in 30 days', detail: '847 batteries need filing · Auto-draft ready for review', time: '15 min ago', read: false, channel: 'sms', icon: '📋', priority: 'high' },
  { id: 3, type: 'alert', title: 'Thermal anomaly detected: BX-0872', detail: 'Cell #7 temperature spike 68°C · Auto-quarantined', time: '1 hr ago', read: false, channel: 'webhook', icon: '⚠️', priority: 'critical' },
  { id: 4, type: 'success', title: 'Fleet sync complete: Tata Motors', detail: '1,247 new data points ingested · 99.2% parse rate', time: '2 hrs ago', read: true, channel: 'email', icon: '✅', priority: 'low' },
  { id: 5, type: 'grade', title: 'Batch grading complete: 42 batteries', detail: '12 Grade A · 18 Grade B · 8 Grade C · 4 Grade D', time: '3 hrs ago', read: true, channel: 'api', icon: '📊', priority: 'medium' },
  { id: 6, type: 'compliance', title: 'Battery Passport batch uploaded', detail: '156 entries pushed to CPCB portal · JSON-LD format', time: '5 hrs ago', read: true, channel: 'email', icon: '🔗', priority: 'low' },
  { id: 7, type: 'alert', title: 'Model drift detected: SoH predictor', detail: 'Data distribution shift +2.1% · AutoML retraining scheduled', time: '8 hrs ago', read: true, channel: 'webhook', icon: '🤖', priority: 'medium' },
  { id: 8, type: 'success', title: 'EPR report filed: Q2 2026', detail: '42% recycling rate achieved · Target: 40% · Exceeded', time: '1 day ago', read: true, channel: 'email', icon: '🎉', priority: 'low' },
]

const channelStats = [
  { channel: 'Email (SendGrid)', sent: 2847, delivered: 2831, opened: 2104, color: '#23d9ff' },
  { channel: 'SMS (Twilio)', sent: 1203, delivered: 1198, opened: null, color: '#b7f36b' },
  { channel: 'API Webhook', sent: 4521, delivered: 4521, opened: null, color: '#8d6cff' },
  { channel: 'CPCB Portal', sent: 847, delivered: 847, opened: null, color: '#ffb14a' },
]

export function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all')
  const [selectedNotif, setSelectedNotif] = useState<number | null>(null)

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'critical') return n.priority === 'critical' || n.priority === 'high'
    return true
  })

  return <div className="page-content">
    <div className="section-heading">
      <div>
        <p className="eyebrow">NOTIFICATION CENTER</p>
        <h2>Never miss a critical event.</h2>
        <p className="muted">Multi-channel alerts: Email, SMS, API webhooks, and CPCB portal push.</p>
      </div>
      <div className="top-actions-inline">
        <button className="ghost"><Settings size={15} /> Configure</button>
        <button className="primary"><Send size={15} /> Send Test</button>
      </div>
    </div>

    <div className="notif-stats-row">
      {channelStats.map((c, i) => <Panel key={i} className="notif-stat-card">
        <div className="notif-stat-dot" style={{ background: c.color }} />
        <div>
          <span className="notif-stat-channel">{c.channel}</span>
          <span className="notif-stat-value">{c.sent.toLocaleString()} sent</span>
        </div>
        <div className="notif-stat-delivery">
          <span>{c.delivered} delivered</span>
          {c.opened && <span>{c.opened} opened</span>}
        </div>
      </Panel>)}
    </div>

    <div className="notif-content-grid">
      <Panel className="notif-list-panel">
        <div className="notif-filters">
          {(['all', 'unread', 'critical'] as const).map(f => <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
            {f === 'all' ? <Bell size={14} /> : f === 'unread' ? <Eye size={14} /> : <AlertTriangle size={14} />}
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'unread' && <span className="notif-count">{notifications.filter(n => !n.read).length}</span>}
          </button>)}
        </div>
        <div className="notif-list">
          <AnimatePresence>
            {filtered.map(n => <motion.div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''} ${selectedNotif === n.id ? 'selected' : ''} ${n.priority}`}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              onClick={() => setSelectedNotif(n.id)}>
              <span className="notif-icon">{n.icon}</span>
              <div className="notif-body">
                <span className="notif-title">{n.title}</span>
                <span className="notif-detail">{n.detail}</span>
                <div className="notif-meta">
                  <span className="notif-time"><Clock size={11} /> {n.time}</span>
                  <span className={`notif-channel-badge ${n.channel}`}>
                    {n.channel === 'email' ? <Mail size={10} /> : n.channel === 'sms' ? <MessageSquare size={10} /> : n.channel === 'webhook' ? <Webhook size={10} /> : <CheckCircle2 size={10} />}
                    {n.channel}
                  </span>
                </div>
              </div>
              {!n.read && <div className="notif-unread-dot" />}
            </motion.div>)}
          </AnimatePresence>
        </div>
      </Panel>

      <Panel className="notif-detail-panel">
        {selectedNotif ? (() => {
          const n = notifications.find(x => x.id === selectedNotif)!
          return <div className="notif-detail-content">
            <span className="notif-icon large">{n.icon}</span>
            <h3>{n.title}</h3>
            <p className="notif-detail-full">{n.detail}</p>
            <div className="notif-detail-meta">
              <span><Clock size={13} /> {n.time}</span>
              <span className={`notif-channel-badge ${n.channel}`}>{n.channel}</span>
              <span className={`priority-badge ${n.priority}`}>{n.priority}</span>
            </div>
            <div className="notif-actions">
              <button className="primary"><CheckCircle2 size={15} /> Mark as read</button>
              <button className="ghost"><Archive size={15} /> Archive</button>
              <button className="ghost danger"><Trash2 size={15} /> Delete</button>
            </div>
          </div>
        }) : <div className="notif-empty"><Bell size={40} style={{ color: '#1a3a4c' }} /><p className="muted">Select a notification to view details</p></div>}
      </Panel>
    </div>
  </div>
}

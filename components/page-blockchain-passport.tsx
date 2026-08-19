'use client'

import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import { BlockchainScene } from '@/components/battx-extra-scenes'
import { SafeCanvas } from '@/components/safe-canvas'
import { ShieldCheck, QrCode, ExternalLink, Copy, CheckCircle2, Lock, Hash } from 'lucide-react'

const Panel = ({ children, className = '' }: any) => <section className={`panel ${className}`}>{children}</section>

const passportData = {
  batteryId: 'IN-BP-2026-XYZ123',
  manufacturer: 'Tata Motors',
  chemistry: 'NMC 811',
  capacity: '60.4 kWh',
  manufactureDate: '2024-03-15',
  currentSoh: '78.2%',
  grade: 'B',
  owner: 'Northstar Energy',
  chainHash: '0x7f4a8b2c...e3d1f9a0',
}

const historyLog = [
  { block: 1, action: 'Battery Manufactured', date: '2024-03-15', actor: 'Tata Motors', hash: '0x1a2b...3c4d', status: 'immutable' },
  { block: 2, action: 'First Owner Registration', date: '2024-04-01', actor: 'Northstar Energy', hash: '0x5e6f...7g8h', status: 'immutable' },
  { block: 3, action: 'SoH Assessment: 94.2%', date: '2025-01-15', actor: 'BATT-X AI', hash: '0x9i0j...1k2l', status: 'immutable' },
  { block: 4, action: 'Grade A Assigned', date: '2025-01-15', actor: 'BATT-X AI', hash: '0x3m4n...5o6p', status: 'immutable' },
  { block: 5, action: 'SoH Assessment: 84.1%', date: '2025-08-20', actor: 'BATT-X AI', hash: '0x7q8r...9s0t', status: 'immutable' },
  { block: 6, action: 'Repurpose Decision', date: '2025-08-20', actor: 'Routing Engine', hash: '0x1u2v...3w4x', status: 'immutable' },
  { block: 7, action: 'SoH Assessment: 78.2%', date: '2026-03-10', actor: 'BATT-X AI', hash: '0x5y6z...7a8b', status: 'latest' },
  { block: 8, action: 'Grade B Assigned', date: '2026-03-10', actor: 'BATT-X AI', hash: '0x9c0d...1e2f', status: 'latest' },
]

export function BlockchainPassportPage() {
  const [copied, setCopied] = useState(false)

  return <div className="page-content">
    <div className="section-heading">
      <div>
        <p className="eyebrow">BLOCKCHAIN BATTERY PASSPORT</p>
        <h2>Immutable. Tamper-proof. Verifiable.</h2>
        <p className="muted">Every battery decision recorded on-chain. QR-linked for instant verification.</p>
      </div>
      <span className="live-chip"><span className="pulse" />CHAIN ACTIVE</span>
    </div>

    <div className="passport-hero-grid">
      <Panel className="passport-3d">
        <div style={{ height: 280 }}>
          <SafeCanvas camera={{ position: [4, 1.5, 4], fov: 42 }} mode="blockchain">
            <color attach="background" args={['#06101b']} />
            <ambientLight intensity={1.2} />
            <pointLight position={[3, 3, 3]} intensity={14} color="#23d9ff" />
            <pointLight position={[-3, 2, -2]} intensity={10} color="#8d6cff" />
            <BlockchainScene />
            <OrbitControls enablePan={false} minDistance={3} maxDistance={8} autoRotate autoRotateSpeed={0.4} />
          </SafeCanvas>
        </div>
      </Panel>

      <Panel className="passport-card-panel">
        <div className="passport-card">
          <div className="passport-card-header">
            <ShieldCheck size={22} style={{ color: '#b7f36b' }} />
            <span>BATTERY HEALTH CERTIFICATE</span>
          </div>
          <div className="passport-card-body">
            <div className="passport-qr">
              <div className="qr-placeholder">
                <QrCode size={80} style={{ color: '#23d9ff' }} />
              </div>
              <span className="muted">Scan to verify</span>
            </div>
            <div className="passport-fields">
              {Object.entries(passportData).map(([key, val]) => <div key={key} className="passport-field">
                <span className="passport-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                <span className="passport-value">{val}</span>
              </div>)}
            </div>
          </div>
          <div className="passport-card-footer">
            <Lock size={13} style={{ color: '#b7f36b' }} />
            <span className="chain-hash">{passportData.chainHash}</span>
            <button className="icon-btn small" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
              {copied ? <CheckCircle2 size={13} style={{ color: '#b7f36b' }} /> : <Copy size={13} />}
            </button>
          </div>
        </div>
      </Panel>
    </div>

    <Panel className="chain-history-panel">
      <div className="panel-heading">
        <div><p className="eyebrow">IMMUTABLE HISTORY</p><h2>Blockchain-verified timeline</h2></div>
        <button className="ghost"><ExternalLink size={14} /> View on Explorer</button>
      </div>
      <div className="chain-timeline">
        {historyLog.map((entry, i) => <div key={i} className={`chain-entry ${entry.status}`}>
          <div className="chain-block-num">
            <Hash size={12} />
            <span>#{entry.block}</span>
          </div>
          <div className="chain-entry-body">
            <span className="chain-action">{entry.action}</span>
            <span className="chain-meta">{entry.actor} · {entry.date}</span>
          </div>
          <div className="chain-hash-entry">
            <Lock size={11} style={{ color: entry.status === 'latest' ? '#23d9ff' : '#b7f36b' }} />
            <span className="mono">{entry.hash}</span>
          </div>
          {i < historyLog.length - 1 && <div className="chain-connector" />}
        </div>)}
      </div>
    </Panel>

    <Panel className="passport-info-banner">
      <ShieldCheck size={20} style={{ color: '#8d6cff' }} />
      <div>
        <strong>Smart Contract Auto-Triggers</strong>
        <p className="muted">When a battery is repurposed, the smart contract auto-releases payment to the recycler. No manual intervention needed.</p>
      </div>
    </Panel>
  </div>
}

'use client'

import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import { DataFlowScene } from '@/components/battx-extra-scenes'
import { SafeCanvas } from '@/components/safe-canvas'
import { Upload, FileText, Database, Globe2, CheckCircle2, Clock, AlertTriangle, ArrowUpRight, ChevronRight, FileSpreadsheet, Cpu } from 'lucide-react'

const Panel = ({ children, className = '' }: any) => <section className={`panel ${className}`}>{children}</section>

const sources = [
  { name: 'OEM Fleet API', type: 'Tata Motors / Mahindra Electric / Ather', status: 'connected', icon: Globe2, synced: '2,847 packs', color: '#23d9ff' },
  { name: 'BMS Cloud Logs', type: 'Tesla / LG / CATL APIs', status: 'connected', icon: Database, synced: '14.2M data points', color: '#8d6cff' },
  { name: 'Recycler CSV/Excel', type: 'Test reports & lab data', status: 'pending', icon: FileSpreadsheet, synced: '1,203 uploads', color: '#b7f36b' },
  { name: 'PDF/OCR Parser', type: 'NLP-powered extraction', status: 'connected', icon: FileText, synced: '891 documents', color: '#ffb14a' },
]

const recentUploads = [
  { id: 'IN-BP-2026-001', file: 'tata_nexon_batch_42.csv', rows: 12847, status: 'parsed', time: '2 min ago', accuracy: '99.2%' },
  { id: 'IN-BP-2026-002', file: 'mahindra_xuv_report.pdf', rows: 8342, status: 'parsing', time: '5 min ago', accuracy: '—' },
  { id: 'IN-BP-2026-003', file: 'ather_450x_bms_log.json', rows: 45210, status: 'parsed', time: '12 min ago', accuracy: '98.7%' },
  { id: 'IN-BP-2026-004', file: 'lg_cell_batch_7.xlsx', rows: 3420, status: 'failed', time: '18 min ago', accuracy: '—' },
  { id: 'IN-BP-2026-005', file: 'catl_module_thermal.csv', rows: 89012, status: 'parsed', time: '24 min ago', accuracy: '99.8%' },
]

export function DataIngestionPage() {
  const [dragOver, setDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const handleUpload = () => {
    setUploading(true)
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) { clearInterval(interval); setUploading(false); return 100 }
        return p + 2
      })
    }, 50)
  }

  return <div className="page-content">
    <div className="section-heading">
      <div>
        <p className="eyebrow">MULTI-SOURCE DATA INGESTION</p>
        <h2>Pull data from every source. Miss nothing.</h2>
        <p className="muted">API connectors, OCR, NLP parsing — all automated.</p>
      </div>
      <span className="live-chip"><span className="pulse" />ENGINE ACTIVE</span>
    </div>

    <div className="ingestion-grid">
      <Panel className="upload-panel">
        <div className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleUpload() }}>
          <Upload size={40} className="upload-icon" />
          <h3>Drop files here</h3>
          <p className="muted">CSV, Excel, PDF, JSON — we handle them all</p>
          <button className="primary" onClick={handleUpload}>
            <FileSpreadsheet size={16} /> Browse files
          </button>
          <p className="fine-print">Max 500MB per file · Auto-detected format</p>
        </div>
        {uploading && <div className="upload-progress">
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${uploadProgress}%` }} /></div>
          <span>{uploadProgress}% — {uploadProgress < 30 ? 'Detecting format...' : uploadProgress < 60 ? 'Running OCR/NLP...' : uploadProgress < 90 ? 'Validating schema...' : 'Complete!'}</span>
        </div>}
      </Panel>

      <Panel className="data-flow-panel">
        <p className="eyebrow">DATA FLOW ENGINE</p>
        <h3>Real-time pipeline</h3>
        <div style={{ height: 280 }}>
          <SafeCanvas camera={{ position: [3, 2, 4], fov: 42 }} mode="dataflow">
            <color attach="background" args={['#06101b']} />
            <ambientLight intensity={1.2} />
            <pointLight position={[3, 3, 3]} intensity={12} color="#23d9ff" />
            <DataFlowScene />
            <OrbitControls enablePan={false} minDistance={3} maxDistance={8} autoRotate autoRotateSpeed={0.5} />
          </SafeCanvas>
        </div>
      </Panel>
    </div>

    <div className="sources-grid">
      {sources.map((s, i) => <Panel key={i} className="source-card">
        <div className="source-header">
          <div className="source-icon" style={{ color: s.color }}><s.icon size={22} /></div>
          <div>
            <h4>{s.name}</h4>
            <p className="muted">{s.type}</p>
          </div>
          <span className={`status-badge ${s.status}`}>{s.status}</span>
        </div>
        <div className="source-stats">
          <span><strong>{s.synced}</strong> synced</span>
          <ChevronRight size={14} />
        </div>
      </Panel>)}
    </div>

    <Panel className="recent-uploads-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">RECENT INGESTIONS</p>
          <h2>Upload history</h2>
        </div>
      </div>
      <div className="uploads-table">
        <div className="table-header">
          <span>Battery ID</span><span>File</span><span>Rows</span><span>Status</span><span>Accuracy</span><span>Time</span>
        </div>
        {recentUploads.map((u, i) => <div key={i} className="table-row">
          <span className="mono">{u.id}</span>
          <span className="file-name">{u.file}</span>
          <span>{u.rows.toLocaleString()}</span>
          <span className={`status-badge ${u.status}`}>
            {u.status === 'parsed' ? <CheckCircle2 size={13} /> : u.status === 'parsing' ? <Clock size={13} /> : <AlertTriangle size={13} />}
            {u.status}
          </span>
          <span>{u.accuracy}</span>
          <span className="muted">{u.time}</span>
        </div>)}
      </div>
    </Panel>

    <div className="ingestion-kpis">
      <Panel className="kpi-card">
        <Cpu size={20} style={{ color: '#23d9ff' }} />
        <div><span className="kpi-value">2.4M</span><span className="kpi-label">Data points/day</span></div>
      </Panel>
      <Panel className="kpi-card">
        <CheckCircle2 size={20} style={{ color: '#b7f36b' }} />
        <div><span className="kpi-value">99.4%</span><span className="kpi-label">Parse accuracy</span></div>
      </Panel>
      <Panel className="kpi-card">
        <Clock size={20} style={{ color: '#ffb14a' }} />
        <div><span className="kpi-value">1.2s</span><span className="kpi-label">Avg processing</span></div>
      </Panel>
      <Panel className="kpi-card">
        <Database size={20} style={{ color: '#8d6cff' }} />
        <div><span className="kpi-value">847</span><span className="kpi-label">Active sources</span></div>
      </Panel>
    </div>
  </div>
}

'use client'

const cyan = '#23d9ff'
const violet = '#8d6cff'
const lime = '#b7f36b'
const amber = '#ffb14a'
const red = '#ff4a6a'

function Particles({ count = 30, color = cyan }: { count?: number; color?: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${(i * 37 + 13) % 100}%`,
          top: `${(i * 53 + 7) % 100}%`,
          width: `${2 + (i % 4)}px`,
          height: `${2 + (i % 4)}px`,
          borderRadius: '50%',
          background: color,
          opacity: 0,
          animation: `cssPFloat ${3 + (i % 3)}s ${(i * 0.3) % 2}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  )
}

function Rings() {
  return (
    <>
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 260, height: 140, marginTop: -70, marginLeft: -130, border: `1px solid ${cyan}33`, borderRadius: '50%', animation: 'cssOrbitSpin 12s linear infinite' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 300, height: 170, marginTop: -85, marginLeft: -150, border: `1px solid ${violet}22`, borderRadius: '50%', animation: 'cssOrbitSpin 18s linear infinite reverse' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 340, height: 190, marginTop: -95, marginLeft: -170, border: `1px solid ${lime}18`, borderRadius: '50%', animation: 'cssOrbitSpin 24s linear infinite' }} />
    </>
  )
}

export function BatteryPackCSS({ charge = 80, scan = false, risk = 'low' }: any) {
  const riskColor = risk === 'high' ? red : risk === 'medium' ? amber : cyan
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', perspective: 900 }}>
      <Rings />
      <Particles count={25} color={riskColor} />
      <div style={{ position: 'relative', zIndex: 2, animation: 'cssFloat 4s ease-in-out infinite', textAlign: 'center', transform: 'translateX(12%) rotateX(10deg) rotateY(-18deg)', transformStyle: 'preserve-3d' }}>
        <div style={{ width: 66, height: 12, background: 'linear-gradient(90deg, #183b4d, #32647a)', borderRadius: '6px 6px 0 0', margin: '0 auto -2px', position: 'relative', zIndex: 1, boxShadow: `0 0 18px ${cyan}33` }} />
        <div style={{ width: 300, padding: '16px 18px', background: 'linear-gradient(135deg, #102d3d, #071722)', border: `2px solid ${riskColor}66`, borderRadius: 16, boxShadow: `18px 24px 0 #02070b, 0 0 42px ${riskColor}33`, transformStyle: 'preserve-3d' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7, transform: 'translateZ(18px)' }}>
            {Array.from({ length: 16 }, (_, i) => {
              const isWarn = i === 7
              const isAcc = i === 12
              const bg = isWarn ? amber : isAcc ? violet : lime
              return (
                <div key={i} style={{
                  aspectRatio: 1.18, borderRadius: 6, position: 'relative', overflow: 'hidden',
                  background: 'linear-gradient(145deg, #163b4a, #081723 70%)', border: `1px solid ${bg}55`, boxShadow: `inset 0 8px 16px ${bg}12, 0 0 12px ${bg}18`,
                  animation: scan ? `cssScan 1.5s ${i * 0.08}s ease-in-out infinite` : `cssGlow 3s ${i * 0.15}s ease-in-out infinite`,
                }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: `linear-gradient(to top, ${bg}33, ${bg}08)`, borderRadius: '0 0 2px 2px' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${charge * 0.6}%`, background: `${bg}44`, borderRadius: '0 0 2px 2px', transition: 'height 1s' }} />
                </div>
              )
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, fontSize: 13, fontWeight: 700, color: riskColor }}>
            {charge}% SoH
            <div style={{ fontSize: 9, color: '#7f9aaa', fontWeight: 400, marginTop: 2 }}>EV-42 · LIVE TELEMETRY</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function VehicleCSS() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <Rings />
      <Particles count={18} color={cyan} />
      <div style={{ position: 'relative', zIndex: 2, animation: 'cssFloat 5s ease-in-out infinite' }}>
        <div style={{ position: 'relative', width: 200, height: 80 }}>
          <div style={{ position: 'absolute', bottom: 0, left: 10, right: 10, height: 32, background: 'linear-gradient(135deg, #142635, #1d3d4c)', borderRadius: '8px 8px 4px 4px', border: '1px solid #1a3a4c' }} />
          <div style={{ position: 'absolute', bottom: 30, left: 50, right: 50, height: 32, background: 'linear-gradient(135deg, #1d3d4c, #142635)', borderRadius: '8px 8px 0 0', border: '1px solid #1a3a4c', borderBottom: 'none' }} />
          <div style={{ position: 'absolute', bottom: 34, left: 58, right: 58, height: 22, background: 'linear-gradient(135deg, #07131f, #0a1522)', borderRadius: '4px 4px 0 0', border: '1px solid #1a3a4c', borderBottom: 'none' }} />
          <div style={{ position: 'absolute', bottom: 12, left: 8, width: 6, height: 10, borderRadius: 2, background: cyan, boxShadow: `0 0 10px ${cyan}88`, animation: 'cssGlow 2s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: 12, right: 8, width: 6, height: 10, borderRadius: 2, background: cyan, boxShadow: `0 0 10px ${cyan}88`, animation: 'cssGlow 2s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: 16, left: 30, right: 30, height: 3, background: `linear-gradient(90deg, ${cyan}00, ${cyan}88, ${cyan}00)`, borderRadius: 2, animation: 'cssGlow 1.5s ease-in-out infinite' }} />
          {[{ l: 28, b: -2 }, { r: 28, b: -2 }, { l: 28, b: -2, rear: true }, { r: 28, b: -2, rear: true }].map((w, i) => (
            <div key={i} style={{
              position: 'absolute', bottom: w.b, ...(w.l != null ? { left: w.l } : {}), ...(w.r != null ? { right: w.r } : {}),
              width: 22, height: 22, borderRadius: '50%',
              background: 'radial-gradient(circle, #243b4b, #101b26)',
              border: '2px solid #1a3a4c',
              animation: 'cssWheelSpin 2s linear infinite',
            }} />
          ))}
        </div>
        <div style={{ width: 160, height: 12, background: 'radial-gradient(ellipse, #0005, transparent)', borderRadius: '50%', margin: '20px auto 0' }} />
      </div>
    </div>
  )
}

export function FleetOrbsCSS() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <Particles count={22} color={cyan} />
      {[
        { label: 'BX-1042', color: lime, size: 65, top: '50%', left: '50%', z: 3, delay: 0 },
        { label: 'BX-1104', color: violet, size: 48, top: '35%', left: '22%', z: 2, delay: 1 },
        { label: 'BX-0872', color: amber, size: 48, top: '35%', left: '72%', z: 2, delay: 2 },
      ].map((o, i) => (
        <div key={i} style={{ position: 'absolute', top: o.top, left: o.left, transform: 'translate(-50%,-50%)', zIndex: o.z, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, animation: `cssFloat 4s ${o.delay}s ease-in-out infinite` }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: o.size, height: o.size, borderRadius: '50%', background: `radial-gradient(circle, ${o.color}44, ${o.color}11)`, animation: 'cssPulse 3s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', top: -8, left: -8, right: -8, bottom: -8, border: `2px solid ${o.color}44`, borderRadius: '50%', animation: 'cssOrbitSpin 8s linear infinite' }} />
          </div>
          <span style={{ fontSize: 10, color: '#7f9aaa', whiteSpace: 'nowrap' }}>{o.label}</span>
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: '18%', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: `radial-gradient(circle, ${cyan}44, ${cyan}11)`, border: `2px solid ${cyan}44`, animation: 'cssPulse 2s ease-in-out infinite', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: `1px solid ${cyan}22`, animation: 'cssReact 3s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  )
}

export function DataFlowCSS() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <Particles count={18} color={cyan} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 3 }}>
        <div style={{ width: 70, height: 70, borderRadius: '50%', border: `2px solid ${cyan}66`, display: 'grid', placeItems: 'center', fontSize: 16, fontWeight: 800, color: cyan, background: `radial-gradient(circle, ${cyan}15, transparent)`, animation: 'cssPulse 3s ease-in-out infinite', position: 'relative' }}>
          AI
          <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: `1px solid ${cyan}33`, animation: 'cssReact 2s ease-in-out infinite' }} />
        </div>
      </div>
      {[
        { label: 'OEM API', top: 12, left: 12, color: cyan, delay: 0 },
        { label: 'BMS Logs', top: 12, right: 12, color: violet, delay: 0.3 },
        { label: 'CSV/Excel', bottom: 12, left: 12, color: lime, delay: 0.6 },
        { label: 'PDF/OCR', bottom: 12, right: 12, color: amber, delay: 0.9 },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', ...('top' in s ? { top: s.top } : {}), ...('bottom' in s ? { bottom: s.bottom } : {}), ...('left' in s ? { left: s.left } : {}), ...('right' in s ? { right: s.right } : {}), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 2 }}>
          <div style={{ width: 38, height: 28, background: '#142838', border: `1px solid ${s.color}44`, borderRadius: 6, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%', background: `${s.color}11`, borderRadius: '6px 6px 0 0' }} />
          </div>
          <span style={{ fontSize: 8, color: '#7f9aaa' }}>{s.label}</span>
          <div style={{ position: 'absolute', width: 2, height: 30, background: `linear-gradient(${s.color}44, transparent)`, animation: `cssGlow 2s ${s.delay}s ease-in-out infinite`, ...('top' in s ? { top: '100%', marginTop: 4 } : {}), ...('bottom' in s ? { bottom: '100%', marginBottom: 4, transform: 'rotate(180deg)' } : {}) }} />
        </div>
      ))}
      <div style={{ position: 'absolute', right: '12%', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 2 }}>
        <div style={{ width: 45, height: 32, background: `${lime}08`, border: `1px solid ${lime}44`, borderRadius: 6 }} />
        <span style={{ fontSize: 8, color: lime }}>OUTPUT</span>
      </div>
    </div>
  )
}

export function RecyclingCSS() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <Particles count={16} color={lime} />
      <div style={{ position: 'absolute', bottom: '38%', left: '12%', right: '12%', height: 8, background: '#142838', borderRadius: 4, overflow: 'hidden', zIndex: 2 }}>
        <div style={{ width: 28, height: 28, background: cyan, borderRadius: 4, position: 'absolute', top: -10, animation: 'cssConveyor 4s linear infinite' }} />
      </div>
      {[
        { label: 'SHREDDER', left: '8%', bottom: '42%', color: lime },
        { label: 'SEPARATOR', left: '50%', bottom: '42%', color: violet, center: true },
        { label: 'Li RECOVERY', left: '82%', bottom: '42%', color: amber },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', ...s, transform: s.center ? 'translateX(-50%)' : undefined, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 2, animation: `cssFloat 3s ${i * 0.5}s ease-in-out infinite` }}>
          <div style={{ width: 50, height: 55, background: 'linear-gradient(135deg, #142838, #0c1e2c)', border: `1px solid ${s.color}44`, borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: `${s.color}11` }} />
          </div>
          <span style={{ fontSize: 8, color: '#7f9aaa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}

export function ComplianceCSS() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <Particles count={14} color={lime} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 3 }}>
        <div style={{ width: 70, height: 70, borderRadius: '50%', border: `2px solid ${lime}66`, display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 800, color: lime, animation: 'cssPulse 3s ease-in-out infinite', position: 'relative' }}>
          CPCB
          <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: `1px solid ${lime}22`, animation: 'cssOrbitSpin 10s linear infinite' }} />
        </div>
      </div>
      {[
        { label: 'ACR', top: 12, left: '50%', color: lime, delay: 0, center: true },
        { label: 'Q4 Target', top: '50%', right: 12, color: violet, delay: 0.5, center: false },
        { label: 'Passport', bottom: 12, left: '50%', color: amber, delay: 1, center: true },
        { label: 'Audit', top: '50%', left: 12, color: cyan, delay: 1.5, center: false },
      ].map((d, i) => (
        <div key={i} style={{ position: 'absolute', ...d, transform: d.center ? 'translate(-50%,-50%)' : undefined, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 2, animation: `cssDocFloat 3s ${d.delay}s ease-in-out infinite` }}>
          <div style={{ width: 36, height: 44, background: 'linear-gradient(135deg, #142838, #0c1e2c)', border: `1px solid ${d.color}44`, borderRadius: 4, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 8, left: 5, right: 5, height: 2, background: '#7f9aaa44', borderRadius: 1 }} />
            <div style={{ position: 'absolute', top: 14, left: 5, right: 8, height: 2, background: '#7f9aaa33', borderRadius: 1 }} />
            <div style={{ position: 'absolute', top: 20, left: 5, right: 6, height: 2, background: '#7f9aaa22', borderRadius: 1 }} />
          </div>
          <span style={{ fontSize: 8, color: '#7f9aaa' }}>{d.label}</span>
        </div>
      ))}
    </div>
  )
}

export function BlockchainCSS() {
  const blocks = [
    { label: 'Genesis', color: cyan },
    { label: 'SoH: 94%', color: lime },
    { label: 'Grade A', color: violet },
    { label: 'Repurpose', color: amber },
  ]
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', gap: 0, padding: '0 20px' }}>
      <Particles count={10} color={violet} />
      {blocks.map((b, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', zIndex: 2, animation: `cssFloat 3s ${i * 0.3}s ease-in-out infinite` }}>
          <div style={{ width: 90, padding: '10px 8px', background: 'linear-gradient(135deg, #142838, #0c1e2c)', border: `1px solid ${b.color}44`, borderRadius: 6, textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: 9, fontWeight: 600, color: '#eaf6ff' }}>{b.label}</div>
            <div style={{ fontSize: 8, color: '#7f9aaa', marginTop: 2 }}>#{i + 1}</div>
          </div>
          {i < blocks.length - 1 && <div style={{ width: 20, height: 2, background: `linear-gradient(90deg, ${b.color}44, ${blocks[i + 1].color}44)`, zIndex: 1 }} />}
        </div>
      ))}
    </div>
  )
}

export function ThermalCSS() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 4, padding: 16, maxWidth: 340, zIndex: 2 }}>
        {Array.from({ length: 32 }, (_, i) => {
          const temp = 20 + ((i * 17 + 7) % 55)
          const color = temp > 60 ? red : temp > 40 ? amber : temp > 25 ? lime : cyan
          return (
            <div key={i} style={{
              aspectRatio: 1, borderRadius: 6, display: 'grid', placeItems: 'center',
              fontSize: 9, fontWeight: 700, color: '#eaf6ff',
              background: `${color}33`,
              boxShadow: `0 0 ${temp > 50 ? 12 : 6}px ${color}44`,
              border: '1px solid #1a3a4c33',
              animation: `cssGlow 2s ${i * 0.05}s ease-in-out infinite`,
            }}>
              {temp}°
            </div>
          )
        })}
      </div>
    </div>
  )
}

const sceneMap: Record<string, React.FC<any>> = {
  vehicle: VehicleCSS,
  owner: BatteryPackCSS,
  admin: FleetOrbsCSS,
  dataflow: DataFlowCSS,
  recycling: RecyclingCSS,
  compliance: ComplianceCSS,
  blockchain: BlockchainCSS,
  thermal: ThermalCSS,
  energyflow: FleetOrbsCSS,
}

export function CSSScene({ mode = 'owner', charge, fleetRisk, scan }: any) {
  const SceneComponent = sceneMap[mode] || BatteryPackCSS
  return <SceneComponent charge={charge} fleetRisk={fleetRisk} scan={scan} />
}

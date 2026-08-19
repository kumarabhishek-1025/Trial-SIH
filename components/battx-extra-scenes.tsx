'use client'

import { useFrame } from '@react-three/fiber'
import { Float, Sparkles, Text } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const cyan = '#23d9ff'
const violet = '#8d6cff'
const lime = '#b7f36b'
const amber = '#ffb14a'
const red = '#ff4a6a'

function ParticleFlow({ count = 120, color = cyan, speed = 1, spread = 3 }: { count?: number; color?: string; speed?: number; spread?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread
    }
    return arr
  }, [count, spread])
  const velocities = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.02
      arr[i * 3 + 1] = Math.random() * 0.015 + 0.005
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }
    return arr
  }, [count])

  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3] * speed
      pos[i * 3 + 1] += velocities[i * 3 + 1] * speed
      pos[i * 3 + 2] += velocities[i * 3 + 2] * speed
      if (pos[i * 3 + 1] > spread / 2) {
        pos[i * 3] = (Math.random() - 0.5) * spread
        pos[i * 3 + 1] = -spread / 2
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={ref}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[positions, 3]} />
    </bufferGeometry>
    <pointsMaterial size={0.04} color={color} transparent opacity={0.8} sizeAttenuation />
  </points>
}

function CircuitNode({ position, active, label }: { position: [number, number, number]; active?: boolean; label?: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.scale.setScalar(active ? 1 + Math.sin(clock.getElapsedTime() * 4) * 0.15 : 1)
  })
  return <group position={position}>
    <mesh ref={ref}>
      <octahedronGeometry args={[0.18, 0]} />
      <meshStandardMaterial color={active ? cyan : '#1a3a4c'} emissive={active ? cyan : '#000'} emissiveIntensity={active ? 2 : 0} metalness={0.8} roughness={0.2} />
    </mesh>
    {label && <Text position={[0, 0.35, 0]} color={cyan} fontSize={0.09} anchorX="center">{label}</Text>}
  </group>
}

function CircuitTrace({ start, end, color = cyan }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
  const ref = useRef<THREE.Mesh>(null)
  const mid: [number, number, number] = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 0.3, (start[2] + end[2]) / 2]
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end)
    )
    return new THREE.TubeGeometry(curve, 20, 0.015, 8, false)
  }, [start, end, mid])

  useFrame(({ clock }) => {
    if (!ref.current) return
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.4 + Math.sin(clock.getElapsedTime() * 2) * 0.3
  })

  return <mesh ref={ref} geometry={points}>
    <meshBasicMaterial color={color} transparent opacity={0.6} />
  </mesh>
}

export function EnergyFlowScene() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.1
  })

  const nodes: [number, number, number, boolean, string][] = [
    [0, 0, 0, true, 'CPU'],
    [1.5, 0.8, 0, false, 'SoH'],
    [-1.5, 0.8, 0, false, 'RUL'],
    [0, 0.8, 1.2, false, 'Safety'],
    [0, 0.8, -1.2, false, 'Route'],
    [1.5, -0.8, 0.8, false, 'Grade'],
    [-1.5, -0.8, -0.8, false, 'Value'],
  ]

  return <group ref={group}>
    <ParticleFlow count={80} color={cyan} speed={0.8} spread={4} />
    <ParticleFlow count={50} color={violet} speed={0.5} spread={3} />
    {nodes.map((n, i) => <CircuitNode key={i} position={[n[0], n[1], n[2]]} active={n[3]} label={n[4]} />)}
    {nodes.slice(1).map((n, i) => <CircuitTrace key={i} start={[0, 0, 0]} end={[n[0], n[1], n[2]]} color={i % 2 === 0 ? cyan : violet} />)}
    <CircuitTrace start={[1.5, 0.8, 0]} end={[1.5, -0.8, 0.8]} color={lime} />
    <CircuitTrace start={[-1.5, 0.8, 0]} end={[-1.5, -0.8, -0.8]} color={amber} />
    <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[2.8, 48]} />
      <meshStandardMaterial color="#0a1a28" metalness={0.5} roughness={0.5} transparent opacity={0.6} />
    </mesh>
    <Sparkles count={30} scale={4} size={1.5} speed={0.6} color={cyan} />
  </group>
}

export function ThermalMapScene() {
  const group = useRef<THREE.Group>(null)
  const cells = useMemo(() => {
    const arr = []
    for (let x = 0; x < 8; x++) {
      for (let z = 0; z < 4; z++) {
        const temp = 20 + Math.random() * 55
        arr.push({ x: x * 0.55 - 1.9, z: z * 0.55 - 0.8, temp, baseColor: temp > 60 ? red : temp > 40 ? amber : temp > 25 ? lime : cyan })
      }
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.15
  })

  return <group ref={group} scale={0.9}>
    {cells.map((cell, i) => {
      const pulseScale = 1 + Math.sin(Date.now() * 0.003 + i * 0.5) * 0.05
      return <group key={i} position={[cell.x, 0, cell.z]}>
        <mesh scale={[0.45, 0.6 + cell.temp * 0.008, 0.45]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={cell.baseColor} emissive={cell.baseColor} emissiveIntensity={cell.temp > 50 ? 1.8 : 0.5} transparent opacity={0.85} metalness={0.4} roughness={0.3} />
        </mesh>
        <Text position={[0, 0.8, 0]} color={cell.baseColor} fontSize={0.08} anchorX="center">{Math.round(cell.temp)}°C</Text>
      </group>
    })}
    <Text position={[0, 2, 0]} color={cyan} fontSize={0.14} anchorX="center">THERMAL MAP — PACK BMS-042</Text>
    <Sparkles count={20} scale={3} size={1} speed={0.4} color={amber} />
  </group>
}

export function RecyclingScene() {
  const group = useRef<THREE.Group>(null)
  const conveyorRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.08
    if (conveyorRef.current) conveyorRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.5) * 1.5
  })

  return <group ref={group} scale={0.85}>
    <mesh position={[0, -0.6, 0]}>
      <boxGeometry args={[5, 0.12, 1.2]} />
      <meshStandardMaterial color="#1a2e3e" metalness={0.8} roughness={0.3} />
    </mesh>
    <mesh ref={conveyorRef} position={[0, -0.35, 0]}>
      <boxGeometry args={[0.6, 0.4, 0.6]} />
      <meshStandardMaterial color={cyan} emissive={cyan} emissiveIntensity={1.5} transparent opacity={0.85} />
      <Text position={[0, 0.5, 0]} color={cyan} fontSize={0.12} anchorX="center">IN-BP-2026</Text>
    </mesh>
    <group position={[-2, 0.5, 0]}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 16]} />
        <meshStandardMaterial color="#1a3040" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.03, 8, 24]} />
        <meshBasicMaterial color={lime} />
      </mesh>
      <Text position={[0, 1, 0]} color={lime} fontSize={0.1} anchorX="center">SHREDDER</Text>
    </group>
    <group position={[2, 0.5, 0]}>
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 1, 16]} />
        <meshStandardMaterial color="#1a3040" metalness={0.7} roughness={0.3} />
      </mesh>
      <Text position={[0, 0.8, 0]} color={violet} fontSize={0.1} anchorX="center">SEPARATOR</Text>
    </group>
    <group position={[0, 1.5, 0]}>
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={amber} emissive={amber} emissiveIntensity={1.2} transparent opacity={0.8} />
      </mesh>
      <Text position={[0, 0.7, 0]} color={amber} fontSize={0.1} anchorX="center">Li Recovery</Text>
    </group>
    <ParticleFlow count={60} color={lime} speed={1.2} spread={3} />
    <Sparkles count={25} scale={3} size={1.2} speed={0.7} color={amber} />
  </group>
}

export function DataFlowScene() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.12
  })

  const sources = [
    { pos: [-2, 1, 0] as [number, number, number], label: 'OEM API', color: cyan },
    { pos: [-2, 0, 1] as [number, number, number], label: 'BMS Logs', color: violet },
    { pos: [-2, 0, -1] as [number, number, number], label: 'CSV/Excel', color: lime },
    { pos: [-2, -1, 0] as [number, number, number], label: 'PDF/OCR', color: amber },
  ]

  return <group ref={group}>
    <mesh position={[0, 0, 0]}>
      <dodecahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial color={cyan} emissive={cyan} emissiveIntensity={1.5} metalness={0.8} roughness={0.15} wireframe />
    </mesh>
    <Text position={[0, 1.1, 0]} color={cyan} fontSize={0.13} anchorX="center">AI ENGINE</Text>
    <group position={[2, 0, 0]}>
      <mesh>
        <boxGeometry args={[1.2, 0.8, 0.8]} />
        <meshStandardMaterial color="#142838" metalness={0.7} roughness={0.3} />
      </mesh>
      <Text position={[0, 0.65, 0]} color={lime} fontSize={0.1} anchorX="center">OUTPUT</Text>
    </group>
    {sources.map((s, i) => <group key={i}>
      <group position={s.pos}>
        <mesh>
          <boxGeometry args={[0.5, 0.35, 0.35]} />
          <meshStandardMaterial color="#1a2e3e" emissive={s.color} emissiveIntensity={0.8} metalness={0.6} roughness={0.3} />
        </mesh>
        <Text position={[0, 0.35, 0]} color={s.color} fontSize={0.08} anchorX="center">{s.label}</Text>
      </group>
      <CircuitTrace start={s.pos} end={[0, 0, 0]} color={s.color} />
    </group>)}
    <CircuitTrace start={[0, 0, 0]} end={[2, 0, 0]} color={lime} />
    <ParticleFlow count={70} color={cyan} speed={1} spread={4} />
    <Sparkles count={35} scale={4} size={1.6} speed={0.5} color={violet} />
  </group>
}

export function ComplianceScene() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.08
  })

  return <group ref={group} scale={0.9}>
    <group position={[0, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.8, 0.8, 1.5, 6]} />
        <meshStandardMaterial color="#142838" metalness={0.8} roughness={0.2} />
      </mesh>
      <Text position={[0, 1.1, 0]} color={cyan} fontSize={0.12} anchorX="center">CPCB</Text>
      <Text position={[0, 0.85, 0]} color={lime} fontSize={0.09} anchorX="center">EPR PORTAL</Text>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.025, 8, 32]} />
        <meshBasicMaterial color={cyan} transparent opacity={0.6} />
      </mesh>
    </group>
    {[[-1.8, -0.5, 0], [1.8, -0.5, 0], [0, -0.5, 1.5], [0, -0.5, -1.5]].map((pos, i) => {
      const colors = [lime, violet, amber, cyan]
      const labels = ['ACR', 'Q4 Target', 'Passport', 'Audit']
      return <group key={i} position={pos as [number, number, number]}>
        <mesh>
          <boxGeometry args={[0.5, 0.7, 0.15]} />
          <meshStandardMaterial color="#1a3040" emissive={colors[i]} emissiveIntensity={0.6} metalness={0.6} roughness={0.3} />
        </mesh>
        <Text position={[0, 0.55, 0]} color={colors[i]} fontSize={0.08} anchorX="center">{labels[i]}</Text>
      </group>
    })}
    <Sparkles count={30} scale={3} size={1.2} speed={0.4} color={lime} />
  </group>
}

export function BlockchainScene() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.1
  })

  const blocks = [
    { pos: [-1.5, 0, 0] as [number, number, number], label: 'Genesis', color: cyan },
    { pos: [0, 0, 0] as [number, number, number], label: 'SoH: 94%', color: lime },
    { pos: [1.5, 0, 0] as [number, number, number], label: 'Grade A', color: violet },
    { pos: [3, 0, 0] as [number, number, number], label: 'Repurpose', color: amber },
  ]

  return <group ref={group} scale={0.8}>
    {blocks.map((b, i) => <group key={i} position={b.pos}>
      <mesh>
        <boxGeometry args={[1, 0.6, 0.6]} />
        <meshStandardMaterial color="#142838" emissive={b.color} emissiveIntensity={0.5} metalness={0.7} roughness={0.2} />
      </mesh>
      <Text position={[0, 0.5, 0]} color={b.color} fontSize={0.09} anchorX="center">{b.label}</Text>
      <Text position={[0, 0, 0]} color="#7f9aaa" fontSize={0.06} anchorX="center">Block #{i + 1}</Text>
    </group>)}
    {blocks.slice(0, -1).map((b, i) => {
      const next = blocks[i + 1]
      return <CircuitTrace key={i} start={b.pos} end={next.pos} color={cyan} />
    })}
    <Text position={[0, 1.5, 0]} color={cyan} fontSize={0.14} anchorX="center">BATTERY PASSPORT CHAIN</Text>
    <ParticleFlow count={40} color={violet} speed={0.6} spread={5} />
    <Sparkles count={20} scale={4} size={1.4} speed={0.5} color={cyan} />
  </group>
}

'use client'

import { useFrame } from '@react-three/fiber'
import { Float, Sparkles, Text } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const cyan = '#23d9ff'
const violet = '#8d6cff'
const lime = '#b7f36b'
const amber = '#ffb14a'
export type VehicleRisk = 'low' | 'medium' | 'high'

function Wheel({ position, spinning, risk }: { position: [number, number, number]; spinning: boolean; risk: VehicleRisk }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => { if (ref.current && spinning) ref.current.rotation.x -= delta * 2.8 })
  const glow = risk === 'high' ? amber : risk === 'medium' ? violet : cyan
  return <group ref={ref} position={position} rotation={[Math.PI / 2, 0, 0]}><mesh><cylinderGeometry args={[.43, .43, .22, 24]} /><meshStandardMaterial color="#101b26" metalness={.92} roughness={.2} /></mesh><mesh position={[0, .12, 0]}><cylinderGeometry args={[.23, .23, .03, 16]} /><meshStandardMaterial color="#243b4b" metalness={.85} roughness={.16} /></mesh><mesh position={[0, .14, 0]}><torusGeometry args={[.31, .018, 8, 32]} /><meshBasicMaterial color={glow} /></mesh></group>
}

function Busbar({ position, rotation = [0, 0, 0] as [number, number, number], color = cyan }: { position: [number, number, number]; rotation?: [number, number, number]; color?: string }) {
  return <mesh position={position} rotation={rotation}><boxGeometry args={[.08, .035, 1.42]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} metalness={.8} /></mesh>
}

function EnergyRibbon({ active, color }: { active: boolean; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => { if (ref.current) { ref.current.rotation.y = clock.getElapsedTime() * (active ? 1.5 : .4); ref.current.scale.setScalar(active ? 1 + Math.sin(clock.getElapsedTime() * 7) * .04 : 1) } })
  return <mesh ref={ref} position={[0, .45, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.32, .018, 8, 64]} /><meshBasicMaterial color={color} transparent opacity={active ? .9 : .42} /></mesh>
}

export function EVVehicle({ risk = 'low', scan = false, charging = true, driving = true, showLabels = true }: { risk?: VehicleRisk; scan?: boolean; charging?: boolean; driving?: boolean; showLabels?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const accent = risk === 'high' ? amber : risk === 'medium' ? violet : lime
  useFrame(({ clock }) => { if (!group.current) return; const t = clock.getElapsedTime(); group.current.rotation.y = Math.sin(t * .24) * .18; group.current.position.y = Math.sin(t * .9) * .055 + .05 })
  return <group ref={group} scale={1.2}><Float speed={1.1} rotationIntensity={.05} floatIntensity={.28}>
    <mesh position={[0, .3, 0]} castShadow><boxGeometry args={[3.45, .34, 1.35]} /><meshStandardMaterial color="#142635" metalness={.9} roughness={.22} /></mesh>
    <mesh position={[0, .62, -.02]} castShadow><boxGeometry args={[2.22, .58, 1.12]} /><meshStandardMaterial color="#1d3d4c" metalness={.62} roughness={.18} transparent opacity={.94} /></mesh>
    <mesh position={[0, .68, -.03]}><boxGeometry args={[1.78, .38, 1.0]} /><meshStandardMaterial color="#07131f" metalness={.25} roughness={.08} transparent opacity={.9} /></mesh>
    <mesh position={[0, .12, 0]}><boxGeometry args={[2.5, .1, .88]} /><meshStandardMaterial color="#203e4f" metalness={.8} roughness={.25} /></mesh>
    <mesh position={[0, .2, .02]}><boxGeometry args={[1.9, .05, .76]} /><meshStandardMaterial color={cyan} emissive={cyan} emissiveIntensity={scan ? 2.8 : .7} transparent opacity={.7} /></mesh>
    {[-.75, 0, .75].map(x => <Busbar key={x} position={[x, .29, 0]} color={scan ? accent : cyan} />)}
    <mesh position={[-1.63, .34, 0]}><boxGeometry args={[.07, .12, .74]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.9} /></mesh><mesh position={[1.63, .34, 0]}><boxGeometry args={[.07, .12, .74]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.9} /></mesh>
    <Wheel position={[-1.12, .05, .72]} spinning={driving} risk={risk} /><Wheel position={[1.12, .05, .72]} spinning={driving} risk={risk} /><Wheel position={[-1.12, .05, -.72]} spinning={driving} risk={risk} /><Wheel position={[1.12, .05, -.72]} spinning={driving} risk={risk} />
    <EnergyRibbon active={charging || scan} color={charging ? cyan : accent} /><mesh position={[0, .72, 0]} rotation={[0, 0, Math.PI / 2]}><torusGeometry args={[.24, .025, 8, 32]} /><meshBasicMaterial color={charging ? cyan : violet} transparent opacity={.85} /></mesh>
    <Sparkles count={scan ? 48 : charging ? 20 : 8} scale={[4, 1.8, 2.4]} size={scan ? 1.7 : 1.1} speed={scan ? 2 : .45} color={charging ? cyan : accent} />
    {scan && <mesh position={[0, .5, 0]}><boxGeometry args={[3.7, .015, 1.55]} /><meshBasicMaterial color={amber} transparent opacity={.22} /></mesh>}
  </Float>{showLabels && <><Text position={[-2.4, 1.25, .05]} color={cyan} fontSize={.13} anchorX="left" anchorY="middle">BATTERY PACK · 94.2%</Text><Text position={[1.65, 1.12, .05]} color={accent} fontSize={.13} anchorX="left" anchorY="middle">THERMAL LOOP · {risk === 'high' ? 'WATCH' : 'STABLE'}</Text><Text position={[-2.1, -.55, .05]} color={violet} fontSize={.13} anchorX="left" anchorY="middle">DRIVE UNIT · {driving ? 'ACTIVE' : 'IDLE'}</Text></>}</group>
}

export function VehicleScene({ risk = 'low', scan = false, charging = true, driving = true }: { risk?: VehicleRisk; scan?: boolean; charging?: boolean; driving?: boolean }) { return <group><EVVehicle risk={risk} scan={scan} charging={charging} driving={driving} /><mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[10, 7]} /><meshStandardMaterial color="#071522" metalness={.35} roughness={.58} /></mesh></group> }

export default EVVehicle

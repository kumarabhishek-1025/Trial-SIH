'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { CSSScene } from '@/components/css-scenes'

let webglAvailable: boolean | null = null

function detectWebGL(): boolean {
  if (webglAvailable !== null) return webglAvailable
  if (typeof document === 'undefined') { webglAvailable = false; return false }
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as any
    webglAvailable = !!gl
    if (gl) {
      try { gl.getExtension?.('WEBGL_lose_context')?.loseContext() } catch {}
    }
    canvas.remove()
    return webglAvailable
  } catch {
    webglAvailable = false
    return false
  }
}

function SceneFallback({ height = 300, mode = 'owner', ...sceneProps }: any) {
  return (
    <div style={{ width: '100%', height, background: '#06101b', borderRadius: 12, border: '1px solid #1a3a4c', overflow: 'hidden', position: 'relative' }}>
      <CSSScene mode={mode} {...sceneProps} />
    </div>
  )
}

export function SafeCanvas({ children, style, mode, charge, fleetRisk, scan, ...props }: any) {
  const [RenderCanvas, setRenderCanvas] = useState<any>(null)
  const [failed, setFailed] = useState(false)
  const height = typeof style?.height === 'number' ? style.height : 300

  useEffect(() => {
    if (!detectWebGL()) {
      setFailed(true)
      return
    }
    const origReject = window.onunhandledrejection
    const handler = (e: PromiseRejectionEvent) => {
      if (String(e.reason?.message || '').includes('WebGL')) {
        e.preventDefault()
        setFailed(true)
        return
      }
      if (origReject) origReject.call(window, e)
    }
    window.addEventListener('unhandledrejection', handler as any)

    import('@react-three/fiber').then(mod => {
      setRenderCanvas(() => mod.Canvas)
    }).catch(() => setFailed(true))

    return () => window.removeEventListener('unhandledrejection', handler as any)
  }, [])

  if (failed || !RenderCanvas) {
    return <SceneFallback height={height} mode={mode} charge={charge} fleetRisk={fleetRisk} scan={scan} />
  }

  return (
    <RenderCanvas
      style={style}
      dpr={props.dpr}
      camera={props.camera}
      onCreated={() => {}}
      onError={() => setFailed(true)}
    >
      {children}
    </RenderCanvas>
  )
}

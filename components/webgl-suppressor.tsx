'use client'

import { useEffect } from 'react'

export function WebGLSuppressor() {
  useEffect(() => {
    const origError = console.error
    const origWarn = console.warn
    console.error = (...args: any[]) => {
      const msg = String(args[0] || '')
      if (msg.includes('WebGL') || msg.includes('THREE.WebGLRenderer')) return
      origError.apply(console, args)
    }
    console.warn = (...args: any[]) => {
      const msg = String(args[0] || '')
      if (msg.includes('WebGL') || msg.includes('THREE.WebGLRenderer') || msg.includes('THREE.Clock')) return
      origWarn.apply(console, args)
    }
    const rejectHandler = (e: PromiseRejectionEvent) => {
      const msg = String(e.reason?.message || e.reason || '')
      if (msg.includes('WebGL') || msg.includes('Error creating')) {
        e.preventDefault()
        return
      }
    }
    window.addEventListener('unhandledrejection', rejectHandler)
    return () => {
      console.error = origError
      console.warn = origWarn
      window.removeEventListener('unhandledrejection', rejectHandler)
    }
  }, [])
  return null
}

'use client'

import { useEffect, useRef, useState } from 'react'

export default function ThreeJSTest() {
  const [status, setStatus] = useState('Checking...')
  const [webglSupported, setWebglSupported] = useState(false)
  const [threeLoaded, setThreeLoaded] = useState(false)
  const [gsapLoaded, setGsapLoaded] = useState(false)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setWebglSupported(!!gl)
    } catch (e) {
      setWebglSupported(false)
    }

    // Check Three.js
    import('three').then(() => {
      setThreeLoaded(true)
    }).catch(() => {
      setThreeLoaded(false)
    })

    // Check GSAP
    import('gsap').then(() => {
      setGsapLoaded(true)
    }).catch(() => {
      setGsapLoaded(false)
    })

    // Update status
    setTimeout(() => {
      if (webglSupported && threeLoaded && gsapLoaded) {
        setStatus('✅ All systems ready for 3D animation!')
      } else {
        setStatus('❌ Some dependencies missing')
      }
    }, 1000)
  }, [webglSupported, threeLoaded, gsapLoaded])

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h3 className="text-xl font-bold mb-4">3D Animation System Check</h3>
      <div className="space-y-2">
        <div>WebGL Support: {webglSupported ? '✅' : '❌'}</div>
        <div>Three.js Loaded: {threeLoaded ? '✅' : '❌'}</div>
        <div>GSAP Loaded: {gsapLoaded ? '✅' : '❌'}</div>
        <div className="mt-4 font-semibold">{status}</div>
      </div>
    </div>
  )
}
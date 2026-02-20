"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function CosmicScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const earthRef = useRef<THREE.Mesh | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.z = 60

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const ambientLight = new THREE.AmbientLight(0x333333, 0.3)
    scene.add(ambientLight)

    const sunLight = new THREE.PointLight(0xffffff, 1.5, 500)
    sunLight.position.set(100, 50, 100)
    scene.add(sunLight)

    const createRealisticStarfield = () => {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(5000 * 3)
      const colors = new Float32Array(5000 * 3)

      for (let i = 0; i < 5000; i++) {
        const i3 = i * 3
        positions[i3] = (Math.random() - 0.5) * 4000
        positions[i3 + 1] = (Math.random() - 0.5) * 4000
        positions[i3 + 2] = (Math.random() - 0.5) * 4000

        const starType = Math.random()
        if (starType > 0.8) {
          // Blue stars
          colors[i3] = 0.7
          colors[i3 + 1] = 0.85
          colors[i3 + 2] = 1.0
        } else if (starType > 0.6) {
          // White stars
          colors[i3] = 1.0
          colors[i3 + 1] = 1.0
          colors[i3 + 2] = 1.0
        } else {
          // Yellow/Red stars
          colors[i3] = 1.0
          colors[i3 + 1] = 0.8
          colors[i3 + 2] = 0.6
        }
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 0.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
      })

      return new THREE.Points(geometry, material)
    }

    const starfield = createRealisticStarfield()
    scene.add(starfield)

    const earthGeometry = new THREE.SphereGeometry(15, 128, 128)
    const canvas = document.createElement("canvas")
    canvas.width = 2048
    canvas.height = 1024

    const ctx = canvas.getContext("2d")!
    // Ocean background
    ctx.fillStyle = "#1a4d7a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add continents with gradients
    ctx.fillStyle = "#2d5a2d"
    ctx.fillRect(0, 300, 400, 300)
    ctx.fillRect(600, 250, 350, 250)
    ctx.fillRect(1200, 200, 500, 400)
    ctx.fillRect(1800, 350, 250, 200)

    const texture = new THREE.CanvasTexture(canvas)
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 5,
      emissive: 0x111111,
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)
    earthRef.current = earth

    const orbitRadius = 40
    const orbitGeometry = new THREE.BufferGeometry()
    const orbitPositions: number[] = []

    for (let i = 0; i <= 256; i++) {
      const angle = (i / 256) * Math.PI * 2
      orbitPositions.push(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle) * orbitRadius * 0.3,
        Math.sin(angle * 0.5) * orbitRadius * 0.2,
      )
    }

    orbitGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(orbitPositions), 3))

    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.4,
      linewidth: 2,
    })

    const orbit = new THREE.Line(orbitGeometry, orbitMaterial)
    scene.add(orbit)

    // Mouse event handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      if (earthRef.current) {
        earthRef.current.rotation.y += 0.0003
        earthRef.current.rotation.z = 0.1

        // Orbital revolution around camera
        const orbitX = Math.cos(elapsedTime * 0.3) * orbitRadius
        const orbitY = Math.sin(elapsedTime * 0.3) * orbitRadius * 0.3
        const orbitZ = Math.sin(elapsedTime * 0.3 * 0.5) * orbitRadius * 0.2

        earthRef.current.position.x = orbitX
        earthRef.current.position.y = orbitY
        earthRef.current.position.z = orbitZ
      }

      camera.position.x = mouseRef.current.x * 10
      camera.position.y = mouseRef.current.y * 10

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)

      if (
        containerRef.current &&
        rendererRef.current &&
        rendererRef.current.domElement.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }

      if (rendererRef.current) rendererRef.current.dispose()
      if (starfield.geometry) starfield.geometry.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
}

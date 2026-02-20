'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

interface Portfolio3DTextProps {
  className?: string
}

export default function Portfolio3DText({ className = '' }: Portfolio3DTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const lettersRef = useRef<THREE.Group[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const isHoveredRef = useRef(false)
  const frameRef = useRef<number>()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0f)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.set(0, 0, 12)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = false
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    rendererRef.current = renderer

    containerRef.current.appendChild(renderer.domElement)

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0x00aaff, 1.5)
    keyLight.position.set(8, 6, 8)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x8a2be2, 0.8)
    fillLight.position.set(-6, 3, -6)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x00ffff, 1.2)
    rimLight.position.set(0, -8, 4)
    scene.add(rimLight)

    // Create letter materials
    const createLetterMaterials = () => {
      // Main material with enhanced properties
      const mainMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x00aaff,
        emissive: 0x001144,
        emissiveIntensity: 0.3,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.95,
        side: THREE.FrontSide
      })

      // Edge glow material
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.4,
        side: THREE.BackSide
      })

      return { mainMaterial, glowMaterial }
    }

    // Create simplified letter geometry (fallback)
    const createLetterGeometry = (letter: string, index: number) => {
      // Create a more sophisticated box geometry with rounded edges
      const geometry = new THREE.BoxGeometry(1.2, 1.8, 0.4, 2, 2, 1)
      
      // Apply some vertex manipulation for rounded edges
      const vertices = geometry.attributes.position.array
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i]
        const y = vertices[i + 1]
        const z = vertices[i + 2]
        
        // Subtle rounding effect
        const factor = 0.1
        vertices[i] = x * (1 - factor * Math.abs(y) * Math.abs(z))
        vertices[i + 1] = y * (1 - factor * Math.abs(x) * Math.abs(z))
        vertices[i + 2] = z * (1 - factor * Math.abs(x) * Math.abs(y))
      }
      
      geometry.attributes.position.needsUpdate = true
      geometry.computeVertexNormals()
      
      return geometry
    }

    // Create letter group
    const createLetterGroup = (letter: string, index: number) => {
      const group = new THREE.Group()
      const { mainMaterial, glowMaterial } = createLetterMaterials()
      
      // Main letter mesh
      const geometry = createLetterGeometry(letter, index)
      const letterMesh = new THREE.Mesh(geometry, mainMaterial)
      
      // Glow effect
      const glowGeometry = geometry.clone()
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
      glowMesh.scale.setScalar(1.05)
      
      // Outer glow
      const outerGlowGeometry = geometry.clone()
      const outerGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0x0066ff,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      })
      const outerGlowMesh = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial)
      outerGlowMesh.scale.setScalar(1.15)
      
      group.add(outerGlowMesh)
      group.add(glowMesh)
      group.add(letterMesh)
      
      // Position the group
      group.position.x = (index - 4) * 2.2
      group.position.y = 0
      group.position.z = 0
      
      // Store references and original values
      group.userData = {
        originalY: group.position.y,
        originalRotationY: group.rotation.y,
        originalRotationZ: group.rotation.z,
        index,
        letterMesh,
        glowMesh,
        outerGlowMesh,
        mainMaterial,
        glowMaterial,
        outerGlowMaterial
      }
      
      return group
    }

    // Create all letters
    const letters = 'PORTFOLIO'.split('').map((letter, index) => {
      const letterGroup = createLetterGroup(letter, index)
      scene.add(letterGroup)
      lettersRef.current.push(letterGroup)
      return letterGroup
    })

    // Enhanced animation system
    const setupAnimations = () => {
      letters.forEach((letterGroup, index) => {
        const delay = index * 0.15
        const userData = letterGroup.userData
        
        // Idle floating animation
        gsap.to(letterGroup.position, {
          y: userData.originalY + 0.3 + Math.sin(index) * 0.1,
          duration: 2.5 + Math.random() * 0.8,
          delay,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        })

        // Gentle rotation
        gsap.to(letterGroup.rotation, {
          y: Math.PI * 0.08 * (index % 2 === 0 ? 1 : -1),
          z: Math.PI * 0.04 * (index % 3 === 0 ? 1 : -1),
          duration: 4 + Math.random() * 2,
          delay,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        })

        // Pulsing glow
        gsap.to(userData.glowMaterial, {
          opacity: 0.6,
          duration: 1.5 + Math.random() * 0.5,
          delay: delay * 0.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        })

        // Random jump sequence
        const createJumpSequence = () => {
          const randomDelay = Math.random() * 6 + 3 // 3-9 seconds
          
          gsap.delayedCall(randomDelay, () => {
            const tl = gsap.timeline()
            
            // Pre-jump anticipation (squash)
            tl.to(letterGroup.scale, {
              x: 1.1,
              y: 0.8,
              z: 1.1,
              duration: 0.15,
              ease: 'power2.in'
            })
            
            // Jump up (stretch)
            .to(letterGroup.position, {
              y: userData.originalY + 1.2,
              duration: 0.5,
              ease: 'power2.out'
            }, 0.15)
            .to(letterGroup.scale, {
              x: 0.9,
              y: 1.3,
              z: 0.9,
              duration: 0.3,
              ease: 'power2.out'
            }, 0.15)
            
            // Peak moment
            .to(letterGroup.rotation, {
              y: userData.originalRotationY + Math.PI * 0.5,
              duration: 0.4,
              ease: 'power2.inOut'
            }, 0.3)
            
            // Fall and land (squash)
            .to(letterGroup.position, {
              y: userData.originalY,
              duration: 0.6,
              ease: 'bounce.out'
            }, 0.65)
            .to(letterGroup.scale, {
              x: 1.2,
              y: 0.7,
              z: 1.2,
              duration: 0.2,
              ease: 'power2.out'
            }, 0.65)
            
            // Return to normal
            .to(letterGroup.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.4,
              ease: 'elastic.out(1, 0.5)'
            }, 1.05)
            .to(letterGroup.rotation, {
              y: userData.originalRotationY,
              duration: 0.6,
              ease: 'elastic.out(1, 0.3)'
            }, 1.05)
            
            // Glow burst on impact
            .to(userData.glowMaterial, {
              opacity: 0.9,
              duration: 0.1,
              ease: 'power2.out'
            }, 1.25)
            .to(userData.outerGlowMaterial, {
              opacity: 0.4,
              duration: 0.1,
              ease: 'power2.out'
            }, 1.25)
            .to([userData.glowMaterial, userData.outerGlowMaterial], {
              opacity: userData.glowMaterial.opacity,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: createJumpSequence
            }, 1.35)
          })
        }

        // Start jump sequence with staggered timing
        gsap.delayedCall(index * 0.8, createJumpSequence)
      })
    }

    setupAnimations()

    // Enhanced mouse interactions
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      mouseRef.current.x = x
      mouseRef.current.y = y
    }

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      
      letters.forEach((letterGroup, index) => {
        const userData = letterGroup.userData
        
        gsap.to(userData.mainMaterial, {
          emissiveIntensity: 0.6,
          duration: 0.4,
          delay: index * 0.03
        })
        
        gsap.to(userData.glowMaterial, {
          opacity: 0.8,
          duration: 0.4,
          delay: index * 0.03
        })
        
        gsap.to(letterGroup.position, {
          y: userData.originalY + 0.2,
          duration: 0.4,
          delay: index * 0.03,
          ease: 'back.out(1.7)'
        })
      })
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      
      letters.forEach((letterGroup, index) => {
        const userData = letterGroup.userData
        
        gsap.to(userData.mainMaterial, {
          emissiveIntensity: 0.3,
          duration: 0.6,
          delay: index * 0.03
        })
        
        gsap.to(userData.glowMaterial, {
          opacity: 0.4,
          duration: 0.6,
          delay: index * 0.03
        })
      })
    }

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    // Animation loop with performance optimization
    let lastTime = 0
    const animate = (currentTime: number) => {
      frameRef.current = requestAnimationFrame(animate)
      
      // Throttle to 60fps max
      if (currentTime - lastTime < 16.67) return
      lastTime = currentTime

      // Smooth parallax camera movement
      if (camera) {
        const targetX = mouseRef.current.x * 1.2
        const targetY = mouseRef.current.y * 0.8
        
        camera.position.x += (targetX - camera.position.x) * 0.05
        camera.position.y += (targetY - camera.position.y) * 0.05
        camera.lookAt(0, 0, 0)
      }

      // Render
      if (renderer && scene && camera) {
        renderer.render(scene, camera)
      }
    }

    // Event listeners
    const container = containerRef.current
    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize, { passive: true })

    // Initialize
    handleResize()
    animate(0)

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      
      container?.removeEventListener('mousemove', handleMouseMove)
      container?.removeEventListener('mouseenter', handleMouseEnter)
      container?.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      
      // Dispose Three.js resources
      letters.forEach(letterGroup => {
        letterGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
      })
      
      renderer?.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`w-full h-40 md:h-48 relative overflow-hidden cursor-pointer ${className}`}
      style={{ 
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)',
        borderRadius: '12px',
        border: '1px solid rgba(0, 170, 255, 0.1)'
      }}
    />
  )
}
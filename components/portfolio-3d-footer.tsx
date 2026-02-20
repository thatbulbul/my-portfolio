'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

interface Portfolio3DFooterProps {
  className?: string
}

export default function Portfolio3DFooter({ className = '' }: Portfolio3DFooterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const lettersRef = useRef<THREE.Mesh[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const isHoveredRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0f)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.set(0, 0, 8)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = false // Disable shadows for performance
    renderer.outputColorSpace = THREE.SRGBColorSpace
    rendererRef.current = renderer

    containerRef.current.appendChild(renderer.domElement)

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0x00ffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const rimLight = new THREE.DirectionalLight(0x8a2be2, 0.8)
    rimLight.position.set(-5, 2, -5)
    scene.add(rimLight)

    // Create text geometry and materials
    const createLetterMesh = (letter: string, index: number) => {
      const loader = new THREE.FontLoader()
      
      // Using a simple box geometry as fallback for better performance
      // In production, you'd load a proper font
      const geometry = new THREE.BoxGeometry(0.8, 1.2, 0.3)
      
      // Create rounded edges effect with multiple materials
      const materials = [
        // Main face material - glossy with emissive
        new THREE.MeshPhongMaterial({
          color: 0x00aaff,
          emissive: 0x001133,
          shininess: 100,
          transparent: true,
          opacity: 0.9
        }),
        // Edge materials with glow
        new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          emissive: 0x003366,
          shininess: 150
        })
      ]

      const mesh = new THREE.Mesh(geometry, materials[0])
      
      // Position letters
      mesh.position.x = (index - 4) * 1.2
      mesh.position.y = 0
      mesh.position.z = 0

      // Add glow effect
      const glowGeometry = geometry.clone()
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      glow.scale.multiplyScalar(1.1)
      mesh.add(glow)

      // Store original position for animations
      mesh.userData = {
        originalY: mesh.position.y,
        originalRotationY: mesh.rotation.y,
        originalRotationZ: mesh.rotation.z,
        index,
        glow
      }

      return mesh
    }

    // Create letters
    const letters = 'PORTFOLIO'.split('').map((letter, index) => {
      return createLetterMesh(letter, index)
    })

    letters.forEach(letter => {
      scene.add(letter)
      lettersRef.current.push(letter)
    })

    // Animation setup
    const setupAnimations = () => {
      // Idle floating animation for each letter
      letters.forEach((letter, index) => {
        const delay = index * 0.1
        
        // Gentle floating
        gsap.to(letter.position, {
          y: letter.userData.originalY + 0.2,
          duration: 2 + Math.random() * 0.5,
          delay,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        })

        // Subtle rotation
        gsap.to(letter.rotation, {
          y: Math.PI * 0.1,
          z: Math.PI * 0.05,
          duration: 3 + Math.random() * 1,
          delay,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        })

        // Random jump animation
        const createJumpAnimation = () => {
          const randomDelay = Math.random() * 8 + 2 // 2-10 seconds
          
          gsap.delayedCall(randomDelay, () => {
            // Jump up
            gsap.to(letter.position, {
              y: letter.userData.originalY + 0.8,
              duration: 0.4,
              ease: 'power2.out'
            })

            // Squash and stretch
            gsap.to(letter.scale, {
              x: 1.1,
              z: 1.1,
              y: 0.9,
              duration: 0.2,
              ease: 'power2.out',
              yoyo: true,
              repeat: 1
            })

            // Land
            gsap.to(letter.position, {
              y: letter.userData.originalY,
              duration: 0.6,
              delay: 0.4,
              ease: 'bounce.out',
              onComplete: createJumpAnimation // Loop the jump
            })

            // Glow pulse on jump
            gsap.to(letter.userData.glow.material, {
              opacity: 0.6,
              duration: 0.3,
              ease: 'power2.out',
              yoyo: true,
              repeat: 1
            })
          })
        }

        createJumpAnimation()
      })
    }

    setupAnimations()

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      
      // Enhance glow on hover
      letters.forEach((letter, index) => {
        gsap.to(letter.userData.glow.material, {
          opacity: 0.5,
          duration: 0.3,
          delay: index * 0.05
        })
        
        gsap.to(letter.material, {
          emissive: new THREE.Color(0x002266),
          duration: 0.3
        })
      })
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      
      // Reset glow
      letters.forEach((letter, index) => {
        gsap.to(letter.userData.glow.material, {
          opacity: 0.3,
          duration: 0.5,
          delay: index * 0.05
        })
        
        gsap.to(letter.material, {
          emissive: new THREE.Color(0x001133),
          duration: 0.5
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

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Subtle parallax effect
      if (camera) {
        camera.position.x = mouseRef.current.x * 0.5
        camera.position.y = mouseRef.current.y * 0.3
        camera.lookAt(0, 0, 0)
      }

      // Render
      if (renderer && scene && camera) {
        renderer.render(scene, camera)
      }
    }

    // Event listeners
    containerRef.current.addEventListener('mousemove', handleMouseMove)
    containerRef.current.addEventListener('mouseenter', handleMouseEnter)
    containerRef.current.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    // Initial resize and start animation
    handleResize()
    animate()

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter)
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
      window.removeEventListener('resize', handleResize)
      
      // Dispose of Three.js resources
      letters.forEach(letter => {
        letter.geometry.dispose()
        if (Array.isArray(letter.material)) {
          letter.material.forEach(mat => mat.dispose())
        } else {
          letter.material.dispose()
        }
      })
      
      if (renderer) {
        renderer.dispose()
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`w-full h-32 md:h-40 relative overflow-hidden ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
        borderRadius: '8px'
      }}
    />
  )
}
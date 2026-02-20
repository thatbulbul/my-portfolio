'use client'

import { useEffect, useState } from 'react'
import Portfolio3DText from './portfolio-3d-text'

interface ResponsivePortfolioTextProps {
  className?: string
}

// Lightweight CSS-only fallback for mobile/low-performance devices
function PortfolioTextFallback({ className = '' }: ResponsivePortfolioTextProps) {
  return (
    <div className={`w-full h-40 md:h-48 relative overflow-hidden flex items-center justify-center ${className}`}>
      <div className="portfolio-text-fallback">
        {'PORTFOLIO'.split('').map((letter, index) => (
          <span
            key={index}
            className="portfolio-letter"
            style={{
              '--delay': `${index * 0.1}s`,
              '--jump-delay': `${index * 0.8 + Math.random() * 2}s`
            } as React.CSSProperties}
          >
            {letter}
          </span>
        ))}
      </div>
      
      <style jsx>{`
        .portfolio-text-fallback {
          display: flex;
          gap: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 4rem);
          letter-spacing: 0.1em;
        }
        
        .portfolio-letter {
          display: inline-block;
          background: linear-gradient(135deg, #00aaff 0%, #0066cc 50%, #8a2be2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 20px rgba(0, 170, 255, 0.3);
          filter: drop-shadow(0 0 10px rgba(0, 170, 255, 0.2));
          animation: 
            float var(--delay, 0s) 2.5s ease-in-out infinite alternate,
            jump var(--jump-delay, 2s) 6s ease-out infinite;
          transform-origin: center bottom;
        }
        
        .portfolio-letter:hover {
          animation-play-state: paused;
          transform: translateY(-10px) scale(1.05);
          filter: drop-shadow(0 0 20px rgba(0, 170, 255, 0.4));
          transition: all 0.3s ease-out;
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotateY(0deg); }
          100% { transform: translateY(-15px) rotateY(5deg); }
        }
        
        @keyframes jump {
          0%, 90%, 100% { transform: translateY(0px) scaleY(1); }
          5% { transform: translateY(-30px) scaleY(1.1) scaleX(0.9); }
          10% { transform: translateY(0px) scaleY(0.8) scaleX(1.1); }
          15% { transform: translateY(0px) scaleY(1) scaleX(1); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .portfolio-letter {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default function ResponsivePortfolioText({ className = '' }: ResponsivePortfolioTextProps) {
  const [useWebGL, setUseWebGL] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Check device capabilities
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        return !!gl
      } catch (e) {
        return false
      }
    }

    const checkPerformance = () => {
      // Check for mobile devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      // Check for low-end devices
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      return !isMobile && !isLowEnd && !prefersReducedMotion && checkWebGLSupport()
    }

    setUseWebGL(checkPerformance())
  }, [])

  // Don't render anything on server-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className={`w-full h-40 md:h-48 relative overflow-hidden ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            PORTFOLIO
          </div>
        </div>
      </div>
    )
  }

  return useWebGL ? (
    <Portfolio3DText className={className} />
  ) : (
    <PortfolioTextFallback className={className} />
  )
}
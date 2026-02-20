"use client"

import { useEffect, useRef } from "react"

interface BinaryChar {
  char: "0" | "1"
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

export default function BinaryRainCursor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const binaryCharsRef = useRef<BinaryChar[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const lastSpawnRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      const now = Date.now()
      if (now - lastSpawnRef.current > 50) {
        for (let i = 0; i < 2; i++) {
          const newChar: BinaryChar = {
            char: Math.random() > 0.5 ? "0" : "1",
            x: e.clientX + (Math.random() - 0.5) * 40,
            y: e.clientY + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 3 + 1,
            life: 1,
            maxLife: 1,
          }
          binaryCharsRef.current.push(newChar)
        }
        lastSpawnRef.current = now
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animationLoop = setInterval(() => {
      const chars = binaryCharsRef.current

      for (let i = chars.length - 1; i >= 0; i--) {
        const char = chars[i]
        char.life -= 0.02
        char.y += char.vy
        char.x += char.vx
        char.vy += 0.1

        if (char.life <= 0) {
          chars.splice(i, 1)
        }
      }

      if (containerRef.current) {
        containerRef.current.innerHTML = chars
          .map(
            (char) => `
          <span
            style="
              position: fixed;
              left: ${char.x}px;
              top: ${char.y}px;
              pointer-events: none;
              font-family: 'Courier New', monospace;
              font-size: 14px;
              font-weight: bold;
              color: rgb(0, 255, 150);
              opacity: ${char.life};
              text-shadow: 0 0 8px rgba(0, 255, 150, ${char.life * 0.8});
              transform: translate(-50%, -50%);
              z-index: 9999;
            "
          >${char.char}</span>
        `,
          )
          .join("")
      }
    }, 1000 / 60)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(animationLoop)
    }
  }, [])

  return <div ref={containerRef} className="pointer-events-none fixed inset-0" />
}

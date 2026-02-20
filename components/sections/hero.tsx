"use client"

import { useEffect, useRef, useState } from "react"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Try autoplay
    video.play().catch(() => {
      // autoplay may be blocked — fallback image stays visible
    })
  }, [])

  return (
    <section className="relative w-full bg-black pt-20 md:pt-12">
      <div className="relative w-full h-screen md:h-screen overflow-hidden">
        {/* 🖼️ FALLBACK IMAGE - Desktop */}
        <img
          src="/images/Hero.png"
          alt="Hero Background"
          className={`
            hidden md:block
            absolute inset-0
            w-full h-full
            object-contain
            transition-opacity duration-700
            ${videoLoaded ? "opacity-0" : "opacity-100"}
          `}
        />

        {/* 🖼️ FALLBACK IMAGE - Mobile */}
        <img
          src="/images/mob-image.png"
          alt="Hero Background Mobile"
          className={`
            block md:hidden
            absolute inset-0
            w-full h-full
            object-cover
            transition-opacity duration-700
            ${videoLoaded ? "opacity-0" : "opacity-100"}
          `}
        />

        {/* 🎥 BACKGROUND VIDEO - Desktop */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          className="
            hidden md:block
            absolute inset-0
            w-full h-full
            object-contain
            pointer-events-none
          "
        >
          <source src="/video/hero-video.mp4" type="video/mp4" />
        </video>

        {/* 🎥 BACKGROUND VIDEO - Mobile */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          className="
            block md:hidden
            absolute inset-0
            w-full h-full
            object-cover
            pointer-events-none
          "
        >
          <source src="/video/mob-video.mp4" type="video/mp4" />
        </video>

        {/* 🌑 Cinematic Overlay */}
      </div>
    </section>
  )
}

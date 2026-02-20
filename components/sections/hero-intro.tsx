"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import gsap from "gsap"

export default function HeroIntro() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()

    timeline
      .from(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        0,
      )
      .from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        0.2,
      )
      .from(
        descriptionRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        0.4,
      )
      .from(
        buttonRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        0.6,
      )

    // Floating animation
    gsap.to(".hero-intro-content", {
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [])

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:bulbulsharma3363@gmail.com", label: "Email" },
  ]

  return (
    <section className="min-h-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/95 to-background relative">
      <div className="max-w-4xl mx-auto w-full">
        <div className="hero-intro-content space-y-6">
          <div>
            <p className="text-accent text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3">
              Welcome to my portfolio
            </p>
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4 leading-tight text-white"
            >
              Bulbul
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sharma</span>
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-200 mb-4"
            >
              AI Enthusiast | Developer | Creative Thinker
            </p>
          </div>

          <p ref={descriptionRef} className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
            Building intelligent, user-friendly digital experiences. Full-stack developer specializing in React,
            Node.js, Next.js, and modern web technologies with a passion for AI integration.
          </p>

          <div ref={buttonRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 sm:px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center sm:justify-start gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
            >
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/resume.pdf"
              className="px-6 sm:px-8 py-3 rounded-lg border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300 animate-glow text-center"
            >
              Download Resume
            </a>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 pt-6 border-t border-white/20">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors duration-300 hover:scale-110 transform p-2"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

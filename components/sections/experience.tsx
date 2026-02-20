"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase, Calendar } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll(".timeline-item")
      items?.forEach((item, idx) => {
        gsap.from(item, {
          opacity: 0,
          x: idx % 2 === 0 ? -50 : 50,
          duration: 0.6,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const experiences = [
    {
      role: "Software Developer Intern",
      company: "BOP Realty",
      period: "July 2025 - Present",
      description:
        "Developed full-stack applications using MERN stack, built mobile solutions with React Native, designed responsive websites with WordPress, and created interactive UI with GSAP animations.",
      highlights: [
        "Designed and developed company website (bop.in) with WordPress and Elementor",
        "Built HRMS application with React Native and Node.js backend",
        "Implemented GSAP animations and interactive UI components",
        "Optimized websites for SEO and performance",
      ],
    },
  ]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/30"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center">
          Work <span className="text-accent">Experience</span>
        </h2>

        <div ref={timelineRef} className="space-y-6 sm:space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={exp.role}
              className="timeline-item glass-effect p-6 sm:p-8 rounded-2xl hover:glass-effect-accent transition-all duration-300"
            >
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex gap-3 sm:gap-4 items-start">
                  <div className="mt-1 p-2 sm:p-3 rounded-xl bg-primary/20 flex-shrink-0">
                    <Briefcase size={20} className="text-primary sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-2xl font-bold">{exp.role}</h3>
                    <p className="text-base sm:text-lg text-accent">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span className="text-xs sm:text-sm font-medium">{exp.period}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 text-sm sm:text-base">{exp.description}</p>

              <ul className="space-y-2 sm:space-y-3">
                {exp.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-muted-foreground text-sm sm:text-base">
                    <span className="text-accent flex-shrink-0">▹</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="mt-8 sm:mt-12 glass-effect p-6 sm:p-8 rounded-2xl">
          <div className="flex gap-3 sm:gap-4 items-start mb-4">
            <div className="mt-1 p-2 sm:p-3 rounded-xl bg-accent/20 flex-shrink-0">
              <Briefcase size={20} className="text-accent sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-2xl font-bold">B.Tech in Computer Science & Engineering</h3>
              <p className="text-base sm:text-lg text-accent">Gautam Buddha University, Greater Noida</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">Expected Graduation: 2026</p>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">CGPA: 8.36</p>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 40%",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const skills = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "GSAP"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    },
    {
      category: "Mobile",
      items: ["React Native", "Mobile UX"],
    },
    {
      category: "Tools",
      items: ["Git", "Figma", "VS Code", "Postman"],
    },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/30"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center">
          About <span className="text-accent">Me</span>
        </h2>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Bio */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer with a keen interest in AI and cutting-edge web technologies.
              Currently working as a Software Developer Intern at BOP Realty, where I've built complete web applications
              using the MERN stack and developed mobile solutions with React Native.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              My expertise spans modern frontend frameworks, robust backend systems, and responsive design. I specialize
              in creating elegant, performant digital experiences with a strong focus on user interaction and animation.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              <strong>Email:</strong> bulbulsharma3363@gmail.com <br />
              <strong>Phone:</strong> +91-8057328599 <br />
              <strong>Education:</strong> B.Tech in CSE (2026) - Gautam Buddha University
            </p>
          </div>

          {/* Skills Grid */}
          <div className="space-y-6 sm:space-y-8">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="glass-effect p-4 sm:p-6 rounded-xl hover:glass-effect-accent transition-all duration-300"
              >
                <h3 className="text-base sm:text-lg font-bold text-accent mb-3 sm:mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary/10 text-primary border border-primary/30 hover:border-primary hover:bg-primary/20 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, idx) => {
        if (card) {
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: idx * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const projects = [
    {
      title: "BOP.in - Company Website",
      description:
        "Designed and developed the main company website for BOP Realty using WordPress with modern UI, GSAP animations, responsive design, and SEO optimization.",
      image: "/images/real estate.png",
      tech: ["WordPress", "Elementor", "GSAP", "Responsive Design"],
      links: { live: "https://bop.in/" },
    },
    {
      title: "HRMS Application",
      description:
        "Built a complete Human Resource Management System with React Native frontend and Node.js backend. Features include employee attendance, leave management, and profile handling.",
      image: "/mobile-app-interface-dashboard.jpg",
      tech: ["React Native", "Node.js", "Express", "MongoDB"],
      links: { live: "https://github.com/thatbulbul/HRMS", github: "https://github.com/thatbulbul/HRMS" },
    },
    {
      title: "Agency website",
      description:
        "Created a responsive agency website with clean layouts, dynamic form validation, service listings, and focus on lightweight performance.",
      image: "/images/agency-website.png",
      tech: ["React 18", "TypeScript", "Vite 5", "Responsive Design"],
      links: { live: "https://github.com/thatbulbul/glocare-assist", github: "https://github.com/thatbulbul/glocare-assist" },
      // links: { live: "#", github: "#" },
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
          Featured <span className="text-accent">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto">
          Showcase of my latest work combining design, development, and innovation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              ref={(el) => {
                cardsRef.current[idx] = el
              }}
              className="group glass-effect rounded-2xl overflow-hidden hover:glass-effect-accent transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 flex flex-col"
            >
              {/* Project Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden bg-card">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/30 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2 sm:gap-3 pt-4 border-t border-border">
                  <a
                    href={project.links.live}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/link text-sm"
                  >
                    <ExternalLink size={16} />
                    <span className="font-medium">View</span>
                  </a>
                  {/* <a
                    href={project.links.github}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 rounded-lg border border-muted hover:border-accent hover:text-accent transition-all duration-300 text-sm"
                  >
                    <Github size={16} />
                    <span className="font-medium">Code</span>
                  </a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Projects from "@/components/sections/projects"
import Experience from "@/components/sections/experience"
import Contact from "@/components/sections/contact"
import Navigation from "@/components/navigation"
import CosmicScene from "@/components/cosmic-scene"

export default function Home() {
  return (
    <main className="relative bg-transparent text-foreground">
      <CosmicScene />
      <div className="relative z-10 bg-transparent">
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  )
}

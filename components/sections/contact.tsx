"use client"

import type React from "react"
import Portfolio3DText from "@/components/portfolio-3d-text"
import { useRef, useState } from "react"
import { Mail, Linkedin, Github, Send } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      const data = await res.json()

      if (data.success) {
        setFormState({ name: "", email: "", message: "" })
        setSubmitStatus("success")
      } else {
        setSubmitStatus("error")
      }
    } catch (err) {
      console.error(err)
      setSubmitStatus("error")
    }

    setIsSubmitting(false)
  }

  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "bulbulsharma3363@gmail.com",
      href: "mailto:bulbulsharma3363@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/bulbul-sharma",
      href: "https://www.linkedin.com/in/bulbul-sharma-08475a280/",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/thatbulbul",
      href: "https://github.com/thatbulbul",
    },
  ]

  return (
    <section id="contact" className="relative z-20">
      {/* Contact Form Section */}
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center">
            Up for a <span className="text-accent">Coffee?</span>
          </h2>
          <p className="text-center text-muted-foreground text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something amazing together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-effect p-6 sm:p-8 rounded-2xl space-y-5 sm:space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-2 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-2 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all text-sm sm:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 sm:py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none text-sm sm:text-base"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 transition-all duration-300 text-sm sm:text-base"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={20} />
              </button>

              {submitStatus === "success" && (
                <p className="text-green-500 text-sm text-center font-medium">
                  Connection established — I'll get back to you soon.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-500 text-sm text-center font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>

            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get in Touch</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base">
                  Feel free to reach out through any of these channels. I'm always open to discussing new projects,
                  creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {contacts.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-effect p-4 rounded-xl hover:glass-effect-accent transition-all duration-300 flex items-start gap-3 sm:gap-4 group"
                  >
                    <div className="p-2 sm:p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors flex-shrink-0">
                      <Icon size={20} className="text-primary sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">{label}</p>
                      <p className="text-foreground font-semibold text-sm sm:text-base break-all">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6 sm:pt-8 border-t border-border">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  <strong>Phone:</strong> +91-8057328599
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  <strong>Location:</strong> Greater Noida, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Portfolio Text Footer - At the very end */}
      <Portfolio3DText />
    </section>
  )
}

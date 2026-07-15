"use client"

import { useCallback, useEffect, useState } from "react"
import { Introduction } from "@/components/sections/introduction"
import { Projects } from "@/components/sections/projects"
import { Languages } from "@/components/sections/languages"
import { Experience } from "@/components/sections/experience"
import { Contact } from "@/components/sections/contact"
import { Navigation, type NavSection } from "@/components/navigation"
import { ScrollProgress } from "@/components/section-indicator"
import { LoadingScreen } from "@/components/loading-screen"
import { SiteFooter } from "@/components/site-footer"

const sections: NavSection[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
]

interface WindowWithLenis extends Window {
  __lenis?: { scrollTo: (target: string | number | HTMLElement, opts?: Record<string, unknown>) => void }
}

export default function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState("home")

  const navigate = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = (window as WindowWithLenis).__lenis
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.2 })
    } else {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [loading])

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <Navigation sections={sections} activeId={activeId} onNavigate={navigate} />
      <ScrollProgress sections={sections} activeId={activeId} onNavigate={navigate} />

      <main className="relative">
        <Introduction onViewProjects={() => navigate("projects")} onContact={() => navigate("contact")} />
        <Projects />
        <Languages />
        <Experience />
        <Contact />
        <SiteFooter />
      </main>
    </>
  )
}

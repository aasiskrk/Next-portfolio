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

    let raf = 0
    const compute = () => {
      raf = 0
      // Reference line at 40% of the viewport height. The active section is the
      // last one whose top edge has crossed above that line. This is monotonic
      // with scroll position, so no section can ever be skipped.
      const line = window.innerHeight * 0.4
      let current = sections[0].id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (!el) continue
        if (el.getBoundingClientRect().top - line <= 0) current = s.id
      }
      setActiveId(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
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

"use client"

import { useCallback, useEffect, useState } from "react"
import { Introduction } from "@/components/sections/introduction"
import { Projects } from "@/components/sections/projects"
import { Languages } from "@/components/sections/languages"
import { Experience } from "@/components/sections/experience"
import { Contact } from "@/components/sections/contact"
import { Navigation, type NavSection } from "@/components/navigation"
import { LoadingScreen } from "@/components/loading-screen"
import { SiteFooter } from "@/components/site-footer"
import { BackgroundPinwheels } from "@/components/background-pinwheels"

// Middle nav items — Home and Contact are rendered by the nav itself.
const navSections: NavSection[] = [
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
]

const sectionIds = ["home", "projects", "skills", "experience", "contact"]

interface WindowWithLenis extends Window {
  __lenis?: { scrollTo: (target: string | number | HTMLElement, opts?: Record<string, unknown>) => void }
}

type Phase = "loading" | "revealing" | "done"

export default function Portfolio() {
  const [phase, setPhase] = useState<Phase>("loading")
  const [activeId, setActiveId] = useState("home")
  const play = phase !== "loading"

  const handleReveal = useCallback(() => setPhase("revealing"), [])
  const handleLoaderDone = useCallback(() => setPhase("done"), [])

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
    if (!play) return

    let raf = 0
    const compute = () => {
      raf = 0
      // Reference line at 40% of the viewport height. The active section is the
      // last one whose top edge has crossed above that line. This is monotonic
      // with scroll position, so no section can ever be skipped.
      const line = window.innerHeight * 0.4
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - line <= 0) current = id
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
  }, [play])

  return (
    <>
      {phase !== "done" && <LoadingScreen onReveal={handleReveal} onComplete={handleLoaderDone} />}

      <BackgroundPinwheels />

      <Navigation sections={navSections} activeId={activeId} visible={play} onNavigate={navigate} />

      <main className="relative z-10">
        <Introduction
          play={play}
          onViewProjects={() => navigate("projects")}
          onContact={() => navigate("contact")}
        />
        <Projects />
        <Languages />
        <Experience />
        <Contact />
        <SiteFooter />
      </main>
    </>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import type { NavSection } from "@/components/navigation"

interface ScrollProgressProps {
  sections: NavSection[]
  activeId: string
  onNavigate: (id: string) => void
}

export function ScrollProgress({ sections, activeId, onNavigate }: ScrollProgressProps) {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-white/70"
        style={{ scaleX }}
      />

      {/* Right-side dot rail (desktop) — sits on a glass pill so it stays
          legible over images and light sections. */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-center gap-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-4 backdrop-blur-md">
          {sections.map((s) => {
            const active = activeId === s.id
            return (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className="group relative flex items-center justify-center"
                aria-label={`Go to ${s.label}`}
              >
                <span
                  className={`pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-black/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur transition-all duration-300 ${
                    active
                      ? "text-white opacity-100"
                      : "translate-x-1 text-white/60 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`rounded-full transition-all duration-500 ease-fluid ${
                    active ? "h-2.5 w-2.5 bg-white" : "h-2 w-2 bg-white/30 group-hover:bg-white/70"
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

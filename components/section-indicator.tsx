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

      {/* Right-side dot rail (desktop) */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
        {sections.map((s) => {
          const active = activeId === s.id
          return (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className="group flex items-center gap-3"
              aria-label={`Go to ${s.label}`}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-500 ${
                  active ? "text-white opacity-100" : "text-white/40 opacity-0 group-hover:opacity-100"
                }`}
              >
                {s.label}
              </span>
              <span
                className={`h-2 w-2 rounded-full transition-all duration-500 ease-fluid ${
                  active ? "scale-125 bg-white" : "bg-white/25 group-hover:bg-white/60"
                }`}
              />
            </button>
          )
        })}
      </div>
    </>
  )
}

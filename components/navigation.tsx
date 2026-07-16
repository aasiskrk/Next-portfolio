"use client"

import { motion } from "framer-motion"

export interface NavSection {
  id: string
  label: string
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface NavigationProps {
  /** Middle items — Home and Contact are rendered as monogram and CTA. */
  sections: NavSection[]
  activeId: string
  visible: boolean
  onNavigate: (id: string) => void
}

/**
 * Fixed bottom navigation: a single glass pill with an AK monogram (home),
 * section links with a shared sliding active highlight, and a solid white
 * Contact call-to-action.
 */
export function Navigation({ sections, activeId, visible, onNavigate }: NavigationProps) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4"
      style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      <motion.nav
        initial={{ y: 96, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : { y: 96, opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: visible ? 0.4 : 0 }}
        className="glass-nav pointer-events-auto flex items-center gap-0.5 rounded-full p-1.5"
        aria-label="Primary"
      >
        <button
          onClick={() => onNavigate("home")}
          aria-label="Home"
          className={`hidden rounded-full px-3 py-2 font-mono text-xs font-semibold tracking-[0.15em] transition-colors duration-300 ease-fluid min-[380px]:block ${
            activeId === "home" ? "text-white" : "text-white/45 hover:text-white"
          }`}
        >
          AK
        </button>

        <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />

        {sections.map((s) => {
          const active = activeId === s.id
          return (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`relative rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors duration-300 ease-fluid sm:px-4 ${
                active ? "text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </button>
          )
        })}

        <button
          onClick={() => onNavigate("contact")}
          className="ml-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-[#0a0a0a] transition-transform duration-300 ease-fluid hover:scale-[1.04] active:scale-[0.98] sm:px-5"
        >
          Contact
        </button>
      </motion.nav>
    </div>
  )
}

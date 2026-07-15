"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export interface NavSection {
  id: string
  label: string
}

interface NavigationProps {
  sections: NavSection[]
  activeId: string
  onNavigate: (id: string) => void
}

export function Navigation({ sections, activeId, onNavigate }: NavigationProps) {
  const [open, setOpen] = useState(false)

  const handle = (id: string) => {
    setOpen(false)
    onNavigate(id)
  }

  return (
    <>
      {/* Desktop floating pill */}
      <nav className="fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 md:block">
        <div className="glass-nav-premium flex items-center gap-1 rounded-full p-1.5">
          {sections.map((s) => {
            const active = activeId === s.id
            return (
              <button
                key={s.id}
                onClick={() => handle(s.id)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-500 ease-fluid ${
                  active ? "text-[#08080a]" : "text-white/60 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:hidden">
        <button
          onClick={() => handle("home")}
          className="font-mono text-sm font-semibold tracking-[0.3em] text-white"
        >
          AK
        </button>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="glass-nav-premium relative flex h-11 w-11 items-center justify-center rounded-full"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-5 bg-white transition-all duration-500 ease-fluid ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-white transition-all duration-500 ease-fluid ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-[#08080a]/90 backdrop-blur-2xl md:hidden"
          >
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => handle(s.id)}
                className={`text-4xl font-semibold tracking-tight transition-colors ${
                  activeId === s.id ? "text-white" : "text-white/40"
                }`}
              >
                {s.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

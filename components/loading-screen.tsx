"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

/**
 * Multilingual greeting sequence: "Hello" morphs through greetings in their
 * native scripts inside a typographic mask (each word rises in as the previous
 * one lifts out), then the whole screen lifts like a curtain to reveal the page.
 */
const GREETINGS = ["Hello", "नमस्ते", "こんにちは", "안녕하세요", "Bonjour", "Hallo", "مرحبًا"]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as [number, number, number, number]

const FIRST_HOLD_MS = 550
const HOLD_MS = 320
const LAST_HOLD_MS = 450
const CURTAIN_MS = 850
const SAFETY_MS = 6000

interface LoadingScreenProps {
  /** Curtain starts lifting — begin the hero entrance. */
  onReveal: () => void
  /** Curtain fully gone — safe to unmount. */
  onComplete: () => void
}

export function LoadingScreen({ onReveal, onComplete }: LoadingScreenProps) {
  const [index, setIndex] = useState(0)
  const [exiting, setExiting] = useState(false)
  const reduceMotion = useReducedMotion()

  const revealedRef = useRef(false)
  const completedRef = useRef(false)
  const onRevealRef = useRef(onReveal)
  const onCompleteRef = useRef(onComplete)
  onRevealRef.current = onReveal
  onCompleteRef.current = onComplete

  const beginExit = useCallback(() => {
    if (revealedRef.current) return
    revealedRef.current = true
    setExiting(true)
    onRevealRef.current()
  }, [])

  const finish = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    onCompleteRef.current()
  }, [])

  // Lock scroll while the loader owns the screen.
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // Safety net: never trap the visitor behind the loader.
  useEffect(() => {
    const safety = window.setTimeout(() => {
      beginExit()
      finish()
    }, SAFETY_MS)
    return () => window.clearTimeout(safety)
  }, [beginExit, finish])

  // Greeting sequence.
  useEffect(() => {
    if (exiting) return

    if (reduceMotion) {
      const t = window.setTimeout(beginExit, 400)
      return () => window.clearTimeout(t)
    }

    const last = GREETINGS.length - 1
    const hold = index === 0 ? FIRST_HOLD_MS : index === last ? LAST_HOLD_MS : HOLD_MS
    const t = window.setTimeout(() => {
      if (index < last) setIndex((i) => i + 1)
      else beginExit()
    }, hold)
    return () => window.clearTimeout(t)
  }, [index, exiting, reduceMotion, beginExit])

  const curtain = reduceMotion
    ? { animate: exiting ? { opacity: 0 } : { opacity: 1 }, transition: { duration: 0.2 } }
    : {
        animate: exiting ? { y: "-100%" } : { y: 0 },
        transition: { duration: CURTAIN_MS / 1000, ease: CURTAIN_EASE },
      }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
      initial={false}
      animate={curtain.animate}
      transition={curtain.transition}
      onAnimationComplete={() => {
        if (exiting) finish()
      }}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading</span>

      {/* Greeting mask — content drifts down slightly as the curtain lifts. */}
      <motion.div
        animate={exiting && !reduceMotion ? { y: "18vh" } : { y: 0 }}
        transition={{ duration: CURTAIN_MS / 1000, ease: CURTAIN_EASE }}
        aria-hidden="true"
      >
        <div
          className="relative flex h-[1.4em] w-screen items-center justify-center overflow-hidden text-[clamp(2.75rem,8vw,6rem)] font-medium leading-none tracking-tight text-[#f5f5f5]"
          style={{ fontFamily: "var(--font-sans), var(--font-devanagari), sans-serif" }}
        >
          <AnimatePresence>
            <motion.span
              key={index}
              className="absolute whitespace-nowrap"
              initial={{ y: "115%", opacity: 0.4 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-115%", opacity: 0.4 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {GREETINGS[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      <p
        className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.5em] text-white/30"
        aria-hidden="true"
      >
        Aashista Karki
      </p>
    </motion.div>
  )
}

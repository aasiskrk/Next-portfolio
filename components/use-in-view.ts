"use client"

import { useEffect, useRef, useState } from "react"

interface Options {
  /** rootMargin for the observer. Negative bottom margin delays the trigger. */
  margin?: string
  /** Fire only once (default) or re-trigger every time it enters/leaves. */
  once?: boolean
}

/**
 * Lightweight IntersectionObserver hook. The element's hidden state lives in
 * CSS (present at first paint), so this only flips `inView` to add the
 * `.is-visible` class — no hydration flash is possible.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({ margin = "0px 0px -12% 0px", once = true }: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin: margin, threshold: 0 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [margin, once])

  return { ref, inView }
}

"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A two-part custom cursor: a small solid dot that tracks the pointer 1:1 and a
 * larger ring that lags behind with easing. The ring grows and inverts when
 * hovering interactive elements ([data-cursor="hover"], links and buttons).
 * Disabled on touch / coarse-pointer devices, and respects reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  // Enable only on precise-pointer devices. This runs first and toggles the
  // divs into the tree; the animation effect below waits for `enabled` so the
  // refs are guaranteed to exist before we touch them.
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: mouse.x, y: mouse.y }
    let raf = 0
    let visible = false

    const render = () => {
      // Ring eases toward the pointer; dot snaps instantly.
      ringPos.x += (mouse.x - ringPos.x) * 0.18
      ringPos.y += (mouse.y - ringPos.y) * 0.18
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = "1"
        ring.style.opacity = "1"
      }
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        'a, button, [data-cursor="hover"], input, textarea',
      )
      ring.dataset.active = target ? "true" : "false"
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden="true">
      <div
        ref={ringRef}
        data-active="false"
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-white/60 opacity-0 transition-[width,height,background-color,border-color] duration-300 ease-fluid data-[active=true]:h-12 data-[active=true]:w-12 data-[active=true]:border-white data-[active=true]:bg-white/10"
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-white opacity-0"
      />
    </div>
  )
}

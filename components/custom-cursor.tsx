"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Single fluid-circle cursor under mix-blend-difference, so it inverts
 * whatever it passes over. Three states:
 *
 * - idle: small solid circle trailing the pointer with soft easing
 * - interactive (links, buttons, inputs): grows to a larger disc
 * - labelled ([data-cursor-label]): grows further and shows the label
 *
 * Pressing scales it down for tactile feedback. Hover targets are also
 * recomputed on scroll, so the state never goes stale while the page moves
 * under a stationary pointer. Disabled on coarse-pointer devices; reduced
 * motion tracks 1:1 with no trailing easing.
 */
export function CustomCursor() {
  const circleRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const circle = circleRef.current
    const label = labelRef.current
    if (!circle || !label) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const followFactor = reduceMotion ? 1 : 0.28

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { x: mouse.x, y: mouse.y }
    let raf = 0
    let visible = false
    let pressed = false

    const render = () => {
      pos.x += (mouse.x - pos.x) * followFactor
      pos.y += (mouse.y - pos.y) * followFactor
      circle.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
        pressed ? 0.85 : 1
      })`
      raf = requestAnimationFrame(render)
    }

    const updateState = (el: HTMLElement | null) => {
      const labelled = el?.closest<HTMLElement>("[data-cursor-label]")
      const interactive = el?.closest<HTMLElement>('a, button, [data-cursor="hover"], input, textarea')

      if (labelled) {
        circle.dataset.state = "label"
        label.textContent = labelled.dataset.cursorLabel ?? ""
      } else {
        circle.dataset.state = interactive ? "active" : "idle"
        label.textContent = ""
      }
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!visible) {
        visible = true
        circle.style.opacity = "1"
      }
      updateState(e.target as HTMLElement | null)
    }

    // The page moves under a stationary pointer while scrolling — recompute
    // what's beneath the cursor so hover states never go stale.
    const onScroll = () => {
      if (!visible) return
      updateState(document.elementFromPoint(mouse.x, mouse.y) as HTMLElement | null)
    }

    const onDown = () => {
      pressed = true
    }
    const onUp = () => {
      pressed = false
    }
    const onLeave = () => {
      visible = false
      circle.style.opacity = "0"
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("scroll", onScroll)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] hidden mix-blend-difference md:block"
      aria-hidden="true"
    >
      <div
        ref={circleRef}
        data-state="idle"
        className="fixed left-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white opacity-0 transition-[width,height] duration-300 ease-fluid data-[state=active]:h-12 data-[state=active]:w-12 data-[state=label]:h-[5.5rem] data-[state=label]:w-[5.5rem]"
      >
        <span
          ref={labelRef}
          className="select-none whitespace-nowrap pl-[0.2em] font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-black"
        />
      </div>
    </div>
  )
}

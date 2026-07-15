"use client"

import { ReactNode, useRef, useEffect } from "react"
import gsap from "gsap"

/**
 * ElasticMorphButton — A button with an SVG border that morphs elastically
 * on hover, creating a liquid rubber effect. Uses GSAP to tween the SVG path's
 * d attribute smoothly between two shapes.
 */
export function ElasticMorphButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  // Normal state: sharp rounded corners
  const normalPath =
    "M 12,0 L 228,0 Q 240,0 240,12 L 240,48 Q 240,60 228,60 L 12,60 Q 0,60 0,48 L 0,12 Q 0,0 12,0"

  // Hover state: organic, wavy morphed edges
  const hoverPath =
    "M 20,5 Q 30,-2 50,0 Q 80,-3 110,2 Q 150,8 200,5 Q 225,3 235,12 L 240,35 Q 245,50 225,58 Q 200,62 160,58 Q 120,55 80,58 Q 40,62 15,55 L 0,45 Q -5,28 0,15 Q 5,3 20,5"

  useEffect(() => {
    if (!pathRef.current) return

    const onEnter = () => {
      gsap.to(pathRef.current, {
        attr: { d: hoverPath },
        duration: 0.6,
        ease: "elastic.out(1.3, 0.75)",
      })
    }

    const onLeave = () => {
      gsap.to(pathRef.current, {
        attr: { d: normalPath },
        duration: 0.7,
        ease: "elastic.out(1.1, 0.65)",
      })
    }

    const el = containerRef.current
    if (el) {
      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)
    }

    return () => {
      if (el) {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
      }
    }
  }, [normalPath, hoverPath])

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative inline-block cursor-pointer ${className}`}
    >
      {/* SVG border overlay (behind text) */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 240 60"
        preserveAspectRatio="none"
        style={{ filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.3))" }}
      >
        <path ref={pathRef} d={normalPath} fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
      </svg>

      {/* Content */}
      <div className="relative px-6 py-3">{children}</div>
    </div>
  )
}

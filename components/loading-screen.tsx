"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const NAME = "Aashista"

/**
 * Build a repeating sinusoidal wave surface path.
 * One full wave spans `waveWidth`; the path is `width` wide so it can
 * slide horizontally by `waveWidth` and loop seamlessly.
 */
function buildWave(width: number, waveWidth: number, amp: number, surfaceY: number, bottomY: number) {
  const half = waveWidth / 2
  const quarter = waveWidth / 4
  let d = `M 0 ${surfaceY}`
  const segments = Math.ceil(width / waveWidth) + 1
  for (let i = 0; i < segments; i++) {
    d += ` q ${quarter} ${-amp} ${half} 0 q ${quarter} ${amp} ${half} 0`
  }
  d += ` L ${segments * waveWidth} ${bottomY} L 0 ${bottomY} Z`
  return d
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const liquidRef = useRef<SVGGElement>(null)
  const waveRef = useRef<SVGPathElement>(null)
  const outlineRef = useRef<SVGTextElement>(null)
  const [percent, setPercent] = useState(0)

  // viewBox geometry
  const VB_W = 1000
  const VB_H = 300
  const WAVE_W = 500
  const AMP = 16
  const SURFACE_Y = 40
  const BOTTOM_Y = 420
  const wavePath = buildWave(VB_W * 2, WAVE_W, AMP, SURFACE_Y, BOTTOM_Y)

  useEffect(() => {
    // Lock scroll while the loader is visible
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const ctx = gsap.context(() => {
      // Continuous horizontal flow of the liquid surface
      gsap.to(waveRef.current, {
        x: -WAVE_W,
        duration: 2.2,
        ease: "none",
        repeat: -1,
      })

      // Liquid starts below the letters, rises to overfill the top
      const startY = VB_H - SURFACE_Y + 10 // fully below
      const endY = -(SURFACE_Y + 40) // fully covered
      gsap.set(liquidRef.current, { y: startY })

      const counter = { v: 0 }
      const tl = gsap.timeline({
        delay: 0.35,
        onComplete: () => {
          // Solidify + fade the whole loader out
          gsap.to(outlineRef.current, {
            attr: { "stroke-opacity": 0 },
            duration: 0.5,
          })
          gsap.to(rootRef.current, {
            opacity: 0,
            duration: 0.7,
            ease: "power2.inOut",
            delay: 0.45,
            onComplete: () => {
              document.body.style.overflow = prevOverflow
              onComplete()
            },
          })
        },
      })

      tl.to(liquidRef.current, {
        y: endY,
        duration: 2.6,
        ease: "power1.inOut",
      })
        .to(
          counter,
          {
            v: 100,
            duration: 2.6,
            ease: "power1.inOut",
            onUpdate: () => setPercent(Math.round(counter.v)),
          },
          "<",
        )
    }, rootRef)

    return () => {
      ctx.revert()
      document.body.style.overflow = prevOverflow
    }
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080a] px-6"
      aria-label="Loading"
      role="status"
    >
      {/* Eyebrow */}
      <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 sm:text-xs">
        Portfolio
      </p>

      {/* Fluid-fill name */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full max-w-3xl"
        role="img"
        aria-label={NAME}
      >
        <defs>
          <clipPath id="name-clip">
            <text
              x="50%"
              y="72%"
              textAnchor="middle"
              fontSize="190"
              fontWeight={800}
              letterSpacing="-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {NAME}
            </text>
          </clipPath>
        </defs>

        {/* Outline */}
        <text
          ref={outlineRef}
          x="50%"
          y="72%"
          textAnchor="middle"
          fontSize="190"
          fontWeight={800}
          letterSpacing="-6"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.4"
          strokeOpacity={1}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {NAME}
        </text>

        {/* Liquid fill, clipped to the letters */}
        <g clipPath="url(#name-clip)">
          <g ref={liquidRef}>
            <path ref={waveRef} d={wavePath} fill="#f5f5f5" />
          </g>
        </g>
      </svg>

      {/* Progress line + percent */}
      <div className="mt-10 flex w-full max-w-xs items-center gap-4">
        <div className="h-px flex-1 overflow-hidden bg-white/10">
          <div
            className="h-full bg-white/80 transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="w-10 text-right font-mono text-xs tabular-nums text-white/50">
          {percent}
        </span>
      </div>
    </div>
  )
}

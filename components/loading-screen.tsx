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
  const svgRef = useRef<SVGSVGElement>(null)
  const liquidRef = useRef<SVGGElement>(null)
  const waveRef = useRef<SVGPathElement>(null)
  const wave2Ref = useRef<SVGPathElement>(null)
  const outlineRef = useRef<SVGTextElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(0)

  // viewBox geometry
  const VB_W = 1000
  const VB_H = 300
  const WAVE_W = 460
  const AMP = 30
  const SURFACE_Y = 46
  const BOTTOM_Y = 460
  const wavePath = buildWave(VB_W * 2, WAVE_W, AMP, SURFACE_Y, BOTTOM_Y)
  const wavePath2 = buildWave(VB_W * 2, WAVE_W * 1.35, AMP * 0.6, SURFACE_Y + 6, BOTTOM_Y)

  useEffect(() => {
    // Lock scroll while the loader is visible
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const ctx = gsap.context(() => {
      // Continuous horizontal flow of the liquid surface — slow, so the motion
      // of the fluid is clearly visible as it fills.
      gsap.to(waveRef.current, {
        x: -WAVE_W,
        duration: 3.6,
        ease: "none",
        repeat: -1,
      })
      // Second layer drifts the other way, slower, for parallax depth.
      gsap.to(wave2Ref.current, {
        x: WAVE_W * 1.35,
        duration: 5.4,
        ease: "none",
        repeat: -1,
      })
      // Gentle vertical bob so the surface breathes.
      gsap.to([waveRef.current, wave2Ref.current], {
        y: "+=8",
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      // Liquid starts below the letters, rises to overfill the top
      const startY = VB_H - SURFACE_Y + 20 // fully below
      const endY = -(SURFACE_Y + 60) // fully covered
      gsap.set(liquidRef.current, { y: startY })

      const counter = { v: 0 }
      const RISE = 5.4 // slower fill so you watch the liquid climb
      const tl = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
          // Cinematic exit: the camera zooms into the filled letters while the
          // overlay scales up and dissolves, revealing the homepage behind with a
          // parallax depth effect.
          gsap.to(outlineRef.current, { attr: { "stroke-opacity": 0 }, duration: 0.4 })
          const exit = gsap.timeline({
            delay: 0.4,
            onComplete: () => {
              document.body.style.overflow = prevOverflow
              onComplete()
            },
          })
          // SVG: zoom + tilt + 3D perspective depth
          exit
            .to(
              svgRef.current,
              {
                scale: 2.2,
                rotationX: 15,
                rotationZ: 8,
                z: 200,
                opacity: 0,
                duration: 1.4,
                ease: "power2.inOut",
                transformOrigin: "50% 50%",
              },
              0,
            )
            // Eyebrow and progress fade and drift
            .to(eyebrowRef.current, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, 0)
            .to(progressRef.current, { opacity: 0, y: 16, duration: 0.5, ease: "power2.in" }, 0)
            // Overlay background dims and scales up (reveals homepage behind)
            .to(rootRef.current, { opacity: 0, scale: 1.15, duration: 1.2, ease: "power2.inOut" }, 0.2)
        },
      })

      tl.to(liquidRef.current, {
        y: endY,
        duration: RISE,
        ease: "power1.inOut",
      }).to(
        counter,
        {
          v: 100,
          duration: RISE,
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
      <p
        ref={eyebrowRef}
        className="mb-8 font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 sm:text-xs"
      >
        Portfolio
      </p>

      {/* Fluid-fill name */}
      <svg ref={svgRef} viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full max-w-3xl" role="img" aria-label={NAME}>
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

        {/* Liquid fill, clipped to the letters. The initial transform keeps the
            liquid fully below the letters on first paint (before JS runs), so it
            never flashes filled. */}
        <g clipPath="url(#name-clip)">
          <g ref={liquidRef} transform={`translate(0 ${VB_H - SURFACE_Y + 20})`}>
            <path ref={wave2Ref} d={wavePath2} fill="rgba(245,245,245,0.45)" />
            <path ref={waveRef} d={wavePath} fill="#f5f5f5" />
          </g>
        </g>
      </svg>

      {/* Progress line + percent */}
      <div ref={progressRef} className="mt-10 flex w-full max-w-xs items-center gap-4">
        <div className="h-px flex-1 overflow-hidden bg-white/10">
          <div className="h-full bg-white/80 transition-none" style={{ width: `${percent}%` }} />
        </div>
        <span className="w-10 text-right font-mono text-xs tabular-nums text-white/50">{percent}</span>
      </div>
    </div>
  )
}

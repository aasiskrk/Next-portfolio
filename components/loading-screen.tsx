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
  const progressBarRef = useRef<HTMLDivElement>(null)
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

    // Immediate animation start - no setTimeout delays
    if (!liquidRef.current || !waveRef.current || !wave2Ref.current) {
      console.warn("[v0] Loading screen refs not mounted immediately")
      // Fallback: complete after 3 seconds
      const fallbackTimer = setTimeout(() => {
        document.body.style.overflow = prevOverflow
        onComplete()
      }, 3000)
      return () => clearTimeout(fallbackTimer)
    }

    // Use DOM manipulation for progress bar to avoid React batching issues
    const progressBar = progressBarRef.current

    const tl = gsap.timeline({
      onComplete: () => {
        console.log("[v0] Loading animation complete, starting exit")
        // Exit: the filled name and overlay scale up and dissolve
        gsap.to(outlineRef.current, { attr: { "stroke-opacity": 0 }, duration: 0.3 })
        
        const exit = gsap.timeline({
          onComplete: () => {
            console.log("[v0] Exit animation complete, calling onComplete")
            document.body.style.overflow = prevOverflow
            onComplete()
          },
        })
        
        exit
          .to(svgRef.current, { scale: 1.35, duration: 0.6, ease: "power2.inOut", transformOrigin: "50% 60%" }, 0)
          .to(eyebrowRef.current, { opacity: 0, y: -12, duration: 0.25, ease: "power2.in" }, 0)
          .to(progressRef.current, { opacity: 0, y: 12, duration: 0.25, ease: "power2.in" }, 0)
          .to(rootRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 0.1)
      },
    })

    // Wave animations - infinite loop in background
    gsap.to(waveRef.current, {
      x: -WAVE_W,
      duration: 3.6,
      ease: "none",
      repeat: -1,
    })

    gsap.to(wave2Ref.current, {
      x: WAVE_W * 1.35,
      duration: 5.4,
      ease: "none",
      repeat: -1,
    })

    gsap.to([waveRef.current, wave2Ref.current], {
      y: "+=8",
      duration: 1.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })

    // Main loading sequence
    const startY = VB_H - SURFACE_Y + 20
    const endY = -(SURFACE_Y + 60)
    gsap.set(liquidRef.current, { y: startY })

    const RISE_DURATION = 2.0 // 2 second fill

    tl.to(
      liquidRef.current,
      {
        y: endY,
        duration: RISE_DURATION,
        ease: "power1.inOut",
      },
      0
    ).to(
      {},
      {
        duration: RISE_DURATION,
        ease: "power1.inOut",
        onUpdate: function() {
          const progress = Math.round(this.progress() * 100)
          setPercent(progress)
          // Also update DOM directly for faster visual feedback
          if (progressBar) {
            progressBar.style.width = `${progress}%`
          }
        },
      },
      0
    )

    return () => {
      tl.kill()
      gsap.killTweensOf([waveRef.current, wave2Ref.current, liquidRef.current])
      document.body.style.overflow = prevOverflow
    }
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#15110c] px-6"
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
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
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
          style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
        >
          {NAME}
        </text>

        {/* Liquid fill, clipped to the letters. The initial transform keeps the
            liquid fully below the letters on first paint (before JS runs), so it
            never flashes filled. */}
        <g clipPath="url(#name-clip)">
          <g ref={liquidRef} transform={`translate(0 ${VB_H - SURFACE_Y + 20})`}>
            <path ref={wave2Ref} d={wavePath2} fill="rgba(237, 204, 190, 0.45)" />
            <path ref={waveRef} d={wavePath} fill="#edccbe" />
          </g>
        </g>
      </svg>

      {/* Progress line + percent */}
      <div ref={progressRef} className="mt-10 flex w-full max-w-xs items-center gap-4">
        <div className="h-px flex-1 overflow-hidden bg-white/10">
          <div ref={progressBarRef} className="h-full bg-white/80 transition-none" style={{ width: `${percent}%` }} />
        </div>
        <span className="w-10 text-right font-mono text-xs tabular-nums text-white/50">{percent}</span>
      </div>
    </div>
  )
}

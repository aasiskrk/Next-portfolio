"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const NAME = "Aashista"
const LOAD_DURATION_MS = 1500
const EXIT_DURATION_MS = 320
const MAX_LOADER_MS = 2500

function buildWave(width: number, waveWidth: number, amp: number, surfaceY: number, bottomY: number) {
  const half = waveWidth / 2
  const quarter = waveWidth / 4
  let d = `M 0 ${surfaceY}`
  const segments = Math.ceil(width / waveWidth) + 1

  for (let i = 0; i < segments; i++) {
    d += ` q ${quarter} ${-amp} ${half} 0 q ${quarter} ${amp} ${half} 0`
  }

  return `${d} L ${segments * waveWidth} ${bottomY} L 0 ${bottomY} Z`
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
  const percentRef = useRef<HTMLSpanElement>(null)
  const completedRef = useRef(false)
  const [percent, setPercent] = useState(0)

  const viewBoxWidth = 1000
  const viewBoxHeight = 300
  const waveWidth = 460
  const amplitude = 30
  const surfaceY = 46
  const bottomY = 460
  const wavePath = buildWave(viewBoxWidth * 2, waveWidth, amplitude, surfaceY, bottomY)
  const wavePath2 = buildWave(viewBoxWidth * 2, waveWidth * 1.35, amplitude * 0.6, surfaceY + 6, bottomY)

  useEffect(() => {
    const root = rootRef.current
    const svg = svgRef.current
    const liquid = liquidRef.current
    const wave = waveRef.current
    const wave2 = wave2Ref.current
    const outline = outlineRef.current
    const eyebrow = eyebrowRef.current
    const progress = progressRef.current
    const progressBar = progressBarRef.current
    const percentLabel = percentRef.current

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const finish = () => {
      if (completedRef.current) return
      completedRef.current = true
      document.body.style.overflow = previousOverflow
      onComplete()
    }

    const hardExit = window.setTimeout(finish, MAX_LOADER_MS)

    if (!root || !svg || !liquid || !wave || !wave2 || !outline || !eyebrow || !progress) {
      return () => {
        window.clearTimeout(hardExit)
        document.body.style.overflow = previousOverflow
      }
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) {
      setPercent(100)
      const reducedExit = window.setTimeout(finish, 180)
      return () => {
        window.clearTimeout(hardExit)
        window.clearTimeout(reducedExit)
        document.body.style.overflow = previousOverflow
      }
    }

    const startY = viewBoxHeight - surfaceY + 20
    const endY = -(surfaceY + 60)
    const counter = { value: 0 }

    gsap.set(liquid, { y: startY })
    gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" })

    const context = gsap.context(() => {
      gsap.to(wave, {
        x: -waveWidth,
        duration: 3.6,
        ease: "none",
        repeat: -1,
      })
      gsap.to(wave2, {
        x: waveWidth * 1.35,
        duration: 5.4,
        ease: "none",
        repeat: -1,
      })

      const timeline = gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: finish,
      })

      timeline
        .to(
          liquid,
          {
            y: endY,
            duration: LOAD_DURATION_MS / 1000,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          progressBar,
          {
            scaleX: 1,
            duration: LOAD_DURATION_MS / 1000,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          counter,
          {
            value: 100,
            duration: LOAD_DURATION_MS / 1000,
            ease: "power2.inOut",
            onUpdate: () => {
              const nextPercent = Math.round(counter.value)
              if (percentLabel) percentLabel.textContent = String(nextPercent)
            },
          },
          0,
        )
        .to(outline, { strokeOpacity: 0, duration: 0.16, ease: "power2.out" })
        .to(
          svg,
          {
            scale: 1.08,
            opacity: 0,
            duration: EXIT_DURATION_MS / 1000,
            ease: "power3.out",
            transformOrigin: "50% 60%",
          },
          ">-0.04",
        )
        .to(eyebrow, { y: -8, opacity: 0, duration: 0.2, ease: "power3.out" }, "<")
        .to(progress, { y: 8, opacity: 0, duration: 0.2, ease: "power3.out" }, "<")
        .to(root, { opacity: 0, duration: 0.2, ease: "power3.out" }, "<+0.08")
    }, root)

    return () => {
      window.clearTimeout(hardExit)
      context.revert()
      document.body.style.overflow = previousOverflow
    }
  }, [onComplete, surfaceY, viewBoxHeight, waveWidth])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#15110c] px-6"
      aria-label="Loading portfolio"
      aria-live="polite"
      role="status"
    >
      <p
        ref={eyebrowRef}
        className="mb-8 font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 sm:text-xs"
      >
        Portfolio
      </p>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
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
              style={{ fontFamily: '"IBM Plex Sans", "Geist", Arial, sans-serif' }}
            >
              {NAME}
            </text>
          </clipPath>
        </defs>

        <text
          ref={outlineRef}
          x="50%"
          y="72%"
          textAnchor="middle"
          fontSize="190"
          fontWeight={800}
          letterSpacing="-6"
          fill="none"
          stroke="rgba(237, 204, 190, 0.9)"
          strokeWidth="1.4"
          strokeOpacity={1}
          style={{ fontFamily: '"IBM Plex Sans", "Geist", Arial, sans-serif' }}
        >
          {NAME}
        </text>

        <g clipPath="url(#name-clip)">
          <g ref={liquidRef} transform={`translate(0 ${viewBoxHeight - surfaceY + 20})`}>
            <path ref={wave2Ref} d={wavePath2} fill="rgba(237, 204, 190, 0.45)" />
            <path ref={waveRef} d={wavePath} fill="#edccbe" />
          </g>
        </g>
      </svg>

      <div ref={progressRef} className="mt-10 flex w-full max-w-xs items-center gap-4">
        <div className="h-px flex-1 overflow-hidden bg-white/10">
          <div ref={progressBarRef} className="h-full w-full origin-left bg-white/80" />
        </div>
        <span ref={percentRef} className="w-10 text-right font-mono text-xs tabular-nums text-white/50">
          {percent}
        </span>
      </div>
    </div>
  )
}

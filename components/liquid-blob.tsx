"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

/**
 * Liquid Blob — An organic, magnetic SVG blob that distorts on hover and
 * follows the cursor. The blob is built from Bézier curves and morphs
 * smoothly via GSAP's attribute tweening.
 */
export function LiquidBlob() {
  const svgRef = useRef<SVGSVGElement>(null)
  const blobPathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Base blob shape: four quadrants with control points that will morph
  const basePath =
    "M 200,100 C 250,50 350,50 400,100 C 450,150 450,250 400,300 C 350,350 250,350 200,300 C 150,250 150,150 200,100"

  // Distorted path (on hover/interaction)
  const distortedPath =
    "M 180,120 C 240,30 370,40 420,110 C 480,190 460,280 390,320 C 300,370 220,360 180,280 C 120,200 140,140 180,120"

  useEffect(() => {
    if (!blobPathRef.current || !svgRef.current || !containerRef.current) return

    let mouseX = 0,
      mouseY = 0
    let isHovering = false
    const blob = blobPathRef.current

    const onMouseMove = (e: MouseEvent) => {
      const rect = svgRef.current!.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top

      // If hovering, apply a subtle magnetic pull toward the cursor
      if (isHovering) {
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const distX = mouseX - centerX
        const distY = mouseY - centerY
        const angle = Math.atan2(distY, distX)
        const distance = Math.sqrt(distX ** 2 + distY ** 2)

        // Max pull radius
        if (distance < 150) {
          const pull = (1 - distance / 150) * 30 // up to 30px pull
          const scale = 1 + (1 - distance / 150) * 0.08 // slight growth

          gsap.to(blob, {
            attr: { d: distortedPath },
            scaleX: scale,
            scaleY: scale,
            x: Math.cos(angle) * pull * 0.3,
            y: Math.sin(angle) * pull * 0.3,
            duration: 0.6,
            ease: "power2.out",
          })
        }
      }
    }

    const onEnter = () => {
      isHovering = true
      gsap.to(blob, {
        attr: { d: distortedPath },
        duration: 0.8,
        ease: "elastic.out(1.2, 0.8)",
      })
    }

    const onLeave = () => {
      isHovering = false
      gsap.to(blob, {
        attr: { d: basePath },
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 1,
        ease: "elastic.out(1, 0.6)",
      })
    }

    // Subtle continuous drift animation (no input)
    gsap.to(blob, {
      attr: {
        d: "M 210,110 C 260,60 340,55 390,105 C 430,145 445,245 395,295 C 340,340 240,345 190,295 C 140,245 160,155 210,110",
      },
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })

    svgRef.current?.addEventListener("mouseenter", onEnter)
    svgRef.current?.addEventListener("mouseleave", onLeave)
    document.addEventListener("mousemove", onMouseMove, { passive: true })

    return () => {
      svgRef.current?.removeEventListener("mouseenter", onEnter)
      svgRef.current?.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [basePath, distortedPath])

  return (
    <div ref={containerRef} className="flex w-full items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 600 400"
        className="w-full max-w-md drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
        style={{ filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.08))" }}
      >
        <defs>
          {/* Aqua/water gradient — vibrant cyan to teal */}
          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#00d9ff", stopOpacity: 0.95 }} />
            <stop offset="50%" style={{ stopColor: "#00b8d4", stopOpacity: 0.85 }} />
            <stop offset="100%" style={{ stopColor: "#0088cc", stopOpacity: 0.75 }} />
          </linearGradient>
          {/* Radial glow for depth */}
          <radialGradient id="blob-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "#00ffd9", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "#0088cc", stopOpacity: 0 }} />
          </radialGradient>
          <filter id="blob-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>
        {/* Glow backdrop layer */}
        <circle cx="300" cy="200" r="200" fill="url(#blob-glow)" filter="url(#blob-blur)" />
        {/* Main blob path — vibrant aqua */}
        <path ref={blobPathRef} d={basePath} fill="url(#blob-gradient)" opacity="0.9" />
        {/* Inner highlight for wet/glossy effect */}
        <ellipse cx="280" cy="150" rx="80" ry="60" fill="rgba(255,255,255,0.25)" opacity="0.6" style={{ mixBlendMode: "screen" }} />
      </svg>
    </div>
  )
}

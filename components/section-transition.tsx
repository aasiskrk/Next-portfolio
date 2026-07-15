"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SectionTransitionProps {
  sectionId: string
  triggerText?: string
}

export function SectionTransition({ sectionId, triggerText = "Projects" }: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = document.getElementById(sectionId)

    if (!canvas || !section) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create zoom in transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "top top",
        scrub: 1,
        onEnter: () => {
          // Trigger zoom effect on scroll
        },
      },
    })

    // Draw morphing circle that expands
    let animationId: number
    let progress = 0

    const drawTransition = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate expanding circle from center
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxRadius = Math.max(canvas.width, canvas.height)
      const radius = maxRadius * progress

      // Draw expanding circle with gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, `rgba(255, 255, 255, ${0.2 * (1 - progress)})`)
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.1 * (1 - progress)})`)
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw expanding ring
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - progress)})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      if (progress < 1) {
        progress += 0.02
        animationId = requestAnimationFrame(drawTransition)
      }
    }

    // Trigger on scroll
    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.6) {
        progress = Math.min(1, (window.innerHeight * 0.6 - rect.top) / (window.innerHeight * 0.4))
        if (!animationId) {
          drawTransition()
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [sectionId])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 opacity-0 mix-blend-screen"
      style={{
        opacity: 0.6,
      }}
    />
  )
}

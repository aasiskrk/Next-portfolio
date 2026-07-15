"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface LiquidRippleTransitionProps {
  isActive?: boolean
  onComplete?: () => void
}

export function LiquidRippleTransition({ isActive = false, onComplete }: LiquidRippleTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Ripple properties
    const ripples: Array<{
      x: number
      y: number
      radius: number
      maxRadius: number
      opacity: number
    }> = []

    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height),
        opacity: 1,
      })
    }

    // Draw ripple effect
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ripples.forEach((ripple, index) => {
        if (ripple.opacity <= 0) {
          ripples.splice(index, 1)
          return
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${ripple.opacity * 0.3})`
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.fill()

        // Inner wave
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity * 0.5})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius - 20, 0, Math.PI * 2)
        ctx.stroke()
      })
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ripples.forEach((ripple) => {
        ripple.radius += 8
        ripple.opacity = Math.max(0, 1 - ripple.radius / ripple.maxRadius)
      })

      draw()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Trigger ripple on activation
    if (isActive) {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      createRipple(centerX, centerY)

      // Clean up after animation
      const timeout = setTimeout(() => {
        onComplete?.()
      }, 1200)

      return () => {
        cancelAnimationFrame(animationId)
        clearTimeout(timeout)
      }
    }

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isActive, onComplete])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(2px)",
      }}
    />
  )
}

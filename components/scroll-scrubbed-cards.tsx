"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollScrubbedCardsProps {
  children: React.ReactNode
  duration?: number
}

export function ScrollScrubbedCards({ children, duration = 1 }: ScrollScrubbedCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const cards = container.querySelectorAll("[data-card]")

    if (cards.length === 0) return

    // Create scroll-scrubbed timeline for cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "center 80%",
        end: "center 20%",
        scrub: 1.5, // Smooth scrubbing
        markers: false,
      },
    })

    // Stagger cards entrance with scroll
    cards.forEach((card, index) => {
      tl.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          rotationY: 45,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration,
        },
        index * 0.15
      )
    })

    return () => {
      tl.kill()
    }
  }, [duration])

  return (
    <div ref={containerRef} style={{ perspective: "1000px" }}>
      {children}
    </div>
  )
}

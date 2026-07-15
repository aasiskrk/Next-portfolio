"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface StickyCardStackProps {
  cards: Array<{
    id: string
    title: string
    label: string
    color: string
  }>
}

export function StickyCardStack({ cards }: StickyCardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return

    const container = containerRef.current
    const cardElements = cardsRef.current

    // Create scroll-triggered stacking animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    })

    // Animate each card to stack and layer
    cardElements.forEach((card, i) => {
      const offset = i * 20
      const rotation = i * 2

      timeline.to(
        card,
        {
          y: offset,
          rotation: rotation,
          opacity: 0.6 + i * 0.1,
          scale: 0.95 + i * 0.02,
          zIndex: i,
          duration: 0.5,
        },
        i * 0.1
      )
    })

    return () => {
      timeline.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [cards])

  return (
    <div ref={containerRef} className="relative h-96 w-full max-w-sm">
      {cards.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => {
            if (el) cardsRef.current[i] = el
          }}
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-md"
          style={{
            background: `linear-gradient(135deg, ${card.color}20 0%, ${card.color}10 100%)`,
          }}
        >
          <div className="text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">{card.label}</p>
            <h3 className="text-3xl font-bold text-white">{card.title}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

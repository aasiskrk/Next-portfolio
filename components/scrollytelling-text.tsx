"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollytellingTextProps {
  text: string
  className?: string
}

export function ScrollytellingText({ text, className = "" }: ScrollytellingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Create individual character spans
    const container = containerRef.current
    container.innerHTML = ""
    charsRef.current = []

    text.split("").forEach((char) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.className = "inline-block char"
      span.style.display = "inline-block"
      span.style.opacity = "0"
      span.style.transform = "translateY(20px) rotateZ(-5deg)"
      container.appendChild(span)
      charsRef.current.push(span)
    })

    // Create scroll-triggered reveal animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "center center",
        scrub: 1,
        markers: false,
        onUpdate: (self) => {
          // Add parallax effect
          gsap.set(container, {
            y: self.getVelocity() * 0.1,
          })
        },
      },
    })

    // Animate each character with stagger
    charsRef.current.forEach((char, i) => {
      timeline.to(
        char,
        {
          opacity: 1,
          y: 0,
          rotationZ: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        i * 0.04
      )
    })

    return () => {
      timeline.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [text])

  return (
    <div
      ref={containerRef}
      className={`text-balance text-6xl font-bold leading-tight tracking-tight ${className}`}
    />
  )
}

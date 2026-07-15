"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollScrubbedTextProps {
  text: string
  className?: string
  splitBy?: "word" | "char"
  stagger?: number
}

export function ScrollScrubbedText({
  text,
  className = "",
  splitBy = "char",
  stagger = 0.02,
}: ScrollScrubbedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const items = container.querySelectorAll("span")

    // Create scroll-scrubbed animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "center 80%",
        end: "center 20%",
        scrub: 1, // Smooth scrubbing
        markers: false,
      },
    })

    // Animate each character/word based on scroll
    items.forEach((item, index) => {
      tl.fromTo(
        item,
        {
          opacity: 0,
          rotationX: 90,
          y: 20,
        },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: 0.5,
        },
        index * stagger
      )
    })

    return () => {
      tl.kill()
    }
  }, [text, stagger])

  // Split text into characters or words
  const parts = splitBy === "char" ? text.split("") : text.split(" ")

  return (
    <div ref={containerRef} className={className} style={{ perspective: "1000px" }}>
      {parts.map((part, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            display: "inline-block",
            marginRight: splitBy === "word" ? "0.25em" : "0",
          }}
        >
          {part}
        </span>
      ))}
    </div>
  )
}

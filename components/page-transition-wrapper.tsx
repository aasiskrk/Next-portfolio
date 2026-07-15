"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface PageTransitionWrapperProps {
  children: React.ReactNode
  sectionId: string
  triggerLetter?: string
}

export function PageTransitionWrapper({
  children,
  sectionId,
  triggerLetter = "P",
}: PageTransitionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const overlay = overlayRef.current

    if (!section || !overlay) return

    // Create scroll trigger for section entrance
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      onEnter: () => {
        // Zoom effect from letter to full view
        gsap.fromTo(
          overlay,
          {
            opacity: 1,
            scale: 0.1,
            borderRadius: "50%",
          },
          {
            opacity: 0,
            scale: 1,
            borderRadius: "0%",
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => setShowOverlay(false),
          }
        )

        // Parallax effect on content
        gsap.fromTo(
          section.querySelectorAll("[data-transition]"),
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        )
      },
      once: true,
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div ref={sectionRef} className="relative">
      {/* Zoom overlay */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-black"
          style={{
            pointerEvents: "none",
          }}
        />
      )}

      {/* Children with transition markers */}
      <div data-transition>{children}</div>
    </div>
  )
}

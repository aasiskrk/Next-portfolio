"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const headingElement = section.querySelector("h1, h2, h3")
    const contentElements = section.querySelectorAll("[data-reveal]")

    // Scroll-scrubbed entrance animation for section heading
    if (headingElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
          markers: false,
        },
      })

      tl.fromTo(
        headingElement,
        {
          opacity: 0,
          y: 40,
          letterSpacing: "0.1em",
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0em",
          duration: 1,
        }
      )
    }

    // Stagger content elements
    if (contentElements.length > 0) {
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
          markers: false,
        },
      })

      contentElements.forEach((element, index) => {
        contentTl.fromTo(
          element,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
          },
          index * 0.1
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [sectionId])

  return <div ref={sectionRef}>{children}</div>
}

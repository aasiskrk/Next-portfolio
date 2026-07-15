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

export function PageTransitionWrapper({ children, sectionId }: PageTransitionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const heading = section.querySelector("h1, h2, h3")
    const content = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-reveal]"))

    if (reduceMotion) {
      gsap.set([heading, ...content].filter(Boolean), { opacity: 1, clearProps: "transform" })
      return
    }

    const context = gsap.context(() => {
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "top 48%",
              scrub: 0.7,
            },
          },
        )
      }

      if (content.length > 0) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 76%",
              end: "top 38%",
              scrub: 0.7,
            },
          },
        )
      }
    }, section)

    return () => context.revert()
  }, [sectionId])

  return <div ref={sectionRef}>{children}</div>
}

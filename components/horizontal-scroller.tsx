"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * HorizontalScroller — Pins a section vertically and translates its inner
 * content horizontally as the user scrolls. Once the horizontal scroll is
 * complete, normal vertical scrolling resumes. Creates a "scrollytelling"
 * experience where the viewport pans across wide content.
 */
export function HorizontalScroller({
  children,
  duration = 3, // in viewport heights
}: {
  children: React.ReactNode
  duration?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const container = containerRef.current
    const content = contentRef.current

    // Measure the width of the content
    const contentWidth = content.scrollWidth

    // Pin the section and translate X as the user scrolls vertically
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1.2, // smooth, slightly elastic scrub
        start: "top top",
        end: `+=${window.innerHeight * duration}`,
        markers: false,
      },
    })

    tl.to(
      content,
      {
        x: -Math.max(0, contentWidth - window.innerWidth),
        ease: "power1.inOut",
      },
      0,
    )

    return () => {
      tl.scrollTrigger?.kill()
    }
  }, [duration])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#08080a]"
      style={{ height: "100vh" }}
    >
      <div
        ref={contentRef}
        className="flex h-full gap-8 px-8"
        style={{ width: "fit-content" }}
      >
        {children}
      </div>
    </div>
  )
}

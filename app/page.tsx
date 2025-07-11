"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Introduction } from "@/components/sections/introduction"
import { Projects } from "@/components/sections/projects"
import { Languages } from "@/components/sections/languages"
import { Experience } from "@/components/sections/experience"
import { Contact } from "@/components/sections/contact"
import { Navigation } from "@/components/navigation"
import { SectionIndicator, SectionIndicatorClassic } from "@/components/section-indicator"

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isVerticalScrollActive, setIsVerticalScrollActive] = useState(false)
  const [verticalScrollTimeout, setVerticalScrollTimeout] = useState<NodeJS.Timeout | null>(null)

  const sections = ["Introduction", "Projects", "Languages", "Experience", "Contact"]

  const navigateToSection = useCallback(
    (index: number) => {
      if (isScrolling || !containerRef.current) return

      setIsScrolling(true)
      setCurrentSection(index)

      containerRef.current.style.transform = `translateX(-${index * 100}vw)`

      setTimeout(() => setIsScrolling(false), 1000)
    },
    [isScrolling],
  )

  // Handle vertical scroll context activation
  const handleVerticalScrollStart = useCallback(() => {
    setIsVerticalScrollActive(true)
    if (verticalScrollTimeout) {
      clearTimeout(verticalScrollTimeout)
    }
  }, [verticalScrollTimeout])

  // Handle vertical scroll context deactivation with delay
  const handleVerticalScrollEnd = useCallback(() => {
    const timeout = setTimeout(() => {
      setIsVerticalScrollActive(false)
    }, 300)
    setVerticalScrollTimeout(timeout)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement
      const scrollableContainer = target.closest('[data-vertical-scroll="true"]')

      // 1. Handle horizontal scrolls (trackpad, shift+wheel, etc.)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && !isScrolling) {
        e.preventDefault()
        const direction = e.deltaX > 0 ? 1 : -1
        const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction))
        if (newSection !== currentSection) {
          navigateToSection(newSection)
        }
        return
      }

      // 2. Handle vertical scrolls (prioritize vertical scroll, only preventDefault at edge)
      if (scrollableContainer && !isScrolling) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableContainer
        const isAtTop = scrollTop <= 5
        const isAtBottom = scrollTop >= scrollHeight - clientHeight - 5
        const hasVerticalContent = scrollHeight > clientHeight + 10

        if (hasVerticalContent) {
          // Let browser handle vertical scrolling unless at edge
          if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
            // Do NOT preventDefault, let browser scroll
            return
          }

          // Only preventDefault and trigger horizontal navigation at edge
          if ((e.deltaY > 0 && isAtBottom) || (e.deltaY < 0 && isAtTop)) {
            e.preventDefault()
            const direction = e.deltaY > 0 ? 1 : -1
            const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction))
            if (newSection !== currentSection) {
              setTimeout(() => {
                navigateToSection(newSection)
              }, 400)
            }
          }
          return
        }
      }

      if (!isVerticalScrollActive && !isScrolling) {
        e.preventDefault()
        const direction = e.deltaY > 0 ? 1 : -1
        const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction))
        if (newSection !== currentSection) {
          navigateToSection(newSection)
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      if (e.key === "ArrowLeft") {
        navigateToSection(Math.max(0, currentSection - 1))
      } else if (e.key === "ArrowRight") {
        navigateToSection(Math.min(sections.length - 1, currentSection + 1))
      }
    }

    document.addEventListener("wheel", handleWheel, { passive: false })
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("wheel", handleWheel)
      document.removeEventListener("keydown", handleKeyDown)
      if (verticalScrollTimeout) {
        clearTimeout(verticalScrollTimeout)
      }
    }
  }, [currentSection, isScrolling, isVerticalScrollActive, navigateToSection, sections.length, verticalScrollTimeout])

  useEffect(() => {
    // Move the background horizontally with each section
    const totalSections = sections.length
    const percent = (currentSection / (totalSections - 1)) * 100
    // 0% (left) to 100% (right)
    document.body.style.backgroundPosition = `${percent}% center`
  }, [currentSection, sections.length])

  return (
    <div className="h-screen overflow-x-hidden relative">
      <Navigation sections={sections} currentSection={currentSection} onNavigate={navigateToSection} />

      {/* Main content container with proper spacing */}
      <div className="h-full pt-24 pb-20 min-h-0">
        <div
          ref={containerRef}
          className="flex h-full min-h-0 transition-transform duration-1000 ease-out"
          style={{ width: `${sections.length * 100}vw` }}
        >
          <Introduction />
          <Projects onVerticalScrollStart={handleVerticalScrollStart} onVerticalScrollEnd={handleVerticalScrollEnd} />
          <Languages />
          <Experience onVerticalScrollStart={handleVerticalScrollStart} onVerticalScrollEnd={handleVerticalScrollEnd} />
          <Contact />
        </div>
      </div>

      <SectionIndicator sections={sections} currentSection={currentSection} onNavigate={navigateToSection} />
      <SectionIndicatorClassic sections={sections} currentSection={currentSection} onNavigate={navigateToSection} />
    </div>
  )
}

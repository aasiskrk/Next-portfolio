"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { ButtonScrollNavigation } from "./button-scroll-navigation"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ScrollableSectionContainerProps {
  children: ReactNode
  sectionId: string
  className?: string
  onScrollStart?: () => void
  onScrollEnd?: () => void
  onReachBottom?: () => void // Add this prop for immediate horizontal scroll
  onReachTop?: () => void // For previous section
  showArrows?: boolean // New prop to control arrow visibility
}

export function ScrollableSectionContainer({
  children,
  sectionId,
  className = "",
  onScrollStart,
  onScrollEnd,
  onReachBottom,
  onReachTop,
  showArrows = true, // Default to true for Projects/Experience
}: ScrollableSectionContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      if (scrollHeight > clientHeight) {
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100
        setScrollProgress(Math.min(100, Math.max(0, progress)))
      }
      // Trigger immediate horizontal scroll if at bottom or top
      if (onReachBottom && container.scrollTop >= scrollHeight - clientHeight - 1) {
        onReachBottom()
      }
      if (onReachTop && container.scrollTop <= 1) {
        onReachTop()
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [onReachBottom, onReachTop])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScrollState = () => {
      setCanScrollUp(container.scrollTop > 0)
      setCanScrollDown(container.scrollTop < container.scrollHeight - container.clientHeight - 1)
    }

    container.addEventListener("scroll", updateScrollState, { passive: true })
    updateScrollState()
    return () => container.removeEventListener("scroll", updateScrollState)
  }, [])

  return (
    <div className="relative h-full">
      <div
        ref={containerRef}
        id={sectionId}
        data-vertical-scroll="true"
        className={`h-full overflow-y-auto scrollbar-hide touch-pan-y cursor-crosshair pt-24 glassmorphic-section ${className}`}
        style={{
          scrollBehavior: "smooth",
          overscrollBehavior: "contain",
        }}
      >
        {children}

        {/* Fade gradient at bottom */}
        {scrollProgress < 95 && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950/20 to-transparent pointer-events-none z-10" />
        )}

        {/* Fade gradient at top */}
        {scrollProgress > 5 && (
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-950/20 to-transparent pointer-events-none z-10" />
        )}
      </div>

      {/* Button Navigation positioned relative to the section */}
      <ButtonScrollNavigation containerId={sectionId} onScrollStart={onScrollStart} onScrollEnd={onScrollEnd} />

      {/* Up/Down Arrow Buttons for vertical scroll */}
      {showArrows && canScrollDown && (
        <button
          className="fixed bottom-8 right-8 z-50 glassmorphic-arrow shadow-xl transition hover:scale-110 active:scale-95"
          onClick={() => containerRef.current?.scrollBy({ top: 120, behavior: 'smooth' })}
          aria-label="Scroll down"
        >
          <ChevronDown className="h-7 w-7 text-white drop-shadow" />
        </button>
      )}
      {showArrows && canScrollUp && (
        <button
          className="fixed bottom-20 right-8 z-50 glassmorphic-arrow shadow-xl transition hover:scale-110 active:scale-95"
          onClick={() => containerRef.current?.scrollBy({ top: -120, behavior: 'smooth' })}
          aria-label="Scroll up"
        >
          <ChevronUp className="h-7 w-7 text-white drop-shadow" />
        </button>
      )}
    </div>
  )
}

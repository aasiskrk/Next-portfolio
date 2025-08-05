"use client"

import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"

interface ButtonScrollNavigationProps {
  containerId: string
  onScrollStart?: () => void
  onScrollEnd?: () => void
}

export function ButtonScrollNavigation({ containerId, onScrollStart, onScrollEnd }: ButtonScrollNavigationProps) {
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const container = document.getElementById(containerId)
    containerRef.current = container

    if (!container) return

    const checkScrollability = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const hasOverflow = scrollHeight > clientHeight + 20

      setShowButtons(hasOverflow)
      setCanScrollUp(scrollTop > 10)
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 10)
    }

    const handleScroll = () => {
      checkScrollability()
    }

    const handleMouseEnter = () => {
      onScrollStart?.()
    }

    const handleMouseLeave = () => {
      setTimeout(() => {
        onScrollEnd?.()
      }, 100)
    }

    checkScrollability()
    container.addEventListener("scroll", handleScroll, { passive: true })
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    // Resize observer for dynamic content
    const resizeObserver = new ResizeObserver(checkScrollability)
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener("scroll", handleScroll)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      resizeObserver.disconnect()
    }
  }, [containerId, onScrollStart, onScrollEnd])

  const scrollUp = () => {
    if (containerRef.current && !isScrolling) {
      setIsScrolling(true)
      containerRef.current.scrollBy({
        top: -window.innerHeight * 0.7,
        behavior: "smooth",
      })
      setTimeout(() => setIsScrolling(false), 800)
    }
  }

  const scrollDown = () => {
    if (containerRef.current && !isScrolling) {
      setIsScrolling(true)
      containerRef.current.scrollBy({
        top: window.innerHeight * 0.7,
        behavior: "smooth",
      })
      setTimeout(() => setIsScrolling(false), 800)
    }
  }

  // Always show scroll buttons, but disable if not scrollable
  return (
    <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-30 flex flex-col items-end space-y-2 sm:space-y-3 glassmorphic-bg">
      {/* Up Arrow Button */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <span
          className="hidden sm:block text-gray-400 text-xs sm:text-sm font-semibold tracking-wider uppercase select-none"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            whiteSpace: "nowrap",
          }}
        >
          press
        </span>
        <Button
          onClick={scrollUp}
          disabled={!canScrollUp || isScrolling}
          className="glass-scroll-button w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-2xl disabled:opacity-50 transition-all duration-500 hover:scale-110 cursor-crosshair group"
        >
          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-gray-200 transition-colors duration-300" />
        </Button>
      </div>

      {/* Down Arrow Button */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <span
          className="hidden sm:block text-gray-400 text-xs sm:text-sm font-semibold tracking-wider uppercase select-none"
          style={{
            transform: "rotate(90deg)",
            transformOrigin: "center",
            whiteSpace: "nowrap",
          }}
        >
          press
        </span>
        <Button
          onClick={scrollDown}
          disabled={!canScrollDown || isScrolling}
          className="glass-scroll-button w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-2xl disabled:opacity-50 transition-all duration-500 hover:scale-110 cursor-crosshair group"
        >
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-gray-200 transition-colors duration-300" />
        </Button>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="glass-scroll-indicator w-1 h-8 sm:h-12 rounded-full relative overflow-hidden mt-1 sm:mt-2">
        <div
          className="glass-scroll-progress w-full rounded-full transition-all duration-300"
          style={{
            height: `${canScrollUp ? (canScrollDown ? "50%" : "100%") : "0%"}`,
            transform:
              canScrollUp && canScrollDown ? "translateY(0%)" : canScrollUp ? "translateY(0%)" : "translateY(100%)",
          }}
        />
      </div>
    </div>
  )
}

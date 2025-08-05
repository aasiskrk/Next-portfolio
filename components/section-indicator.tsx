"use client"

import { useEffect, useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface SectionIndicatorProps {
  sections: string[]
  currentSection: number
  onNavigate: (index: number) => void
}

export function SectionIndicator({ sections, currentSection, onNavigate }: SectionIndicatorProps) {
  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    setShowTransition(true)
    const timer = setTimeout(() => setShowTransition(false), 2000)
    return () => clearTimeout(timer)
  }, [currentSection])

  const nextSection = currentSection < sections.length - 1 ? currentSection + 1 : null
  const prevSection = currentSection > 0 ? currentSection - 1 : null

  return (
    <div
      className={`fixed top-1/2 left-2 sm:left-8 transform -translate-y-1/2 z-50 transition-all duration-500 ${
        showTransition ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
    >
      <div className="glassmorphic-nav rounded-2xl p-3 sm:p-4 space-y-2 sm:space-y-3 shadow-2xl border border-white/10 backdrop-blur-xl bg-white/10">
        {/* Previous Section */}
        {prevSection !== null && (
          <button
            onClick={() => onNavigate(prevSection)}
            className="flex items-center space-x-2 sm:space-x-3 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-semibold hidden sm:block">{sections[prevSection]}</span>
          </button>
        )}

        {/* Current Section */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-white">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-bold">{sections[currentSection]}</span>
        </div>

        {/* Next Section */}
        {nextSection !== null && (
          <button
            onClick={() => onNavigate(nextSection)}
            className="flex items-center space-x-2 sm:space-x-3 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-semibold hidden sm:block">{sections[nextSection]}</span>
          </button>
        )}
      </div>
    </div>
  )
}

export function SectionIndicatorClassic({ sections, currentSection, onNavigate }: SectionIndicatorProps) {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 mb-2 sm:mb-4">
      <div className="glassmorphic-nav rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-2xl border border-white/10 backdrop-blur-xl bg-white/10">
        <div className="flex space-x-2 sm:space-x-3">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 relative cursor-crosshair ${
                currentSection === index
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-gray-500 hover:bg-gray-300 hover:scale-110"
              }`}
            >
              {currentSection === index && (
                <div className="absolute inset-0 bg-white/50 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

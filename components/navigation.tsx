"use client"

interface NavigationProps {
  sections: string[]
  currentSection: number
  onNavigate: (index: number) => void
}

export function Navigation({ sections, currentSection, onNavigate }: NavigationProps) {
  return (
    <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 glassmorphic-nav">
      <div className="glass-nav-premium rounded-full px-8 py-4 shadow-2xl">
        <div className="flex items-center space-x-6">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => onNavigate(index)}
              className={`text-sm font-semibold transition-all duration-500 px-5 py-3 rounded-full relative overflow-hidden cursor-crosshair ${
                currentSection === index
                  ? "text-white bg-white/15 shadow-lg border border-white/20 backdrop-blur-xl scale-105"
                  : "text-gray-300 hover:text-white hover:bg-white/10 hover:scale-102 hover:shadow-lg"
              }`}
            >
              <span className="relative z-10">{section}</span>
              {currentSection === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/8 to-white/4 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

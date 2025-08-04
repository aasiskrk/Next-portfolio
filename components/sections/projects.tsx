"use client"

import { ExternalLink, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollableSectionContainer } from "@/components/scrollable-section-container"

interface ProjectsProps {
  onVerticalScrollStart?: () => void
  onVerticalScrollEnd?: () => void
}

export function Projects({ onVerticalScrollStart, onVerticalScrollEnd }: ProjectsProps) {
  return (
    <section className="w-screen h-full min-h-0 flex flex-col px-8 flex-shrink-0 relative">
      {/* Fixed Section Header */}
      <div className="flex-shrink-0 text-center py-6 z-10">
        <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Featured Projects</h2>
        <p className="text-lg text-gray-400 font-medium">Latest repositories from GitHub</p>
        <div className="h-1 w-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Scrollable Content Container */}
      <div className="flex-1 min-h-0 relative">
        <ScrollableSectionContainer
          sectionId="projects-container"
          onScrollStart={onVerticalScrollStart}
          onScrollEnd={onVerticalScrollEnd}
          onReachBottom={onVerticalScrollEnd}
          onReachTop={undefined}
          className="px-4 py-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="glass-card-premium rounded-3xl p-12 max-w-2xl mx-auto shadow-xl">
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <Construction className="h-24 w-24 text-gray-400 mb-4 animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Projects Section
                  </h3>
                  
                  <p className="text-gray-400 text-lg leading-relaxed mb-6">
                    This section is currently under construction. I'm working on setting up a static version 
                    for GitHub Pages deployment. Check back soon for featured projects!
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="px-3 py-1 glass-tag-premium rounded-full text-xs text-gray-300 font-semibold">
                      Coming Soon
                    </span>
                    <span className="px-3 py-1 glass-tag-premium rounded-full text-xs text-gray-300 font-semibold">
                      Static Site
                    </span>
                  </div>
                  
                  <div className="mt-8">
                    <Button
                      className="glass-button-primary rounded-xl shadow-lg font-semibold px-6 py-3 cursor-crosshair"
                      onClick={() => window.open('https://github.com/aasiskrk', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View GitHub Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollableSectionContainer>
      </div>
    </section>
  )
}

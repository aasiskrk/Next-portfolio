"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Star, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollableSectionContainer } from "@/components/scrollable-section-container"
import axios from "axios"

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  updated_at: string
}

interface ProjectsProps {
  onVerticalScrollStart?: () => void
  onVerticalScrollEnd?: () => void
}

export function Projects({ onVerticalScrollStart, onVerticalScrollEnd }: ProjectsProps) {
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get("/api/github-repos")
        if (Array.isArray(response.data)) {
          setGithubRepos(response.data)
        } else {
          setGithubRepos([])
          console.error("Unexpected response:", response.data)
        }
      } catch (error) {
        setGithubRepos([])
        console.error("Error fetching repos:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

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
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(18)].map((_, index) => (
                  <Card key={index} className="glass-card-premium rounded-3xl p-6 animate-pulse shadow-xl">
                    <div className="h-6 bg-white/10 rounded-xl mb-4"></div>
                    <div className="h-4 bg-white/5 rounded-lg mb-2"></div>
                    <div className="h-4 bg-white/5 rounded-lg mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-20 bg-white/5 rounded-full"></div>
                      <div className="h-6 w-20 bg-white/5 rounded-full"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                {githubRepos.map((repo) => (
                  <Card
                    key={repo.id}
                    className="glass-card-premium rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 group shadow-xl cursor-crosshair"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-500 leading-tight pr-2">
                          {repo.name}
                        </h3>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-all duration-500 flex-shrink-0"
                        >
                          <Button
                            size="sm"
                            className="glass-button-primary rounded-xl shadow-lg font-semibold text-sm px-3 py-2 cursor-crosshair"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </a>
                      </div>

                      <p className="text-gray-400 mb-4 text-sm leading-relaxed font-medium line-clamp-3">
                        {repo.description || "No description available"}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span className="text-xs font-semibold">{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitFork className="h-4 w-4" />
                            <span className="text-xs font-semibold">{repo.forks_count}</span>
                          </div>
                        </div>
                        {repo.language && (
                          <span className="px-3 py-1 glass-tag-premium rounded-full text-xs text-gray-300 font-semibold">
                            {repo.language}
                          </span>
                        )}
                      </div>

                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {repo.topics.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              className="px-2 py-1 glass-tag-small-premium rounded-full text-xs text-gray-400 font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </ScrollableSectionContainer>
      </div>
    </section>
  )
}

"use client"

import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollableSectionContainer } from "@/components/scrollable-section-container"

interface ProjectsProps {
  onVerticalScrollStart?: () => void
  onVerticalScrollEnd?: () => void
}

interface Project {
  title: string
  description: string
  technologies: string[]
  category: string
  github?: string
  demo?: string
  demoLabel?: string
}

const projects: Project[] = [
  {
    title: "Patro+ — Nepali Calendar",
    description:
      "A published Nepali (Bikram Sambat) calendar app built with Flutter. It shows Nepali dates, holidays and festivals, and lets you set reminders that automatically repeat every year — for birthdays, anniversaries and events. Free, fully offline, no ads and no data collection.",
    technologies: ["Flutter", "Dart", "Android"],
    category: "Published App",
    demo: "https://play.google.com/store/apps/details?id=com.npc.patroplus",
    demoLabel: "Google Play",
  },
  {
    title: "Bidesh",
    description:
      "A Flutter mobile application I designed and shipped to the Google Play Store, built and published end-to-end as a cross-platform Android app.",
    technologies: ["Flutter", "Dart", "Android"],
    category: "Published App",
    demo: "https://play.google.com/store/apps/details?id=com.bidesh.bidesh",
    demoLabel: "Google Play",
  },
  {
    title: "redo_boilerplate",
    description:
      "My first published Dart package, available on pub.dev. It generates a complete, opinionated project boilerplate with a single command — removing the repetitive setup at the start of every new Flutter project.",
    technologies: ["Dart", "Flutter", "pub.dev"],
    category: "Open Source",
    github: "https://github.com/aasiskrk/Redo-Boilerplate",
    demo: "https://pub.dev/packages/redo_boilerplate",
    demoLabel: "pub.dev",
  },
  {
    title: "Restro POS",
    description:
      "A full-featured restaurant Point of Sale system built with the MERN stack. Handles order management, billing, menu administration and staff workflows to streamline day-to-day restaurant operations.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    github: "https://github.com/aasiskrk/Restro-pos",
  },
  {
    title: "Medication & Cycle Tracker",
    description:
      "An Android application that helps users track medication intake and their menstrual cycle, with reminders and a clean interface. Built with Flutter as a collaborative university group project.",
    technologies: ["Flutter", "Dart", "Android"],
    category: "Mobile",
  },
  {
    title: "PlayForge — Gaming Forum",
    description:
      "A community gaming forum built on the MERN stack where users can create posts, discuss games and interact. Includes authentication, threaded content and a responsive React UI.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    github: "https://github.com/aasiskrk/React-Gaming-Forum",
    demo: "https://react-gaming-forum-3e7nzfmho-aasiskrks-projects.vercel.app",
    demoLabel: "Live Demo",
  },
  {
    title: "Gaming Forum — Mobile",
    description:
      "The cross-platform Flutter companion to PlayForge, backed by MongoDB. It brings the gaming community experience to Android and iOS with a clean, native-feeling interface.",
    technologies: ["Flutter", "Dart", "MongoDB"],
    category: "Mobile",
    github: "https://github.com/aasiskrk/Gaming-Forum",
  },
  {
    title: "Furniture E-Commerce",
    description:
      "A full-stack furniture e-commerce platform with a React front-end and an Express/MongoDB back-end. Features product browsing, cart and a REST API, deployed end-to-end on Vercel.",
    technologies: ["React", "Express", "MongoDB", "REST API"],
    category: "Full Stack",
    github: "https://github.com/aasiskrk/furniture-fe",
    demo: "https://furniture-fe-eight.vercel.app",
    demoLabel: "Live Demo",
  },
]

export function Projects({ onVerticalScrollStart, onVerticalScrollEnd }: ProjectsProps) {
  return (
    <section className="w-screen h-full min-h-0 flex flex-col px-8 flex-shrink-0 relative">
      {/* Fixed Section Header */}
      <div className="flex-shrink-0 text-center py-6 z-10">
        <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Featured Projects</h2>
        <p className="text-lg text-gray-400 font-medium">Apps I've shipped and things I've built</p>
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
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 pb-8">
              {projects.map((project) => (
                <Card
                  key={project.title}
                  className="glass-card-premium rounded-3xl p-7 flex flex-col hover:scale-[1.02] transition-all duration-500 group shadow-xl cursor-crosshair"
                >
                  <div className="flex items-start justify-between mb-3 gap-3">
                    <h3 className="text-2xl font-black text-white group-hover:text-gray-300 transition-colors duration-500 tracking-tight">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 glass-tag-small-premium rounded-full text-xs text-gray-400 font-semibold whitespace-nowrap">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-sm mb-5 font-medium flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 glass-tag-premium rounded-full text-xs text-gray-300 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {(project.github || project.demo) && (
                    <div className="flex items-center gap-3 mt-auto">
                      {project.github && (
                        <Button
                          className="glass-button-primary rounded-xl shadow-lg font-semibold px-5 py-2 cursor-crosshair"
                          onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                      )}
                      {project.demo && (
                        <Button
                          variant="outline"
                          className="glass-button-secondary rounded-xl font-semibold px-5 py-2 bg-transparent cursor-crosshair hover:text-white"
                          onClick={() => window.open(project.demo, "_blank", "noopener,noreferrer")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {project.demoLabel ?? "Live Demo"}
                        </Button>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="flex justify-center pb-8">
              <Button
                variant="outline"
                className="glass-button-secondary rounded-2xl px-8 py-4 text-base font-semibold bg-transparent cursor-crosshair hover:text-white"
                onClick={() => window.open("https://github.com/aasiskrk", "_blank", "noopener,noreferrer")}
              >
                <Github className="h-5 w-5 mr-2" />
                View More on GitHub
              </Button>
            </div>
          </div>
        </ScrollableSectionContainer>
      </div>
    </section>
  )
}

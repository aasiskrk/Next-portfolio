"use client"

import { ArrowUpRight, Github } from "lucide-react"
import { SectionHeading, StaggerGroup, RevealItem } from "@/components/reveal"
import { StickyCardStack } from "@/components/sticky-card-stack"

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
      "A published Nepali (Bikram Sambat) calendar app built with Flutter. Shows Nepali dates, holidays and festivals, and lets you set reminders that repeat every year. Free, fully offline, no ads and no data collection.",
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
      "My first published Dart package on pub.dev. It generates a complete, opinionated project boilerplate with a single command — removing the repetitive setup at the start of every new Flutter project.",
    technologies: ["Dart", "Flutter", "pub.dev"],
    category: "Open Source",
    github: "https://github.com/aasiskrk/Redo-Boilerplate",
    demo: "https://pub.dev/packages/redo_boilerplate",
    demoLabel: "pub.dev",
  },
  {
    title: "Restro POS",
    description:
      "A full-featured restaurant Point of Sale system built with the MERN stack. Handles order management, billing, menu administration and staff workflows to streamline restaurant operations.",
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
      "A community gaming forum on the MERN stack where users create posts, discuss games and interact. Includes authentication, threaded content and a responsive React UI.",
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

const projectCards = [
  { id: "aura", title: "AURA", label: "Featured", color: "#00D9FF" },
  { id: "kinetic", title: "KINETIC", label: "Mobile", color: "#FF006E" },
  { id: "nexus", title: "NEXUS", label: "Full Stack", color: "#A000FF" },
]

export function Projects() {
  return (
    <section id="projects" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Projects"
          subtitle="Apps I've shipped and things I've built."
        />

        {/* Layout with sticky card stack on left and projects grid on right */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[350px_1fr] lg:items-start">
          {/* Sticky Card Stack - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block">
            <StickyCardStack cards={projectCards} />
          </div>

          {/* Projects Grid */}
          <StaggerGroup className="grid gap-5 md:grid-cols-2">
            {projects.map((project, i) => (
              <RevealItem
                key={project.title}
                as="article"
                index={i}
                step={0.06}
                className="glass-card-premium group flex flex-col rounded-[1.5rem] p-7"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight text-white">{project.title}</h3>
                  <span className="glass-tag-small-premium shrink-0 whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
                    {project.category}
                  </span>
                </div>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">{project.description}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="glass-tag-premium rounded-full px-3 py-1 text-xs font-medium text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {(project.github || project.demo) && (
                  <div className="mt-auto flex items-center gap-2.5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-button-secondary flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:text-white"
                      >
                        {project.demoLabel ?? "Live Demo"}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-fluid group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                )}
              </RevealItem>
            ))}
          </StaggerGroup>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/aasiskrk"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button-secondary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            <Github className="h-4 w-4" />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

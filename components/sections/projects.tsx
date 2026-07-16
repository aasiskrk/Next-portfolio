"use client"

import { ArrowUpRight } from "lucide-react"
import { SectionHeading, StaggerGroup, RevealItem, Reveal } from "@/components/reveal"

interface Project {
  title: string
  description: string
  technologies: string[]
  category: string
  href?: string
}

const projects: Project[] = [
  {
    title: "Patro+",
    description:
      "Published Nepali (Bikram Sambat) calendar with festivals, holidays and yearly reminders — offline, free, no ads.",
    technologies: ["Flutter", "Dart", "Android"],
    category: "Published App",
    href: "https://play.google.com/store/apps/details?id=com.npc.patroplus",
  },
  {
    title: "Bidesh",
    description: "Cross-platform Flutter app designed, built and published end-to-end on Google Play.",
    technologies: ["Flutter", "Dart", "Android"],
    category: "Published App",
    href: "https://play.google.com/store/apps/details?id=com.bidesh.bidesh",
  },
  {
    title: "redo_boilerplate",
    description: "A Dart CLI package on pub.dev that scaffolds an opinionated Flutter project in one command.",
    technologies: ["Dart", "Flutter", "pub.dev"],
    category: "Open Source",
    href: "https://pub.dev/packages/redo_boilerplate",
  },
  {
    title: "Restro POS",
    description: "Restaurant point-of-sale on the MERN stack — orders, billing, menus and staff workflows.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    href: "https://github.com/aasiskrk/Restro-pos",
  },
  {
    title: "PlayForge",
    description: "Community gaming forum with authentication and threaded discussions, built on the MERN stack.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    href: "https://react-gaming-forum-3e7nzfmho-aasiskrks-projects.vercel.app",
  },
  {
    title: "Gaming Forum — Mobile",
    description: "The Flutter companion to PlayForge, bringing the community to Android and iOS.",
    technologies: ["Flutter", "Dart", "MongoDB"],
    category: "Mobile",
    href: "https://github.com/aasiskrk/Gaming-Forum",
  },
  {
    title: "Furniture E-Commerce",
    description: "Full-stack storefront with product browsing, cart and a REST API, deployed on Vercel.",
    technologies: ["React", "Express", "MongoDB"],
    category: "Full Stack",
    href: "https://furniture-fe-eight.vercel.app",
  },
  {
    title: "Medication & Cycle Tracker",
    description: "Flutter app for tracking medication intake and menstrual cycles, with reminders.",
    technologies: ["Flutter", "Dart", "Android"],
    category: "Mobile",
  },
]

function ProjectRow({ project }: { project: Project }) {
  const body = (
    <>
      <div className="min-w-0 flex-1">
        <h3 className="text-2xl font-medium tracking-tight text-white/85 transition-all duration-500 ease-fluid group-hover:translate-x-1.5 group-hover:text-white sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/45">{project.description}</p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white/30">
          {project.technologies.join(" · ")}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-5 sm:flex-col sm:items-end sm:justify-between sm:gap-3 sm:self-stretch sm:pt-1.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">{project.category}</span>
        {project.href && (
          <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-500 ease-fluid group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
        )}
      </div>
    </>
  )

  const rowClass =
    "group flex flex-col gap-4 border-b border-white/10 py-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8"

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-label="Open"
        className={rowClass}
      >
        {body}
      </a>
    )
  }
  return <div className={rowClass}>{body}</div>
}

export function Projects() {
  return (
    <section id="projects" className="relative px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Things I've"
          accent="shipped"
          meta={`${projects.length} projects`}
        />

        <StaggerGroup className="mt-16">
          {projects.map((project, i) => (
            <RevealItem key={project.title} as="div" index={i} step={0.06}>
              <ProjectRow project={project} />
            </RevealItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1} className="mt-10">
          <a
            href="https://github.com/aasiskrk"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="GitHub"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors duration-300 ease-fluid hover:text-white"
          >
            <span className="link-underline">View more on GitHub</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-fluid group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

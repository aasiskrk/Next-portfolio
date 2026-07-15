"use client"

import { useRef } from "react"
import { Building, MapPin } from "lucide-react"
import { motion, useScroll, useSpring } from "framer-motion"
import { SectionHeading, RevealItem } from "@/components/reveal"
import { useInView } from "@/components/use-in-view"
import { SplitText } from "@/components/split-text"

interface ExperienceEntry {
  title: string
  company: string
  location: string
  period: string
  year: string
  type: string
  description: string
  achievements: string[]
  technologies: string[]
}

const experiences: ExperienceEntry[] = [
  {
    title: "Full Stack Engineer",
    company: "Arkenos",
    location: "Remote",
    period: "Nov 2025 — Present",
    year: "Now",
    type: "Full-time",
    description:
      "Building full-stack web and mobile products end-to-end. Working across the stack with Next.js on the web and Flutter on mobile, collaborating remotely to design, develop and ship production features.",
    achievements: [
      "Developing web applications with Next.js and React",
      "Building cross-platform mobile apps with Flutter",
      "Working across the full stack from UI to APIs and deployment",
      "Collaborating in a remote, agile team environment",
    ],
    technologies: ["Next.js", "React", "Flutter", "Dart", "Node.js", "Docker", "TypeScript"],
  },
  {
    title: "Flutter Intern",
    company: "Kitwosd IT Support Center",
    location: "Lalitpur, Nepal",
    period: "Jun 2025 — Aug 2025",
    year: "2025",
    type: "Internship",
    description:
      "On-site internship focused on mobile app development and design. Designed UI/UX in Figma and built Flutter applications, contributing to projects within an agile development team.",
    achievements: [
      "Designed mobile UI/UX using Figma",
      "Developed Flutter applications following clean architecture",
      "Collaborated on-site with the development team using Git",
      "Participated in agile development processes",
    ],
    technologies: ["Flutter", "Dart", "Figma", "UI/UX", "Git", "Agile"],
  },
  {
    title: "Bachelor's in Computer Science",
    company: "Softwarica College · Coventry University",
    location: "Kathmandu, Nepal",
    period: "Apr 2021 — Oct 2024",
    year: "2021",
    type: "Education",
    description:
      "Completed a Bachelor's degree in Computer Science (Coventry University, UK affiliation) with a focus on mobile and web application development, data structures, algorithms and software engineering.",
    achievements: [
      "Graduated with First Class Honours in Computing",
      "Built academic projects in Flutter and the MERN stack",
      "Participated in coding competitions and hackathons",
      "Mentored junior students in programming",
    ],
    technologies: ["Dart", "Android", "Flutter", "Python", "Java", "MERN Stack", "Figma", "Linux"],
  },
]

// The rail and every node share this exact horizontal center (px from the
// padded container's left edge), so the line always runs dead-center.
const RAIL_CENTER = 24

function TimelineEntry({ exp }: { exp: ExperienceEntry }) {
  const { ref, inView } = useInView<HTMLElement>({ margin: "0px 0px -12% 0px" })

  return (
    <article ref={ref} className="relative pl-16">
      {/* Node — positioned by a static wrapper (never overridden by animation);
          only the inner element scales in. */}
      <span
        className="absolute top-7 z-10"
        style={{ left: RAIL_CENTER, transform: "translateX(-50%)" }}
      >
        <span
          className={`relative flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-[#0c0c0f] transition-transform duration-500 ease-fluid ${
            inView ? "scale-100" : "scale-0"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="absolute inset-0 rounded-full bg-white/20 blur-md" />
        </span>
      </span>

      <div
        className={`reveal ${inView ? "is-visible" : ""} glass-card-premium group relative rounded-[1.5rem] p-7 transition-transform duration-500 ease-fluid hover:-translate-y-1`}
      >
        {/* Oversized ghost year for depth */}
        <span className="pointer-events-none absolute right-5 top-3 select-none font-mono text-5xl font-bold tracking-tight text-white/[0.05] sm:text-6xl">
          {exp.year}
        </span>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-white">{exp.title}</h3>
              <span className="glass-tag-small-premium rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
                {exp.type}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5" />
                {exp.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {exp.location}
              </span>
            </div>
          </div>
          <span className="shrink-0 font-mono text-xs text-white/40">{exp.period}</span>
        </div>

        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-white/55">{exp.description}</p>

        <ul className="mb-5 grid gap-2 sm:grid-cols-2">
          {exp.achievements.map((a) => (
            <li key={a} className="flex items-start gap-2.5 text-sm text-white/50">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
              {a}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech) => (
            <span key={tech} className="glass-tag-premium rounded-full px-3 py-1 text-xs font-medium text-white/70">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 55%", "end 65%"],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="experience" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <RevealItem className="reveal" as="div">
          <div className="mb-3">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.4em] text-white/40">Journey</p>
            <h2 className="mb-3 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              <SplitText text="Experience" as="span" by="word" trigger="inView" stagger={0.08} />
            </h2>
            <p className="text-base text-white/50 sm:text-lg">My professional path so far.</p>
          </div>
        </RevealItem>

        <div ref={railRef} className="relative mt-14">
          {/* Base rail track — centered on RAIL_CENTER */}
          <span
            className="absolute top-2 bottom-2 w-px bg-white/10"
            style={{ left: RAIL_CENTER, transform: "translateX(-50%)" }}
            aria-hidden="true"
          />
          {/* Scroll-scrubbed fill: static wrapper positions it; inner motion span
              only scales vertically, so it can't drift off the rail. */}
          <span
            className="absolute top-2 w-px overflow-hidden"
            style={{ left: RAIL_CENTER, bottom: 8, transform: "translateX(-50%)" }}
            aria-hidden="true"
          >
            <motion.span
              className="block h-full w-full origin-top bg-gradient-to-b from-white via-white/70 to-white/20"
              style={{ scaleY: fill }}
            />
          </span>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <TimelineEntry key={exp.title} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

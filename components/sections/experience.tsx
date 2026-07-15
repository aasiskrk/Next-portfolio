"use client"

import { Building, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { SectionHeading, staggerContainer, revealItem } from "@/components/reveal"

interface ExperienceEntry {
  title: string
  company: string
  location: string
  period: string
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

export function Experience() {
  return (
    <section id="experience" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Journey" title="Experience" subtitle="My professional path so far." />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="relative mt-14"
        >
          {/* vertical rail */}
          <span className="absolute left-[7px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent sm:block" />

          <div className="space-y-5">
            {experiences.map((exp) => (
              <motion.article key={exp.title} variants={revealItem} className="relative sm:pl-12">
                {/* node */}
                <span className="absolute left-0 top-8 hidden h-3.5 w-3.5 -translate-x-[3px] rounded-full border border-white/30 bg-[#08080a] sm:block">
                  <span className="absolute inset-1 rounded-full bg-white/80" />
                </span>

                <div className="glass-card-premium rounded-[1.5rem] p-7">
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

                  <p className="mb-5 text-sm leading-relaxed text-white/55">{exp.description}</p>

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
                      <span
                        key={tech}
                        className="glass-tag-premium rounded-full px-3 py-1 text-xs font-medium text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

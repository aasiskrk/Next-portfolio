"use client"

import { SectionHeading, StaggerGroup, RevealItem } from "@/components/reveal"

interface ExperienceEntry {
  role: string
  company: string
  location: string
  period: string
  description: string
}

const experiences: ExperienceEntry[] = [
  {
    role: "Full Stack Engineer",
    company: "Arkenos",
    location: "Remote",
    period: "Nov 2025 — Present",
    description:
      "Designing and shipping web products with Next.js and cross-platform apps with Flutter, from UI to APIs and deployment.",
  },
  {
    role: "Flutter Intern",
    company: "Kitwosd IT Support Center",
    location: "Lalitpur, Nepal",
    period: "Jun 2025 — Aug 2025",
    description:
      "Built Flutter applications with clean architecture and designed mobile UI/UX in Figma within an agile team.",
  },
  {
    role: "BSc Computer Science",
    company: "Softwarica College · Coventry University",
    location: "Kathmandu, Nepal",
    period: "Apr 2021 — Oct 2024",
    description:
      "Graduated with First Class Honours, focused on mobile and web application development.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="relative px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Journey" title="Work" accent="experience" />

        <StaggerGroup className="mt-16">
          {experiences.map((exp, i) => (
            <RevealItem key={exp.role} as="article" index={i} step={0.08}>
              <div className="group grid gap-2 border-b border-white/10 py-10 sm:grid-cols-[1fr_auto] sm:gap-x-10">
                <div>
                  <h3 className="text-2xl font-medium tracking-tight text-white/85 transition-all duration-500 ease-fluid group-hover:translate-x-1.5 group-hover:text-white sm:text-3xl">
                    {exp.role}
                  </h3>
                  <p className="mt-2.5 text-sm text-white/50">
                    {exp.company}
                    <span className="text-white/25"> · </span>
                    <span className="text-white/40">{exp.location}</span>
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/40">{exp.description}</p>
                </div>
                <p className="order-first font-mono text-xs uppercase tracking-[0.15em] text-white/40 sm:order-none sm:pt-2.5 sm:text-right">
                  {exp.period}
                </p>
              </div>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

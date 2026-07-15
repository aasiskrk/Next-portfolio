"use client"

import type { IconType } from "react-icons"
import {
  SiFlutter,
  SiDart,
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiPython,
  SiHtml5,
  SiCss3,
  SiFigma,
  SiJavascript,
  SiGit,
  SiDocker,
  SiLinux,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import { SectionHeading, StaggerGroup, RevealItem } from "@/components/reveal"

interface Skill {
  name: string
  icon: IconType
}

const skills: Skill[] = [
  { name: "Flutter", icon: SiFlutter },
  { name: "Dart", icon: SiDart },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "MongoDB", icon: SiMongodb },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Python", icon: SiPython },
  { name: "Java", icon: FaJava },
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 },
  { name: "Git", icon: SiGit },
  { name: "Docker", icon: SiDocker },
  { name: "Linux", icon: SiLinux },
  { name: "Figma", icon: SiFigma },
]

export function Languages() {
  return (
    <section id="skills" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Toolkit" title="Languages & Tools" subtitle="The tech I build with." />

        <StaggerGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {skills.map(({ name, icon: Icon }, i) => (
            <RevealItem
              key={name}
              index={i}
              step={0.05}
              className="glass-card-premium group flex flex-col items-center justify-center gap-4 rounded-[1.25rem] px-4 py-8"
            >
              <Icon
                className="h-9 w-9 text-white/55 transition-all duration-500 ease-fluid group-hover:-translate-y-1 group-hover:text-white"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-white/70 transition-colors duration-500 group-hover:text-white">
                {name}
              </span>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

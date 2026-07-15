"use client"

import type { IconType } from "react-icons"
import { useEffect } from "react"
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
import { SectionHeading } from "@/components/reveal"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

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

const firstRow = skills.slice(0, 8)
const secondRow = skills.slice(8)

export function Languages() {
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes scroll-left {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      @keyframes scroll-right {
        0% {
          transform: translateX(-50%);
        }
        100% {
          transform: translateX(0);
        }
      }
      
      .marquee-track-left {
        animation: scroll-left 45s linear infinite;
      }
      
      .marquee-track-right {
        animation: scroll-right 50s linear infinite;
      }
      
      .marquee-container:hover .marquee-track-left,
      .marquee-container:hover .marquee-track-right {
        animation-play-state: paused;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const SkillPill = ({ name, icon: Icon }: Skill) => (
    <div className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group">
      <Icon
        className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-300"
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  )

  return (
    <PageTransitionWrapper sectionId="skills" triggerLetter="S">
      <section id="skills" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-5xl mb-16" data-reveal>
          <SectionHeading eyebrow="Toolkit" title="Languages & Tools" subtitle="The tech I build with." />
        </div>

        {/* Two-Row Marquee */}
        <div className="space-y-6 overflow-hidden" data-reveal>
          {/* Row 1 - Scrolling Left */}
          <div className="marquee-container relative w-full overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-black to-transparent" />

            <div className="flex w-max">
              <div className="marquee-track-left flex gap-4">
                {[...firstRow, ...firstRow].map(({ name, icon: Icon }, i) => (
                  <SkillPill key={`row1-${name}-${i}`} name={name} icon={Icon} />
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 - Scrolling Right */}
          <div className="marquee-container relative w-full overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-black to-transparent" />

            <div className="flex w-max">
              <div className="marquee-track-right flex gap-4">
                {[...secondRow, ...secondRow].map(({ name, icon: Icon }, i) => (
                  <SkillPill key={`row2-${name}-${i}`} name={name} icon={Icon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransitionWrapper>
  )
}

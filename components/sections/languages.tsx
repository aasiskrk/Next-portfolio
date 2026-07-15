"use client"

import type { IconType } from "react-icons"
import { useEffect, useRef } from "react"
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
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

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
      
      .marquee-track {
        animation: scroll-left 40s linear infinite;
      }
      
      .marquee-track:hover {
        animation-play-state: paused;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <section id="skills" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl mb-16">
        <SectionHeading eyebrow="Toolkit" title="Languages & Tools" subtitle="The tech I build with." />
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left gradient fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-black to-transparent" />
        
        {/* Right gradient fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-black to-transparent" />

        {/* Marquee content */}
        <div ref={marqueeRef} className="flex w-max">
          <div className="marquee-track flex gap-4">
            {[...skills, ...skills].map(({ name, icon: Icon }, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <Icon
                  className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-300"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Card } from "@/components/ui/card"
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

interface Skill {
  name: string
  icon?: IconType
  color?: string
}

const skills: Skill[] = [
  { name: "Flutter", icon: SiFlutter, color: "text-blue-400" },
  { name: "Dart", icon: SiDart, color: "text-cyan-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "Python", icon: SiPython, color: "text-yellow-400" },
  { name: "Java", icon: FaJava, color: "text-red-400" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "HTML", icon: SiHtml5, color: "text-orange-500" },
  { name: "CSS", icon: SiCss3, color: "text-blue-500" },
  { name: "Git", icon: SiGit, color: "text-orange-500" },
  { name: "Docker", icon: SiDocker, color: "text-blue-400" },
  { name: "Linux", icon: SiLinux, color: "text-gray-200" },
  { name: "Figma", icon: SiFigma, color: "text-pink-400" },
]

export function Languages() {
  return (
    <section className="w-screen h-full flex items-center justify-center px-8 flex-shrink-0">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Languages & Tools</h2>
          <p className="text-lg text-gray-400 font-medium">The tech I build with</p>
          <div className="h-1 w-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mx-auto mt-4"></div>
        </div>
        <div className="flex justify-center">
          <Card className="glass-card-premium rounded-3xl p-10 hover:scale-[1.02] transition-all duration-500 shadow-2xl cursor-crosshair w-full">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-10">
              {/* MERN Stack — grouped */}
              <div className="flex w-28 flex-col items-center">
                <div className="flex h-16 items-center space-x-1.5">
                  <SiMongodb className="text-green-500" size={28} />
                  <SiExpress className="text-gray-300" size={28} />
                  <SiReact className="text-cyan-400" size={28} />
                  <SiNodedotjs className="text-green-600" size={28} />
                </div>
                <span className="mt-3 text-white font-bold text-base tracking-wide">MERN Stack</span>
              </div>

              {skills.map(({ name, icon: Icon, color }) => (
                <div key={name} className="flex w-28 flex-col items-center">
                  <div className="flex h-16 items-center justify-center">
                    {Icon && <Icon className={color} size={56} />}
                  </div>
                  <span className="mt-3 text-white font-bold text-base tracking-wide">{name}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

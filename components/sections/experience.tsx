"use client"

import { Calendar, Building, MapPin, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ScrollableSectionContainer } from "@/components/scrollable-section-container"

interface ExperienceProps {
  onVerticalScrollStart?: () => void
  onVerticalScrollEnd?: () => void
}

export function Experience({ onVerticalScrollStart, onVerticalScrollEnd }: ExperienceProps) {
  const experiences = [
    {
      title: "Full Stack Engineer",
      company: "Arkenos",
      location: "Remote",
      period: "Nov 2025 - Present",
      type: "Full-time",
      description:
        "Building full-stack web and mobile products end-to-end. Working across the stack with Next.js on the web and Flutter on mobile, and collaborating remotely with the team to design, develop and ship production features.",
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
      period: "Jun 2025 - Aug 2025",
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
      company: "Softwarica College of IT and E-commerce · Coventry University",
      location: "Kathmandu, Nepal",
      period: "Apr 2021 - Oct 2024",
      type: "Education",
      description:
        "Completed a Bachelor's degree in Computer Science (Coventry University, UK affiliation) with a focus on mobile and web application development, data structures, algorithms and software engineering.",
      achievements: [
        "Graduated with a First Class Honours Degree in Computing",
        "Built academic projects in Flutter and the MERN stack",
        "Participated in coding competitions and hackathons",
        "Mentored junior students in programming",
      ],
      technologies: ["Dart", "Android", "Flutter", "Python", "Java", "MERN Stack", "Figma", "Linux"],
    },
  ]

  return (
    <section className="w-screen h-full min-h-0 flex flex-col px-8 flex-shrink-0 relative">
      {/* Fixed Section Header */}
      <div className="flex-shrink-0 text-center py-6 z-10">
        <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Experience</h2>
        <p className="text-lg text-gray-400 font-medium">My professional journey</p>
        <div className="h-1 w-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Scrollable Content Container */}
      <div className="flex-1 min-h-0 relative">
        <ScrollableSectionContainer
          sectionId="experience-container"
          onScrollStart={onVerticalScrollStart}
          onScrollEnd={onVerticalScrollEnd}
          onReachBottom={onVerticalScrollEnd}
          onReachTop={undefined}
          showArrows={true}
          className="px-4 py-6"
        >
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8 pb-8">
              {experiences.map((experience, index) => (
                <Card
                  key={index}
                  className="glass-card-premium rounded-3xl p-8 hover:scale-[1.01] transition-all duration-500 group shadow-xl cursor-crosshair"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-black text-white group-hover:text-gray-300 transition-colors duration-500 tracking-tight">
                          {experience.title}
                        </h3>
                        <span className="px-3 py-1 glass-tag-small-premium rounded-full text-xs text-gray-400 font-semibold">
                          {experience.type}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          <span className="font-semibold">{experience.company}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="font-medium">{experience.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 mt-3 lg:mt-0">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-semibold">{experience.period}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-base mb-6 font-medium">{experience.description}</p>

                  {experience.achievements && (
                    <div className="mb-6">
                      <h4 className="text-white font-bold mb-3 flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-400 text-sm flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 glass-tag-premium rounded-full text-xs text-gray-300 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </ScrollableSectionContainer>
      </div>
    </section>
  )
}

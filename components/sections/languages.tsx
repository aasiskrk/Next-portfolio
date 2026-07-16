"use client"

import { SectionHeading, StaggerGroup, RevealItem } from "@/components/reveal"

const groups = [
  { label: "Mobile", items: ["Flutter", "Dart", "Android"] },
  { label: "Web", items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML & CSS"] },
  { label: "Backend", items: ["Node.js", "Express", "MongoDB", "Python", "Java"] },
  { label: "Tools", items: ["Git", "Docker", "Linux", "Figma"] },
]

export function Languages() {
  return (
    <section id="skills" className="relative px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Toolkit" title="Stack &" accent="tools" />

        <StaggerGroup className="mt-16 grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
          {groups.map((group, gi) => (
            <RevealItem key={group.label} index={gi} step={0.08}>
              <p className="border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
                {group.label}
              </p>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-base text-white/65 transition-colors duration-300 ease-fluid hover:text-white sm:text-lg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

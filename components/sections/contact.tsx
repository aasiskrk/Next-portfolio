"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading, Reveal } from "@/components/reveal"

const EMAIL = "aasis.krk1@gmail.com"

const socials = [
  { label: "GitHub", href: "https://github.com/aasiskrk" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aashista-karki-69420g" },
  { label: "Instagram", href: "https://instagram.com/aashista_krki" },
]

function KathmanduTime() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kathmandu",
    })
    const tick = () => setTime(formatter.format(new Date()))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return <>{time || "--:--"}</>
}

export function Contact() {
  return (
    <section id="contact" className="relative px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's"
          accent="talk."
          subtitle="Open to freelance and full-time roles. If you have an idea worth building, say hello."
        />

        <Reveal delay={0.15}>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor-label="Say hi"
            className="group mt-16 inline-flex flex-wrap items-baseline gap-x-4 gap-y-2"
          >
            <span className="link-underline break-all text-[clamp(1.5rem,4.5vw,3.5rem)] font-medium tracking-tight text-white">
              {EMAIL}
            </span>
            <ArrowUpRight className="h-6 w-6 self-center text-white/40 transition-all duration-500 ease-fluid group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white sm:h-8 sm:w-8" />
          </a>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-7">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="Follow"
                    className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 transition-colors duration-300 ease-fluid hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
              Kathmandu, Nepal · <KathmanduTime /> GMT+5:45
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

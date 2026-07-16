"use client"

import { ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import { SplitText } from "@/components/split-text"

interface IntroductionProps {
  /** Starts the entrance choreography (fired as the loader curtain lifts). */
  play: boolean
  onViewProjects?: () => void
  onContact?: () => void
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.7 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const socials = [
  { label: "GitHub", href: "https://github.com/aasiskrk" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aashista-karki-69420g" },
  { label: "Instagram", href: "https://instagram.com/aashista_krki/" },
]

export function Introduction({ play, onViewProjects, onContact }: IntroductionProps) {
  return (
    <section id="home" className="relative flex min-h-[100dvh] flex-col justify-center px-5 pb-28 pt-24 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={play ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.4em] text-white/40"
        >
          <span className="tracking-normal text-white/60">नमस्ते</span>
          <span aria-hidden="true"> — </span>
          Kathmandu, Nepal
        </motion.p>

        <h1 className="text-[clamp(3.75rem,12vw,10.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white">
          <SplitText text="Aashista" as="span" by="char" active={play} delay={0.25} stagger={0.04} className="block" />
          <SplitText
            text="Karki"
            as="span"
            by="char"
            active={play}
            delay={0.45}
            stagger={0.05}
            className="block pl-[0.06em] font-serif font-normal italic text-white/90"
          />
        </h1>

        <motion.div variants={container} initial="hidden" animate={play ? "visible" : "hidden"}>
          <motion.p variants={item} className="mt-9 max-w-2xl text-pretty text-lg leading-relaxed text-white/55 sm:text-xl">
            Full-stack &amp; mobile developer. I design and ship cross-platform apps with Flutter and web
            products with Next.js, including{" "}
            <a
              href="https://play.google.com/store/apps/details?id=com.npc.patroplus"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="Play Store"
              className="link-underline text-white"
            >
              Patro+
            </a>
            , a Nepali calendar with 1,500+ downloads on Google Play.
          </motion.p>

          <motion.div variants={item} className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-4">
            <button
              onClick={onViewProjects}
              className="group flex items-center gap-2.5 text-sm font-medium text-white"
            >
              <span className="link-underline">View selected work</span>
              <ArrowDown className="h-4 w-4 transition-transform duration-500 ease-fluid group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={onContact}
              className="text-sm font-medium text-white/50 transition-colors duration-300 ease-fluid hover:text-white"
            >
              <span className="link-underline">Get in touch</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom rail: social index left, scroll cue right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 1.4 }}
        className="absolute inset-x-0 bottom-9 hidden px-5 sm:px-8 lg:block"
      >
        <div className="mx-auto flex max-w-6xl items-end justify-between">
          <ul className="flex gap-7">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="Follow"
                  className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 ease-fluid hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

        </div>
      </motion.div>
    </section>
  )
}

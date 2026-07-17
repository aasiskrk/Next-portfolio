"use client"

import { useState } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
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

/**
 * Directional masked wipe. Each script owns a side: English lives stage-left,
 * Nepali stage-right. A line exits by being erased toward its own side (the
 * clip front sweeps across the glyphs) while the incoming line is revealed by
 * the same front travelling the same direction — with a slight drift for
 * momentum and a per-line stagger. Vertical insets are negative so ascenders,
 * descenders and italic overhangs never clip.
 *
 * Exit end-state equals enter start-state per block, so the swap is symmetric
 * in both directions without tracking direction at exit time.
 */
const lineEn = {
  enter: { clipPath: "inset(-8% 103% -8% -3%)", x: "-4%" },
  center: (i: number) => ({
    clipPath: "inset(-8% -3% -8% -3%)",
    x: "0%",
    transition: { duration: 0.85, ease: EASE, delay: 0.1 + i * 0.08 },
  }),
  exit: (i: number) => ({
    clipPath: "inset(-8% 103% -8% -3%)",
    x: "-4%",
    transition: { duration: 0.6, ease: EASE, delay: i * 0.06 },
  }),
}

const lineNe = {
  enter: { clipPath: "inset(-8% -3% -8% 103%)", x: "4%" },
  center: (i: number) => ({
    clipPath: "inset(-8% -3% -8% -3%)",
    x: "0%",
    transition: { duration: 0.85, ease: EASE, delay: 0.1 + i * 0.08 },
  }),
  exit: (i: number) => ({
    clipPath: "inset(-8% -3% -8% 103%)",
    x: "4%",
    transition: { duration: 0.6, ease: EASE, delay: i * 0.06 },
  }),
}

const socials = [
  { label: "GitHub", href: "https://github.com/aasiskrk" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aashista-karki-69420g" },
  { label: "Instagram", href: "https://instagram.com/aashista_krki/" },
]

export function Introduction({ play, onViewProjects, onContact }: IntroductionProps) {
  const [script, setScript] = useState<"en" | "ne">("en")

  return (
    <section id="home" className="relative flex min-h-[100dvh] flex-col justify-center px-5 pb-28 pt-24 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={play ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.4em] text-white/40"
        >
          <span className="font-devanagari tracking-normal text-white/60">नमस्ते</span>
          <span aria-hidden="true"> — </span>
          Kathmandu, Nepal
        </motion.p>

        <div className="relative">
          {/* The stage: both scripts render into the same box, so the swap is a
              true in-place replacement with no layout shift. */}
          <h1
            aria-label="Aashista Karki — आशिष्त कार्की"
            className="relative h-[1.9em] overflow-hidden text-[clamp(3.75rem,11vw,10rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white"
          >
            <AnimatePresence initial={false} mode="sync">
              {script === "en" ? (
                <motion.span
                  key="en"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex flex-col items-start justify-center"
                >
                  <motion.span variants={lineEn} custom={0} className="block will-change-[clip-path,transform]">
                    <SplitText text="Aashista" as="span" by="char" active={play} delay={0.25} stagger={0.04} className="block" />
                  </motion.span>
                  <motion.span variants={lineEn} custom={1} className="block will-change-[clip-path,transform]">
                    <SplitText
                      text="Karki"
                      as="span"
                      by="char"
                      active={play}
                      delay={0.45}
                      stagger={0.05}
                      className="block pl-[0.06em] font-serif font-normal italic text-white/90"
                    />
                  </motion.span>
                </motion.span>
              ) : (
                <motion.span
                  key="ne"
                  lang="ne"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex flex-col items-start justify-center font-devanagari font-normal tracking-normal"
                >
                  <motion.span variants={lineNe} custom={0} className="block text-[0.68em] leading-[1.32] will-change-[clip-path,transform]">
                    आशिष्त
                  </motion.span>
                  <motion.span variants={lineNe} custom={1} className="block text-[0.68em] leading-[1.32] will-change-[clip-path,transform]">
                    कार्की
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </h1>

          {/* Script toggle — a quiet ghost arrow hugging the name's top-right
              corner, pointing out of it; flips to point back after swapping.
              The offset is the width of "Aashista" in font-size units, so the
              gap holds at every viewport; min() keeps it inside the container
              on the narrowest screens. Small glyph, full-size hit area. */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={play ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
            onClick={() => setScript((s) => (s === "en" ? "ne" : "en"))}
            aria-label={script === "en" ? "Show name in Nepali" : "Show name in English"}
            className="absolute top-1 left-[min(calc(clamp(3.75rem,11vw,10rem)*4.45),calc(100%-2.75rem))] flex h-11 w-11 items-center justify-center text-white/25 transition-colors duration-500 ease-fluid hover:text-white"
          >
            <ArrowUpRight
              className={`h-4 w-4 transition-transform duration-700 ease-fluid ${
                script === "ne" ? "rotate-180" : ""
              }`}
            />
          </motion.button>
        </div>

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

      {/* Bottom rail: social index */}
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

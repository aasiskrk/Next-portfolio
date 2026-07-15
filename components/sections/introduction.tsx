"use client"

import { ArrowRight, Github, Linkedin, Mail, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { LiquidImage } from "@/components/liquid-image"
import { Magnetic } from "@/components/magnetic"
import { SplitText } from "@/components/split-text"

interface IntroductionProps {
  onViewProjects?: () => void
  onContact?: () => void
}

const EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } },
}

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: EASE } },
}

const socials = [
  { icon: Github, href: "https://github.com/aasiskrk", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/aashista-karki-69420g", label: "LinkedIn" },
  { icon: Mail, href: "mailto:aasis.krk1@gmail.com", label: "Email" },
  { icon: Instagram, href: "https://instagram.com/aashista_krki/", label: "Instagram" },
]

export function Introduction({ onViewProjects, onContact }: IntroductionProps) {
  return (
    <section id="home" className="relative flex min-h-[100dvh] items-center px-5 pb-20 pt-28 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left — copy */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/50">Kathmandu, Nepal</p>
          </motion.div>

          <h1 className="text-balance text-6xl font-semibold leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
            <SplitText text="Aashista" as="span" by="char" trigger="mount" delay={0.55} stagger={0.045} className="block" />
            <SplitText
              text="Karki"
              as="span"
              by="char"
              trigger="mount"
              delay={0.8}
              stagger={0.045}
              className="text-outline block"
            />
          </h1>

          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.h2 variants={item} className="mt-6 text-xl font-medium text-white/80 sm:text-2xl">
              Full Stack &amp; Mobile App Developer
            </motion.h2>

            <motion.p variants={item} className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/50 sm:text-lg">
              I build cross-platform mobile apps with Flutter and full-stack web apps with Next.js and the MERN
              stack. I&apos;ve shipped real products to the Play Store, including{" "}
              <span className="text-white/80">Patro+</span>, a Nepali calendar app with 1.5k+ downloads.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  onClick={onViewProjects}
                  className="glass-button-primary group flex items-center gap-3 rounded-full py-3 pl-6 pr-3 text-sm font-semibold"
                >
                  View My Work
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-fluid group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={onContact}
                  className="glass-button-secondary rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Get In Touch
                </button>
              </Magnetic>
            </motion.div>

            <motion.div variants={item} className="mt-9 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="glass-social flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors duration-500 ease-fluid hover:text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right — portrait with liquid hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.4 }}
          className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md"
        >
          <div className="glass-card-premium rounded-[2rem] p-2">
            <div className="glass-inner-premium relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-0.5rem)]">
              <LiquidImage src="/images/me1.jpg" alt="Portrait of Aashista Karki" className="absolute inset-0" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

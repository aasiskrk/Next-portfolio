"use client"

import { motion, type Variants } from "framer-motion"
import { type ElementType } from "react"

const EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

interface SplitTextProps {
  text: string
  className?: string
  /** Element to render as (h1, h2, span, ...). */
  as?: ElementType
  /** Split granularity. */
  by?: "word" | "char"
  delay?: number
  stagger?: number
  /** Animate on scroll into view (default) or immediately on mount. */
  trigger?: "inView" | "mount"
  duration?: number
}

/**
 * Kinetic typography: each word (or char) sits inside an overflow-hidden mask
 * and slides up from below with a soft blur, staggered for a "type-set" reveal.
 */
export function SplitText({
  text,
  className,
  as = "span",
  by = "word",
  delay = 0,
  stagger = 0.05,
  trigger = "inView",
  duration = 0.9,
}: SplitTextProps) {
  const MotionTag = motion(as as ElementType)
  const units = by === "word" ? text.split(" ") : Array.from(text)

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const child: Variants = {
    hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
    visible: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration, ease: EASE } },
  }

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      {...(trigger === "inView"
        ? { whileInView: "visible", viewport: { once: true, margin: "-12% 0px" } }
        : { animate: "visible" })}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span variants={child} className="inline-block will-change-transform">
            {unit}
            {by === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

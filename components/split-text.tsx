"use client"

import { useEffect, useState, type CSSProperties, type ElementType } from "react"
import { useInView } from "@/components/use-in-view"

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
 * and slides up from below with a soft blur, staggered per index.
 *
 * The hidden state is real CSS (`.split-unit`) present at first paint, so there
 * is no hydration flash. JS only toggles the `.is-visible` class.
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
  const Tag = as as ElementType
  const units = by === "word" ? text.split(" ") : Array.from(text)

  const { ref, inView } = useInView<HTMLElement>({ margin: "0px 0px -12% 0px" })
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (trigger === "mount") {
      const id = requestAnimationFrame(() => setMounted(true))
      return () => cancelAnimationFrame(id)
    }
  }, [trigger])

  const visible = trigger === "mount" ? mounted : inView

  return (
    <Tag
      ref={ref}
      className={`split ${visible ? "is-visible" : ""} ${className ?? ""}`}
      style={{ ["--split-duration" as string]: `${duration}s` } as CSSProperties}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <span key={i} className="split-mask" aria-hidden="true">
          <span
            className="split-unit"
            style={{ "--unit-delay": `${delay + i * stagger}s` } as CSSProperties}
          >
            {unit}
            {by === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  )
}

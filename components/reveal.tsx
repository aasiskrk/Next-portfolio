"use client"

import { createContext, useContext, type CSSProperties, type ElementType, type ReactNode } from "react"
import { useInView } from "@/components/use-in-view"
import { SplitText } from "@/components/split-text"

/** Single element scroll reveal: heavy fade-up with a soft blur (CSS-driven). */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ margin: "0px 0px -10% 0px" })
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className ?? ""}`}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  )
}

/* --- Staggered group: parent observes once, children reveal in sequence --- */

const StaggerCtx = createContext<{ visible: boolean }>({ visible: false })

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ margin: "0px 0px -8% 0px" })
  return (
    <div ref={ref} className={className}>
      <StaggerCtx.Provider value={{ visible: inView }}>{children}</StaggerCtx.Provider>
    </div>
  )
}

export function RevealItem({
  children,
  className,
  index = 0,
  step = 0.08,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  index?: number
  step?: number
  as?: ElementType
}) {
  const { visible } = useContext(StaggerCtx)
  return (
    <Tag
      className={`reveal ${visible ? "is-visible" : ""} ${className ?? ""}`}
      style={{ "--reveal-delay": `${index * step}s` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

/** A section heading block: eyebrow label + big title + optional subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string
  title: string
  subtitle?: string
  align?: "center" | "left"
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <Reveal>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-white/40">{eyebrow}</p>
      </Reveal>
      <SplitText
        as="h2"
        text={title}
        by="word"
        stagger={0.08}
        className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
      />
      {subtitle && (
        <Reveal delay={0.15}>
          <p
            className={`mt-4 text-base text-white/50 sm:text-lg ${align === "center" ? "mx-auto max-w-xl" : "max-w-xl"}`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}

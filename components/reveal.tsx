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

/**
 * Editorial section heading: a hairline rule, a mono eyebrow (with optional
 * right-aligned meta), and a large title whose accent word is set in the
 * serif italic display face.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  meta,
}: {
  eyebrow: string
  title: string
  accent?: string
  subtitle?: string
  meta?: string
}) {
  return (
    <div className="border-t border-white/10 pt-6">
      <div className="flex items-baseline justify-between gap-4">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/40">{eyebrow}</p>
        </Reveal>
        {meta && (
          <Reveal delay={0.1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">{meta}</p>
          </Reveal>
        )}
      </div>

      <h2 className="mt-8 text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
        <SplitText as="span" text={title} by="word" stagger={0.07} />
        {accent && (
          <>
            {" "}
            <SplitText
              as="span"
              text={accent}
              by="word"
              stagger={0.07}
              delay={0.15}
              className="font-serif font-normal italic text-white/90"
            />
          </>
        )}
      </h2>

      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-xl text-base text-white/50 sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}

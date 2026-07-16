"use client"

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"

/**
 * Ambient background: a few large, heavily blurred pinwheels (firfire — the
 * paper toys) that rotate with scroll and drift on a slight parallax. Kept at
 * very low opacity so they read as soft light shapes, not decoration.
 */

function PinwheelSvg({ size }: { size: number }) {
  // Four sails, each a 45° wedge with a curved outer edge, around a hub.
  const blade = "M100 100 L100 14 A86 86 0 0 1 160.8 39.2 Z"
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      {[0, 90, 180, 270].map((deg) => (
        <path key={deg} d={blade} fill="white" transform={`rotate(${deg} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="8" fill="white" />
    </svg>
  )
}

function Pinwheel({
  className,
  size,
  blur,
  opacity,
  rotate,
  y,
}: {
  className: string
  size: number
  blur: number
  opacity: number
  rotate: MotionValue<number> | number
  y?: MotionValue<number> | number
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ rotate, y, opacity, filter: `blur(${blur}px)` }}
    >
      <PinwheelSvg size={size} />
    </motion.div>
  )
}

export function BackgroundPinwheels() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.4 })

  const r1 = useTransform(progress, [0, 1], [0, 260])
  const r2 = useTransform(progress, [0, 1], [40, -220])
  const r3 = useTransform(progress, [0, 1], [-30, 180])
  const y1 = useTransform(progress, [0, 1], [0, -140])
  const y2 = useTransform(progress, [0, 1], [60, -60])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Pinwheel
        className="-right-32 -top-24"
        size={520}
        blur={70}
        opacity={0.05}
        rotate={reduceMotion ? 20 : r1}
      />
      <Pinwheel
        className="-left-40 top-[42%]"
        size={400}
        blur={60}
        opacity={0.04}
        rotate={reduceMotion ? -15 : r2}
        y={reduceMotion ? 0 : y1}
      />
      <Pinwheel
        className="-bottom-28 right-[14%]"
        size={320}
        blur={42}
        opacity={0.045}
        rotate={reduceMotion ? 45 : r3}
        y={reduceMotion ? 0 : y2}
      />
    </div>
  )
}

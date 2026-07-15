"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagneticProps {
  children: ReactNode
  className?: string
  /** How far the element is pulled toward the cursor (0-1). */
  strength?: number
}

/**
 * Wraps a child and pulls it toward the pointer while hovered, springing back
 * to center on leave. Purely transform-based, so it stays GPU-cheap.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

interface ProjectCard {
  id: string
  title: string
  image: string
  color: string
  delay: number
}

const projects: ProjectCard[] = [
  {
    id: "patro-plus",
    title: "Patro+",
    image: "https://images.unsplash.com/photo-1611050550966-cf42afb0e9e8?w=400&h=500&fit=crop",
    color: "#FF6B6B",
    delay: 0,
  },
  {
    id: "bidesh",
    title: "Bidesh",
    image: "https://images.unsplash.com/photo-1577720643272-265de49a35f7?w=400&h=500&fit=crop",
    color: "#4ECDC4",
    delay: 0.15,
  },
  {
    id: "restro-pos",
    title: "Restro POS",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop",
    color: "#FFE66D",
    delay: 0.3,
  },
]

export function ProjectShowcaseCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll("[data-card]")
    if (!cards) return

    let isAnimating = false

    const handleMouseMove = (e: MouseEvent) => {
      if (isAnimating) return

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        const rotateX = (y / rect.height) * -10
        const rotateY = (x / rect.width) * 10

        ;(card as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${10 + index * 5}px)`
      })
    }

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        ;(card as HTMLElement).style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0px)"
      })
    }

    containerRef.current?.addEventListener("mousemove", handleMouseMove)
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove)
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-96 w-full max-w-sm perspective"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          data-card
          initial={{
            opacity: 0,
            y: 50,
            x: index * 20,
            rotateZ: index * 5,
          }}
          animate={{
            opacity: 1,
            y: 0,
            x: index * 20,
            rotateZ: index * 5,
          }}
          transition={{
            duration: 0.8,
            delay: project.delay,
            ease: [0.32, 0.72, 0, 1],
          }}
          whileHover={{
            y: -10,
            rotateZ: index * 5,
            scale: 1.05,
          }}
          className="absolute h-full w-80 cursor-pointer rounded-2xl shadow-2xl transition-all duration-300 will-change-transform"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Card Background */}
          <div
            className="absolute inset-0 rounded-2xl opacity-10 blur-xl"
            style={{ backgroundColor: project.color }}
          />

          {/* Card Image */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full rounded-2xl object-cover"
          />

          {/* Card Overlay Gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Card Border Glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              border: `1px solid ${project.color}`,
              boxShadow: `0 0 20px ${project.color}40, inset 0 0 20px ${project.color}20`,
            }}
          />

          {/* Card Content */}
          <div className="absolute inset-0 flex flex-col items-end justify-end rounded-2xl p-6">
            <div className="text-right">
              <h3
                className="font-semibold tracking-tight"
                style={{
                  color: project.color,
                  textShadow: `0 0 10px ${project.color}40`,
                  fontSize: "18px",
                }}
              >
                {project.title}
              </h3>
              <p className="mt-1 text-xs text-white/60">Mobile Application</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

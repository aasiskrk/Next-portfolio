"use client"

import { Download, Github, Linkedin, Mail, Instagram, Code2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export function Introduction() {
  // Animation variants for smooth fade-in effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth movie-like feel
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.95,
      filter: "blur(5px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      filter: "blur(15px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3
      }
    }
  }

  return (
    <section className="w-screen h-full flex items-center justify-center px-8 flex-shrink-0">
      <motion.div 
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-8" variants={containerVariants}>
          <div className="space-y-6">
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-white" />
                <p className="text-white text-lg font-semibold tracking-wide uppercase">Hello, I'm</p>
              </div>
              <h1 className="text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">Aashista</h1>
              <div className="h-1.5 w-96 bg-transparent rounded-full"></div>
            </motion.div>
            
            <motion.h2 
              className="text-3xl lg:text-4xl text-transparent font-black leading-tight"
              variants={itemVariants}
            >
              Full Stack &<br />
              <span className="text-transparent">Mobile App Developer</span>
            </motion.h2>

            <motion.p 
              className="text-lg text-transparent leading-relaxed max-w-2xl font-semibold"
              variants={itemVariants}
            >
              Passionate about creating beautiful, functional applications with Flutter and MERN stack. Specialized in
              full-stack web development and cross-platform mobile applications with a keen eye for user experience and
              modern design principles.
            </motion.p>
          </div>

          <motion.div 
            className="flex flex-wrap gap-4"
            variants={containerVariants}
          >
            <motion.div variants={buttonVariants}>
              <Button className="glass-button-primary rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:text-white cursor-crosshair">
                <Download className="mr-3 h-5 w-5" />
                Download Resume
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Button
                variant="outline"
                className="glass-button-secondary rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-500 hover:scale-105 hover:text-white bg-transparent cursor-crosshair"
              >
                View Projects
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex space-x-4"
            variants={containerVariants}
          >
            {[
              { icon: Github, href: "https://github.com/aasiskrk", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/aashista-karki-69420g", label: "LinkedIn" },
              { icon: Mail, href: "mailto:aasis.krk1@gmail.com", label: "Email" },
              { icon: Instagram, href: "https://instagram.com/aashista_krki/", label: "Instagram" },
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-social p-3 rounded-2xl transition-all duration-500 hover:scale-110 hover:shadow-2xl cursor-crosshair"
                aria-label={label}
                variants={buttonVariants}
                custom={index}
              >
                <Icon className="h-6 w-6 text-gray-300 hover:text-white transition-colors duration-500" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative"
          variants={imageVariants}
        >
            <div className={`glass-card-premium rounded-4xl p-5 hover:scale-105 transition-all duration-800 shadow-2xl cursor-crosshair relative transform-style-preserve-3d `}> 
              <div className="aspect-[8/7] glass-inner-premium rounded-4xl flex items-center justify-center relative overflow-hidden backface-hidden">
                <Image 
                  src="/images/me1.jpg" 
                  alt="Profile" 
                  loading="lazy"
                  width={600} 
                  height={600} 
                  className="z-10 object-contain"
                />
                {/* <div className="absolute top-8 right-8 w-16 h-16 glass-orb-premium rounded-full"></div>
                <div className="absolute bottom-12 left-8 w-12 h-12 glass-orb-premium rounded-full"></div>
                <div className="absolute top-1/2 left-6 w-8 h-8 glass-orb-premium rounded-full"></div> */}
              </div>
              <div className="inset-0 mt-5 flex flex-col items-center justify-center rounded-4xl frontface-hidden">
                <span className="text-3xl lg:text-4xl font-black text-white text-center leading-tight select-none">
                  Full Stack Web &<br />Flutter Developer
                </span>
                
              </div>
            </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

"use client"

import { Download, Github, Linkedin, Mail, Instagram, Code2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image";

export function Introduction() {

  return (
    <section className="w-screen h-full flex items-center justify-center px-8 flex-shrink-0">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-white" />
                <p className="text-white text-lg font-semibold tracking-wide uppercase">Hello, I'm</p>
              </div>
              <h1 className="text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">Aashista</h1>
              <div className="h-1.5 w-96 bg-transparent rounded-full"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl text-transparent font-black leading-tight" >
              Full Stack &<br />
              <span className="text-transparent">Mobile App Developer</span>
            </h2>

            <p className="text-lg text-transparent leading-relaxed max-w-2xl font-semibold">
              Passionate about creating beautiful, functional applications with Flutter and MERN stack. Specialized in
              full-stack web development and cross-platform mobile applications with a keen eye for user experience and
              modern design principles.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button className="glass-button-primary rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:text-white cursor-crosshair">
              <Download className="mr-3 h-5 w-5" />
              Download Resume
            </Button>
            <Button
              variant="outline"
              className="glass-button-secondary rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-500 hover:scale-105 hover:text-white bg-transparent cursor-crosshair"
            >
              View Projects
            </Button>
          </div>

          <div className="flex space-x-4">
            {[
              { icon: Github, href: "https://github.com/aasiskrk", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/aashista-karki-69420g", label: "LinkedIn" },
              { icon: Mail, href: "mailto:aasis.krk1@gmail.com", label: "Email" },
              { icon: Instagram, href: "https://instagram.com/aashista_krki/", label: "Instagram" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-social p-3 rounded-2xl transition-all duration-500 hover:scale-110 hover:shadow-2xl cursor-crosshair"
                aria-label={label}
              >
                <Icon className="h-6 w-6 text-gray-300 hover:text-white transition-colors duration-500" />
              </a>
            ))}
          </div>
        </div>

        

        <div className="relative">
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
        </div>
      </div>
    </section>
  )
}

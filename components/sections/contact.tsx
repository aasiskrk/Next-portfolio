"use client"

import { Mail, Github, Linkedin, Instagram, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Contact() {
  const contactLinks = [
    {
      name: "Gmail",
      icon: Mail,
      href: "mailto:aasis.krk1@gmail.com",
      value: "aasis.krk1@gmail.com",
      color: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/aasiskrk",
      value: "github.com/aasiskrk",
      color: "bg-gray-600/20 text-gray-300 border-gray-500/30",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/aashista-karki-69420g",
      value: "linkedin.com/in/aashista-karki-69420g",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/aashista_krki",
      value: "@aashista_krki",
      color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    },
  ]

  return (
    <section className="w-screen h-auto flex items-center justify-center px-8 flex-shrink-0">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Get In Touch</h2>
          <p className="text-lg text-gray-400 font-medium">Let's work together on your next project</p>
          <div className="h-1 w-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            {contactLinks.map((contact) => (
              <Card
                key={contact.name}
                className="glass-card-premium rounded-3xl p-6 hover:scale-105 transition-all duration-500 shadow-xl group cursor-crosshair"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-4 rounded-2xl ${contact.color} border transition-all duration-500 group-hover:scale-110`}
                  >
                    <contact.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-lg mb-1 tracking-tight">{contact.name}</h3>
                    <a
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-gray-400 hover:text-white transition-colors duration-500 text-base font-medium cursor-crosshair"
                    >
                      {contact.value}
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="glass-card-premium rounded-3xl p-8 hover:scale-105 transition-all duration-500 shadow-xl cursor-crosshair">
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    className="glass-input-premium rounded-2xl h-12 text-base font-medium cursor-crosshair"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="glass-input-premium rounded-2xl h-12 text-base font-medium cursor-crosshair"
                  />
                </div>
              </div>
              <div>
                <Input
                  placeholder="Subject"
                  className="glass-input-premium rounded-2xl h-12 text-base font-medium cursor-crosshair"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  className="glass-input-premium rounded-2xl text-base font-medium resize-none cursor-crosshair"
                />
              </div>
              <Button className="w-full glass-button-primary rounded-2xl py-4 text-lg font-semibold transition-all duration-500 hover:scale-105 shadow-2xl cursor-crosshair">
                <Send className="mr-3 h-5 w-5" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}

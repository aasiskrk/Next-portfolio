"use client"

import { useState } from "react"
import { Mail, Github, Linkedin, Instagram, Send, MapPin, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeading, Reveal } from "@/components/reveal"
import { HorizontalScroller } from "@/components/horizontal-scroller"
import { ElasticMorphButton } from "@/components/elastic-morph-button"

const EMAIL = "aasis.krk1@gmail.com"

const contactLinks = [
  { name: "Gmail", icon: Mail, href: "mailto:aasis.krk1@gmail.com", value: "aasis.krk1@gmail.com" },
  { name: "GitHub", icon: Github, href: "https://github.com/aasiskrk", value: "github.com/aasiskrk" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/aashista-karki-69420g",
    value: "linkedin.com/in/aashista-karki-69420g",
  },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/aashista_krki", value: "@aashista_krki" },
]

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = form.subject || `Portfolio message from ${form.name || "someone"}`
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="relative">
      {/* Header section */}
      <div className="relative px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Say Hello" title="Get In Touch" subtitle="Let's build something together." />

          <Reveal className="mt-4 flex items-center justify-center gap-2 text-white/40">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Kathmandu, Nepal</span>
          </Reveal>
        </div>
      </div>

      {/* Horizontal scroll section for contact links and form */}
      <HorizontalScroller duration={4}>
        {/* Contact links — morphing buttons */}
        <div className="relative flex min-w-max flex-col gap-4">
          <h3 className="mb-2 text-lg font-semibold text-white/80">Connect</h3>
          {contactLinks.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass-card-premium group flex items-center gap-4 rounded-[1.25rem] p-5 transition-all duration-500 hover:bg-white/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors duration-500 group-hover:text-white">
                <c.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">{c.name}</span>
                <span className="block truncate text-sm text-white/45">{c.value}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-500 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>
          ))}
        </div>

        {/* Contact form section */}
        <div className="relative min-w-max flex-1">
          <h3 className="mb-4 text-lg font-semibold text-white/80">Message</h3>
          <form onSubmit={handleSubmit} className="glass-card-premium flex w-80 flex-col gap-4 rounded-[1.5rem] p-7">
            <div className="grid gap-3">
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="glass-input-premium h-11 rounded-xl text-sm"
              />
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Your email"
                className="glass-input-premium h-11 rounded-xl text-sm"
              />
            </div>
            <Input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="glass-input-premium h-11 rounded-xl text-sm"
            />
            <Textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Your message"
              rows={4}
              className="glass-input-premium resize-none rounded-xl text-sm"
            />
            <button
              type="submit"
              className="glass-button-primary group flex items-center justify-center gap-2.5 rounded-full py-3 text-sm font-semibold"
            >
              <Send className="h-4 w-4 transition-transform duration-500 ease-fluid group-hover:translate-x-0.5" />
              Send
            </button>
          </form>
        </div>
      </HorizontalScroller>
    </section>
  )
}

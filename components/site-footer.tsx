"use client"

import { Github, Linkedin, Mail, Instagram } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com/aasiskrk", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/aashista-karki-69420g", label: "LinkedIn" },
  { icon: Mail, href: "mailto:aasis.krk1@gmail.com", label: "Email" },
  { icon: Instagram, href: "https://instagram.com/aashista_krki/", label: "Instagram" },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/5 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold tracking-tight text-white">Aashista Karki</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
            Full Stack &amp; Mobile Developer
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="glass-social flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-transform duration-500 ease-fluid hover:-translate-y-0.5 hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center font-mono text-[11px] text-white/25 sm:text-left">
        © {new Date().getFullYear()} Aashista Karki. Built with Next.js.
      </p>
    </footer>
  )
}

"use client"

interface WindowWithLenis extends Window {
  __lenis?: { scrollTo: (target: string | number | HTMLElement, opts?: Record<string, unknown>) => void }
}

export function SiteFooter() {
  const backToTop = () => {
    const lenis = (window as WindowWithLenis).__lenis
    if (lenis) lenis.scrollTo(0, { duration: 1.4 })
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="px-5 pb-32 pt-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
        <p>© {new Date().getFullYear()} Aashista Karki</p>
        <button
          onClick={backToTop}
          data-cursor-label="Top"
          className="link-underline transition-colors duration-300 ease-fluid hover:text-white"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}

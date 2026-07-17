import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Fraunces, Yatra_One } from 'next/font/google'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-serif',
})
const yatraOne = Yatra_One({
  subsets: ['latin', 'devanagari'],
  weight: '400',
  variable: '--font-devanagari',
})

const siteUrl = 'https://www.aashistakarki.com.np'
const description =
  'Aashista Karki — Full Stack & Mobile App Developer from Nepal. Building cross-platform apps with Flutter and full-stack web applications with the MERN stack.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Aashista Karki | Full Stack & Mobile App Developer',
  description,
  keywords: [
    'Aashista Karki',
    'Full Stack Developer',
    'Mobile App Developer',
    'Flutter Developer',
    'MERN Stack',
    'Nepal',
    'Portfolio',
  ],
  authors: [{ name: 'Aashista Karki', url: siteUrl }],
  creator: 'Aashista Karki',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Aashista Karki | Full Stack & Mobile App Developer',
    description,
    siteName: 'Aashista Karki',
    images: [{ url: '/images/me1.jpg', width: 600, height: 600, alt: 'Aashista Karki' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aashista Karki | Full Stack & Mobile App Developer',
    description,
    images: ['/images/me1.jpg'],
  },
  icons: {
    icon: '/images/krki.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-background overflow-x-hidden ${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${yatraOne.variable}`}
    >
      <body className="font-sans antialiased overflow-x-hidden">
        <SmoothScroll />
        <CustomCursor />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}

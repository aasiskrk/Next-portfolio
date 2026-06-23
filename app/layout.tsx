import type { Metadata } from 'next'
import './globals.css'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

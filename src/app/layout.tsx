import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vantaflow.tech'),
  title: 'Vanta — AI Lead Conversion Systems',
  description:
    'Vanta helps B2B teams automate lead capture, qualification, follow-up, and appointment routing with AI-powered lead conversion systems.',
  keywords: [
    'AI lead conversion',
    'lead qualification automation',
    'B2B lead automation',
    'AI appointment automation',
    'lead flow audit',
    'AI automation agency',
    'B2B sales automation',
    'WhatsApp lead automation',
  ],
  openGraph: {
    title: 'Vanta — AI Lead Conversion Systems',
    description:
      'Automate your journey from first contact to qualified appointment with AI-powered lead conversion systems.',
    type: 'website',
    url: 'https://your-domain.com',
    siteName: 'Vanta',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vanta — AI Lead Conversion Systems',
    description:
      'AI-powered systems for faster response, cleaner qualification, and repeatable B2B pipeline growth.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}

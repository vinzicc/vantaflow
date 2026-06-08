import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const geistSans = localFont({
  src: './fonts/geist-latin.woff2',
  variable: '--font-geist-sans',
  display: 'swap',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/geist-mono-latin.woff2',
  variable: '--font-geist-mono',
  display: 'swap',
  weight: '100 900',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'AI Competitor Gap Snapshot for B2B SaaS | Vantaflow',
  description:
    'Find out whether AI tools are recommending your B2B SaaS product or your competitors. Get an AI visibility audit with competitor gaps, description accuracy, and a 30-day roadmap.',
  keywords: [
    'AI search visibility',
    'GEO audit',
    'generative engine optimization',
    'AI competitor gap analysis',
    'B2B SaaS AI visibility',
    'AI recommendation audit',
    'competitor gap snapshot',
    'AI search optimization',
    'B2B SaaS positioning',
    'AI description accuracy',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'AI Competitor Gap Snapshot for B2B SaaS | Vantaflow',
    description:
      'Find out whether AI tools are recommending your B2B SaaS product or your competitors. Get an AI visibility audit with competitor gaps, description accuracy, and a 30-day roadmap.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Vantaflow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Competitor Gap Snapshot for B2B SaaS | Vantaflow',
    description:
      'Find out whether AI tools are recommending your B2B SaaS product or your competitors. Get an AI visibility audit with competitor gaps, description accuracy, and a 30-day roadmap.',
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

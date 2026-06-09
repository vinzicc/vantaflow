import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { JsonLd } from '@/components/JsonLd'
import { VantaflowFooter } from '@/components/VantaflowFooter'
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

const organizationAndWebsiteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Vantaflow',
      url: `${SITE_URL}/`,
      description: 'AI search visibility and GEO audits for B2B SaaS companies.',
      founder: {
        '@type': 'Person',
        name: 'Kevin',
      },
      areaServed: 'Global',
      location: {
        '@type': 'Place',
        name: 'Surabaya, Indonesia',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Surabaya',
          addressCountry: 'ID',
        },
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Vantaflow',
      url: `${SITE_URL}/`,
      description: 'AI search visibility and GEO audits for B2B SaaS companies.',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Vantaflow — AI Search Visibility Audit for B2B SaaS',
    template: '%s | Vantaflow',
  },

  description:
    'Vantaflow audits how ChatGPT, Claude, Gemini, Perplexity, and Google AI describe, compare, and recommend your B2B SaaS product — then shows what to fix to improve AI visibility.',

  keywords: [
    'AI search visibility',
    'GEO audit',
    'AEO audit',
    'generative engine optimization',
    'answer engine optimization',
    'AI competitor gap analysis',
    'B2B SaaS AI visibility',
    'AI recommendation audit',
    'competitor gap snapshot',
    'AI search optimization',
    'B2B SaaS positioning',
    'AI description accuracy',
  ],

  authors: [{ name: 'Vantaflow' }],
  creator: 'Vantaflow',
  publisher: 'Vantaflow',

  alternates: {
    canonical: `${SITE_URL}/`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  verification: {
    google: 'ImAKNZ_n7ar45UcebKX96EZs7zcAGyxZP1dr263fs1s',
  },

  openGraph: {
    title: 'Vantaflow — AI Search Visibility Audit for B2B SaaS',
    description:
      'See whether AI tools recommend your SaaS or your competitors. Get a free AI Visibility Score and discover the gaps to fix first.',
    type: 'website',
    url: `${SITE_URL}/`,
    siteName: 'Vantaflow',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vantaflow AI Search Visibility Audit for B2B SaaS',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Vantaflow — AI Search Visibility Audit for B2B SaaS',
    description:
      'See whether AI tools recommend your SaaS or your competitors. Get a free AI Visibility Score and discover the gaps to fix first.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd data={organizationAndWebsiteSchema} />
        {children}
        <VantaflowFooter />
      </body>
    </html>
  )
}

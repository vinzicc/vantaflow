import type { Metadata } from 'next'
import Link from 'next/link'
import { VantaflowFooter } from '@/components/VantaflowFooter'
import { FREE_SCORE_FORM_URL, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sample AI Visibility Audit for B2B SaaS | Vantaflow',
  description:
    'Preview the format of a Vantaflow AI visibility audit, including prompt mapping, competitor gaps, model notes, description accuracy, and a 30-day roadmap.',
  alternates: {
    canonical: `${SITE_URL}/sample-audit`,
  },
  openGraph: {
    title: 'Sample AI Visibility Audit for B2B SaaS | Vantaflow',
    description:
      'See the format Vantaflow uses to assess how AI tools describe, compare, and recommend B2B SaaS products.',
    url: `${SITE_URL}/sample-audit`,
    type: 'website',
  },
}

const sampleSections = [
  {
    number: '01',
    title: 'Prompt Map',
    description:
      'A grouped set of high-intent buyer questions covering category discovery, alternatives, use cases, pain points, and direct competitor comparisons.',
    examples: [
      'Best [category] software for [buyer type]',
      '[Product] alternatives for [use case]',
      '[Product] vs [Competitor] for [team type]',
      'What tool should I use to solve [pain point]?',
    ],
  },
  {
    number: '02',
    title: 'Competitor Mention Gap',
    description:
      'A clear view of prompts where competitors appear more often, receive stronger recommendations, or own a clearer category association.',
    examples: [
      'Your product is absent from a high-intent shortlist prompt.',
      'A competitor is consistently associated with your strongest use case.',
      'AI answers lack enough evidence to compare your product confidently.',
    ],
  },
  {
    number: '03',
    title: 'Model-by-Model Visibility Notes',
    description:
      'Short observations showing how visibility and recommendations differ across ChatGPT, Claude, Gemini, and Perplexity.',
    examples: [
      'ChatGPT: category fit and shortlist position',
      'Claude: positioning clarity and comparison language',
      'Gemini: source-backed product understanding',
      'Perplexity: citations, mentions, and competitor overlap',
    ],
  },
  {
    number: '04',
    title: 'Description Accuracy Notes',
    description:
      'A review of whether AI tools explain the product accurately, miss important differentiators, or place it in the wrong category.',
    examples: [
      'Category classification',
      'Core use-case accuracy',
      'Ideal customer profile accuracy',
      'Missing or distorted differentiators',
    ],
  },
  {
    number: '05',
    title: '30-Day Roadmap',
    description:
      'A prioritized sequence of website, positioning, comparison, and content fixes based on the most important visibility gaps.',
    examples: [
      'Week 1: clarify category and use-case messaging',
      'Week 2: publish the highest-priority comparison page',
      'Week 3: strengthen proof, FAQs, and entity consistency',
      'Week 4: retest priority prompts and document changes',
    ],
  },
] as const

export default function SampleAuditPage() {
  return (
    <div className="min-h-screen bg-vanta-bg text-vanta-text">
      <header className="border-b border-vanta-border bg-white/90">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-semibold tracking-[-0.03em]">
            Vantaflow
          </Link>
          <a
            href={FREE_SCORE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-vanta-orange px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-vanta-orangeHover sm:text-sm"
          >
            Get My Free AI Visibility Score
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-vanta-border bg-white">
          <div className="vanta-dot-grid pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(ellipse_at_center,black_8%,transparent_76%)]" />
          <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <Link href="/" className="mb-8 inline-flex text-sm text-vanta-muted transition-colors hover:text-vanta-text">
              Back to homepage
            </Link>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-vanta-orange">
              In-page sample preview
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              Sample AI Visibility Audit for B2B SaaS
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-vanta-muted sm:text-lg">
              This page shows the structure and level of detail used in a Vantaflow audit. It is an illustrative format preview, not client data or a completed audit.
            </p>
            <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50/70 p-4 text-sm leading-relaxed text-vanta-text">
              No PDF is available yet. The sample is presented directly on this page so you can review the format without a gated or fake download.
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="space-y-5">
            {sampleSections.map((section) => (
              <article
                key={section.title}
                className="grid gap-6 rounded-2xl border border-vanta-border bg-white p-5 shadow-[0_10px_34px_rgba(23,23,23,0.035)] sm:p-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12"
              >
                <div>
                  <span className="font-mono text-xs text-vanta-orange">{section.number}</span>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{section.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-vanta-muted">{section.description}</p>
                </div>
                <div className="rounded-xl border border-vanta-border bg-vanta-bg/70 p-4 sm:p-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-vanta-muted">
                    Example format
                  </p>
                  <ul className="space-y-3">
                    {section.examples.map((example) => (
                      <li key={example} className="flex gap-3 text-sm leading-relaxed text-vanta-text">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vanta-orange" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-vanta-border bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Start with the free AI Visibility Score
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-vanta-muted sm:text-base">
              Submit your SaaS website and one competitor. You will receive a short visibility summary within 48 hours, with no credit card and no call required.
            </p>
            <a
              href={FREE_SCORE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-vanta-orange px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-vanta-orangeHover"
            >
              Get My Free AI Visibility Score
            </a>
          </div>
        </section>
      </main>

      <VantaflowFooter />
    </div>
  )
}

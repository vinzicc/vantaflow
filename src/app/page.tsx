'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  X,
  AlertTriangle,
  Eye,
  GitCompareArrows,
  FileText,
  FolderSearch,
  Route,
  Search,
} from 'lucide-react'
import { VantaflowFooter } from '@/components/VantaflowFooter'
import { TALLY_FORM_URL } from '@/lib/site'

/* ─── Animation ─── */
const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
}

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
}

/* ─── Data ─── */
const problemCards = [
  {
    icon: Search,
    title: 'AI answers shape early vendor shortlists',
    description:
      'Shortlist prompts influence which products buyers investigate first.',
  },
  {
    icon: FileText,
    title: 'Clearer competitor content is easier to recommend',
    description:
      'Clear category and use-case content gives AI stronger recommendation signals.',
  },
  {
    icon: GitCompareArrows,
    title: 'Missing comparison and use-case pages create visibility gaps',
    description:
      'Unanswered high-intent questions can make competitors the safer answer.',
  },
]

const auditCards = [
  {
    icon: Eye,
    title: 'AI Visibility',
    description: 'Do AI tools mention your product for high-intent buyer prompts?',
  },
  {
    icon: GitCompareArrows,
    title: 'Competitor Gap',
    description: 'Which competitors appear more often, and for which use cases?',
  },
  {
    icon: FileText,
    title: 'Description Accuracy',
    description: 'Is AI explaining your product correctly or misclassifying it?',
  },
  {
    icon: FolderSearch,
    title: 'Content Gaps',
    description: 'Which pages, FAQs, comparisons, and use cases are missing?',
  },
  {
    icon: Route,
    title: '30-Day Roadmap',
    description: 'What should you fix first to become easier to find and recommend?',
  },
]

const examplePrompts = [
  'best AI sales tools for B2B startups',
  'HubSpot alternatives for small teams',
  'best software to automate outbound sales',
  'best CRM for agencies',
  'best AI email outreach tools',
  'what tool should I use to automate lead follow-up?',
]

const deliverableCards = [
  {
    icon: Search,
    code: '01',
    type: 'Buyer-intent inventory',
    title: 'Prompt Map',
    description:
      'Buyer-intent prompts grouped by category, use-case, alternative, and comparison intent.',
  },
  {
    icon: GitCompareArrows,
    code: '02',
    type: 'Visibility benchmark',
    title: 'Competitor Mention Gap',
    description:
      'Which competitors appear more often and where your product is missing.',
  },
  {
    icon: FileText,
    code: '03',
    type: 'Positioning review',
    title: 'Description Accuracy Notes',
    description:
      'Whether AI tools explain your product correctly or misclassify it.',
  },
  {
    icon: Route,
    code: '04',
    type: 'Prioritized action plan',
    title: '30-Day Roadmap',
    description:
      'The content and positioning fixes to prioritize first.',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Submit your product and competitors',
    description: 'Tell us your product, target category, and 2–5 competitors you want to benchmark against.',
  },
  {
    step: '02',
    title: 'We test AI buyer prompts',
    description: 'We run 20–30 high-intent buyer prompts across ChatGPT, Gemini, Perplexity, and Claude.',
  },
  {
    step: '03',
    title: 'We compare your visibility',
    description: "We measure how often your product appears vs. competitors and how accurately it's described.",
  },
  {
    step: '04',
    title: 'You receive a prioritized report',
    description: 'A clear snapshot with gaps, scores, and a 30-day roadmap of what to fix first.',
  },
]

const audienceTags = [
  'AI SaaS',
  'Sales SaaS',
  'Marketing SaaS',
  'CRM tools',
  'Customer support SaaS',
  'Devtools',
  'Analytics tools',
]

/* ─── Components ─── */

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-vanta-muted">
      {children}
    </p>
  )
}

function CTAButton({
  className = '',
  showArrow = false,
  variant = 'primary',
  children = 'Request snapshot',
  href,
}: {
  className?: string
  showArrow?: boolean
  variant?: 'primary' | 'secondary'
  children?: string
  href?: string
}) {
  const base =
    variant === 'primary'
      ? 'bg-vanta-orange text-white hover:bg-vanta-orangeHover focus-visible:outline-vanta-orange'
      : 'border border-vanta-border text-vanta-text hover:border-vanta-muted hover:text-vanta-text'

  return (
    <a
      href={href ?? TALLY_FORM_URL}
      target={href ? undefined : '_blank'}
      rel={href ? undefined : 'noopener noreferrer'}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-6 sm:py-3.5 ${base} ${className}`}
    >
      {children}
      {showArrow && <ArrowRight size={16} strokeWidth={2} aria-hidden />}
    </a>
  )
}

/* ─── Hero report card ─── */
function HeroReportCard() {
  const metrics = [
    { label: 'AI visibility score', value: '34', unit: '/100', color: 'text-vanta-orange' },
    { label: 'Client mention rate', value: '4', unit: '/30 prompts', color: 'text-vanta-orange' },
    { label: 'Top competitor', value: '18', unit: '/30 prompts', color: 'text-emerald-600' },
    { label: 'Description accuracy', value: 'Partial', unit: '', color: 'text-amber-600' },
  ]

  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate="animate"
      className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end"
    >
      <div className="absolute -top-3 right-4 z-10 rounded-full border border-orange-200 bg-white px-3 py-1 text-[10px] font-semibold tracking-wide text-vanta-orange shadow-sm sm:right-6">
        Example snapshot
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_20px_55px_rgba(23,23,23,0.09)] ring-1 ring-black/[0.015]">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-vanta-border bg-neutral-50/90 px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FF6B63]" />
            <span className="h-2 w-2 rounded-full bg-[#F6B73C]" />
            <span className="h-2 w-2 rounded-full bg-[#36B95D]" />
            <span className="ml-1 truncate text-xs font-medium text-vanta-muted">
              AI Competitor Gap Snapshot
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-vanta-border bg-neutral-50/65 p-3.5 sm:p-4">
                <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-vanta-muted">
                  {m.label}
                </p>
                <p className="flex items-baseline gap-0.5">
                  <span className={`text-xl font-semibold tabular-nums sm:text-2xl ${m.color}`}>
                    {m.value}
                  </span>
                  {m.unit && <span className="text-xs text-vanta-muted">{m.unit}</span>}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-orange-200/90 bg-orange-50/65 p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle size={15} className="mt-0.5 shrink-0 text-vanta-orange" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-vanta-orange">
                  Main gap
                </p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-vanta-text">
                  Missing comparison and use-case pages
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Submitted overlay ─── */
function SubmittedOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
      className="fixed inset-0 z-80 flex items-center justify-center px-4 py-6 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submitted-card-title"
    >
      <button
        type="button"
        aria-label="Close success message"
        onClick={onClose}
        className="absolute inset-0 bg-vanta-text/30 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } }}
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-vanta-border bg-vanta-surface shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:rounded-3xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.06)_0%,transparent_58%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-vanta-orange/30 to-transparent" />

        <div className="relative p-5 sm:p-7 md:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-vanta-orange">
              <CheckCircle2 size={24} strokeWidth={2} aria-hidden />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close success message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-vanta-muted transition-colors hover:bg-vanta-bg hover:text-vanta-text"
            >
              <X size={18} strokeWidth={2} aria-hidden />
            </button>
          </div>

          <p className="mb-2 text-xs font-medium tracking-wide text-vanta-muted">
            Snapshot request submitted
          </p>

          <h2 id="submitted-card-title" className="text-2xl font-semibold tracking-tight text-vanta-text sm:text-3xl">
            Request received.
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-vanta-muted sm:text-base">
            Thanks for requesting an AI Competitor Gap Snapshot. We&apos;ll test how AI tools describe and recommend your product, compare your visibility against competitors, and send you a prioritized report.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {['Test AI prompts', 'Compare visibility', 'Send snapshot report'].map((item, i) => (
              <div key={item} className="rounded-xl border border-vanta-border bg-vanta-bg p-3">
                <span className="mb-2 block font-mono text-xs text-vanta-orange">0{i + 1}</span>
                <p className="text-sm font-medium text-vanta-text">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-vanta-border bg-vanta-bg p-4">
            <p className="text-sm leading-relaxed text-vanta-muted">
              No sales call required. We&apos;ll keep the process async and send practical findings based on what you submitted.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-vanta-orange px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-vanta-orangeHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vanta-orange"
            >
              Back to homepage
            </button>
            <a
              href="#snapshot"
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-vanta-border bg-vanta-surface px-5 py-3 text-sm font-semibold text-vanta-text transition-colors hover:bg-vanta-bg"
            >
              See sample
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function SubmittedOverlayController() {
  const searchParams = useSearchParams()
  const [dismissed, setDismissed] = useState(false)
  const isSubmitted = searchParams.get('submitted') === 'true'

  function dismiss() {
    setDismissed(true)
    const url = new URL(window.location.href)
    url.searchParams.delete('submitted')
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  }

  if (!isSubmitted || dismissed) {
    return null
  }

  return <SubmittedOverlay onClose={dismiss} />
}

/* ═══════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-vanta-bg text-vanta-text">
      <Suspense fallback={null}>
        <SubmittedOverlayController />
      </Suspense>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[radial-gradient(circle_at_12%_8%,rgba(249,115,22,0.07),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(245,158,11,0.05),transparent_24%)]"
      />

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/78 shadow-[0_1px_0_rgba(23,23,23,0.02)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/72">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
          <Link href="/" className="shrink-0 justify-self-start text-lg font-semibold tracking-[-0.03em] text-vanta-text">
            Vantaflow
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {[
              ['What we audit', '#what-we-audit'],
              ['Snapshot', '#snapshot'],
              ['How it works', '#how-it-works'],
              ['Contact', '#contact'],
            ].map(([label, id]) => (
              <a key={id} href={id} className="text-[13px] font-medium text-vanta-muted transition-colors hover:text-vanta-text">
                {label}
              </a>
            ))}
          </div>

          <CTAButton className="shrink-0 justify-self-end !min-h-9 !rounded-lg !px-3.5 !py-2 !text-xs sm:!px-4 sm:!text-[13px]">
            Request snapshot
          </CTAButton>
        </div>
      </nav>

      <main>
        {/* ── 1 · HERO ── */}
        <section className="relative overflow-hidden border-b border-vanta-border bg-[#fcfcfb]">
          <div className="vanta-dot-grid pointer-events-none absolute inset-0 opacity-55 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_76%)]" />
          <div className="pointer-events-none absolute -left-40 top-4 h-[34rem] w-[34rem] rounded-full bg-orange-100/55 blur-3xl" />
          <div className="pointer-events-none absolute right-[2%] top-12 h-[30rem] w-[30rem] rounded-full bg-neutral-200/45 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(252,252,251,0.08),rgba(252,252,251,0.18)_45%,rgba(252,252,251,0.36))]" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:gap-16">
              <motion.div variants={stagger} initial="initial" animate="animate" className="min-w-0 lg:max-w-[600px]">
                <motion.div variants={fadeUp}>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-vanta-border bg-vanta-surface px-3 py-1 text-xs font-medium text-vanta-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-vanta-orange" />
                    AI Search / GEO for B2B SaaS
                  </div>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="mb-5 text-4xl font-semibold leading-[1.06] tracking-[-0.04em] sm:text-5xl lg:text-[3.75rem]"
                >
                  Is AI recommending your competitors?
                </motion.h1>

                <motion.p variants={fadeUp} className="mb-8 max-w-[36rem] text-base leading-relaxed text-vanta-muted md:text-lg">
                  We audit how AI tools describe, compare, and recommend your B2B SaaS product — then show what to fix.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                  <CTAButton showArrow>Request snapshot</CTAButton>
                  <CTAButton variant="secondary" href="#snapshot">See sample</CTAButton>
                </motion.div>
              </motion.div>

              <HeroReportCard />
            </div>
          </div>
        </section>

        {/* ── 2 · PROBLEM ── */}
        <section className="relative border-b border-vanta-border/70 bg-vanta-surfaceAlt/55">
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-orange-200 to-transparent" />
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-40px' }}
              className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
            >
              <div>
                <SectionLabel>The shift</SectionLabel>
                <h2 className="max-w-xl text-2xl font-semibold leading-snug tracking-[-0.03em] sm:text-3xl md:text-4xl">
                The AI buyer shortlist is becoming the new battleground.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-vanta-muted sm:text-base lg:pt-7">
                B2B buyers are not only comparing websites anymore. They ask AI tools for shortlists, alternatives, and recommendations. If AI understands your competitor more clearly, they enter the buyer conversation before you do.
              </p>
            </motion.div>

            <motion.div
              className="mt-12 grid border-y border-vanta-border md:grid-cols-3"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-40px' }}
            >
              {problemCards.map((c, index) => (
                <motion.article
                  key={c.title}
                  variants={fadeUp}
                  className={`py-7 md:px-7 md:py-8 ${index > 0 ? 'border-t border-vanta-border md:border-l md:border-t-0' : ''}`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-vanta-orange">
                      <c.icon size={17} strokeWidth={1.7} aria-hidden />
                    </span>
                    <span className="font-mono text-[10px] text-vanta-muted">0{index + 1}</span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold leading-snug">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-vanta-muted">{c.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 3 · EXAMPLE PROMPTS ── */}
        <section className="relative overflow-hidden border-b border-vanta-border bg-vanta-surfaceAlt/45">
          <div className="pointer-events-none absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-orange-100/35 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 lg:px-8 lg:py-28">
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-40px' }}>
              <SectionLabel>Buyer intent</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl md:text-4xl">
                Example buyer prompts we test
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-vanta-muted sm:text-base">
                We test the questions your buyers might ask before they ever visit your website.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-40px' }}
              className="overflow-hidden rounded-2xl border border-vanta-border bg-white shadow-[0_16px_50px_rgba(23,23,23,0.05)]"
            >
              <div className="flex items-center gap-2 border-b border-vanta-border bg-neutral-50/70 px-5 py-3.5">
                <span className="h-2 w-2 rounded-full bg-vanta-orange" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-vanta-muted">Buyer query set</span>
              </div>
              <div>
                {examplePrompts.map((prompt, index) => (
                  <motion.div
                    key={prompt}
                    variants={fadeUp}
                    className={`grid grid-cols-[2rem_1fr_auto] items-center gap-3 px-5 py-4 ${index > 0 ? 'border-t border-vanta-border' : ''}`}
                  >
                    <Search size={15} strokeWidth={1.8} className="text-vanta-orange" aria-hidden />
                    <p className="text-sm font-medium leading-snug text-vanta-text">{prompt}</p>
                    <span className="hidden font-mono text-[10px] text-vanta-muted sm:block">0{index + 1}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 4 · WHAT WE AUDIT ── */}
        <section id="what-we-audit" className="relative overflow-hidden border-b border-vanta-border bg-white">
          <div className="vanta-line-grid pointer-events-none absolute inset-0 opacity-25" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-8 lg:py-28">
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-40px' }}>
              <SectionLabel>The audit</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl md:text-4xl">
                What the snapshot checks
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-vanta-muted sm:text-base">
                A focused audit of how AI tools see your product versus your competitors.
              </p>
            </motion.div>

            <motion.div
              className="border-y border-vanta-border bg-white/70"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-40px' }}
            >
              {auditCards.map((c, index) => (
                <motion.article
                  key={c.title}
                  variants={fadeUp}
                  className={`grid gap-4 py-5 sm:grid-cols-[2.5rem_0.8fr_1.2fr] sm:items-center sm:gap-5 ${index > 0 ? 'border-t border-vanta-border' : ''}`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-vanta-border bg-vanta-bg text-vanta-text">
                    <c.icon size={16} strokeWidth={1.7} aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-vanta-muted">{c.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 5 · SNAPSHOT OFFER ── */}
        <section id="snapshot" className="relative overflow-hidden border-b border-vanta-border bg-vanta-bg">
          <div className="vanta-line-grid pointer-events-none absolute inset-0 opacity-45" />
          <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-40px' }} className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
              <div className="max-w-2xl">
                <SectionLabel>What you receive</SectionLabel>
                <h2 className="mb-4 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl md:text-4xl">
                  AI Competitor Gap Snapshot
                </h2>
                <p className="text-sm leading-relaxed text-vanta-muted sm:text-base">
                  A practical report showing where your product appears, where competitors win, and which content gaps to fix first.
                </p>
              </div>
              <CTAButton showArrow>Request snapshot</CTAButton>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-40px' }}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {deliverableCards.map((item) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  className="group rounded-2xl border border-vanta-border bg-white p-5 shadow-[0_10px_34px_rgba(23,23,23,0.04)] transition-colors hover:border-orange-200 sm:p-7"
                >
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-vanta-orange">
                      <item.icon size={16} strokeWidth={1.8} aria-hidden />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-vanta-muted">
                      Artifact {item.code}
                    </span>
                  </div>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-vanta-muted">{item.type}</p>
                  <h3 className="mb-2 text-lg font-semibold tracking-[-0.02em] text-vanta-text">{item.title}</h3>
                  <p className="max-w-md text-sm leading-relaxed text-vanta-muted">{item.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 6 · HOW IT WORKS ── */}
        <section id="how-it-works" className="relative overflow-hidden border-b border-vanta-border bg-white">
          <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[52rem] max-w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.055),transparent_68%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-40px' }} className="mb-10 max-w-2xl">
              <SectionLabel>Process</SectionLabel>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl md:text-4xl">
                How it works
              </h2>
            </motion.div>

            <motion.div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-40px' }}>
              {processSteps.map((s) => (
                <motion.div key={s.step} variants={fadeUp} className="border-t border-vanta-border pt-5">
                  <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-orange-50 font-mono text-xs text-vanta-orange">{s.step}</span>
                  <h3 className="mb-2 text-base font-semibold lg:text-lg">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-vanta-muted">{s.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 7 · WHO IT'S FOR ── */}
        <section className="relative border-b border-vanta-border bg-vanta-surfaceAlt/45">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[720px] max-w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.06),transparent_68%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-40px' }} className="mb-8 max-w-2xl">
            <SectionLabel>Who it is for</SectionLabel>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl md:text-4xl">
              Built for B2B SaaS teams competing in crowded categories
            </h2>
          </motion.div>

          <motion.div className="flex flex-wrap gap-3" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-40px' }}>
            {audienceTags.map((tag) => (
              <motion.span
                key={tag}
                variants={fadeUp}
                className="rounded-xl border border-vanta-border bg-vanta-surface px-4 py-2.5 text-sm font-medium text-vanta-text shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-orange-200"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
          </div>
        </section>

        {/* ── 8 · FINAL CTA ── */}
        <section id="contact" className="relative overflow-hidden border-b border-vanta-border bg-vanta-bg px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_bottom,rgba(249,115,22,0.09),transparent_66%)]" />
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-orange-200/80 bg-white px-5 py-12 text-center text-vanta-text shadow-[0_24px_80px_rgba(23,23,23,0.085)] sm:px-10 sm:py-16 md:px-16 md:py-20"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.11)_0%,transparent_62%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(23,23,23,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(23,23,23,0.04)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_bottom,black,transparent_76%)]" />

            <div className="relative">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                Find out where AI is sending your buyers.
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-vanta-muted sm:text-base">
                Get a competitor gap snapshot and see whether your product is being found, described, and recommended correctly.
              </p>
              <CTAButton showArrow className="mb-4">Request snapshot</CTAButton>
            </div>
          </motion.div>
        </section>
      </main>

      <VantaflowFooter />
    </div>
  )
}

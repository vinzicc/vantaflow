'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Calendar,
  Clock,
  Database,
  GitBranch,
  Inbox,
  Search,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const TALLY_FORM_URL =
  process.env.NEXT_PUBLIC_TALLY_FORM_URL ??
  'https://tally.so/r/PASTE_YOUR_FORM_ID_HERE'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardHover =
  'group rounded-2xl border border-vanta-border bg-vanta-surface transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]'

const painPoints: {
  icon: LucideIcon
  title: string
  description: string
}[] = [
  {
    icon: Clock,
    title: 'Slow Response Times',
    description:
      'When replies take hours instead of seconds, qualified leads lose intent and move to another provider.',
  },
  {
    icon: Inbox,
    title: 'Admin Overload',
    description:
      'Your team wastes time filtering inquiries, answering repeated questions, and manually chasing prospects.',
  },
  {
    icon: GitBranch,
    title: 'Leaky Pipeline',
    description:
      'Website traffic, WhatsApp messages, and outreach replies get scattered without a clear conversion flow.',
  },
]

const metrics: { value: string; label: string; accent?: boolean }[] = [
  { value: '0.8s', label: 'AI Response Time', accent: true },
  { value: '-40%', label: 'Manual Admin Work', accent: true },
  { value: '24/7', label: 'Lead Qualification' },
  { value: '1 Flow', label: 'Capture to Appointment' },
]

const processSteps = [
  {
    step: '01',
    title: 'Audit the Lead Flow',
    description:
      'We review your current website, forms, WhatsApp flow, response time, and follow-up process.',
  },
  {
    step: '02',
    title: 'Build the Automation Layer',
    description:
      'We design the AI assistant, qualification logic, appointment routing, and outreach intelligence workflow.',
  },
  {
    step: '03',
    title: 'Launch, Measure, Improve',
    description:
      'The system goes live, tracks lead behavior, and improves the conversion path with cleaner data.',
  },
]

const agentOutput = [
  { key: 'status', value: 'Lead Qualified', highlight: true },
  { key: 'intent', value: 'High', highlight: true },
  { key: 'source', value: 'Website Form', highlight: false },
  { key: 'action', value: 'Route to Calendar', highlight: true },
  { key: 'responseTime', value: '0.8s', highlight: false },
  { key: 'nextStep', value: 'Send WhatsApp Follow-up', highlight: false },
] as const

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-vanta-muted">
      {children}
    </p>
  )
}

function AuditButton({
  className = '',
  showArrow = false,
  children = 'Request Free Lead Flow Audit',
}: {
  className?: string
  showArrow?: boolean
  children?: string
}) {
  return (
    <a
      href={TALLY_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-vanta-orange px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-vanta-orangeHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vanta-orange sm:px-6 sm:py-3.5 ${className}`}
    >
      {children}
      {showArrow && <ArrowRight size={16} strokeWidth={2} aria-hidden />}
    </a>
  )
}

function HeroMockup() {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate="animate"
      className="relative mx-auto w-full max-w-full sm:max-w-lg lg:mx-0 lg:max-w-none"
    >
      <div className="absolute right-0 top-4 z-10 rounded-full border border-vanta-border bg-vanta-surface px-3 py-1.5 text-xs font-medium text-vanta-text shadow-sm sm:-right-4 sm:top-8">
        <span className="text-vanta-orange" aria-hidden>
          ●
        </span>{' '}
        Qualified in 0.8s
      </div>

      <div className="overflow-hidden rounded-xl border border-vanta-border bg-vanta-surface shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2 border-b border-vanta-border bg-[#F5F5F5] px-4 py-3">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#28C840]" />
          <span className="ml-2 truncate text-xs font-medium text-vanta-muted">
            AI Agent Output
          </span>
        </div>

        <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-[13px]">
          <span className="text-vanta-muted">{'{'}</span>
          <div className="ml-3 space-y-1.5 py-2 sm:ml-4">
            {agentOutput.map((line) => (
              <div key={line.key} className="whitespace-nowrap sm:whitespace-normal">
                <span className="text-vanta-muted">&quot;{line.key}&quot;</span>
                <span className="text-vanta-muted">: </span>
                <span
                  className={
                    line.highlight
                      ? 'text-vanta-orange'
                      : 'text-emerald-700'
                  }
                >
                  &quot;{line.value}&quot;
                </span>
                <span className="text-vanta-muted">,</span>
              </div>
            ))}
          </div>
          <span className="text-vanta-muted">{'}'}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-vanta-bg text-vanta-text">
      <nav className="sticky top-0 z-50 border-b border-vanta-border/60 bg-vanta-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
          <span className="shrink-0 text-lg font-semibold tracking-tight">
            Vanta.
          </span>
          <a
            href={TALLY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg bg-vanta-orange px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-vanta-orangeHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vanta-orange sm:px-4 sm:text-sm"
          >
            Request Audit
          </a>
        </div>
      </nav>

      <main>
        <section
          className="relative border-b border-vanta-border"
          style={{
            backgroundImage:
              'radial-gradient(circle, #d4d4d4 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-vanta-bg/40 via-transparent to-vanta-bg" />

          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="relative min-w-0"
              >
                <div className="pointer-events-none absolute -left-12 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.05)_0%,transparent_70%)] blur-2xl sm:block lg:-left-20 lg:h-64 lg:w-64" />

                <motion.div variants={fadeUp}>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-vanta-border bg-vanta-surface px-3 py-1 text-xs font-medium text-vanta-muted sm:mb-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-vanta-orange" />
                    Systemizing Lead Conversion
                  </div>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="mb-4 text-3xl font-semibold leading-[1.12] tracking-tight sm:mb-5 sm:text-4xl md:text-5xl lg:text-[3.25rem]"
                >
                  AI-Powered Lead Conversion Systems.
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mb-6 max-w-xl text-base leading-relaxed text-vanta-muted sm:mb-8 md:text-lg"
                >
                  We turn slow response, manual follow-up, and scattered
                  prospecting into one automated lead flow — from first contact
                  to qualified appointment.
                </motion.p>

                <motion.div variants={fadeUp} className="mb-4">
                  <AuditButton showArrow />
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  className="max-w-lg text-sm leading-relaxed text-vanta-muted"
                >
                  Built for B2B teams, agencies, and service businesses that
                  cannot afford to let qualified leads go cold.
                </motion.p>
              </motion.div>

              <HeroMockup />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-40px' }}
            className="mb-8 max-w-2xl sm:mb-10"
          >
            <SectionLabel>The Hidden Revenue Leak</SectionLabel>
            <h2 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl md:text-4xl">
              Most businesses do not lose leads because of traffic. They lose
              them after the first click.
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-40px' }}
          >
            {painPoints.map((item) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className={`${cardHover} p-6`}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-vanta-border bg-vanta-bg transition-colors group-hover:border-orange-200">
                  <item.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-vanta-muted">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="border-y border-vanta-border bg-vanta-surface/50">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-40px' }}
              className="mb-8 max-w-2xl sm:mb-10"
            >
              <SectionLabel>Core System</SectionLabel>
              <h2 className="mb-3 text-2xl font-semibold tracking-tight sm:mb-4 sm:text-3xl md:text-4xl">
                Three modules. One repeatable lead flow.
              </h2>
              <p className="text-sm leading-relaxed text-vanta-muted sm:text-base">
                Vanta connects lead capture, qualification, outreach intelligence,
                and appointment routing into a cleaner conversion system.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-40px' }}
            >
              <motion.article
                variants={fadeUp}
                className={`${cardHover} flex flex-col p-6 lg:col-span-2 lg:p-8`}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-vanta-border bg-vanta-bg">
                  <Bot size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  AI Lead Assistant
                </h3>
                <p className="mb-5 max-w-xl text-sm leading-relaxed text-vanta-muted sm:mb-6 sm:text-base">
                  Instantly respond 24/7, qualify prospects, answer repeated
                  questions, and route high-intent leads to the right next step.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Intent: High', 'Response: 0.8s', 'Route: Calendar'].map(
                    (label) => (
                      <span
                        key={label}
                        className="rounded-full border border-vanta-border bg-vanta-bg px-3 py-1 text-xs font-medium text-vanta-text"
                      >
                        {label.includes('Intent') && (
                          <span className="text-vanta-orange">● </span>
                        )}
                        {label}
                      </span>
                    ),
                  )}
                </div>
                <div className="mt-4 rounded-lg border border-vanta-border bg-vanta-bg p-4">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-medium text-vanta-muted">
                      Lead status
                    </span>
                    <span className="rounded-full bg-orange-50 px-2 py-0.5 font-medium text-vanta-orange">
                      Qualified
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-vanta-border">
                    <div className="h-full w-[88%] rounded-full bg-vanta-orange/80" />
                  </div>
                  <p className="mt-2 text-xs text-vanta-muted">
                    Intent score · 88/100
                  </p>
                </div>
              </motion.article>

              <motion.article variants={fadeUp} className={`${cardHover} p-6`}>
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-vanta-border bg-vanta-bg">
                  <Calendar size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold tracking-tight">
                  Appointment Automation
                </h3>
                <p className="text-sm leading-relaxed text-vanta-muted">
                  Connect WhatsApp, forms, and calendar links so interested
                  prospects can move from inquiry to booked appointment without
                  manual back-and-forth.
                </p>
              </motion.article>

              <motion.article variants={fadeUp} className={`${cardHover} p-6`}>
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-vanta-border bg-vanta-bg">
                  <Database size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold tracking-tight">
                  Outreach Data Engine
                </h3>
                <p className="text-sm leading-relaxed text-vanta-muted">
                  Extract niche-specific B2B prospects, detect conversion gaps,
                  and generate outreach angles your team can use immediately.
                </p>
              </motion.article>

              <motion.article
                variants={fadeUp}
                className={`${cardHover} p-6 md:col-span-2 lg:col-span-1`}
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-vanta-border bg-vanta-bg">
                  <Search size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold tracking-tight">
                  Lead Flow Audit
                </h3>
                <p className="text-sm leading-relaxed text-vanta-muted">
                  We map where leads slow down, where follow-up breaks, and
                  where automation can recover lost opportunities.
                </p>
              </motion.article>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-vanta-border py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-2 gap-6 text-center sm:gap-8 md:grid-cols-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-40px' }}
            >
              {metrics.map((metric) => (
                <motion.div key={metric.label} variants={fadeUp}>
                  <div
                    className={`text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl ${
                      metric.accent ? 'text-vanta-orange' : 'text-vanta-text'
                    }`}
                  >
                    {metric.value}
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-vanta-muted">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-40px' }}
            className="mb-8 max-w-2xl sm:mb-10"
          >
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              From messy lead flow to automated conversion system.
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-40px' }}
          >
            {processSteps.map((item) => (
              <motion.div key={item.step} variants={fadeUp}>
                <span className="mb-3 block font-mono text-sm text-vanta-orange sm:mb-4">
                  {item.step}
                </span>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-vanta-muted">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-vanta-text px-5 py-10 text-center text-white sm:px-10 sm:py-14 md:px-16 md:py-16"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.12)_0%,transparent_55%)]" />

            <div className="relative">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                Stop leaking leads.
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-neutral-400 sm:mb-8 sm:text-base">
                Get a free lead flow audit and see where automation can recover
                missed opportunities in your pipeline.
              </p>
              <AuditButton className="mb-5 sm:mb-6" />
              <p className="mx-auto max-w-md text-xs leading-relaxed text-neutral-500 sm:text-sm">
                No generic AI pitch. Just a practical review of your lead
                capture, response, and follow-up system.
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-vanta-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 md:flex-row md:items-end md:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold tracking-tight">Vanta.</p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-vanta-muted">
              Built for faster response, cleaner qualification, and repeatable
              pipeline growth.
            </p>
          </div>
          <p className="text-sm font-medium text-vanta-muted md:text-right">
            AI Lead Conversion Systems
          </p>
        </div>
      </footer>
    </div>
  )
}

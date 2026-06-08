import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service | Vantaflow',
  description: 'Terms of service for Vantaflow — AI Search Visibility & Competitor Gap Audits for B2B SaaS.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-vanta-bg px-4 py-16 text-vanta-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-vanta-muted transition-colors hover:text-vanta-text"
        >
          ← Back to homepage
        </Link>

        <h1 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Terms of Service
        </h1>

        <p className="mb-4 text-sm text-vanta-muted">Last updated: June 6, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-vanta-muted">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">1. Service Description</h2>
            <p>
              Vantaflow provides AI Search Visibility and Competitor Gap Audit services for B2B SaaS companies. Our primary deliverable is the AI Competitor Gap Snapshot — a report that tests how AI tools describe, compare, and recommend your product against competitors.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">2. Deliverables</h2>
            <p>
              Upon submitting a snapshot request and any applicable payment, we will deliver a written report containing AI visibility scores, competitor comparisons, content gap analysis, and a prioritized action roadmap. Delivery timelines are estimates and may vary based on scope.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">3. No Guaranteed Results</h2>
            <p>
              AI tool outputs can change frequently. Our snapshot reflects results at the time of testing and is directional guidance only. We do not guarantee AI mentions, search rankings, traffic, leads, revenue, or any other specific result.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">4. Client Responsibility</h2>
            <p>
              You are responsible for providing accurate product and competitor information, confirming that you have the right to share submitted materials, and deciding how to apply the recommendations in your report.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">5. Payments and Refunds</h2>
            <p>
              Pricing, payment timing, delivery scope, and any refund eligibility will be stated in the proposal, invoice, or order confirmation provided before paid work begins. Those written terms will control if they differ from this page.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">6. Intellectual Property</h2>
            <p>
              The snapshot report delivered to you is for your internal use. Our methodology, frameworks, and proprietary testing processes remain the intellectual property of Vantaflow.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">7. Limitation of Liability</h2>
            <p>
              Vantaflow&apos;s liability is limited to the amount paid for the specific service. We are not liable for indirect, incidental, or consequential damages arising from use of our reports or recommendations.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">8. Contact</h2>
            <p>
              For questions about these terms, please reach out through our contact form or email us directly.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

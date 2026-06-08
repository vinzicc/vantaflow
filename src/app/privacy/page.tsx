import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy | Vantaflow',
  description: 'Privacy policy for Vantaflow — AI Search Visibility & Competitor Gap Audits for B2B SaaS.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <p className="mb-4 text-sm text-vanta-muted">Last updated: June 6, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-vanta-muted">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">1. Information We Collect</h2>
            <p>
              When you submit a snapshot request through our form, we collect the information you provide, including your name, email address, company name, product URL, and competitor details. We do not collect any information automatically beyond standard web server logs.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">2. How We Use Your Information</h2>
            <p>
              We use the information you submit solely to produce your AI Competitor Gap Snapshot report and to communicate findings and recommendations to you. We do not sell, rent, or share your information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">3. Data Retention</h2>
            <p>
              We retain your submitted information for the duration needed to deliver your snapshot report and any follow-up communication. You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">4. Third-Party Services</h2>
            <p>
              Our snapshot request form is powered by Tally.so. When you submit information through the form, it is processed according to Tally&apos;s privacy policy in addition to ours. We may also use standard analytics tools to understand website traffic patterns.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-vanta-text">5. Contact</h2>
            <p>
              If you have questions about this privacy policy or want to request data deletion, please reach out through our contact form or email us directly.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

import Link from 'next/link'
import { TALLY_FORM_URL } from '@/lib/site'

const productLinks = [
  { label: 'What we audit', href: '/#what-we-audit' },
  { label: 'Snapshot', href: '/#snapshot' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Contact', href: '/#contact' },
] as const

const resourceLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
] as const

export function VantaflowFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.75fr_0.75fr_1.15fr] lg:gap-12">
          <div className="max-w-sm">
            <Link href="/" className="text-xl font-semibold tracking-tight text-vanta-text">
              Vantaflow
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-vanta-muted">
              AI Search Visibility &amp; Competitor Gap Audits for B2B SaaS.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              Built for AI SaaS, sales tools, CRM, support platforms, devtools, and analytics teams.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-vanta-text">Product</h2>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-vanta-muted transition-colors hover:text-vanta-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-vanta-text">Resources</h2>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-vanta-muted transition-colors hover:text-vanta-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-vanta-border bg-vanta-bg/70 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-vanta-text">Request a snapshot</h2>
            <p className="mt-3 text-sm leading-relaxed text-vanta-muted">
              Ready to see whether AI tools recommend you or your competitors?
            </p>
            <a
              href={TALLY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-vanta-orange px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-vanta-orangeHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vanta-orange"
            >
              Request snapshot
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-vanta-border bg-vanta-bg/55">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-xs text-vanta-muted sm:text-left">
            &copy; {new Date().getFullYear()} Vantaflow. All rights reserved.
          </p>
          <p className="text-center text-xs text-vanta-muted sm:text-right">
            Example metrics are sample audit data.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default VantaflowFooter

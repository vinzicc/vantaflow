# Vantaflow

Landing page for an async **AI search visibility audit** aimed at B2B SaaS founders and growth teams.

**Live site:** https://www.vantaflow.tech

> **Status:** service experiment. This repository contains the marketing site and lead-capture flow. The audit execution process itself is not implemented as an automated product in this codebase.

## Service Positioning

Vantaflow helps teams evaluate how major AI assistants describe, compare, and recommend their product for high-intent buyer prompts.

The site presents an async workflow covering:

1. Buyer-prompt mapping
2. Multi-model visibility testing
3. Competitor-gap analysis
4. A prioritized 30-day action roadmap

## Website Features

- Responsive landing page for a productized audit service
- Free AI Visibility Score lead magnet
- External Tally form integration
- FAQ and service structured data with JSON-LD
- Search-friendly metadata and canonical site configuration
- Framer Motion transitions
- Reusable footer and supporting service pages
- Async-first positioning with no required sales call

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Configuration

The public site URL and lead form URL are defined in `src/lib/site.ts`:

```ts
export const SITE_URL = 'https://www.vantaflow.tech'
export const FREE_SCORE_FORM_URL = 'https://tally.so/r/xXvlPE'
```

Update those values when changing the domain or form destination.

## Repository Scope

Included:

- Marketing website
- Lead-capture and CTA flow
- Service copy and pricing presentation
- SEO metadata and JSON-LD
- Responsive UI and animations

Not included:

- Automated multi-model audit engine
- Prompt execution or result collection
- Client authentication
- Billing
- Report generation backend
- Analytics implementation

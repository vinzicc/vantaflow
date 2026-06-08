import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vanta: {
          bg: '#FAFAFA',
          surface: '#FFFFFF',
          surfaceAlt: '#F5F5F5',
          text: '#171717',
          muted: '#737373',
          border: '#E5E5E5',
          orange: '#F97316',
          orangeHover: '#EA580C',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-geist-sans)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-geist-mono)',
          'ui-monospace',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}

export default config

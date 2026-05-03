import type { Config } from 'tailwindcss'

/**
 * The docs site shares the same theme-token strategy as the main IoT app:
 * Tailwind colors / radii / fonts read CSS variables that ThemeProvider sets
 * at runtime, so the live previews automatically follow the active theme.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // App-theme tokens (drive live previews — switch via top-bar theme picker)
        bg:               'var(--bg)',
        'bg-card':        'var(--bg-card)',
        'bg-card-dark':   'var(--bg-card-dark)',
        'bg-dark':        'var(--bg-dark)',
        primary:          'var(--text-primary)',
        secondary:        'var(--text-secondary)',
        muted:            'var(--text-muted)',
        accent:           'var(--accent)',
        'accent-alt':     'var(--accent-alt)',

        // Docs-chrome tokens (constant across themes — sidebar, top nav, body copy)
        'docs-bg':        'var(--docs-bg)',
        'docs-fg':        'var(--docs-fg)',
        'docs-muted':     'var(--docs-muted)',
        'docs-border':    'var(--docs-border)',
        'docs-card':      'var(--docs-card)',
        'docs-code-bg':   'var(--docs-code-bg)',
        'docs-accent':    'var(--docs-accent)',
      },
      borderRadius: {
        card:  'var(--radius-card)',
        pill:  'var(--radius-pill)',
        tight: 'var(--radius-tight)',
      },
      fontFamily: {
        mono:    ['var(--font-mono)'],
        sans:    ['var(--font-sans)'],
        display: ['var(--font-display)'],
        // Docs body always uses the system sans (Inter), independent of theme
        docs: ['Inter', 'system-ui', 'sans-serif'],
        'docs-mono': ['"JetBrains Mono"', '"Fira Code"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: 'var(--card-shadow)',
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
}

export default config

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type ThemeId = 'nothing' | 'modern' | 'y2k'

export interface ThemeVars {
  '--bg': string
  '--bg-card': string
  '--bg-card-dark': string
  '--bg-dark': string
  '--text-primary': string
  '--text-secondary': string
  '--text-muted': string
  '--accent': string
  '--accent-alt': string
  '--border': string
  '--font-mono': string
  '--font-sans': string
  '--font-display': string
  '--radius-card': string
  '--radius-pill': string
  '--radius-tight': string
  '--card-shadow': string
  '--card-border': string
}

export interface Theme {
  id: ThemeId
  label: string
  tagline: string
  vars: ThemeVars
  shellBackground?: string
  swatches: [string, string, string]
}

export const NOTHING: Theme = {
  id: 'nothing',
  label: 'Nothing',
  tagline: 'Hard contrast, dot-matrix, full pills',
  swatches: ['#E5E5E5', '#000000', '#E5232C'],
  vars: {
    '--bg': '#E5E5E5',
    '--bg-card': '#FFFFFF',
    '--bg-card-dark': '#F0F0F0',
    '--bg-dark': '#000000',
    '--text-primary': '#000000',
    '--text-secondary': '#666666',
    '--text-muted': '#999999',
    '--accent': '#E5232C',
    '--accent-alt': '#000000',
    '--border': 'transparent',
    '--font-mono': "'Ndot 55', 'Doto', 'Space Mono', 'Courier New', monospace",
    '--font-sans': "'Ndot 55', 'Doto', 'Inter', system-ui, sans-serif",
    '--font-display': "'Ndot 55', 'Doto', 'Space Mono', monospace",
    '--radius-card': '20px',
    '--radius-pill': '999px',
    '--radius-tight': '12px',
    '--card-shadow': 'none',
    '--card-border': 'none',
  },
}

export const MODERN: Theme = {
  id: 'modern',
  label: 'Modern',
  tagline: 'Clean white, soft shadows, subtle blue',
  swatches: ['#FAFAFA', '#18181B', '#2563EB'],
  vars: {
    '--bg': '#FAFAFA',
    '--bg-card': '#FFFFFF',
    '--bg-card-dark': '#F4F4F5',
    '--bg-dark': '#18181B',
    '--text-primary': '#18181B',
    '--text-secondary': '#52525B',
    '--text-muted': '#A1A1AA',
    '--accent': '#2563EB',
    '--accent-alt': '#10B981',
    '--border': '#E4E4E7',
    '--font-mono': "'JetBrains Mono', 'Space Mono', monospace",
    '--font-sans': "'Inter', system-ui, sans-serif",
    '--font-display': "'Inter', system-ui, sans-serif",
    '--radius-card': '14px',
    '--radius-pill': '10px',
    '--radius-tight': '8px',
    '--card-shadow': '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
    '--card-border': '1px solid #E4E4E7',
  },
}

export const Y2K: Theme = {
  id: 'y2k',
  label: 'Y2K',
  tagline: 'Frutiger Aero, glassy bubbles, sky gradient',
  swatches: ['#B8DDF7', '#FF6BBE', '#6BFFC0'],
  shellBackground: 'linear-gradient(180deg, #B8DDF7 0%, #DDEEF7 60%, #F2C3E0 100%)',
  vars: {
    '--bg': 'transparent',
    '--bg-card': 'rgba(255, 255, 255, 0.62)',
    '--bg-card-dark': 'rgba(255, 255, 255, 0.42)',
    '--bg-dark': '#1B2A50',
    '--text-primary': '#1B2A50',
    '--text-secondary': '#4A6BB8',
    '--text-muted': '#8AA8D8',
    '--accent': '#FF6BBE',
    '--accent-alt': '#3DD9C0',
    '--border': 'rgba(255, 255, 255, 0.7)',
    '--font-mono': "'VT323', 'Space Mono', monospace",
    '--font-sans': "'Quicksand', 'Comic Sans MS', sans-serif",
    '--font-display': "'Bungee', 'Quicksand', sans-serif",
    '--radius-card': '28px',
    '--radius-pill': '999px',
    '--radius-tight': '16px',
    '--card-shadow': '0 8px 24px rgba(80, 140, 220, 0.22), inset 0 1px 0 rgba(255,255,255,0.95)',
    '--card-border': '1px solid rgba(255,255,255,0.6)',
  },
}

export const THEMES: Record<ThemeId, Theme> = { nothing: NOTHING, modern: MODERN, y2k: Y2K }
export const THEME_LIST: Theme[] = [NOTHING, MODERN, Y2K]

const STORAGE_KEY = 'home-os-docs.theme'

interface ThemeContextValue {
  theme: Theme
  themeId: ThemeId
  setTheme: (id: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * Applies the active app theme's CSS variables to a SCOPED container, not
 * to :root, so the docs chrome (sidebar, top bar, prose) stays constant
 * while live previews change. Use the `useTheme().theme.vars` and apply via
 * inline style on a wrapper around any preview.
 *
 * For convenience we ALSO set the variables on :root so unwrapped snippets
 * still pick them up — the docs chrome uses --docs-* tokens that are
 * independent of these.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return 'nothing'
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null
    return saved && saved in THEMES ? saved : 'nothing'
  })

  const theme = THEMES[themeId]

  useEffect(() => {
    const root = document.documentElement
    for (const [k, v] of Object.entries(theme.vars)) {
      root.style.setProperty(k, v as string)
    }
    localStorage.setItem(STORAGE_KEY, theme.id)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme: setThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}

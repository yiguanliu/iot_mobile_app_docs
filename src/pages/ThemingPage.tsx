import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { THEME_LIST, useTheme } from '@/state/theme'
import { cn } from '@/lib/utils'

export default function ThemingPage() {
  const { themeId, setTheme } = useTheme()

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Foundations"
        title="Theming"
        description="Three opinionated visual styles share the same component API. Tokens flow through CSS variables; Tailwind reads them so utility classes follow the active theme automatically."
      />

      <Section title="The three themes" description="Pick one to set the default. Per-theme color overrides persist independently in the app — switching themes doesn't lose your customizations.">
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {THEME_LIST.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                'flex flex-col gap-3 rounded-lg border p-4 text-left transition-colors',
                themeId === t.id
                  ? 'border-docs-fg bg-docs-card'
                  : 'border-docs-border hover:border-docs-fg/30'
              )}
            >
              <div className="flex items-start justify-between">
                <span className="text-[15px] font-semibold">{t.label}</span>
                {themeId === t.id && (
                  <span className="rounded-full bg-docs-fg px-2 py-0.5 text-[10px] font-bold text-docs-bg">
                    ACTIVE
                  </span>
                )}
              </div>
              <div className="flex gap-1.5">
                {t.swatches.map((c, i) => (
                  <span key={i} className="h-6 w-6 rounded-full ring-1 ring-black/10" style={{ background: c }} />
                ))}
              </div>
              <p className="text-[13px] text-docs-muted">{t.tagline}</p>
            </button>
          ))}
        </div>
      </Section>

      <Section
        title="How tokens flow"
        description="ThemeProvider sets every CSS variable on :root when the active theme changes. Tailwind utilities read those variables, and the resulting components don't need to know which theme is active."
      >
        <CodeBlock
          language="tsx"
          code={`// 1. ThemeProvider applies CSS vars on :root
useEffect(() => {
  for (const [k, v] of Object.entries(theme.vars)) {
    document.documentElement.style.setProperty(k, v)
  }
}, [theme])

// 2. Tailwind config maps colors to those variables
// tailwind.config.ts
colors: {
  primary:  'var(--text-primary)',
  accent:   'var(--accent)',
  'bg-card':'var(--bg-card)',
}

// 3. Components use the utility classes
<button className="bg-primary text-bg-card rounded-pill">
  PRIMARY
</button>`}
        />
      </Section>

      <Section title="Per-theme overrides">
        <p>
          The main app exposes a <code>setVar(key, value)</code> API on <code>useTheme()</code> that
          stores per-theme overrides in <code>localStorage</code>. Overrides take precedence over the
          base theme but are scoped to a single theme — switching themes leaves them intact.
        </p>
        <CodeBlock
          language="tsx"
          code={`const { setVar, clearVar, isOverridden } = useTheme()

// User picks a new accent in Settings → Customize
setVar('--accent', '#FF8800')

// Reset just this token
clearVar('--accent')

// Has the user customized this token in the active theme?
isOverridden('--accent')   // boolean`}
        />
      </Section>
    </div>
  )
}

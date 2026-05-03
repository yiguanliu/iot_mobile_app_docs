import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { THEME_LIST, useTheme } from '@/state/theme'
import type { ThemeVars } from '@/state/theme'

const TOKENS: { key: keyof ThemeVars; label: string; description: string }[] = [
  { key: '--radius-card',  label: 'Card',  description: 'Default surface — Cards, panels, sheets, the floorplan container' },
  { key: '--radius-pill',  label: 'Pill',  description: 'Fully rounded — Buttons, scene chips, status badges' },
  { key: '--radius-tight', label: 'Tight', description: 'Compact surfaces — color rows, inline chips, nav items' },
]

function Demo({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        style={{
          width: 96, height: 56,
          background: 'var(--bg-card)',
          border: 'var(--card-border, 1px solid rgba(0,0,0,0.06))',
          boxShadow: 'var(--card-shadow, none)',
          borderRadius: value,
        }}
      />
      <span className="font-docs-mono text-[11px] text-docs-muted">{label}</span>
    </div>
  )
}

export default function RadiusPage() {
  const { theme } = useTheme()

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Foundations"
        title="Radius"
        description="Three radius tokens. Each theme picks values that read as a unified shape language — Nothing leans pill-heavy, Modern stays soft and rectangular, Y2K maxes out card radii to feel bubbly."
      />

      <Section title={`Active theme — ${theme.label}`}>
        <div
          className="mt-6 flex flex-wrap gap-8 rounded-lg border border-docs-border p-8"
          style={{ background: theme.shellBackground ?? theme.vars['--bg'], ...(theme.vars as any) }}
        >
          {TOKENS.map((t) => (
            <Demo key={t.key} value={theme.vars[t.key]} label={`${t.key} · ${theme.vars[t.key]}`} />
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-docs-border">
          <table className="w-full text-[13px]">
            <thead className="bg-docs-card">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Token</th>
                <th className="px-4 py-2.5 text-left font-medium">Value</th>
                <th className="px-4 py-2.5 text-left font-medium">Use</th>
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((t, i) => (
                <tr key={t.key} className={i > 0 ? 'border-t border-docs-border' : ''}>
                  <td className="px-4 py-3 align-top">
                    <code className="font-docs-mono text-[12px]">{t.key}</code>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <code className="font-docs-mono text-[12px] text-docs-muted">{theme.vars[t.key]}</code>
                  </td>
                  <td className="px-4 py-3 align-top text-docs-muted">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Side-by-side across themes">
        <div className="mt-6 overflow-hidden rounded-lg border border-docs-border">
          <table className="w-full text-[13px]">
            <thead className="bg-docs-card">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Token</th>
                {THEME_LIST.map((t) => (
                  <th key={t.id} className="px-4 py-2.5 text-left font-medium">{t.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((tok, i) => (
                <tr key={tok.key} className={i > 0 ? 'border-t border-docs-border' : ''}>
                  <td className="px-4 py-3"><code className="font-docs-mono text-[12px]">{tok.key}</code></td>
                  {THEME_LIST.map((t) => (
                    <td key={t.id} className="px-4 py-3">
                      <code className="font-docs-mono text-[11px] text-docs-muted">{t.vars[tok.key]}</code>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}

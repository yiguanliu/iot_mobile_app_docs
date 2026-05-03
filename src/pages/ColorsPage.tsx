import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { useTheme, THEME_LIST } from '@/state/theme'
import type { ThemeVars } from '@/state/theme'

const COLOR_TOKENS: { key: keyof ThemeVars; label: string; description: string }[] = [
  { key: '--bg',             label: 'Background',     description: 'App canvas behind cards' },
  { key: '--bg-card',        label: 'Card',           description: 'Surface for floating tiles' },
  { key: '--bg-card-dark',   label: 'Card (dark)',    description: 'Subtle alt surface; hover/secondary container' },
  { key: '--bg-dark',        label: 'Dark',           description: 'High-contrast dark surface; inverse buttons' },
  { key: '--text-primary',   label: 'Primary',        description: 'Headings, body text, primary fills' },
  { key: '--text-secondary', label: 'Secondary',      description: 'Less-emphasized text' },
  { key: '--text-muted',     label: 'Muted',          description: 'Captions, eyebrows, inactive states' },
  { key: '--accent',         label: 'Accent',         description: 'Live signals, alerts, halos' },
  { key: '--accent-alt',     label: 'Accent alt',     description: 'Secondary signal, OK states' },
  { key: '--border',         label: 'Border',         description: 'Card / input border (often transparent in Nothing)' },
]

export default function ColorsPage() {
  const { theme } = useTheme()

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Foundations"
        title="Colors"
        description="Every color in the system is a CSS variable. The table below shows the resolved value for the active theme — switch themes via the top bar to compare."
      />

      <Section title="Active theme tokens" description={`Currently showing ${theme.label}. Each row is a single CSS variable that components reference.`}>
        <div className="mt-6 overflow-hidden rounded-lg border border-docs-border">
          <table className="w-full text-[13px]">
            <thead className="bg-docs-card">
              <tr>
                <th className="w-[100px] px-4 py-2.5 text-left font-medium">Swatch</th>
                <th className="px-4 py-2.5 text-left font-medium">Token</th>
                <th className="px-4 py-2.5 text-left font-medium">Value</th>
                <th className="px-4 py-2.5 text-left font-medium">Use</th>
              </tr>
            </thead>
            <tbody>
              {COLOR_TOKENS.map((tok, i) => {
                const value = theme.vars[tok.key]
                return (
                  <tr key={tok.key} className={i > 0 ? 'border-t border-docs-border' : ''}>
                    <td className="px-4 py-3">
                      <div
                        className="h-9 w-16 rounded-md ring-1 ring-black/10"
                        style={{ background: value, backgroundClip: 'padding-box' }}
                      />
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <code className="font-docs-mono text-[12px]">{tok.key}</code>
                      <div className="mt-0.5 text-[12px] text-docs-muted">{tok.label}</div>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <code className="font-docs-mono text-[12px] text-docs-muted">{value}</code>
                    </td>
                    <td className="px-4 py-3 align-middle text-docs-muted">{tok.description}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Side-by-side across themes" description="Same token, three values. Useful when picking which token to use for a new component.">
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
              {COLOR_TOKENS.map((tok, i) => (
                <tr key={tok.key} className={i > 0 ? 'border-t border-docs-border' : ''}>
                  <td className="px-4 py-3">
                    <code className="font-docs-mono text-[12px]">{tok.key}</code>
                  </td>
                  {THEME_LIST.map((t) => (
                    <td key={t.id} className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full ring-1 ring-black/10" style={{ background: t.vars[tok.key] }} />
                        <code className="font-docs-mono text-[11px] text-docs-muted">{t.vars[tok.key]}</code>
                      </div>
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

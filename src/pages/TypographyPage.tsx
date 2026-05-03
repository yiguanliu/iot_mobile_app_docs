import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { useTheme } from '@/state/theme'

const SCALE = [
  { name: 'Display',      sizePx: 56, weight: 700, varFamily: '--font-display', sample: '21°C', description: 'Hero numerals and big counters' },
  { name: 'Heading 1',    sizePx: 36, weight: 700, varFamily: '--font-sans',    sample: 'Lighting', description: 'Page title' },
  { name: 'Heading 2',    sizePx: 22, weight: 600, varFamily: '--font-sans',    sample: 'Living Room', description: 'Section title' },
  { name: 'Body',         sizePx: 15, weight: 400, varFamily: '--font-sans',    sample: 'Tap a zone to drill in.', description: 'Default copy' },
  { name: 'Mono label',   sizePx: 11, weight: 700, varFamily: '--font-mono',    sample: 'BRIGHTNESS — 80%', description: 'Eyebrows, status, all-caps labels' },
  { name: 'Mono caption', sizePx: 10, weight: 400, varFamily: '--font-mono',    sample: '01:38 AM · sat may 02', description: 'Timestamps, helper text' },
] as const

export default function TypographyPage() {
  const { theme } = useTheme()

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="Three font roles, swapped per theme. Components reference --font-sans / --font-mono / --font-display — never font names directly."
      />

      <Section title="Active scale" description={`In ${theme.label}, --font-sans = ${theme.vars['--font-sans']}.`}>
        <div className="mt-6 overflow-hidden rounded-lg border border-docs-border">
          <table className="w-full text-[13px]">
            <thead className="bg-docs-card">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Sample</th>
                <th className="px-4 py-2.5 text-left font-medium">Name</th>
                <th className="px-4 py-2.5 text-left font-medium">Family</th>
                <th className="px-4 py-2.5 text-left font-medium">Size · Weight</th>
              </tr>
            </thead>
            <tbody>
              {SCALE.map((row, i) => (
                <tr key={row.name} className={i > 0 ? 'border-t border-docs-border' : ''}>
                  <td className="px-4 py-3">
                    <span
                      style={{
                        fontFamily: theme.vars[row.varFamily as keyof typeof theme.vars],
                        fontSize: row.sizePx,
                        fontWeight: row.weight,
                        lineHeight: 1.1,
                        color: theme.vars['--text-primary'],
                      }}
                    >
                      {row.sample}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle">{row.name}</td>
                  <td className="px-4 py-3 align-middle">
                    <code className="font-docs-mono text-[12px] text-docs-muted">{row.varFamily}</code>
                  </td>
                  <td className="px-4 py-3 align-middle text-docs-muted">
                    {row.sizePx}px · {row.weight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Roles" description="Three CSS variables encode the typographic system. Per theme they map to different families.">
        <CodeBlock
          language="ts"
          code={`// state/theme.tsx — Nothing
'--font-mono':    "'Ndot 55', 'Doto', 'Space Mono', 'Courier New', monospace"
'--font-sans':    "'Ndot 55', 'Doto', 'Inter', system-ui, sans-serif"
'--font-display': "'Ndot 55', 'Doto', 'Space Mono', monospace"

// state/theme.tsx — Modern
'--font-mono':    "'JetBrains Mono', 'Space Mono', monospace"
'--font-sans':    "'Inter', system-ui, sans-serif"
'--font-display': "'Inter', system-ui, sans-serif"

// state/theme.tsx — Y2K
'--font-mono':    "'VT323', 'Space Mono', monospace"
'--font-sans':    "'Quicksand', 'Comic Sans MS', sans-serif"
'--font-display': "'Bungee', 'Quicksand', sans-serif"`}
        />
      </Section>
    </div>
  )
}

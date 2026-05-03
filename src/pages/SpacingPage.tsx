import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { CodeBlock } from '@/components/docs/CodeBlock'

const SCALE = [
  { name: 'tight',     px: 4,  use: 'Icon-to-label inside a Nav Tile or Status Dot' },
  { name: 'snug',      px: 6,  use: 'Inside a metric card between sublabel and value' },
  { name: 'compact',   px: 8,  use: 'Between scene chips, between bottom-nav tiles' },
  { name: 'comfortable', px: 12, use: 'Default gap inside a card; between rows in a list' },
  { name: 'roomy',     px: 16, use: 'Card padding; section gaps inside a panel' },
  { name: 'page-pad',  px: 20, use: 'Page horizontal padding on mobile' },
  { name: 'section',   px: 24, use: 'Between major sections on Settings' },
  { name: 'major',     px: 40, use: 'Between top-level page chapters' },
]

export default function SpacingPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Foundations"
        title="Spacing"
        description="No formal token scale yet — spacing is inline pixel values keyed by intent. The following table documents the de-facto scale used across the app so new components stay coherent."
      />

      <Section title="De-facto scale">
        <div className="mt-6 overflow-hidden rounded-lg border border-docs-border">
          <table className="w-full text-[13px]">
            <thead className="bg-docs-card">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Visual</th>
                <th className="px-4 py-2.5 text-left font-medium">Name</th>
                <th className="px-4 py-2.5 text-left font-medium">px</th>
                <th className="px-4 py-2.5 text-left font-medium">Use</th>
              </tr>
            </thead>
            <tbody>
              {SCALE.map((s, i) => (
                <tr key={s.name} className={i > 0 ? 'border-t border-docs-border' : ''}>
                  <td className="px-4 py-3 align-middle" style={{ width: 100 }}>
                    <div className="bg-docs-fg" style={{ width: s.px, height: 16 }} />
                  </td>
                  <td className="px-4 py-3 align-middle font-mono text-[12px]">{s.name}</td>
                  <td className="px-4 py-3 align-middle font-mono text-[12px] text-docs-muted">{s.px}</td>
                  <td className="px-4 py-3 align-middle text-docs-muted">{s.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Card paddings" description="Two flavors. Most cards use 16px on all sides; tight cards (color rows, sheet items) use 12px vertical / 14px horizontal.">
        <CodeBlock
          language="ts"
          code={`// Default card
padding: 16

// Tight surface (inline lists, nav tiles)
padding: '12px 14px'

// Page wrapper
padding: '20px 20px 100px'   // bottom-nav clearance`}
        />
      </Section>

      <Section title="Roadmap" description="Once the system stabilizes, this page should graduate to formal --space-* tokens. For now, prefer the values above over arbitrary pixel literals.">
        <div />
      </Section>
    </div>
  )
}

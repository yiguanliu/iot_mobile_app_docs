import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'

function MetricCard({
  label, value, unit, trend = 'stable',
}: { label: string; value: number; unit: string; trend?: 'up' | 'down' | 'stable' }) {
  const trendChar = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'
  const trendColor = trend === 'up' ? 'var(--accent)' : 'var(--text-muted)'
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-card)',
        border: 'var(--card-border, none)',
        boxShadow: 'var(--card-shadow, none)',
        padding: '14px 16px',
        minWidth: 180,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10,
        color: 'var(--text-muted)', letterSpacing: '0.1em',
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700,
          color: 'var(--text-primary)', lineHeight: 1,
        }}>
          {value}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--text-secondary)', marginBottom: 2,
        }}>
          {unit}
        </span>
        <span style={{ marginLeft: 'auto', color: trendColor, fontSize: 12 }}>{trendChar}</span>
      </div>
    </div>
  )
}

const PROPS: PropDef[] = [
  { name: 'label', type: 'string',                  description: 'All-caps short identifier — e.g. "TEMPERATURE", "CO₂".' },
  { name: 'value', type: 'number',                  description: 'The numeric reading.' },
  { name: 'unit',  type: 'string',                  description: 'Suffix unit — e.g. "°C", "ppm".' },
  { name: 'trend', type: '"up" | "down" | "stable"', default: '"stable"', description: 'Direction indicator.' },
]

export default function MetricCardPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Components"
        title="Metric Card"
        description="The Dashboard's workhorse. Label + big numeral + unit + trend arrow. Numerals use --font-display so they pick up Doto/NDot in Nothing and Bungee in Y2K."
      />

      <ComponentPreview
        code={`<MetricCard label="TEMPERATURE" value={21}  unit="°C"  trend="up" />
<MetricCard label="HUMIDITY"    value={62}  unit="%"   trend="stable" />
<MetricCard label="CO₂"         value={412} unit="ppm" trend="down" />`}
      >
        <MetricCard label="TEMPERATURE" value={21} unit="°C" trend="up" />
        <MetricCard label="HUMIDITY" value={62} unit="%" trend="stable" />
        <MetricCard label="CO₂" value={412} unit="ppm" trend="down" />
      </ComponentPreview>

      <Section title="Props">
        <PropsTable props={PROPS} />
      </Section>
    </div>
  )
}

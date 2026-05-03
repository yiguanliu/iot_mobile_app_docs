import { Plus, Wind, Sun, Volume2, Lightbulb } from 'lucide-react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'

function MetricCard({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-card)',
      border: 'var(--card-border, none)',
      boxShadow: 'var(--card-shadow, none)',
      padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
          {value}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>
          {unit}
        </span>
      </div>
    </div>
  )
}

function IconChip({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-tight, 12px)',
      border: 'var(--card-border, none)',
      boxShadow: 'var(--card-shadow, none)',
      padding: '12px 14px',
    }}>
      <Icon size={20} strokeWidth={1.75} color="var(--text-primary)" />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.08em' }}>
        {label}
      </span>
    </div>
  )
}

function SensorGridBlock() {
  return (
    <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>iot.hub</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>sat, may 02</div>
        </div>
        <button style={{
          width: 36, height: 36, borderRadius: 'var(--radius-pill)',
          background: 'var(--text-primary)', color: 'var(--bg-card)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Plus size={16} strokeWidth={2} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <MetricCard label="TEMPERATURE" value={21} unit="°C" />
        <MetricCard label="HUMIDITY"    value={62} unit="%" />
        <MetricCard label="CO₂"         value={412} unit="ppm" />
        <MetricCard label="POWER"       value={142} unit="W" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <IconChip icon={Wind}      label="CO₂ DETECTOR" />
        <IconChip icon={Sun}       label="UV INDEX" />
        <IconChip icon={Volume2}   label="NOISE METER" />
        <IconChip icon={Lightbulb} label="LUMINANCE" />
      </div>
    </div>
  )
}

export default function SensorGridPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Blocks"
        title="Sensor Grid"
        description="The Dashboard composition. Header row (timestamp + add button) above a grid of Metric Cards. The Add button opens the Add Sensor Sheet — see that block for the picker pattern."
      />

      <ComponentPreview
        align="start"
        minHeight={420}
        code={`<SensorGridBlock />`}
      >
        <SensorGridBlock />
      </ComponentPreview>

      <Section title="Layout">
        <ul>
          <li><strong>2-column grid</strong> on mobile (gap 10px) — flat to the screen edges with 20px gutter.</li>
          <li><strong>Same grid on desktop</strong> inside the right pane — no need to scale up since the right pane has bounded width.</li>
          <li><strong>Add button</strong> top-right opens the bottom sheet picker.</li>
        </ul>
      </Section>

      <Section title="Why mix Metric Cards and Icon Chips?" description="Cards are for live readings — bigger numerals, more vertical real estate. Chips are for sensor types that aren't currently selected/visualized but are present on the device. The visual rhythm distinguishes 'showing a value right now' from 'available, not pinned'.">
        <CodeBlock
          language="ts"
          code={`interface DeviceType {
  id: string
  icon: LucideIcon
  label: string
  sublabel: string
  unit: string
  baseValue: number
  trend: 'up' | 'down' | 'stable'
}`}
        />
      </Section>
    </div>
  )
}

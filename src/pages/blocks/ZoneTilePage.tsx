import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Slider } from '@/components/ui/slider'

interface Zone {
  id: string
  label: string
  brightness: number
  on: boolean
  presence?: boolean
}

function ZoneTileBlock({ zone, onChange }: { zone: Zone; onChange: (next: Zone) => void }) {
  const intensity = zone.on ? zone.brightness / 100 : 0
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-card)',
        border: 'var(--card-border, none)',
        boxShadow: 'var(--card-shadow, none)',
        padding: 16,
        width: 280,
      }}
    >
      {/* Halo + label row */}
      <div style={{ position: 'relative', height: 120, marginBottom: 12 }}>
        <svg viewBox="0 0 280 120" style={{ width: '100%', height: '100%', display: 'block' }}>
          <circle cx="140" cy="60" r={20 + intensity * 28} fill="var(--accent)" opacity={0.08 + intensity * 0.32} />
          <circle cx="140" cy="60" r={10 + intensity * 12} fill="var(--accent)" opacity={0.25 + intensity * 0.5} />
          <text
            x="14" y="110"
            fontFamily="var(--font-mono)" fontSize="11" fontWeight="700"
            letterSpacing="0.1em" fill="var(--text-primary)"
          >
            {zone.label}
          </text>
          <text
            x="266" y="110" textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="11"
            fill={zone.on ? 'var(--text-primary)' : 'var(--text-muted)'}
          >
            {zone.on ? `${zone.brightness}%` : 'OFF'}
          </text>
          {zone.presence && (
            <circle cx="262" cy="14" r="4" fill="var(--accent-alt)" />
          )}
        </svg>
      </div>

      {/* Brightness control */}
      <div className="flex flex-col gap-2">
        <Slider
          value={[zone.on ? zone.brightness : 0]}
          onValueChange={([v]) => onChange({ ...zone, brightness: v, on: v > 0 })}
          min={0} max={100} step={1}
        />
        <button
          onClick={() => onChange({ ...zone, on: !zone.on })}
          style={{
            padding: '8px 16px',
            background: zone.on ? 'var(--text-primary)' : 'transparent',
            color: zone.on ? 'var(--bg-card)' : 'var(--text-primary)',
            border: '1.5px solid var(--text-primary)',
            borderRadius: 'var(--radius-pill)',
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em',
          }}
        >
          {zone.on ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  )
}

export default function ZoneTilePage() {
  const [zone, setZone] = useState<Zone>({
    id: 'living', label: 'LIVING ROOM', brightness: 75, on: true, presence: true,
  })

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Blocks"
        title="Zone Tile"
        description="A single floorplan zone, isolated. Composes a sensor halo, label, brightness readout, presence indicator, brightness slider, and on/off toggle into a single tile. Used standalone in zone-detail drill-ins; tiled into the floorplan SVG."
      />

      <ComponentPreview
        minHeight={320}
        code={`<ZoneTileBlock zone={zone} onChange={setZone} />`}
      >
        <ZoneTileBlock zone={zone} onChange={setZone} />
      </ComponentPreview>

      <Section title="Composition" description="The block reuses three primitives: SensorHalo (SVG), Slider (Radix), and a hand-rolled on/off toggle. The halo's radius and opacity are functions of brightness, so dimming visibly attenuates the glow.">
        <ul>
          <li><strong>Halo</strong> — two concentric circles, opacity + radius driven by <code>brightness × on</code>.</li>
          <li><strong>Label + readout</strong> — mono caption + value. <code>OFF</code> when device is off.</li>
          <li><strong>Presence dot</strong> — small accent-alt circle, top-right of the halo area.</li>
          <li><strong>Slider</strong> — Radix-based, theme-tinted track. Snaps device <code>on</code> when raised from 0.</li>
          <li><strong>Toggle</strong> — outline pill that fills when active.</li>
        </ul>
      </Section>

      <Section title="Zone shape">
        <CodeBlock
          language="ts"
          code={`interface Zone {
  id: string
  label: string
  brightness: number   // 0..100
  on: boolean
  presence?: boolean   // optional — wandering presence indicator
}`}
        />
      </Section>
    </div>
  )
}

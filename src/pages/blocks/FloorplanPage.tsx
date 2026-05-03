import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'

interface Zone {
  id: string
  label: string
  x: number; y: number; w: number; h: number
  anchor: { x: number; y: number }
  brightness: number
  on: boolean
  presence?: boolean
}

const INITIAL: Zone[] = [
  { id: 'living',   label: 'LIVING',   x: 8,   y: 8,   w: 232, h: 168, anchor: { x: 116, y: 84 }, brightness: 75, on: true,  presence: true },
  { id: 'kitchen',  label: 'KITCHEN',  x: 240, y: 8,   w: 152, h: 112, anchor: { x: 76, y: 56 },  brightness: 60, on: true },
  { id: 'bathroom', label: 'BATH',     x: 240, y: 120, w: 152, h: 56,  anchor: { x: 76, y: 28 },  brightness: 0,  on: false },
  { id: 'bedroom',  label: 'BEDROOM',  x: 8,   y: 176, w: 200, h: 176, anchor: { x: 100, y: 88 }, brightness: 40, on: true },
  { id: 'workshop', label: 'WORKSHOP', x: 208, y: 176, w: 184, h: 176, anchor: { x: 92, y: 88 },  brightness: 0,  on: false },
]

function FloorplanBlock({ zones, onSelect, selected }: { zones: Zone[]; onSelect: (id: string) => void; selected: string | null }) {
  return (
    <svg viewBox="0 0 400 360" style={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block' }}>
      <rect x="4" y="4" width="392" height="352" rx="8" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" opacity="0.4" />
      {zones.map((z) => {
        const intensity = z.on ? z.brightness / 100 : 0
        const r = 18 + intensity * 22
        const opacity = 0.05 + intensity * 0.35
        const ax = z.x + z.anchor.x
        const ay = z.y + z.anchor.y
        const isSelected = selected === z.id
        return (
          <g key={z.id} style={{ cursor: 'pointer' }} onClick={() => onSelect(z.id)}>
            <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="4"
              fill="var(--bg-card)"
              stroke={isSelected ? 'var(--text-primary)' : 'var(--text-muted)'}
              strokeWidth={isSelected ? 2 : 1}
              opacity={isSelected ? 1 : 0.7}
            />
            <motion.circle cx={ax} cy={ay} r={r} fill="var(--accent)" animate={{ opacity, r }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
            <motion.circle cx={ax} cy={ay} r={r * 0.5} fill="var(--accent)" animate={{ opacity: opacity * 1.4 }} transition={{ duration: 0.9 }} />
            {z.presence && (
              <circle cx={z.x + z.w - 14} cy={z.y + 14} r="4" fill="var(--accent-alt)" />
            )}
            <text x={z.x + 10} y={z.y + z.h - 10} fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" letterSpacing="0.1em" fill="var(--text-primary)">{z.label}</text>
            <text x={z.x + z.w - 10} y={z.y + z.h - 10} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill={z.on ? 'var(--text-primary)' : 'var(--text-muted)'}>
              {z.on ? `${z.brightness}%` : 'OFF'}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function FloorplanPage() {
  const [zones] = useState<Zone[]>(INITIAL)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Blocks"
        title="Floorplan"
        description="The Home page centerpiece. An SVG digital twin: rooms as hit-test rects, sensor halos driven by brightness, presence dot per zone, click-to-select. Coordinates are hand-authored — there's no auto-layout step."
      />

      <ComponentPreview
        align="start"
        minHeight={420}
        code={`<FloorplanBlock
  zones={zones}
  selected={selected}
  onSelect={setSelected}
/>`}
      >
        <FloorplanBlock zones={zones} selected={selected} onSelect={setSelected} />
      </ComponentPreview>

      <Section title="Anatomy">
        <ul>
          <li><strong>Outer frame</strong> — single rounded rect at viewBox edge for visual containment.</li>
          <li><strong>Zone rect</strong> — one per room, hit-test for taps. Stroke thickens on selection.</li>
          <li><strong>Sensor Halo</strong> — two concentric circles per zone, radius/opacity = brightness × on.</li>
          <li><strong>Presence dot</strong> — accent-alt circle in the top-right corner when occupied.</li>
          <li><strong>Label + readout</strong> — mono caption row at the bottom of each zone.</li>
        </ul>
      </Section>

      <Section title="Zone shape">
        <CodeBlock
          language="ts"
          code={`interface Zone {
  id: string
  label: string
  x: number; y: number; w: number; h: number   // viewBox coords
  anchor: { x: number; y: number }              // halo center (relative to zone)
  brightness: number   // 0..100
  on: boolean
  presence?: boolean
}`}
        />
        <p>
          Floorplans are authored once per home and stored alongside the device topology.
          The block here is geometry-only — sensor data + selection are external props.
        </p>
      </Section>

      <Section title="Why SVG over Canvas?" description="Hit-testing on SVG is free (per-element click handlers). Halos animate via Framer Motion's circle support. CSS variables apply directly to fill/stroke without extra plumbing. The whole thing scales without rasterization. Canvas would only matter at hundreds of zones — way past the realistic ceiling.">
        <div />
      </Section>
    </div>
  )
}

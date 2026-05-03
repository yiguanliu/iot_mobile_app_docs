import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'

// Lightweight clone of the main app's CircularDimmer for demonstration. The
// real implementation also supports touch + keyboard; we keep mouse-drag here.
function CircularDimmer({
  value, onChange, label, sublabel,
}: { value: number; onChange: (v: number) => void; label?: string; sublabel?: string }) {
  const size = 180
  const strokeWidth = 2
  const radius = (size - strokeWidth * 2) / 2 - 8
  const cx = size / 2
  const cy = size / 2
  const startAngle = -225
  const totalArc = 270

  const polarToCartesian = (angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
  }
  const describeArc = (startDeg: number, endDeg: number) => {
    const start = polarToCartesian(endDeg)
    const end = polarToCartesian(startDeg)
    const largeArc = endDeg - startDeg > 180 ? 1 : 0
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`
  }
  const angle = startAngle + (value / 100) * totalArc
  const trackPath = describeArc(startAngle, startAngle + totalArc)
  const activePath = describeArc(startAngle, angle)
  const knob = polarToCartesian(angle)

  // 36 ticks
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const ta = startAngle + (i / 35) * totalArc
    const inner = polarToCartesian(ta)
    const outerR = radius + 10
    const rad = ((ta - 90) * Math.PI) / 180
    const outer = { x: cx + outerR * Math.cos(rad), y: cy + outerR * Math.sin(rad) }
    return { inner, outer, filled: i / 35 <= value / 100 }
  })

  const handle = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - cx
    const y = e.clientY - rect.top - cy
    let deg = (Math.atan2(y, x) * 180) / Math.PI + 90
    if (deg < 0) deg += 360
    let rel = deg - 135
    if (rel < 0) rel += 360
    if (rel > totalArc) rel = rel > totalArc + (360 - totalArc) / 2 ? 0 : totalArc
    onChange(Math.min(100, Math.max(0, Math.round((rel / totalArc) * 100))))
  }

  return (
    <svg
      width={size} height={size}
      style={{ cursor: 'pointer', userSelect: 'none', touchAction: 'none' }}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); handle(e) }}
      onPointerMove={(e) => { if (e.buttons) handle(e) }}
    >
      {ticks.map((t, i) => (
        <line key={i}
          x1={t.inner.x} y1={t.inner.y} x2={t.outer.x} y2={t.outer.y}
          stroke={t.filled ? 'var(--text-primary)' : 'var(--text-muted)'}
          strokeWidth={t.filled ? 1.5 : 1} opacity={t.filled ? 1 : 0.4}
        />
      ))}
      <path d={trackPath} fill="none" stroke="var(--text-muted)" strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.3" />
      <path d={activePath} fill="none" stroke="var(--text-primary)" strokeWidth={strokeWidth + 0.5} strokeLinecap="round" />
      <circle cx={knob.x} cy={knob.y} r={5} fill="var(--text-primary)" />
      <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fontWeight="700" fill="var(--text-primary)">{value}%</text>
      {label && (<text x={cx} y={cy + 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">{label}</text>)}
      {sublabel && (<text x={cx} y={cy + 28} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-muted)">{sublabel}</text>)}
    </svg>
  )
}

const PROPS: PropDef[] = [
  { name: 'value',    type: 'number',           description: 'Current value 0-100.' },
  { name: 'onChange', type: '(v: number) => void', description: 'Called with the new value while dragging.' },
  { name: 'label',    type: 'string',           description: 'Centered caption below the value (e.g. color temp name).' },
  { name: 'sublabel', type: 'string',           description: 'Secondary caption below label (e.g. Kelvin reading).' },
]

export default function CircularDimmerPage() {
  const [v, setV] = useState(65)

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Components"
        title="Circular Dimmer"
        description="270° drag-to-set arc dimmer used on the Lighting page. Tick marks fill as the value rises, the knob tracks the active angle, and the central readout uses --font-display so it picks up Doto/NDot in Nothing."
      />

      <ComponentPreview
        minHeight={260}
        code={`const [v, setV] = useState(65)

<CircularDimmer
  value={v}
  onChange={setV}
  label="WARM"
  sublabel="2700K"
/>`}
      >
        <CircularDimmer value={v} onChange={setV} label="WARM" sublabel="2700K" />
      </ComponentPreview>

      <Section title="Why a custom SVG control?" description="Native input[range] is linear and doesn't read as a 'dial'. The arc shape signals 'turn me' viscerally. The 36 ticks give precise visual feedback without numeric overlays. Mouse + touch are unified through Pointer Events.">
        <CodeBlock
          language="ts"
          code={`// 270° arc, starting at -225° (top-left) and sweeping clockwise to +45°
const startAngle = -225
const totalArc   = 270

// Map value 0..100 → angle, then polar→cartesian for the knob
const angle = startAngle + (value / 100) * totalArc`}
        />
      </Section>

      <Section title="Props">
        <PropsTable props={PROPS} />
      </Section>
    </div>
  )
}

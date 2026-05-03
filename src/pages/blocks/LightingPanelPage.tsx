import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'

interface Room {
  id: string
  label: string
  brightness: number
  on: boolean
  tempK: number
}

const ROOMS: Room[] = [
  { id: 'living',   label: 'LIVING ROOM', brightness: 75,  on: true,  tempK: 2400 },
  { id: 'bedroom',  label: 'BEDROOM',     brightness: 40,  on: true,  tempK: 3200 },
  { id: 'bathroom', label: 'BATHROOM',    brightness: 90,  on: false, tempK: 4000 },
]

function LightingPanelBlock({ rooms, onChange }: { rooms: Room[]; onChange: (r: Room[]) => void }) {
  const [activeId, setActiveId] = useState(rooms[0].id)
  const active = rooms.find((r) => r.id === activeId)!

  const setBrightness = (v: number) =>
    onChange(rooms.map((r) => (r.id === activeId ? { ...r, brightness: v, on: v > 0 } : r)))
  const toggle = () =>
    onChange(rooms.map((r) => (r.id === activeId ? { ...r, on: !r.on } : r)))

  return (
    <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Room tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--text-muted)', borderColor: 'rgba(0,0,0,0.1)' }}>
        {rooms.map((r) => {
          const isActive = r.id === activeId
          return (
            <button
              key={r.id}
              onClick={() => setActiveId(r.id)}
              style={{
                padding: '8px 12px',
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.08em',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                borderBottom: isActive ? '2px solid var(--text-primary)' : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {r.label}
            </button>
          )
        })}
      </div>

      {/* Active room control */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-card)',
        border: 'var(--card-border, none)',
        boxShadow: 'var(--card-shadow, none)',
        padding: 16,
        display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
      }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            BRIGHTNESS — {active.label}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>
            {active.on ? `${active.brightness}%` : 'OFF'}
          </span>
        </div>

        <input
          type="range" min={0} max={100} value={active.on ? active.brightness : 0}
          onChange={(e) => setBrightness(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent)' }}
        />

        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
          {active.tempK}K · {active.tempK <= 3000 ? 'WARM' : active.tempK <= 4000 ? 'NEUTRAL' : 'COOL'}
        </span>

        <button
          onClick={toggle}
          style={{
            padding: '8px 24px',
            background: active.on ? 'var(--text-primary)' : 'transparent',
            color: active.on ? 'var(--bg-card)' : 'var(--text-primary)',
            border: '1.5px solid var(--text-primary)',
            borderRadius: 'var(--radius-pill)',
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em',
          }}
        >
          {active.on ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  )
}

export default function LightingPanelPage() {
  const [rooms, setRooms] = useState(ROOMS)

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Blocks"
        title="Lighting Panel"
        description="The Lighting page composition. Room tabs across the top, active-room dimmer + on/off control underneath. The full app version also embeds a circular dimmer; this block uses the linear slider for compactness."
      />

      <ComponentPreview
        align="start"
        minHeight={300}
        code={`<LightingPanelBlock
  rooms={rooms}
  onChange={setRooms}
/>`}
      >
        <LightingPanelBlock rooms={rooms} onChange={setRooms} />
      </ComponentPreview>

      <Section title="Anatomy">
        <ul>
          <li><strong>Tab strip</strong> — horizontally scrolling room list, active room underlined.</li>
          <li><strong>Control card</strong> — title row (label + readout), brightness slider, color-temp caption, on/off toggle.</li>
          <li>The <strong>same context provider</strong> as the floorplan owns the room state — flipping a room here updates its halo there in real time.</li>
        </ul>
      </Section>

      <Section title="State shape">
        <CodeBlock
          language="ts"
          code={`interface Room {
  id: string
  label: string
  brightness: number     // 0..100
  on: boolean
  tempK: number          // color temperature
}

// Provided by the shared RoomsProvider context — same instance the
// floorplan reads from.
const { rooms, setBrightness, toggle, setOn } = useRooms()`}
        />
      </Section>
    </div>
  )
}

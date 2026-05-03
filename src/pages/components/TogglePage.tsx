import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'

function ToggleButton({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        padding: '8px 22px',
        background: on ? 'var(--text-primary)' : 'transparent',
        color: on ? 'var(--bg-card)' : 'var(--text-primary)',
        border: '1.5px solid var(--text-primary)',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
        letterSpacing: '0.1em',
        transition: 'all 0.2s',
      }}
    >
      {on ? 'ON' : 'OFF'}
    </button>
  )
}

const PROPS: PropDef[] = [
  { name: 'on',       type: 'boolean',   description: 'Whether the underlying device/state is active.' },
  { name: 'onChange', type: '() => void', description: 'Called when the user taps to flip the state.' },
]

export default function TogglePage() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Components"
        title="Toggle"
        description="Outlined pill that fills when active. Drives device on/off across rooms — the most common control after the Slider."
      />

      <ComponentPreview
        code={`const [on, setOn] = useState(true)

<ToggleButton on={on} onChange={() => setOn(v => !v)} />`}
      >
        <ToggleButton on={a} onChange={() => setA((v) => !v)} />
        <ToggleButton on={b} onChange={() => setB((v) => !v)} />
      </ComponentPreview>

      <Section title="Why not Switch?" description="Switches imply persistent state changes (settings, preferences). Toggle here is for transient device control: tap-to-flip a light, fan, or speaker. The pill also reads better in the Nothing aesthetic where everything is rounded.">
        <CodeBlock
          language="tsx"
          code={`function ToggleButton({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        padding: '8px 22px',
        background: on ? 'var(--text-primary)' : 'transparent',
        color: on ? 'var(--bg-card)' : 'var(--text-primary)',
        border: '1.5px solid var(--text-primary)',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
        letterSpacing: '0.1em',
      }}
    >
      {on ? 'ON' : 'OFF'}
    </button>
  )
}`}
        />
      </Section>

      <Section title="Props">
        <PropsTable props={PROPS} />
      </Section>
    </div>
  )
}

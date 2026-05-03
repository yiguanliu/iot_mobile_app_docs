import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'

function SceneChip({ active, label, onClick }: { active: boolean; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 16px',
        borderRadius: 'var(--radius-pill)',
        background: active ? 'var(--text-primary)' : 'var(--bg-card)',
        color: active ? 'var(--bg-card)' : 'var(--text-primary)',
        border: active ? 'none' : '1px solid var(--border, transparent)',
        boxShadow: active ? 'none' : 'var(--card-shadow, none)',
        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
        letterSpacing: '0.08em',
        transition: 'all 0.2s',
      }}
    >
      {label}
    </button>
  )
}

const PROPS: PropDef[] = [
  { name: 'active', type: 'boolean', description: 'Inverts foreground/background to indicate selection.' },
  { name: 'label',  type: 'string',  description: 'Display text — usually a single word, all caps.' },
]

const SCENES = ['FOCUS', 'CALM', 'SOCIAL', 'SLEEP', 'AWAY']

export default function SceneChipPage() {
  const [active, setActive] = useState('FOCUS')

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Components"
        title="Scene Chip"
        description="Pill-shaped toggle used in the Home page scene strip. Active state inverts background and foreground to read at a glance."
      />

      <ComponentPreview
        code={`<SceneChip active={true}  label="FOCUS" />
<SceneChip active={false} label="CALM" />`}
      >
        <SceneChip active={true} label="FOCUS" />
        <SceneChip active={false} label="CALM" />
      </ComponentPreview>

      <Section title="Interactive group" description="Tap a chip to set the active scene.">
        <ComponentPreview
          code={`{SCENES.map(s => (
  <SceneChip
    key={s}
    label={s}
    active={s === active}
    onClick={() => setActive(s)}
  />
))}`}
        >
          {SCENES.map((s) => (
            <SceneChip key={s} label={s} active={s === active} onClick={() => setActive(s)} />
          ))}
        </ComponentPreview>
      </Section>

      <Section title="Props">
        <PropsTable props={PROPS} />
      </Section>
    </div>
  )
}

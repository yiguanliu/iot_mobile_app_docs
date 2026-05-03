import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'

interface Scene {
  id: string
  label: string
  description: string
}

const SCENES: Scene[] = [
  { id: 'focus',  label: 'FOCUS',  description: 'Bright cool light, low ambient sound' },
  { id: 'calm',   label: 'CALM',   description: 'Warm dim light, minimal stimulation' },
  { id: 'social', label: 'SOCIAL', description: 'Even warm light across living spaces' },
  { id: 'sleep',  label: 'SLEEP',  description: 'Lights down, bedroom warm 5%' },
  { id: 'away',   label: 'AWAY',   description: 'Off everywhere, security on' },
]

function SceneStripBlock({ active, onPick }: { active: string | null; onPick: (id: string) => void }) {
  const activeScene = SCENES.find((s) => s.id === active)
  return (
    <div className="flex flex-col gap-3" style={{ width: '100%', maxWidth: 480 }}>
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--text-muted)', letterSpacing: '0.1em',
        }}>
          {activeScene ? 'ACTIVE SCENE' : 'NO SCENE — MANUAL'}
        </div>
        {activeScene && (
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 13,
            color: 'var(--text-secondary)', marginTop: 4,
          }}>
            {activeScene.description}
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' as any }}>
        {SCENES.map((s) => {
          const isActive = active === s.id
          return (
            <button
              key={s.id}
              onClick={() => onPick(s.id)}
              style={{
                flex: '0 0 auto',
                padding: '10px 16px',
                borderRadius: 'var(--radius-pill)',
                background: isActive ? 'var(--text-primary)' : 'var(--bg-card)',
                color: isActive ? 'var(--bg-card)' : 'var(--text-primary)',
                border: isActive ? 'none' : '1px solid var(--border, transparent)',
                boxShadow: isActive ? 'none' : 'var(--card-shadow, none)',
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.08em',
                transition: 'all 0.2s',
              }}
            >
              {s.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function SceneStripPage() {
  const [active, setActive] = useState<string | null>('focus')

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Blocks"
        title="Scene Strip"
        description="The horizontal scene picker from the Home page. Composes a context label, an active scene description, and a horizontally scrolling group of Scene Chips. A scene click applies a declarative per-room state map server-side."
      />

      <ComponentPreview
        align="start"
        minHeight={180}
        code={`<SceneStripBlock
  active={active}
  onPick={setActive}
/>`}
      >
        <SceneStripBlock active={active} onPick={setActive} />
      </ComponentPreview>

      <Section title="Anatomy">
        <ul>
          <li><strong>Header label</strong> — uses <code>--font-mono</code> at 10px, all caps. Switches between <code>"ACTIVE SCENE"</code> and <code>"NO SCENE — MANUAL"</code>.</li>
          <li><strong>Active scene description</strong> — only renders when a scene is picked. Sans body copy.</li>
          <li><strong>Chip row</strong> — overflow-x: auto so it scrolls on mobile but flows naturally on desktop. <code>scrollbarWidth: none</code>.</li>
        </ul>
      </Section>

      <Section title="Scene shape" description="Scenes are declarative objects, not React components. The strip just renders chips; the scene engine (server-side) consumes the picked id.">
        <CodeBlock
          language="ts"
          code={`interface Scene {
  id: string
  label: string
  description: string
}

// Per-scene output map applied on pick:
type SceneOutputs = Record<
  /* sceneId */ string,
  Record</* roomId */ string, { brightness: number; on: boolean }>
>`}
        />
      </Section>
    </div>
  )
}

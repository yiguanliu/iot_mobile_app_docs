import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { CodeBlock } from '@/components/docs/CodeBlock'

const EASINGS = [
  { name: 'Nothing', value: 'cubic-bezier(0.16, 1, 0.3, 1)',  description: 'Decisive ease-out — snaps in and settles' },
  { name: 'Modern',  value: 'cubic-bezier(0.4, 0, 0.2, 1)',   description: 'Material-style; symmetric ease-in-out' },
  { name: 'Y2K',     value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', description: 'Spring-bouncy — overshoots, then resolves' },
] as const

const DURATIONS = [
  { name: '--duration-fast', use: 'Hover, focus, micro-interactions',           values: { Nothing: '180ms', Modern: '150ms', Y2K: '260ms' } },
  { name: '--duration-slow', use: 'Sheet open, scene change, ambient transitions', values: { Nothing: '700ms', Modern: '400ms', Y2K: '800ms' } },
]

function Bouncer({ easing, duration }: { easing: string; duration: number }) {
  const [pos, setPos] = useState(0)
  return (
    <div className="flex w-full items-center gap-3">
      <button
        onClick={() => setPos((p) => (p === 0 ? 1 : 0))}
        className="rounded-md border border-docs-border bg-docs-bg px-3 py-1.5 text-[12px] font-medium hover:bg-docs-card"
      >
        Animate
      </button>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-docs-card">
        <motion.div
          className="absolute top-0 h-full w-8 rounded-full bg-docs-fg"
          animate={{ left: pos === 0 ? '0%' : 'calc(100% - 32px)' }}
          transition={{ duration: duration / 1000, ease: easing as any }}
        />
      </div>
    </div>
  )
}

export default function MotionPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Foundations"
        title="Motion"
        description="Each theme defines its own easing curve and duration scale. Components reference --easing / --duration-fast / --duration-slow rather than literal values, so swapping themes shifts the animation feel."
      />

      <Section title="Easing curves">
        <div className="mt-6 flex flex-col gap-4">
          {EASINGS.map((e) => (
            <div key={e.name} className="rounded-lg border border-docs-border p-4">
              <div className="mb-2 flex items-baseline gap-3">
                <span className="text-[14px] font-semibold">{e.name}</span>
                <code className="font-docs-mono text-[11px] text-docs-muted">{e.value}</code>
              </div>
              <p className="mb-3 text-[13px] text-docs-muted">{e.description}</p>
              <Bouncer easing={e.value} duration={500} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Duration scale">
        <div className="mt-6 overflow-hidden rounded-lg border border-docs-border">
          <table className="w-full text-[13px]">
            <thead className="bg-docs-card">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Token</th>
                <th className="px-4 py-2.5 text-left font-medium">Use</th>
                {EASINGS.map((e) => (
                  <th key={e.name} className="px-4 py-2.5 text-left font-medium">{e.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DURATIONS.map((d, i) => (
                <tr key={d.name} className={i > 0 ? 'border-t border-docs-border' : ''}>
                  <td className="px-4 py-3 align-top">
                    <code className="font-docs-mono text-[12px]">{d.name}</code>
                  </td>
                  <td className="px-4 py-3 align-top text-docs-muted">{d.use}</td>
                  {EASINGS.map((e) => (
                    <td key={e.name} className="px-4 py-3 align-top">
                      <code className="font-docs-mono text-[12px] text-docs-muted">{(d.values as any)[e.name]}</code>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          language="tsx"
          code={`// Inline style
<button style={{
  transition: 'all var(--duration-fast) var(--easing)',
}}>
  Save
</button>

// Framer Motion
<motion.div
  animate={{ opacity: 1 }}
  transition={{
    duration: 0.18,           // matches --duration-fast in Nothing
    ease: [0.16, 1, 0.3, 1],  // matches --easing in Nothing
  }}
/>`}
        />
      </Section>
    </div>
  )
}

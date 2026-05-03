import { motion } from 'framer-motion'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'

function StatusDot({ color = 'var(--accent)', label = 'LIVE' }: { color?: string; label?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ position: 'relative', display: 'inline-block', width: 8, height: 8 }}>
        <motion.span
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color, opacity: 0.3 }}
          animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }} />
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
        color: 'var(--text-primary)', letterSpacing: '0.1em',
      }}>
        {label}
      </span>
    </div>
  )
}

const PROPS: PropDef[] = [
  { name: 'color', type: 'string', default: '"var(--accent)"', description: 'Dot + halo color. Pass any CSS color or token.' },
  { name: 'label', type: 'string', default: '"LIVE"',          description: 'Mono caption to the right of the dot.' },
]

export default function StatusDotPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Components"
        title="Status Dot"
        description="Pulsing indicator. Two stacked circles — solid core + outer halo that scales and fades on a 2s loop. Color carries semantic weight: accent for live, accent-alt for OK, custom for anything else."
      />

      <ComponentPreview
        minHeight={120}
        code={`<StatusDot color="var(--accent)"     label="LIVE" />
<StatusDot color="var(--accent-alt)" label="OK" />
<StatusDot color="var(--text-muted)" label="IDLE" />`}
      >
        <StatusDot color="var(--accent)" label="LIVE" />
        <StatusDot color="var(--accent-alt)" label="OK" />
        <StatusDot color="var(--text-muted)" label="IDLE" />
      </ComponentPreview>

      <Section title="Props">
        <PropsTable props={PROPS} />
      </Section>
    </div>
  )
}

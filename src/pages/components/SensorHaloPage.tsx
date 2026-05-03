import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Slider } from '@/components/ui/slider'

function SensorHalo({ intensity }: { intensity: number }) {
  // intensity 0..1 → halo opacity + radius
  const r = 18 + intensity * 22
  const opacity = 0.05 + intensity * 0.35
  return (
    <svg width={140} height={100} viewBox="0 0 140 100">
      <motion.circle
        cx={70} cy={50} r={r}
        fill="var(--accent)"
        animate={{ opacity, r }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={70} cy={50} r={r * 0.5}
        fill="var(--accent)"
        animate={{ opacity: opacity * 1.4 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export default function SensorHaloPage() {
  const [intensity, setIntensity] = useState(0.6)

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Components"
        title="Sensor Halo"
        description="Two stacked circles whose radius and opacity are functions of an intensity value. Used in floorplan zones to make brightness visible at a glance — a dim room produces a faint dot; a bright room produces a strong glow."
      />

      <ComponentPreview
        minHeight={200}
        code={`<SensorHalo intensity={0.6} />`}
      >
        <div className="flex flex-col items-center gap-3" style={{ width: 240 }}>
          <SensorHalo intensity={intensity} />
          <Slider value={[intensity * 100]} onValueChange={([v]) => setIntensity(v / 100)} min={0} max={100} step={1} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>
            INTENSITY {Math.round(intensity * 100)}%
          </span>
        </div>
      </ComponentPreview>

      <Section title="Why two circles?" description="A single radial gradient gets noisy at low intensity. Two solid circles with separately tweened opacities give a clearer 'core + halo' that scales linearly with intensity and stays legible against busy backgrounds.">
        <CodeBlock
          language="tsx"
          code={`function SensorHalo({ intensity }: { intensity: number }) {
  const r = 18 + intensity * 22         // outer halo
  const opacity = 0.05 + intensity * 0.35

  return (
    <svg viewBox="0 0 140 100">
      <motion.circle cx={70} cy={50} r={r}
        fill="var(--accent)"
        animate={{ opacity, r }}
        transition={{ duration: 0.9, ease: 'easeInOut' }} />
      <motion.circle cx={70} cy={50} r={r * 0.5}
        fill="var(--accent)"
        animate={{ opacity: opacity * 1.4 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }} />
    </svg>
  )
}`}
        />
      </Section>
    </div>
  )
}

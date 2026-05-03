import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Slider } from '@/components/ui/slider'

export default function SliderPage() {
  const [v, setV] = useState(60)

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Components"
        title="Slider"
        description="Drag-to-set continuous control. Wraps Radix Slider primitive, styled with theme tokens. Used for brightness, volume, temperature."
      />

      <ComponentPreview
        minHeight={140}
        code={`const [v, setV] = useState(60)

<Slider
  value={[v]}
  onValueChange={([n]) => setV(n)}
  min={0} max={100} step={1}
/>`}
      >
        <div className="w-full max-w-[320px] space-y-2">
          <div className="flex justify-between font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <span style={{ letterSpacing: '0.1em' }}>BRIGHTNESS</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{v}%</span>
          </div>
          <Slider value={[v]} onValueChange={([n]) => setV(n)} min={0} max={100} step={1} />
        </div>
      </ComponentPreview>

      <Section title="Installation">
        <CodeBlock language="bash" code={`npm i @radix-ui/react-slider`} />
        <p>Then copy <code>src/components/ui/slider.tsx</code> into your project.</p>
      </Section>

      <Section title="Why not native input[range]?" description="Cross-browser thumb styling is inconsistent and accessibility (keyboard, focus ring) varies. Radix Slider gives the same hooks for free and lets us style the track / range / thumb with Tailwind utilities that follow theme tokens.">
        <div />
      </Section>
    </div>
  )
}

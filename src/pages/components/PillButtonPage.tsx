import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'

function PillButton({ variant = 'primary', label = 'BUTTON' }: { variant?: 'primary' | 'secondary' | 'ghost'; label?: string }) {
  const styles: Record<string, React.CSSProperties> = {
    primary:   { background: 'var(--text-primary)', color: 'var(--bg-card)', border: 'none' },
    secondary: { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1.5px solid var(--text-primary)' },
    ghost:     { background: 'transparent', color: 'var(--text-secondary)', border: '1.5px solid var(--border, transparent)' },
  }
  return (
    <button
      style={{
        padding: '8px 18px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
        letterSpacing: '0.1em',
        ...styles[variant],
      }}
    >
      {label}
    </button>
  )
}

export default function PillButtonPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Components"
        title="Pill Button"
        description="The original inline-styled button used throughout the IoT app — predates the shadcn-pattern Button. Documented here for parity; new code should prefer Button."
      />

      <div className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
        <strong>Note:</strong> Pill Button is being deprecated in favor of <a className="underline" href="/components/button">Button</a>, which uses the shadcn pattern (cva + Radix). Existing call sites continue to work.
      </div>

      <ComponentPreview
        code={`<PillButton variant="primary"   label="PRIMARY" />
<PillButton variant="secondary" label="SECONDARY" />
<PillButton variant="ghost"     label="GHOST" />`}
      >
        <PillButton variant="primary" label="PRIMARY" />
        <PillButton variant="secondary" label="SECONDARY" />
        <PillButton variant="ghost" label="GHOST" />
      </ComponentPreview>

      <Section title="Migration to Button" description="Variants map 1:1. Sizing was previously hand-rolled per call site; the new Button has explicit sm/md/lg sizes.">
        <CodeBlock
          language="tsx"
          code={`// Before
<PillButton variant="primary" label="SAVE" />

// After
import { Button } from '@/components/ui/button'
<Button variant="primary" size="md">SAVE</Button>`}
        />
      </Section>
    </div>
  )
}

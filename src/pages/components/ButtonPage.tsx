import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'
import { Button } from '@/components/ui/button'

const PROPS: PropDef[] = [
  { name: 'variant',  type: '"primary" | "secondary" | "ghost" | "destructive"', default: '"primary"', description: 'Visual emphasis.' },
  { name: 'size',     type: '"sm" | "md" | "lg"',                                 default: '"md"',      description: 'Height + horizontal padding + text size.' },
  { name: 'shape',    type: '"pill" | "square"',                                  default: '"pill"',    description: 'Border-radius — pill follows --radius-pill, square follows --radius-tight.' },
  { name: 'asChild',  type: 'boolean',                                            default: 'false',     description: 'Render as a Radix Slot — useful for wrapping a Link without losing the styling.' },
]

export default function ButtonPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Components"
        title="Button"
        description="The base interactive element. Built with cva + Radix Slot, styled by Tailwind utilities that resolve to the active theme."
      />

      <ComponentPreview
        code={`<Button>PRIMARY</Button>
<Button variant="secondary">SECONDARY</Button>
<Button variant="ghost">GHOST</Button>
<Button variant="destructive">DESTRUCTIVE</Button>`}
      >
        <Button>PRIMARY</Button>
        <Button variant="secondary">SECONDARY</Button>
        <Button variant="ghost">GHOST</Button>
        <Button variant="destructive">DESTRUCTIVE</Button>
      </ComponentPreview>

      <Section title="Installation">
        <CodeBlock
          language="bash"
          code={`npm i class-variance-authority clsx tailwind-merge @radix-ui/react-slot`}
        />
        <p>Then copy <code>src/components/ui/button.tsx</code> into your project.</p>
      </Section>

      <Section title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Button } from '@/components/ui/button'

export function Example() {
  return <Button onClick={() => console.log('click')}>Save</Button>
}`}
        />
      </Section>

      <Section title="Sizes">
        <ComponentPreview
          code={`<Button size="sm">SMALL</Button>
<Button size="md">MEDIUM</Button>
<Button size="lg">LARGE</Button>`}
        >
          <Button size="sm">SMALL</Button>
          <Button size="md">MEDIUM</Button>
          <Button size="lg">LARGE</Button>
        </ComponentPreview>
      </Section>

      <Section title="Shapes">
        <ComponentPreview
          code={`<Button shape="pill">PILL</Button>
<Button shape="square">SQUARE</Button>`}
        >
          <Button shape="pill">PILL</Button>
          <Button shape="square">SQUARE</Button>
        </ComponentPreview>
      </Section>

      <Section title="As child" description="Wrap an anchor or react-router Link without losing the button styling.">
        <CodeBlock
          language="tsx"
          code={`<Button asChild>
  <a href="/lighting">Open Lighting</a>
</Button>`}
        />
      </Section>

      <Section title="Props">
        <PropsTable props={PROPS} />
      </Section>
    </div>
  )
}

import { PageHeader } from '@/components/docs/PageHeader'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Section } from '@/components/docs/Section'

export default function InstallationPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Getting Started"
        title="Installation"
        description="Run the docs site locally."
      />

      <Section title="Prerequisites" description="Node 18+ and npm 9+. The main IoT app does not need to be running for the docs to render — they share design tokens but live previews are self-contained.">
        <div />
      </Section>

      <Section title="Clone & install">
        <CodeBlock language="bash" code={`git clone https://github.com/yiguanliu/iot_mobile_app.git
cd iot_mobile_app/iot_mobile_app_docs   # this docs project
npm install`} />
      </Section>

      <Section title="Run the dev server">
        <CodeBlock language="bash" code={`npm run dev   # http://localhost:5174`} />
        <p>The docs site uses port <code>5174</code> so it can run alongside the main app on <code>5173</code>.</p>
      </Section>

      <Section title="Build for production">
        <CodeBlock language="bash" code={`npm run build
npm run preview`} />
      </Section>
    </div>
  )
}

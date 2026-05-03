import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'

function CardSurface({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-card)',
        border: 'var(--card-border, none)',
        boxShadow: 'var(--card-shadow, none)',
        padding: 16,
        width: 280,
      }}
    >
      {children}
    </div>
  )
}

export default function CardPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Components"
        title="Card"
        description="The base container surface. Every titled tile in the app is a Card. Theme owns the background, radius, shadow, and border — the component itself doesn't care."
      />

      <ComponentPreview
        code={`<CardSurface>
  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10,
                color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
    HEADER
  </div>
  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16,
                fontWeight: 600, marginTop: 4 }}>
    Title
  </div>
  <p style={{ fontSize: 12, color: 'var(--text-secondary)',
              marginTop: 6, lineHeight: 1.5 }}>
    Body copy fills the rest.
  </p>
</CardSurface>`}
      >
        <CardSurface>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            HEADER
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>
            Title
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
            Body copy fills the rest. Useful for any titled surface.
          </p>
        </CardSurface>
      </ComponentPreview>

      <Section title="Theme tokens that matter" description="A Card reads four CSS variables. Switching theme redefines them — the component code is unchanged.">
        <CodeBlock
          language="css"
          code={`/* Nothing */
--bg-card:    #FFFFFF;
--card-border: none;
--card-shadow: none;
--radius-card: 20px;

/* Modern */
--bg-card:    #FFFFFF;
--card-border: 1px solid #E4E4E7;
--card-shadow: 0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.04);
--radius-card: 14px;

/* Y2K */
--bg-card:    rgba(255,255,255,.62);     /* glassy */
--card-border: 1px solid rgba(255,255,255,.6);
--card-shadow: 0 8px 24px rgba(80,140,220,.22), inset 0 1px 0 rgba(255,255,255,.95);
--radius-card: 28px;`}
        />
      </Section>
    </div>
  )
}

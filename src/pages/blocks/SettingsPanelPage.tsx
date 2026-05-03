import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { THEME_LIST, useTheme } from '@/state/theme'

function ThemeCard({ id, label, swatches, tagline, active, onPick }: { id: string; label: string; swatches: [string, string, string]; tagline: string; active: boolean; onPick: () => void }) {
  return (
    <button
      onClick={onPick}
      style={{
        flex: 1, minWidth: 0, textAlign: 'left',
        padding: 16,
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-card)',
        border: active ? '2px solid var(--text-primary)' : 'var(--card-border, none)',
        boxShadow: 'var(--card-shadow, none)',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>STYLE</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
        </div>
        {active && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, background: 'var(--text-primary)', color: 'var(--bg-card)', padding: '4px 10px', borderRadius: 'var(--radius-pill)', letterSpacing: '0.1em' }}>
            ACTIVE
          </span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {swatches.map((c, i) => (
          <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: c, border: '1px solid rgba(0,0,0,0.06)' }} />
        ))}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        {tagline}
      </div>
    </button>
  )
}

function ColorRow({ label, value, custom }: { label: string; value: string; custom?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-tight, 12px)',
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-tight, 10px)', background: value, border: '1px solid rgba(0,0,0,0.12)' }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.06em' }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
          {value} {custom && <span style={{ color: 'var(--accent)' }}>· custom</span>}
        </div>
      </div>
      {custom && (
        <button style={{ width: 28, height: 28, borderRadius: 'var(--radius-pill)', background: 'var(--bg-card-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RotateCcw size={12} strokeWidth={2} color="var(--text-secondary)" />
        </button>
      )}
    </div>
  )
}

function SettingsPanelBlock() {
  const { themeId, setTheme, theme } = useTheme()
  const [accentCustom] = useState(false)

  return (
    <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.1em' }}>settings</div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>System UI</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>APPEARANCE</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {THEME_LIST.map((t) => (
            <ThemeCard
              key={t.id} id={t.id} label={t.label}
              swatches={t.swatches} tagline={t.tagline}
              active={themeId === t.id}
              onPick={() => setTheme(t.id)}
            />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>CUSTOMIZE</div>
        <ColorRow label="ACCENT"       value={theme.vars['--accent']}       custom={accentCustom} />
        <ColorRow label="TEXT PRIMARY" value={theme.vars['--text-primary']} />
        <ColorRow label="BACKGROUND"   value={theme.vars['--bg']} />
      </div>
    </div>
  )
}

export default function SettingsPanelPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Blocks"
        title="Settings Panel"
        description="The full Settings page composition: theme picker on top, color customization in the middle. Picking a theme card live-applies it; the Customize section overrides individual color tokens per-theme."
      />

      <ComponentPreview
        align="start"
        minHeight={620}
        code={`<SettingsPanelBlock />`}
      >
        <SettingsPanelBlock />
      </ComponentPreview>

      <Section title="Override semantics" description="Color overrides are scoped per-theme — your customized accent in Nothing is preserved when you switch to Modern and back. Switching themes never silently inherits another theme's overrides.">
        <ul>
          <li><strong>Per-row reset</strong> — small RotateCcw button next to a customized row reverts just that token.</li>
          <li><strong>RESET ALL</strong> — clears every override for the active theme. Other themes' overrides are untouched.</li>
          <li><strong>Persistence</strong> — overrides live in <code>localStorage</code> under <code>home-os.theme-overrides</code> as JSON keyed by theme id.</li>
        </ul>
      </Section>
    </div>
  )
}

import { Home, LayoutGrid, Lightbulb, Zap, Settings } from 'lucide-react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'

function NavTile({ icon: Icon, label, active }: { icon: any; label: string; active: boolean }) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        padding: '8px 16px',
        borderRadius: 'var(--radius-tight, 8px)',
        background: active ? 'var(--bg-card-dark)' : 'transparent',
        position: 'relative',
      }}
    >
      <Icon size={20} strokeWidth={1.75} color={active ? 'var(--text-primary)' : 'var(--text-muted)'} />
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: active ? 700 : 400,
        color: active ? 'var(--text-primary)' : 'var(--text-muted)',
        letterSpacing: '0.08em',
      }}>
        {label}
      </span>
      {active && (
        <span style={{
          position: 'absolute', top: -1, left: '20%', right: '20%', height: 2,
          background: 'var(--text-primary)', borderRadius: 2,
        }} />
      )}
    </div>
  )
}

const PROPS: PropDef[] = [
  { name: 'icon',   type: 'LucideIcon',    description: 'Lucide icon component (size + color applied internally).' },
  { name: 'label',  type: 'string',        description: 'All-caps short label, mono caption.' },
  { name: 'active', type: 'boolean',       description: 'Highlights the tile and shows the indicator bar.' },
]

const TABS = [
  { id: 'home',      icon: Home,       label: 'HOME' },
  { id: 'dashboard', icon: LayoutGrid, label: 'DASH' },
  { id: 'lighting',  icon: Lightbulb,  label: 'LIGHT' },
  { id: 'energy',    icon: Zap,        label: 'ENERGY' },
  { id: 'settings',  icon: Settings,   label: 'SET' },
]

export default function NavTilePage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Components"
        title="Nav Tile"
        description="Single bottom-nav / side-rail item. Lucide icon + mono caption + indicator bar. Active state highlights background, bolds the label, and pulls the indicator above (or to the side, in rail mode)."
      />

      <ComponentPreview
        minHeight={120}
        code={`<NavTile icon={Home}      label="HOME"   active={true} />
<NavTile icon={LayoutGrid} label="DASH"  active={false} />`}
      >
        <div className="flex items-end gap-1 rounded-md px-2 py-3" style={{ background: 'var(--bg-card)' }}>
          {TABS.map((t, i) => (
            <NavTile key={t.id} icon={t.icon} label={t.label} active={i === 0} />
          ))}
        </div>
      </ComponentPreview>

      <Section title="Why Lucide?" description="Lucide gives ~1500 icons with a consistent stroke aesthetic. Switching the entire icon system is one prop (size, color) — no per-icon SVG maintenance. Stroke colors flow through CSS variables, so theme switching just works.">
        <div />
      </Section>

      <Section title="Props">
        <PropsTable props={PROPS} />
      </Section>
    </div>
  )
}

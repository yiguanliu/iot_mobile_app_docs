import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/docs/PageHeader'

export default function IntroductionPage() {
  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Home OS"
        title="Design System"
        description="A token-driven, theme-switchable component library for the Home OS IoT prototype. Three visual styles (Nothing, Modern, Y2K) share the same primitives — switch any of them via the top bar to see the same components shift in real time."
      />

      <h2>Principles</h2>
      <ul>
        <li><strong>Tokens, not colors.</strong> Every component reads CSS variables — never hex literals. Themes redefine the variables; components don't change.</li>
        <li><strong>shadcn-pattern primitives.</strong> Button, Slider, etc. use cva + Radix and compose via Tailwind utilities that resolve to the active theme.</li>
        <li><strong>Compositions are first-class.</strong> Blocks (Floorplan, Scene Strip, Zone Tile…) are documented separately from primitives so you can grab a complete pattern, not just a button.</li>
        <li><strong>Override per theme.</strong> The app exposes per-theme color overrides; the docs site mirrors the same theme switcher so you can see exactly what users will see.</li>
      </ul>

      <h2>Where to next</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NavCard to="/installation"      title="Installation" description="Set the docs site up locally." />
        <NavCard to="/theming"           title="Theming"      description="How tokens, themes, and overrides compose." />
        <NavCard to="/colors"            title="Colors"       description="Every token, in every theme." />
        <NavCard to="/components/button" title="Button"       description="The first shadcn-pattern primitive." />
      </div>
    </div>
  )
}

function NavCard({ to, title, description }: { to: string; title: string; description: string }) {
  return (
    <Link
      to={to}
      className="group block rounded-lg border border-docs-border bg-docs-bg p-4 transition-colors hover:border-docs-fg/30"
    >
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold">{title}</span>
        <ArrowRight size={14} className="text-docs-muted transition-transform group-hover:translate-x-0.5" />
      </div>
      <p className="mt-1 text-[13px] text-docs-muted">{description}</p>
    </Link>
  )
}

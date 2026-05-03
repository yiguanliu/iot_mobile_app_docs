import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { ThemeSwitcher } from './ThemeSwitcher'

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-docs-border bg-docs-bg/85 backdrop-blur">
      <div className="flex h-14 items-center gap-4 px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-docs-fg text-[10px] font-bold text-docs-bg">
            HOS
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Home OS / Design System</span>
        </Link>
        <span className="hidden text-xs text-docs-muted md:inline">v0.1 · prototype</span>

        <div className="ml-auto flex items-center gap-3">
          <ThemeSwitcher />
          <a
            href="https://github.com/yiguanliu/iot_mobile_app"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium text-docs-muted hover:bg-docs-card hover:text-docs-fg"
          >
            GitHub
            <ExternalLink size={12} strokeWidth={2} />
          </a>
        </div>
      </div>
    </header>
  )
}

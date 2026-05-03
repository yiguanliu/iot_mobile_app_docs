import { THEME_LIST, useTheme } from '@/state/theme'
import { cn } from '@/lib/utils'

export function ThemeSwitcher() {
  const { themeId, setTheme } = useTheme()

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-docs-border bg-docs-card p-1">
      {THEME_LIST.map((t) => {
        const active = themeId === t.id
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={cn(
              'flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              active
                ? 'bg-docs-fg text-docs-bg'
                : 'text-docs-muted hover:text-docs-fg'
            )}
            aria-pressed={active}
          >
            <span className="flex gap-1">
              {t.swatches.map((c, i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10"
                  style={{ background: c }}
                />
              ))}
            </span>
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

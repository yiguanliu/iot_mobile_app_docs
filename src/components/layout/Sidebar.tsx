import { NavLink } from 'react-router-dom'
import { NAV } from '@/data/nav'
import { cn } from '@/lib/utils'

export function Sidebar() {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[240px] shrink-0 overflow-y-auto border-r border-docs-border md:block">
      <nav className="px-4 py-6">
        {NAV.map((section) => (
          <div key={section.label} className="mb-6">
            <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-docs-fg">
              {section.label}
            </div>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const to = '/' + item.slug
                return (
                  <li key={item.slug || 'index'}>
                    <NavLink
                      to={to}
                      end={item.slug === ''}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between rounded-md px-2 py-1.5 text-[13px]',
                          isActive
                            ? 'bg-docs-card font-medium text-docs-fg'
                            : 'text-docs-muted hover:text-docs-fg'
                        )
                      }
                    >
                      {item.label}
                      {!item.ready && (
                        <span className="rounded-full bg-docs-card px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-docs-muted">
                          Soon
                        </span>
                      )}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

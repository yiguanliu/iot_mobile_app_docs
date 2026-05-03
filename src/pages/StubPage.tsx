import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/docs/PageHeader'
import { NAV } from '@/data/nav'

/**
 * Catch-all for nav items marked `ready: false`. Shows a friendly "coming soon"
 * with the page title pulled from the nav config. Lets the sidebar list the
 * full design system upfront without needing every page implemented.
 */
export default function StubPage() {
  const params = useParams()
  const navigate = useNavigate()
  const fullPath = '*' in params && params['*']
    ? params['*']
    : Object.values(params).filter(Boolean).join('/')

  // Find the matching nav item
  const item = NAV.flatMap((s) => s.items).find((i) => i.slug === fullPath)
  const label = item?.label ?? 'Coming soon'

  return (
    <div className="prose-docs">
      <PageHeader
        eyebrow="Coming Soon"
        title={label}
        description="This page is part of the design system but hasn't been documented yet. The component or block exists in the main IoT app — the docs are catching up."
      />

      <button
        onClick={() => navigate(-1)}
        className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-docs-muted hover:text-docs-fg"
      >
        <ArrowLeft size={14} />
        Back
      </button>
    </div>
  )
}

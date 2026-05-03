interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 border-b border-docs-border pb-8">
      {eyebrow && (
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-docs-muted">
          {eyebrow}
        </div>
      )}
      <h1 className="text-[36px] font-bold tracking-tight leading-[1.1]">{title}</h1>
      {description && (
        <p className="mt-3 max-w-prose text-[15px] leading-[1.65] text-docs-muted">
          {description}
        </p>
      )}
    </div>
  )
}

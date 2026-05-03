interface SectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function Section({ title, description, children }: SectionProps) {
  return (
    <section className="mt-12">
      <h2 className="mt-0 border-b border-docs-border pb-2 text-[22px] font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-prose text-[15px] leading-[1.65] text-docs-muted">
          {description}
        </p>
      )}
      {children}
    </section>
  )
}

export interface PropDef {
  name: string
  type: string
  default?: string
  description: string
}

interface PropsTableProps {
  props: PropDef[]
}

export function PropsTable({ props: defs }: PropsTableProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-docs-border">
      <table className="w-full text-[13px]">
        <thead className="bg-docs-card">
          <tr>
            <th className="px-4 py-2.5 text-left font-medium text-docs-fg">Prop</th>
            <th className="px-4 py-2.5 text-left font-medium text-docs-fg">Type</th>
            <th className="px-4 py-2.5 text-left font-medium text-docs-fg">Default</th>
            <th className="px-4 py-2.5 text-left font-medium text-docs-fg">Description</th>
          </tr>
        </thead>
        <tbody>
          {defs.map((p, i) => (
            <tr key={p.name} className={i > 0 ? 'border-t border-docs-border' : ''}>
              <td className="px-4 py-3 align-top">
                <code className="rounded bg-docs-card px-1.5 py-0.5 font-docs-mono text-[12px]">
                  {p.name}
                </code>
              </td>
              <td className="px-4 py-3 align-top">
                <code className="font-docs-mono text-[12px] text-docs-muted">
                  {p.type}
                </code>
              </td>
              <td className="px-4 py-3 align-top text-docs-muted">
                {p.default ?? <span className="text-docs-muted/60">—</span>}
              </td>
              <td className="px-4 py-3 align-top text-docs-muted leading-[1.5]">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

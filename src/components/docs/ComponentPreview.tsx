import * as React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { useTheme } from '@/state/theme'
import { CodeBlock } from './CodeBlock'
import { cn } from '@/lib/utils'

interface ComponentPreviewProps {
  /** The live component(s) to render. Wrapped in a theme-scoped container so the
      preview follows the active app theme regardless of docs chrome styling. */
  children: React.ReactNode
  /** The TSX source string shown in the Code tab. */
  code: string
  /** Optional alignment of the preview area. */
  align?: 'center' | 'start'
  /** Optional fixed minimum height for the preview area. */
  minHeight?: number
  className?: string
}

export function ComponentPreview({
  children,
  code,
  align = 'center',
  minHeight = 220,
  className,
}: ComponentPreviewProps) {
  const { theme } = useTheme()

  // Apply the app theme's CSS variables only inside the preview container,
  // so the docs chrome (sidebar, body copy) uses the constant --docs-* tokens.
  const themeVars = theme.vars as unknown as React.CSSProperties

  return (
    <Tabs.Root defaultValue="preview" className={cn('mt-6', className)}>
      <Tabs.List className="flex border-b border-docs-border">
        <Tabs.Trigger
          value="preview"
          className="border-b-2 border-transparent px-3 py-2 text-[13px] font-medium text-docs-muted data-[state=active]:border-docs-fg data-[state=active]:text-docs-fg"
        >
          Preview
        </Tabs.Trigger>
        <Tabs.Trigger
          value="code"
          className="border-b-2 border-transparent px-3 py-2 text-[13px] font-medium text-docs-muted data-[state=active]:border-docs-fg data-[state=active]:text-docs-fg"
        >
          Code
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="preview">
        <div
          style={{
            ...themeVars,
            background: theme.shellBackground ?? theme.vars['--bg'],
            minHeight,
          }}
          className={cn(
            'flex flex-wrap gap-4 rounded-lg border border-docs-border p-8',
            align === 'center' ? 'items-center justify-center' : 'items-start justify-start'
          )}
        >
          {children}
        </div>
      </Tabs.Content>

      <Tabs.Content value="code">
        <CodeBlock code={code} />
      </Tabs.Content>
    </Tabs.Root>
  )
}

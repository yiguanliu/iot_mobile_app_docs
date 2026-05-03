import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language = 'tsx', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore
    }
  }

  return (
    <div className={cn('group relative overflow-hidden rounded-lg bg-docs-code-bg', className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-white/50">
          {language}
        </span>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-docs-mono text-[13px] leading-[1.6] text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  )
}

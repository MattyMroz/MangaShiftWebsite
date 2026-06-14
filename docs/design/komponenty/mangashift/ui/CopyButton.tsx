import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// ---------------------------------------------------------------------------
// CopyButton — Clipboard copy with visual feedback (icon swap)
// Used in: DashOutputPanel, any text output area
// ---------------------------------------------------------------------------

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [text])

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={className}
      onClick={handleCopy}
      disabled={!text}
      aria-label={copied ? 'Skopiowano' : 'Kopiuj do schowka'}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </Button>
  )
}

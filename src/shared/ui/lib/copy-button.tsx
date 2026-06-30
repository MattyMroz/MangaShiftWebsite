import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/shared/ui/lib/button'






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
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </Button>
  )
}

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/lib/Input'

// ---------------------------------------------------------------------------
// ApiKeyInput — Password input with show/hide toggle + save button
// Used in: ElevenLabsTab, OpenRouterCard
// ---------------------------------------------------------------------------

interface ApiKeyInputProps {
  placeholder?: string
  onSave: (key: string) => void | Promise<void>
  saveLabel?: string
}

export function ApiKeyInput({
  placeholder = 'sk-...',
  onSave,
  saveLabel = 'Zapisz',
}: ApiKeyInputProps) {
  const [value, setValue] = useState('')
  const [showKey, setShowKey] = useState(false)

  const handleSave = async () => {
    if (!value.trim()) return
    await onSave(value)
    setValue('')
  }

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type={showKey ? 'text' : 'password'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          aria-label={showKey ? 'Hide API key' : 'Show API key'}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground btn-press focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]/30 rounded-md"
        >
          {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
      <Button variant="outline" size="sm" onClick={handleSave}>
        {saveLabel}
      </Button>
    </div>
  )
}

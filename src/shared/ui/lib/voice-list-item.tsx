import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/shared/ui/lib/button'






interface VoiceListItemProps {
  title: string
  subtitle?: string
  selected: boolean
  onSelect: () => void
  onPlay?: () => void
}

export function VoiceListItem({
  title,
  subtitle,
  selected,
  onSelect,
  onPlay,
}: VoiceListItemProps) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'flex items-center justify-between w-full rounded-lg px-3 py-2 text-left',
        'transition-colors duration-[var(--motion-base)]',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]/30',
        selected
          ? 'bg-[var(--accent-subtle)] border border-[var(--accent-border)]'
          : 'hover:bg-[var(--overlay)] border border-transparent',
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        {subtitle && <p className="text-[11px] text-dim">{subtitle}</p>}
      </div>
      {onPlay && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0"
          aria-label="Play voice sample"
          onClick={(e) => {
            e.stopPropagation()
            onPlay()
          }}
        >
          <Play size={12} />
        </Button>
      )}
    </button>
  )
}

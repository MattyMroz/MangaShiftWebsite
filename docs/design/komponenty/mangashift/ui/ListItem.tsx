import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/Switch'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Trash2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ---------------------------------------------------------------------------
// ListItem — List row element (regions, voices, profiles)
// Standard: 6 types in OcrPage, TtsPage, DashboardPage, ProfilesPage
// ---------------------------------------------------------------------------

export interface ListItemProps {
  title: string
  subtitle?: string
  /** Klikalny/wybieralny element */
  selectable?: boolean
  selected?: boolean
  onClick?: () => void
  /** Switch po lewej stronie */
  switchProps?: {
    checked: boolean
    onCheckedChange?: (v: boolean) => void
  }
  /** Badge z tekstem po prawej */
  badge?: string
  /** Delete button */
  onDelete?: () => void
  /** Akcja dodatkowa (np. Play) */
  actionIcon?: LucideIcon
  onAction?: () => void
  /** ARIA label for action button */
  actionLabel?: string
  className?: string
}

export function ListItem({
  title,
  subtitle,
  selectable = false,
  selected = false,
  onClick,
  switchProps,
  badge,
  onDelete,
  actionIcon: ActionIcon,
  onAction,
  actionLabel,
  className,
}: ListItemProps) {
  const Comp = selectable ? 'button' : 'div'

  return (
    <Comp
      onClick={onClick}
      {...(selectable ? { type: 'button' as const, 'aria-pressed': selected } : {})}
      className={cn(
        'flex items-center justify-between gap-3 rounded-md px-3 py-2 transition-colors',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]/30',
        selectable
          ? [
              'w-full text-left duration-[var(--motion-base)]',
              selected
                ? 'bg-[var(--accent-subtle)] border border-[var(--accent-border)]'
                : 'hover:bg-[var(--overlay)] border border-transparent',
            ]
          : 'border border-[var(--section-card-border-nested)] bg-[var(--section-card-bg-nested)] hover:bg-[var(--overlay)]',
        className,
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {switchProps && (
          <Switch
            checked={switchProps.checked}
            onCheckedChange={switchProps.onCheckedChange}
          />
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-dim tabular-nums">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {badge && (
          <Badge variant="outline" className="text-xs">
            {badge}
          </Badge>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="flex items-center justify-center min-w-6 min-h-6 rounded-md text-muted-foreground hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]/30"
            aria-label="Delete"
          >
            <Trash2 size={14} />
          </button>
        )}
        {ActionIcon && onAction && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="shrink-0"
            aria-label={actionLabel ?? 'Akcja'}
            onClick={(e) => {
              e.stopPropagation()
              onAction()
            }}
          >
            <ActionIcon size={12} />
          </Button>
        )}
      </div>
    </Comp>
  )
}

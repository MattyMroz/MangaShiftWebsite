import type { KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'
import { Switch } from '@/shared/ui/lib/Switch'
import { Badge } from '@/shared/ui/lib/Badge'
import { Button } from '@/shared/ui/lib/Button'
import { Trash2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ListItemProps {
  title: string
  subtitle?: string
  selectable?: boolean
  selected?: boolean
  onClick?: () => void
  switchProps?: {
    checked: boolean
    onCheckedChange?: (v: boolean) => void
  }
  badge?: string
  onDelete?: () => void
  actionIcon?: LucideIcon
  onAction?: () => void
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
  return (
    <div
      onClick={selectable ? onClick : undefined}
      {...(selectable
        ? {
              role: 'button' as const,
              tabIndex: 0,
              'aria-pressed': selected,
              onKeyDown: (e: KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onClick?.()
                  }
              },
          }
        : {})}
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
            aria-label={actionLabel ?? 'Action'}
            onClick={(e) => {
              e.stopPropagation()
              onAction()
            }}
          >
            <ActionIcon size={12} />
          </Button>
        )}
      </div>
    </div>
  )
}

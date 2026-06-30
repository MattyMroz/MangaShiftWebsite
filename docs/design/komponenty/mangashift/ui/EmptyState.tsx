import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// EmptyState — Fallback gdy lista jest pusta
// Standard: 5 instancji w OcrPage, TtsPage, ProfilesPage
// ---------------------------------------------------------------------------

const paddingMap = {
  sm: 'py-2',
  md: 'py-4',
  lg: 'py-8',
} as const

export interface EmptyStateProps {
  message: string
  icon?: React.ElementType
  description?: string
  children?: React.ReactNode
  size?: keyof typeof paddingMap
  className?: string
}

export function EmptyState({
  message,
  icon: Icon,
  description,
  children,
  size = 'md',
  className,
}: EmptyStateProps) {
  if (Icon) {
    return (
      <div className={cn('flex flex-col items-center justify-center text-center', paddingMap[size], className)}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-[var(--accent-subtle)] border-[var(--accent-border)] mb-3">
          <Icon size={20} strokeWidth={1.5} className="text-[var(--accent-bright)] opacity-60" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
        {description && <p className="text-xs text-dim mt-1 max-w-[240px]">{description}</p>}
        {children && <div className="mt-3">{children}</div>}
      </div>
    )
  }

  return (
    <p
      className={cn(
        'text-sm text-muted-foreground text-center',
        paddingMap[size],
        className,
      )}
    >
      {message}
    </p>
  )
}

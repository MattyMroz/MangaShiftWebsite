import { cn } from '@/lib/utils'
import { neonGlow, useAppStore } from '@/stores/useAppStore'

interface PageHeaderProps {
  icon: React.ElementType
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({ icon: Icon, title, description, children, className }: PageHeaderProps) {
  const neonLevel = useAppStore((s) => s.neonLevel)

  return (
    <div className={cn('flex items-center justify-between gap-4 animate-slide-up', className)}>
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0 border bg-[var(--accent-subtle)] border-[var(--accent-border)] transition-shadow duration-[var(--motion-emphasized)]"
          style={{ boxShadow: neonGlow(neonLevel) }}
        >
          <Icon size={20} strokeWidth={1.7} className="text-[var(--accent-bright)]" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg font-bold leading-tight text-foreground">{title}</h1>
          {description && <p className="text-xs text-dim truncate">{description}</p>}
        </div>
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  )
}

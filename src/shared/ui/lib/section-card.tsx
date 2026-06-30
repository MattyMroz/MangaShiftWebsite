import { cn } from '@/lib/utils'
import { neonGlow, useAppStore } from '@/stores/use-app-store'






export function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon?: React.ElementType
  title?: string
  description?: string
}) {
  const neonLevel = useAppStore((s) => s.neonLevel)

  if (!Icon && !title) return null

  return (
    <div className="flex items-center gap-3">
      {Icon && (
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0 border bg-[var(--accent-subtle)] border-[var(--accent-border)] transition-shadow duration-[var(--motion-emphasized)]"
          style={{ boxShadow: neonGlow(neonLevel) }}
        >
          <Icon size={18} strokeWidth={1.7} className="text-[var(--accent-bright)]" />
        </div>
      )}
      <div className="min-w-0 text-left">
        {title && <h2 className="text-sm font-semibold text-foreground">{title}</h2>}
        {description && <p className="text-xs text-dim">{description}</p>}
      </div>
    </div>
  )
}





interface SectionCardProps {
  icon?: React.ElementType
  title?: string
  description?: string
  children: React.ReactNode
  className?: string

  stagger?: number

  accentLine?: boolean

  glow?: boolean

  divideChildren?: boolean
}

export function SectionCard({
  icon: Icon,
  title,
  description,
  children,
  className,
  stagger = 0,
  accentLine = true,
  glow = true,
  divideChildren = false,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        'section-card rounded-2xl overflow-hidden',
        glow && 'neon-glow-xs',
        accentLine && 'accent-top-line',
        'animate-slide-up',
        className,
      )}
      style={{ animationDelay: stagger > 0 ? `${stagger * 60}ms` : undefined }}
    >
      {(Icon || title) && (
        <div className="px-6 pt-[26px] pb-4">
          <SectionHeader icon={Icon} title={title} description={description} />
        </div>
      )}
      {divideChildren ? (
        <div className="divide-y divide-[var(--border)]">{children}</div>
      ) : (
        children
      )}
    </section>
  )
}

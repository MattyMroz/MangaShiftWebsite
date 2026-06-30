import { cn } from '@/lib/utils'
import { SectionCard } from '@/shared/ui/lib/section-card'

interface StatusCardProps {
  icon: React.ElementType
  label: string
  value: string
  sublabel?: string
  active?: boolean
  className?: string
  stagger?: number
  onClick?: () => void
}

export function StatusCard({
  icon: Icon,
  label,
  value,
  sublabel,
  active = false,
  className,
  stagger = 0,
  onClick,
}: StatusCardProps) {
  return (
    <SectionCard
      accentLine={false}
      glow={true}
      stagger={stagger}
      className={cn(
        'rounded-xl p-4',
        'transition-colors duration-[var(--motion-base)]',
        onClick && 'cursor-pointer hover:bg-[var(--overlay)]',
        className,
      )}
    >
      <div
        className="contents"
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      >
        <div className="flex items-center gap-2.5 mb-2">
          <Icon
            size={16}
            strokeWidth={1.7}
            className={active ? 'text-[var(--accent-bright)]' : 'text-muted-foreground'}
          />
          <span className="text-xs font-medium text-dim uppercase tracking-wider">{label}</span>
        </div>
        <p className="text-lg font-bold text-foreground truncate">{value}</p>
        {sublabel && <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>}
      </div>
    </SectionCard>
  )
}

import { cn } from '@/lib/utils'
import { Label } from '@/shared/ui/lib/Label'
import type { LucideIcon } from 'lucide-react'

// ---------------------------------------------------------------------------
// FormField — Label + kontrolka (Select / Input / Textarea)
// Standard: 19 instancji w TtsPage, TranslationPage, DashboardPage, ProfilesPage
// ---------------------------------------------------------------------------

export interface FormFieldProps {
  label: string
  icon?: LucideIcon
  /** 'sm' = text-sm (default), 'xs' = text-xs text-dim (compact) */
  labelSize?: 'sm' | 'xs'
  /** flex-1 — stretches inside parent flex/grid */
  grow?: boolean
  className?: string
  children: React.ReactNode
}

export function FormField({
  label,
  icon: Icon,
  labelSize = 'sm',
  grow,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', grow && 'flex-1', className)}>
      <Label
        className={cn(
          labelSize === 'xs' ? 'text-xs text-dim' : 'text-sm',
          Icon && 'flex items-center gap-2',
        )}
      >
        {Icon && <Icon size={14} strokeWidth={1.7} />}
        {label}
      </Label>
      {children}
    </div>
  )
}

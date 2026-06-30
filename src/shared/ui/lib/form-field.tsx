import { cn } from '@/lib/utils'
import { Label } from '@/shared/ui/lib/label'
import type { LucideIcon } from 'lucide-react'






export interface FormFieldProps {
  label: string
  icon?: LucideIcon

  labelSize?: 'sm' | 'xs'

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

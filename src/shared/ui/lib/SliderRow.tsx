import { cn } from '@/lib/utils'
import { Label } from '@/shared/ui/lib/Label'
import { Slider } from '@/shared/ui/lib/Slider'
import type { LucideIcon } from 'lucide-react'

// ---------------------------------------------------------------------------
// SliderRow — Label + value + Slider
// Standard: 23 instancje w OcrPage, TtsPage, DashboardPage
// ---------------------------------------------------------------------------

export interface SliderRowProps {
  label: string
  icon?: LucideIcon
  value: number
  onValueChange: (value: number) => void
  onValueCommit?: () => void
  min: number
  max: number
  step: number
  /** Format of the displayed value, e.g. (v) => `${v}%` */
  formatValue?: (value: number) => string
  className?: string
}

export function SliderRow({
  label,
  icon: Icon,
  value,
  onValueChange,
  onValueCommit,
  min,
  max,
  step,
  formatValue,
  className,
}: SliderRowProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center justify-between">
        <Label className={cn('text-sm', Icon && 'flex items-center gap-2')}>
          {Icon && (
            <Icon
              size={14}
              strokeWidth={1.7}
              className="text-[var(--accent-bright)]"
            />
          )}
          {label}
        </Label>
        <span className="text-xs font-semibold text-foreground tabular-nums">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onValueChange(v)}
        onValueCommit={onValueCommit}
        min={min}
        max={max}
        step={step}
        aria-label={label}
      />
    </div>
  )
}

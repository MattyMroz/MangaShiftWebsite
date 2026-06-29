import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import type { LucideIcon } from 'lucide-react'

// ---------------------------------------------------------------------------
// SettingRow — Label (with optional icon / description) + control on the right
//
// Dwa tryby:
//   1. Switch mode — podaj checked + onCheckedChange (backward compat)
//   2. Generic mode — podaj children (dowolna kontrolka: Tabs, Button, etc.)
//
// Warianty:
//   padded=true  → px-6 py-[15px] + hover:bg — dla SectionCard divideChildren
//   padded=false → bare flex — for containers with their own padding (default)
// ---------------------------------------------------------------------------

interface SettingRowBase {
  label: string
  icon?: LucideIcon
  description?: string
  className?: string
  disabled?: boolean
  /** Add px-6 py-[15px] + hover bg — use inside SectionCard divideChildren */
  padded?: boolean
}

interface SettingRowSwitch extends SettingRowBase {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  children?: never
}

interface SettingRowGeneric extends SettingRowBase {
  checked?: never
  onCheckedChange?: never
  children: React.ReactNode
}

export type SettingRowProps = SettingRowSwitch | SettingRowGeneric

export function SettingRow({
  label,
  icon: Icon,
  description,
  checked,
  onCheckedChange,
  children,
  className,
  disabled,
  padded = false,
}: SettingRowProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4',
        padded && 'px-6 py-[15px] transition-colors duration-[var(--motion-base)] hover:bg-[var(--overlay)]',
        disabled && 'opacity-40 pointer-events-none',
        className,
      )}
    >
      <div className="min-w-0">
        {description ? (
          <>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          </>
        ) : (
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
        )}
      </div>
      <div className="shrink-0 flex items-center">
        {children ?? (
          <Switch checked={checked!} onCheckedChange={onCheckedChange!} aria-label={label} />
        )}
      </div>
    </div>
  )
}

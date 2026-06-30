import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// SectionContent — Wrapper inside SectionCard children
// Standard: ~30+ instancji we wszystkich stronach
// ---------------------------------------------------------------------------

const spacingMap = {
  none: '',
  tight: 'space-y-2',
  normal: 'space-y-3',
  relaxed: 'space-y-4',
} as const

export interface SectionContentProps {
  /** Vertical spacing between elements */
  spacing?: keyof typeof spacingMap
  /** `py-4` zamiast `pb-4` — na symetryczny padding (control bars) */
  symmetric?: boolean
  className?: string
  children: React.ReactNode
}

export function SectionContent({
  spacing = 'relaxed',
  symmetric = false,
  className,
  children,
}: SectionContentProps) {
  return (
    <div
      className={cn(
        'px-6',
        symmetric ? 'py-[15px]' : 'pb-[15px]',
        spacingMap[spacing],
        className,
      )}
    >
      {children}
    </div>
  )
}

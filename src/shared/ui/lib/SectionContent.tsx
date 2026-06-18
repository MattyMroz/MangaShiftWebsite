import { cn } from '@/lib/utils'






const spacingMap = {
  none: '',
  tight: 'space-y-2',
  normal: 'space-y-3',
  relaxed: 'space-y-4',
} as const

export interface SectionContentProps {

  spacing?: keyof typeof spacingMap

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

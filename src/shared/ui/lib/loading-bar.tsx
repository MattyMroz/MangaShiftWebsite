import { cn } from '@/lib/utils'

interface LoadingBarProps {
  active?: boolean
  className?: string
}

export function LoadingBar({ active = false, className }: LoadingBarProps) {
  if (!active) return null

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 z-[9999] h-[2px] overflow-hidden',
        className,
      )}
    >
      <div
        className={cn(
          'h-full w-1/3 rounded-full',
          'animate-loading-slide',
          'neon-glow-sm',
        )}
        style={{
          background: `linear-gradient(to right, transparent, var(--accent), transparent)`,
        }}
      />
    </div>
  )
}

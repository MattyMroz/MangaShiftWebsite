import { cn } from '@/lib/utils'
import { useAppStore } from '@/stores/use-app-store'


export function NeonOrbs() {
  const neonLevel = useAppStore((s) => s.neonLevel)
  const theme = useAppStore((s) => s.theme)

  if (neonLevel !== 'full') return null


  const o1 = theme === 'light' ? 'opacity-[0.35]' : 'opacity-[0.18]'
  const o2 = theme === 'light' ? 'opacity-[0.30]' : 'opacity-[0.15]'
  const o3 = theme === 'light' ? 'opacity-[0.25]' : 'opacity-[0.12]'

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden will-change-transform"
      aria-hidden="true"
    >

      <div
        className={cn(
          'absolute rounded-full',
          o1, 'animate-orb-1',
          'bg-[var(--accent)]',
          'w-[36vw] h-[36vw] -left-[4vw] -top-[4vw] blur-[11vw]',
        )}
      />


      <div
        className={cn(
          'absolute rounded-full',
          o2, 'animate-orb-2',
          'bg-[var(--accent-bright)]',
          'w-[31vw] h-[31vw] -bottom-[5vw] -right-[3vw] blur-[10vw]',
        )}
      />


      <div
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
          o3, 'animate-orb-3',
          'bg-[var(--accent-dim)]',
          'w-[25vw] h-[25vw] blur-[9vw]',
        )}
      />
    </div>
  )
}

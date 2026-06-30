import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Check, Loader2, X } from 'lucide-react'

import { AppIcon } from './app-icon'
import { Button } from '@/shared/ui/lib/button'
import { useBackendHealth, type BackendPhase } from '@/hooks/use-backend-health'
import { cn } from '@/lib/utils'














const PHASE_ORDER: BackendPhase[] = ['spawning', 'healthz', 'ready-check']

const PHASE_COPY: Record<Exclude<BackendPhase, 'idle' | 'ready' | 'failed'>, { label: string; sub: string }> = {
  spawning: {
    label: 'Booting backend',
    sub: 'Starting the bundled Python runtime',
  },
  healthz: {
    label: 'Waiting for API',
    sub: 'Pinging the FastAPI server until it responds',
  },
  'ready-check': {
    label: 'Loading runtime',
    sub: 'Loading the model catalog and detecting GPU',
  },
}

export function SplashScreen() {
  const { phase, progress, error, retry } = useBackendHealth()
  const queryClient = useQueryClient()
  const [hidden, setHidden] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (phase !== 'ready') return
    void queryClient.refetchQueries({ type: 'active' })
  }, [phase, queryClient])

  useEffect(() => {
    if (phase !== 'ready') return
    const t1 = setTimeout(() => setFadeOut(true), 200)
    const t2 = setTimeout(() => setHidden(true), 700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [phase])

  if (hidden) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden',
        'bg-background px-6',
        'transition-opacity duration-[var(--motion-emphasized)] ease-out',
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100',
      )}
    >
      <div className="flex w-full max-w-md flex-col items-center gap-8 px-8">

        <div className="relative">
          <AppIcon size={72} className="relative z-10" />
          <div
            className={cn(
              'absolute inset-0 -m-4 rounded-full blur-2xl',
              phase !== 'failed' && 'animate-pulse-neon',
            )}
            style={{
              background:
                phase === 'failed'
                  ? 'rgba(239, 68, 68, 0.25)'
                  : 'var(--accent-glow, rgba(139,92,246,0.2))',
            }}
          />
        </div>


        <div className="text-2xl font-semibold tracking-wide text-foreground">
          Manga<span className="neon-text text-[var(--accent-bright)]">Shift</span>
        </div>

        {phase === 'failed' ? (
          <ErrorState message={error ?? 'Unknown error'} onRetry={retry} />
        ) : (
          <PhaseList activePhase={phase} progress={progress} />
        )}
      </div>
    </div>
  )
}



function PhaseList({
  activePhase,
  progress,
}: {
  activePhase: BackendPhase
  progress: number | undefined
}) {
  const activeIndex =
    activePhase === 'ready' ? PHASE_ORDER.length : PHASE_ORDER.indexOf(activePhase)

  return (
    <div className="flex w-full flex-col gap-3">
      {PHASE_ORDER.map((p, idx) => {
        const isDone = idx < activeIndex
        const isActive = idx === activeIndex
        const isPending = idx > activeIndex
        const copy = PHASE_COPY[p as keyof typeof PHASE_COPY]

        const percent = isDone ? 100 : isActive && progress !== undefined ? Math.round(progress * 100) : null

        return (
          <div
            key={p}
            className={cn(
              'flex flex-col gap-1.5 rounded-lg px-3 py-2 transition-colors',
              isActive && 'bg-[var(--accent)]/10',
              isPending && 'opacity-40',
            )}
          >
            <div className="flex items-center gap-2.5">
              <PhaseIcon state={isDone ? 'done' : isActive ? 'active' : 'pending'} />
              <span
                className={cn(
                  'text-sm font-medium',
                  isActive ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {copy.label}
              </span>
              <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                {percent !== null ? `${percent}%` : isActive ? '…' : ''}
              </span>
            </div>
            {isActive && (
              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground">{copy.sub}</p>
                <div className="h-[2px] w-full overflow-hidden rounded-full bg-[var(--glass-bg)]">
                  <div
                    className={cn(
                      'h-full rounded-full transition-[width] duration-[var(--motion-slide)] ease-out',
                      progress === undefined && 'animate-loading-slide',
                    )}
                    style={{
                      width: progress === undefined ? '40%' : `${Math.max(progress, 0.02) * 100}%`,
                      background:
                        progress === undefined
                          ? 'linear-gradient(to right, transparent, var(--accent), transparent)'
                          : 'var(--accent)',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function PhaseIcon({ state }: { state: 'pending' | 'active' | 'done' }) {
  if (state === 'done') {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-white">
        <Check size={10} strokeWidth={3} />
      </span>
    )
  }
  if (state === 'active') {
    return <Loader2 size={14} className="animate-spin text-[var(--accent-bright)]" />
  }
  return <span className="h-2.5 w-2.5 rounded-full border border-muted-foreground/40" />
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-sm font-medium text-destructive">
        <X size={16} />
        Backend failed to start
      </div>
      <pre className="max-h-32 max-w-md overflow-auto whitespace-pre-wrap rounded-md border border-destructive/30 bg-destructive/5 p-3 text-left text-[11px] leading-relaxed text-muted-foreground">
        {message}
      </pre>
      <Button size="sm" variant="outline" onClick={onRetry} className="mt-1">
        Retry
      </Button>
    </div>
  )
}

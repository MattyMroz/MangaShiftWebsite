import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

export interface RoundedScrollListProps {
  children: ReactNode
  className?: string
  viewportClassName?: string
  fade?: boolean
}

export function RoundedScrollList({
  children,
  className,
  viewportClassName,
  fade = true,
}: RoundedScrollListProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [fadeState, setFadeState] = useState({ top: false, bottom: false })
  const [hasOverflow, setHasOverflow] = useState(false)

  const updateFade = useCallback(() => {
    const v = viewportRef.current
    if (!v) return
    const { scrollTop, scrollHeight, clientHeight } = v
    const overflow = scrollHeight > clientHeight + 1
    setHasOverflow((current) => (current === overflow ? current : overflow))
    if (!fade) return
    const top = scrollTop > 0
    const bottom = scrollTop + clientHeight < scrollHeight - 1
    setFadeState((current) =>
      current.top === top && current.bottom === bottom ? current : { top, bottom },
    )
  }, [fade])

  useEffect(() => {
    updateFade()
    window.addEventListener('resize', updateFade)
    return () => window.removeEventListener('resize', updateFade)
  }, [updateFade, children])

  // Re-measure overflow when content size changes.
  useEffect(() => {
    const v = viewportRef.current
    if (!v) return
    const ro = new ResizeObserver(updateFade)
    ro.observe(v)
    const inner = v.firstElementChild
    if (inner) ro.observe(inner)
    return () => ro.disconnect()
  }, [updateFade])

  return (
    <ScrollAreaPrimitive.Root
      type="always"
      className={cn(
        'relative flex flex-1 min-h-0',
        hasOverflow && 'pr-[10px]',
        className,
      )}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        onScroll={updateFade}
        onContextMenu={(event) => {
          if (event.target === event.currentTarget) {
            event.preventDefault()
          }
        }}
        className={cn(
          'size-full rounded-lg [&>div]:!block',
          fade &&
            fadeState.top &&
            fadeState.bottom &&
            '[mask-image:linear-gradient(to_bottom,transparent_0,black_14px,black_calc(100%_-_14px),transparent_100%)]',
          fade &&
            fadeState.top &&
            !fadeState.bottom &&
            '[mask-image:linear-gradient(to_bottom,transparent_0,black_14px,black_100%)]',
          fade &&
            !fadeState.top &&
            fadeState.bottom &&
            '[mask-image:linear-gradient(to_bottom,black_0,black_calc(100%_-_14px),transparent_100%)]',
          viewportClassName,
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex w-1.5 touch-none select-none"
      >
        <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-[var(--scrollbar-thumb)] transition-colors hover:bg-[var(--scrollbar-thumb-hover)]" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  )
}

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'

import { readMotionToken } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface SlidingPillRect {
  x: number
  y: number
  w: number
  h: number
  radius: string
}

export interface SlidingScrollListProps {
  children: ReactNode
  className?: string
  viewportClassName?: string
  orientation?: 'vertical' | 'horizontal'
  fade?: boolean
  hoverBg?: string
  itemSelector?: string
  showScrollbar?: boolean
  captureWheel?: boolean
  suppressHoverOnActive?: boolean
  /**
   * Matches `data-sliding-key="<activeKey>"` on an item element. When set, an
   * additional sliding pill (accent color) is rendered behind the active item
   * and animates to match its rect.
   */
  activeKey?: string | null
  activeBg?: string
  /** Optional CSS border applied to the sliding active pill (slides with it). */
  activeBorder?: string
  /** Live pixel offset added to the active pill transform (e.g. while a drag is in progress). */
  activeOffset?: { x: number; y: number }
  /** When true, the active pill repositions instantly (no transition). Useful during drag. */
  activeInstant?: boolean
  /** When true, the active pill is lifted above sibling items (still below an
   * item that explicitly raises its own z-index, e.g. the one being dragged). */
  activeOnTop?: boolean
}

export function SlidingScrollList({
  children,
  className,
  viewportClassName,
  orientation = 'vertical',
  fade = true,
  hoverBg = 'var(--overlay-hover)',
  itemSelector = '[data-sliding-item]',
  showScrollbar = true,
  captureWheel = true,
  suppressHoverOnActive = true,
  activeKey = null,
  activeBg = 'var(--accent-subtle)',
  activeBorder,
  activeOffset = { x: 0, y: 0 },
  activeInstant = false,
  activeOnTop = false,
}: SlidingScrollListProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const lastItemRef = useRef<HTMLElement | null>(null)
  const [fadeState, setFadeState] = useState({ top: false, bottom: false })
  const [hoverRect, setHoverRect] = useState<SlidingPillRect | null>(null)
  const [hoverVisible, setHoverVisible] = useState(false)
  const [hoverTarget, setHoverTarget] = useState<HTMLElement | null>(null)
  const [hoverPressed, setHoverPressed] = useState(false)
  const pressStartRef = useRef(0)
  const releaseTimerRef = useRef<number | null>(null)
  const [activeRect, setActiveRect] = useState<SlidingPillRect | null>(null)
  // Bumped when global design tokens (radius, font) change, so cached pill
  // border-radius from getComputedStyle gets re-measured.
  const [tokenRev, setTokenRev] = useState(0)
  useEffect(() => {
    const onTokens = () => setTokenRev((n) => n + 1)
    window.addEventListener('theme:tokens-changed', onTokens)
    return () => window.removeEventListener('theme:tokens-changed', onTokens)
  }, [])
  // First-appearance suppression: the very first paint of a pill at its
  // target transform must not animate from translate(0,0) (top-left corner).
  // We render with no transition initially, then restore the transition
  // imperatively in a rAF inside an effect.
  const activePillRef = useRef<HTMLDivElement | null>(null)
  const activePillMountedRef = useRef(false)
  const hoverPillRef = useRef<HTMLDivElement | null>(null)
  const hoverPillPositionedRef = useRef(false)

  function measureItemRect(item: HTMLElement): SlidingPillRect {
    return {
      x: item.offsetLeft,
      y: item.offsetTop,
      w: item.offsetWidth,
      h: item.offsetHeight,
      radius: getComputedStyle(item).borderRadius,
    }
  }

  // Press is released after the same minimum hold as the global btn-press
  // handler, so the pill and the pressed item scale back in sync.
  const releasePress = useCallback(() => {
    const minMs = readMotionToken('--motion-slide', 150)
    const remaining = Math.max(0, minMs - (Date.now() - pressStartRef.current))
    if (releaseTimerRef.current !== null) window.clearTimeout(releaseTimerRef.current)
    if (remaining === 0) {
      setHoverPressed(false)
      return
    }
    releaseTimerRef.current = window.setTimeout(() => {
      setHoverPressed(false)
      releaseTimerRef.current = null
    }, remaining)
  }, [])

  useEffect(() => {
    window.addEventListener('pointerup', releasePress)
    window.addEventListener('pointercancel', releasePress)
    window.addEventListener('blur', releasePress)
    return () => {
      window.removeEventListener('pointerup', releasePress)
      window.removeEventListener('pointercancel', releasePress)
      window.removeEventListener('blur', releasePress)
      if (releaseTimerRef.current !== null) window.clearTimeout(releaseTimerRef.current)
    }
  }, [releasePress])

  // Hide the hover pill when it would otherwise overlap the active pill — e.g.
  // when the user clicks a thumb and the new active key matches the
  // last-hovered item.
  useEffect(() => {
    if (!suppressHoverOnActive) return
    if (!activeKey) return
    const last = lastItemRef.current
    if (last && last.getAttribute('data-sliding-key') === activeKey) {
      setHoverVisible(false)
    }
  }, [activeKey, suppressHoverOnActive])

  const updateFade = () => {
    const v = viewportRef.current
    if (!v) return
    const scrollPosition = orientation === 'horizontal' ? v.scrollLeft : v.scrollTop
    const scrollSize = orientation === 'horizontal' ? v.scrollWidth : v.scrollHeight
    const clientSize = orientation === 'horizontal' ? v.clientWidth : v.clientHeight
    if (!fade) return
    const top = scrollPosition > 0
    const bottom = scrollPosition + clientSize < scrollSize - 1
    setFadeState((current) =>
      current.top === top && current.bottom === bottom ? current : { top, bottom },
    )
  }

  useEffect(() => {
    updateFade()
    window.addEventListener('resize', updateFade)
    return () => window.removeEventListener('resize', updateFade)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fade, children])

  useEffect(() => {
    const v = viewportRef.current
    if (!v) return
    const ro = new ResizeObserver(updateFade)
    ro.observe(v)
    const inner = v.firstElementChild
    if (inner) ro.observe(inner)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return

    const showFor = (item: HTMLElement) => {
      lastItemRef.current = item
      const itemKey = item.getAttribute('data-sliding-key')
      // Suppress hover on the active item (it would overlap the active pill).
      if (suppressHoverOnActive && activeKey && itemKey && itemKey === activeKey) {
        setHoverVisible(false)
        return
      }
      setHoverTarget(item)
      setHoverRect(measureItemRect(item))
      setHoverVisible(true)
    }

    const hide = () => {
      lastItemRef.current = null
      setHoverTarget(null)
      setHoverVisible(false)
      setHoverPressed(false)
    }

    const onMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return
      const item = target.closest(itemSelector) as HTMLElement | null
      if (!item || !inner.contains(item)) {
        if (lastItemRef.current) hide()
        return
      }
      if (item !== lastItemRef.current) showFor(item)
    }

    const onLeave = () => hide()

    // Pill shrinks with items that opt into press feedback (.btn-press);
    // plain items (e.g. text inputs) keep the pill at full size.
    const onDown = (event: PointerEvent) => {
      const item = (event.target as HTMLElement | null)?.closest(itemSelector) as HTMLElement | null
      if (!item || !inner.contains(item) || !item.classList.contains('btn-press')) return
      pressStartRef.current = Date.now()
      setHoverPressed(true)
    }

    const onContext = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const item = target?.closest(itemSelector) as HTMLElement | null
      if (item && document.activeElement === item) item.blur()
      hide()
    }

    inner.addEventListener('pointermove', onMove)
    inner.addEventListener('pointerleave', onLeave)
    inner.addEventListener('pointerdown', onDown)
    inner.addEventListener('contextmenu', onContext)
    return () => {
      inner.removeEventListener('pointermove', onMove)
      inner.removeEventListener('pointerleave', onLeave)
      inner.removeEventListener('pointerdown', onDown)
      inner.removeEventListener('contextmenu', onContext)
    }
  }, [itemSelector, orientation, activeKey, suppressHoverOnActive])

  useLayoutEffect(() => {
    if (!hoverVisible || !hoverTarget) return

    const measure = () => {
      const inner = innerRef.current
      if (!inner || !hoverTarget.isConnected || !inner.contains(hoverTarget)) {
        lastItemRef.current = null
        setHoverTarget(null)
        setHoverVisible(false)
        return
      }
      setHoverRect((current) => {
        const next = measureItemRect(hoverTarget)
        if (
          current &&
          current.x === next.x &&
          current.y === next.y &&
          current.w === next.w &&
          current.h === next.h &&
          current.radius === next.radius
        ) {
          return current
        }
        return next
      })
    }

    measure()

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(hoverTarget)
    const inner = innerRef.current
    if (inner) resizeObserver.observe(inner)

    const viewport = viewportRef.current
    viewport?.addEventListener('scroll', measure)
    window.addEventListener('resize', measure)

    return () => {
      resizeObserver.disconnect()
      viewport?.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [hoverVisible, hoverTarget, children, tokenRev])

  // Track active item rect by [data-sliding-key].
  useLayoutEffect(() => {
    const inner = innerRef.current
    if (!inner || !activeKey) {
      setActiveRect(null)
      return
    }
    const measure = () => {
      const escaped = (typeof CSS !== 'undefined' && 'escape' in CSS)
        ? CSS.escape(activeKey)
        : activeKey.replace(/"/g, '\\"')
      const el = inner.querySelector<HTMLElement>(`[data-sliding-key="${escaped}"]`)
      if (!el) {
        setActiveRect(null)
        return
      }
      setActiveRect(measureItemRect(el))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(inner)
    const activeElement = inner.querySelector<HTMLElement>(`[data-sliding-key="${(typeof CSS !== 'undefined' && 'escape' in CSS) ? CSS.escape(activeKey) : activeKey.replace(/"/g, '\\"')}"]`)
    if (activeElement) ro.observe(activeElement)
    return () => ro.disconnect()
  }, [activeKey, orientation, children, tokenRev])

  // Restore the active pill transition on the next frame after it first
  // mounts with a real rect, so subsequent rect changes animate but the
  // initial appearance doesn't slide in from (0,0). Also re-applies the
  // transition when leaving instant mode (drag end).
  useEffect(() => {
    const el = activePillRef.current
    if (!activeRect || !el) {
      activePillMountedRef.current = false
      return
    }
    const apply = () => {
      const current = activePillRef.current
      if (!current || activeInstant) return
      current.style.transition =
        'transform var(--motion-emphasized) var(--ease-standard), width var(--motion-emphasized) var(--ease-out), height var(--motion-emphasized) var(--ease-out)'
    }
    if (!activePillMountedRef.current) {
      activePillMountedRef.current = true
      const raf = requestAnimationFrame(apply)
      return () => cancelAnimationFrame(raf)
    }
    apply()
  }, [activeRect, activeInstant])

  // Same trick for the hover pill: first time it becomes visible at a real
  // rect (hoverVisible flips to true with non-zero size), suppress the
  // transition; restore it on the next frame.
  useEffect(() => {
    const el = hoverPillRef.current
    if (!el) return
    if (!hoverVisible || !hoverRect || hoverRect.w === 0) {
      hoverPillPositionedRef.current = false
      return
    }
    if (hoverPillPositionedRef.current) return
    hoverPillPositionedRef.current = true
    const raf = requestAnimationFrame(() => {
      const current = hoverPillRef.current
      if (!current) return
      current.style.transition =
        'transform var(--motion-emphasized) var(--ease-emphasized), opacity var(--motion-base) var(--ease-out), height var(--motion-emphasized) var(--ease-emphasized), width var(--motion-emphasized) var(--ease-emphasized)'
    })
    return () => cancelAnimationFrame(raf)
  }, [hoverVisible, hoverRect])

  function handleWheel(event: globalThis.WheelEvent) {
    const viewport = viewportRef.current
    if (!viewport) return
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    if (delta === 0) return
    if (orientation === 'horizontal') {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth
      if (maxScroll <= 0) return
      viewport.scrollLeft = Math.max(0, Math.min(maxScroll, viewport.scrollLeft + delta))
    } else {
      const maxScroll = viewport.scrollHeight - viewport.clientHeight
      if (maxScroll <= 0) return
      viewport.scrollTop = Math.max(0, Math.min(maxScroll, viewport.scrollTop + delta))
    }
    updateFade()
    event.preventDefault()
  }

  // React attaches wheel listeners as passive, which makes preventDefault
  // a no-op (and logs a warning). Attach the listener imperatively with
  // { passive: false } so horizontal-scroll redirection actually works.
  useEffect(() => {
    if (!captureWheel) return
    const viewport = viewportRef.current
    if (!viewport) return
    viewport.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      viewport.removeEventListener('wheel', handleWheel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captureWheel, orientation])

  const fadeMaskClass = orientation === 'horizontal'
    ? cn(
        fade &&
          fadeState.top &&
          fadeState.bottom &&
          '[mask-image:linear-gradient(to_right,transparent_0,black_14px,black_calc(100%_-_14px),transparent_100%)]',
        fade &&
          fadeState.top &&
          !fadeState.bottom &&
          '[mask-image:linear-gradient(to_right,transparent_0,black_14px,black_100%)]',
        fade &&
          !fadeState.top &&
          fadeState.bottom &&
          '[mask-image:linear-gradient(to_right,black_0,black_calc(100%_-_14px),transparent_100%)]',
      )
    : cn(
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
      )

  return (
    <ScrollAreaPrimitive.Root
      type="always"
      className={cn(
        'relative flex flex-1 min-h-0 min-w-0',
        orientation === 'horizontal' ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        onScroll={updateFade}
        onContextMenu={(event) => {
          if (event.target === event.currentTarget) event.preventDefault()
        }}
        className={cn(
          'size-full rounded-lg [&>div]:!block',
          fadeMaskClass,
          viewportClassName,
        )}
      >
        <div
          ref={innerRef}
          className={cn(
            'relative',
            orientation === 'horizontal' ? 'w-max min-w-full' : 'min-h-full',
            showScrollbar && orientation === 'horizontal' && 'pb-1.5',
            showScrollbar && orientation === 'vertical' && 'pr-1.5',
          )}
        >
          {activeRect && (
            <div
              ref={activePillRef}
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                left: 0,
                top: 0,
                width: activeRect.w,
                height: activeRect.h,
                zIndex: activeOnTop ? 5 : -1,
                transform: `translate(${activeRect.x + activeOffset.x}px, ${activeRect.y + activeOffset.y}px)`,
                background: activeBg,
                border: activeBorder,
                borderRadius: activeRect.radius,
                // First paint: no transition (set imperatively in the rAF
                // inside the mount effect). Drag uses activeInstant to also
                // disable transitions.
                transition: activeInstant ? 'none' : undefined,
              }}
            />
          )}
          {hoverRect && (
            <div
              ref={hoverPillRef}
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                left: 0,
                top: 0,
                width: hoverRect.w,
                height: hoverRect.h,
                zIndex: -1,
                transform: `translate(${hoverRect.x}px, ${hoverRect.y}px) scale(${hoverPressed ? 0.92 : 1})`,
                background: hoverBg,
                borderRadius: hoverRect.radius,
                opacity: hoverVisible ? (hoverPressed ? 0.82 : 1) : 0,
                transformOrigin: 'center',
                // Transition is applied imperatively in the effect below so the
                // first appearance does not animate transform from (0,0).
              }}
            />
          )}
          <div className={cn('relative', orientation === 'horizontal' && 'w-max min-w-full')}>
            {children}
          </div>
        </div>
      </ScrollAreaPrimitive.Viewport>
      {showScrollbar && (
        <ScrollAreaPrimitive.Scrollbar
          orientation={orientation}
          className={cn(
            'flex touch-none select-none p-px transition-colors',
            orientation === 'horizontal'
              ? 'h-2 flex-col border-t border-t-transparent'
              : 'h-full w-2 border-l border-l-transparent',
          )}
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-[var(--scrollbar-thumb)] transition-colors hover:bg-[var(--scrollbar-thumb-hover)]" />
        </ScrollAreaPrimitive.Scrollbar>
      )}
    </ScrollAreaPrimitive.Root>
  )
}

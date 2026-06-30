
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { readMotionToken } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface SlidingNavItem {
  key: string
  content: ReactNode
  activeColor?: string
  ariaLabel?: string
  disabled?: boolean
}

interface SlidingNavProps {
  items: SlidingNavItem[]
  activeKey: string | null
  onSelect: (key: string) => void
  orientation: 'horizontal' | 'vertical'
  itemClassName?: string
  containerClassName?: string
  pillSize?: number
  hoverBg?: string
  activeBg?: string
  activeBorder?: string

  accentBar?: boolean
  accentBarSide?: 'start' | 'end'
  accentBarColor?: string
  accentBarShadow?: string
}

export function SlidingNav({
  items,
  activeKey,
  onSelect,
  orientation,
  itemClassName,
  containerClassName,
  pillSize,
  hoverBg = 'var(--overlay-hover)',
  activeBg = 'var(--accent-subtle)',
  activeBorder,
  accentBar = false,
  accentBarSide = 'start',
  accentBarColor = 'var(--accent)',
  accentBarShadow,
}: SlidingNavProps) {
  const isVertical = orientation === 'vertical'
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [hoverRect, setHoverRect] = useState({ pos: 0, size: 0 })
  const [hoverJustEntered, setHoverJustEntered] = useState(false)
  const [hoverVisible, setHoverVisible] = useState(false)
  const [activeRect, setActiveRect] = useState<{ pos: number; size: number } | null>(null)
  const [pressedIdx, setPressedIdx] = useState<number | null>(null)
  const pressedIdxRef = useRef<number | null>(null)
  const pressStartRef = useRef(0)
  const releaseTimerRef = useRef<number | null>(null)

  const activeIdx = items.findIndex((it) => it.key === activeKey)

  const clearReleaseTimer = useCallback(() => {
    if (releaseTimerRef.current === null) return
    window.clearTimeout(releaseTimerRef.current)
    releaseTimerRef.current = null
  }, [])

  const setPressed = useCallback((index: number | null) => {
    pressedIdxRef.current = index
    setPressedIdx(index)
  }, [])

  const startPress = useCallback((index: number) => {
    clearReleaseTimer()
    pressStartRef.current = Date.now()
    setPressed(index)
  }, [clearReleaseTimer, setPressed])

  const releasePress = useCallback(() => {
    if (pressedIdxRef.current === null) return
    const minMs = readMotionToken('--motion-slide', 150)
    const elapsedMs = Date.now() - pressStartRef.current
    const remainingMs = Math.max(0, minMs - elapsedMs)
    clearReleaseTimer()
    if (remainingMs === 0) {
      setPressed(null)
      return
    }
    releaseTimerRef.current = window.setTimeout(() => {
      setPressed(null)
      releaseTimerRef.current = null
    }, remainingMs)
  }, [clearReleaseTimer, setPressed])

  useEffect(() => {
    window.addEventListener('mouseup', releasePress)
    window.addEventListener('blur', releasePress)
    return () => {
      window.removeEventListener('mouseup', releasePress)
      window.removeEventListener('blur', releasePress)
      clearReleaseTimer()
    }
  }, [clearReleaseTimer, releasePress])

  const itemsKey = items.map((i) => i.key).join('|')

  useLayoutEffect(() => {
    const el = itemRefs.current[activeIdx]
    if (!el || activeIdx < 0) {
      setActiveRect(null)
      return
    }
    const pos = isVertical ? el.offsetTop : el.offsetLeft
    const size = isVertical ? el.offsetHeight : el.offsetWidth
    setActiveRect({ pos, size })
  }, [activeIdx, isVertical, itemsKey])

  const measureHover = (index: number) => {
    if (index === activeIdx) {
      setHoverVisible(false)
      return
    }
    const el = itemRefs.current[index]
    if (!el) return
    const pos = isVertical ? el.offsetTop : el.offsetLeft
    const size = isVertical ? el.offsetHeight : el.offsetWidth
    const wasNull = hoverIdx === null
    setHoverRect({ pos, size })
    setHoverIdx(index)
    setHoverVisible(true)
    if (wasNull) setHoverJustEntered(true)
  }

  useEffect(() => {
    if (!hoverJustEntered) return
    const id = requestAnimationFrame(() => setHoverJustEntered(false))
    return () => cancelAnimationFrame(id)
  }, [hoverJustEntered])

  const handleLeave = () => {
    setHoverVisible(false)
  }

  const showHover = hoverIdx !== null && hoverIdx !== activeIdx
  const hoverPressed = pressedIdx !== null && pressedIdx === hoverIdx
  const activePressed = pressedIdx !== null && pressedIdx === activeIdx

  const pillPx = pillSize ?? (isVertical ? undefined : 28)

  return (
    <div
      className={cn('relative', isVertical ? 'flex flex-col' : 'flex items-center', containerClassName)}
      onMouseLeave={handleLeave}
    >
      {showHover && (
        <div
          aria-hidden
          className={cn('absolute pointer-events-none z-0', isVertical ? 'rounded-lg' : 'rounded-md')}
          style={{
            ...(isVertical
              ? { left: 0, right: 0, top: 0, height: hoverRect.size, transform: `translateY(${hoverRect.pos}px) scale(${hoverPressed ? 0.92 : 1})` }
              : {
                  top: '50%',
                  left: hoverRect.pos,
                  width: hoverRect.size,
                  height: pillPx,
                  transform: `translateY(-50%) scale(${hoverPressed ? 0.92 : 1})`,
                }),
            background: hoverBg,
            opacity: hoverVisible ? (hoverPressed ? 0.82 : 1) : 0,
            transformOrigin: 'center',
            transition: hoverJustEntered
              ? 'none'
              : isVertical
                ? 'transform var(--motion-slide) var(--ease-standard), height var(--motion-slide) var(--ease-out), opacity var(--motion-fast) var(--ease-out)'
                : 'left var(--motion-slide) var(--ease-standard), width var(--motion-slide) var(--ease-standard), transform var(--motion-fast) var(--ease-out), opacity var(--motion-fast) var(--ease-out)',
          }}
        />
      )}

      {activeRect && (
        <div
          aria-hidden
          className={cn('absolute pointer-events-none z-0', isVertical ? 'rounded-lg' : 'rounded-md')}
          style={{
            ...(isVertical
              ? { left: 0, right: 0, top: 0, height: activeRect.size, transform: `translateY(${activeRect.pos}px) scale(${activePressed ? 0.92 : 1})` }
              : {
                  top: '50%',
                  left: activeRect.pos,
                  width: activeRect.size,
                  height: pillPx,
                  transform: `translateY(-50%) scale(${activePressed ? 0.92 : 1})`,
                }),
            background: activeBg,
            border: activeBorder,
            opacity: activePressed ? 0.82 : 1,
            transformOrigin: 'center',
            transition: isVertical
              ? 'transform var(--motion-emphasized) var(--ease-standard), height var(--motion-emphasized) var(--ease-out), opacity var(--motion-fast) var(--ease-out)'
              : 'left var(--motion-emphasized) var(--ease-standard), width var(--motion-emphasized) var(--ease-standard), transform var(--motion-fast) var(--ease-out), opacity var(--motion-fast) var(--ease-out)',
          }}
        />
      )}

      {activeRect && accentBar && isVertical && (
        <span
          aria-hidden
          className={cn(
            'absolute w-[3px] pointer-events-none z-[2]',
            accentBarSide === 'end' ? 'right-0 rounded-l-full' : 'left-0 rounded-r-full',
          )}
          style={{
            top: 0,
            height: 16,
            transform: `translateY(${activeRect.pos + activeRect.size / 2 - 8}px)`,
            background: accentBarColor,
            boxShadow: accentBarShadow,
            transition: 'transform var(--motion-emphasized) var(--ease-standard)',
          }}
        />
      )}

      {items.map((item, index) => {
        const isActive = index === activeIdx
        return (
          <button
            key={item.key}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
            type="button"
            onClick={() => !item.disabled && onSelect(item.key)}
            onMouseEnter={() => !item.disabled && measureHover(index)}
            onMouseDown={() => !item.disabled && startPress(index)}
            onBlur={() => {
              if (pressedIdxRef.current === index) releasePress()
            }}
            disabled={item.disabled}
            aria-pressed={isActive}
            aria-label={item.ariaLabel}
            data-sliding-item
            className={cn(
              'btn-press relative z-[1] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
              item.disabled && 'opacity-40 cursor-not-allowed',
              itemClassName,
            )}
            style={{
              color: isActive ? (item.activeColor ?? 'var(--accent-bright)') : undefined,
            }}
          >
            {item.content}
          </button>
        )
      })}
    </div>
  )
}

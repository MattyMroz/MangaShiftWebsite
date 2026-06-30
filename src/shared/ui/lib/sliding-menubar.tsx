
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Menubar as MenubarPrimitive } from 'radix-ui'

import {
  MenubarContent,
  MenubarCheckboxItem,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from '@/shared/ui/lib/menubar'
import { cn } from '@/lib/utils'
import { readMotionToken } from '@/lib/motion'

export interface SlidingTriggerDef {
  value: string
  label: ReactNode
  content: ReactNode
}

interface SlidingMenubarProps {
  triggers: SlidingTriggerDef[]
  className?: string
  triggerClassName?: string
  hoverBg?: string
  activeBg?: string
}

export function SlidingMenubar({
  triggers,
  className,
  triggerClassName,
  hoverBg = 'var(--overlay-hover)',
  activeBg = 'var(--accent-subtle)',
}: SlidingMenubarProps) {
  const [openValue, setOpenValue] = useState('')
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [hoverRect, setHoverRect] = useState({ x: 0, w: 0 })
  const [hoverVisible, setHoverVisible] = useState(false)
  const [activeRect, setActiveRect] = useState({ x: 0, w: 0 })
  const [pressedIdx, setPressedIdx] = useState<number | null>(null)

  const rootRef = useRef<HTMLDivElement | null>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const pressedIdxRef = useRef<number | null>(null)
  const pressStartRef = useRef<number>(0)
  const releaseTimerRef = useRef<number | null>(null)
  const lastContentRectRef = useRef<{ left: number; top: number } | null>(null)
  const openingFromClosedRef = useRef(false)

  const clearReleaseTimer = useCallback(() => {
    if (releaseTimerRef.current === null) return
    window.clearTimeout(releaseTimerRef.current)
    releaseTimerRef.current = null
  }, [])

  const setPressed = useCallback((index: number | null) => {
    pressedIdxRef.current = index
    setPressedIdx(index)
  }, [])

  const beginPress = useCallback((i: number) => {
    clearReleaseTimer()
    pressStartRef.current = Date.now()
    setPressed(i)
  }, [clearReleaseTimer, setPressed])

  const endPress = useCallback(() => {
    if (pressedIdxRef.current === null) return
    const minMs = readMotionToken('--motion-slide', 150)
    const elapsed = Date.now() - pressStartRef.current
    const remaining = Math.max(0, minMs - elapsed)
    clearReleaseTimer()
    if (remaining === 0) {
      setPressed(null)
      return
    }
    releaseTimerRef.current = window.setTimeout(() => {
      setPressed(null)
      releaseTimerRef.current = null
    }, remaining)
  }, [clearReleaseTimer, setPressed])

  const triggersKey = triggers.map((t) => t.value).join('|')
  const activeIdx = openValue ? triggers.findIndex((t) => t.value === openValue) : -1

  const handleValueChange = (next: string) => {
    openingFromClosedRef.current = Boolean(next) && openValue === ''
    setOpenValue(next)
  }

  useLayoutEffect(() => {
    if (activeIdx < 0) return
    const el = triggerRefs.current[activeIdx]
    const root = rootRef.current
    if (!el || !root) return
    const rRoot = root.getBoundingClientRect()
    const rEl = el.getBoundingClientRect()
    setActiveRect({ x: rEl.left - rRoot.left, w: rEl.width })
  }, [activeIdx, triggersKey])

  const measureHover = (idx: number) => {
    const el = triggerRefs.current[idx]
    const root = rootRef.current
    if (!el || !root) return
    const rRoot = root.getBoundingClientRect()
    const rEl = el.getBoundingClientRect()
    setHoverRect({ x: rEl.left - rRoot.left, w: rEl.width })
    setHoverIdx(idx)
    setHoverVisible(true)
  }

  useLayoutEffect(() => {
    if (!openValue || typeof document === 'undefined') return

    const raf = requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(`[data-sliding-menubar-content="${openValue}"]`)
      if (!el) return

      const rect = el.getBoundingClientRect()
      const previous = lastContentRectRef.current
      const shouldAnimate = previous !== null && !openingFromClosedRef.current
      if (shouldAnimate) {
        const dx = previous.left - rect.left
        const dy = previous.top - rect.top
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          el.animate(
            [
              { transform: `translate(${dx}px, ${dy}px)` },
              { transform: 'translate(0, 0)' },
            ],
            {
              duration: readMotionToken('--motion-emphasized', 220),
              easing: 'cubic-bezier(0.2, 0, 0, 1)',
            },
          )
        }
      }

      lastContentRectRef.current = { left: rect.left, top: rect.top }
      openingFromClosedRef.current = false
    })

    return () => cancelAnimationFrame(raf)
  }, [openValue])

  useEffect(() => {
    window.addEventListener('pointerup', endPress)
    window.addEventListener('pointercancel', endPress)
    window.addEventListener('blur', endPress)
    return () => {
      window.removeEventListener('pointerup', endPress)
      window.removeEventListener('pointercancel', endPress)
      window.removeEventListener('blur', endPress)
      clearReleaseTimer()
    }
  }, [clearReleaseTimer, endPress])

  const showHover = hoverVisible && hoverIdx !== null && hoverIdx !== activeIdx
  const hoverPressed = pressedIdx !== null && pressedIdx === hoverIdx
  const activeMounted = activeIdx >= 0
  const activePressed = pressedIdx !== null && pressedIdx === activeIdx

  return (
    <MenubarPrimitive.Root
      value={openValue}
      onValueChange={handleValueChange}
      ref={rootRef as unknown as React.Ref<HTMLDivElement>}
      className={cn('relative flex h-7 items-center', className)}
    >

      <div
        aria-hidden
        className="absolute top-1/2 left-0 h-7 -translate-y-1/2 rounded-md pointer-events-none z-0"
        style={{
          transform: `translateX(${hoverRect.x}px) scale(${hoverPressed ? 0.92 : 1})`,
          width: hoverRect.w,
          opacity: showHover ? (hoverPressed ? 0.82 : 1) : 0,
          background: hoverBg,
          transition: 'transform var(--motion-slide) var(--ease-standard), width var(--motion-slide) var(--ease-standard), opacity var(--motion-fade) var(--ease-out)',
        }}
      />


      <div
        aria-hidden
        className="absolute top-1/2 left-0 h-7 -translate-y-1/2 rounded-md pointer-events-none z-0"
        style={{
          transform: `translateX(${activeRect.x}px) scale(${activePressed ? 0.92 : 1})`,
          width: activeRect.w,
          opacity: activeMounted ? (activePressed ? 0.82 : 1) : 0,
          background: activeBg,
          transition: 'transform var(--motion-emphasized) var(--ease-emphasized), width var(--motion-emphasized) var(--ease-emphasized), opacity var(--motion-fade) var(--ease-out)',
        }}
      />

      {triggers.map((t, i) => (
        <MenubarMenu key={t.value} value={t.value}>
          <MenubarPrimitive.Trigger
            ref={(el: HTMLButtonElement | null) => {
              triggerRefs.current[i] = el
            }}
            onMouseEnter={() => measureHover(i)}
            onMouseLeave={() => {
              setHoverVisible(false)
              if (pressedIdxRef.current === i) endPress()
            }}
            onPointerDown={() => beginPress(i)}
            onPointerUp={() => endPress()}
            onBlur={() => {
              if (pressedIdxRef.current === i) endPress()
            }}
            className={cn(
              'relative z-[1] flex h-7 items-center rounded-md px-2 text-xs font-normal outline-none cursor-pointer select-none',
              'focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
              triggerClassName,
            )}
          >
            <span
              className="btn-press pointer-events-none inline-flex"
              data-pressing={pressedIdx === i ? 'true' : undefined}
            >
              {t.label}
            </span>
          </MenubarPrimitive.Trigger>
          {t.content}
        </MenubarMenu>
      ))}
    </MenubarPrimitive.Root>
  )
}

export interface SlidingRadioOption {
  value: string
  label: string
  hint?: string
}

export type SlidingItemEntry =
  | { kind: 'item'; label: string; shortcut?: string; disabled?: boolean; onSelect: () => void }
  | { kind: 'checkbox'; label: string; checked: boolean; disabled?: boolean; closeOnSelect?: boolean; onSelect: () => void }
  | { kind: 'label'; label: string }
  | { kind: 'separator' }
  | { kind: 'node'; node: ReactNode }
  | {
      kind: 'radio'
      label: string
      value: string
      options: SlidingRadioOption[]
      onSelect: (value: string) => void
    }
  | {
      kind: 'submenu'
      label: string
      hint?: string
      disabled?: boolean
      entries: SlidingItemEntry[]
    }

interface SlidingMenubarItemsProps {
  entries: SlidingItemEntry[]
  hoverBg?: string
  className?: string
}

export function SlidingMenubarItems({
  entries,
  hoverBg = 'var(--accent-subtle)',
  className,
}: SlidingMenubarItemsProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [hoverRect, setHoverRect] = useState({ y: 0, h: 0 })
  const [hoverVisible, setHoverVisible] = useState(false)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const lastSubContentRectRef = useRef<{ left: number; top: number } | null>(null)

  const measure = (idx: number) => {
    const el = itemRefs.current[idx]
    if (!el) return
    setHoverRect({ y: el.offsetTop, h: el.offsetHeight })
    setHoverIdx(idx)
    setHoverVisible(true)
  }

  const measureFromOpen = (idx: number) => {
    const el = itemRefs.current[idx]
    if (!el) return
    setHoverRect({ y: el.offsetTop, h: el.offsetHeight })
  }

  const pillActive = (hoverVisible && hoverIdx !== null) || openIdx !== null

  const openSubKey =
    openIdx !== null && entries[openIdx]?.kind === 'submenu'
      ? `${(entries[openIdx] as { label: string }).label}-${openIdx}`
      : null
  useLayoutEffect(() => {
    if (!openSubKey || typeof document === 'undefined') return
    const raf = requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(
        `[data-sliding-menubar-sub-content="${openSubKey}"]`,
      )
      if (!el) return
      const rect = el.getBoundingClientRect()
      const previous = lastSubContentRectRef.current
      if (previous) {
        const dy = previous.top - rect.top
        if (Math.abs(dy) > 0.5) {
          el.animate(
            [{ transform: `translateY(${dy}px)` }, { transform: 'translateY(0)' }],
            { duration: readMotionToken('--motion-emphasized', 220), easing: 'cubic-bezier(0.2, 0, 0, 1)' },
          )
        }
      }
      lastSubContentRectRef.current = { left: rect.left, top: rect.top }
    })
    return () => cancelAnimationFrame(raf)
  }, [openSubKey])

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 rounded-sm pointer-events-none z-0"
        style={{
          transform: `translateY(${hoverRect.y}px)`,
          height: hoverRect.h,
          opacity: pillActive ? 1 : 0,
          background: hoverBg,
          transition: 'transform var(--motion-slide) var(--ease-standard), height var(--motion-slide) var(--ease-standard), opacity var(--motion-fade) var(--ease-out)',
        }}
      />
      {entries.map((entry, idx) => {
        if (entry.kind === 'separator') {
          return <MenubarSeparator key={`sep-${idx}`} />
        }
        if (entry.kind === 'label') {
          return (
            <MenubarLabel
              key={`label-${entry.label}-${idx}`}
              className="px-2 pt-1.5 pb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70"
            >
              {entry.label}
            </MenubarLabel>
          )
        }
        if (entry.kind === 'node') {
          return (
            <div key={`node-${idx}`} className="relative z-[1]" onPointerDown={(e) => e.stopPropagation()}>
              {entry.node}
            </div>
          )
        }
        if (entry.kind === 'radio') {
          return (
            <MenubarRadioGroup key={`radio-${entry.label}-${idx}`} value={entry.value}>
              {entry.options.map((opt) => (
                <MenubarRadioItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={(e: Event) => {
                    e.preventDefault()
                    entry.onSelect(opt.value)
                  }}
                  className="relative z-[1] focus:bg-[var(--accent-subtle)]"
                >
                  <span className="flex flex-col">
                    <span>{opt.label}</span>
                    {opt.hint && <span className="text-[11px] text-muted-foreground">{opt.hint}</span>}
                  </span>
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          )
        }
        if (entry.kind === 'submenu') {
          const subValue = `${entry.label}-${idx}`
          const subDisabled = entry.disabled ?? false
          return (
            <MenubarSub
              key={`sub-${entry.label}-${idx}`}
              open={subDisabled ? false : openIdx === idx}
              onOpenChange={(open) => {
                if (subDisabled) return
                if (open) {
                  setOpenIdx(idx)
                  measureFromOpen(idx)
                } else if (openIdx === idx) {
                  setOpenIdx(null)
                }
              }}
            >
              <MenubarSubTrigger
                ref={(el: HTMLDivElement | null) => {
                  itemRefs.current[idx] = el
                }}
                disabled={subDisabled}
                onMouseEnter={() => {
                  if (subDisabled) return
                  setOpenIdx(idx)
                  measure(idx)
                }}
                onMouseLeave={() => setHoverVisible(false)}
                className="relative z-[1] focus:bg-transparent data-[state=open]:bg-transparent data-[highlighted]:bg-transparent"
              >
                <span className="flex min-w-0 flex-col">
                  <span>{entry.label}</span>
                  {entry.hint && (
                    <span className="truncate text-[11px] text-muted-foreground">{entry.hint}</span>
                  )}
                </span>
              </MenubarSubTrigger>
              <MenubarPortal>
                <MenubarSubContent
                  data-sliding-menubar-sub-content={subValue}
                  className="w-fit min-w-[11rem]"
                >
                  <SlidingMenubarItems entries={entry.entries} />
                </MenubarSubContent>
              </MenubarPortal>
            </MenubarSub>
          )
        }
        if (entry.kind === 'checkbox') {
          const closeOnSelect = entry.closeOnSelect ?? false
          return (
            <MenubarCheckboxItem
              key={entry.label}
              ref={(el: HTMLDivElement | null) => {
                itemRefs.current[idx] = el
              }}
              checked={entry.checked}
              disabled={entry.disabled}
              onMouseEnter={() => measure(idx)}
              onMouseLeave={() => setHoverVisible(false)}
              onSelect={(e: Event) => {
                if (!closeOnSelect) e.preventDefault()
                entry.onSelect()
              }}
              className="relative z-[1] focus:bg-transparent data-[highlighted]:bg-transparent"
            >
              {entry.label}
            </MenubarCheckboxItem>
          )
        }
        return (
          <MenubarItem
            key={entry.label}
            ref={(el: HTMLDivElement | null) => {
              itemRefs.current[idx] = el
            }}
            disabled={entry.disabled}
            onMouseEnter={() => measure(idx)}
            onMouseLeave={() => setHoverVisible(false)}
            onSelect={entry.onSelect}
            className="relative z-[1] focus:bg-transparent data-[highlighted]:bg-transparent"
          >
            {entry.label}
            {entry.shortcut && <MenubarShortcut>{entry.shortcut}</MenubarShortcut>}
          </MenubarItem>
        )
      })}
    </div>
  )
}

export { MenubarContent, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarItem }

interface SubGroupDef {
  value: string
  label: string
  entries: SlidingItemEntry[]
}

interface SlidingMenubarSubGroupProps {
  subs: SubGroupDef[]
  hoverBg?: string
}

export function SlidingMenubarSubGroup({
  subs,
  hoverBg = 'var(--accent-subtle)',
}: SlidingMenubarSubGroupProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [hoverRect, setHoverRect] = useState({ y: 0, h: 0 })
  const [hoverVisible, setHoverVisible] = useState(false)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([])
  const lastSubContentRectRef = useRef<{ left: number; top: number } | null>(null)
  const subsKey = subs.map((s) => s.value).join('|')

  const measure = (idx: number) => {
    const el = triggerRefs.current[idx]
    if (!el) return
    setHoverRect({ y: el.offsetTop, h: el.offsetHeight })
    setHoverIdx(idx)
    setHoverVisible(true)
  }

  const pillIdx = hoverVisible && hoverIdx !== null ? hoverIdx : openIdx
  const pillVisible = pillIdx !== null

  useLayoutEffect(() => {
    if (openIdx === null || typeof document === 'undefined') return
    const value = subs[openIdx]?.value
    if (!value) return

    const raf = requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(`[data-sliding-menubar-sub-content="${value}"]`)
      if (!el) return

      const rect = el.getBoundingClientRect()
      const previous = lastSubContentRectRef.current
      const shouldAnimate = previous !== null
      if (shouldAnimate) {
        const dx = 0
        const dy = previous.top - rect.top
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          el.animate(
            [
              { transform: `translate(${dx}px, ${dy}px)` },
              { transform: 'translate(0, 0)' },
            ],
            {
              duration: readMotionToken('--motion-emphasized', 220),
              easing: 'cubic-bezier(0.2, 0, 0, 1)',
            },
          )
        }
      }

      lastSubContentRectRef.current = { left: rect.left, top: rect.top }
    })

    return () => cancelAnimationFrame(raf)
  }, [openIdx, subs, subsKey])

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 rounded-sm pointer-events-none z-0"
        style={{
          transform: `translateY(${hoverRect.y}px)`,
          height: hoverRect.h,
          opacity: pillVisible ? 1 : 0,
          background: hoverBg,
          transition: 'transform var(--motion-slide) var(--ease-standard), height var(--motion-slide) var(--ease-standard), opacity var(--motion-fade) var(--ease-out)',
        }}
      />
      {subs.map((s, idx) => (
        <MenubarSub
          key={s.value}
          open={openIdx === idx}
          onOpenChange={(open) => {
            if (open) {
              setOpenIdx(idx)
              measure(idx)
            } else if (openIdx === idx) {
              setOpenIdx(null)
            }
          }}
        >
          <MenubarSubTrigger
            ref={(el: HTMLDivElement | null) => {
              triggerRefs.current[idx] = el
            }}
            onMouseEnter={() => {
              setOpenIdx(idx)
              measure(idx)
            }}
            onMouseLeave={() => setHoverVisible(false)}
            className="relative z-[1] focus:bg-transparent data-[state=open]:bg-transparent data-[highlighted]:bg-transparent"
          >
            {s.label}
          </MenubarSubTrigger>
          <MenubarPortal>
            <MenubarSubContent data-sliding-menubar-sub-content={s.value} className="w-fit min-w-fit">
              <SlidingMenubarItems entries={s.entries} />
            </MenubarSubContent>
          </MenubarPortal>
        </MenubarSub>
      ))}
    </div>
  )
}

import { useCallback, useEffect, useRef, useState, type ComponentProps, type PointerEvent as ReactPointerEvent } from 'react'

import { Tabs as TabsPrimitive } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'

import { Tabs, TabsContent, TabsTrigger, tabsListVariants } from '@/shared/ui/lib/Tabs'
import { cn } from '@/lib/utils'

const TRIGGER_SELECTOR = '[data-slot=tabs-trigger]'

const slidingTabsListVariants = cva(
  'group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none data-[variant=line]:p-0',
  {
    variants: {
      variant: {
        default: 'bg-[var(--overlay)] border border-[var(--glass-border)]',
        line: 'relative gap-1 bg-transparent',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

interface SlidingTabsListProps
  extends ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  hoverBg?: string
  activeBg?: string
  activeBorder?: string
  activeGlow?: boolean
  hoverPillClassName?: string
  activePillClassName?: string
  hoverRadius?: string
  activeRadius?: string
}

function SlidingTabsList({
  className,
  variant = 'default',
  hoverBg = 'var(--overlay-hover)',
  activeBg,
  activeBorder,
  activeGlow = true,
  hoverPillClassName,
  activePillClassName,
  hoverRadius,
  activeRadius,
  children,
  ...props
}: SlidingTabsListProps) {
  const listRef = useRef<HTMLDivElement | null>(null)
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)
  const [hover, setHover] = useState({ left: 0, top: 0, width: 0, height: 0, visible: false })

  const updateIndicator = useCallback(() => {
    if (!listRef.current || !indicatorRef.current) return
    const active = listRef.current.querySelector<HTMLElement>('[data-state="active"]')
    if (!active) {
      indicatorRef.current.style.opacity = '0'
      return
    }
    const listRect = listRef.current.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()
    const cs = getComputedStyle(listRef.current)
    const bL = parseFloat(cs.borderLeftWidth) || 0
    const bT = parseFloat(cs.borderTopWidth) || 0
    indicatorRef.current.style.opacity = '1'
    indicatorRef.current.style.left = `${activeRect.left - listRect.left - bL}px`
    indicatorRef.current.style.top = `${activeRect.top - listRect.top - bT}px`
    indicatorRef.current.style.width = `${activeRect.width}px`
    indicatorRef.current.style.height = `${activeRect.height}px`
  }, [])

  useEffect(() => {
    if (!listRef.current) return
    updateIndicator()
    const mo = new MutationObserver(updateIndicator)
    mo.observe(listRef.current, { attributes: true, attributeFilter: ['data-state'], subtree: true })
    const ro = new ResizeObserver(updateIndicator)
    for (const child of listRef.current.children) {
      if (child instanceof HTMLElement) ro.observe(child)
    }
    return () => {
      mo.disconnect()
      ro.disconnect()
    }
  }, [updateIndicator])

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null
    if (!target) return
    const trigger = target.closest<HTMLElement>(TRIGGER_SELECTOR)
    if (!trigger) return
    const root = listRef.current
    if (!root || !root.contains(trigger)) return
    if (trigger === lastTriggerRef.current) return
    lastTriggerRef.current = trigger
    if (trigger.getAttribute('data-state') === 'active') {
      setHover((prev) => ({ ...prev, visible: false }))
      return
    }
    const listRect = root.getBoundingClientRect()
    const tRect = trigger.getBoundingClientRect()
    const cs = getComputedStyle(root)
    const bL = parseFloat(cs.borderLeftWidth) || 0
    const bT = parseFloat(cs.borderTopWidth) || 0
    setHover({
      left: tRect.left - listRect.left - bL,
      top: tRect.top - listRect.top - bT,
      width: tRect.width,
      height: tRect.height,
      visible: true,
    })
  }

  const handlePointerLeave = () => {
    lastTriggerRef.current = null
    setHover((prev) => ({ ...prev, visible: false }))
  }

  const isDefault = variant === 'default'

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(slidingTabsListVariants({ variant }), 'relative', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <div
        aria-hidden
        className={cn('absolute pointer-events-none rounded-md z-0', hoverPillClassName)}
        style={{
          left: hover.left,
          top: hover.top,
          width: hover.width,
          height: hover.height,
          background: hoverBg,
          borderRadius: hoverRadius,
          opacity: hover.visible ? 1 : 0,
          transition:
            'left var(--motion-emphasized) var(--ease-emphasized), top var(--motion-emphasized) var(--ease-emphasized), width var(--motion-emphasized) var(--ease-emphasized), height var(--motion-emphasized) var(--ease-emphasized), opacity var(--motion-base) var(--ease-out)',
        }}
      />
      <div
        ref={indicatorRef}
        className={cn(
          'absolute rounded-md pointer-events-none z-0',
          isDefault
            ? cn('bg-[var(--accent)] border border-[var(--accent-bright)]', activeGlow && 'neon-glow-sm')
            : cn('bg-[var(--accent-subtle)]', activeGlow && 'neon-glow-xs'),
          activePillClassName
        )}
        style={{
          background: activeBg,
          border: activeBorder,
          borderRadius: activeRadius,
          transition:
            'left var(--motion-slide) var(--ease-standard), width var(--motion-slide) var(--ease-standard), top var(--motion-slide) var(--ease-standard), height var(--motion-slide) var(--ease-standard), opacity var(--motion-base) var(--ease-out)',
          opacity: 0,
        }}
      />
      {children}
    </TabsPrimitive.List>
  )
}

export { Tabs as SlidingTabs, SlidingTabsList, TabsTrigger as SlidingTabsTrigger, TabsContent as SlidingTabsContent }

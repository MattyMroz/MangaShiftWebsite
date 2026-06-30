import { useEffect, useRef, useState, type ComponentProps, type PointerEvent as ReactPointerEvent } from 'react'

import { ContextMenu as ContextMenuPrimitive } from 'radix-ui'

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/shared/ui/lib/context-menu'
import { cn } from '@/lib/utils'

const ITEM_SELECTOR =
  '[data-slot=context-menu-item], [data-slot=context-menu-checkbox-item], [data-slot=context-menu-radio-item], [data-slot=context-menu-sub-trigger]'

interface SlidingContextMenuContentProps
  extends ComponentProps<typeof ContextMenuPrimitive.Content> {
  hoverBg?: string
}

export function SlidingContextMenuContent({
  className,
  children,
  hoverBg = 'var(--accent-subtle)',
  ...props
}: SlidingContextMenuContentProps) {
  const innerRef = useRef<HTMLDivElement | null>(null)
  const lastItemRef = useRef<HTMLElement | null>(null)
  const [pill, setPill] = useState({ pos: 0, size: 0, visible: false })
  const [justShown, setJustShown] = useState(false)

  const showFor = (item: HTMLElement) => {
    const root = innerRef.current
    if (!root) return
    const rootRect = root.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    setPill((prev) => {
      if (!prev.visible) setJustShown(true)
      return {
        pos: itemRect.top - rootRect.top + root.scrollTop,
        size: itemRect.height,
        visible: true,
      }
    })
  }

  useEffect(() => {
    if (!justShown) return
    const id = requestAnimationFrame(() => setJustShown(false))
    return () => cancelAnimationFrame(id)
  }, [justShown])

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null
    if (!target) return
    const item = target.closest<HTMLElement>(ITEM_SELECTOR)
    if (!item) return
    const root = innerRef.current
    if (!root || !root.contains(item)) return
    if (item === lastItemRef.current) return
    lastItemRef.current = item
    showFor(item)
  }

  const handlePointerLeave = () => {
    lastItemRef.current = null
    setPill((prev) => ({ ...prev, visible: false }))
  }

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          'z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-1 text-popover-foreground shadow-md [&_[data-slot=context-menu-item]]:focus:!bg-transparent [&_[data-slot=context-menu-item][data-highlighted]]:!bg-transparent [&_[data-slot=context-menu-checkbox-item]]:focus:!bg-transparent [&_[data-slot=context-menu-checkbox-item][data-highlighted]]:!bg-transparent [&_[data-slot=context-menu-radio-item]]:focus:!bg-transparent [&_[data-slot=context-menu-radio-item][data-highlighted]]:!bg-transparent [&_[data-slot=context-menu-sub-trigger]]:focus:!bg-transparent [&_[data-slot=context-menu-sub-trigger][data-highlighted]]:!bg-transparent [&_[data-slot=context-menu-sub-trigger][data-state=open]]:!bg-transparent',
          className,
        )}
        {...props}
      >
        <div
          ref={innerRef}
          className="relative"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 z-0 rounded-sm"
            style={{
              height: pill.size,
              transform: `translateY(${pill.pos}px)`,
              background: hoverBg,
              opacity: pill.visible ? 1 : 0,
              transition: justShown
                ? 'opacity var(--motion-base) var(--ease-out)'
                : 'transform var(--motion-emphasized) var(--ease-emphasized), height var(--motion-emphasized) var(--ease-emphasized), opacity var(--motion-base) var(--ease-out)',
            }}
          />
          <div className="relative z-[1]">{children}</div>
        </div>
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  )
}

export {
  ContextMenu as SlidingContextMenu,
  ContextMenuTrigger as SlidingContextMenuTrigger,
  ContextMenuItem as SlidingContextMenuItem,
  ContextMenuCheckboxItem as SlidingContextMenuCheckboxItem,
  ContextMenuRadioGroup as SlidingContextMenuRadioGroup,
  ContextMenuRadioItem as SlidingContextMenuRadioItem,
  ContextMenuLabel as SlidingContextMenuLabel,
  ContextMenuSeparator as SlidingContextMenuSeparator,
  ContextMenuShortcut as SlidingContextMenuShortcut,
  ContextMenuGroup as SlidingContextMenuGroup,
  ContextMenuSub as SlidingContextMenuSub,
  ContextMenuSubTrigger as SlidingContextMenuSubTrigger,
  ContextMenuSubContent as SlidingContextMenuSubContent,
  ContextMenuPortal as SlidingContextMenuPortal,
}

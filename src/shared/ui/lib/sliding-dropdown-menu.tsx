import { useEffect, useRef, useState, type ComponentProps, type PointerEvent as ReactPointerEvent } from 'react'

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/shared/ui/lib/dropdown-menu'
import { cn } from '@/lib/utils'

const ITEM_SELECTOR =
  '[data-slot=dropdown-menu-item], [data-slot=dropdown-menu-checkbox-item], [data-slot=dropdown-menu-radio-item], [data-slot=dropdown-menu-sub-trigger]'

interface SlidingDropdownMenuContentProps
  extends ComponentProps<typeof DropdownMenuPrimitive.Content> {
  hoverBg?: string
}

export function SlidingDropdownMenuContent({
  className,
  children,
  sideOffset = 4,
  hoverBg = 'var(--accent-subtle)',
  ...props
}: SlidingDropdownMenuContentProps) {
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
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          'z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-1 text-popover-foreground shadow-md [&_[data-slot=dropdown-menu-item]]:focus:!bg-transparent [&_[data-slot=dropdown-menu-item][data-highlighted]]:!bg-transparent [&_[data-slot=dropdown-menu-checkbox-item]]:focus:!bg-transparent [&_[data-slot=dropdown-menu-checkbox-item][data-highlighted]]:!bg-transparent [&_[data-slot=dropdown-menu-radio-item]]:focus:!bg-transparent [&_[data-slot=dropdown-menu-radio-item][data-highlighted]]:!bg-transparent [&_[data-slot=dropdown-menu-sub-trigger]]:focus:!bg-transparent [&_[data-slot=dropdown-menu-sub-trigger][data-highlighted]]:!bg-transparent [&_[data-slot=dropdown-menu-sub-trigger][data-state=open]]:!bg-transparent',
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
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
}

export {
  DropdownMenu as SlidingDropdownMenu,
  DropdownMenuTrigger as SlidingDropdownMenuTrigger,
  DropdownMenuItem as SlidingDropdownMenuItem,
  DropdownMenuCheckboxItem as SlidingDropdownMenuCheckboxItem,
  DropdownMenuRadioGroup as SlidingDropdownMenuRadioGroup,
  DropdownMenuRadioItem as SlidingDropdownMenuRadioItem,
  DropdownMenuLabel as SlidingDropdownMenuLabel,
  DropdownMenuSeparator as SlidingDropdownMenuSeparator,
  DropdownMenuShortcut as SlidingDropdownMenuShortcut,
  DropdownMenuGroup as SlidingDropdownMenuGroup,
  DropdownMenuSub as SlidingDropdownMenuSub,
  DropdownMenuSubTrigger as SlidingDropdownMenuSubTrigger,
  DropdownMenuSubContent as SlidingDropdownMenuSubContent,
  DropdownMenuPortal as SlidingDropdownMenuPortal,
}

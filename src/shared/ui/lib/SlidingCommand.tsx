import { useEffect, useRef, useState, type ComponentProps } from 'react'

import { Command as CommandPrimitive } from 'cmdk'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '@/shared/ui/lib/Command'
import { cn } from '@/lib/utils'

interface SlidingCommandListProps
  extends ComponentProps<typeof CommandPrimitive.List> {
  hoverBg?: string
}

export function SlidingCommandList({
  className,
  children,
  hoverBg = 'var(--accent-subtle)',
  ...props
}: SlidingCommandListProps) {
  const listRef = useRef<HTMLDivElement | null>(null)
  const [pill, setPill] = useState({ pos: 0, size: 0, visible: false })
  const [justShown, setJustShown] = useState(false)

  useEffect(() => {
    if (!justShown) return
    const id = requestAnimationFrame(() => setJustShown(false))
    return () => cancelAnimationFrame(id)
  }, [justShown])

  useEffect(() => {
    const root = listRef.current
    if (!root) return

    const measure = () => {
      const selected = root.querySelector<HTMLElement>('[data-selected="true"]')
      if (!selected) {
        setPill((prev) => ({ ...prev, visible: false }))
        return
      }
      const rootRect = root.getBoundingClientRect()
      const itemRect = selected.getBoundingClientRect()
      setPill((prev) => {
        if (!prev.visible) setJustShown(true)
        return {
          pos: itemRect.top - rootRect.top + root.scrollTop,
          size: itemRect.height,
          visible: true,
        }
      })
    }

    measure()
    const observer = new MutationObserver(measure)
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-selected'],
      subtree: true,
      childList: true,
    })
    root.addEventListener('scroll', measure)
    return () => {
      observer.disconnect()
      root.removeEventListener('scroll', measure)
    }
  }, [children])

  return (
    <CommandPrimitive.List
      ref={listRef}
      data-slot="command-list"
      className={cn(
        'relative max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto [&_[data-slot=command-item][data-selected=true]]:!bg-transparent',
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1 right-1 top-0 z-0 rounded-sm"
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
    </CommandPrimitive.List>
  )
}

export {
  Command as SlidingCommand,
  CommandDialog as SlidingCommandDialog,
  CommandInput as SlidingCommandInput,
  CommandEmpty as SlidingCommandEmpty,
  CommandGroup as SlidingCommandGroup,
  CommandItem as SlidingCommandItem,
  CommandShortcut as SlidingCommandShortcut,
  CommandSeparator as SlidingCommandSeparator,
}

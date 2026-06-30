
import { MoreHorizontal } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/shared/ui/lib/menubar'
import { cn } from '@/lib/utils'

export interface MenuItemDef {
  label: string
  shortcut?: string
  onSelect: () => void
}

export type MenuEntry = MenuItemDef | 'separator'

export interface MenuSectionDef {
  label: string
  items: MenuEntry[]
}

interface OverflowMenubarProps {
  sections: MenuSectionDef[]
  className?: string
  ariaLabelMore?: string
}

const TRIGGER_CLASS = 'h-7 px-2 text-xs font-normal'
const MORE_TRIGGER_CLASS = 'h-7 px-2 text-xs font-normal flex items-center'

function renderItems(items: MenuEntry[]) {
  return items.map((entry, idx) =>
    entry === 'separator' ? (
      <MenubarSeparator key={`sep-${idx}`} />
    ) : (
      <MenubarItem key={entry.label} onSelect={entry.onSelect}>
        {entry.label}
        {entry.shortcut && <MenubarShortcut>{entry.shortcut}</MenubarShortcut>}
      </MenubarItem>
    ),
  )
}

export function OverflowMenubar({
  sections,
  className,
  ariaLabelMore = 'More menu items',
}: OverflowMenubarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const measureRef = useRef<HTMLDivElement | null>(null)
  const [widths, setWidths] = useState<number[]>([])
  const [moreWidth, setMoreWidth] = useState(28)
  const [visibleCount, setVisibleCount] = useState(sections.length)

  useLayoutEffect(() => {
    const mirror = measureRef.current
    if (!mirror) return
    const triggers = mirror.querySelectorAll<HTMLElement>('[data-measure="trigger"]')
    setWidths(Array.from(triggers).map((el) => el.offsetWidth))
    const more = mirror.querySelector<HTMLElement>('[data-measure="more"]')
    if (more) setMoreWidth(more.offsetWidth)
  }, [sections])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container || widths.length === 0) return

    const recalc = () => {
      const available = container.clientWidth
      let used = 0
      let count = 0
      for (let i = 0; i < widths.length; i++) {
        const isLast = i === widths.length - 1
        const reserve = isLast ? 0 : moreWidth
        if (used + widths[i] + reserve <= available) {
          used += widths[i]
          count = i + 1
        } else {
          break
        }
      }
      setVisibleCount(count)
    }

    const ro = new ResizeObserver(recalc)
    ro.observe(container)
    recalc()
    return () => ro.disconnect()
  }, [widths, moreWidth])

  const safeVisibleCount = Math.min(visibleCount, sections.length)
  const visibleSections = sections.slice(0, safeVisibleCount)
  const overflowSections = sections.slice(safeVisibleCount)
  const hasOverflow = overflowSections.length > 0

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible fixed left-0 top-0 -z-10 flex"
      >
        {sections.map((section) => (
          <span
            key={`measure-${section.label}`}
            data-measure="trigger"
            className={cn(TRIGGER_CLASS, 'inline-flex items-center')}
          >
            {section.label}
          </span>
        ))}
        <span data-measure="more" className={cn(MORE_TRIGGER_CLASS)}>
          <MoreHorizontal size={14} />
        </span>
      </div>

      <div
        ref={containerRef}
        data-tauri-drag-region
        className={cn('flex min-w-0 flex-1 items-center', className)}
      >
        <Menubar className="h-7 border-0 bg-transparent px-0 shadow-none">
          {visibleSections.map((section) => (
            <MenubarMenu key={section.label}>
              <MenubarTrigger className={TRIGGER_CLASS}>{section.label}</MenubarTrigger>
              <MenubarContent>{renderItems(section.items)}</MenubarContent>
            </MenubarMenu>
          ))}

          {hasOverflow && (
            <MenubarMenu>
              <MenubarTrigger className={MORE_TRIGGER_CLASS} aria-label={ariaLabelMore}>
                <MoreHorizontal size={14} />
              </MenubarTrigger>
              <MenubarContent className="w-fit min-w-fit">
                {overflowSections.map((section) => (
                  <MenubarSub key={section.label}>
                    <MenubarSubTrigger>{section.label}</MenubarSubTrigger>
                    <MenubarPortal>
                      <MenubarSubContent className="w-fit min-w-fit">
                        {renderItems(section.items)}
                      </MenubarSubContent>
                    </MenubarPortal>
                  </MenubarSub>
                ))}
              </MenubarContent>
            </MenubarMenu>
          )}
        </Menubar>
      </div>
    </>
  )
}

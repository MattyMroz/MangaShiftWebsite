/** Sliding-pill Select built on Radix Select. Single accent pill follows the highlighted item (mouse + keyboard). */
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

export interface SlidingSelectItem {
  value: string
  label: ReactNode
  endLabel?: ReactNode
  disabled?: boolean
}

interface SlidingSelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  items: SlidingSelectItem[]
  placeholder?: string
  triggerClassName?: string
  triggerEndAdornment?: ReactNode
  contentClassName?: string
  triggerSize?: 'sm' | 'default'
  disabled?: boolean
  ariaLabel?: string
}

export function SlidingSelect({
  value,
  defaultValue,
  onValueChange,
  items,
  placeholder,
  triggerClassName,
  triggerEndAdornment,
  contentClassName,
  triggerSize = 'default',
  disabled,
  ariaLabel,
}: SlidingSelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        aria-label={ariaLabel}
        data-size={triggerSize}
        className={cn(
          'flex w-fit items-center justify-between gap-1.5 rounded-md border border-[var(--btn-border)] bg-[var(--btn-bg)] pl-3 pr-2 py-1.5 text-sm whitespace-nowrap transition-[color,box-shadow,background,border-color] duration-150 outline-none focus-visible:border-[var(--accent-border)] focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]/30 hover:bg-[var(--btn-hover)] disabled:cursor-not-allowed disabled:opacity-40 data-[placeholder]:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 cursor-pointer',
          triggerClassName,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        {triggerEndAdornment}
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon className="size-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="item-aligned"
          className={cn(
            'relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl text-foreground shadow-md',
            contentClassName,
          )}
          style={{ marginTop: '-1px', marginBottom: '-1px' }}
        >
          <SlidingSelectViewport items={items} />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

interface ViewportProps {
  items: SlidingSelectItem[]
}

/** Viewport with sliding accent pill rendered inside Viewport but absolutely positioned, items stay direct children for Radix item-aligned. */
function SlidingSelectViewport({ items }: ViewportProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [pill, setPill] = useState({ x: 0, y: 0, w: 0, h: 0, visible: false, animated: false })

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const pickTarget = (): HTMLElement | null => {
      return (
        viewport.querySelector<HTMLElement>('[data-highlighted]') ??
        viewport.querySelector<HTMLElement>('[data-state="checked"]')
      )
    }

    const update = () => {
      const target = pickTarget()
      if (!target) {
        setPill((p) => ({ ...p, visible: false, animated: false }))
        return
      }
      setPill((prev) => ({
        x: target.offsetLeft,
        y: target.offsetTop,
        w: target.offsetWidth,
        h: target.offsetHeight,
        visible: true,
        // first appearance snaps; subsequent highlight changes animate
        animated: prev.visible,
      }))
    }

    const observer = new MutationObserver(update)
    observer.observe(viewport, {
      attributes: true,
      attributeFilter: ['data-highlighted', 'data-state'],
      subtree: true,
    })
    // initial paint may need a frame for Radix to attach data-state on items
    requestAnimationFrame(update)

    return () => observer.disconnect()
  }, [items.length])

  return (
    <SelectPrimitive.Viewport ref={viewportRef} className="p-1 w-full relative">
      <div
        aria-hidden
        className="absolute top-0 left-0 rounded-sm pointer-events-none z-0"
        style={{
          transform: `translate(${pill.x}px, ${pill.y}px)`,
          width: pill.w,
          height: pill.h,
          opacity: pill.visible ? 1 : 0,
          background: 'var(--accent-subtle)',
          transition: pill.animated
            ? 'transform 180ms cubic-bezier(0.4, 0, 0.2, 1), width 180ms cubic-bezier(0.4, 0, 0.2, 1), height 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 120ms ease-out'
            : 'opacity 120ms ease-out',
        }}
      />
      {items.map((item) => (
        <SelectPrimitive.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={cn(
            'relative z-[1] flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none',
            'focus:bg-transparent data-[highlighted]:bg-transparent',
            'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
          )}
        >
          <span className="absolute right-2 flex size-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
              <CheckIcon className="size-4" />
            </SelectPrimitive.ItemIndicator>
          </span>
          <SelectPrimitive.ItemText>
            <span className="-mt-px inline-block">{item.label}</span>
          </SelectPrimitive.ItemText>
          {item.endLabel ? (
            <span className="ml-auto pr-6">{item.endLabel}</span>
          ) : null}
        </SelectPrimitive.Item>
      ))}
    </SelectPrimitive.Viewport>
  )
}

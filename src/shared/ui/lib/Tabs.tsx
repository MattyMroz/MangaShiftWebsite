import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none data-[variant=line]:p-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--overlay)] border border-[var(--glass-border)]",
        line: "relative gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const indicatorRef = React.useRef<HTMLDivElement>(null)

  // Slide indicator to active trigger
  const updateIndicator = React.useCallback(() => {
    if (!listRef.current || !indicatorRef.current) return
    const active = listRef.current.querySelector<HTMLElement>(
      '[data-state="active"]'
    )
    if (!active) {
      indicatorRef.current.style.opacity = "0"
      return
    }
    const listRect = listRef.current.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()
    const cs = getComputedStyle(listRef.current)
    const bL = parseFloat(cs.borderLeftWidth) || 0
    const bT = parseFloat(cs.borderTopWidth) || 0
    indicatorRef.current.style.opacity = "1"
    indicatorRef.current.style.left = `${activeRect.left - listRect.left - bL}px`
    indicatorRef.current.style.top = `${activeRect.top - listRect.top - bT}px`
    indicatorRef.current.style.width = `${activeRect.width}px`
    indicatorRef.current.style.height = `${activeRect.height}px`
  }, [])

  React.useEffect(() => {
    if (!listRef.current) return
    updateIndicator()

    // Recalculate indicator on active-state changes
    const mo = new MutationObserver(updateIndicator)
    mo.observe(listRef.current, {
      attributes: true,
      attributeFilter: ["data-state"],
      subtree: true,
    })

    // Recalculate on layout shifts (e.g. font-family change resizing triggers)
    const ro = new ResizeObserver(updateIndicator)
    for (const child of listRef.current.children) {
      if (child instanceof HTMLElement && child !== indicatorRef.current) {
        ro.observe(child)
      }
    }

    return () => {
      mo.disconnect()
      ro.disconnect()
    }
  }, [updateIndicator])

  const isDefault = variant === "default"

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), "relative", className)}
      {...props}
    >
      <div
        ref={indicatorRef}
        className={cn(
          "absolute rounded-md pointer-events-none z-0",
          isDefault
            ? "bg-[var(--accent)] border border-[var(--accent-bright)] neon-glow-sm"
            : "bg-[var(--accent-subtle)] neon-glow-xs",
        )}
        style={{
          transition:
            "left var(--motion-slide) var(--ease-standard), width var(--motion-slide) var(--ease-standard), top var(--motion-slide) var(--ease-standard), height var(--motion-slide) var(--ease-standard), opacity var(--motion-base) var(--ease-out)",
          opacity: 0,
        }}
      />
      {props.children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-[1] inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-muted-foreground transition-all duration-[var(--motion-base)] group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-[var(--accent-border)] focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]/30 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[state=active]:bg-transparent data-[state=active]:border-transparent data-[state=active]:text-[var(--accent-fg)]",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:text-[var(--accent)]",
        "after:absolute after:bg-[var(--accent)] after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }

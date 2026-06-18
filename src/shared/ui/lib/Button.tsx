'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-[var(--motion-base)] outline-none btn-press focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]/30 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default:
          'bg-[var(--btn-bg)] border border-[var(--btn-border)] text-foreground hover:bg-[var(--btn-hover)] hover:text-foreground',
        accent:
          'bg-[var(--accent)] text-[var(--accent-fg)] border border-transparent hover:brightness-110',
        primary:
          'bg-[var(--foreground)] text-[var(--background)] border border-[var(--foreground)] hover:brightness-110',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20',
        outline:
          'bg-[var(--btn-bg)] border border-[var(--btn-border)] text-muted-foreground hover:bg-[var(--btn-hover)] hover:text-foreground',
        secondary:
          'bg-[var(--overlay)] text-muted-foreground hover:bg-[var(--overlay-hover)] hover:text-foreground',
        ghost:
          'text-muted-foreground hover:bg-[var(--overlay-hover)] hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-8 px-3 py-1.5 has-[>svg]:pl-2.5 has-[>svg]:gap-1.5',
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1.5 rounded-md px-2.5 text-xs has-[>svg]:pl-2",
        lg: "h-9 px-5 has-[>svg]:pl-3.5 has-[>svg]:gap-1.5",
        pill: "h-9 rounded-full px-5 has-[>svg]:pl-3.5 has-[>svg]:gap-1.5",
        'pill-sm': "h-7 gap-1.5 rounded-full px-3 text-xs has-[>svg]:pl-2",
        landing: "h-auto rounded-[var(--radius)] px-6 py-3 text-[length:var(--normal-font-size)] tracking-tight",
        'landing-sm': "h-auto rounded-[var(--radius)] px-4 py-2 text-[length:var(--small-font-size)] tracking-tight",
        'landing-pill': "h-auto rounded-full px-8 py-3.5 text-[length:var(--h3-font-size)] tracking-tight md:px-10 md:py-4",
        'landing-pill-sm': "h-auto rounded-full px-6 py-2.5 text-[length:var(--small-font-size)] tracking-tight",
        icon: 'size-8',
        'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        'icon-lg': "size-9 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

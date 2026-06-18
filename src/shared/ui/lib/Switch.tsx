import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"


function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-[42px] shrink-0 items-center rounded-full",
        "border transition-all duration-[var(--motion-slide)] cursor-pointer",
        "outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]/30",
        "disabled:cursor-not-allowed disabled:opacity-40",

        "data-[state=unchecked]:bg-[var(--overlay)] data-[state=unchecked]:border-[var(--glass-border)]",

        "data-[state=checked]:bg-[var(--accent-subtle)] data-[state=checked]:border-[var(--accent-border)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-[18px] w-[18px] rounded-full",
          "transition-all duration-[var(--motion-slide)]",

          "data-[state=unchecked]:translate-x-[2px] data-[state=unchecked]:bg-[var(--overlay-hover)]",

          "data-[state=checked]:translate-x-[20px] data-[state=checked]:bg-[var(--accent-bright)]",
          "data-[state=checked]:shadow-[0_0_8px_var(--accent-glow)]",
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

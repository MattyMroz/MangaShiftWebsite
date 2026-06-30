import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-[var(--btn-border)] bg-[var(--btn-bg)] px-3 py-2 text-base transition-[color,box-shadow,background,border-color] duration-[var(--motion-base)] outline-none placeholder:text-muted-foreground hover:bg-[var(--btn-hover)] focus-visible:border-[var(--accent-border)] focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]/30 disabled:cursor-not-allowed disabled:opacity-40 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

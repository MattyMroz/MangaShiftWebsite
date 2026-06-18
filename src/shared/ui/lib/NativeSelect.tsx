import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NativeSelect({
  className,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"select">, "size"> & { size?: "sm" | "default" }) {
  return (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-40"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          "h-8 w-full min-w-0 appearance-none rounded-md border border-[var(--btn-border)] bg-[var(--btn-bg)] px-3 py-2 pr-9 text-sm transition-[color,box-shadow,background,border-color] duration-[var(--motion-base)] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground hover:bg-[var(--btn-hover)] disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-7 data-[size=sm]:py-1",
          "focus-visible:border-[var(--accent-border)] focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]/30",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }

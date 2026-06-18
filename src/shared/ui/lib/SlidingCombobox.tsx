import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  SlidingCommand,
  SlidingCommandEmpty,
  SlidingCommandGroup,
  SlidingCommandInput,
  SlidingCommandItem,
  SlidingCommandList,
} from '@/shared/ui/lib/SlidingCommand'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/lib/Popover'

export interface SlidingComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

interface SlidingComboboxProps {
  options: SlidingComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
}

export function SlidingCombobox({
  options,
  value,
  onValueChange,
  placeholder = 'Choose...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results.',
  className,
  disabled,
}: SlidingComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const listId = React.useId()

  const selected = options.find((o) => o.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-controls={listId}
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
          className={cn(
            'inline-flex h-8 w-[200px] items-center justify-between gap-2 rounded-lg border border-[var(--btn-border)] bg-[var(--btn-bg)] px-3 text-sm font-normal transition-colors hover:bg-[var(--btn-hover)]',
            !selected && 'text-muted-foreground',
            disabled && 'pointer-events-none opacity-40',
            className,
          )}
        >
          {selected?.label ?? placeholder}
          <ChevronsUpDown className="size-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <SlidingCommand>
          <SlidingCommandInput placeholder={searchPlaceholder} />
          <SlidingCommandList id={listId}>
            <SlidingCommandEmpty>{emptyMessage}</SlidingCommandEmpty>
            <SlidingCommandGroup>
              {options.map((option) => (
                <SlidingCommandItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  keywords={[option.label]}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  <Check className={cn('ml-auto', value === option.value ? 'opacity-100' : 'opacity-0')} />
                </SlidingCommandItem>
              ))}
            </SlidingCommandGroup>
          </SlidingCommandList>
        </SlidingCommand>
      </PopoverContent>
    </Popover>
  )
}

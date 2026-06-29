/**
 * Combobox — Command + Popover pattern
 *
 * Reusable searchable dropdown built from existing Command + Popover primitives.
 *
 * Usage:
 *   <Combobox
 *     options={[{ value: 'pl', label: 'Polski' }, { value: 'en', label: 'English' }]}
 *     value={lang}
 *     onValueChange={setLang}
 *     placeholder="Choose language..."
 *     searchPlaceholder="Szukaj..."
 *     emptyMessage="Nie znaleziono."
 *   />
 */

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/Command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
}

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Wybierz...',
  searchPlaceholder = 'Szukaj...',
  emptyMessage = 'Nie znaleziono.',
  className,
  disabled,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selected = options.find((o) => o.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
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
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
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
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox }

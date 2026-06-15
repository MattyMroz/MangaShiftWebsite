import { cn } from '@/lib/utils'

interface KbdProps {
  children: React.ReactNode
  className?: string
}

export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-[20px] items-center justify-center',
        'rounded-[4px] border px-1.5',
        'font-mono text-[10px] font-medium leading-none',
        'text-muted-foreground select-none',
        'bg-[var(--overlay)] border-[var(--glass-border)] shadow-[0_1px_0_var(--glass-border)]',
        className,
      )}
    >
      {children}
    </kbd>
  )
}

export function KbdCombo({ keys, separator = '+' }: { keys: string[]; separator?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {keys.map((key, i) => (
        <span key={i} className="inline-flex items-center gap-0.5">
          {i > 0 && <span className="text-[10px] text-dim mx-0.5">{separator}</span>}
          <Kbd>{key}</Kbd>
        </span>
      ))}
    </span>
  )
}

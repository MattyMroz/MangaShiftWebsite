import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/shared/ui/lib/AlertDialog'
import { cn } from '@/lib/utils'

export type ConfirmDialogVariant = 'default' | 'destructive'

export interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  icon: LucideIcon
  title: string
  description?: ReactNode
  confirmLabel?: string
  pendingLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  isPending?: boolean
  isError?: boolean
  errorMessage?: string
  variant?: ConfirmDialogVariant
}

const VARIANT_STYLES: Record<
  ConfirmDialogVariant,
  { mediaBg: string; mediaBorder: string; iconColor: string; glow: string }
> = {
  default: {
    mediaBg: 'bg-[var(--accent-subtle)]',
    mediaBorder: 'border-[var(--accent-border)]',
    iconColor: 'text-[var(--accent-bright)]',
    glow: '0 0 12px 0 var(--accent-glow)',
  },
  destructive: {
    mediaBg: 'bg-[var(--destructive-subtle)]',
    mediaBorder: 'border-[var(--destructive-border)]',
    iconColor: 'text-[var(--destructive)]',
    glow: '0 0 12px 0 var(--destructive-glow)',
  },
}

export function ConfirmDialog({
  open,
  onOpenChange,
  icon: Icon,
  title,
  description,
  confirmLabel = 'Confirm',
  pendingLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  isPending = false,
  isError = false,
  errorMessage,
  variant = 'default',
}: ConfirmDialogProps) {
  const styles = VARIANT_STYLES[variant]
  const actionVariant = variant === 'destructive' ? 'destructive' : 'default'

  const buttonLabel =
    isPending && pendingLabel !== undefined ? pendingLabel : confirmLabel
  const [snapshot, setSnapshot] = useState<{
    description: ReactNode
    buttonLabel: string
  }>({ description, buttonLabel })
  if (
    open &&
    (snapshot.description !== description || snapshot.buttonLabel !== buttonLabel)
  ) {
    setSnapshot({ description, buttonLabel })
  }
  const displayDescription = open ? description : snapshot.description
  const displayButtonLabel = open ? buttonLabel : snapshot.buttonLabel

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-xl border',
              styles.mediaBg,
              styles.mediaBorder,
            )}
            style={{ boxShadow: styles.glow }}
          >
            <Icon size={20} strokeWidth={1.7} className={styles.iconColor} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <AlertDialogTitle className="text-base leading-tight">{title}</AlertDialogTitle>
            {displayDescription !== undefined && displayDescription !== null && (
              <AlertDialogDescription className="text-sm">
                {displayDescription}
              </AlertDialogDescription>
            )}
          </div>
        </div>
        {isError && errorMessage !== undefined && (
          <p className="text-xs text-[var(--destructive)]" role="alert">
            {errorMessage}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault()
              onConfirm()
            }}
            disabled={isPending}
            variant={actionVariant}
          >
            {displayButtonLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


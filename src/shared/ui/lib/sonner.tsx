import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import { useAppStore } from '@/stores/use-app-store'

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useAppStore((s) => s.theme)

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'glass border-[var(--glass-border)] !bg-[var(--glass-bg)] text-foreground',
          title: 'text-foreground font-medium',
          description: 'text-muted-foreground',
          actionButton:
            'bg-[var(--accent)] text-[var(--accent-fg)] hover:brightness-110',
          cancelButton:
            'bg-[var(--overlay)] text-muted-foreground hover:text-foreground',
          success: 'border-l-2 !border-l-green-500',
          error: 'border-l-2 !border-l-red-500',
          warning: 'border-l-2 !border-l-amber-500',
          info: 'border-l-2 !border-l-blue-500',
        },
      }}
      style={
        {
          '--normal-bg': 'var(--glass-bg)',
          '--normal-text': 'var(--foreground)',
          '--normal-border': 'var(--glass-border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

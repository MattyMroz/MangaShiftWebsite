import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      default: 'size-5',
      lg: 'size-6',
      xl: 'size-8',
    },
  },
  defaultVariants: { size: 'default' },
})

function Spinner({
  className,
  size,
  ...props
}: React.ComponentProps<'svg'> & VariantProps<typeof spinnerVariants>) {
  return (
    <svg
      data-slot="spinner"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <circle cx="12" cy="12" r="10" opacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Spinner, spinnerVariants }

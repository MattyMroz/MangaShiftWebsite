import { cn } from '@/lib/utils'

interface AppIconProps {
  size?: number
  className?: string
}

/**
 * MangaShift brand icon — two stacked manga pages with text lines.
 *
 * Visual metaphor: source page (back) shifts into translated page (front).
 * Replaces the EchoReader microphone glyph; same gradient tokens.
 */
export function AppIcon({ size = 24, className }: AppIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={cn('shrink-0', className)}
    >
      {/* Back page (source) — slightly offset to suggest a stack */}
      <rect
        x="10"
        y="4"
        width="17"
        height="21"
        rx="2.5"
        fill="url(#ms-icon-grad)"
        opacity="0.35"
      />
      {/* Front page (translated) */}
      <rect
        x="5"
        y="7"
        width="17"
        height="21"
        rx="2.5"
        fill="url(#ms-icon-grad)"
      />
      {/* Page corner fold on the front */}
      <path
        d="M18.5 7 L22 7 L22 10.5 Z"
        fill="currentColor"
        opacity="0.18"
      />
      {/* Text lines knocked out (translated content) */}
      <line x1="8.5" y1="13" x2="18" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
      <line x1="8.5" y1="17" x2="19" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
      <line x1="8.5" y1="21" x2="14.5" y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />

      <defs>
        <linearGradient
          id="ms-icon-grad"
          x1="5"
          y1="4"
          x2="27"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--accent-bright, #a78bfa)" />
          <stop offset="1" stopColor="var(--accent-dim, #7c3aed)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

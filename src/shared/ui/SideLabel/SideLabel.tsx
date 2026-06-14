import { cn } from '@/shared/lib/utils/cn';

interface SideLabelProps {
    children: React.ReactNode;
    side?: 'left' | 'right';
    tone?: 'light' | 'dark';
    className?: string;
}

export const SideLabel = ({ children, side = 'left', tone = 'light', className }: SideLabelProps) => (
    <span
        aria-hidden="true"
        className={cn(
            'pointer-events-none absolute top-1/2 z-10 hidden -translate-y-1/2 items-center gap-4 whitespace-nowrap font-mono text-[0.82rem] font-semibold uppercase tracking-[0.4em] [writing-mode:vertical-rl] rotate-180 xl:flex',
            tone === 'dark' ? 'text-white/45' : 'text-[var(--text-muted)]',
            side === 'left' ? 'left-6' : 'right-6',
            className,
        )}
    >
        <span aria-hidden className="h-10 w-px shrink-0 bg-[var(--accent)]" />
        {children}
    </span>
);

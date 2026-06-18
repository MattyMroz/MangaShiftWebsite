import { cn } from '@/shared/lib/utils/cn';

interface LiveDotProps {
    /** `ping` = pulsująca otoczka + statyczny rdzeń; `pulse` = pojedyncza migająca kropka. */
    variant?: 'ping' | 'pulse';
    size?: 'sm' | 'md';
    /** Nadpisuje kolor rdzenia/otoczki (domyślnie `bg-[var(--accent)]`). */
    className?: string;
}

const sizes = {
    sm: 'h-1.5 w-1.5',
    md: 'h-3 w-3',
};

export const LiveDot = ({ variant = 'ping', size = 'sm', className }: LiveDotProps) => {
    const dot = cn(sizes[size], 'rounded-full bg-[var(--accent)]', className);

    if (variant === 'pulse') {
        return <span className={cn('inline-flex animate-pulse', dot)} aria-hidden="true" />;
    }

    return (
        <span className={cn('relative inline-flex shrink-0', sizes[size])} aria-hidden="true">
            <span className={cn('absolute inline-flex h-full w-full animate-[live-ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50', dot)} />
            <span className={cn('relative inline-flex', dot)} />
        </span>
    );
};

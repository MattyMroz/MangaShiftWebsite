import React from 'react';
import { cn } from '@/shared/lib/utils/cn';

type BadgeVariant = 'pill' | 'outline' | 'accent';

interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
    variant?: BadgeVariant;

    as?: 'span' | 'li' | 'div';
}

const base =
    'inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[1rem] uppercase tracking-[0.16em]';

const variants: Record<BadgeVariant, string> = {
    pill: 'bg-[var(--bg-alpha)] text-[var(--text)] backdrop-blur',
    outline: 'border border-[var(--line-strong)] text-[var(--text-muted)]',
    accent: 'bg-[var(--accent)] text-white',
};

export const Badge = ({ variant = 'outline', as: Tag = 'span', className, ...props }: BadgeProps) => (
    <Tag className={cn(base, variants[variant], className)} {...props} />
);

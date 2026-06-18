import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface EditorialRuleProps {

    index: string;

    page: string;

    children: ReactNode;
    className?: string;
}

export const EditorialRule = ({ index, page, children, className }: EditorialRuleProps) => (
    <div
        data-scroll-target
        className={cn(
            'grid grid-cols-[auto_1fr_auto] items-center gap-[1.6rem] border-t border-[var(--line)] pt-[1.2rem] font-mono text-[1rem] uppercase tracking-[0.18em] text-[var(--text-faint)]',
            className,
        )}
    >
        <span className="text-[var(--accent-text)]">{index}</span>
        <span className="truncate">{children}</span>
        <span className="tabular-nums">{page}</span>
    </div>
);

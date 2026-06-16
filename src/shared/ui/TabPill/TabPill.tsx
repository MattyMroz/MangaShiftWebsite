'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

interface Tab {
    id: string;
    label: string;
}

interface TabPillProps {
    tabs: readonly Tab[];
    active: string;
    onChange: (id: string) => void;
    /** Unikalny id animacji slidera (gdy >1 TabPill na stronie). */
    layoutId?: string;
    'aria-label'?: string;
    className?: string;
    tabClassName?: string;
}

export const TabPill = ({
    tabs,
    active,
    onChange,
    layoutId = 'tabpill-active',
    'aria-label': ariaLabel,
    className,
    tabClassName,
}: TabPillProps) => (
    <div
        role="tablist"
        aria-label={ariaLabel}
        className={cn(
            'relative grid gap-1 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-1.5 sm:grid-cols-3 sm:rounded-full',
            className,
        )}
    >
        {tabs.map((tab) => {
            const selected = tab.id === active;
            return (
                <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => onChange(tab.id)}
                    className={cn('relative z-10 min-h-12 rounded-full px-5 py-3 text-center', tabClassName)}
                >
                    {selected && (
                        <motion.span
                            layoutId={layoutId}
                            className="absolute inset-0 -z-10 rounded-full bg-[var(--text)] shadow-[var(--shadow-sm)]"
                            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                        />
                    )}
                    <span
                        className={cn(
                            'font-mono text-[1.05rem] uppercase tracking-[0.18em]',
                            selected ? 'text-[var(--bg)]' : 'text-[var(--text-muted)]',
                        )}
                    >
                        {tab.label}
                    </span>
                </button>
            );
        })}
    </div>
);

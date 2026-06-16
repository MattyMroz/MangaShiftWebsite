import React from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface CheckboxProps extends Omit<React.ComponentProps<'input'>, 'type'> {
    label?: React.ReactNode;
    boxClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className, boxClassName, checked, ...props }, ref) => (
        <label className={cn('flex cursor-pointer items-center gap-3', className)}>
            <input ref={ref} type="checkbox" checked={checked} className="peer sr-only" {...props} />
            <span
                aria-hidden="true"
                className={cn(
                    'grid h-6 w-6 shrink-0 place-items-center rounded-[0.8rem] border transition-colors duration-200',
                    checked
                        ? 'border-[var(--accent)] bg-[var(--accent)]'
                        : 'border-[var(--line-strong)] bg-[var(--surface)]',
                    boxClassName,
                )}
            >
                <svg
                    viewBox="0 0 24 24"
                    className={cn('h-3.5 w-3.5 text-white transition-transform duration-200', checked ? 'scale-100' : 'scale-0')}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 12l5 5L20 7" />
                </svg>
            </span>
            {label && <span className="text-[1.3rem] leading-[1.55] text-[var(--text-muted)]">{label}</span>}
        </label>
    ),
);

Checkbox.displayName = 'Checkbox';

import React from 'react';
import { cn } from '@/shared/lib/utils/cn';

type InputSize = 'md' | 'lg';

interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
    inputSize?: InputSize;
}

const base =
    'w-full rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 disabled:opacity-60';

const sizes: Record<InputSize, string> = {
    md: 'px-8 py-4 text-[length:var(--normal-font-size)]',
    lg: 'px-9 py-5 text-[length:var(--h3-font-size)]',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ inputSize = 'md', className, ...props }, ref) => (
        <input ref={ref} className={cn(base, sizes[inputSize], className)} {...props} />
    ),
);

Input.displayName = 'Input';

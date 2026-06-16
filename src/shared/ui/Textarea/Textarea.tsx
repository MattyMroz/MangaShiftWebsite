import React from 'react';
import { cn } from '@/shared/lib/utils/cn';

type TextareaProps = React.ComponentProps<'textarea'>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => (
        <textarea
            ref={ref}
            className={cn(
                'w-full rounded-[var(--radius-xl)] border border-[var(--line)] bg-[var(--surface)] px-6 py-4 text-[length:var(--normal-font-size)] leading-[1.6] text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 disabled:opacity-60',
                className,
            )}
            {...props}
        />
    ),
);

Textarea.displayName = 'Textarea';

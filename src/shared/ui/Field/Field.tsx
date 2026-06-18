import React from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface FieldProps {
    label: React.ReactNode;
    htmlFor?: string;
    action?: React.ReactNode;
    className?: string;
    labelClassName?: string;
    children: React.ReactNode;
}

const labelBase =
    'flex items-baseline justify-between gap-3 font-mono text-[1rem] uppercase tracking-[0.18em] text-[var(--text-faint)]';

export const Field = ({ label, htmlFor, action, className, labelClassName, children }: FieldProps) => (
    <div className={cn('flex flex-col gap-2', className)}>
        <label htmlFor={htmlFor} className={cn(labelBase, labelClassName)}>
            <span>{label}</span>
            {action}
        </label>
        {children}
    </div>
);

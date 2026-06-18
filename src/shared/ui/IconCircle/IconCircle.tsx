import React from 'react';
import { cn } from '@/shared/lib/utils/cn';

type Variant = 'solid' | 'outline';
type Size = 'md' | 'lg';

interface IconCircleProps extends React.ComponentProps<'button'> {
    variant?: Variant;
    size?: Size;
    /** 'button' (domyślnie) lub 'span' dla wariantu dekoracyjnego w linku/nagłówku. */
    as?: 'button' | 'span';
}

const sizes: Record<Size, string> = {
    md: 'h-11 w-11',
    lg: 'h-12 w-12',
};

const variants: Record<Variant, string> = {
    solid: 'bg-[var(--accent)] text-white',
    outline: 'border border-[var(--line-strong)] text-[var(--text-muted)] transition-colors duration-300 hover:border-[var(--text)] hover:text-[var(--text)]',
};

export const IconCircle = ({ variant = 'solid', size = 'md', as: Tag = 'button', className, type, ...props }: IconCircleProps) => (
    <Tag
        type={Tag === 'button' ? (type ?? 'button') : undefined}
        className={cn('grid shrink-0 place-items-center rounded-full', sizes[size], variants[variant], className)}
        {...props}
    />
);

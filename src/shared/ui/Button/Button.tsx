'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

type ButtonVariant = 'hero' | 'primary' | 'secondary' | 'ghost' | 'outline' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
    hero: 'rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-semibold shadow-[0_12px_30px_-16px_var(--accent)] hover:bg-[var(--accent-hover)]',
    primary: 'rounded-full bg-[var(--text)] text-[var(--bg)] font-medium hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]',
    secondary: 'rounded-full bg-[var(--surface)] text-[var(--text)] font-medium border border-[var(--line)] hover:border-[var(--line-strong)]',
    ghost: 'rounded-full text-[var(--text)] font-medium hover:bg-[var(--surface)]',
    outline: 'rounded-full bg-transparent text-[var(--text)] font-medium border border-[var(--line-strong)] hover:border-[var(--accent)] hover:text-[var(--accent-text)]',
    link: 'text-[var(--accent-text)] font-medium underline-offset-4 hover:underline',
};

const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-[length:var(--small-font-size)]',
    md: 'px-6 py-3 text-[length:var(--normal-font-size)]',
    lg: 'px-8 py-4 md:px-12 md:py-5 text-[length:var(--h3-font-size)]',
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size,
    children,
    className,
    ...props
}) => {
    const resolvedSize = size ?? (variant === 'hero' ? 'lg' : 'md');
    const isLink = variant === 'link';

    return (
        <motion.button
            className={cn(
                'relative min-h-11 inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap tracking-tight outline-none transition-[color,background-color,border-color,transform] duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
                variants[variant],
                isLink ? '' : sizes[resolvedSize],
                className,
            )}
            whileTap={isLink ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.15 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

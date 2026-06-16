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
    hero: 'rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-semibold shadow-[0_12px_30px_-16px_var(--accent)]',
    primary: 'rounded-full bg-[var(--text)] text-[var(--bg)] font-medium',
    secondary: 'rounded-full bg-[var(--surface)] text-[var(--text)] font-medium border border-[var(--line)]',
    ghost: 'rounded-full text-[var(--text)] font-medium hover:text-[var(--bg)]',
    outline: 'rounded-full bg-transparent text-[var(--text)] font-medium border border-[var(--line-strong)] hover:border-[var(--text)]',
    link: 'text-[var(--accent-text)] font-medium underline-offset-4 hover:underline',
};

const wipes = {
    ghost: 'bg-[var(--surface)]',
};

const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-[length:var(--small-font-size)]',
    md: 'px-6 py-3 text-[length:var(--normal-font-size)]',
    lg: 'px-8 py-4 md:px-10 md:py-5 text-[length:var(--h2-font-size)]',
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
                'group relative min-h-11 inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap tracking-tight outline-none transition-[color,border-color] duration-300 disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
                variant === 'ghost' && 'overflow-hidden',
                variants[variant],
                isLink ? '' : sizes[resolvedSize],
                className,
            )}
            whileHover={isLink ? undefined : { scale: 1.04 }}
            whileTap={isLink ? undefined : { scale: 0.92, opacity: 0.82 }}
            transition={{ duration: 0.1, ease: [0, 0, 0.2, 1] }}
            {...props}
        >
            {variant === 'ghost' && (
                <span
                    aria-hidden="true"
                    className={cn(
                        'absolute inset-0 translate-y-[105%] rounded-[inherit] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0',
                        wipes.ghost,
                    )}
                />
            )}
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );
};

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

// Warianty na semantycznych tokenach (paleta papier+tusz). Akcent = --accent (modyfikowalny).
const variants: Record<ButtonVariant, string> = {
    // „classy" — duży pill, mocny akcent. Ruch (spring) dodany niżej. Bez glass.
    hero: 'rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-semibold shadow-[var(--shadow-md)] hover:bg-[var(--accent-hover)]',
    primary: 'rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-medium hover:bg-[var(--accent-hover)]',
    secondary: 'rounded-full bg-[var(--surface)] text-[var(--text)] font-medium border border-[var(--line)] hover:bg-[var(--surface-2)]',
    ghost: 'rounded-full text-[var(--text)] font-medium hover:bg-[var(--surface-2)]',
    outline: 'rounded-full bg-transparent text-[var(--text)] font-medium border border-[var(--line-strong)] hover:bg-[var(--surface)]',
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
                'relative inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap tracking-tight outline-none transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
                variants[variant],
                isLink ? '' : sizes[resolvedSize],
                className,
            )}
            whileHover={isLink ? undefined : { scale: variant === 'hero' ? 1.05 : 1.03 }}
            whileTap={isLink ? undefined : { scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

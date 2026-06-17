import React from 'react';
import { cn } from '@/shared/lib/utils/cn';

type Position = 'tl' | 'tr' | 'br' | 'bl';
type Tone = 'glass' | 'accent' | 'dark';
type Size = 'sm' | 'md';

interface FloatingLabelProps extends React.ComponentProps<'span'> {
    position?: Position;
    tone?: Tone;
    size?: Size;
}

const offsets: Record<Size, Record<Position, string>> = {
    sm: { tl: 'left-3 top-3', tr: 'right-3 top-3', br: 'bottom-3 right-3', bl: 'bottom-3 left-3' },
    md: { tl: 'left-8 top-8', tr: 'right-8 top-8', br: 'bottom-8 right-8', bl: 'bottom-8 left-8' },
};

const dims: Record<Size, string> = {
    sm: 'px-2.5 py-1 text-[0.78rem]',
    md: 'px-3 py-1.5 text-[0.9rem]',
};

const tones: Record<Tone, string> = {
    glass: 'bg-[var(--bg-alpha)] text-[var(--text)] backdrop-blur',
    accent: 'bg-[var(--accent)] text-white',
    dark: 'bg-black/60 text-white/70 backdrop-blur',
};

export const FloatingLabel = ({ position = 'tl', tone = 'glass', size = 'md', className, ...props }: FloatingLabelProps) => (
    <span
        className={cn(
            'absolute z-10 rounded-full font-mono uppercase tracking-[0.16em]',
            offsets[size][position],
            dims[size],
            tones[tone],
            className,
        )}
        {...props}
    />
);

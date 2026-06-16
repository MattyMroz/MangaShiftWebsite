import React from 'react';
import { cn } from '@/shared/lib/utils/cn';

type Position = 'tl' | 'tr' | 'br' | 'bl';
type Tone = 'glass' | 'accent';

interface FloatingLabelProps extends React.ComponentProps<'span'> {
    position?: Position;
    tone?: Tone;
}

const positions: Record<Position, string> = {
    tl: 'left-8 top-8',
    tr: 'right-8 top-8',
    br: 'bottom-8 right-8',
    bl: 'bottom-8 left-8',
};

const tones: Record<Tone, string> = {
    glass: 'bg-[var(--bg-alpha)] text-[var(--text)] backdrop-blur',
    accent: 'bg-[var(--accent)] text-white',
};

export const FloatingLabel = ({ position = 'tl', tone = 'glass', className, ...props }: FloatingLabelProps) => (
    <span
        className={cn(
            'absolute z-10 rounded-full px-3 py-1.5 font-mono text-[0.9rem] uppercase tracking-[0.16em]',
            positions[position],
            tones[tone],
            className,
        )}
        {...props}
    />
);

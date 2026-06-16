import React from 'react';
import { cn } from '@/shared/lib/utils/cn';

type CardVariant = 'diagram' | 'paper' | 'plain';

interface CardProps extends React.ComponentProps<'div'> {
    variant?: CardVariant;
}

const variants: Record<CardVariant, string> = {
    diagram: 'diagram-card',
    paper: 'paper-frame',
    plain: 'rounded-[2.4rem] border border-[var(--line-strong)] bg-[var(--bg)] shadow-[var(--shadow-md)]',
};

export const Card = ({ variant = 'plain', className, ...props }: CardProps) => (
    <div className={cn(variants[variant], className)} {...props} />
);

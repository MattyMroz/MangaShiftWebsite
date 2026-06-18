import React from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface MetaLabelProps extends React.ComponentProps<'p'> {

    variant?: 'kicker' | 'eyebrow';
}

export const MetaLabel = ({ variant = 'kicker', className, children, ...props }: MetaLabelProps) => (
    <p className={cn(variant === 'kicker' ? 'section-kicker' : 'eyebrow', className)} {...props}>
        {children}
    </p>
);

import type { ElementType, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface ContainerProps {
    as?: ElementType;
    className?: string;
    children: ReactNode;
}

export const Container = ({ as: Tag = 'div', className, children }: ContainerProps) => (
    <Tag
        className={cn(
            'mx-auto w-full max-w-[120rem] px-6 md:px-10 lg:px-12',
            className,
        )}
    >
        {children}
    </Tag>
);

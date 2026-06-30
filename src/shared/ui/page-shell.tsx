import type { ReactNode } from 'react';
import { Container } from '@/shared/ui/container';
import { SideLabel } from '@/shared/ui/side-label';
import { cn } from '@/shared/lib/utils/cn';

interface PageShellProps {
    children: ReactNode;
    sideLabel?: ReactNode;
    className?: string;
}

export const PageShell = ({ children, sideLabel, className }: PageShellProps) => (
    <section className={cn('relative pb-[clamp(6rem,9vw,11rem)]', className)}>
        {sideLabel ? <SideLabel side="left">{sideLabel}</SideLabel> : null}
        <Container className="relative">{children}</Container>
    </section>
);

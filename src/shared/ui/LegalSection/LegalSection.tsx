import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface LegalSectionProps {
    index: string;
    title: string;
    children: ReactNode;
    className?: string;
}

export const LegalSection = ({ index, title, children, className }: LegalSectionProps) => (
    <section className={cn('border-t border-[var(--line)] pt-10', className)}>
        <h2 className="flex items-baseline gap-4 text-[clamp(2.2rem,3vw,3.2rem)] font-bold tracking-tight text-[var(--text)]">
            <span className="font-mono text-[1.2rem] font-medium text-[var(--accent-text)]">{index}</span>
            <span>{title}</span>
        </h2>
        <div className="mt-6 space-y-5">{children}</div>
    </section>
);

interface LegalPProps {
    children: ReactNode;
    className?: string;
}

export const LegalP = ({ children, className }: LegalPProps) => (
    <p className={cn('max-w-[72ch] text-[1.5rem] leading-[1.8] text-[var(--text-muted)]', className)}>
        {children}
    </p>
);

interface LegalListProps {
    items: ReactNode[];
    ordered?: boolean;
    className?: string;
}

export const LegalList = ({ items, ordered = false, className }: LegalListProps) => {
    const Tag = ordered ? 'ol' : 'ul';
    return (
        <Tag
            className={cn(
                'max-w-[72ch] space-y-2.5 pl-6 text-[1.5rem] leading-[1.75] text-[var(--text-muted)]',
                ordered ? 'list-decimal' : 'list-disc',
                'marker:text-[var(--accent-text)]',
                className,
            )}
        >
            {items.map((item, index) => (
                <li key={index} className="pl-1">
                    {item}
                </li>
            ))}
        </Tag>
    );
};

interface LegalTableProps {
    head: ReactNode[];
    rows: ReactNode[][];
    className?: string;
}

export const LegalTable = ({ head, rows, className }: LegalTableProps) => (
    <div className={cn('overflow-x-auto', className)}>
        <table className="w-full min-w-[40rem] border-collapse text-left text-[1.35rem] leading-[1.6]">
            <thead>
                <tr className="border-y border-[var(--line-strong)]">
                    {head.map((cell, index) => (
                        <th
                            key={index}
                            className="px-4 py-3 font-mono text-[1rem] uppercase tracking-[0.14em] text-[var(--text-faint)]"
                        >
                            {cell}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-[var(--line)]">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-3 align-top text-[var(--text-muted)]">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

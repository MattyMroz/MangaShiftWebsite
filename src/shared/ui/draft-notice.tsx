import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';

interface DraftNoticeProps {
    children?: ReactNode;
    className?: string;
}

export const DraftNotice = ({ children, className }: DraftNoticeProps) => (
    <div
        role="note"
        className={cn(
            'flex items-start gap-4 rounded-[1.4rem] border p-6 md:p-7',
            'border-[var(--accent-border)] bg-[var(--accent-subtle)]',
            className,
        )}
    >
        <AlertTriangle
            aria-hidden="true"
            className="mt-1 h-6 w-6 shrink-0 text-[var(--accent-text)]"
        />
        <div className="text-[1.4rem] leading-[1.7] text-[var(--text-muted)]">
            <p className="font-mono text-[1rem] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                Draft roboczy
            </p>
            <p className="mt-2">
                {children ?? (
                    <>
                        Ten dokument jest wersją roboczą (V3 draft) i nie jest jeszcze wiążący prawnie.
                        Zostanie zweryfikowany przez prawnika i opublikowany w finalnej wersji przed
                        uruchomieniem płatnych planów. Miejsca oznaczone{' '}
                        <code className="rounded bg-[var(--overlay)] px-1.5 py-0.5 font-mono text-[1.1rem] text-[var(--text)]">
                            [[…]]
                        </code>{' '}
                        wymagają jeszcze uzupełnienia.
                    </>
                )}
            </p>
        </div>
    </div>
);

'use client';

interface RailProps {
    side: 'left' | 'right';
    label: string;
}

const Rail = ({ side, label }: RailProps) => (
    <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-y-0 z-30 hidden xl:flex w-12 items-center justify-center ${
            side === 'left'
                ? 'left-0 border-r border-[var(--line)]'
                : 'right-0 border-l border-[var(--line)]'
        }`}
    >
        <span
            className="font-mono text-[10px] uppercase tracking-[0.42em] text-[var(--text-faint)] whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: side === 'left' ? 'rotate(180deg)' : 'none' }}
        >
            {label}
        </span>
    </div>
);

interface SideRailsProps {
    left?: string;
    right?: string;
}

// Dwie pionowe szyny przy krawędziach okna (atelier-zero). Tylko ≥1280px, niezależne od treści.
export const SideRails = ({
    left = 'MANGA · VIDEO · AI · NARRATION · BETA',
    right = 'MangaShift — Vol. 01 · Issue Nº 01 · 2026',
}: SideRailsProps) => (
    <>
        <Rail side="left" label={left} />
        <Rail side="right" label={right} />
    </>
);

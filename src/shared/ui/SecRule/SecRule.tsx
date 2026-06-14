'use client';

interface SecRuleProps {
    roman: string;
    meta: string;
    page: string;
}

// Nagłówek-linijka nad sekcją: [cyfra rzymska serif italic] · [meta] · [numeracja] (atelier-zero).
export const SecRule = ({ roman, meta, page }: SecRuleProps) => (
    <div className="flex items-baseline justify-between gap-4 border-t border-[var(--line)] pt-3 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
        <em className="serif shrink-0 text-[1.5em] leading-none text-[var(--accent-text)] tracking-normal">
            {roman}
        </em>
        <span className="truncate font-mono">{meta}</span>
        <span className="shrink-0 font-mono tabular-nums">{page}</span>
    </div>
);

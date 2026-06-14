'use client';

import { Container } from '@/shared/ui/Container/Container';

const items = [
    'Panel detection',
    'Reading-order analysis',
    'AI narration',
    'Character voices',
    'Subtitles',
    'Video export',
] as const;

export const TickerSection = () => (
    <section aria-label="MangaShift capabilities" className="border-y border-[var(--line-strong)] bg-[var(--text)] text-[var(--bg)]">
        <Container className="flex min-h-20 items-stretch overflow-hidden px-0 md:px-0 lg:px-0">
            <div className="flex shrink-0 items-center gap-3 border-r border-white/15 px-6 font-mono text-[1rem] uppercase tracking-[0.2em] md:px-8">
                <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                    <span className="relative h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                Building now
            </div>

            <div className="ticker-mask min-w-0 flex-1 overflow-hidden">
                <ul className="ticker-track flex h-full w-max items-center">
                    {[...items, ...items].map((item, index) => (
                        <li
                            key={`${item}-${index}`}
                            className="flex shrink-0 items-center gap-6 px-7 text-[1.35rem] font-medium md:px-10"
                        >
                            {item}
                            <span className="text-[var(--accent)]">●</span>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>

        <style>{`
            @keyframes ticker {
                to { transform: translateX(-50%); }
            }
            .ticker-track {
                animation: ticker 30s linear infinite;
            }
            .ticker-mask {
                mask-image: linear-gradient(to right, transparent, black 5rem, black calc(100% - 5rem), transparent);
            }
            @media (prefers-reduced-motion: reduce) {
                .ticker-track { animation: none; }
            }
        `}</style>
    </section>
);

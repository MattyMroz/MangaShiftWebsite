'use client';

import { motion } from 'framer-motion';

interface WireItem {
    no: string;
    label: string;
    glyph: string;
}

const WIRE_ITEMS: WireItem[] = [
    { no: '01', label: 'AI narration', glyph: '声' },
    { no: '02', label: 'Panel detection', glyph: '⬚' },
    { no: '03', label: 'Multi-voice casting', glyph: '◐' },
    { no: '04', label: 'Subtitles & captions', glyph: '字' },
    { no: '05', label: 'Export to video', glyph: '▶' },
    { no: '06', label: '15+ languages', glyph: '世' },
    { no: '07', label: 'Scene pacing', glyph: '⏱' },
    { no: '08', label: 'Reading-order flow', glyph: '⇄' },
];

const TickerCell = ({ item }: { item: WireItem }) => (
    <li className="flex shrink-0 items-center gap-4 px-8 md:px-10">
        <span className="font-mono text-[1.05rem] tracking-[0.2em] text-[var(--text-faint)] tabular-nums">
            Nº {item.no}
        </span>
        <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] text-[1.3rem] leading-none text-[var(--accent-text)]"
        >
            {item.glyph}
        </span>
        <span className="whitespace-nowrap text-[length:var(--normal-font-size)] font-medium tracking-tight text-[var(--text)]">
            {item.label}
        </span>
        <span aria-hidden="true" className="serif text-[1.8rem] leading-none text-[var(--text-faint)]">
            ·
        </span>
    </li>
);

const CornerBrackets = () => (
    <>
        <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[var(--line-strong)]" />
        <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[var(--line-strong)]" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[var(--line-strong)]" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[var(--line-strong)]" />
    </>
);

export const TickerSection = () => {
    const track = [...WIRE_ITEMS, ...WIRE_ITEMS];

    return (
        <section
            id="wire"
            aria-label="From the pipeline — capabilities wire"
            className="relative py-[11rem] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            <div className="relative z-10 mx-auto max-w-[120rem]">
                <div className="flex items-baseline justify-between gap-4 border-t border-[var(--line)] pb-10 pt-3 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                    <em className="serif shrink-0 text-[1.5em] leading-none tracking-normal text-[var(--accent-text)]">
                        III
                    </em>
                    <span className="truncate font-mono">The Wire — Live capabilities</span>
                    <span className="shrink-0 font-mono tabular-nums">003 / 008</span>
                </div>

                <motion.div
                    className="relative overflow-hidden rounded-[1.4rem] border-y border-[var(--line-strong)] bg-[var(--bg-alpha)] backdrop-blur-sm"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8 }}
                >
                    <CornerBrackets />

                    <div className="flex flex-col items-stretch lg:flex-row">
                        <div className="relative flex shrink-0 flex-col justify-between gap-8 border-b border-[var(--line)] px-8 py-9 md:px-10 lg:w-[34%] lg:max-w-[42rem] lg:border-b-0 lg:border-r">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-[var(--accent)]" />
                                <span className="eyebrow">From the pipeline</span>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="relative flex h-3 w-3 shrink-0">
                                        <span className="ms-pulse-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
                                        <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--accent)]" />
                                    </span>
                                    <span className="text-[length:var(--normal-font-size)] font-semibold tracking-tight text-[var(--text)]">
                                        In development
                                    </span>
                                </div>
                                <p className="max-w-[34ch] text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                                    <span className="serif italic text-[var(--text)]">Open beta soon.</span>{' '}
                                    The engine that turns static manga &amp; manhwa into narrated video — panel by panel.
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4 font-mono text-[1.02rem] uppercase tracking-[0.16em] text-[var(--text-faint)] tabular-nums">
                                <span>35°41′N 139°41′E</span>
                                <span>Vol.01 / Nº 01</span>
                            </div>
                        </div>

                        <div
                            className="ms-marquee relative min-w-0 flex-1 overflow-hidden py-9"
                            role="marquee"
                            aria-label="MangaShift capabilities"
                        >
                            <ul className="ms-marquee-track flex w-max items-center">
                                {track.map((item, i) => (
                                    <TickerCell key={`${item.no}-${i}`} item={item} />
                                ))}
                            </ul>

                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute right-5 top-4 hidden h-12 w-12 items-center justify-center rounded-full border border-[var(--line-strong)] font-mono text-[0.82rem] uppercase leading-tight tracking-[0.14em] text-[var(--text-faint)] md:flex"
                            >
                                <span className="text-center">EST<br />2026</span>
                            </span>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-3 py-1 font-mono text-[1rem] uppercase tracking-[0.16em] text-[var(--accent-fg)]">
                        Now in beta
                    </span>
                    <span className="font-mono text-[1.05rem] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                        Manga · Manhwa → Narrated video · AI
                    </span>
                </div>
            </div>

            <style>{`
                @keyframes ms-marquee-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes ms-pulse-ping {
                    0% { transform: scale(1); opacity: 0.6; }
                    75%, 100% { transform: scale(2.4); opacity: 0; }
                }
                .ms-marquee-track {
                    animation: ms-marquee-scroll 38s linear infinite;
                    will-change: transform;
                }
                .ms-marquee:hover .ms-marquee-track {
                    animation-play-state: paused;
                }
                .ms-pulse-ping {
                    animation: ms-pulse-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                .ms-marquee {
                    -webkit-mask-image: linear-gradient(to right, transparent, #000 9rem, #000 calc(100% - 9rem), transparent);
                    mask-image: linear-gradient(to right, transparent, #000 9rem, #000 calc(100% - 9rem), transparent);
                }
                @media (prefers-reduced-motion: reduce) {
                    .ms-marquee-track { animation: none; }
                    .ms-pulse-ping { animation: none; }
                }
            `}</style>
        </section>
    );
};

'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';
import { Button } from '@/shared/ui/Button/Button';

type Pill = { glyph: string; label: string; coord: string };

const pills: Pill[] = [
    { glyph: '◳', label: 'Vision models', coord: 'PANEL · ORDER' },
    { glyph: '声', label: 'Neural narration', coord: 'SCRIPT · BEAT' },
    { glyph: '世', label: 'Auto-translation', coord: '15+ LOCALES' },
    { glyph: '◐', label: 'Voice synthesis', coord: 'CAST · ∞' },
    { glyph: '⏱', label: 'Scene pacing', coord: 'CUT · TIMING' },
    { glyph: '字', label: 'Caption alignment', coord: 'SUBS · SYNC' },
];

const reveal: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
} as const;

const viewport = { once: true, margin: '-80px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

export const PoweredSection = () => (
    <section
        id="powered"
        aria-labelledby="powered-title"
        className="relative py-[clamp(10rem,16vw,13rem)] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
    >
        <div className="relative z-10 mx-auto max-w-[120rem]">
            <motion.div
                className="flex items-baseline justify-between gap-4 border-t border-[var(--line)] pt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
                {...fadeUp}
                transition={{ duration: 0.6 }}
            >
                <em className="serif shrink-0 text-[1.5em] not-italic leading-none tracking-normal text-[var(--accent-text)]">
                    ✦
                </em>
                <span className="hidden truncate sm:block">Interlude — The Engine Room</span>
                <span className="shrink-0 tabular-nums">∗ · / 008</span>
            </motion.div>

            <motion.div
                className="relative mt-[clamp(3.5rem,6vw,6rem)] overflow-hidden rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--accent)]"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.8, ease }}
            >
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[var(--accent-fg)] opacity-[0.06] blur-3xl"
                />
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-28 -left-10 h-72 w-72 rounded-full bg-[var(--accent-fg)] opacity-[0.05] blur-3xl"
                />

                <div className="relative flex flex-col gap-10 p-[clamp(2.2rem,4vw,4rem)] lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                    <div className="flex items-center gap-4 text-[var(--accent-fg)]">
                        <span className="relative flex h-3 w-3 shrink-0">
                            <span className="ms-powered-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-fg)] opacity-50" />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--accent-fg)]" />
                        </span>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] opacity-80">
                            Powered by
                        </span>
                    </div>

                    <h2
                        id="powered-title"
                        className="max-w-[20ch] text-[clamp(2.4rem,4.4vw,4.4rem)] font-extrabold leading-[1.02] tracking-tight text-[var(--accent-fg)]"
                    >
                        State-of-the-art{' '}
                        <em className="font-normal not-italic">
                            <span className="serif font-medium">AI</span>
                        </em>
                        , end to end.
                    </h2>

                    <span
                        aria-hidden="true"
                        className="hidden shrink-0 grid-cols-1 place-items-center self-stretch border-l border-[var(--accent-fg)]/25 pl-12 text-[var(--accent-fg)] lg:grid"
                    >
                        <span className="grid h-[6.4rem] w-[6.4rem] place-items-center rounded-full border border-[var(--accent-fg)]/40 text-center">
                            <span className="flex flex-col leading-none">
                                <span className="serif text-[2.2rem]">06</span>
                                <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] opacity-70">
                                    engines
                                </span>
                            </span>
                        </span>
                    </span>
                </div>
            </motion.div>

            <div className="mt-[clamp(4rem,7vw,7rem)] grid grid-cols-1 items-start gap-[clamp(3rem,5vw,6rem)] lg:grid-cols-12">

                <motion.div
                    className="lg:col-span-4 lg:sticky lg:top-[12rem]"
                    {...fadeUp}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex items-center gap-4">
                        <span className="h-px w-10 bg-[var(--accent)]" />
                        <span className="eyebrow">Under the hood</span>
                    </div>

                    <p className="mt-7 max-w-[40ch] text-[length:var(--h3-font-size)] leading-snug text-[var(--text)]">
                        One pipeline, <em className="serif text-[var(--accent-text)]">many minds</em> —
                        each pass handled by a model tuned for the job.
                    </p>

                    <p className="mt-5 max-w-[42ch] text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                        We stay model-agnostic on purpose. As the field moves, so does the engine —
                        you keep the same upload-in, reel-out workflow while the parts underneath
                        only get sharper.
                    </p>

                    <div className="mt-9 flex items-center gap-4 border-t border-[var(--line)] pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)] tabular-nums">
                        <span>35°41′N · 139°41′E</span>
                        <span className="h-px flex-1 bg-[var(--line)]" />
                        <span>Vol.01</span>
                    </div>
                </motion.div>

                <motion.ul
                    className="grid grid-cols-1 gap-[clamp(1.2rem,1.8vw,1.6rem)] sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                >
                    {pills.map(({ glyph, label, coord }, i) => (
                        <motion.li
                            key={label}
                            variants={reveal}
                            transition={{ duration: 0.6, ease }}
                            className={cn(
                                'group relative flex flex-col justify-between gap-8 rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[clamp(1.6rem,2vw,2rem)] transition-colors duration-300 hover:border-[var(--line-strong)]',
                                i % 2 === 1 && 'xl:mt-8',
                            )}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <span
                                    aria-hidden="true"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[1.4rem] leading-none text-[var(--accent-text)] transition-colors duration-300 group-hover:border-[var(--accent)]"
                                >
                                    {glyph}
                                </span>
                                <span className="serif text-[2.4rem] leading-none text-[var(--text-faint)]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-[length:var(--h3-font-size)] font-bold leading-tight tracking-tight text-[var(--text)]">
                                    {label}
                                </h3>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="h-px w-6 bg-[var(--accent)]" />
                                    <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                                        {coord}
                                    </span>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>

            <motion.div
                className="mt-[clamp(3.5rem,5vw,5rem)] flex flex-col items-start justify-between gap-8 border-t border-[var(--line)] pt-7 sm:flex-row sm:items-center"
                {...fadeUp}
                transition={{ duration: 0.6 }}
            >
                <p className="max-w-[52ch] text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                    <em className="serif text-[var(--text)]">No model lock-in.</em> The names under the
                    hood will change — the result on screen only gets better.
                </p>

                <div className="flex shrink-0 items-center gap-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        Model-agnostic
                    </span>
                    <Button variant="ghost" size="sm">
                        Join the beta
                    </Button>
                </div>
            </motion.div>
        </div>

        <style>{`
            @keyframes ms-powered-ping {
                0% { transform: scale(1); opacity: 0.5; }
                75%, 100% { transform: scale(2.4); opacity: 0; }
            }
            .ms-powered-ping {
                animation: ms-powered-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
            }
            @media (prefers-reduced-motion: reduce) {
                .ms-powered-ping { animation: none; }
            }
        `}</style>
    </section>
);

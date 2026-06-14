'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';
import { cn } from '@/shared/lib/utils/cn';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
};

const stamps = [
    { roman: 'I', value: '100+', label: 'pages / run', meta: 'capacity' },
    { roman: 'II', value: 'AI', label: 'narration voices', meta: 'audio' },
    { roman: 'III', value: '1-click', label: 'video export', meta: 'output' },
];

const PlayGlyph = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="9" />
        <polygon points="11 9 16 12 11 15 11 9" fill="currentColor" />
    </svg>
);

const Corner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
    const base = 'absolute h-7 w-7 border-[var(--accent)]';
    const map = {
        tl: 'left-3 top-3 border-l-2 border-t-2',
        tr: 'right-3 top-3 border-r-2 border-t-2',
        bl: 'left-3 bottom-3 border-l-2 border-b-2',
        br: 'right-3 bottom-3 border-r-2 border-b-2',
    } as const;
    return <span aria-hidden="true" className={cn(base, map[position])} />;
};

const Stamp = ({
    roman,
    value,
    label,
    meta,
    index,
}: (typeof stamps)[number] & { index: number }) => (
    <motion.div
        className="group flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.55 + index * 0.1 }}
    >
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)]">
            <span className="absolute inset-1 rounded-full border border-dashed border-[var(--line)]" />
            <em className="serif text-[1.6rem] leading-none text-[var(--accent-text)]">
                {roman}
            </em>
        </div>
        <div className="min-w-0">
            <p className="text-[2rem] font-extrabold leading-none tracking-tight text-[var(--text)]">
                {value}
            </p>
            <p className="mt-1.5 font-mono text-[1.05rem] uppercase tracking-[0.16em] text-[var(--text-faint)]">
                {label}
            </p>
        </div>
        <span className="ml-auto hidden font-mono text-[1rem] uppercase tracking-[0.2em] text-[var(--text-faint)] sm:block lg:hidden xl:block">
            {meta}
        </span>
    </motion.div>
);

export const Hero = () => {
    const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && smoothScrollTo(href)) e.preventDefault();
    };

    return (
        <section
            id="home"
            className="relative min-h-screen overflow-hidden px-[var(--section-padding-x-mobile)] pb-[10rem] pt-[18rem] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)] lg:pb-[13rem]"
        >
            <div className="relative z-10 mx-auto w-full max-w-[120rem]">
                <motion.div
                    className="flex items-baseline justify-between gap-4 border-t border-[var(--line)] pt-3 text-[1.05rem] uppercase tracking-[0.18em] text-[var(--text-faint)]"
                    {...fadeUp}
                    transition={{ duration: 0.6 }}
                >
                    <em className="serif shrink-0 text-[1.5em] leading-none tracking-normal text-[var(--accent-text)]">
                        I
                    </em>
                    <span className="truncate font-mono">
                        The MangaShift Pipeline — Manga to Motion
                    </span>
                    <span className="shrink-0 font-mono tabular-nums">001 / 008</span>
                </motion.div>

                <div className="mt-[6rem] grid grid-cols-1 items-start gap-[6rem] lg:grid-cols-[1.55fr_1fr] lg:gap-[5rem] xl:gap-[7rem]">
                    <div className="lg:pt-[2rem]">
                        <motion.div
                            className="flex items-center gap-4"
                            {...fadeUp}
                            transition={{ duration: 0.6, delay: 0.05 }}
                        >
                            <span className="h-px w-10 bg-[var(--accent)]" />
                            <span className="eyebrow">Nº 01 — Static panels, set in motion</span>
                        </motion.div>

                        <motion.h1
                            className="mt-9 max-w-[15ch] text-[clamp(4rem,7vw,9rem)] font-extrabold leading-[1.0] tracking-tight text-[var(--text)]"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.12 }}
                        >
                            Turn manga into{' '}
                            <span className="relative whitespace-nowrap">
                                <em className="serif font-normal text-[var(--accent-text)]">
                                    living
                                </em>
                                <span
                                    aria-hidden="true"
                                    className="ml-1 inline-block h-[0.42em] w-[0.42em] translate-y-[-0.05em] rounded-full bg-[var(--accent)] align-baseline"
                                />
                            </span>{' '}
                            video.
                        </motion.h1>

                        <motion.p
                            className="mt-10 max-w-[46ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)]"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.24 }}
                        >
                            MangaShift reads your pages panel by panel, then directs them —
                            <span className="text-[var(--text)]"> AI narration, paced cuts, and motion</span> —
                            into a finished, watchable video. From a static chapter to a moving
                            story, in one pass.
                        </motion.p>

                        <motion.div
                            className="mt-14 flex flex-col items-stretch gap-5 sm:flex-row sm:items-center"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.36 }}
                        >
                            <Link href="#beta" onClick={handleScrollLink} className="contents">
                                <Button variant="hero" size="md">
                                    Join the Beta
                                </Button>
                            </Link>
                            <Link href="#demo" onClick={handleScrollLink} className="contents">
                                <Button variant="outline" size="md">
                                    <span className="flex items-center gap-2">
                                        <PlayGlyph />
                                        See the demo
                                    </span>
                                </Button>
                            </Link>
                        </motion.div>

                        <div className="mt-[5.5rem] flex flex-col gap-7 border-t border-[var(--line)] pt-10">
                            {stamps.map((s, i) => (
                                <Stamp key={s.roman} {...s} index={i} />
                            ))}
                        </div>
                    </div>

                    <motion.figure
                        className="relative mx-auto w-full max-w-[42rem] lg:max-w-none"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                    >
                        <div className="mb-4 flex items-baseline justify-between font-mono text-[1.05rem] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                            <span className="text-[var(--accent-text)]">Plate Nº 01</span>
                            <span className="tabular-nums">35.6895° N · 139.6917° E</span>
                        </div>

                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-lg)]">
                            <Image
                                src="/images/chainsawman/RezeArc.webp"
                                alt="Manga page composition processed by the MangaShift pipeline"
                                fill
                                priority
                                sizes="(max-width: 1024px) 90vw, 36rem"
                                className="object-cover"
                            />

                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-alpha)] via-transparent to-transparent"
                            />

                            <Corner position="tl" />
                            <Corner position="tr" />
                            <Corner position="bl" />
                            <Corner position="br" />

                            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between">
                                <span className="rounded-full bg-[var(--bg)]/85 px-3 py-1.5 font-mono text-[1rem] uppercase tracking-[0.16em] text-[var(--text)] backdrop-blur-sm">
                                    Frame 0001 — Reze Arc
                                </span>
                                <span className="font-mono text-[1rem] uppercase tracking-[0.16em] text-[var(--accent-text)]">
                                    ● REC
                                </span>
                            </div>
                        </div>

                        <figcaption className="mt-4 flex items-baseline justify-between border-t border-[var(--line)] pt-3 font-mono text-[1.05rem] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                            <span>Source · static panel</span>
                            <em className="serif tracking-normal text-[var(--accent-text)]">
                                → motion
                            </em>
                        </figcaption>

                        <span
                            aria-hidden="true"
                            className="absolute -right-3 -top-3 hidden rotate-6 rounded-full border border-[var(--accent)] px-4 py-1.5 font-mono text-[1rem] uppercase tracking-[0.2em] text-[var(--accent-text)] lg:block"
                        >
                            Beta · 2026
                        </span>
                    </motion.figure>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
            >
                <span className="font-mono text-[1rem] uppercase tracking-[0.3em] text-[var(--text-faint)]">
                    Scroll
                </span>
                <span className="h-12 w-px bg-gradient-to-b from-[var(--line-strong)] to-transparent" />
            </div>
        </section>
    );
};

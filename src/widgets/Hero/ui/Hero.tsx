'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { SecRule } from '@/shared/ui/SecRule/SecRule';
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
        transition={{ duration: 0.6, delay: index * 0.1 }}
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
        <span className="ml-auto hidden font-mono text-[1rem] uppercase tracking-[0.2em] text-[var(--text-faint)] sm:block">
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
            className="relative min-h-screen overflow-hidden px-[var(--section-padding-x-mobile)] pb-[10rem] pt-[16rem] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)] lg:pb-[14rem]"
        >
            <div className="relative z-10 mx-auto w-full max-w-[120rem]">
                <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
                    <SecRule
                        roman="I."
                        meta="The MangaShift Pipeline — Manga to Motion"
                        page="001 / 008"
                    />
                </motion.div>

                <div className="mt-[5rem] max-w-[24ch] lg:mt-[7rem]">
                    <motion.div
                        className="flex items-center gap-4"
                        {...fadeUp}
                        transition={{ duration: 0.6, delay: 0.05 }}
                    >
                        <span className="h-px w-10 bg-[var(--accent)]" />
                        <span className="eyebrow">Nº 01 — Static panels, set in motion</span>
                    </motion.div>

                    <motion.h1
                        className="display display-dot mt-10 text-[clamp(3.4rem,8.5vw,9.5rem)]"
                        {...fadeUp}
                        transition={{ duration: 0.85, delay: 0.12 }}
                    >
                        Turn manga into{' '}
                        <em className="text-[var(--accent-text)]">living</em> video
                    </motion.h1>
                </div>

                <div className="mt-[7rem] grid grid-cols-1 gap-[3rem] lg:mt-[9rem] lg:grid-cols-[1fr_auto] lg:items-end lg:gap-[5rem]">
                    <motion.p
                        className="max-w-[44ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)] lg:ml-auto lg:max-w-[40ch] lg:text-right"
                        {...fadeUp}
                        transition={{ duration: 0.8, delay: 0.24 }}
                    >
                        MangaShift reads your pages panel by panel, then directs them —
                        <span className="text-[var(--text)]"> AI narration, paced cuts, motion</span>.
                        A static chapter becomes a watchable video, in a single pass.
                    </motion.p>

                    <motion.div
                        className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-center lg:order-first"
                        {...fadeUp}
                        transition={{ duration: 0.8, delay: 0.32 }}
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
                </div>

                <div className="mt-[10rem] grid grid-cols-1 items-start gap-[6rem] lg:mt-[13rem] lg:grid-cols-[1fr_1.15fr] lg:gap-[7rem]">
                    <div className="flex flex-col gap-7 lg:pt-[3rem]">
                        <motion.p
                            className="numero font-mono text-[1.05rem] uppercase tracking-[0.18em] text-[var(--text-faint)]"
                            {...fadeUp}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-[var(--accent-text)]">02</span> — What one
                            pass delivers
                        </motion.p>
                        <div className="flex flex-col gap-7 border-t border-[var(--line)] pt-10">
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
                        transition={{ duration: 0.9 }}
                    >
                        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[1.05rem] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                            <span className="text-[var(--accent-text)]">Plate Nº 01</span>
                            <span className="hidden sm:inline">Beta · 2026 cohort</span>
                            <span className="tabular-nums">35.6895° N · 139.69° E</span>
                        </div>

                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-lg)]">
                            <Image
                                src="/images/chainsawman/RezeArc.webp"
                                alt="Manga page composition processed by the MangaShift pipeline"
                                fill
                                priority
                                sizes="(max-width: 1024px) 90vw, 40rem"
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

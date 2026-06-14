'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';

/* ── i18n (koncepcyjnie footer.*) — teksty wpisane bezpośrednio, podłączymy t() później ─── */

const EXPLORE = [
    { label: 'About', href: '#about', n: '01' },
    { label: 'How it works', href: '#how', n: '02' },
    { label: 'Features', href: '#features', n: '03' },
    { label: 'Demo', href: '#demo', n: '04' },
    { label: 'FAQ', href: '#faq', n: '05' },
] as const;

const CONNECT = [
    { label: 'GitHub', sub: 'github.com/MattyMroz', href: 'https://github.com/MattyMroz' },
    { label: 'LinkedIn', sub: 'linkedin.com/in/mattymroz', href: 'https://www.linkedin.com/in/mattymroz/' },
] as const;

const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
};

/* Narożny wspornik (corner bracket) — edytorialny detal kadrowania */
const Bracket = ({ className }: { className?: string }) => (
    <span
        aria-hidden="true"
        className={cn('pointer-events-none absolute h-4 w-4 border-[var(--line-strong)]', className)}
    />
);

const Dot = () => (
    <motion.span
        aria-hidden="true"
        className="inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_0_3px_var(--bg)]"
        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.82, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    />
);

export const Footer = () => {
    const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && smoothScrollTo(href)) e.preventDefault();
    };

    return (
        <footer className="relative w-full overflow-hidden border-t border-[var(--line-strong)] bg-[var(--bg-alpha)] px-[var(--section-padding-x-mobile)] pt-[10rem] pb-[5rem] backdrop-blur-sm md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)] lg:pt-[13rem]">
            {/* Sygnatura prasowa — róg arkusza */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[var(--section-padding-x-mobile)] top-10 hidden font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--text-faint)] md:right-[var(--section-padding-x-tablet)] md:block lg:right-[var(--section-padding-x-desktop-sm)]"
            >
                The Colophon — Nº 08
            </div>

            <div className="relative z-10 mx-auto max-w-[120rem]">
                {/* ── SecRule: cyfra rzymska · meta · numeracja stron ─────────────────────── */}
                <div className="flex items-baseline justify-between gap-4 border-t border-[var(--line)] pt-3 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                    <em className="serif shrink-0 text-[1.5em] leading-none tracking-normal text-[var(--accent-text)]">
                        VIII
                    </em>
                    <span className="hidden truncate font-mono sm:block">Colophon · Index · Credits</span>
                    <span className="shrink-0 font-mono tabular-nums">008 / 008</span>
                </div>

                {/* ── GÓRNY GRID ──────────────────────────────────────────────────────────── */}
                <motion.div
                    className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-24 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]"
                    {...fadeUp}
                    transition={{ duration: 0.7 }}
                >
                    {/* Wordmark + tagline + pieczątka */}
                    <div className="flex max-w-[40ch] flex-col">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-[var(--accent)]" />
                            <span className="eyebrow">Est. MMXXVI</span>
                        </div>

                        <span className="mt-7 text-[clamp(3rem,4vw,3.6rem)] font-extrabold leading-none tracking-tight text-[var(--text)]">
                            MangaShift<span className="text-[var(--accent)]">.</span>
                        </span>

                        <p className="mt-6 max-w-[34ch] text-[length:var(--normal-font-size)] leading-relaxed text-[var(--text-muted)]">
                            Manga, brought to life. We turn static panels into narrated, motion-driven
                            video — page after page, frame by frame.
                        </p>

                        {/* Pieczątka-koło (stamp) */}
                        <div className="mt-10 flex items-center gap-4">
                            <span className="relative flex h-[5.4rem] w-[5.4rem] shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)]">
                                <span className="absolute inset-[6px] rounded-full border border-dashed border-[var(--line)]" />
                                <em className="serif text-[1.9rem] leading-none text-[var(--accent-text)]">Nº1</em>
                            </span>
                            <p className="font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.22em] text-[var(--text-faint)]">
                                Manga → Video
                                <br />
                                Pipeline · AI Narration
                            </p>
                        </div>
                    </div>

                    {/* Explore */}
                    <nav aria-label="Explore" className="flex flex-col">
                        <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-3">
                            <span className="eyebrow !text-[var(--text-faint)]">Explore</span>
                            <span className="font-mono text-[10px] tabular-nums text-[var(--text-faint)]">Nº 01</span>
                        </div>
                        <ul className="mt-6 flex flex-col">
                            {EXPLORE.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        onClick={handleScrollLink}
                                        className="group flex items-baseline gap-3 py-2 text-[length:var(--normal-font-size)] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                                    >
                                        <span className="font-mono text-[1.1rem] tabular-nums text-[var(--text-faint)] transition-colors group-hover:text-[var(--accent-text)]">
                                            {item.n}
                                        </span>
                                        <span className="relative">
                                            {item.label}
                                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--accent)] transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Connect */}
                    <nav aria-label="Connect" className="flex flex-col">
                        <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-3">
                            <span className="eyebrow !text-[var(--text-faint)]">Connect</span>
                            <span className="font-mono text-[10px] tabular-nums text-[var(--text-faint)]">Nº 02</span>
                        </div>
                        <ul className="mt-6 flex flex-col gap-5">
                            {CONNECT.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col"
                                    >
                                        <span className="flex items-center gap-2 text-[length:var(--normal-font-size)] text-[var(--text)]">
                                            {item.label}
                                            <svg
                                                width="11"
                                                height="11"
                                                viewBox="0 0 11 11"
                                                fill="none"
                                                aria-hidden="true"
                                                className="text-[var(--text-faint)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-text)]"
                                            >
                                                <path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="mt-1 font-mono text-[1.15rem] text-[var(--text-faint)] transition-colors group-hover:text-[var(--text-muted)]">
                                            {item.sub}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Kolaż + współrzędne */}
                    <div className="flex flex-col">
                        <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-3">
                            <span className="eyebrow !text-[var(--text-faint)]">Plate</span>
                            <span className="font-mono text-[10px] tabular-nums text-[var(--text-faint)]">Nº 03</span>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <figure className="relative aspect-[3/4] flex-1 overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)]">
                                <Bracket className="left-1.5 top-1.5 border-l border-t" />
                                <Bracket className="right-1.5 top-1.5 border-r border-t" />
                                <Image
                                    src="/images/chainsawman/RezeArc.webp"
                                    alt="Source manga panel queued for the MangaShift pipeline"
                                    fill
                                    sizes="(max-width: 1024px) 50vw, 12rem"
                                    className="object-cover object-top opacity-95"
                                />
                                <figcaption className="absolute bottom-0 left-0 right-0 bg-[var(--bg-alpha)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-faint)] backdrop-blur-sm">
                                    Source · Panel
                                </figcaption>
                            </figure>
                            <figure className="relative aspect-[3/4] flex-1 overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)]">
                                <Bracket className="left-1.5 bottom-1.5 border-b border-l" />
                                <Bracket className="right-1.5 bottom-1.5 border-b border-r" />
                                <Image
                                    src="/images/inspiration/work-1.png"
                                    alt="Rendered video still produced by MangaShift"
                                    fill
                                    sizes="(max-width: 1024px) 50vw, 12rem"
                                    className="object-cover opacity-95"
                                />
                                <figcaption className="absolute bottom-0 left-0 right-0 bg-[var(--bg-alpha)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-faint)] backdrop-blur-sm">
                                    Render · Frame
                                </figcaption>
                            </figure>
                        </div>

                        <p className="mt-5 font-mono text-[1.15rem] leading-relaxed text-[var(--text-faint)]">
                            <span className="text-[var(--accent-text)]">◉</span> 50.0647° N, 19.9450° E
                            <br />
                            Kraków · PL — Remote / Worldwide
                        </p>
                    </div>
                </motion.div>

                {/* ── MEGA-SŁOWO ──────────────────────────────────────────────────────────── */}
                <motion.div
                    className="relative mt-24 border-y border-[var(--line)] py-10 lg:mt-32"
                    {...fadeUp}
                    transition={{ duration: 0.9, delay: 0.1 }}
                >
                    {/* Ribbon — wstążka z meta nad mega-słowem */}
                    <div className="absolute -top-3 left-0 flex items-center gap-3">
                        <span className="bg-[var(--accent)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-fg)]">
                            Vol. 01
                        </span>
                        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)] sm:block">
                            Static → Motion
                        </span>
                    </div>

                    <span className="block select-none text-center text-[clamp(7rem,13vw,20rem)] font-black leading-[0.86] tracking-tighter text-[var(--text)]">
                        MangaShift<span className="text-[var(--accent)]">.</span>
                    </span>

                    <div className="absolute -bottom-3 right-0 flex items-center gap-3">
                        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)] sm:block">
                            Frame by frame
                        </span>
                        <span className="border border-[var(--line-strong)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            Issue Nº 01
                        </span>
                    </div>
                </motion.div>

                {/* ── DÓŁ — kolofon ───────────────────────────────────────────────────────── */}
                <div className="mt-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-3">
                        <Dot />
                        <p className="font-mono text-[1.2rem] tracking-[0.06em] text-[var(--text-faint)]">
                            © {new Date().getFullYear()} MangaShift
                            <span className="mx-2 text-[var(--line-strong)]">·</span>
                            Apache-2.0 / Vol. 01
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <span className="font-mono text-[1.2rem] tracking-[0.06em] text-[var(--text-faint)]">
                            50.0647° N, 19.9450° E
                        </span>
                        <span className="hidden h-3 w-px bg-[var(--line-strong)] sm:block" />
                        <span className="font-mono text-[1.2rem] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                            Crafted with <span className="text-[var(--accent-text)]">♥</span> · MMXXVI
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';
import { Button } from '@/shared/ui/Button/Button';

/* ── Ikony (stroke 1.5, currentColor) — inline, bez zależności ────────────────── */

type IconProps = { className?: string };

const NarrationIcon = ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M3 9v6h4l5 4V5L7 9H3Z" />
        <path d="M16.5 8.5a5 5 0 0 1 0 7" />
        <path d="M19 6a8.5 8.5 0 0 1 0 12" />
    </svg>
);

const PanelIcon = ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="3" y="3" width="7.5" height="9" rx="1" />
        <rect x="13.5" y="3" width="7.5" height="5.5" rx="1" />
        <rect x="13.5" y="12" width="7.5" height="9" rx="1" />
        <rect x="3" y="15.5" width="7.5" height="5.5" rx="1" />
    </svg>
);

const VoicesIcon = ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M5 5v14" />
        <path d="M9 8v8" />
        <path d="M12.5 4v16" />
        <path d="M16 8v8" />
        <path d="M19.5 6v12" />
    </svg>
);

const ExportIcon = ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m10 9 5 3-5 3V9Z" />
    </svg>
);

const ArrowMark = ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
    </svg>
);

const Bracket = ({ corner }: { corner: 'tl' | 'tr' | 'bl' | 'br' }) => {
    const pos = {
        tl: 'left-0 top-0 border-l border-t',
        tr: 'right-0 top-0 border-r border-t',
        bl: 'left-0 bottom-0 border-l border-b',
        br: 'right-0 bottom-0 border-r border-b',
    }[corner];
    return (
        <span aria-hidden="true"
            className={cn('pointer-events-none absolute h-7 w-7 border-[var(--text)]/60', pos)} />
    );
};

/* ── Treść kart (i18n koncepcyjnie: features.capabilities[].* ) ────────────────── */

const capabilities = [
    {
        n: '01',
        Icon: NarrationIcon,
        tag: 'Narration',
        title: 'AI Narration',
        text: 'Context-aware script generation reads each page in order, turning panels, captions and SFX into a natural spoken narrative — pacing, pauses and tone tuned for the scene.',
        coord: 'N 35.6° · E 139.6°',
    },
    {
        n: '02',
        Icon: PanelIcon,
        tag: 'Vision',
        title: 'Panel Detection',
        text: 'Computer vision segments every page into panels and reading order — right-to-left or left-to-right — so the camera moves the way the artist intended, frame by frame.',
        coord: 'GRID · 4 × 6',
    },
    {
        n: '03',
        Icon: VoicesIcon,
        tag: 'Cast',
        title: 'Multiple Voices',
        text: 'Assign a distinct voice to each character and a separate narrator. Speech bubbles are attributed automatically, so dialogue lands on the right cast member, every line.',
        coord: 'VOX · ∞',
    },
    {
        n: '04',
        Icon: ExportIcon,
        tag: 'Output',
        title: 'Video Export',
        text: 'Render the finished cut to MP4 with synced audio, subtitles and Ken-Burns motion — ready for YouTube, Shorts or TikTok in vertical, square or widescreen.',
        coord: 'MP4 · 4K · 60 fps',
    },
] as const;

/* ── Animacje ─────────────────────────────────────────────────────────────────── */

const reveal: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
};

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const viewport = { once: true, margin: '-80px' } as const;

/* ── Sekcja ───────────────────────────────────────────────────────────────────── */

export const FeaturesSection = () => (
    <section
        id="features"
        className="relative py-[clamp(10rem,16vw,13rem)] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
    >
        <div className="relative z-10 mx-auto max-w-[120rem]">
            {/* Sec-rule: cyfra rzymska · meta · numeracja stron */}
            <motion.div
                className="flex items-baseline justify-between gap-4 border-t border-[var(--line)] pt-3 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6 }}
            >
                <em className="serif shrink-0 text-[1.5em] leading-none tracking-normal text-[var(--accent-text)]">III.</em>
                <span className="truncate font-mono">Capabilities · The Pipeline</span>
                <span className="shrink-0 font-mono tabular-nums">004 / 008</span>
            </motion.div>

            <div className="mt-[clamp(4rem,7vw,7rem)] grid grid-cols-1 items-start gap-[clamp(4rem,6vw,7rem)] lg:grid-cols-2">

                {/* ── LEWA: obraz + corner brackets + pionowy ribbon ─────────────── */}
                <motion.figure
                    className="relative lg:sticky lg:top-[12rem]"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.8 }}
                >
                    {/* Pionowy ribbon (poza ramką, lewa krawędź) */}
                    <span
                        aria-hidden="true"
                        className="absolute -left-[2.6rem] top-0 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--text-faint)] md:block"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                        MANGASHIFT · CAPABILITIES · MS/26
                    </span>

                    <div className="relative">
                        <Bracket corner="tl" />
                        <Bracket corner="tr" />
                        <Bracket corner="bl" />
                        <Bracket corner="br" />

                        <div className="relative m-3 overflow-hidden rounded-[2px] bg-[var(--surface)]">
                            <div className="relative aspect-[4/5] w-full">
                                <Image
                                    src="/images/inspiration/capabilities.png"
                                    alt="MangaShift turning a manga page into narrated video"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>

                            {/* Naklejka: Nº + tytuł płyty */}
                            <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[var(--bg)]/85 to-transparent p-5">
                                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                                    Plate Nº 04 — Page → Reel
                                </span>
                                <span className="serif text-[2rem] leading-none text-[var(--accent-text)]">fig.</span>
                            </figcaption>
                        </div>

                        {/* Pieczątka-koło (stamp) */}
                        <div className="absolute -right-4 -top-4 hidden h-[7.2rem] w-[7.2rem] items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--bg)] text-center md:flex">
                            <div className="flex flex-col leading-tight">
                                <span className="serif text-[2.4rem] leading-none text-[var(--accent-text)]">04</span>
                                <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                                    of eight
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.figure>

                {/* ── PRAWA: eyebrow + H2 + grid 2×2 kart + CTA ──────────────────── */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-4">
                            <span className="h-px w-10 bg-[var(--accent)]" />
                            <span className="eyebrow">Nº 04 — Capabilities</span>
                        </div>

                        <h2 className="mt-6 max-w-[16ch] text-[clamp(3rem,4.6vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--text)]">
                            Built for <em className="font-normal text-[var(--accent-text)]">storytelling</em>.
                        </h2>

                        <p className="mt-6 max-w-[46ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)]">
                            Four engines, one pipeline. Every page becomes a scene — read in order,
                            voiced in character, and cut to video without a frame left behind.
                        </p>
                    </motion.div>

                    <motion.ul
                        className="mt-[clamp(3.5rem,5vw,5rem)] grid grid-cols-1 gap-[clamp(1.4rem,2vw,2rem)] sm:grid-cols-2"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                    >
                        {capabilities.map(({ n, Icon, tag, title, text, coord }) => (
                            <motion.li
                                key={n}
                                variants={reveal}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative flex flex-col rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[clamp(2rem,2.4vw,2.6rem)] transition-colors duration-300 hover:border-[var(--line-strong)]"
                            >
                                <div className="flex items-start justify-between">
                                    <span className="serif text-[3.4rem] italic leading-none text-[var(--accent-text)]">
                                        {n}
                                    </span>
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text-muted)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent-text)]">
                                        <ArrowMark className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </span>
                                </div>

                                <Icon className="mt-7 h-8 w-8 text-[var(--text)]" />

                                <div className="mt-4 flex items-center gap-2">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                                        {tag}
                                    </span>
                                    <span className="h-px flex-1 bg-[var(--line)]" />
                                </div>

                                <h3 className="mt-2 text-[length:var(--h3-font-size)] font-bold leading-tight text-[var(--text)]">
                                    {title}
                                </h3>

                                <p className="mt-3 text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                                    {text}
                                </p>

                                <span className="mt-5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                                    {coord}
                                </span>
                            </motion.li>
                        ))}
                    </motion.ul>

                    <motion.div
                        className="mt-[clamp(3rem,4vw,4rem)] flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[var(--line)] pt-7"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.6 }}
                    >
                        <Button variant="primary" size="md">Join the beta</Button>
                        <p className="max-w-[34ch] text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                            <em className="serif text-[var(--text)]">One upload</em> in — a narrated reel out.
                            No timeline, no editor, no frame skipped.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
);

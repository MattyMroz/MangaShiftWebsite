'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { SecRule } from '@/shared/ui/SecRule/SecRule';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';
import { cn } from '@/shared/lib/utils/cn';

const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
};

// Narożny nawias (corner bracket) — editorialny detal ramki.
const Corner = ({ className }: { className?: string }) => (
    <span
        aria-hidden="true"
        className={cn('pointer-events-none absolute h-5 w-5 border-[var(--text)]', className)}
    />
);

export const AboutSection = () => {
    const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && smoothScrollTo(href)) e.preventDefault();
    };

    return (
        <section
            id="about"
            aria-labelledby="about-title"
            className="relative py-[12rem] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            <div className="relative z-10 mx-auto max-w-[120rem]">
                <SecRule roman="I." meta="About · Vision" page="002 / 008" />

                <div className="mt-[5rem] grid items-start gap-x-[6rem] gap-y-[6rem] lg:grid-cols-[1.05fr_1fr] lg:gap-x-[7rem]">
                    {/* ── Lewa kolumna: manifest ─────────────────────────────── */}
                    <div className="relative lg:pt-6">
                        <motion.div
                            className="flex items-center gap-4"
                            {...fadeUp}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="h-px w-10 bg-[var(--accent)]" />
                            <span className="eyebrow">Nº 01 — Why MangaShift</span>
                        </motion.div>

                        <motion.h2
                            id="about-title"
                            className="mt-8 max-w-[15ch] text-[clamp(3.5rem,6vw,7rem)] font-extrabold leading-[1.03] tracking-tight text-[var(--text)]"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            We give manga a{' '}
                            <span className="serif text-[var(--accent-text)]">voice</span>.
                        </motion.h2>

                        <motion.p
                            className="mt-10 max-w-[50ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)]"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Reading is a silent art. The page holds still, the panels wait, and
                            every gasp lives only inside your head.
                        </motion.p>

                        <motion.p
                            className="mt-6 max-w-[50ch] text-[length:var(--normal-font-size)] leading-relaxed text-[var(--text-muted)]"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.28 }}
                        >
                            MangaShift turns static manga and manhwa into narrated video — adding
                            motion, a reading voice, and a scored soundtrack — so a chapter you
                            once read in silence now <em className="serif text-[var(--text)]">moves</em>,{' '}
                            <em className="serif text-[var(--text)]">speaks</em>, and{' '}
                            <em className="serif text-[var(--text)]">sounds</em>.
                        </motion.p>

                        {/* Trzy filary manifestu — meta-lista mono */}
                        <motion.ul
                            className="mt-12 grid max-w-[44ch] grid-cols-3 gap-px overflow-hidden rounded-[2px] border border-[var(--line)] bg-[var(--line)] text-center"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.36 }}
                        >
                            {[
                                ['01', 'Motion'],
                                ['02', 'Narration'],
                                ['03', 'Sound'],
                            ].map(([n, label]) => (
                                <li key={n} className="bg-[var(--bg)] px-3 py-5">
                                    <span className="block font-mono text-[1.05rem] tabular-nums text-[var(--text-faint)]">
                                        {n}
                                    </span>
                                    <span className="mt-2 block text-[length:var(--small-font-size)] font-medium text-[var(--text)]">
                                        {label}
                                    </span>
                                </li>
                            ))}
                        </motion.ul>

                        <motion.div
                            className="mt-12"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.44 }}
                        >
                            <Link href="#how" onClick={handleScrollLink} className="contents">
                                <Button variant="ghost" size="md">
                                    <span className="flex items-center gap-3">
                                        See how it works
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        >
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="13 6 19 12 13 18" />
                                        </svg>
                                    </span>
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* ── Prawa kolumna: obraz w ramce (magazyn) ─────────────── */}
                    <motion.figure
                        className="relative"
                        initial={{ opacity: 0, y: 36 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                    >
                        {/* Side-note — pionowy podpis jak na marginesie magazynu */}
                        <span
                            aria-hidden="true"
                            className="absolute -left-10 top-0 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--text-faint)] lg:block"
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                            Plate I — From panel to picture
                        </span>

                        {/* Współrzędne / index w narożniku */}
                        <div className="mb-4 flex items-baseline justify-between font-mono text-[1.05rem] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                            <span>Fig. 01</span>
                            <span className="tabular-nums">35.6762° N · 139.6503° E</span>
                        </div>

                        <div className="group relative aspect-square overflow-hidden rounded-[3px] border border-[var(--line-strong)] bg-[var(--surface)] shadow-[var(--shadow-lg)]">
                            <Corner className="left-3 top-3 border-l-2 border-t-2" />
                            <Corner className="right-3 top-3 border-r-2 border-t-2" />
                            <Corner className="bottom-3 left-3 border-b-2 border-l-2" />
                            <Corner className="bottom-3 right-3 border-b-2 border-r-2" />

                            <Image
                                src="/images/inspiration/about.png"
                                alt="A manga panel mid-transformation into a narrated, moving frame."
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />

                            {/* Pieczątka-koło (stamp) */}
                            <div className="absolute right-5 top-5 flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--bg-alpha)] backdrop-blur-sm">
                                <span className="font-mono text-[9px] uppercase leading-tight tracking-[0.18em] text-[var(--accent-text)]">
                                    Manga
                                    <br />
                                    Shift
                                    <br />
                                    ®
                                </span>
                            </div>

                            {/* Ribbon — etykieta w dolnym pasku */}
                            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t border-[var(--line)] bg-[var(--bg-alpha)] px-5 py-4 backdrop-blur-sm">
                                <span className="text-[length:var(--small-font-size)] font-medium text-[var(--text)]">
                                    The silent page, given a voice.
                                </span>
                                <span className="shrink-0 font-mono text-[1.05rem] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                                    Nº 002
                                </span>
                            </figcaption>
                        </div>

                        {/* Caption pod ramką */}
                        <p className="mt-5 max-w-[44ch] text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                            <em className="serif text-[var(--text)]">Fig. 01.</em> One panel, four
                            transformations — pacing, camera, voice, and score, composed by the
                            MangaShift pipeline.
                        </p>
                    </motion.figure>
                </div>
            </div>
        </section>
    );
};

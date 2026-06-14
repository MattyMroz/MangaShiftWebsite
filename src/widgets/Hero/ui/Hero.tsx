'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { Container } from '@/shared/ui/Container/Container';
import { assetPath } from '@/shared/lib/utils/assetPath';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';

const highlights = [
    ['01', 'Panel-aware pacing'],
    ['02', 'Character narration'],
    ['03', 'Ready-to-share video'],
] as const;

const reveal = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
};

export const Hero = () => {
    const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const href = event.currentTarget.getAttribute('href');
        if (href && smoothScrollTo(href)) event.preventDefault();
    };

    return (
        <section id="home" className="relative overflow-hidden pb-20 pt-32 md:pb-24 md:pt-40">
            <Container>
                <div className="editorial-rule" data-index="I." data-page="001 / 008">
                    <span className="truncate">MangaShift / private beta / 2026</span>
                </div>

                <div className="mt-10 grid items-center gap-16 lg:mt-14 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-7 lg:pr-8">
                        <motion.p className="section-kicker" {...reveal} transition={{ duration: 0.55 }}>
                            Manga to narrated video
                        </motion.p>

                        <motion.h1
                            className="display mt-7 max-w-[11ch] text-[clamp(5.2rem,7.3vw,9.4rem)]"
                            {...reveal}
                            transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Turn manga into a story you can{' '}
                            <em className="text-[var(--accent-text)]">watch</em>.
                        </motion.h1>

                        <motion.p
                            className="mt-8 max-w-[58ch] text-[1.8rem] leading-[1.65] text-[var(--text-muted)] md:text-[2rem]"
                            {...reveal}
                            transition={{ duration: 0.7, delay: 0.18 }}
                        >
                            MangaShift reads every panel, follows the original flow, adds narration
                            and motion, then renders a finished video. No timeline. No manual cut.
                        </motion.p>

                        <motion.div
                            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
                            {...reveal}
                            transition={{ duration: 0.7, delay: 0.26 }}
                        >
                            <Link href="#beta" onClick={scrollTo} className="contents">
                                <Button variant="hero" size="md">
                                    Join the private beta
                                    <span aria-hidden="true">↗</span>
                                </Button>
                            </Link>
                            <Link href="#demo" onClick={scrollTo} className="contents">
                                <Button variant="outline" size="md">
                                    Watch the sample
                                    <span aria-hidden="true">↓</span>
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.dl
                            className="mt-12 grid max-w-[66rem] gap-px overflow-hidden border-y border-[var(--line)] bg-[var(--line)] sm:grid-cols-3"
                            {...reveal}
                            transition={{ duration: 0.75, delay: 0.34 }}
                        >
                            {highlights.map(([number, label]) => (
                                <div key={number} className="bg-[var(--bg)] px-4 py-5">
                                    <dt className="font-mono text-[1rem] tracking-[0.18em] text-[var(--accent-text)]">
                                        {number}
                                    </dt>
                                    <dd className="mt-2 text-[1.35rem] font-medium leading-snug text-[var(--text)]">
                                        {label}
                                    </dd>
                                </div>
                            ))}
                        </motion.dl>
                    </div>

                    <motion.figure
                        className="relative mx-auto w-full max-w-[60rem] pb-10 lg:col-span-5"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span
                            aria-hidden="true"
                            className="absolute -right-8 top-12 h-40 w-40 rounded-full bg-[var(--accent)] opacity-85 md:h-52 md:w-52"
                        />

                        <div className="diagram-card relative ml-auto w-[88%] p-3 md:p-4">
                            <div className="flex items-center justify-between border-b border-[var(--line)] px-2 pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="h-4 w-4 rounded-full bg-[var(--accent)]" />
                                    <span className="font-mono text-[0.9rem] uppercase tracking-[0.17em] text-[var(--text-faint)]">
                                        Motion study / 01
                                    </span>
                                </div>
                                <span className="font-mono text-[1.4rem] tracking-[0.14em] text-[var(--text)]">
                                    ≡
                                </span>
                            </div>

                            <div className="relative mt-3 aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-2)]">
                                <span className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[var(--accent)] opacity-80" />
                                <Image
                                    src={assetPath('/images/inspiration/hero-angel.png')}
                                    alt="Editorial collage representing MangaShift motion direction"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 88vw, 38vw"
                                    className="relative z-10 object-contain object-bottom"
                                />
                            </div>

                            <div className="mt-3 grid grid-cols-[1fr_1fr_1fr_1.6fr] gap-2" aria-hidden="true">
                                {[
                                    { label: 'Page', cls: 'bg-[var(--text)]' },
                                    { label: 'Panels', cls: 'border border-[var(--line-strong)] bg-[var(--surface-2)]' },
                                    { label: 'Voice', cls: 'bg-[color-mix(in_srgb,var(--accent)_22%,var(--surface))]' },
                                ].map(({ label, cls }) => (
                                    <div key={label}>
                                        <span className={`block h-9 rounded-[0.7rem] ${cls}`} />
                                        <span className="mt-1.5 block font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                                <div>
                                    <span className="relative block h-9 overflow-hidden rounded-[0.7rem] bg-[var(--accent)]">
                                        <svg viewBox="0 0 120 36" className="absolute inset-0 h-full w-full text-white/55" aria-hidden="true">
                                            <path d="M0 22c18-16 34 10 52-3s31-7 68 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                                            <path d="M0 28c22-12 35 7 56-2s38-7 64 1" fill="none" stroke="currentColor" strokeWidth="1.4" />
                                        </svg>
                                    </span>
                                    <span className="mt-1.5 block text-right font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--accent-text)]">
                                        Video
                                    </span>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            className="diagram-card absolute bottom-0 left-0 w-[42%] p-2.5"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem]">
                                <Image
                                    src={assetPath('/images/chainsawman/RezeArc.webp')}
                                    alt="Source manga frame"
                                    fill
                                    sizes="220px"
                                    className="object-cover object-top grayscale"
                                />
                                <span className="absolute left-3 top-3 h-5 w-5 rounded-full bg-[var(--accent)]" />
                            </div>
                            <div className="mt-2 flex items-center justify-between font-mono text-[0.8rem] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                                <span>Source</span>
                                <span>Panel 001</span>
                            </div>
                        </motion.div>

                        <span
                            aria-hidden="true"
                            className="absolute bottom-[7.2rem] left-[39%] h-px w-[12%] bg-[var(--text)]"
                        />
                        <span
                            aria-hidden="true"
                            className="absolute bottom-[6.85rem] left-[50%] h-2 w-2 rounded-full bg-[var(--accent)]"
                        />
                    </motion.figure>
                </div>
            </Container>
        </section>
    );
};

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { Container } from '@/shared/ui/Container/Container';
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
                <div
                    className="editorial-rule"
                    data-index="I."
                    data-page="001 / 006"
                >
                    <span className="truncate">MangaShift · private beta · 2026</span>
                </div>

                <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-7 lg:pr-8">
                        <motion.p
                            className="section-kicker"
                            {...reveal}
                            transition={{ duration: 0.55 }}
                        >
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
                        className="relative mx-auto w-full max-w-[56rem] lg:col-span-5"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span
                            aria-hidden="true"
                            className="absolute -right-10 -top-8 h-44 w-44 rounded-full bg-[var(--accent)] opacity-90 md:h-56 md:w-56"
                        />
                        <span
                            aria-hidden="true"
                            className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full border border-[var(--accent-2)] bg-[var(--surface-2)]"
                        />

                        <div className="relative overflow-hidden rounded-[2.4rem] border border-[var(--line-strong)] bg-[#101012] p-3 shadow-[var(--shadow-lg)]">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem]">
                                <Image
                                    src="/images/chainsawman/RezeArc.webp"
                                    alt="Manga artwork prepared for the MangaShift video pipeline"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 90vw, 42vw"
                                    className="object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/5" />
                                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
                                    <div>
                                        <p className="font-mono text-[1rem] uppercase tracking-[0.2em] text-white/60">
                                            Preview · frame 001
                                        </p>
                                        <p className="mt-1 text-[1.8rem] font-semibold">Reze Arc sample</p>
                                    </div>
                                    <span className="grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-white/10 text-[1.5rem] backdrop-blur">
                                        ▶
                                    </span>
                                </div>
                            </div>
                        </div>

                        <figcaption className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3 font-mono text-[1rem] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                            <span>Static page</span>
                            <span className="text-[var(--accent-text)]">→ narrated motion</span>
                        </figcaption>
                    </motion.figure>
                </div>
            </Container>
        </section>
    );
};

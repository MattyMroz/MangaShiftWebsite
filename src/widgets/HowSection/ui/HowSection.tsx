'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

type Step = {
    n: string;
    roman: string;
    title: string;
    text: string;
    coord: string;
    image: string;
    alt: string;
};

const steps: Step[] = [
    {
        n: '01',
        roman: 'I',
        title: 'Upload',
        text: 'Drop a chapter, a single page, or a whole volume. MangaShift ingests manga, manhwa and webtoons — any resolution, any reading direction — and tidies the raw scans for the pipeline.',
        coord: '35.6762° N',
        image: '/images/inspiration/method-1.png',
        alt: 'Raw manga pages being ingested into the pipeline',
    },
    {
        n: '02',
        roman: 'II',
        title: 'Detect',
        text: 'Vision models read the page the way you do — segmenting panels, tracing reading order, and lifting every speech bubble and caption with character-aware attribution.',
        coord: '139.6503° E',
        image: '/images/inspiration/method-2.png',
        alt: 'AI detecting panels and speech bubbles on a page',
    },
    {
        n: '03',
        roman: 'III',
        title: 'Narrate',
        text: 'Dialogue and narration are translated, then performed — distinct, directed voices per character, paced to the beat of each panel for a script that actually sounds alive.',
        coord: '34.0522° N',
        image: '/images/inspiration/method-3.png',
        alt: 'Translation and voice synthesis turning panels into narration',
    },
    {
        n: '04',
        roman: 'IV',
        title: 'Render',
        text: 'Panels, motion and audio are composited into a finished, shareable video — subtitles, chapter markers and clean exports included, ready for the feed.',
        coord: '48.8566° N',
        image: '/images/inspiration/method-4.png',
        alt: 'Finished narrated video being rendered from the manga',
    },
];

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
};

const CornerBrackets = () => (
    <>
        <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-[var(--line-strong)]" />
        <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-[var(--line-strong)]" />
        <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[var(--line-strong)]" />
        <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[var(--line-strong)]" />
    </>
);

export const HowSection = () => (
    <section
        id="how"
        className="relative py-[11rem] lg:py-[13rem] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
    >
        <div className="relative z-10 mx-auto max-w-[120rem]">
            {/* Sec-rule: cyfra rzymska · meta · numeracja stron (atelier-zero) */}
            <motion.div
                className="flex items-baseline justify-between gap-4 border-t border-[var(--line)] pt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
                {...fadeUp}
                transition={{ duration: 0.6 }}
            >
                <em className="serif shrink-0 text-[1.5em] not-italic leading-none tracking-normal text-[var(--accent-text)]">
                    II.
                </em>
                <span className="hidden truncate sm:block">The Method — Manga to Video</span>
                <span className="shrink-0 tabular-nums">003 / 008</span>
            </motion.div>

            {/* Nagłówek */}
            <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.05 }}>
                    <div className="flex items-center gap-4">
                        <span className="h-px w-10 bg-[var(--accent)]" />
                        <span className="eyebrow">Nº 03 — How it works</span>
                    </div>
                    <h2 className="mt-6 max-w-[18ch] text-[clamp(3rem,5vw,5.4rem)] font-extrabold leading-[1.04] tracking-tight text-[var(--text)]">
                        Four passes from <span className="serif text-[var(--accent-text)]">static</span> page to narrated film.
                    </h2>
                </motion.div>

                <motion.p
                    className="max-w-[40ch] text-[length:var(--normal-font-size)] leading-relaxed text-[var(--text-muted)] lg:pb-2"
                    {...fadeUp}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    A single, opinionated pipeline — no editing suite, no timeline, no busywork.
                    Hand it the panels; collect the cut.
                </motion.p>
            </div>

            {/* Grid kroków: repeat(4,1fr), hairline przecinająca u góry */}
            <div className="relative mt-24">
                {/* Pozioma linia przecinająca rząd cyfr */}
                <span
                    aria-hidden
                    className="absolute left-0 right-0 top-[2.6rem] hidden h-px bg-[var(--line-strong)] lg:block"
                />

                <div className="grid grid-cols-1 gap-x-px gap-y-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
                    {steps.map((step, i) => (
                        <motion.article
                            key={step.n}
                            className={cn(
                                'group relative flex flex-col px-0 lg:px-7',
                                i !== 0 && 'lg:border-l lg:border-[var(--line)]',
                            )}
                            {...fadeUp}
                            transition={{ duration: 0.6, delay: i * 0.09 }}
                        >
                            {/* GIGANTYCZNA cyfra Playfair italic coral, na chipie papieru przerywająca linię */}
                            <div className="relative mb-9 flex h-[5.2rem] items-center lg:justify-start">
                                <span className="relative z-10 bg-[var(--bg)] pr-5 lg:pr-6">
                                    <span className="serif block text-[clamp(6rem,7vw,7.8rem)] leading-[0.8] text-[var(--accent-text)]">
                                        {step.n}
                                    </span>
                                </span>
                                <span className="serif absolute right-1 top-0 z-10 hidden bg-[var(--bg)] pl-3 text-[1.4rem] not-italic leading-none text-[var(--text-faint)] lg:block">
                                    {step.roman}
                                </span>
                            </div>

                            {/* H4 ze strzałką */}
                            <h3 className="flex items-center gap-3 text-[length:var(--h2-font-size)] font-bold text-[var(--text)]">
                                {step.title}
                                <span
                                    aria-hidden
                                    className="text-[var(--accent-text)] transition-transform duration-300 ease-out group-hover:translate-x-1"
                                >
                                    →
                                </span>
                            </h3>

                            <p className="mt-4 text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                                {step.text}
                            </p>

                            {/* Mały obraz 1/1 + corner brackets + współrzędne */}
                            <figure className="relative mt-9 aspect-square overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)]">
                                <Image
                                    src={step.image}
                                    alt={step.alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                />
                                <span
                                    aria-hidden
                                    className="absolute left-2 top-2 rounded-sm bg-[var(--bg-alpha)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-faint)] backdrop-blur-sm"
                                >
                                    Fig. {step.n}
                                </span>
                                <CornerBrackets />
                            </figure>

                            <span className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.22em] text-[var(--text-faint)]">
                                {step.coord} · STEP {step.n}/04
                            </span>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Stopka sekcji: meta + pieczątka-koło + ribbon */}
            <motion.div
                className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center"
                {...fadeUp}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-5">
                    {/* Pieczątka-koło */}
                    <span
                        aria-hidden
                        className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-center"
                    >
                        <span className="font-mono text-[8px] uppercase leading-tight tracking-[0.1em] text-[var(--text-faint)]">
                            Auto
                            <br />
                            Pipeline
                        </span>
                    </span>
                    <p className="max-w-[44ch] text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                        Every pass runs unattended. Average chapter turnaround in beta:
                        <span className="text-[var(--text)]"> under ten minutes</span>, from upload to export.
                    </p>
                </div>

                {/* Ribbon / meta */}
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    Pipeline v0.1 · Beta
                </span>
            </motion.div>
        </div>
    </section>
);

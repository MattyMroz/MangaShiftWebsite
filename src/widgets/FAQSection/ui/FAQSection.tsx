'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SecRule } from '@/shared/ui/SecRule/SecRule';
import { Button } from '@/shared/ui/Button/Button';
import { cn } from '@/shared/lib/utils/cn';

type FaqItem = { q: string; a: string; tag: string };

const FAQ_ITEMS: FaqItem[] = [
    {
        q: 'What exactly is MangaShift?',
        tag: 'Product',
        a: 'MangaShift is an AI pipeline that turns static manga and manhwa into fully narrated video. It reads the page, follows the panel order, frames each beat with motion, and lays narration, voices, and ambience over the top — so a silent chapter becomes something you can watch.',
    },
    {
        q: 'How does the pipeline actually work?',
        tag: 'Method',
        a: 'Four stages. We detect panels and reading order, interpret dialogue and scene context, choreograph camera moves across the artwork, then synthesize narration and sound. Each stage is reviewable, so the output stays faithful to the source rather than reinventing it.',
    },
    {
        q: 'Is MangaShift free to use?',
        tag: 'Access',
        a: 'The beta is free while we tune the pipeline with early users. After launch there will be a generous free tier for short chapters, plus paid plans for longer runs, higher resolution, and priority rendering. No card is required to join the beta.',
    },
    {
        q: 'Which languages are supported?',
        tag: 'Language',
        a: 'Narration ships first in English and Japanese, with Korean, Spanish, and French close behind. Source pages can be in any language — translation and localized voice tracks are part of the roadmap, not an afterthought.',
    },
    {
        q: 'When does the beta open?',
        tag: 'Timeline',
        a: 'Private beta opens in waves through 2026. Joining the list secures your place in the queue; we onboard in small batches so every account gets real render capacity and a direct line for feedback.',
    },
    {
        q: 'How good is the output quality?',
        tag: 'Quality',
        a: 'Clean line art, consistent panel flow, and natural pacing are the bar. Voices are expressive without sounding synthetic, and timing follows the rhythm of the page. It is built to honor the artist’s composition — never to flatten or distort it.',
    },
];

const stamp =
    'M50 2 L61 14 L77 9 L80 26 L96 31 L88 46 L98 60 L82 67 L82 84 L65 80 L54 94 L43 80 L26 84 L26 67 L10 60 L20 46 L12 31 L28 26 L31 9 L47 14 Z';

export const FaqSection = () => {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section
            id="faq"
            className="relative py-[11rem] md:py-[13rem] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            <span
                aria-hidden
                className="pointer-events-none absolute right-[var(--section-padding-x-mobile)] md:right-[var(--section-padding-x-tablet)] lg:right-[var(--section-padding-x-desktop-sm)] top-[5rem] font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--text-faint)]"
            >
                35.6762° N · 139.6503° E
            </span>

            <div className="relative z-10 max-w-[120rem] mx-auto">
                <SecRule roman="VI." meta="Frequently Asked · Reader Manual" page="007 / 008" />

                <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-4">
                            <span className="h-px w-10 bg-[var(--accent)]" />
                            <span className="eyebrow">Nº 06 — Questions</span>
                        </div>

                        <h2 className="mt-7 serif not-italic text-[clamp(3.6rem,6.5vw,7.4rem)] leading-[0.98] tracking-tight text-[var(--text)]">
                            Frequently <em className="text-[var(--accent-text)]">asked</em>.
                        </h2>

                        <p className="mt-8 max-w-[46ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)]">
                            Everything you might want to know before a silent page starts
                            speaking — the method, the access, and what to expect from the beta.
                        </p>
                    </motion.div>

                    <motion.aside
                        className="lg:col-span-5 lg:pt-2"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <div className="relative">
                            <span aria-hidden className="absolute -left-2 -top-2 h-6 w-6 border-l border-t border-[var(--line-strong)]" />
                            <span aria-hidden className="absolute -right-2 -bottom-2 h-6 w-6 border-r border-b border-[var(--line-strong)]" />

                            <div
                                className="relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)]"
                                style={{ aspectRatio: '4 / 5' }}
                            >
                                <Image
                                    src="/images/inspiration/lab-3.png"
                                    alt="A manga panel mid-transformation into a narrated frame"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    className="object-cover"
                                />
                                <span className="absolute left-0 top-6 bg-[var(--accent)] px-4 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent-fg)]">
                                    Plate Nº VI
                                </span>
                                <span className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--bg)] mix-blend-difference">
                                    Fig. 06 — page → motion
                                </span>
                            </div>

                            <div className="absolute -bottom-7 -left-7 h-[8.5rem] w-[8.5rem] hidden sm:grid place-items-center">
                                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-[var(--accent)]" aria-hidden>
                                    <motion.path
                                        d={stamp}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 0.9 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.4 }}
                                    />
                                </svg>
                                <div className="text-center leading-tight">
                                    <span className="block font-mono text-[8.5px] uppercase tracking-[0.2em] text-[var(--accent-text)]">
                                        Reader
                                    </span>
                                    <span className="serif block text-[2.4rem] leading-none text-[var(--accent-text)]">Q&amp;A</span>
                                    <span className="block font-mono text-[8.5px] uppercase tracking-[0.2em] text-[var(--accent-text)]">
                                        Vol. 01
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="mt-12 sm:mt-14 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                            Six entries · indexed 01—06
                        </p>
                    </motion.aside>
                </div>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-x-16">
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-[8rem]">
                            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                                Index
                            </p>
                            <ul className="mt-5 space-y-2.5">
                                {FAQ_ITEMS.map((item, i) => (
                                    <li key={item.q}>
                                        <button
                                            onClick={() => setOpen(i)}
                                            className={cn(
                                                'group flex w-full items-baseline gap-3 text-left transition-colors',
                                                open === i ? 'text-[var(--text)]' : 'text-[var(--text-faint)] hover:text-[var(--text-muted)]',
                                            )}
                                        >
                                            <span className="font-mono text-[1.1rem] tabular-nums">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <span className="text-[1.35rem] leading-snug">{item.tag}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-9">
                        <div className="border-t border-[var(--line-strong)]">
                            {FAQ_ITEMS.map((item, i) => {
                                const isOpen = open === i;
                                const num = String(i + 1).padStart(2, '0');
                                return (
                                    <motion.div
                                        key={item.q}
                                        className="border-b border-[var(--line)]"
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                    >
                                        <h3>
                                            <button
                                                onClick={() => setOpen(isOpen ? null : i)}
                                                aria-expanded={isOpen}
                                                aria-controls={`faq-panel-${i}`}
                                                id={`faq-trigger-${i}`}
                                                className="group flex w-full items-start gap-5 md:gap-8 py-9 text-left cursor-pointer"
                                            >
                                                <span
                                                    className={cn(
                                                        'mt-1.5 shrink-0 font-mono text-[1.3rem] tabular-nums transition-colors',
                                                        isOpen ? 'text-[var(--accent-text)]' : 'text-[var(--text-faint)] group-hover:text-[var(--text-muted)]',
                                                    )}
                                                >
                                                    {num}
                                                </span>

                                                <span className="flex-1">
                                                    <span
                                                        className={cn(
                                                            'serif block text-[clamp(2rem,2.8vw,3rem)] leading-[1.12] tracking-tight transition-colors',
                                                            isOpen ? 'text-[var(--text)]' : 'text-[var(--text)] group-hover:text-[var(--accent-text)]',
                                                        )}
                                                    >
                                                        {item.q}
                                                    </span>
                                                    <span className="mt-2 hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                                                        <span className="h-px w-5 bg-[var(--line-strong)]" />
                                                        {item.tag}
                                                    </span>
                                                </span>

                                                <motion.span
                                                    aria-hidden
                                                    animate={{
                                                        rotate: isOpen ? 45 : 0,
                                                        backgroundColor: isOpen ? 'var(--accent)' : 'rgba(0,0,0,0)',
                                                        color: isOpen ? 'var(--accent-fg)' : 'var(--accent-text)',
                                                        borderColor: isOpen ? 'var(--accent)' : 'var(--line-strong)',
                                                    }}
                                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                                    className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border text-[2.6rem] leading-none"
                                                    style={{ borderStyle: 'solid' }}
                                                >
                                                    +
                                                </motion.span>
                                            </button>
                                        </h3>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    id={`faq-panel-${i}`}
                                                    role="region"
                                                    aria-labelledby={`faq-trigger-${i}`}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.34, ease: [0.4, 0, 0.2, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="flex gap-5 md:gap-8 pb-10">
                                                        <span aria-hidden className="hidden md:block w-[1.3rem] shrink-0" />
                                                        <p className="max-w-[62ch] text-[length:var(--normal-font-size)] leading-relaxed text-[var(--text-muted)]">
                                                            {item.a}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <motion.div
                            className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="max-w-[40ch] text-[length:var(--normal-font-size)] text-[var(--text-muted)]">
                                Still curious? Ask the team directly and we’ll fold it into the next issue.
                            </p>
                            <Button
                                variant="outline"
                                size="md"
                                onClick={() => document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Ask a question →
                            </Button>
                        </motion.div>

                        <div className="mt-12 flex items-center justify-between border-t border-[var(--line)] pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                            <span>MangaShift — Reader Manual</span>
                            <span className="tabular-nums">007 / 008</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

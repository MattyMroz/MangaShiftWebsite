'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { Container } from '@/shared/ui/Container/Container';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';
import { assetPath } from '@/shared/lib/utils/assetPath';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';

const modes = [
    {
        id: 'readers',
        label: 'Readers',
        eyebrow: 'Watch the chapter',
        title: 'A calmer way to follow the story.',
        text: 'Narration, readable captions and panel-led motion turn a chapter into a format that works on a commute, on a TV or when reading feels tiring.',
        image: assetPath('/images/inspiration/work-1.png'),
        notes: ['Hands-free playback', 'Original panel order', 'Captions included'],
        code: 'MODE 01 / VIEW',
    },
    {
        id: 'creators',
        label: 'Creators',
        eyebrow: 'Publish more formats',
        title: 'Move from finished pages to a finished cut.',
        text: 'Use the artwork you already made. MangaShift prepares narration, camera motion and timing, then returns a video ready for review and publishing.',
        image: assetPath('/images/inspiration/work-2.png'),
        notes: ['No editing timeline', 'Horizontal and vertical', 'Fast iteration'],
        code: 'MODE 02 / MAKE',
    },
    {
        id: 'publishers',
        label: 'Publishers',
        eyebrow: 'Open the catalogue',
        title: 'Give existing stories a new screen.',
        text: 'Adapt selected titles into watchable previews and narrated episodes without rebuilding the production workflow for every chapter.',
        image: assetPath('/images/inspiration/testimonial.png'),
        notes: ['Repeatable pipeline', 'New distribution formats', 'Beta collaboration'],
        code: 'MODE 03 / SCALE',
    },
] as const;

export const UseCasesSection = () => {
    const [activeId, setActiveId] = useState<(typeof modes)[number]['id']>('readers');
    const active = modes.find((mode) => mode.id === activeId) ?? modes[0];

    const scrollToBeta = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (smoothScrollTo('#beta')) event.preventDefault();
    };

    return (
        <section id="usecases" className="section-shell relative border-y border-[var(--line)] bg-[var(--surface)]">
            <SideLabel side="right">Nº 05 — Who it is for</SideLabel>
            <Container>
                <div className="editorial-rule" data-index="V." data-page="005 / 008">
                    <span>Who it is for</span>
                </div>

                <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="section-kicker">One engine, different stories</p>
                        <h2 className="display mt-7 max-w-[12ch] text-[clamp(4rem,5.8vw,7rem)]">
                            Built around the way you want to{' '}
                            <em className="text-[var(--accent-text)]">use</em> manga.
                        </h2>
                    </motion.div>
                    <p className="max-w-[43ch] text-[1.6rem] leading-[1.7] text-[var(--text-muted)] lg:col-span-5 lg:justify-self-end">
                        Choose a point of view. The active panel slides into place and shows how the
                        same pipeline changes for readers, creators and publishing teams.
                    </p>
                </div>

                <div className="mt-14 rounded-[2.4rem] border border-[var(--line-strong)] bg-[var(--bg)] p-3 shadow-[var(--shadow-md)] md:p-5">
                    <div
                        role="tablist"
                        aria-label="MangaShift audiences"
                        className="relative grid gap-1 rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface)] p-1.5 sm:grid-cols-3"
                    >
                        {modes.map((mode) => {
                            const selected = mode.id === active.id;
                            return (
                                <button
                                    key={mode.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={selected}
                                    aria-controls="usecase-panel"
                                    onClick={() => setActiveId(mode.id)}
                                    className="relative z-10 min-h-12 rounded-[1.2rem] px-5 py-3 text-left sm:text-center"
                                >
                                    {selected && (
                                        <motion.span
                                            layoutId="usecase-active-pill"
                                            className="absolute inset-0 -z-10 rounded-[1.2rem] bg-[var(--text)] shadow-[var(--shadow-sm)]"
                                            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                                        />
                                    )}
                                    <span
                                        className={
                                            selected
                                                ? 'font-mono text-[1.05rem] uppercase tracking-[0.18em] text-[var(--bg)]'
                                                : 'font-mono text-[1.05rem] uppercase tracking-[0.18em] text-[var(--text-muted)]'
                                        }
                                    >
                                        {mode.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div
                        id="usecase-panel"
                        role="tabpanel"
                        className="mt-3 grid overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface)] lg:h-[58rem] lg:grid-cols-12"
                    >
                        <div className="relative min-h-[38rem] overflow-hidden border-b border-[var(--line)] lg:col-span-7 lg:min-h-full lg:border-b-0 lg:border-r">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0, x: 24, scale: 0.985 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -18, scale: 0.985 }}
                                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Image
                                        src={active.image}
                                        alt=""
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 58vw"
                                        className="object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <div className="pointer-events-none absolute inset-5 rounded-[1.2rem] border border-[var(--text)]/25" />
                            <span className="absolute left-8 top-8 rounded-full bg-[var(--accent)] px-3 py-1.5 font-mono text-[0.95rem] uppercase tracking-[0.18em] text-white">
                                {active.code}
                            </span>
                            <div className="absolute bottom-8 right-8 flex items-end gap-3">
                                <div className="dot-grid h-12 w-16 opacity-40" />
                                <span className="rounded-full bg-[var(--bg-alpha)] px-3 py-1.5 font-mono text-[0.85rem] uppercase tracking-[0.16em] text-[var(--text)] backdrop-blur">
                                    {active.label}
                                </span>
                            </div>
                        </div>

                        <div className="relative flex flex-col p-7 md:p-10 lg:col-span-5 lg:p-12">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    <p className="section-kicker">{active.eyebrow}</p>
                                    <h3 className="mt-7 max-w-[12ch] text-[clamp(3.2rem,4vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--text)]">
                                        {active.title}
                                    </h3>
                                    <p className="mt-6 max-w-[46ch] text-[1.55rem] leading-[1.72] text-[var(--text-muted)]">
                                        {active.text}
                                    </p>

                                    <ul className="mt-9 border-t border-[var(--line-strong)]">
                                        {active.notes.map((note, index) => (
                                            <li
                                                key={note}
                                                className="flex items-center gap-4 border-b border-[var(--line)] py-4 text-[1.4rem] text-[var(--text)]"
                                            >
                                                <span className="font-mono text-[0.95rem] text-[var(--accent-text)]">
                                                    0{index + 1}
                                                </span>
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>

                            <Link href="#beta" onClick={scrollToBeta} className="mt-auto pt-10">
                                <Button variant="primary" size="md">
                                    Join the beta
                                    <span aria-hidden="true">↗</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

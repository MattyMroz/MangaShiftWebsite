'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { SecRule } from '@/shared/ui/SecRule/SecRule';
import { cn } from '@/shared/lib/utils/cn';

type Genre = 'Action' | 'Drama' | 'Fantasy';

interface LabItem {
    n: string;
    img: string;
    title: string;
    source: string;
    genre: Genre;
    panels: string;
    runtime: string;
}

const filters = ['All', 'Action', 'Drama', 'Fantasy'] as const;
type Filter = (typeof filters)[number];

const items: LabItem[] = [
    {
        n: '01',
        img: '/images/inspiration/lab-1.png',
        title: 'Crimson Vow',
        source: 'Shōnen · Vol. 03',
        genre: 'Action',
        panels: '142 panels',
        runtime: '4m 18s',
    },
    {
        n: '02',
        img: '/images/inspiration/lab-2.png',
        title: 'The Quiet Year',
        source: 'Seinen · One-shot',
        genre: 'Drama',
        panels: '88 panels',
        runtime: '3m 02s',
    },
    {
        n: '03',
        img: '/images/inspiration/lab-3.png',
        title: 'Ashfall Saga',
        source: 'Manhwa · Ep. 12',
        genre: 'Fantasy',
        panels: '210 panels',
        runtime: '6m 44s',
    },
    {
        n: '04',
        img: '/images/inspiration/lab-4.png',
        title: 'Tidebreaker',
        source: 'Shōnen · Vol. 07',
        genre: 'Action',
        panels: '176 panels',
        runtime: '5m 09s',
    },
    {
        n: '05',
        img: '/images/inspiration/lab-5.png',
        title: 'Letters to No One',
        source: 'Josei · Ch. 24',
        genre: 'Drama',
        panels: '64 panels',
        runtime: '2m 47s',
    },
];

const ArrowMark = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" aria-hidden>
        <path
            d="M7 17L17 7M17 7H9M17 7V15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const CornerBrackets = () => (
    <>
        <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-[var(--accent)]/60" />
        <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-[var(--accent)]/60" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[var(--accent)]/60" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[var(--accent)]/60" />
    </>
);

const LabCard = ({ item, index }: { item: LabItem; index: number }) => (
    <motion.article
        layout
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col"
    >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)]">
            <Image
                src={item.img}
                alt={`${item.title} — manga frame rendered to video by MangaShift`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 20vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--sumi,#1a1a1f)]/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

            <CornerBrackets />

            <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-[var(--bg-alpha)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text)] backdrop-blur-sm">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                {item.genre}
            </div>

            <span className="absolute right-3 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--bg)] mix-blend-difference">
                Nº {item.n} / 2026
            </span>

            <div className="absolute inset-x-3 bottom-3 z-10 flex items-end justify-between gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#efeae0]/90">
                    <span className="block">{item.panels}</span>
                    <span className="block">→ {item.runtime}</span>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#efeae0]/40 p-2 text-[#efeae0] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-fg)]">
                    <ArrowMark />
                </span>
            </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-[var(--line)] pt-3">
            <h3 className="text-[length:var(--text-lg)] font-bold leading-tight tracking-tight text-[var(--text)]">
                {item.title}
            </h3>
            <span className="serif shrink-0 text-[1.6rem] leading-none text-[var(--text-faint)] tracking-normal">
                {item.n}
            </span>
        </div>
        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
            {item.source}
        </p>
    </motion.article>
);

const FilterPill = ({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
            'relative rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
            active
                ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)]'
                : 'border-[var(--line-strong)] bg-transparent text-[var(--text-muted)] hover:border-[var(--text)] hover:text-[var(--text)]',
        )}
    >
        {label}
    </button>
);

export const GallerySection = () => {
    const [filter, setFilter] = useState<Filter>('All');
    const visible = filter === 'All' ? items : items.filter((i) => i.genre === filter);

    return (
        <section
            id="gallery"
            className="relative py-[12rem] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            <div className="relative z-10 mx-auto max-w-[120rem]">
                <SecRule roman="IV." meta="Gallery · Labs · 51.5072° N, 0.1276° W" page="005 / 008" />

                <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-4">
                            <span className="h-px w-10 bg-[var(--accent)]" />
                            <span className="eyebrow">Selected Output</span>
                        </div>
                        <h2 className="mt-6 max-w-[18ch] text-[clamp(3rem,5vw,5.6rem)] font-extrabold leading-[1.04] tracking-tight text-[var(--text)]">
                            Manga, <em className="serif font-normal text-[var(--accent-text)]">rendered</em> to motion.
                        </h2>
                        <p className="mt-6 max-w-[46ch] text-[length:var(--text-lg)] leading-relaxed text-[var(--text-muted)]">
                            Real chapters processed end-to-end — panels resolved into shots,
                            dialogue voiced, timing scored. Five from the lab, hundreds in queue.
                        </p>
                    </motion.div>

                    <motion.div
                        className="relative shrink-0"
                        initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <div className="hidden h-28 w-28 items-center justify-center rounded-full border border-[var(--line-strong)] text-center lg:flex">
                            <div className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-[var(--text-faint)]">
                                MangaShift
                                <br />
                                <span className="text-[var(--accent-text)]">Labs</span>
                                <br />
                                Est. 2026
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-12 flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-6"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                        Filter —
                    </span>
                    {filters.map((f) => (
                        <FilterPill
                            key={f}
                            label={f}
                            active={filter === f}
                            onClick={() => setFilter(f)}
                        />
                    ))}
                    <span className="ml-auto font-mono text-[10px] tabular-nums uppercase tracking-[0.18em] text-[var(--text-faint)]">
                        {String(visible.length).padStart(2, '0')} shown
                    </span>
                </motion.div>

                <motion.div
                    layout
                    className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                >
                    <AnimatePresence mode="popLayout">
                        {visible.map((item, i) => (
                            <LabCard key={item.title} item={item} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="mt-20 flex flex-col gap-8 border-t border-[var(--line)] pt-8 md:flex-row md:items-center md:justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex flex-1 items-center gap-6">
                        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text)]">
                            <span className="serif text-[1.8rem] not-italic text-[var(--accent-text)]">05</span>
                            <span className="mx-1 text-[var(--text-faint)]">/</span>
                            100+ titles
                        </span>
                        <div className="flex h-6 flex-1 items-end gap-[3px]">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <motion.span
                                    key={i}
                                    className={cn(
                                        'flex-1 origin-bottom rounded-full',
                                        i < 5 ? 'bg-[var(--accent)]' : 'bg-[var(--line-strong)]',
                                    )}
                                    style={{ height: i < 5 ? '100%' : '45%' }}
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.015 }}
                                />
                            ))}
                        </div>
                        <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)] md:inline">
                            5% of catalog
                        </span>
                    </div>

                    <Button variant="outline" size="md" className="shrink-0">
                        View full catalog
                        <span className="ml-1 inline-block h-4 w-4">
                            <ArrowMark />
                        </span>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

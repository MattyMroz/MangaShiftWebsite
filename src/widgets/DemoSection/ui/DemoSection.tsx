'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import { cn } from '@/shared/lib/utils/cn';
import { Button } from '@/shared/ui/Button/Button';

const INK = '#1a1a1f';
const PAPER = '#efeae0';
const PAPER_MUTED = 'rgba(239,234,224,0.66)';
const PAPER_FAINT = 'rgba(239,234,224,0.42)';
const HAIRLINE = 'rgba(239,234,224,0.16)';

const VideoPlayerSkeleton = () => (
    <div className="w-full rounded-2xl bg-white/[0.04]" style={{ aspectRatio: '16 / 9' }}>
        <div className="flex h-full w-full items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-[var(--accent)]" />
        </div>
    </div>
);

const VideoPlayer = dynamic(
    () => import('@/features/VideoPlayer/ui/VideoPlayer').then((mod) => mod.VideoPlayer),
    { ssr: false, loading: () => <VideoPlayerSkeleton /> },
);

const ease = [0.22, 1, 0.36, 1] as const;

const Bracket = ({ className }: { className: string }) => (
    <span
        aria-hidden
        className={cn('pointer-events-none absolute h-7 w-7 border-[var(--accent)]', className)}
    />
);

interface PolaroidProps {
    rotate: number;
    delay: number;
    caption: string;
    sub: string;
    no: string;
    coord: string;
    ribbon?: string;
    priority?: boolean;
}

const Polaroid = ({ rotate, delay, caption, sub, no, coord, ribbon, priority }: PolaroidProps) => (
    <motion.figure
        className="group relative w-full max-w-[26rem] rounded-[6px] bg-[#f7f1de] p-3 pb-5 shadow-[0_22px_50px_-18px_rgba(0,0,0,0.7)]"
        style={{ rotate: `${rotate}deg` }}
        initial={{ opacity: 0, y: 36, rotate: rotate * 2.2 }}
        whileInView={{ opacity: 1, y: 0, rotate }}
        whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay, ease }}
    >
        {ribbon && (
            <span className="absolute -right-3 top-5 z-10 rounded-[2px] bg-[var(--accent)] px-3 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-fg)] shadow-md">
                {ribbon}
            </span>
        )}

        <span className="absolute left-4 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 mix-blend-difference">
            {no}
        </span>

        <div className="relative overflow-hidden rounded-[3px] bg-[#26242e]" style={{ aspectRatio: '3 / 4' }}>
            <Image
                src="/images/chainsawman/RezeArc.webp"
                alt={caption}
                fill
                sizes="(max-width: 768px) 80vw, 26rem"
                priority={priority}
                className="object-cover grayscale-[0.12] transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.04]"
            />
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(120% 80% at 50% 0%, transparent 55%, rgba(26,26,31,0.42) 100%)',
                }}
            />
        </div>

        <figcaption className="mt-4 flex items-end justify-between gap-3 px-1">
            <span>
                <span className="block font-[family-name:var(--font-serif)] text-[1.9rem] italic leading-none text-[#1a1a1f]">
                    {caption}
                </span>
                <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#5a5448]">
                    {sub}
                </span>
            </span>
            <span className="shrink-0 font-mono text-[9.5px] tabular-nums tracking-[0.1em] text-[#7a7568]">
                {coord}
            </span>
        </figcaption>
    </motion.figure>
);

export const DemoSection = () => {
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMobileDevice(isMobile), 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            id="demo"
            className="relative px-[var(--section-padding-x-mobile)] py-[10rem] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)] lg:py-[13rem]"
        >
            <div className="relative z-10 mx-auto max-w-[120rem]">
                <motion.div
                    className="relative overflow-hidden rounded-[32px] mx-1 sm:mx-4 lg:mx-8"
                    style={{ backgroundColor: INK, color: PAPER }}
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease }}
                >
                    <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                        }}
                    />
                    <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                'radial-gradient(140% 110% at 88% -10%, rgba(200,55,45,0.16), transparent 46%)',
                        }}
                    />

                    <Bracket className="left-6 top-6 border-l-2 border-t-2" />
                    <Bracket className="right-6 top-6 border-r-2 border-t-2" />
                    <Bracket className="bottom-6 left-6 border-b-2 border-l-2" />
                    <Bracket className="bottom-6 right-6 border-b-2 border-r-2" />

                    <div className="relative px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
                        <div
                            className="flex items-baseline justify-between gap-4 border-t pt-3 text-[10.5px] uppercase tracking-[0.18em]"
                            style={{ borderColor: HAIRLINE, color: PAPER_FAINT }}
                        >
                            <em className="shrink-0 font-[family-name:var(--font-serif)] text-[1.6em] not-italic leading-none tracking-normal text-[var(--accent)]">
                                V
                            </em>
                            <span className="truncate font-mono">Demo Reel — Manga, in motion</span>
                            <span className="shrink-0 font-mono tabular-nums">006 / 008</span>
                        </div>

                        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <div className="flex items-center gap-4">
                                    <span className="h-px w-10 bg-[var(--accent)]" />
                                    <span
                                        className="font-mono text-[length:var(--tiny-font-size)] font-semibold uppercase tracking-[0.22em]"
                                        style={{ color: PAPER }}
                                    >
                                        Nº 06 · The Reel
                                    </span>
                                </div>
                                <h2
                                    className="mt-7 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(3.2rem,5.2vw,6.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
                                    style={{ color: PAPER }}
                                >
                                    See it in{' '}
                                    <em className="font-[family-name:var(--font-serif)] font-medium italic text-[var(--accent)]">
                                        motion
                                    </em>
                                    .
                                </h2>
                            </div>

                            <p
                                className="max-w-[40ch] text-[length:var(--normal-font-size)] leading-relaxed lg:pb-3"
                                style={{ color: PAPER_MUTED }}
                            >
                                One arc, end to end — panels read, dialogue narrated, pacing scored.
                                What was a silent page becomes a watchable scene, generated by the
                                pipeline, untouched by hand.
                            </p>
                        </div>

                        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
                            <motion.div
                                className="relative lg:col-span-8"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.8, ease, delay: 0.1 }}
                            >
                                <div className="relative rounded-[20px] border border-white/10 bg-black/30 p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                                    <Bracket className="-left-px -top-px border-l-2 border-t-2" />
                                    <Bracket className="-right-px -top-px border-r-2 border-t-2" />
                                    <Bracket className="-bottom-px -left-px border-b-2 border-l-2" />
                                    <Bracket className="-bottom-px -right-px border-b-2 border-r-2" />

                                    <VideoPlayer disableCanvas={isMobileDevice} />

                                    <span className="absolute right-5 top-5 z-[2] flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 backdrop-blur-sm">
                                        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">
                                            Sample
                                        </span>
                                    </span>
                                </div>

                                <div
                                    className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 px-1 font-mono text-[10.5px] uppercase tracking-[0.16em]"
                                    style={{ color: PAPER_FAINT }}
                                >
                                    <span>Ratio · 16 : 9</span>
                                    <span>Runtime · 00 : 47</span>
                                    <span>Source · 18 panels</span>
                                    <span className="text-[var(--accent)]">Pipeline · v0.9 β</span>
                                </div>
                            </motion.div>

                            <div className="relative flex flex-col items-center gap-12 pt-2 sm:flex-row sm:justify-center lg:col-span-4 lg:flex-col lg:items-end lg:gap-14 lg:pt-6">
                                <motion.span
                                    aria-hidden
                                    className="absolute -top-2 right-0 z-10 hidden h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full border border-[var(--accent)]/60 text-[var(--accent)] lg:flex"
                                    initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.35, ease }}
                                >
                                    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                                        <defs>
                                            <path
                                                id="demoStampArc"
                                                d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
                                            />
                                        </defs>
                                        <text className="fill-current font-mono text-[10.5px] uppercase tracking-[0.32em]">
                                            <textPath href="#demoStampArc" startOffset="0%">
                                                AI · Generated · Frame by Frame ·
                                            </textPath>
                                        </text>
                                    </svg>
                                    <span className="font-[family-name:var(--font-serif)] text-[2rem] italic">
                                        雷
                                    </span>
                                </motion.span>

                                <Polaroid
                                    rotate={-1.2}
                                    delay={0.2}
                                    caption="Reze Arc"
                                    sub="Chainsaw Man · Reze Arc"
                                    no="Nº 01"
                                    coord="35.6N · 139.6E"
                                    ribbon="Featured"
                                    priority
                                />
                                <Polaroid
                                    rotate={2.4}
                                    delay={0.34}
                                    caption="The Bomb"
                                    sub="Chainsaw Man · Reze Arc"
                                    no="Nº 02"
                                    coord="Plate · II"
                                />
                            </div>
                        </div>

                        <div
                            className="mt-16 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
                            style={{ borderColor: HAIRLINE }}
                        >
                            <p
                                className="max-w-[52ch] text-[length:var(--small-font-size)] leading-relaxed"
                                style={{ color: PAPER_MUTED }}
                            >
                                <em className="font-[family-name:var(--font-serif)] not-italic text-[var(--accent)]">
                                    Note —
                                </em>{' '}
                                rendered from raw scans. No storyboard, no edit pass. Your series is next.
                            </p>
                            <Button variant="primary" onClick={() => (window.location.hash = '#contact')}>
                                Request the beta
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

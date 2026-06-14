'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { Container } from '@/shared/ui/Container/Container';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';
import { assetPath } from '@/shared/lib/utils/assetPath';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';
import { cn } from '@/shared/lib/utils/cn';

const cards = [
    { image: assetPath('/images/inspiration/method-1.png'), eyebrow: 'Source', title: 'The static page', foot: '01' },
    { image: assetPath('/images/inspiration/method-2.png'), eyebrow: 'Read', title: 'Panel order', foot: '02' },
    { image: assetPath('/images/inspiration/method-3.png'), eyebrow: 'Direct', title: 'Voice & motion', foot: '03' },
    { image: assetPath('/images/inspiration/method-4.png'), eyebrow: 'Render', title: 'The narrated cut', foot: '04' },
    { image: assetPath('/images/inspiration/lab-1.png'), eyebrow: 'Output', title: 'Ready to share', foot: '05' },
] as const;

export const DemoSection = () => {
    const [active, setActive] = useState(2);
    const total = cards.length;
    const dragged = useRef(false);
    const go = (dir: number) => setActive((prev) => (prev + dir + total) % total);

    const scrollToBeta = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (smoothScrollTo('#beta')) event.preventDefault();
    };

    return (
        <section id="demo" className="section-shell relative pt-4">
            <SideLabel side="left">Nº 07 — Demo output</SideLabel>
            <Container>
                <motion.div
                    className="on-dark relative overflow-hidden rounded-[3rem] bg-[#121214] px-6 py-8 text-[#f1ede5] shadow-[var(--shadow-lg)] md:px-10 md:py-12 lg:px-14"
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span
                        aria-hidden="true"
                        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--accent)] opacity-15 blur-3xl"
                    />

                    <div className="editorial-rule border-white/15 text-white/45" data-index="VII." data-page="007 / 008">
                        <span>Demo output</span>
                    </div>

                    <div className="relative mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-4">
                            <p className="section-kicker !text-[var(--accent)]">See the format</p>
                            <h2 className="mt-7 max-w-[10ch] text-[clamp(4rem,5vw,6.4rem)] font-extrabold leading-[0.96] tracking-[-0.045em]">
                                A page that knows when to{' '}
                                <em className="serif font-medium text-[var(--accent)]">move</em>.
                            </h2>
                            <p className="mt-7 max-w-[42ch] text-[1.55rem] leading-[1.7] text-white/60">
                                This sample shows the direction: panel-led framing, narration timing
                                and motion composed into one watchable sequence.
                            </p>

                            <dl className="mt-9 grid grid-cols-3 border-y border-white/15 py-5">
                                {[
                                    ['Input', 'Manga'],
                                    ['Format', 'Video'],
                                    ['Stage', 'Beta'],
                                ].map(([label, value]) => (
                                    <div key={label}>
                                        <dt className="font-mono text-[0.95rem] uppercase tracking-[0.18em] text-white/40">
                                            {label}
                                        </dt>
                                        <dd className="mt-2 text-[1.4rem] font-medium text-white/85">{value}</dd>
                                    </div>
                                ))}
                            </dl>

                            <Link href="#beta" onClick={scrollToBeta} className="mt-9 inline-flex">
                                <Button variant="hero" size="md">
                                    Get beta access
                                    <span aria-hidden="true">↗</span>
                                </Button>
                            </Link>
                        </div>

                        <div className="relative lg:col-span-8">
                            <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-white/15 bg-black">
                                <Image
                                    src={assetPath('/assets/demo/spare-me-great-lord.gif')}
                                    alt="Animated manga to video sample"
                                    fill
                                    unoptimized
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                                <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[0.95rem] uppercase tracking-[0.18em] text-white/70 backdrop-blur">
                                    Preview · beta render
                                </span>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[1rem] uppercase tracking-[0.16em] text-white/35">
                                <span>Source · static panels</span>
                                <span className="text-[var(--accent)]">Output · narrated motion</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-12 border-t border-white/12 pt-9">
                        <div className="flex items-end justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
                                <span className="font-mono text-[0.95rem] uppercase tracking-[0.18em] text-white/45">
                                    From page to sequence
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => go(-1)}
                                    aria-label="Previous frame"
                                    className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/70 transition-colors duration-300 hover:border-white/50 hover:text-white"
                                >
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M15 5l-7 7 7 7" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => go(1)}
                                    aria-label="Next frame"
                                    className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/70 transition-colors duration-300 hover:border-white/50 hover:text-white"
                                >
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <motion.div
                            className="relative mt-10 h-[34rem] cursor-grab select-none [perspective:2000px] active:cursor-grabbing md:h-[40rem]"
                            drag="x"
                            dragSnapToOrigin
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.18}
                            dragMomentum={false}
                            onDragStart={() => { dragged.current = true; }}
                            onDragEnd={(_, info) => {
                                if (info.offset.x < -50 || info.velocity.x < -400) go(1);
                                else if (info.offset.x > 50 || info.velocity.x > 400) go(-1);
                                window.setTimeout(() => { dragged.current = false; }, 50);
                            }}
                        >
                            {cards.map(({ image, eyebrow, title, foot }, i) => {
                                const raw = i - active;
                                const offset = ((raw + total + Math.floor(total / 2)) % total) - Math.floor(total / 2);
                                const abs = Math.abs(offset);
                                const isActive = offset === 0;
                                return (
                                    <motion.div
                                        key={title}
                                        onClick={() => {
                                            if (dragged.current) return;
                                            if (!isActive) setActive(i);
                                        }}
                                        className="absolute left-1/2 top-1/2 w-[24rem] md:w-[30rem]"
                                        initial={false}
                                        animate={{
                                            x: `calc(-50% + ${offset * 52}%)`,
                                            y: '-50%',
                                            scale: isActive ? 1 : 0.82 - (abs - 1) * 0.06,
                                            rotate: offset * -4,
                                            opacity: abs > 2 ? 0 : 1,
                                        }}
                                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ zIndex: total - abs, pointerEvents: abs > 2 ? 'none' : 'auto', cursor: isActive ? 'grab' : 'pointer' }}
                                    >
                                        <motion.figure
                                            className="rounded-[1.8rem] border border-[var(--line-strong)] bg-[var(--bg)] p-4 text-[var(--text)] shadow-[var(--shadow-lg)]"
                                            animate={{ y: [0, -12, 0] }}
                                            transition={{ duration: 6 + i, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: i * 0.5 }}
                                        >
                                            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] border border-[var(--line)]">
                                                <Image
                                                    src={image}
                                                    alt=""
                                                    fill
                                                    sizes="(max-width: 768px) 60vw, 30vw"
                                                    draggable={false}
                                                    className="object-cover"
                                                />
                                                <span className="absolute left-3 top-3 rounded-full bg-[var(--bg-alpha)] px-2.5 py-1 font-mono text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent-text)] backdrop-blur">
                                                    {eyebrow}
                                                </span>
                                            </div>
                                            <figcaption className="flex items-center justify-between px-1 pb-1 pt-3.5">
                                                <h3 className="text-[1.7rem] font-bold leading-tight tracking-tight text-[var(--text)]">
                                                    {title}
                                                </h3>
                                                <span className="shrink-0 pl-2 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                                                    {foot}
                                                </span>
                                            </figcaption>
                                        </motion.figure>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        <div className="mt-10 flex justify-center gap-2.5">
                            {cards.map(({ title }, i) => (
                                <button
                                    key={title}
                                    type="button"
                                    onClick={() => setActive(i)}
                                    aria-label={`Go to frame ${i + 1}`}
                                    className={cn(
                                        'h-2 rounded-full transition-all duration-300',
                                        i === active ? 'w-7 bg-[var(--accent)]' : 'w-2 bg-white/25 hover:bg-white/45',
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { Container } from '@/shared/ui/Container/Container';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';
import { assetPath } from '@/shared/lib/utils/assetPath';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';

const cards = [
    {
        image: assetPath('/images/inspiration/method-1.png'),
        eyebrow: 'Source',
        title: 'The static page',
        foot: '01 · Manga',
    },
    {
        image: assetPath('/images/inspiration/method-2.png'),
        eyebrow: 'Read',
        title: 'Panel order',
        foot: '02 · Layout',
    },
    {
        image: assetPath('/images/inspiration/method-3.png'),
        eyebrow: 'Direct',
        title: 'Voice & motion',
        foot: '03 · Scene',
    },
    {
        image: assetPath('/images/inspiration/method-4.png'),
        eyebrow: 'Output',
        title: 'The narrated cut',
        foot: '04 · Video',
    },
] as const;

const fan = [
    { rotate: -13, y: 46, x: 6, scale: 0.82, z: 10 },
    { rotate: -5, y: 8, x: 2, scale: 0.95, z: 20 },
    { rotate: 5, y: 8, x: -2, scale: 0.95, z: 20 },
    { rotate: 13, y: 46, x: -6, scale: 0.82, z: 10 },
] as const;

export const DemoSection = () => {
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
                            <span className="hidden font-mono text-[0.95rem] uppercase tracking-[0.18em] text-white/30 sm:block">
                                Four frames
                            </span>
                        </div>

                        <div className="group/fan mt-14 flex flex-wrap justify-center gap-5 [perspective:1800px] md:mt-20 md:flex-nowrap md:gap-0">
                            {cards.map(({ image, eyebrow, title, foot }, i) => (
                                <motion.figure
                                    key={title}
                                    className="group/card relative w-[17rem] shrink-0 origin-bottom rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--bg)] p-3.5 text-[var(--text)] shadow-[var(--shadow-lg)] [transform-style:preserve-3d] hover:!z-30 md:w-[27rem] md:p-4 md:[margin-inline:-1.8rem] md:hover:[transform:translateY(-2.8rem)_rotate(0deg)_scale(1.08)]"
                                    style={{ zIndex: fan[i].z }}
                                    initial={{ opacity: 0, y: 60, rotate: fan[i].rotate * 1.6 }}
                                    whileInView={{
                                        opacity: 1,
                                        rotate: fan[i].rotate,
                                        x: fan[i].x,
                                        y: [fan[i].y, fan[i].y - (10 - i * 1.5), fan[i].y],
                                        scale: fan[i].scale,
                                    }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{
                                        opacity: { duration: 0.6, delay: i * 0.1 },
                                        rotate: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
                                        x: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
                                        scale: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
                                        y: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 },
                                    }}
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] border border-[var(--line)]">
                                        <Image
                                            src={image}
                                            alt=""
                                            fill
                                            sizes="(max-width: 768px) 45vw, 22vw"
                                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.05]"
                                        />
                                        <span className="absolute left-3 top-3 rounded-full bg-[var(--bg-alpha)] px-2.5 py-1 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent-text)] backdrop-blur">
                                            {eyebrow}
                                        </span>
                                    </div>
                                    <figcaption className="flex items-center justify-between px-1 pb-1 pt-3.5">
                                        <h3 className="text-[1.6rem] font-bold leading-tight tracking-tight text-[var(--text)]">
                                            {title}
                                        </h3>
                                        <span className="shrink-0 pl-2 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                                            {foot.split(' · ')[0]}
                                        </span>
                                    </figcaption>
                                </motion.figure>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

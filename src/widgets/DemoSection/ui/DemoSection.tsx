'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { Container } from '@/shared/ui/Container/Container';
import { assetPath } from '@/shared/lib/utils/assetPath';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';

const pipeline = [
    {
        image: assetPath('/images/inspiration/method-1.png'),
        step: '1',
        label: 'Read the page',
        note: 'Panel order, bubbles and reading direction are parsed first.',
    },
    {
        image: assetPath('/images/inspiration/method-2.png'),
        step: '2',
        label: 'Direct the scene',
        note: 'Framing, narration timing and voices are composed per panel.',
    },
    {
        image: assetPath('/images/inspiration/method-3.png'),
        step: '3',
        label: 'Render the cut',
        note: 'Motion, audio and subtitles export into one watchable video.',
    },
] as const;

export const DemoSection = () => {
    const scrollToBeta = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (smoothScrollTo('#beta')) event.preventDefault();
    };

    return (
        <section id="demo" className="section-shell pt-4">
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
                        <div className="flex items-center justify-between gap-4 font-mono text-[0.95rem] uppercase tracking-[0.18em] text-white/40">
                            <span>From page to sequence</span>
                            <span className="hidden sm:block">Three stages</span>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            {pipeline.map(({ image, step, label, note }, index) => (
                                <motion.figure
                                    key={step}
                                    className="group relative overflow-hidden rounded-[1.4rem] border border-white/12 bg-white/[0.03]"
                                    initial={{ opacity: 0, y: 22 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.55, delay: index * 0.08 }}
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={image}
                                            alt=""
                                            fill
                                            sizes="(max-width: 640px) 100vw, 30vw"
                                            className="object-cover opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                                        />
                                        <span className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/80 via-transparent to-transparent" />
                                        <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-[var(--accent)] font-mono text-[0.9rem] font-semibold text-white">
                                            {step}
                                        </span>
                                    </div>
                                    <figcaption className="px-5 pb-5 pt-4">
                                        <h3 className="text-[1.5rem] font-bold leading-tight tracking-tight text-white/90">
                                            {label}
                                        </h3>
                                        <p className="mt-1.5 text-[1.15rem] leading-[1.6] text-white/50">
                                            {note}
                                        </p>
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

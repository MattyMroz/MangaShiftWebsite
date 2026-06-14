'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { assetPath } from '@/shared/lib/utils/assetPath';

const principles = [
    ['Keep the composition', 'The camera follows the artist’s panel order instead of inventing a new scene.'],
    ['Direct the voice', 'Dialogue, narration and pauses are shaped around what happens on the page.'],
    ['Publish the result', 'The output is a video made for watching, sharing and iterating.'],
] as const;

export const AboutSection = () => (
    <section id="about" className="section-shell">
        <Container>
            <div className="editorial-rule" data-index="II." data-page="002 / 008">
                <span>Why MangaShift</span>
            </div>

            <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-start">
                <motion.div
                    className="lg:col-span-7"
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.72 }}
                >
                    <p className="section-kicker">The idea</p>
                    <h2 className="display mt-7 max-w-[12ch] text-[clamp(4rem,6vw,7.4rem)]">
                        Keep the art. Add{' '}
                        <em className="text-[var(--accent-text)]">voice</em>, pacing and motion.
                    </h2>
                    <p className="mt-8 max-w-[58ch] text-[1.75rem] leading-[1.7] text-[var(--text-muted)]">
                        MangaShift is not an image generator. It is a production pipeline for
                        artwork that already exists. The page remains the source; AI handles the
                        repetitive work between scan and screen.
                    </p>

                    <dl className="mt-12 border-t border-[var(--line-strong)]">
                        {principles.map(([title, text], index) => (
                            <div
                                key={title}
                                className="grid gap-3 border-b border-[var(--line)] py-6 sm:grid-cols-[4rem_1fr_1.4fr] sm:items-baseline"
                            >
                                <dt className="font-mono text-[1rem] tracking-[0.18em] text-[var(--accent-text)]">
                                    0{index + 1}
                                </dt>
                                <dd className="text-[1.7rem] font-semibold text-[var(--text)]">{title}</dd>
                                <dd className="text-[1.4rem] leading-relaxed text-[var(--text-muted)]">{text}</dd>
                            </div>
                        ))}
                    </dl>
                </motion.div>

                <motion.figure
                    className="relative lg:col-span-5 lg:mt-20"
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.82, delay: 0.12 }}
                >
                    <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-[var(--line-strong)] bg-[var(--surface)]">
                        <Image
                            src={assetPath('/images/inspiration/about.png')}
                            alt="Editorial collage representing the MangaShift visual direction"
                            fill
                            sizes="(max-width: 1024px) 100vw, 42vw"
                            className="object-cover"
                        />
                        <span className="absolute inset-0 bg-[var(--accent-2)]/10 mix-blend-multiply" />
                        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                            <span className="font-mono text-[1rem] uppercase tracking-[0.2em] text-white/65">
                                Source frame
                            </span>
                            <span className="serif text-[2rem] italic text-[var(--accent)]">01</span>
                        </div>
                    </div>
                    <figcaption className="mt-4 max-w-[44ch] text-[1.35rem] leading-relaxed text-[var(--text-muted)]">
                        The artwork stays recognizable. Motion and audio support the reading rhythm
                        instead of covering it up.
                    </figcaption>
                </motion.figure>
            </div>
        </Container>
    </section>
);

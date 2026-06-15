'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';
import { assetPath } from '@/shared/lib/utils/assetPath';

const principles = [
    ['Keep the composition', 'The camera follows the artist’s panel order instead of inventing a new scene.'],
    ['Direct the voice', 'Dialogue, narration and pauses are shaped around what happens on the page.'],
    ['Publish the result', 'The output is a video made for watching, sharing and iterating.'],
] as const;

export const AboutSection = () => (
    <section id="about" className="section-shell relative">
        <SideLabel side="left">Nº 02 — Why MangaShift</SideLabel>
        <Container className="relative">
            <div className="editorial-rule" data-index="II." data-page="002 / 008">
                <span>Why MangaShift</span>
            </div>

            <div className="mt-12 grid gap-x-20 gap-y-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="section-kicker">The idea</p>
                    <h2 className="display mt-7 max-w-[12ch] text-[clamp(4rem,6vw,7.4rem)]">
                        Keep the art. Add{' '}
                        <em className="text-[var(--accent-text)]">voice</em>, pacing and motion.
                    </h2>
                    <p className="mt-8 max-w-[54ch] text-[1.75rem] leading-[1.7] text-[var(--text-muted)]">
                        MangaShift is not an image generator. It is a production pipeline for
                        artwork that already exists. The page remains the source; AI handles the
                        repetitive work between scan and screen.
                    </p>

                    <dl className="mt-14 border-t border-[var(--line-strong)]">
                        {principles.map(([title, text], index) => (
                            <motion.div
                                key={title}
                                className="group grid items-baseline gap-3 border-b border-[var(--line)] py-7 sm:grid-cols-[3.4rem_1fr_1.5fr]"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                            >
                                <dt className="serif text-[2.4rem] italic leading-none text-[var(--accent-text)]">
                                    {String(index + 1).padStart(2, '0')}
                                </dt>
                                <dd className="text-[1.7rem] font-semibold tracking-tight text-[var(--text)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                                    {title}
                                </dd>
                                <dd className="text-[1.4rem] leading-relaxed text-[var(--text-muted)]">{text}</dd>
                            </motion.div>
                        ))}
                    </dl>
                </motion.div>

                <motion.figure
                    className="relative lg:mt-24"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.82, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span aria-hidden="true" className="absolute -left-4 -top-4 h-7 w-7 border-l border-t border-[var(--line-strong)]" />
                    <span aria-hidden="true" className="absolute -bottom-4 -right-4 h-7 w-7 border-b border-r border-[var(--line-strong)]" />

                    <div className="relative aspect-[5/6] overflow-hidden rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--surface)]">
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
                            <span className="serif text-[2.4rem] italic text-[var(--accent)]">01</span>
                        </div>
                    </div>

                    <figcaption className="mt-6 flex items-start gap-4">
                        <span aria-hidden="true" className="mt-3 h-px w-9 shrink-0 bg-[var(--accent)]" />
                        <p className="max-w-[40ch] text-[1.35rem] leading-relaxed text-[var(--text-muted)]">
                            The artwork stays recognizable. Motion and audio support the reading rhythm
                            instead of covering it up.
                        </p>
                    </figcaption>
                </motion.figure>
            </div>
        </Container>
    </section>
);

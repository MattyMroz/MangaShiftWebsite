'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { assetPath } from '@/shared/lib/utils/assetPath';
import { cn } from '@/shared/lib/utils/cn';

const studies = [
    { image: assetPath('/images/inspiration/lab-1.png'), title: 'Panel rhythm', note: 'Framing and pause' },
    { image: assetPath('/images/inspiration/lab-2.png'), title: 'Voice space', note: 'Dialogue and silence' },
    { image: assetPath('/images/inspiration/lab-3.png'), title: 'Scene focus', note: 'Guided attention' },
    { image: assetPath('/images/inspiration/lab-4.png'), title: 'Motion language', note: 'Subtle camera direction' },
    { image: assetPath('/images/inspiration/lab-5.png'), title: 'Visual tone', note: 'A coherent final cut' },
] as const;

export const GallerySection = () => (
    <section id="gallery" className="section-shell">
        <Container>
            <div className="editorial-rule" data-index="VI." data-page="006 / 008">
                <span>Visual studies</span>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
                <motion.div
                    className="lg:col-span-8"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-kicker">The look of the experience</p>
                    <h2 className="display mt-7 max-w-[13ch] text-[clamp(4rem,5.8vw,7rem)]">
                        A visual system with room to{' '}
                        <em className="text-[var(--accent-text)]">breathe</em>.
                    </h2>
                </motion.div>

                <p className="max-w-[42ch] text-[1.5rem] leading-[1.7] text-[var(--text-muted)] lg:col-span-4 lg:justify-self-end">
                    These are art-direction studies, not fake product results. They define the
                    paper, ink, composition and pacing that the beta interface will use.
                </p>
            </div>

            <div className="mt-14 grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-6">
                {studies.map((study, index) => (
                    <motion.figure
                        key={study.image}
                        className={cn(
                            'group min-w-0 md:col-span-1 lg:col-span-2',
                            index === 3 && 'lg:col-start-2',
                        )}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.62, delay: index * 0.06 }}
                    >
                        <div className="paper-frame relative aspect-[4/5] p-2">
                            <div className="relative h-full overflow-hidden rounded-[1.25rem]">
                                <Image
                                    src={study.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                                />
                            </div>
                            <span className="absolute right-5 top-5 rounded-full border border-[var(--line-strong)] bg-[var(--bg-alpha)] px-3 py-1.5 font-mono text-[0.9rem] uppercase tracking-[0.18em] text-[var(--text)] backdrop-blur">
                                Study {String(index + 1).padStart(2, '0')}
                            </span>
                        </div>
                        <figcaption className="mt-4 grid min-h-[7.2rem] grid-cols-[1fr_auto] items-start gap-5 border-t border-[var(--line-strong)] pt-4">
                            <div>
                                <h3 className="text-[2rem] font-bold tracking-tight text-[var(--text)]">
                                    {study.title}
                                </h3>
                                <p className="mt-1 font-mono text-[0.95rem] uppercase tracking-[0.16em] text-[var(--text-faint)]">
                                    {study.note}
                                </p>
                            </div>
                            <span className="serif text-[2.1rem] italic text-[var(--accent-text)]">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        </figcaption>
                    </motion.figure>
                ))}
            </div>
        </Container>
    </section>
);

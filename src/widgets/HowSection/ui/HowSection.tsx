'use client';

import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';

const steps = [
    {
        number: '01',
        title: 'Upload',
        eyebrow: 'Source',
        text: 'Add a page, chapter or vertical webtoon. MangaShift accepts the artwork as it is.',
    },
    {
        number: '02',
        title: 'Understand',
        eyebrow: 'Vision',
        text: 'The pipeline finds panels, reading direction, speech bubbles and scene changes.',
    },
    {
        number: '03',
        title: 'Direct',
        eyebrow: 'Voice + motion',
        text: 'Dialogue gets a cast, narration gets timing, and each panel receives a camera move.',
    },
    {
        number: '04',
        title: 'Render',
        eyebrow: 'Output',
        text: 'Video, audio and subtitles are composed into a finished file ready to publish.',
    },
] as const;

export const HowSection = () => (
    <section id="how" className="section-shell border-y border-[var(--line)] bg-[var(--surface)]">
        <Container>
            <div className="editorial-rule" data-index="III." data-page="003 / 006">
                <span>How it works</span>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
                <motion.div
                    className="lg:col-span-7"
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-kicker">One clear pipeline</p>
                    <h2 className="display mt-7 max-w-[12ch] text-[clamp(4rem,5.8vw,7rem)]">
                        From silent page to narrated{' '}
                        <em className="text-[var(--accent-text)]">scene</em>.
                    </h2>
                </motion.div>
                <motion.p
                    className="max-w-[46ch] text-[1.65rem] leading-[1.7] text-[var(--text-muted)] lg:col-span-5 lg:justify-self-end"
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    Four stages replace the usual editing timeline. You keep control of the source;
                    MangaShift handles the repetitive production work.
                </motion.p>
            </div>

            <ol className="mt-16 grid border-l border-t border-[var(--line-strong)] sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => (
                    <motion.li
                        key={step.number}
                        className="group relative min-h-[31rem] border-b border-r border-[var(--line-strong)] p-7 transition-colors duration-300 hover:bg-[var(--bg)] md:p-8"
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.58, delay: index * 0.08 }}
                    >
                        <div className="flex items-start justify-between">
                            <span className="serif text-[5.2rem] italic leading-none text-[var(--accent-text)]">
                                {step.number}
                            </span>
                            <span className="font-mono text-[1rem] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                                {step.eyebrow}
                            </span>
                        </div>
                        <div className="mt-24">
                            <h3 className="text-[2.4rem] font-bold tracking-tight text-[var(--text)]">
                                {step.title}
                            </h3>
                            <p className="mt-4 text-[1.45rem] leading-[1.65] text-[var(--text-muted)]">
                                {step.text}
                            </p>
                        </div>
                        <span
                            aria-hidden="true"
                            className="absolute bottom-7 right-7 text-[2rem] text-[var(--line-strong)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent-text)]"
                        >
                            →
                        </span>
                    </motion.li>
                ))}
            </ol>
        </Container>
    </section>
);

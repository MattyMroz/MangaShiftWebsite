'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { cn } from '@/shared/lib/utils/cn';

const questions = [
    {
        question: 'What does MangaShift create?',
        answer: 'A narrated video built from your manga or manhwa pages. The pipeline detects panel order, prepares the script, adds voices and motion, then renders the result.',
    },
    {
        question: 'Does it redraw or replace the artwork?',
        answer: 'No. The current direction keeps the supplied page as the visual source. MangaShift adds framing, timing, narration, audio and subtitles around it.',
    },
    {
        question: 'Is the beta free?',
        answer: 'Yes. The private beta is free while the workflow and output quality are being tested with early users.',
    },
    {
        question: 'Which languages will be available?',
        answer: 'English is the first interface and narration target. Polish is prepared as the next site language, with additional narration languages planned after the core pipeline is stable.',
    },
    {
        question: 'When will I get access?',
        answer: 'Invites will be sent in small waves. Joining the list is the best way to receive an access email when a new beta cohort opens.',
    },
    {
        question: 'What kind of pages work best?',
        answer: 'Clear, legible scans of manga or vertical manhwa. The pipeline reads panel layout and speech bubbles, so high-resolution pages with readable lettering give the most reliable framing and narration.',
    },
    {
        question: 'How does it handle right-to-left reading?',
        answer: 'Reading direction is detected per title. Traditional manga is followed right-to-left and top-to-bottom, while vertical manhwa is read as a continuous scroll, so the camera moves in the order a human reader would.',
    },
    {
        question: 'Where do the voices come from?',
        answer: 'Narration and dialogue use text-to-speech tuned to scene context. The goal is a consistent cast and pacing that supports the page, not a literal read-out of every line.',
    },
    {
        question: 'Can I edit the result?',
        answer: 'The beta returns a finished video rather than an editing timeline. Control over framing, voices and timing is expanding as the pipeline matures; early users help decide which controls land first.',
    },
    {
        question: 'What formats does it export?',
        answer: 'A standard video file in horizontal or vertical aspect, with synchronized subtitles. The same chapter can be rendered for a widescreen player or a vertical short.',
    },
    {
        question: 'Do I keep the rights to my work?',
        answer: 'Yes. You only grant what is needed to process the pages you upload and generate your video. MangaShift does not claim ownership of your artwork or the rendered output.',
    },
] as const;

export const FaqSection = () => {
    const [open, setOpen] = useState(0);

    return (
        <section id="faq" className="section-shell">
            <Container>
                <div className="editorial-rule" data-index="VIII." data-page="008 / 008">
                    <span>Frequently asked</span>
                </div>

                <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-start">
                    <motion.div
                        className="lg:col-span-4 lg:sticky lg:top-28"
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="section-kicker">Before you join</p>
                        <h2 className="display mt-7 max-w-[9ch] text-[clamp(4rem,5.6vw,6.8rem)]">
                            A few clear{' '}
                            <em className="text-[var(--accent-text)]">answers</em>.
                        </h2>
                        <p className="mt-7 max-w-[42ch] text-[1.6rem] leading-[1.7] text-[var(--text-muted)]">
                            MangaShift is still in active development. These answers describe the
                            beta direction without pretending unfinished parts are already final.
                        </p>
                        <div className="mt-12 flex items-end gap-5 border-t border-[var(--line-strong)] pt-6">
                            <span className="serif text-[clamp(6rem,7vw,9rem)] italic leading-[0.8] text-[var(--accent-text)]">
                                {String(questions.length).padStart(2, '0')}
                            </span>
                            <span className="pb-2 font-mono text-[1rem] uppercase leading-[1.5] tracking-[0.18em] text-[var(--text-faint)]">
                                questions
                                <br />
                                answered
                            </span>
                        </div>
                    </motion.div>

                    <div className="border-t border-[var(--line-strong)] lg:col-span-8">
                        {questions.map((item, index) => {
                            const isOpen = open === index;
                            return (
                                <div key={item.question} className="border-b border-[var(--line)]">
                                    <h3>
                                        <button
                                            type="button"
                                            onClick={() => setOpen(isOpen ? -1 : index)}
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-answer-${index}`}
                                            className="group grid w-full grid-cols-[3.2rem_minmax(0,1fr)_4.4rem] items-center gap-4 py-6 text-left sm:grid-cols-[4rem_minmax(0,1fr)_4.8rem] sm:gap-5"
                                        >
                                            <span className="font-mono text-[1rem] tracking-[0.18em] text-[var(--accent-text)]">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="min-w-0 text-[clamp(1.6rem,1.9vw,2.1rem)] font-semibold leading-tight text-[var(--text)]">
                                                {item.question}
                                            </span>
                                            <span
                                                className={cn(
                                                    'relative grid h-10 w-10 place-self-center rounded-full border border-[var(--line-strong)] text-[var(--accent-text)] transition-[color,background-color,border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--accent)] sm:h-11 sm:w-11',
                                                    isOpen && 'border-[var(--accent)] bg-[var(--accent)] text-white',
                                                )}
                                                aria-hidden="true"
                                            >
                                                <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                                                <span
                                                    className={cn(
                                                        'absolute left-1/2 top-1/2 h-4 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-300',
                                                        isOpen && 'scale-y-0',
                                                    )}
                                                />
                                            </span>
                                        </button>
                                    </h3>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                id={`faq-answer-${index}`}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.24 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-[3.2rem_minmax(0,1fr)_4.4rem] gap-4 pb-7 sm:grid-cols-[4rem_minmax(0,1fr)_4.8rem] sm:gap-5">
                                                    <p className="col-start-2 max-w-[62ch] text-[1.5rem] leading-[1.7] text-[var(--text-muted)]">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};

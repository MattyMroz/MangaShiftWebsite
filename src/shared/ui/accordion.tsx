'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

export interface AccordionItem {
    question: string;
    answer: string;
}

interface AccordionProps {
    items: readonly AccordionItem[];

    openIndex: number;
    onToggle: (index: number) => void;

    idPrefix?: string;
    className?: string;
}

const cols = 'grid-cols-[3.2rem_minmax(0,1fr)_4.4rem] gap-4 sm:grid-cols-[4rem_minmax(0,1fr)_4.8rem] sm:gap-5';

export const Accordion = ({ items, openIndex, onToggle, idPrefix = 'accordion', className }: AccordionProps) => (
    <div className={cn('border-t border-[var(--line-strong)]', className)}>
        {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
                <div key={item.question} className="border-b border-[var(--line)]">
                    <h3>
                        <button
                            type="button"
                            onClick={() => onToggle(isOpen ? -1 : index)}
                            aria-expanded={isOpen}
                            aria-controls={`${idPrefix}-answer-${index}`}
                            className={cn('group grid w-full items-center py-6 text-left', cols)}
                        >
                            <span className="font-mono text-[1rem] tracking-[0.18em] text-[var(--accent-text)]">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="min-w-0 text-[clamp(1.6rem,1.9vw,2.1rem)] font-semibold leading-tight text-[var(--text)]">
                                {item.question}
                            </span>
                            <span
                                className={cn(
                                    'grid h-10 w-10 shrink-0 place-self-center place-items-center rounded-full border transition-colors duration-300 sm:h-11 sm:w-11',
                                    isOpen
                                        ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                                        : 'border-[var(--line-strong)] text-[var(--accent-text)] group-hover:border-[var(--accent)]',
                                )}
                                aria-hidden="true"
                            >
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <line
                                        x1="12"
                                        y1="5"
                                        x2="12"
                                        y2="19"
                                        className="origin-center transition-transform duration-300"
                                        style={{ transform: `scaleY(${isOpen ? 0 : 1})` }}
                                    />
                                </svg>
                            </span>
                        </button>
                    </h3>

                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                                id={`${idPrefix}-answer-${index}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.24 }}
                                className="overflow-hidden"
                            >
                                <div className={cn('grid pb-7', cols)}>
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
);

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader';
import { dict, t } from '@/shared/i18n';

export const FAQSection = () => {
    const items = dict().faq.items;
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section
            id="faq"
            className="relative py-[10rem] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            <div className="relative z-10 max-w-[88rem] mx-auto">
                <SectionHeader eyebrow={t('faq.eyebrow')} title={t('faq.title')} />

                <div className="mt-16 border-t border-[var(--line)]">
                    {items.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={i} className="border-b border-[var(--line)]">
                                <button
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between gap-6 py-8 text-left cursor-pointer group"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-[length:var(--h3-font-size)] font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors">
                                        {item.q}
                                    </span>
                                    <motion.span
                                        animate={{ rotate: isOpen ? 45 : 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="shrink-0 text-[2.4rem] leading-none text-[var(--accent)]"
                                    >
                                        +
                                    </motion.span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-8 max-w-[60ch] text-[length:var(--normal-font-size)] leading-relaxed text-[var(--text-muted)]">
                                                {item.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader';
import { dict, t } from '@/shared/i18n';

export const HowSection = () => {
    const steps = dict().how.steps;

    return (
        <section
            id="how"
            className="relative py-[10rem] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            <div className="relative z-10 max-w-[120rem] mx-auto">
                <SectionHeader eyebrow={t('how.eyebrow')} title={t('how.title')} />

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] rounded-2xl overflow-hidden">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.n}
                            className="bg-[var(--bg-alpha)] backdrop-blur-sm p-10 flex flex-col gap-4"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                        >
                            <span className="serif text-[3.2rem] leading-none text-[var(--accent-text)]">{step.n}</span>
                            <h3 className="text-[length:var(--h3-font-size)] font-bold text-[var(--text)]">{step.title}</h3>
                            <p className="text-[length:var(--normal-font-size)] leading-relaxed text-[var(--text-muted)]">{step.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

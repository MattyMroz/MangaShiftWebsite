'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader';
import { dict, t } from '@/shared/i18n';

export const FeaturesSection = () => {
    const items = dict().features.items;

    return (
        <section
            id="features"
            className="relative py-[10rem] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            <div className="relative z-10 max-w-[120rem] mx-auto">
                <SectionHeader eyebrow={t('features.eyebrow')} title={t('features.title')} />

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-x-24 lg:gap-y-16">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.n}
                            className="flex gap-6 border-t border-[var(--line)] pt-8"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                        >
                            <span className="serif text-[2.4rem] leading-none text-[var(--text-faint)] shrink-0">{item.n}</span>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[length:var(--h2-font-size)] font-bold text-[var(--text)]">{item.title}</h3>
                                <p className="text-[length:var(--normal-font-size)] leading-relaxed text-[var(--text-muted)]">{item.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

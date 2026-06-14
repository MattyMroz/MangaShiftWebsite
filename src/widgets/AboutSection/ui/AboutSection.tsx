'use client';

import { motion } from 'framer-motion';
import { t } from '@/shared/i18n';

export const AboutSection = () => (
    <section
        id="about"
        className="relative py-[12rem] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
    >
        <div className="relative z-10 max-w-[120rem] mx-auto">
            <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[var(--accent)]" />
                <span className="eyebrow">{t('about.eyebrow')}</span>
            </div>

            <motion.h2
                className="mt-8 max-w-[16ch] text-[clamp(3.5rem,6vw,7rem)] font-extrabold text-[var(--text)] tracking-tight leading-[1.04]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
            >
                {t('about.title')}
            </motion.h2>

            <motion.p
                className="mt-10 max-w-[56ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.15 }}
            >
                {t('about.lead')}
            </motion.p>
        </div>
    </section>
);

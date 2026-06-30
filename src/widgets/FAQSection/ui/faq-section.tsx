'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/container';
import { EditorialRule } from '@/shared/ui/EditorialRule/editorial-rule';
import { SideLabel } from '@/shared/ui/SideLabel/side-label';
import { MetaLabel } from '@/shared/ui/MetaLabel/meta-label';
import { Accordion } from '@/shared/ui/Accordion/accordion';
import { t } from '@/shared/i18n';

const QUESTION_COUNT = 11;

const questions = Array.from({ length: QUESTION_COUNT }, (_, i) => ({
    question: t(`faq.items.${i}.question`),
    answer: t(`faq.items.${i}.answer`),
}));

export const FaqSection = () => {
    const [open, setOpen] = useState(0);

    return (
        <section id="faq" className="section-shell relative">
            <SideLabel side="left">Nº 08 — Frequently asked</SideLabel>
            <Container>
                <EditorialRule index="VIII." page="008 / 008">Frequently asked</EditorialRule>

                <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-start">
                    <motion.div
                        className="lg:col-span-4 lg:sticky lg:top-28"
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <MetaLabel>{t('faq.eyebrow')}</MetaLabel>
                        <h2 className="display mt-7 max-w-[9ch] text-[clamp(4rem,5.6vw,6.8rem)]">
                            {t('faq.title')}{' '}
                            <em className="text-[var(--accent-text)]">{t('faq.titleEmphasis')}</em>.
                        </h2>
                        <p className="mt-7 max-w-[42ch] text-[1.6rem] leading-[1.7] text-[var(--text-muted)]">
                            {t('faq.lead')}
                        </p>
                        <div className="mt-12 flex items-end gap-5 border-t border-[var(--line-strong)] pt-6">
                            <span className="serif text-[clamp(6rem,7vw,9rem)] italic leading-[0.8] text-[var(--accent-text)]">
                                {String(questions.length).padStart(2, '0')}
                            </span>
                            <span className="pb-2 font-mono text-[1rem] uppercase leading-[1.5] tracking-[0.18em] text-[var(--text-faint)]">
                                {t('faq.questionsLabel')}
                                <br />
                                {t('faq.answeredLabel')}
                            </span>
                        </div>
                    </motion.div>

                    <Accordion
                        className="lg:col-span-8"
                        items={questions}
                        openIndex={open}
                        onToggle={setOpen}
                        idPrefix="faq"
                    />
                </div>
            </Container>
        </section>
    );
};

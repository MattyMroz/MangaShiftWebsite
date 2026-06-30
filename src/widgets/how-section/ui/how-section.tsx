'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/container';
import { FloatingLabel } from '@/shared/ui/floating-label';
import { EditorialRule } from '@/shared/ui/editorial-rule';
import { SideLabel } from '@/shared/ui/side-label';
import { MetaLabel } from '@/shared/ui/meta-label';
import { assetPath } from '@/shared/lib/utils/asset-path';
import { t } from '@/shared/i18n';

const steps = [
    { number: '01', image: assetPath('/images/inspiration/method-1.png') },
    { number: '02', image: assetPath('/images/inspiration/method-2.png') },
    { number: '03', image: assetPath('/images/inspiration/method-3.png') },
    { number: '04', image: assetPath('/images/inspiration/method-4.png') },
] as const;

export const HowSection = () => (
    <section id="how" className="section-shell relative border-y border-[var(--line)] bg-[var(--surface)]">
        <SideLabel side="right">Nº 03 — One pipeline</SideLabel>
        <Container>
            <EditorialRule index="III." page="003 / 008">How it works</EditorialRule>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
                <motion.div
                    className="lg:col-span-7"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <MetaLabel>{t('how.eyebrow')}</MetaLabel>
                    <h2 className="display mt-7 max-w-[12ch] text-[clamp(4rem,5.8vw,7rem)]">
                        {t('how.title')}{' '}
                        <em className="text-[var(--accent-text)]">{t('how.titleEmphasis')}</em>.
                    </h2>
                </motion.div>
                <motion.p
                    className="max-w-[46ch] text-[1.65rem] leading-[1.7] text-[var(--text-muted)] lg:col-span-5 lg:justify-self-end"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    {t('how.lead')}
                </motion.p>
            </div>

            <ol className="relative mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <span
                    aria-hidden="true"
                    className="absolute left-[12.5%] right-[12.5%] top-0 hidden h-px bg-[var(--line-strong)] lg:block"
                />
                {steps.map((step, index) => (
                    <motion.li
                        key={step.number}
                        className="group relative overflow-hidden rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--bg)]"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -6 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.58, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative aspect-square overflow-hidden border-b border-[var(--line)]">
                            <Image
                                src={step.image}
                                alt=""
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                            />
                            <FloatingLabel className="left-4 top-4">
                                {t(`how.steps.${index}.eyebrow`)}
                            </FloatingLabel>
                        </div>

                        <div className="p-6">
                            <div className="flex items-baseline justify-between">
                                <span className="serif text-[3.6rem] italic leading-none text-[var(--accent-text)]">
                                    {step.number}
                                </span>
                                <span className="text-[1.8rem] text-[var(--line-strong)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent-text)]">
                                    →
                                </span>
                            </div>
                            <h3 className="mt-7 text-[2.3rem] font-bold tracking-tight text-[var(--text)]">
                                {t(`how.steps.${index}.title`)}
                            </h3>
                            <p className="mt-3 text-[1.4rem] leading-[1.65] text-[var(--text-muted)]">
                                {t(`how.steps.${index}.text`)}
                            </p>
                        </div>
                    </motion.li>
                ))}
            </ol>
        </Container>
    </section>
);

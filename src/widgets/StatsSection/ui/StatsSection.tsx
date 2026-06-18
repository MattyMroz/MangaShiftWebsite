'use client';

import { motion, type Variants } from 'framer-motion';
import { EditorialRule } from '@/shared/ui/EditorialRule/EditorialRule';
import { Button } from '@/shared/ui/Button/Button';
import { cn } from '@/shared/lib/utils/cn';
import { t } from '@/shared/i18n';

type Metric = {
    n: string;
    value: string;
    unit?: string;
};

const metrics: readonly Metric[] = [
    { n: '001', value: '100', unit: '+' },
    { n: '002', value: '15', unit: '+' },
    { n: '003', value: '1', unit: '-click' },
    { n: '004', value: '∞' },
] as const;

const reveal: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
};

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const viewport = { once: true, margin: '-80px' } as const;

export const StatsSection = () => (
    <section
        id="stats"
        aria-labelledby="stats-title"
        className="relative py-[clamp(10rem,16vw,13rem)] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
    >
        <div className="relative z-10 mx-auto max-w-[120rem]">
            <EditorialRule index="II." page="003 / 008">Metrics · By the numbers</EditorialRule>

            <div className="mt-[clamp(4rem,7vw,7rem)] grid grid-cols-1 gap-[clamp(3.5rem,6vw,6rem)] lg:grid-cols-12">

                <motion.div
                    className="lg:col-span-5 lg:pr-[clamp(2rem,4vw,5rem)]"
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    variants={stagger}
                >
                    <motion.div
                        className="flex items-center gap-4"
                        variants={reveal}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="h-px w-10 bg-[var(--accent)]" />
                        <span className="eyebrow">Nº 02 — Numbers</span>
                    </motion.div>

                    <motion.h2
                        id="stats-title"
                        className="mt-7 max-w-[14ch] text-[clamp(2.8rem,4.4vw,4.6rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--text)]"
                        variants={reveal}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {t('stats.title')}{' '}
                        <em className="serif font-normal text-[var(--accent-text)]">
                            {t('stats.titleEmphasis')}
                        </em>
                        {t('stats.titleAfter')}
                    </motion.h2>

                    <motion.p
                        className="mt-7 max-w-[42ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)]"
                        variants={reveal}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {t('stats.lead')}
                    </motion.p>

                    <motion.div
                        className="mt-12"
                        variants={reveal}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Button variant="outline" size="md">
                            {t('stats.joinBeta')}
                        </Button>
                    </motion.div>

                    <motion.div
                        className="mt-12 flex items-baseline gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)]"
                        variants={reveal}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="tabular-nums">35.6762° N · 139.6503° E</span>
                        <span className="h-px flex-1 bg-[var(--line)]" />
                        <span>MS/26</span>
                    </motion.div>
                </motion.div>

                <motion.dl
                    className="grid grid-cols-1 gap-px overflow-hidden border-t border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:col-span-7 lg:col-start-6"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                >
                    {metrics.map(({ n, value, unit }, i) => (
                        <motion.div
                            key={n}
                            variants={reveal}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className={cn(
                                'group relative flex flex-col bg-[var(--bg)] p-[clamp(2rem,2.6vw,2.8rem)] transition-colors duration-300 hover:bg-[var(--surface)]',
                                i >= 2 && 'sm:pt-[clamp(2.6rem,3.2vw,3.6rem)]',
                            )}
                        >
                            <div className="flex items-baseline justify-between">
                                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-faint)]">
                                    {n}
                                </span>
                                <span className="serif text-[1.3rem] italic leading-none text-[var(--accent-text)]">
                                    Nº
                                </span>
                            </div>

                            <dd className="mt-7 flex items-baseline gap-0.5">
                                <span className="display text-[clamp(3.4rem,6vw,5.4rem)] font-extrabold leading-[0.95] tracking-tight tabular-nums text-[var(--text)]">
                                    {value}
                                </span>
                                {unit && (
                                    <span className="serif text-[clamp(1.6rem,2.4vw,2.2rem)] leading-none text-[var(--accent-text)]">
                                        {unit}
                                    </span>
                                )}
                            </dd>

                            <div className="mt-6 flex items-center gap-3">
                                <span className="h-px w-8 bg-[var(--accent)] transition-all duration-300 group-hover:w-12" />
                                <dt className="text-[length:var(--normal-font-size)] font-bold leading-tight text-[var(--text)]">
                                    {t(`stats.metrics.${i}.label`)}
                                </dt>
                            </div>

                            <p className="mt-3 max-w-[34ch] text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                                {t(`stats.metrics.${i}.note`)}
                            </p>
                        </motion.div>
                    ))}
                </motion.dl>
            </div>
        </div>
    </section>
);

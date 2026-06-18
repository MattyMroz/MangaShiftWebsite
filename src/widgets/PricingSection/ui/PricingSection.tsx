'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { EditorialRule } from '@/shared/ui/EditorialRule/EditorialRule';
import { LiveDot } from '@/shared/ui/LiveDot/LiveDot';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';
import { cn } from '@/shared/lib/utils/cn';
import { t } from '@/shared/i18n';

type IconProps = { className?: string };

const CheckMark = ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="m4 12.5 5 5L20 6.5" />
    </svg>
);

const LockMark = ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="4.5" y="10" width="15" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
);

type Plan = {
    n: string;
    roman: string;
    price: string;
    featureCount: number;
    state: 'live' | 'soon';
    featured: boolean;
    coord: string;
};

const plans: readonly Plan[] = [
    {
        n: '01',
        roman: 'I.',
        price: '$0',
        featureCount: 5,
        state: 'live',
        featured: true,
        coord: 'TIER 01 · OPEN',
    },
    {
        n: '02',
        roman: 'II.',
        price: '$—',
        featureCount: 5,
        state: 'soon',
        featured: false,
        coord: 'TIER 02 · LOCKED',
    },
    {
        n: '03',
        roman: 'III.',
        price: '$—',
        featureCount: 5,
        state: 'soon',
        featured: false,
        coord: 'TIER 03 · LOCKED',
    },
] as const;

const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
} as const;

const reveal: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0 },
};

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const viewport = { once: true, margin: '-80px' } as const;

export const PricingSection = () => {
    const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && smoothScrollTo(href)) e.preventDefault();
    };

    return (
        <section
            id="pricing"
            aria-labelledby="pricing-title"
            className="relative py-[clamp(10rem,16vw,13rem)] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            <span
                aria-hidden
                className="absolute right-[var(--section-padding-x-mobile)] top-[clamp(10rem,16vw,13rem)] hidden rotate-180 font-mono text-[10.5px] uppercase tracking-[0.32em] text-[var(--text-faint)] [writing-mode:vertical-rl] lg:block"
            >
                MangaShift — Plans · Placeholder
            </span>

            <div className="relative z-10 mx-auto max-w-[120rem]">
                <EditorialRule index="VI." page="007 / 008">Pricing · Plans</EditorialRule>

                <div className="mt-[clamp(4rem,7vw,7rem)] grid grid-cols-1 items-start gap-[clamp(4rem,6vw,7rem)] lg:grid-cols-[0.85fr_1.15fr]">

                    <div className="lg:sticky lg:top-[12rem]">
                        <motion.div
                            className="flex items-center gap-4"
                            {...fadeUp}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="h-px w-10 bg-[var(--accent)]" />
                            <span className="eyebrow">Nº 007 — Plans</span>
                        </motion.div>

                        <motion.h2
                            id="pricing-title"
                            className="mt-6 max-w-[14ch] text-[clamp(3rem,4.6vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--text)]"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            {t('pricing.title')}{' '}
                            <em className="font-normal text-[var(--accent-text)]">{t('pricing.titleEmphasis')}</em>.
                        </motion.h2>

                        <motion.p
                            className="mt-6 max-w-[44ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)]"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.18 }}
                        >
                            {t('pricing.lead')}
                        </motion.p>

                        <motion.div
                            className="mt-10 max-w-[42ch] border-l-2 border-[var(--accent)] pl-5"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.26 }}
                        >
                            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                                {t('pricing.noteLabel')}
                            </span>
                            <p className="mt-3 text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                                {t('pricing.noteBefore')}{' '}
                                <em className="serif text-[var(--text)]">{t('pricing.noteEmphasis')}</em>{t('pricing.noteAfter')}
                            </p>
                        </motion.div>

                        <motion.div
                            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--line)] pt-5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]"
                            {...fadeUp}
                            transition={{ duration: 0.8, delay: 0.34 }}
                        >
                            <span><em className="serif not-italic text-[var(--accent-text)]">VI.</em> — Plans</span>
                            <span className="tabular-nums">3 tiers · 1 open</span>
                            <span className="tabular-nums">Rev. 0.1 — 2026</span>
                        </motion.div>
                    </div>

                    <motion.ul
                        className="grid grid-cols-1 gap-[clamp(1.4rem,2vw,2rem)] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                    >
                        {plans.map((plan, index) => {
                            const isLive = plan.state === 'live';
                            return (
                                <motion.li
                                    key={plan.n}
                                    variants={reveal}
                                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                    className={cn(
                                        'group relative flex flex-col rounded-[18px] border bg-[var(--surface)] p-[clamp(2rem,2.6vw,2.8rem)] transition-colors duration-300',
                                        plan.featured
                                            ? 'border-[var(--accent)] shadow-[var(--shadow-md)] sm:col-span-2 lg:col-span-1 xl:col-span-2'
                                            : 'border-[var(--line)] hover:border-[var(--line-strong)]',
                                    )}
                                >
                                    {plan.featured && (
                                        <span className="absolute -top-3 left-8 rounded-full border border-[var(--accent)] bg-[var(--bg)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                                            {t('pricing.openNow')}
                                        </span>
                                    )}

                                    <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
                                        <div className="flex items-baseline gap-3">
                                            <span className="serif text-[2.6rem] italic leading-none text-[var(--accent-text)]">
                                                {plan.roman}
                                            </span>
                                            <h3 className="text-[length:var(--h3-font-size)] font-bold leading-tight text-[var(--text)]">
                                                {t(`pricing.plans.${index}.name`)}
                                            </h3>
                                        </div>
                                        <span
                                            className={cn(
                                                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em]',
                                                isLive
                                                    ? 'border-[var(--accent)] text-[var(--accent-text)]'
                                                    : 'border-[var(--line)] text-[var(--text-faint)]',
                                            )}
                                        >
                                            {isLive ? (
                                                <LiveDot size="sm" />
                                            ) : (
                                                <LockMark className="h-3 w-3" />
                                            )}
                                            {isLive ? t('pricing.statusLive') : t('pricing.statusSoon')}
                                        </span>
                                    </div>

                                    <div className="mt-6 flex items-baseline gap-2">
                                        <span className="text-[clamp(3rem,4vw,4rem)] font-extrabold leading-none tracking-tight text-[var(--text)]">
                                            {plan.price}
                                        </span>
                                        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
                                            {t(`pricing.plans.${index}.cadence`)}
                                        </span>
                                    </div>
                                    {!isLive && (
                                        <span className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
                                            {t('pricing.placeholderNote')}
                                        </span>
                                    )}

                                    <p className="mt-4 text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                                        {t(`pricing.plans.${index}.tagline`)}
                                    </p>

                                    <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                                        {Array.from({ length: plan.featureCount }).map((_, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start gap-3">
                                                <span
                                                    className={cn(
                                                        'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                                                        isLive
                                                            ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
                                                            : 'border border-[var(--line-strong)] text-[var(--text-muted)]',
                                                    )}
                                                >
                                                    <CheckMark className="h-3 w-3" />
                                                </span>
                                                <span className="text-[length:var(--small-font-size)] leading-snug text-[var(--text-muted)]">
                                                    {t(`pricing.plans.${index}.features.${featureIndex}`)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-8 border-t border-[var(--line)] pt-6">
                                        {isLive ? (
                                            <Link href="#beta" onClick={handleScrollLink} className="contents">
                                                <Button variant="primary" size="pill" className="w-full">
                                                    {t(`pricing.plans.${index}.cta`)}
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="pill"
                                                disabled
                                                aria-disabled="true"
                                                className="w-full"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <LockMark className="h-4 w-4" />
                                                    {t(`pricing.plans.${index}.cta`)}
                                                </span>
                                            </Button>
                                        )}
                                    </div>

                                    <div className="mt-5 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                                        <span className="tabular-nums">Nº {plan.n}</span>
                                        <span>{plan.coord}</span>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                </div>
            </div>
        </section>
    );
};

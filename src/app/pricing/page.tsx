'use client';

import Link from 'next/link';
import { PageHero } from '@/shared/ui/PageHero/page-hero';
import { PageShell } from '@/shared/ui/PageShell/page-shell';
import { DraftNotice } from '@/shared/ui/DraftNotice/draft-notice';
import { Footer } from '@/widgets/Footer/ui/footer';
import { Button } from '@/shared/ui/lib/button';
import { t } from '@/shared/i18n';

const plans = [0, 1, 2] as const;

export default function PricingPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="P."
                    page={t('pages.pricing.page')}
                    rule={t('pages.pricing.rule')}
                    kicker={t('pages.pricing.kicker')}
                    titleBefore={t('pages.pricing.titleBefore')}
                    titleEmphasis={t('pages.pricing.titleEmphasis')}
                    titleAfter={t('pages.pricing.titleAfter')}
                    lead={t('pages.pricing.lead')}
                />

                <PageShell sideLabel={t('pages.pricing.sideLabel')}>
                    <DraftNotice>{t('pages.pricing.draftNote')}</DraftNotice>

                    <div className="mt-8 grid gap-4 lg:grid-cols-3">
                        {plans.map((index) => {
                            const featured = index === 1;
                            return (
                                <article
                                    key={index}
                                    className={
                                        featured
                                            ? 'on-dark relative overflow-hidden rounded-[2rem] bg-[var(--text)] p-8 text-[var(--bg)]'
                                            : 'relative overflow-hidden rounded-[2rem] border border-[var(--line-strong)] bg-[var(--surface)] p-8'
                                    }
                                >
                                    <h2 className="font-mono text-[1.1rem] uppercase tracking-[0.2em] text-[var(--accent-text)]">
                                        {t(`pages.pricing.plans.${index}.name`)}
                                    </h2>
                                    <p className="mt-6 flex items-baseline gap-2">
                                        <span className="text-[clamp(3.2rem,4vw,4.4rem)] font-extrabold tracking-tight">
                                            {t(`pages.pricing.plans.${index}.price`)}
                                        </span>
                                        <span className={featured ? 'text-[1.3rem] text-white/60' : 'text-[1.3rem] text-[var(--text-faint)]'}>
                                            {t(`pages.pricing.plans.${index}.period`)}
                                        </span>
                                    </p>
                                    <p className={featured ? 'mt-5 text-[1.4rem] leading-[1.65] text-white/70' : 'mt-5 text-[1.4rem] leading-[1.65] text-[var(--text-muted)]'}>
                                        {t(`pages.pricing.plans.${index}.desc`)}
                                    </p>
                                    <Button
                                        asChild
                                        variant={featured ? 'accent' : 'outline'}
                                        size="landing-pill"
                                        className="mt-8 w-full"
                                    >
                                        <Link href="/#beta">{t(`pages.pricing.plans.${index}.cta`)}</Link>
                                    </Button>
                                </article>
                            );
                        })}
                    </div>

                    <p className="mt-6 text-center text-[1.3rem] text-[var(--text-faint)]">
                        {t('pages.pricing.trialNote')}
                    </p>

                    <div className="mt-10 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
                        <h2 className="text-[1.8rem] font-bold tracking-tight text-[var(--text)]">
                            {t('pages.pricing.byokTitle')}
                        </h2>
                        <p className="mt-4 max-w-[64ch] text-[1.5rem] leading-[1.75] text-[var(--text-muted)]">
                            {t('pages.pricing.byok')}
                        </p>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}

import type { Metadata } from 'next';
import { PageHero } from '@/shared/ui/PageHero/PageHero';
import { PageShell } from '@/shared/ui/PageShell/PageShell';
import { Footer } from '@/widgets/Footer/ui/Footer';
import { t } from '@/shared/i18n';

export const metadata: Metadata = {
    title: 'Features',
    description: 'A local comic reader and AI toolkit: OCR, translation, text-to-speech, frame animation, export and BYOK — for material you own.',
};

const items = [0, 1, 2, 3, 4, 5] as const;

export default function FeaturesPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="F."
                    page={t('pages.features.page')}
                    rule={t('pages.features.rule')}
                    kicker={t('pages.features.kicker')}
                    titleBefore={t('pages.features.titleBefore')}
                    titleEmphasis={t('pages.features.titleEmphasis')}
                    titleAfter={t('pages.features.titleAfter')}
                    lead={t('pages.features.lead')}
                />

                <PageShell sideLabel={t('pages.features.sideLabel')}>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((index) => (
                            <article
                                key={index}
                                className="group relative overflow-hidden rounded-[2rem] border border-[var(--line-strong)] bg-[var(--surface)] p-7 transition-colors duration-500 hover:border-[var(--accent)]"
                            >
                                <span className="font-mono text-[1rem] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <h2 className="mt-5 text-[2rem] font-bold leading-tight tracking-tight text-[var(--text)]">
                                    {t(`pages.features.items.${index}.title`)}
                                </h2>
                                <p className="mt-4 text-[1.4rem] leading-[1.65] text-[var(--text-muted)]">
                                    {t(`pages.features.items.${index}.text`)}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
                        <h2 className="text-[1.8rem] font-bold tracking-tight text-[var(--text)]">
                            {t('pages.features.noteTitle')}
                        </h2>
                        <p className="mt-4 max-w-[64ch] text-[1.5rem] leading-[1.75] text-[var(--text-muted)]">
                            {t('pages.features.note')}
                        </p>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}

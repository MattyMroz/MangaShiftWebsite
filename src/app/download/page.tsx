import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/shared/ui/PageHero/PageHero';
import { PageShell } from '@/shared/ui/PageShell/PageShell';
import { Footer } from '@/widgets/Footer/ui/Footer';
import { Button } from '@/shared/ui/lib/Button';
import { t } from '@/shared/i18n';

export const metadata: Metadata = {
    title: 'Download',
    description: 'Download MangaShift for Windows via GitHub Releases. Requirements and version details inside.',
};

const requirements = [0, 1, 2, 3] as const;

export default function DownloadPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="D."
                    page={t('pages.download.page')}
                    rule={t('pages.download.rule')}
                    kicker={t('pages.download.kicker')}
                    titleBefore={t('pages.download.titleBefore')}
                    titleEmphasis={t('pages.download.titleEmphasis')}
                    titleAfter={t('pages.download.titleAfter')}
                    lead={t('pages.download.lead')}
                />

                <PageShell sideLabel={t('pages.download.sideLabel')}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Button asChild variant="accent" size="landing-pill">
                            <a href="https://github.com/MattyMroz" target="_blank" rel="noreferrer">
                                {t('pages.download.ctaPrimary')}
                                <Download aria-hidden="true" />
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="landing-pill">
                            <Link href="/#beta">
                                {t('pages.download.ctaSecondary')}
                                <ArrowUpRight aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>

                    <p className="mt-6 max-w-[60ch] text-[1.4rem] leading-[1.7] text-[var(--text-muted)]">
                        {t('pages.download.availability')}
                    </p>

                    <div className="mt-12 rounded-[2rem] border border-[var(--line-strong)] bg-[var(--surface)] p-8 md:p-10">
                        <h2 className="font-mono text-[1.1rem] uppercase tracking-[0.2em] text-[var(--accent-text)]">
                            {t('pages.download.reqTitle')}
                        </h2>
                        <dl className="mt-6 border-t border-[var(--line)]">
                            {requirements.map((index) => (
                                <div
                                    key={index}
                                    className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] py-4"
                                >
                                    <dt className="font-mono text-[1rem] uppercase tracking-[0.15em] text-[var(--text-faint)]">
                                        {t(`pages.download.requirements.${index}.label`)}
                                    </dt>
                                    <dd className="text-right text-[1.45rem] text-[var(--text)]">
                                        {t(`pages.download.requirements.${index}.value`)}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="mt-10 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
                        <h2 className="text-[1.8rem] font-bold tracking-tight text-[var(--text)]">
                            {t('pages.download.noteTitle')}
                        </h2>
                        <p className="mt-4 max-w-[64ch] text-[1.5rem] leading-[1.75] text-[var(--text-muted)]">
                            {t('pages.download.note')}
                        </p>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}

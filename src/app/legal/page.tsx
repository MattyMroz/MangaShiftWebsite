import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/shared/ui/page-hero';
import { PageShell } from '@/shared/ui/page-shell';
import { DraftNotice } from '@/shared/ui/draft-notice';
import { Footer } from '@/widgets/footer/ui/footer';
import { t } from '@/shared/i18n';

export const metadata: Metadata = {
    title: 'Legal',
    description: 'MangaShift legal documents — terms, privacy, cookies, refunds, IP and third-party notices.',
};

const links = [0, 1, 2, 3, 4, 5] as const;

export default function LegalHubPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="L."
                    page={t('pages.legalHub.page')}
                    rule={t('pages.legalHub.rule')}
                    kicker={t('pages.legalHub.kicker')}
                    titleBefore={t('pages.legalHub.titleBefore')}
                    titleEmphasis={t('pages.legalHub.titleEmphasis')}
                    titleAfter={t('pages.legalHub.titleAfter')}
                    lead={t('pages.legalHub.lead')}
                />

                <PageShell sideLabel={t('pages.legalHub.sideLabel')}>
                    <DraftNotice>{t('pages.legalHub.draftNote')}</DraftNotice>

                    <ul className="mt-8 grid gap-4 sm:grid-cols-2 list-none">
                        {links.map((index) => (
                            <li key={index}>
                                <Link
                                    href={t(`pages.legalHub.links.${index}.href`)}
                                    className="group flex items-center justify-between gap-4 rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--surface)] p-7 transition-colors duration-300 hover:border-[var(--accent)]"
                                >
                                    <span>
                                        <span className="block text-[1.9rem] font-semibold tracking-tight text-[var(--text)]">
                                            {t(`pages.legalHub.links.${index}.title`)}
                                        </span>
                                        <span className="mt-1 block text-[1.3rem] text-[var(--text-muted)]">
                                            {t(`pages.legalHub.links.${index}.desc`)}
                                        </span>
                                    </span>
                                    <ArrowUpRight
                                        aria-hidden="true"
                                        className="h-6 w-6 shrink-0 text-[var(--accent-text)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}

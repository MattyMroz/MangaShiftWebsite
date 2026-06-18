'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { IconCircle } from '@/shared/ui/IconCircle/IconCircle';
import { LiveDot } from '@/shared/ui/LiveDot/LiveDot';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';
import { t } from '@/shared/i18n';

const exploreLinks = [
    '#about',
    '#how',
    '#features',
    '#usecases',
    '#gallery',
    '#demo',
    '#faq',
    '#beta',
] as const;

const productNotes = [0, 1, 2] as const;

export const Footer = () => {
    const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const href = event.currentTarget.getAttribute('href');
        if (href && smoothScrollTo(href)) event.preventDefault();
    };

    return (
        <footer className="on-dark relative overflow-hidden border-t border-white/15 bg-[#171715] text-[#f3efe6]">
            <SideLabel side="left" tone="dark">MangaShift — Private beta 2026</SideLabel>
            <Container className="pt-[clamp(7rem,9vw,12rem)]">
                <div className="grid gap-12 border-b border-white/15 pb-[clamp(6rem,8vw,10rem)] lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-8">
                        <p className="flex items-center gap-4 font-mono text-[1rem] uppercase tracking-[0.2em] text-[var(--accent)]">
                            <span className="h-px w-10 bg-current" />
                            {t('footer.eyebrow')}
                        </p>
                        <h2 className="mt-7 max-w-[11ch] text-[clamp(4.4rem,6.5vw,8.8rem)] font-extrabold leading-[0.96] tracking-[-0.05em]">
                            {t('footer.headingPre')}{' '}
                            <em className="font-normal text-[var(--accent)]">{t('footer.headingEmphasis')}</em>{t('footer.headingPost')}
                        </h2>
                    </div>

                    <div className="lg:col-span-4 lg:pb-2">
                        <div className="mb-7 flex items-center gap-4 font-mono text-[0.92rem] uppercase tracking-[0.2em] text-white/35">
                            <span>{t('footer.metaEst')}</span>
                            <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
                            <span>{t('footer.metaCity')}</span>
                        </div>
                        <p className="max-w-[42ch] text-[1.55rem] leading-[1.75] text-white/58">
                            {t('footer.intro')}
                        </p>
                        <Link
                            href="#beta"
                            onClick={scrollTo}
                            className="group mt-7 inline-flex items-center gap-4 text-[1.45rem] font-semibold text-white"
                        >
                            {t('footer.joinBeta')}
                            <IconCircle as="span" className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                                ↗
                            </IconCircle>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-12 py-[clamp(5rem,7vw,8rem)] sm:grid-cols-2 lg:grid-cols-12">
                    <div className="sm:col-span-2 lg:col-span-4">
                        <Link
                            href="#home"
                            onClick={scrollTo}
                            className="text-[clamp(3rem,3vw,4.2rem)] font-black tracking-[-0.045em]"
                        >
                            MangaShift<span className="text-[var(--accent)]">.</span>
                        </Link>
                        <p className="mt-5 max-w-[34ch] text-[1.5rem] leading-[1.75] text-white/55">
                            {t('footer.brandTagline')}
                        </p>
                        <div className="mt-8 flex items-center gap-3 font-mono text-[0.95rem] uppercase tracking-[0.18em] text-white/35">
                            <LiveDot variant="pulse" className="h-2 w-2" />
                            {t('footer.buildingNote')}
                        </div>
                    </div>

                    <nav aria-label="Footer navigation" className="lg:col-span-3">
                        <p className="font-mono text-[1rem] uppercase tracking-[0.2em] text-white/35">
                            {t('footer.sections.explore')}
                        </p>
                        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
                            {exploreLinks.map((href, index) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        onClick={scrollTo}
                                        className="text-[1.4rem] text-white/60 transition-colors duration-200 hover:text-white"
                                    >
                                        {t(`footer.exploreLinks.${index}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="lg:col-span-3">
                        <p className="font-mono text-[1rem] uppercase tracking-[0.2em] text-white/35">
                            {t('footer.sections.product')}
                        </p>
                        <dl className="mt-6 border-t border-white/12">
                            {productNotes.map((index) => (
                                <div
                                    key={index}
                                    className="flex items-baseline justify-between gap-4 border-b border-white/12 py-3"
                                >
                                    <dt className="font-mono text-[0.9rem] uppercase tracking-[0.15em] text-white/32">
                                        {t(`footer.productNotes.${index}.label`)}
                                    </dt>
                                    <dd className="text-right text-[1.3rem] text-white/65">{t(`footer.productNotes.${index}.value`)}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="lg:col-span-2">
                        <p className="font-mono text-[1rem] uppercase tracking-[0.2em] text-white/35">
                            {t('footer.sections.connect')}
                        </p>
                        <div className="mt-6 flex flex-col items-start gap-3">
                            <a
                                href="https://github.com/MattyMroz"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[1.4rem] text-white/60 transition-colors hover:text-white"
                            >
                                {t('footer.connect.github')} <span aria-hidden="true">↗</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mattymroz/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[1.4rem] text-white/60 transition-colors hover:text-white"
                            >
                                {t('footer.connect.linkedin')} <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-y border-white/15 py-5 font-mono text-[0.95rem] uppercase tracking-[0.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
                    <span>{`© ${new Date().getFullYear()} MangaShift`}</span>
                    <span>{t('footer.location')}</span>
                </div>

                <motion.div
                    className="px-2 pb-[clamp(4rem,5vw,7rem)] pt-[clamp(4rem,6vw,7rem)]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link
                        href="#home"
                        onClick={scrollTo}
                        aria-label="Back to the top"
                        className="group block text-center text-[clamp(6.8rem,13.2vw,18rem)] font-black leading-[0.88] tracking-[-0.07em] text-[#f3efe6]"
                    >
                        MangaShift
                        <span className="inline-block text-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[0.12em] group-hover:scale-110">
                            .
                        </span>
                    </Link>
                </motion.div>
            </Container>
        </footer>
    );
};

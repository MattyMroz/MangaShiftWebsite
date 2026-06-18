'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/shared/ui/lib/Button';
import { Container } from '@/shared/ui/Container/Container';
import { EditorialRule } from '@/shared/ui/EditorialRule/EditorialRule';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';
import { SlidingTabs, SlidingTabsList, SlidingTabsTrigger } from '@/shared/ui/lib/SlidingTabs';
import { MetaLabel } from '@/shared/ui/MetaLabel/MetaLabel';
import { FloatingLabel } from '@/shared/ui/FloatingLabel/FloatingLabel';
import { assetPath } from '@/shared/lib/utils/assetPath';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';
import { t } from '@/shared/i18n';

const modes = [
    { id: 'readers', image: assetPath('/images/inspiration/work-1.png'), noteCount: 3 },
    { id: 'creators', image: assetPath('/images/inspiration/work-2.png'), noteCount: 3 },
    { id: 'publishers', image: assetPath('/images/inspiration/testimonial.png'), noteCount: 3 },
] as const;

export const UseCasesSection = () => {
    const [activeId, setActiveId] = useState<(typeof modes)[number]['id']>('readers');
    const activeIndex = Math.max(0, modes.findIndex((mode) => mode.id === activeId));
    const active = modes[activeIndex];

    const scrollToBeta = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (smoothScrollTo('#beta')) event.preventDefault();
    };

    return (
        <section id="usecases" className="section-shell relative border-y border-[var(--line)] bg-[var(--surface)]">
            <SideLabel side="right">Nº 05 — Who it is for</SideLabel>
            <Container>
                <EditorialRule index="V." page="005 / 008">Who it is for</EditorialRule>

                <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <MetaLabel>{t('usecases.metaLabel')}</MetaLabel>
                        <h2 className="display mt-7 max-w-[12ch] text-[clamp(4rem,5.8vw,7rem)]">
                            {t('usecases.headingBefore')}{' '}
                            <em className="text-[var(--accent-text)]">{t('usecases.headingEm')}</em>{' '}
                            {t('usecases.headingAfter')}
                        </h2>
                    </motion.div>
                    <p className="max-w-[43ch] text-[1.6rem] leading-[1.7] text-[var(--text-muted)] lg:col-span-5 lg:justify-self-end">
                        {t('usecases.intro')}
                    </p>
                </div>

                <div className="mt-14 rounded-[2.4rem] border border-[var(--line-strong)] bg-[var(--bg)] p-3 shadow-[var(--shadow-md)] md:p-5">
                    <SlidingTabs
                        value={active.id}
                        onValueChange={(id) => setActiveId(id as (typeof modes)[number]['id'])}
                        className="block"
                    >
                        <SlidingTabsList
                            aria-label="MangaShift audiences"
                            className="!grid !h-auto !w-full gap-1 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-1.5 sm:grid-cols-3 sm:rounded-full"
                            hoverBg="var(--surface-2)"
                            activeBg="var(--text)"
                            activeBorder="1px solid transparent"
                            activeGlow={false}
                            hoverPillClassName="rounded-full"
                            activePillClassName="rounded-full"
                        >
                            {modes.map((mode, index) => (
                                <SlidingTabsTrigger
                                    key={mode.id}
                                    value={mode.id}
                                    className="min-h-12 rounded-full px-5 py-3 text-center font-mono text-[1.05rem] uppercase tracking-[0.18em] focus-visible:border-transparent focus-visible:ring-0 data-[state=active]:text-[var(--bg)]"
                                >
                                    {t(`usecases.modes.${index}.label`)}
                                </SlidingTabsTrigger>
                            ))}
                        </SlidingTabsList>
                    </SlidingTabs>

                    <div
                        id="usecase-panel"
                        role="tabpanel"
                        className="mt-3 grid overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface)] lg:h-[58rem] lg:grid-cols-12"
                    >
                        <div className="relative min-h-[38rem] overflow-hidden border-b border-[var(--line)] lg:col-span-7 lg:min-h-full lg:border-b-0 lg:border-r">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0, x: 24, scale: 0.985 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -18, scale: 0.985 }}
                                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Image
                                        src={active.image}
                                        alt=""
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 58vw"
                                        className="object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <div className="pointer-events-none absolute inset-5 rounded-[1.2rem] border border-[var(--text)]/25" />
                            <FloatingLabel position="tl" tone="accent" className="tracking-[0.18em]">
                                {t(`usecases.modes.${activeIndex}.code`)}
                            </FloatingLabel>
                            <div className="absolute bottom-8 right-8 flex items-end gap-3">
                                <div className="dot-grid h-12 w-16 opacity-40" />
                                <FloatingLabel position="br" tone="glass" className="static text-[0.85rem]">
                                    {t(`usecases.modes.${activeIndex}.label`)}
                                </FloatingLabel>
                            </div>
                        </div>

                        <div className="relative flex flex-col p-7 md:p-10 lg:col-span-5 lg:p-12">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    <p className="section-kicker">{t(`usecases.modes.${activeIndex}.eyebrow`)}</p>
                                    <h3 className="mt-7 max-w-[12ch] text-[clamp(3.2rem,4vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--text)]">
                                        {t(`usecases.modes.${activeIndex}.title`)}
                                    </h3>
                                    <p className="mt-6 max-w-[46ch] text-[1.55rem] leading-[1.72] text-[var(--text-muted)]">
                                        {t(`usecases.modes.${activeIndex}.text`)}
                                    </p>

                                    <ul className="mt-9 border-t border-[var(--line-strong)]">
                                        {Array.from({ length: active.noteCount }).map((_, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-4 border-b border-[var(--line)] py-4 text-[1.4rem] text-[var(--text)]"
                                            >
                                                <span className="font-mono text-[0.95rem] text-[var(--accent-text)]">
                                                    0{index + 1}
                                                </span>
                                                {t(`usecases.modes.${activeIndex}.notes.${index}`)}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>

                            <Button asChild variant="primary" size="landing-pill" className="mt-auto self-start">
                                <Link href="#beta" onClick={scrollToBeta}>
                                    {t('usecases.joinBeta')}
                                    <ArrowUpRight aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

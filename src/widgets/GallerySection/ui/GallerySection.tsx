'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { FloatingLabel } from '@/shared/ui/FloatingLabel/FloatingLabel';
import { EditorialRule } from '@/shared/ui/EditorialRule/EditorialRule';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';
import { MetaLabel } from '@/shared/ui/MetaLabel/MetaLabel';
import { assetPath } from '@/shared/lib/utils/assetPath';
import { t } from '@/shared/i18n';

const studies = [
    { image: assetPath('/images/inspiration/lab-1.png') },
    { image: assetPath('/images/inspiration/lab-2.png') },
    { image: assetPath('/images/inspiration/lab-3.png') },
    { image: assetPath('/images/inspiration/lab-4.png') },
    { image: assetPath('/images/inspiration/lab-5.png') },
] as const;

export const GallerySection = () => (
    <section id="gallery" className="section-shell relative">
        <SideLabel side="left">Nº 06 — Visual studies</SideLabel>
        <Container>
            <EditorialRule index="VI." page="006 / 008">Visual studies</EditorialRule>

            <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
                <motion.div
                    className="lg:col-span-8"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <MetaLabel>{t('gallery.metaLabel')}</MetaLabel>
                    <h2 className="display mt-7 max-w-[13ch] text-[clamp(4rem,5.8vw,7rem)]">
                        {t('gallery.headingBefore')}{' '}
                        <em className="text-[var(--accent-text)]">{t('gallery.headingEmphasis')}</em>{t('gallery.headingAfter')}
                    </h2>
                </motion.div>

                <p className="max-w-[42ch] text-[1.5rem] leading-[1.7] text-[var(--text-muted)] lg:col-span-4 lg:justify-self-end">
                    {t('gallery.paragraph')}
                </p>
            </div>

            <div className="mt-14 grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {studies.map((study, index) => (
                    <motion.figure
                        key={study.image}
                        className="group min-w-0"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.55, delay: index * 0.05 }}
                    >
                        <div className="paper-frame relative aspect-[4/5] p-1.5">
                            <div className="relative h-full overflow-hidden rounded-[1.6rem]">
                                <Image
                                    src={study.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                    className="scale-[1.18] object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.24]"
                                />
                            </div>
                            <FloatingLabel position="tr" size="sm" className="border border-[var(--line-strong)]">
                                {String(index + 1).padStart(2, '0')}
                            </FloatingLabel>
                        </div>
                        <figcaption className="mt-3 border-t border-[var(--line-strong)] pt-3">
                            <h3 className="text-[1.4rem] font-bold leading-tight tracking-tight text-[var(--text)]">
                                {t(`gallery.studies.${index}.title`)}
                            </h3>
                            <p className="mt-1 font-mono text-[0.82rem] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                                {t(`gallery.studies.${index}.note`)}
                            </p>
                        </figcaption>
                    </motion.figure>
                ))}
            </div>
        </Container>
    </section>
);

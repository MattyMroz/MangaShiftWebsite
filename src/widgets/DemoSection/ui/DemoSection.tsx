'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useReducedMotion, animate } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/ui/lib/Button';
import { Container } from '@/shared/ui/Container/Container';
import { FloatingLabel } from '@/shared/ui/FloatingLabel/FloatingLabel';
import { EditorialRule } from '@/shared/ui/EditorialRule/EditorialRule';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';
import { assetPath } from '@/shared/lib/utils/assetPath';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';
import { cn } from '@/shared/lib/utils/cn';
import { t } from '@/shared/i18n';

const cards = [
    { image: assetPath('/images/inspiration/method-1.png'), foot: '01' },
    { image: assetPath('/images/inspiration/method-2.png'), foot: '02' },
    { image: assetPath('/images/inspiration/method-3.png'), foot: '03' },
    { image: assetPath('/images/inspiration/method-4.png'), foot: '04' },
    { image: assetPath('/images/inspiration/lab-1.png'), foot: '05' },
] as const;

export const DemoSection = () => {
    const [active, setActive] = useState(2);
    const total = cards.length;
    const dragged = useRef(false);
    const dragX = useMotionValue(0);
    const reduce = useReducedMotion();
    const go = (dir: number) => setActive((prev) => (prev + dir + total) % total);

    const scrollToBeta = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (smoothScrollTo('#beta')) event.preventDefault();
    };

    return (
        <section id="demo" className="section-shell relative pt-4">
            <SideLabel side="left">Nº 07 — Demo output</SideLabel>
            <Container>
                <motion.div
                    data-scroll-target
                    className="on-dark relative overflow-y-clip rounded-[2.4rem] bg-[#121214] px-6 py-8 text-[#f1ede5] shadow-[var(--shadow-lg)] md:px-10 md:py-12 lg:px-14"
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[2.4rem]">
                        <span className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--accent)] opacity-15 blur-3xl" />
                    </span>

                    <EditorialRule index="VII." page="007 / 008" className="border-white/15 text-white/45">
                        Demo output
                    </EditorialRule>

                    <div className="relative mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-4">
                            <p className="section-kicker !text-[var(--accent)]">{t('demo.kicker')}</p>
                            <h2 className="mt-7 max-w-[10ch] text-[clamp(4rem,5vw,6.4rem)] font-extrabold leading-[0.96] tracking-[-0.045em]">
                                {t('demo.title')}{' '}
                                <em className="serif font-medium text-[var(--accent)]">{t('demo.titleEmphasis')}</em>.
                            </h2>
                            <p className="mt-7 max-w-[42ch] text-[1.55rem] leading-[1.7] text-white/60">
                                {t('demo.lead')}
                            </p>

                            <dl className="mt-9 grid grid-cols-3 border-y border-white/15 py-5">
                                {[0, 1, 2].map((i) => (
                                    <div key={i}>
                                        <dt className="font-mono text-[0.95rem] uppercase tracking-[0.18em] text-white/40">
                                            {t(`demo.stats.${i}.label`)}
                                        </dt>
                                        <dd className="mt-2 text-[1.4rem] font-medium text-white/85">{t(`demo.stats.${i}.value`)}</dd>
                                    </div>
                                ))}
                            </dl>

                            <Button asChild variant="accent" size="landing-pill" className="mt-9">
                                <Link href="#beta" onClick={scrollToBeta}>
                                    {t('demo.cta')}
                                    <ArrowUpRight aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>

                        <div className="relative lg:col-span-8">
                            <div className="relative aspect-video overflow-hidden rounded-[1.6rem] border border-white/15 bg-black">
                                <Image
                                    src={assetPath('/assets/demo/spare-me-great-lord.gif')}
                                    alt="Animated manga to video sample"
                                    fill
                                    unoptimized
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                                <FloatingLabel tone="dark" className="left-4 top-4 text-[0.95rem] tracking-[0.18em]">
                                    {t('demo.previewLabel')}
                                </FloatingLabel>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[1rem] uppercase tracking-[0.16em] text-white/35">
                                <span>{t('demo.sourceCaption')}</span>
                                <span className="text-[var(--accent)]">{t('demo.outputCaption')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-12 border-t border-white/12 pt-9">
                        <div className="flex items-end justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
                                <span className="font-mono text-[0.95rem] uppercase tracking-[0.18em] text-white/45">
                                    {t('demo.carouselLabel')}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon-lg"
                                    onClick={() => go(-1)}
                                    aria-label={t('demo.prevFrame')}
                                    className="rounded-full border-white/20 bg-transparent text-white/70 hover:border-white/50 hover:bg-white/10 hover:text-white"
                                >
                                    <ChevronLeft aria-hidden="true" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon-lg"
                                    onClick={() => go(1)}
                                    aria-label={t('demo.nextFrame')}
                                    className="rounded-full border-white/20 bg-transparent text-white/70 hover:border-white/50 hover:bg-white/10 hover:text-white"
                                >
                                    <ChevronRight aria-hidden="true" />
                                </Button>
                            </div>
                        </div>

                        <motion.div
                            className="relative mt-10 h-[34rem] cursor-grab select-none [perspective:2000px] active:cursor-grabbing md:h-[40rem]"
                            drag="x"
                            style={{ x: dragX }}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.25}
                            dragMomentum={false}
                            onDragStart={() => { dragged.current = true; }}
                            onDragEnd={(_, info) => {
                                const moved = info.offset.x < -50 || info.velocity.x < -400
                                    ? 1
                                    : info.offset.x > 50 || info.velocity.x > 400
                                        ? -1
                                        : 0;
                                animate(dragX, 0, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
                                if (moved) go(moved);
                                window.setTimeout(() => { dragged.current = false; }, 50);
                            }}
                        >
                            {cards.map(({ image, foot }, i) => {
                                const eyebrow = t(`demo.cards.${i}.eyebrow`);
                                const title = t(`demo.cards.${i}.title`);
                                const raw = i - active;
                                const offset = ((raw + total + Math.floor(total / 2)) % total) - Math.floor(total / 2);
                                const abs = Math.abs(offset);
                                const isActive = offset === 0;
                                return (
                                    <motion.div
                                        key={title}
                                        onClick={() => {
                                            if (dragged.current) return;
                                            if (!isActive) setActive(i);
                                        }}
                                        className="absolute left-1/2 top-1/2 w-[24rem] md:w-[30rem]"
                                        initial={false}
                                        animate={{
                                            x: `calc(-50% + ${offset * 52}%)`,
                                            y: '-50%',
                                            scale: isActive ? 1 : 0.82 - (abs - 1) * 0.06,
                                            rotate: offset * -4,
                                            opacity: abs > 2 ? 0 : 1,
                                        }}
                                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ zIndex: total - abs, pointerEvents: abs > 2 ? 'none' : 'auto', cursor: isActive ? 'grab' : 'pointer' }}
                                    >
                                        <motion.figure
                                            className="rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--bg)] p-4 text-[var(--text)] shadow-[var(--shadow-lg)]"
                                            animate={reduce ? undefined : { y: [0, -12, 0] }}
                                            transition={reduce ? undefined : { duration: 6 + i, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: i * 0.5 }}
                                        >
                                            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] border border-[var(--line)]">
                                                <Image
                                                    src={image}
                                                    alt=""
                                                    fill
                                                    sizes="(max-width: 768px) 60vw, 30vw"
                                                    draggable={false}
                                                    className="object-cover"
                                                />
                                                <FloatingLabel size="sm" className="text-[0.74rem] font-semibold text-[var(--accent-text)]">
                                                    {eyebrow}
                                                </FloatingLabel>
                                            </div>
                                            <figcaption className="flex items-center justify-between px-1 pb-1 pt-3.5">
                                                <h3 className="text-[1.7rem] font-bold leading-tight tracking-tight text-[var(--text)]">
                                                    {title}
                                                </h3>
                                                <span className="shrink-0 pl-2 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                                                    {foot}
                                                </span>
                                            </figcaption>
                                        </motion.figure>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        <div className="mt-10 flex justify-center gap-2.5">
                            {cards.map((_, i) => (
                                <Button
                                    key={i}
                                    type="button"
                                    variant="ghost"
                                    size="xs"
                                    onClick={() => setActive(i)}
                                    aria-label={`Go to frame ${i + 1}`}
                                    className={cn(
                                        'h-2 min-w-0 rounded-full p-0 transition-all duration-300',
                                        i === active ? 'w-7 bg-[var(--accent)]' : 'w-2 bg-white/25 hover:bg-white/45',
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

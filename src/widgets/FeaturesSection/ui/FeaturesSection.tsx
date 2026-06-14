'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { assetPath } from '@/shared/lib/utils/assetPath';

type IconProps = { className?: string };

const WaveIcon = ({ className }: IconProps) => (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <path d="M3 20h4l3-10 5 20 5-26 5 32 5-22 3 6h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const GridIcon = ({ className }: IconProps) => (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <rect x="4" y="5" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="5" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="19" width="14" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="27" width="14" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const CaptionIcon = ({ className }: IconProps) => (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <rect x="3.5" y="7" width="33" height="26" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 16h20M10 21h14M10 26h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const ExportIcon = ({ className }: IconProps) => (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
        <rect x="5" y="8" width="30" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="m17 15 9 5-9 5V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

const features = [
    {
        number: '01',
        title: 'Narration that follows the scene',
        text: 'The script is built from panel order and dialogue context, so the voice follows the page instead of reading a text dump.',
        Icon: WaveIcon,
        large: true,
    },
    {
        number: '02',
        title: 'Panel-aware camera',
        text: 'Framing respects manga and manhwa layouts, including right-to-left reading.',
        Icon: GridIcon,
        large: false,
    },
    {
        number: '03',
        title: 'Captions included',
        text: 'Speech, narration and subtitles stay synchronized with the final cut.',
        Icon: CaptionIcon,
        large: false,
    },
    {
        number: '04',
        title: 'One finished export',
        text: 'Get a video file for horizontal or vertical publishing without rebuilding the edit.',
        Icon: ExportIcon,
        large: false,
    },
] as const;

export const FeaturesSection = () => (
    <section id="features" className="section-shell">
        <Container>
            <div className="editorial-rule" data-index="IV." data-page="004 / 008">
                <span>Capabilities</span>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
                <motion.div
                    className="lg:col-span-8"
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-kicker">Built for the page</p>
                    <h2 className="display mt-7 max-w-[13ch] text-[clamp(4rem,5.8vw,7rem)]">
                        The production work, without the production{' '}
                        <em className="text-[var(--accent-text)]">mess</em>.
                    </h2>
                </motion.div>
                <p className="max-w-[42ch] text-[1.6rem] leading-[1.7] text-[var(--text-muted)] lg:col-span-4">
                    Each feature exists to shorten the path from finished artwork to a watchable,
                    narrated format.
                </p>
            </div>

            <div className="mt-16 grid gap-4 lg:grid-cols-12">
                {features.map(({ number, title, text, Icon, large }, index) => (
                    <motion.article
                        key={number}
                        className={
                            large
                                ? 'group relative min-h-[43rem] overflow-hidden rounded-[2.4rem] bg-[var(--text)] p-8 text-[var(--bg)] lg:col-span-7 lg:row-span-2 md:p-10'
                                : 'group relative min-h-[20rem] rounded-[2.4rem] border border-[var(--line-strong)] bg-[var(--surface)] p-7 lg:col-span-5 md:p-8'
                        }
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: index * 0.07 }}
                    >
                        {large && (
                            <>
                                <span className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[5rem] border-[var(--accent)] opacity-90" />
                                <span className="absolute bottom-8 right-10 h-28 w-28 rounded-full border border-white/20" />
                            </>
                        )}

                        <div className="relative flex items-start justify-between">
                            <span className={large ? 'font-mono text-[1rem] uppercase tracking-[0.2em] text-white/55' : 'font-mono text-[1rem] uppercase tracking-[0.2em] text-[var(--text-faint)]'}>
                                Capability {number}
                            </span>
                            <Icon className={large ? 'h-12 w-12 text-[var(--accent)]' : 'h-10 w-10 text-[var(--accent-text)]'} />
                        </div>

                        {large && (
                            <div className="relative mt-8 aspect-[16/8] max-w-[54rem] overflow-hidden rounded-[1.6rem] border border-white/15">
                                <Image
                                    src={assetPath('/images/inspiration/capabilities.png')}
                                    alt=""
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 58vw"
                                    className="object-cover"
                                />
                                <span className="absolute inset-0 bg-[#171719]/10" />
                            </div>
                        )}

                        <div className={large ? 'relative mt-8 max-w-[52rem]' : 'relative mt-12'}>
                            <h3 className={large ? 'text-[clamp(3rem,4vw,5rem)] font-bold leading-[1.02] tracking-tight' : 'text-[2.2rem] font-bold leading-tight tracking-tight text-[var(--text)]'}>
                                {title}
                            </h3>
                            <p className={large ? 'mt-5 max-w-[48ch] text-[1.6rem] leading-[1.7] text-white/65' : 'mt-4 max-w-[44ch] text-[1.4rem] leading-[1.65] text-[var(--text-muted)]'}>
                                {text}
                            </p>
                        </div>
                    </motion.article>
                ))}
            </div>
        </Container>
    </section>
);

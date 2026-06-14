'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';
import { SecRule } from '@/shared/ui/SecRule/SecRule';
import { Button } from '@/shared/ui/Button/Button';

type IconProps = { className?: string };

const ReaderIcon = ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M2.5 5.5A2 2 0 0 1 4.5 4H10a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h5.5a2 2 0 0 1 2 1.5" />
        <path d="M12 5v15" />
        <path d="M2.5 5.5V18a2 2 0 0 0 2 2H10a2 2 0 0 1 2 .8 2 2 0 0 1 2-.8h5.5a2 2 0 0 0 2-2V5.5" />
    </svg>
);

const CreatorIcon = ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 8h4l2 3H3" />
        <path d="M21 8h-4l-2 3h6" />
        <path d="m10 13 5 3-5 3v-6Z" />
    </svg>
);

const PublisherIcon = ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </svg>
);

const ArrowMark = ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
    </svg>
);

const cases = [
    {
        n: '01',
        Icon: ReaderIcon,
        tag: 'Readers · Accessibility',
        title: 'Watch instead of read',
        text:
            'For tired eyes, long commutes and screen-readers alike. MangaShift turns a chapter into a narrated, moving cut — so the story comes to you, hands-free, eyes-free, on any screen.',
        coord: 'AUDIENCE · ∞',
        roman: 'i.',
        featured: false,
    },
    {
        n: '02',
        Icon: CreatorIcon,
        tag: 'Creators · Production',
        title: 'Turn your manga into video',
        text:
            'Upload your pages and get a finished, voiced reel back — narration, panel motion and scored audio, composed automatically. No timeline, no editor, no frame left on the floor. Publish to YouTube, Shorts or TikTok the same day.',
        coord: 'PAGE → REEL · MP4',
        roman: 'ii.',
        featured: true,
    },
    {
        n: '03',
        Icon: PublisherIcon,
        tag: 'Publishers · Reach',
        title: 'Reach a global audience',
        text:
            'Repackage a back catalogue into watchable video at scale — new formats, new platforms, new languages, one pipeline. Meet readers where they already watch.',
        coord: 'MARKETS · 40+',
        roman: 'iii.',
        featured: false,
    },
] as const;

const reveal: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
};

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
} as const;

const viewport = { once: true, margin: '-80px' } as const;

export const UseCasesSection = () => (
    <section
        id="usecases"
        aria-labelledby="usecases-title"
        className="relative py-[clamp(10rem,16vw,13rem)] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
    >
        <div className="relative z-10 mx-auto max-w-[120rem]">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
                <SecRule roman="IV." meta="Use cases · For whom" page="005 / 008" />
            </motion.div>

            <div className="mt-[clamp(4rem,7vw,7rem)] grid items-end gap-x-[6rem] gap-y-12 lg:grid-cols-[1.1fr_0.9fr]">
                <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
                    <div className="flex items-center gap-4">
                        <span className="h-px w-10 bg-[var(--accent)]" />
                        <span className="eyebrow">Nº 05 — For whom</span>
                    </div>

                    <h2
                        id="usecases-title"
                        className="mt-7 max-w-[18ch] text-[clamp(3rem,5vw,5.5rem)] font-extrabold leading-[1.04] tracking-tight text-[var(--text)]"
                    >
                        One pipeline,{' '}
                        <em className="font-normal text-[var(--accent-text)]">three</em> audiences.
                    </h2>
                </motion.div>

                <motion.p
                    className="max-w-[44ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)] lg:pb-2"
                    {...fadeUp}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    Whether you read manga, make it, or sell it — the page-to-video pipeline meets
                    you where you are.
                </motion.p>
            </div>

            <motion.ul
                className="mt-[clamp(4rem,6vw,6.5rem)] grid grid-cols-1 gap-[clamp(1.6rem,2vw,2.2rem)] md:grid-cols-12"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
            >
                {cases.map(({ n, Icon, tag, title, text, coord, roman, featured }) => (
                    <motion.li
                        key={n}
                        variants={reveal}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                            'group relative flex flex-col rounded-[18px] border border-[var(--line)] p-[clamp(2rem,2.6vw,2.8rem)] transition-colors duration-300 hover:border-[var(--line-strong)]',
                            featured
                                ? 'bg-[var(--surface-2)] md:col-span-6 md:row-span-2'
                                : 'bg-[var(--surface)] md:col-span-6',
                            !featured && n === '01' && 'md:mt-[clamp(2.5rem,4vw,4.5rem)]',
                            !featured && n === '03' && 'md:mt-[clamp(2.5rem,4vw,4.5rem)] md:self-start',
                        )}
                    >
                        <div className="flex items-start justify-between">
                            <span className="serif text-[3.6rem] italic leading-none text-[var(--accent-text)]">
                                {n}
                            </span>
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text-muted)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent-text)]">
                                <ArrowMark className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </span>
                        </div>

                        <Icon
                            className={cn(
                                'mt-8 text-[var(--text)]',
                                featured ? 'h-10 w-10' : 'h-9 w-9',
                            )}
                        />

                        <div className="mt-5 flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                                {tag}
                            </span>
                            <span className="h-px flex-1 bg-[var(--line)]" />
                        </div>

                        <h3
                            className={cn(
                                'mt-3 font-bold leading-tight text-[var(--text)]',
                                featured
                                    ? 'text-[clamp(1.9rem,2.4vw,2.6rem)]'
                                    : 'text-[length:var(--h3-font-size)]',
                            )}
                        >
                            {title}
                        </h3>

                        <p
                            className={cn(
                                'mt-3 max-w-[46ch] leading-relaxed text-[var(--text-muted)]',
                                featured
                                    ? 'text-[length:var(--normal-font-size)]'
                                    : 'text-[length:var(--small-font-size)]',
                            )}
                        >
                            {text}
                        </p>

                        <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                            <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                                {coord}
                            </span>
                            <span
                                aria-hidden="true"
                                className="serif text-[1.6rem] leading-none text-[var(--line-strong)] transition-colors duration-300 group-hover:text-[var(--accent-text)]"
                            >
                                {roman}
                            </span>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>

            <motion.div
                className="mt-[clamp(3.5rem,5vw,5rem)] flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[var(--line)] pt-7"
                {...fadeUp}
                transition={{ duration: 0.6 }}
            >
                <Button variant="primary" size="md">
                    Join the beta
                </Button>
                <p className="max-w-[40ch] text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                    <em className="serif text-[var(--text)]">One upload</em> — a narrated reel out.
                    Built for everyone who loves the page.
                </p>
            </motion.div>
        </div>
    </section>
);

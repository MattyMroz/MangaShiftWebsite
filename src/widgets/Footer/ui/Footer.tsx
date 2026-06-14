'use client';

import Link from 'next/link';
import { Container } from '@/shared/ui/Container/Container';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';

const links = [
    ['About', '#about'],
    ['How it works', '#how'],
    ['Features', '#features'],
    ['Demo', '#demo'],
    ['FAQ', '#faq'],
] as const;

export const Footer = () => {
    const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const href = event.currentTarget.getAttribute('href');
        if (href && smoothScrollTo(href)) event.preventDefault();
    };

    return (
        <footer className="border-t border-[var(--line-strong)] bg-[var(--text)] py-10 text-[var(--bg)]">
            <Container>
                <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
                    <div>
                        <Link
                            href="#home"
                            onClick={scrollTo}
                            className="text-[3rem] font-black tracking-[-0.04em]"
                        >
                            MangaShift<span className="text-[var(--accent)]">.</span>
                        </Link>
                        <p className="mt-4 max-w-[36ch] text-[1.4rem] leading-relaxed text-white/55">
                            Static manga and manhwa, directed into narrated video.
                        </p>
                    </div>

                    <nav aria-label="Footer navigation">
                        <p className="font-mono text-[1rem] uppercase tracking-[0.18em] text-white/35">
                            Explore
                        </p>
                        <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2">
                            {links.map(([label, href]) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        onClick={scrollTo}
                                        className="text-[1.35rem] text-white/60 transition-colors hover:text-white"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="font-mono text-[1rem] uppercase tracking-[0.18em] text-white/35">
                            Connect
                        </p>
                        <div className="mt-4 flex flex-col gap-2">
                            <a href="https://github.com/MattyMroz" target="_blank" rel="noreferrer" className="text-[1.35rem] text-white/60 transition-colors hover:text-white">
                                GitHub ↗
                            </a>
                            <a href="https://www.linkedin.com/in/mattymroz/" target="_blank" rel="noreferrer" className="text-[1.35rem] text-white/60 transition-colors hover:text-white">
                                LinkedIn ↗
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 font-mono text-[1rem] uppercase tracking-[0.14em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
                    <span>© {new Date().getFullYear()} MangaShift</span>
                    <span>Wrocław · Poland · private beta</span>
                </div>

                <div className="mt-10 overflow-hidden border-t border-white/15 pt-8">
                    <span className="block whitespace-nowrap text-center text-[clamp(6rem,13vw,17rem)] font-black leading-[0.78] tracking-[-0.07em]">
                        MangaShift<span className="text-[var(--accent)]">.</span>
                    </span>
                </div>
            </Container>
        </footer>
    );
};

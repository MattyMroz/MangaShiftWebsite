'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';
import { t } from '@/shared/i18n';

const navItems = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.how'), href: '#how' },
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.demo'), href: '#demo' },
    { name: t('nav.faq'), href: '#faq' },
];

const social = [
    { name: t('footer.links.github'), href: 'https://github.com/MattyMroz' },
    { name: t('footer.links.linkedin'), href: 'https://www.linkedin.com/in/mattymroz/' },
];

export const Footer = () => {
    const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && smoothScrollTo(href)) e.preventDefault();
    };

    return (
        <footer className="relative w-full border-t border-[var(--line)] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)] pt-[8rem] pb-[4rem]">
            <div className="relative z-10 max-w-[120rem] mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-12 mb-20">
                    <div className="max-w-[36ch]">
                        <span className="text-[2.8rem] font-extrabold text-[var(--text)] tracking-tight">
                            {t('footer.wordmark')}<span className="text-[var(--accent)]">.</span>
                        </span>
                        <p className="mt-4 text-[length:var(--normal-font-size)] text-[var(--text-muted)] leading-relaxed">
                            {t('footer.tagline')}
                        </p>
                    </div>

                    <div className="flex gap-20">
                        <nav className="flex flex-col gap-3">
                            {navItems.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={handleScrollLink}
                                    className="text-[length:var(--normal-font-size)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex flex-col gap-3">
                            {social.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[length:var(--normal-font-size)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                                >
                                    {s.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* mega-słowo */}
                <div className="overflow-hidden border-y border-[var(--line)] py-8">
                    <span className="block text-[clamp(6rem,16vw,22rem)] font-extrabold text-[var(--text)] tracking-tighter leading-none select-none">
                        {t('footer.wordmark')}
                    </span>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="eyebrow !text-[var(--text-faint)] !tracking-[0.18em]">
                        © {new Date().getFullYear()} {t('footer.wordmark')} · {t('footer.rights')}
                    </p>
                    <div className="flex items-center gap-2">
                        <motion.span
                            className="w-2 h-2 rounded-full bg-[var(--accent)]"
                            animate={{ opacity: [1, 0.35, 1] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <span className="eyebrow !text-[var(--text-faint)] !tracking-[0.18em]">{t('ticker.status')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

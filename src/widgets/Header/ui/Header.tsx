'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Hamburger } from '@/shared/ui/Hamburger/Hamburger';
import { LanguageSwitcher } from '@/shared/ui/LanguageSwitcher/LanguageSwitcher';
import { Button } from '@/shared/ui/Button/Button';
import { Container } from '@/shared/ui/Container/Container';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';
import { t } from '@/shared/i18n';

const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.how'), href: '#how' },
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.usecases'), href: '#usecases' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.demo'), href: '#demo' },
    { name: t('nav.faq'), href: '#faq' },
];

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) setIsOpen(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const nav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (isOpen) setIsOpen(false);
        if (href && smoothScrollTo(href)) e.preventDefault();
    };

    const joinBeta = () => {
        if (isOpen) setIsOpen(false);
        smoothScrollTo('#beta');
    };

    return (
        <>
            <motion.header
                initial={{ y: -28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-0 z-[1030] border-b"
                style={{
                    backgroundColor: isScrolled ? 'var(--bg-alpha)' : 'transparent',
                    borderColor: isScrolled ? 'var(--line)' : 'transparent',
                    backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                    WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
                    transition:
                        'background-color 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
                }}
            >
                <Container className="flex h-[6.5rem] items-center justify-between md:h-[7.5rem]">
                    <Link
                        href="#home"
                        onClick={nav}
                        className="shrink-0 font-[family-name:var(--font-display)] text-[2.1rem] font-extrabold tracking-tight text-[var(--text)] md:text-[2.3rem]"
                    >
                        MangaShift<span className="text-[var(--accent)]">.</span>
                    </Link>

                    <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
                        <ul
                            className="flex items-center gap-1 rounded-full border border-transparent p-1 list-none"
                            onMouseLeave={() => setHoveredNav(null)}
                        >
                            {navLinks.map((link) => (
                                <li
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => setHoveredNav(link.name)}
                                >
                                    {hoveredNav === link.name && (
                                        <motion.span
                                            layoutId="header-nav-hover"
                                            className="absolute inset-0 rounded-full border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-sm)]"
                                            transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                                        />
                                    )}
                                    <Link
                                        href={link.href}
                                        onClick={nav}
                                        className="relative z-10 block px-4 py-2 font-[family-name:var(--font-mono)] text-[1.15rem] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)]"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4 sm:gap-7 lg:gap-10">
                        <div className="hidden items-center lg:flex">
                            <LanguageSwitcher />
                        </div>
                        <Button
                            variant="accent"
                            size="pill"
                            onClick={joinBeta}
                            className="hidden sm:inline-flex"
                        >
                            {t('nav.beta')}
                        </Button>
                        <div className="lg:hidden">
                            <Hamburger isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
                        </div>
                    </div>
                </Container>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[1020] flex flex-col bg-[var(--bg-alpha)] px-10 pb-12 pt-[12rem] backdrop-blur-xl lg:hidden"
                    >
                        <ul className="flex flex-col items-center gap-7 list-none">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 + 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={nav}
                                        className="font-[family-name:var(--font-mono)] text-[1.8rem] font-medium uppercase tracking-[0.14em] text-[var(--text)] transition-colors duration-200 hover:text-[var(--accent)]"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                        <div className="mt-10 flex justify-center">
                            <Button variant="accent" size="pill" onClick={joinBeta}>
                                {t('nav.beta')}
                            </Button>
                        </div>
                        <div className="mt-auto flex items-center justify-center pt-12">
                            <LanguageSwitcher />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

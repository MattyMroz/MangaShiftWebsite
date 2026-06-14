"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Hamburger } from "@/shared/ui/Hamburger/Hamburger";
import { ThemeSwitcher } from "@/shared/ui/ThemeSwitcher/ThemeSwitcher";
import { smoothScrollTo } from "@/shared/lib/utils/smoothScroll";
import { t } from "@/shared/i18n";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
        return () => document.body.classList.remove("no-scroll");
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (!href) return;

        if (isOpen) {
            setIsOpen(false);
        }

        const scrolled = smoothScrollTo(href);
        if (scrolled) {
            e.preventDefault();
        }
    };

    const navLinks = [
        { name: t("nav.about"), href: "#about" },
        { name: t("nav.how"), href: "#how" },
        { name: t("nav.features"), href: "#features" },
        { name: t("nav.demo"), href: "#demo" },
        { name: t("nav.faq"), href: "#faq" },
    ];

    return (
        <>
            <header
                className="fixed top-0 left-0 w-full z-[1030] flex items-center justify-center px-4 md:px-12"
            >
                <div
                    className={`w-full max-w-[140rem] my-4 md:my-6 px-6 md:px-10 rounded-full transition-all duration-300 ${isScrolled
                        ? 'bg-[var(--bg-alpha)] backdrop-blur-md border border-[var(--line)] shadow-[var(--shadow-md)]'
                        : 'bg-transparent border border-transparent'
                        }`}
                >
                    <nav className="relative flex items-center justify-between w-full h-[7rem] md:h-[8rem]">

                        <Link
                            href="#home"
                            onClick={handleNavLinkClick}
                            className="z-[1030] whitespace-nowrap cursor-pointer"
                        >
                            <span className="text-[2.4rem] md:text-[2.8rem] font-extrabold text-[var(--text)] tracking-tight font-[family-name:var(--font-display)]">
                                MangaShift<span className="text-[var(--accent)]">.</span>
                            </span>
                        </Link>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                            <ul className="flex items-center gap-12 list-none">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            onClick={handleNavLinkClick}
                                            className="nav-link relative inline-block py-2 text-[1.7rem] font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex items-center gap-6 z-[1030]">
                            <div className="hidden lg:flex items-center justify-center">
                                <ThemeSwitcher />
                            </div>
                            <div className="lg:hidden">
                                <Hamburger isOpen={isOpen} toggle={toggleMenu} />
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[1020] bg-[var(--bg-alpha)] backdrop-blur-xl pt-[18rem] px-12 pb-12 overflow-y-auto flex flex-col"
                    >
                        <ul className="flex flex-col items-center gap-6 mb-2 list-none">
                            {navLinks.map((link, index) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 + 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={handleNavLinkClick}
                                        className="block text-[2.8rem] font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex justify-center mt-auto"
                        >
                            <ThemeSwitcher />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
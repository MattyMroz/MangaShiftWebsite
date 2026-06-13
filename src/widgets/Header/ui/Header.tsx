"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Hamburger } from "@/shared/ui/Hamburger/Hamburger";
import { ThemeSwitcher } from "@/shared/ui/ThemeSwitcher/ThemeSwitcher";
import GlassSurface from "@/shared/ui/GlassSurface/GlassSurface";
import { smoothScrollTo } from "@/shared/lib/utils/smoothScroll";

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
        { name: "Home", href: "#home" },
        { name: "Demo", href: "#demo" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
        { name: "FAQ", href: "#faq" },
    ];

    return (
        <>
            <header 
                className="fixed top-0 left-0 w-full h-[10rem] md:h-[15rem] z-[1030] flex items-center justify-center px-4 md:px-12"
            >
                <GlassSurface
                    width="100%"
                    height="9rem"
                    borderRadius={50}
                    borderWidth={0.07}
                    brightness={50}
                    opacity={0.93}
                    blur={11}
                    displace={0.5}
                    backgroundOpacity={0.1}
                    saturation={1}
                    distortionScale={-180}
                    redOffset={0}
                    greenOffset={10}
                    blueOffset={20}
                    mixBlendMode="lighten"
                    className={`max-w-[140rem] px-6 md:px-16 transition-all duration-300 ${isScrolled ? 'shadow-[var(--shadow-lg)]' : ''}`}
                    style={{ boxShadow: 'none' }}
                >

                    <nav className="relative flex items-center justify-between w-full h-full">

                        <Link
                            href="#home"
                            onClick={handleNavLinkClick}
                            className="z-[1030] whitespace-nowrap pl-6 md:pl-4 cursor-pointer"
                        >
                            <span className="text-[2.4rem] md:text-[2.8rem] font-bold text-[var(--text-primary)] tracking-tighter font-[family-name:var(--font-inter)]">
                                MangaShift
                            </span>
                        </Link>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                            <ul className="flex items-center gap-12 list-none">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            onClick={handleNavLinkClick}
                                            className="nav-link relative inline-block py-2 text-[2rem] font-semibold text-[var(--text-primary)] transition-all duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex items-center gap-8 z-[1030]">
                            <div className="hidden lg:flex items-center justify-center">
                                <ThemeSwitcher />
                            </div>
                            <div className="lg:hidden">
                                <Hamburger isOpen={isOpen} toggle={toggleMenu} />
                            </div>
                        </div>
                    </nav>
                </GlassSurface>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[1020] bg-[var(--bg-primary)] pt-[18rem] px-12 pb-12 overflow-y-auto"
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
                                        className="block text-[2.8rem] font-bold text-[var(--text-primary)] transition-all duration-300"
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
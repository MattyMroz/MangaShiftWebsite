'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import { SmartText } from '@/shared/ui/SmartText/SmartText';
import { smoothScrollTo } from '@/shared/lib/utils/smoothScroll';

const footerLinks = {
    navigation: [
        { name: 'Home', href: '#home' },
        { name: 'Demo', href: '#demo' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
        { name: 'FAQ', href: '#faq' }
    ],
    social: [
        {
            name: 'Email',
            href: 'mailto:mateuszmroz001@gmail.com',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            )
        },
        {
            name: 'GitHub',
            href: 'https://github.com/MattyMroz',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            href: 'https://www.linkedin.com/in/mattymroz/',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            )
        }
    ]
};

export const Footer = () => {
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMobileDevice(isMobile);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            const scrolled = smoothScrollTo(href);
            if (scrolled) {
                e.preventDefault();
            }
        }
    };

    return (
        <motion.footer 
            className="w-full border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]/25 backdrop-blur-sm"
            initial={isMobileDevice ? { opacity: 0, y: 50 } : false}
            whileInView={isMobileDevice ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-[var(--container-width)] mx-auto px-6 md:px-12 py-16 md:py-24">                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start w-full mb-16">

                    {/* Left Column - Brand */}
                    <motion.div
                        className="w-full flex flex-col items-center lg:items-start gap-8 text-center lg:text-left px-6 md:px-12 lg:pl-24 lg:pr-12 mb-16 lg:mb-0"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-[length:var(--h1-font-size)] font-bold text-[var(--text-primary)]">
                            MangaShift
                        </h3>
                        <SmartText>
                            <p className="text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-primary)] opacity-90 max-w-2xl">
                                Transforming static manga into immersive audiovisual experiences through AI-powered technology.
                            </p>
                        </SmartText>
                    </motion.div>

                    {/* Right Column - Links */}
                    <motion.div
                        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-12 lg:pl-12 lg:pr-24"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >

                        {/* Quick Links */}
                        <div className="flex flex-col items-center lg:items-start gap-6">
                            <h4 className="text-[length:var(--h2-font-size)] font-bold text-[var(--text-primary)]">
                                Quick Links
                            </h4>
                            <nav className="flex flex-col items-center lg:items-start gap-4">
                                {footerLinks.navigation.map((link) => (
                                    <motion.div key={link.name}>
                                        <Link
                                            href={link.href}
                                            onClick={handleScrollLink}
                                            className="text-[length:var(--h3-font-size)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                        >
                                            <motion.span
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                className="inline-block"
                                            >
                                                {link.name}
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>

                        {/* Connect */}
                        <div className="flex flex-col items-center lg:items-start gap-6">
                            <h4 className="text-[length:var(--h2-font-size)] font-bold text-[var(--text-primary)]">
                                Connect
                            </h4>
                            <div className="flex flex-col items-center lg:items-start gap-4">
                                {footerLinks.social.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="flex items-center gap-3 text-[length:var(--h3-font-size)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <span className="w-8 h-8 flex items-center justify-center">
                                            {social.icon}
                                        </span>
                                        <span>{social.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-[var(--border-primary)] pt-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <SmartText>
                            <p className="text-[length:var(--normal-font-size)] text-[var(--text-tertiary)] text-center md:text-left">
                                &copy; {new Date().getFullYear()} MangaShift. All rights reserved.
                            </p>
                        </SmartText>
                        <SmartText>
                            <p className="text-[length:var(--normal-font-size)] text-[var(--text-tertiary)] text-center md:text-right">
                                Built by{' '}
                                <a
                                    href="https://github.com/MattyMroz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold inline-block"
                                >
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="inline-block"
                                    >
                                        Mateusz Mróz
                                    </motion.span>
                                </a>
                            </p>
                        </SmartText>
                    </div>
                </div>

            </div>
        </motion.footer>
    );
};

'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/Button/Button";
import { SmartText } from "@/shared/ui/SmartText/SmartText";
import { smoothScrollTo } from "@/shared/lib/utils/smoothScroll";

export const Hero = () => {
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
        <section
            id="home"
            className="relative h-screen flex flex-col items-center overflow-hidden"
        >
            <div className="flex-1" />

            <motion.div
                className="relative z-10 flex flex-col items-center text-center px-4 shrink-0 w-full max-w-[100vw]"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="relative flex items-center justify-center w-full">
                    <motion.h1
                        className="text-[clamp(5.5rem,15vw,16rem)] font-bold text-[var(--text-primary)] tracking-tighter drop-shadow-2xl leading-none font-[family-name:var(--font-inter)] whitespace-nowrap"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    >
                        MangaShift
                    </motion.h1>
                </div>
            </motion.div>

            <div className="flex-1 flex flex-col items-center justify-start pt-8 z-10 px-4 w-full">
                <motion.div
                    className="flex flex-col items-center gap-3 mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <SmartText>
                        <p className="text-[clamp(1.75rem,5vw,3rem)] text-[var(--text-secondary)] font-light tracking-wide font-[family-name:var(--font-montserrat)] leading-tight">
                            <span className="whitespace-nowrap">Turning Static Pages</span>{' '}<span className="whitespace-nowrap">Into Living Worlds</span>
                        </p>
                        <p className="text-[clamp(1rem,3vw,2rem)] text-[var(--text-tertiary)] font-mono tracking-[0.5em] uppercase font-[family-name:var(--font-montserrat)] whitespace-nowrap">
                            Culture Without Barriers
                        </p>
                    </SmartText>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto px-4">
                    <Link href="#demo" onClick={handleScrollLink} className="w-full md:w-auto">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button variant="primary" className="w-full justify-center">
                                <span className="flex items-center gap-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-8 h-8"
                                    >
                                        <circle cx="12" cy="12" r="9" />
                                        <polygon points="11 9 16 12 11 15 11 9" fill="currentColor" />
                                    </svg>
                                    Watch Demo
                                </span>
                            </Button>
                        </motion.div>
                    </Link>
                    <Link href="#about" onClick={handleScrollLink} className="w-full md:w-auto">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button variant="ghost" className="w-full justify-center">Join Waiting List</Button>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </section>
    );
};
'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/Button/Button";
import { smoothScrollTo } from "@/shared/lib/utils/smoothScroll";
import { t } from "@/shared/i18n";

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
};

export const Hero = () => {
    const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && smoothScrollTo(href)) e.preventDefault();
    };

    const title = t("hero.title");
    const emphasis = t("hero.titleEmphasis");
    const [before, after] = title.split(emphasis);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            <div className="relative z-10 w-full max-w-[120rem] mx-auto pt-[18rem] pb-[10rem]">
                <motion.p
                    className="eyebrow mb-8"
                    {...fadeUp}
                    transition={{ duration: 0.6 }}
                >
                    {t("hero.eyebrow")}
                </motion.p>

                <motion.h1
                    className="max-w-[18ch] text-[clamp(4rem,7vw,9rem)] font-extrabold text-[var(--text)] tracking-tight leading-[1.02]"
                    {...fadeUp}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    {before}
                    <span className="serif text-[var(--accent-text)]">{emphasis}</span>
                    {after}
                </motion.h1>

                <motion.p
                    className="mt-10 max-w-[52ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)]"
                    {...fadeUp}
                    transition={{ duration: 0.8, delay: 0.25 }}
                >
                    {t("hero.lead")}
                </motion.p>

                <motion.div
                    className="mt-14 flex flex-col sm:flex-row items-stretch sm:items-center gap-5"
                    {...fadeUp}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Link href="#beta" onClick={handleScrollLink} className="contents">
                        <Button variant="hero" size="md">{t("hero.ctaPrimary")}</Button>
                    </Link>
                    <Link href="#demo" onClick={handleScrollLink} className="contents">
                        <Button variant="outline" size="md">
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <circle cx="12" cy="12" r="9" />
                                    <polygon points="11 9 16 12 11 15 11 9" fill="currentColor" />
                                </svg>
                                {t("hero.ctaSecondary")}
                            </span>
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

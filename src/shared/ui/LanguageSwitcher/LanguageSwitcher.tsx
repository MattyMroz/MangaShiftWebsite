"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils/cn";

const LOCALE_STORAGE_KEY = "locale";
const DEFAULT_LOCALE = "en";

const subscribeLocale = (onChange: () => void) => {
    window.addEventListener("storage", onChange);
    return () => window.removeEventListener("storage", onChange);
};
const readLocale = () => localStorage.getItem(LOCALE_STORAGE_KEY) ?? DEFAULT_LOCALE;

interface LanguageOption {
    code: string;
    label: string;
    native: string;
}

const LANGUAGES: LanguageOption[] = [
    { code: "en", label: "EN", native: "English" },
    { code: "zh", label: "ZH", native: "中文" },
    { code: "hi", label: "HI", native: "हिन्दी" },
    { code: "es", label: "ES", native: "Español" },
    { code: "fr", label: "FR", native: "Français" },
    { code: "ar", label: "AR", native: "العربية" },
    { code: "pt", label: "PT", native: "Português" },
    { code: "ru", label: "RU", native: "Русский" },
    { code: "ja", label: "JA", native: "日本語" },
    { code: "de", label: "DE", native: "Deutsch" },
    { code: "ko", label: "KO", native: "한국어" },
    { code: "pl", label: "PL", native: "Polski" },
    { code: "it", label: "IT", native: "Italiano" },
    { code: "tr", label: "TR", native: "Türkçe" },
    { code: "id", label: "ID", native: "Indonesia" },
    { code: "vi", label: "VI", native: "Tiếng Việt" },
];

export const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const stored = useSyncExternalStore(subscribeLocale, readLocale, () => DEFAULT_LOCALE);
    const locale = LANGUAGES.some((l) => l.code === stored) ? stored : DEFAULT_LOCALE;
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const handlePointerDown = (e: PointerEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) setIsOpen(false);
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const handleSelect = useCallback(
        (option: LanguageOption) => {
            setIsOpen(false);
            if (option.code === locale) return;
            localStorage.setItem(LOCALE_STORAGE_KEY, option.code);
            window.location.reload();
        },
        [locale],
    );

    const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="group flex items-center gap-2 font-[family-name:var(--font-mono)] text-[1.2rem] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)] cursor-pointer"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label="Select language"
            >
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-[var(--text-faint)] transition-colors duration-300 group-hover:text-[var(--text-muted)]"
                >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                </svg>
                <span className="font-semibold text-[var(--text)]">{current.label}</span>
                <motion.svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="opacity-70"
                >
                    <path d="m6 9 6 6 6-6" />
                </motion.svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        role="listbox"
                        aria-label="Languages"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                        onMouseLeave={() => setHovered(null)}
                        className="absolute right-0 top-[calc(100%+1.4rem)] z-50 grid grid-cols-[13.5rem_13.5rem] gap-x-1 gap-y-0.5 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-2 shadow-[var(--shadow-lg)] list-none"
                    >
                        {LANGUAGES.map((option) => {
                            const isActive = option.code === current.code;
                            return (
                                <li
                                    key={option.code}
                                    role="option"
                                    aria-selected={isActive}
                                    className="relative"
                                    onMouseEnter={() => setHovered(option.code)}
                                >
                                    {(hovered === option.code || (hovered === null && isActive)) && (
                                        <motion.span
                                            layoutId="lang-sliding-pill"
                                            className="absolute inset-0 rounded-xl bg-[var(--surface-2)]"
                                            transition={{ type: "spring", stiffness: 480, damping: 38 }}
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(option)}
                                        className="relative z-10 flex w-full cursor-pointer items-baseline gap-3 rounded-xl px-3 py-2.5 text-left"
                                    >
                                        <span
                                            className={cn(
                                                "w-7 shrink-0 font-[family-name:var(--font-mono)] text-[1.15rem] font-semibold uppercase tracking-[0.08em]",
                                                isActive ? "text-[var(--accent)]" : "text-[var(--text)]",
                                            )}
                                        >
                                            {option.label}
                                        </span>
                                        <span
                                            className={cn(
                                                "min-w-0 flex-1 truncate text-[1.4rem]",
                                                isActive ? "text-[var(--text)]" : "text-[var(--text-muted)]",
                                            )}
                                        >
                                            {option.native}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

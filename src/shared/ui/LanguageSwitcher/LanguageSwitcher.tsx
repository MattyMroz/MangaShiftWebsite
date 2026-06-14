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
    enabled: boolean;
}

const LANGUAGES: LanguageOption[] = [
    { code: "en", label: "EN", native: "English", enabled: true },
    { code: "pl", label: "PL", native: "Polski", enabled: true },
    { code: "ja", label: "JA", native: "日本語", enabled: false },
    { code: "ko", label: "KO", native: "한국어", enabled: false },
    { code: "zh", label: "ZH", native: "中文", enabled: false },
    { code: "es", label: "ES", native: "Español", enabled: false },
    { code: "fr", label: "FR", native: "Français", enabled: false },
    { code: "de", label: "DE", native: "Deutsch", enabled: false },
];

export const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const stored = useSyncExternalStore(subscribeLocale, readLocale, () => DEFAULT_LOCALE);
    const locale = LANGUAGES.some((l) => l.code === stored && l.enabled) ? stored : DEFAULT_LOCALE;
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (e: PointerEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
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

    const handleSelect = useCallback((option: LanguageOption) => {
        if (!option.enabled) return;
        setIsOpen(false);
        if (option.code === locale) return;
        localStorage.setItem(LOCALE_STORAGE_KEY, option.code);
        window.location.reload();
    }, [locale]);

    const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-1.5 py-1 font-[family-name:var(--font-mono)] text-[1.4rem] tracking-wide text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-300 cursor-pointer"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label="Select language"
            >
                {current.label}
                <motion.svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <path d="m6 9 6 6 6-6" />
                </motion.svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        role="listbox"
                        aria-label="Languages"
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 min-w-[14rem] list-none rounded-2xl border border-[var(--line)] bg-[var(--bg-alpha)] backdrop-blur-md shadow-[var(--shadow-md)] p-1.5 z-50"
                    >
                        {LANGUAGES.map((option) => {
                            const isActive = option.code === current.code;
                            return (
                                <li key={option.code} role="option" aria-selected={isActive}>
                                    <button
                                        type="button"
                                        disabled={!option.enabled}
                                        onClick={() => handleSelect(option)}
                                        className={cn(
                                            "flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2 text-left transition-colors duration-200",
                                            option.enabled
                                                ? "cursor-pointer hover:bg-[var(--surface-2)]"
                                                : "cursor-not-allowed opacity-40",
                                            isActive ? "text-[var(--text)]" : "text-[var(--text-muted)]"
                                        )}
                                    >
                                        <span className="flex items-center gap-2.5">
                                            <span className="font-[family-name:var(--font-mono)] text-[1.3rem] tracking-wide w-7">
                                                {option.label}
                                            </span>
                                            <span className="text-[1.5rem]">{option.native}</span>
                                        </span>
                                        {isActive ? (
                                            <span className="text-[var(--accent)]" aria-hidden="true">•</span>
                                        ) : !option.enabled ? (
                                            <span className="font-[family-name:var(--font-mono)] text-[1.05rem] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                                                soon
                                            </span>
                                        ) : null}
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

"use client";

import { useEffect, useCallback, memo, useSyncExternalStore, useState, useLayoutEffect } from "react";
import type { MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const THEME_STORAGE_KEY = "theme";
const DEFAULT_THEME: ThemeMode = "light";

type ThemeMode = "light" | "dark";

const applyTheme = (mode: ThemeMode): void => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (mode === "dark") {
        root.classList.add("dark");
        root.setAttribute("data-theme", "dark");
        root.style.colorScheme = "dark";
    } else {
        root.classList.remove("dark");
        root.setAttribute("data-theme", "light");
        root.style.colorScheme = "light";
    }
};

const iconVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0, rotate: 180, opacity: 0 }
};


interface ThemeToggleProps {
    theme: ThemeMode;
    onToggle: (e: MouseEvent) => void;
    mounted: boolean;
}

const ThemeToggle = memo(({ theme, onToggle, mounted }: ThemeToggleProps) => (
    <motion.button
        type="button"
        onClick={onToggle}
        className="theme-toggle w-6 h-6 flex items-center justify-center pointer-events-auto cursor-pointer"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        {!mounted ? (
            theme === "light" ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '24px', height: '24px', display: 'block' }}
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '24px', height: '24px', display: 'block' }}
                >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
            )
        ) : (
            <AnimatePresence mode="wait">
                {theme === "light" ? (
                    <motion.svg
                        key="sun"
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: '24px', height: '24px', display: 'block' }}
                    >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                    </motion.svg>
                ) : (
                    <motion.svg
                        key="moon"
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: '24px', height: '24px', display: 'block' }}
                    >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </motion.svg>
                )}
            </AnimatePresence>
        )}
    </motion.button>
));
ThemeToggle.displayName = "ThemeToggle";

const useLocalStorageState = <T,>(
    key: string,
    defaultValue: T,
    serialize: (value: T) => string = String,
    deserialize: (value: string) => T = (v) => v as T
): [T, (value: T | ((prev: T) => T)) => void] => {
    const getSnapshot = useCallback(() => {
        if (typeof window === 'undefined') return serialize(defaultValue);
        return localStorage.getItem(key) ?? serialize(defaultValue);
    }, [key, defaultValue, serialize]);

    const getServerSnapshot = useCallback(() => serialize(defaultValue), [defaultValue, serialize]);

    const subscribe = useCallback((callback: () => void) => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === key) callback();
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [key]);

    const storedValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const value = deserialize(storedValue);

    const setValue = useCallback((newValue: T | ((prev: T) => T)) => {
        const resolvedValue = typeof newValue === 'function'
            ? (newValue as (prev: T) => T)(value)
            : newValue;
        localStorage.setItem(key, serialize(resolvedValue));
        window.dispatchEvent(new StorageEvent('storage', { key }));
    }, [key, value, serialize]);

    return [value, setValue];
};

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);

    const [theme, setTheme] = useLocalStorageState<ThemeMode>(
        THEME_STORAGE_KEY,
        DEFAULT_THEME,
        (v) => v,
        (v) => (v === 'light' || v === 'dark' ? v : DEFAULT_THEME)
    );

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useLayoutEffect(() => {
        const timer = requestAnimationFrame(() => {
            setMounted(true);
        });
        return () => cancelAnimationFrame(timer);
    }, []);

    const handleToggleTheme = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }, [setTheme]);

    return (
        <div className="flex items-center gap-2 touch-none select-none relative z-50 pointer-events-auto" suppressHydrationWarning>
            <ThemeToggle
                theme={theme}
                onToggle={handleToggleTheme}
                mounted={mounted}
            />
        </div>
    );
};

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const MIN_VISIBLE_MS = 1200;
const NAV_HIDE_DELAY_MS = 350;
const FADE_DURATION_MS = 280;

type ThemeMode = "light" | "dark";

const readThemeMode = (): ThemeMode => {
    if (typeof document === "undefined") return "dark";
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const shouldStartForLinkClick = (event: MouseEvent): boolean => {
    if (event.defaultPrevented) return false;
    if (event.button !== 0) return false;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;

    const target = event.target as Element | null;
    const anchor = target?.closest("a") as HTMLAnchorElement | null;
    if (!anchor) return false;
    if (anchor.target && anchor.target !== "_self") return false;
    if (anchor.hasAttribute("download")) return false;

    const href = anchor.getAttribute("href") ?? "";
    if (!href) return false;
    if (href.startsWith("#")) return false;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;

    try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return false;
        return true;
    } catch {
        return false;
    }
};

export const Preloader = () => {
    const pathname = usePathname();
    const startTimeRef = useRef<number>(0);
    const hideTimerRef = useRef<number | null>(null);
    const [isActive, setIsActive] = useState(true);
    const [themeMode, setThemeMode] = useState<ThemeMode>(readThemeMode);

    const overlayClasses = useMemo(
        () => ["fixed inset-0 z-[9999] flex items-center justify-center", "select-none"].join(" "),
        []
    );

    const overlayStyle = useMemo<React.CSSProperties>(() => {
        if (themeMode === "dark") {
            return { backgroundColor: "#0a0a0a", color: "#ffffff" };
        }
        return { backgroundColor: "#ffffff", color: "#000000" };
    }, [themeMode]);

    const clearHideTimer = useCallback(() => {
        if (hideTimerRef.current != null) {
            window.clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    }, []);

    const start = useCallback(() => {
        clearHideTimer();
        startTimeRef.current = performance.now();
        setThemeMode(readThemeMode());
        setIsActive(true);
    }, [clearHideTimer]);

    const stop = useCallback((extraDelayMs: number) => {
        clearHideTimer();
        const elapsed = performance.now() - startTimeRef.current;
        const remainingToMin = Math.max(0, MIN_VISIBLE_MS - elapsed);
        const delay = remainingToMin + extraDelayMs;
        hideTimerRef.current = window.setTimeout(() => {
            setIsActive(false);
        }, delay);
    }, [clearHideTimer]);

    useEffect(() => {
        startTimeRef.current = performance.now();
        stop(0);
        return () => clearHideTimer();
    }, [clearHideTimer, stop]);

    useEffect(() => {
        const onClickCapture = (e: MouseEvent) => {
            if (typeof window === "undefined") return;
            if (!shouldStartForLinkClick(e)) return;
            start();
        };
        document.addEventListener("click", onClickCapture, true);
        return () => document.removeEventListener("click", onClickCapture, true);
    }, [start]);

    useEffect(() => {
        const onPopState = () => {
            start();
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, [start]);

    useEffect(() => {
        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;

        const shouldStartForHistoryUrl = (url: unknown): boolean => {
            if (!url) return false;
            try {
                const nextUrl = new URL(String(url), window.location.href);
                if (nextUrl.origin !== window.location.origin) return false;
                const currentPath = window.location.pathname;
                return nextUrl.pathname !== currentPath;
            } catch {
                return false;
            }
        };

        window.history.pushState = function (...args) {
            const url = args[2];
            if (shouldStartForHistoryUrl(url)) start();
            return originalPushState.apply(this, args as unknown as Parameters<History["pushState"]>);
        };

        window.history.replaceState = function (...args) {
            const url = args[2];
            if (shouldStartForHistoryUrl(url)) start();
            return originalReplaceState.apply(this, args as unknown as Parameters<History["replaceState"]>);
        };

        return () => {
            window.history.pushState = originalPushState;
            window.history.replaceState = originalReplaceState;
        };
    }, [start]);

    useEffect(() => {
        stop(NAV_HIDE_DELAY_MS);
    }, [pathname, stop]);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: FADE_DURATION_MS / 1000, ease: "easeOut" }}
                    className={overlayClasses}
                    style={overlayStyle}
                >
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.02, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="relative grid place-items-center w-24 h-24">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background:
                                        "conic-gradient(from 180deg, transparent 0deg, currentColor 60deg, transparent 140deg)",
                                    WebkitMask:
                                        "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
                                    mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
                                    opacity: 0.9,
                                }}
                            />
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <motion.h1
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12, duration: 0.45, ease: "easeOut" }}
                                className="text-[28px] leading-none font-semibold tracking-[-0.02em]"
                            >
                                MangaShift
                            </motion.h1>
                            <motion.div
                                animate={{ opacity: [0.35, 0.7, 0.35] }}
                                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                                className="text-[12px] tracking-[0.28em] uppercase"
                                style={{
                                    color:
                                        themeMode === "dark"
                                            ? "rgba(255, 255, 255, 0.5)"
                                            : "rgba(0, 0, 0, 0.45)",
                                }}
                            >
                                Loading
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

import { useSyncExternalStore } from 'react';
import { applyAccent, DEFAULT_ACCENT } from '@/shared/lib/theme-presets';

type NeonLevel = 'off' | 'mini' | 'full';
type Theme = 'light' | 'dark';

interface AppState {
    neonLevel: NeonLevel;
    theme: Theme;
    accentColor: string;
    setAccentColor: (key: string) => void;
    toggleTheme: () => void;
}

const listeners = new Set<() => void>();

function emit() {
    for (const l of listeners) l();
}

const state: AppState = {
    neonLevel: 'off',
    theme: 'light',
    accentColor: DEFAULT_ACCENT,
    setAccentColor: (key: string) => {
        state.accentColor = key;
        if (typeof document !== 'undefined') applyAccent(key);
        emit();
    },
    toggleTheme: () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', state.theme);
        }
        emit();
    },
};

function subscribe(cb: () => void): () => void {
    listeners.add(cb);
    return () => listeners.delete(cb);
}

function getSnapshot(): AppState {
    return state;
}

// Supports both call styles:
//   useAppStore()            → full reactive state object
//   useAppStore((s) => s.x)  → selected slice
export function useAppStore(): AppState;
export function useAppStore<T>(selector: (s: AppState) => T): T;
export function useAppStore<T>(selector?: (s: AppState) => T): T | AppState {
    const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    return selector ? selector(snap) : snap;
}

export function neonGlow(
    level: NeonLevel,
    color = 'var(--accent-glow)',
    sizes: { full?: string; mini?: string } = {},
): string {
    const { full = '10px 0', mini = '4px 0' } = sizes;
    if (level === 'full') return `0 0 ${full} ${color}`;
    if (level === 'mini') return `0 0 ${mini} ${color}`;
    return 'none';
}

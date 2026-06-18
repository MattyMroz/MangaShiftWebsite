type NeonLevel = 'off' | 'mini' | 'full';
type Theme = 'light' | 'dark';

type AppState = {
    neonLevel: NeonLevel;
    theme: Theme;
};

const state: AppState = {
    neonLevel: 'off',
    theme: 'light',
};

export function useAppStore<T>(selector: (s: AppState) => T): T {
    return selector(state);
}

export function neonGlow(_level: NeonLevel): string {
    return 'none';
}

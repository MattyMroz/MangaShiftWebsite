export type BackendPhase = 'idle' | 'spawning' | 'healthz' | 'ready-check' | 'ready' | 'failed';

type BackendHealth = {
    phase: BackendPhase;
    progress: number | undefined;
    error: string | null;
    retry: () => void;
};

export function useBackendHealth(): BackendHealth {
    return {
        phase: 'ready',
        progress: 1,
        error: null,
        retry: () => {},
    };
}

export function readMotionToken(varName: string, fallbackMs: number): number {
    if (typeof window === 'undefined') return fallbackMs;
    const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    if (!raw) return fallbackMs;
    const ms = raw.endsWith('ms') ? parseFloat(raw) : raw.endsWith('s') ? parseFloat(raw) * 1000 : parseFloat(raw);
    return Number.isFinite(ms) ? ms : fallbackMs;
}

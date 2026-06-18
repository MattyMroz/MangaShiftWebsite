import { useSyncExternalStore } from 'react'
import {
  applyAccent,
  applyFont,
  applyRadius,
  CONTRAST_KEY,
  DEFAULT_ACCENT,
  DEFAULT_FONT,
  DEFAULT_RADIUS,
} from '@/shared/lib/theme-presets'

export type NeonLevel = 'off' | 'mini' | 'full'
export type Theme = 'light' | 'dark'
export type WindowControlsStyle = 'dots' | 'standard'

interface AppState {
  neonLevel: NeonLevel
  setNeonLevel: (v: NeonLevel) => void

  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void

  accentColor: string
  setAccentColor: (key: string) => void

  transparencyEnabled: boolean
  setTransparency: (v: boolean) => void
  toggleTransparency: () => void

  borderRadius: string
  setBorderRadius: (key: string) => void

  fontFamily: string
  setFontFamily: (key: string) => void

  uiScale: number
  setUiScale: (v: number) => void
  zoomIn: () => void
  zoomOut: () => void
  resetZoom: () => void

  windowControlsStyle: WindowControlsStyle
  setWindowControlsStyle: (v: WindowControlsStyle) => void
}

const listeners = new Set<() => void>()

const ZOOM_LEVELS = [
  0.75,
  0.8,
  0.9,
  1,
  1.1,
  1.25,
  1.5,
] as const

function emit() {
  for (const listener of listeners) listener()
}

function syncHTMLAttributes(patch: Partial<AppState>) {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  if (patch.neonLevel !== undefined) {
    root.setAttribute('data-neon', patch.neonLevel)
    root.style.setProperty('--neon', patch.neonLevel === 'full' ? '1' : patch.neonLevel === 'mini' ? '0.5' : '0')
  }

  if (patch.theme !== undefined) {
    root.setAttribute('data-theme', patch.theme)
    root.style.colorScheme = patch.theme
    if (state.accentColor === CONTRAST_KEY) applyAccent(CONTRAST_KEY)
  }

  if (patch.transparencyEnabled !== undefined) {
    root.setAttribute('data-transparent', String(patch.transparencyEnabled))
  }

  if (patch.accentColor !== undefined) applyAccent(patch.accentColor)
  if (patch.borderRadius !== undefined) applyRadius(patch.borderRadius)
  if (patch.fontFamily !== undefined) applyFont(patch.fontFamily)
  if (patch.uiScale !== undefined) root.style.setProperty('--ui-scale', String(patch.uiScale))
}

function clampScale(v: number) {
  return Math.round(Math.min(1.5, Math.max(0.75, v)) * 100) / 100
}

function nextZoomLevel(current: number): number {
  for (const level of ZOOM_LEVELS) {
    if (level > current + 0.001) return level
  }
  return current
}

function prevZoomLevel(current: number): number {
  for (let i = ZOOM_LEVELS.length - 1; i >= 0; i -= 1) {
    if (ZOOM_LEVELS[i] < current - 0.001) return ZOOM_LEVELS[i]
  }
  return current
}

function setState(patch: Partial<AppState>) {
  state = { ...state, ...patch }
  syncHTMLAttributes(patch)
  emit()
}

let state: AppState = {
  neonLevel: 'mini',
  setNeonLevel: (v) => setState({ neonLevel: v }),

  theme: 'light',
  setTheme: (t) => setState({ theme: t }),
  toggleTheme: () => setState({ theme: state.theme === 'dark' ? 'light' : 'dark' }),

  accentColor: DEFAULT_ACCENT,
  setAccentColor: (key) => setState({ accentColor: key }),

  transparencyEnabled: false,
  setTransparency: (v) => setState({ transparencyEnabled: v }),
  toggleTransparency: () => setState({ transparencyEnabled: !state.transparencyEnabled }),

  borderRadius: DEFAULT_RADIUS,
  setBorderRadius: (key) => setState({ borderRadius: key }),

  fontFamily: DEFAULT_FONT,
  setFontFamily: (key) => setState({ fontFamily: key }),

  uiScale: 1,
  setUiScale: (v) => setState({ uiScale: clampScale(v) }),
  zoomIn: () => setState({ uiScale: clampScale(nextZoomLevel(state.uiScale)) }),
  zoomOut: () => setState({ uiScale: clampScale(prevZoomLevel(state.uiScale)) }),
  resetZoom: () => setState({ uiScale: 1 }),

  windowControlsStyle: 'standard',
  setWindowControlsStyle: (v) => setState({ windowControlsStyle: v }),
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function getSnapshot(): AppState {
  return state
}

export function syncGalleryTheme() {
  syncHTMLAttributes({
    neonLevel: state.neonLevel,
    theme: state.theme,
    transparencyEnabled: state.transparencyEnabled,
    accentColor: state.accentColor,
    borderRadius: state.borderRadius,
    fontFamily: state.fontFamily,
    uiScale: state.uiScale,
  })
}

export function useAppStore(): AppState
export function useAppStore<T>(selector: (s: AppState) => T): T
export function useAppStore<T>(selector?: (s: AppState) => T): T | AppState {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return selector ? selector(snap) : snap
}

export function neonGlow(
  level: NeonLevel,
  color = 'var(--accent-glow)',
  sizes: { full?: string; mini?: string } = {},
): string {
  const { full = '10px 0', mini = '4px 0' } = sizes
  if (level === 'full') return `0 0 ${full} ${color}`
  if (level === 'mini') return `0 0 ${mini} ${color}`
  return 'none'
}

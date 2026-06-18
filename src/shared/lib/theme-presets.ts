export interface AccentPreset {
  key: string
  label: string
  main: string
  bright: string
  dim: string
  glow: string
  subtle: string
}

function withAlpha(color: string, alpha: number): string {
  const hex = color.match(/^#([0-9a-f]{6})$/i)
  if (hex) {
    const raw = hex[1]
    const r = Number.parseInt(raw.slice(0, 2), 16)
    const g = Number.parseInt(raw.slice(2, 4), 16)
    const b = Number.parseInt(raw.slice(4, 6), 16)
    return `rgb(${r} ${g} ${b} / ${alpha})`
  }

  return color.replace(')', ` / ${alpha})`)
}

function preset(
  key: string,
  label: string,
  shade400: string,
  shade500: string,
  shade700: string,
): AccentPreset {
  return {
    key,
    label,
    main: shade500,
    bright: shade400,
    dim: shade700,
    glow: withAlpha(shade500, 0.35),
    subtle: withAlpha(shade500, 0.08),
  }
}

export const ACCENT_PRESETS: AccentPreset[] = [
  preset('coral',   'Coral',   '#f0a088',                    '#e87058',                    '#d9624a'),
  preset('red',     'Red',     'oklch(70.4% 0.191 22.216)',  'oklch(63.7% 0.237 25.331)',  'oklch(50.5% 0.213 27.518)'),
  preset('orange',  'Orange',  'oklch(75% 0.183 55.934)',    'oklch(70.5% 0.213 47.604)',  'oklch(55.3% 0.195 38.402)'),
  preset('amber',   'Amber',   'oklch(82.8% 0.189 84.429)',  'oklch(76.9% 0.188 70.08)',   'oklch(55.5% 0.163 48.998)'),
  preset('yellow',  'Yellow',  'oklch(85.2% 0.199 91.936)',  'oklch(79.5% 0.184 86.047)',  'oklch(55.4% 0.135 66.442)'),
  preset('lime',    'Lime',    'oklch(84.1% 0.238 128.85)',  'oklch(76.8% 0.233 130.85)',  'oklch(53.2% 0.157 131.589)'),
  preset('green',   'Green',   'oklch(79.2% 0.209 151.711)', 'oklch(72.3% 0.219 149.579)', 'oklch(52.7% 0.154 150.069)'),
  preset('emerald', 'Emerald', 'oklch(76.5% 0.177 163.223)', 'oklch(69.6% 0.17 162.48)',   'oklch(50.8% 0.118 165.612)'),
  preset('teal',    'Teal',    'oklch(77.7% 0.152 181.912)', 'oklch(70.4% 0.14 182.503)',  'oklch(51.1% 0.096 186.391)'),
  preset('cyan',    'Cyan',    'oklch(78.9% 0.154 211.53)',  'oklch(71.5% 0.143 215.221)', 'oklch(52% 0.105 223.128)'),
  preset('sky',     'Sky',     'oklch(74.6% 0.16 232.661)',  'oklch(68.5% 0.169 237.323)', 'oklch(50% 0.134 242.749)'),
  preset('blue',    'Blue',    'oklch(70.7% 0.165 254.624)', 'oklch(62.3% 0.214 259.815)', 'oklch(48.8% 0.243 264.376)'),
  preset('indigo',  'Indigo',  'oklch(67.3% 0.182 276.935)', 'oklch(58.5% 0.233 277.117)', 'oklch(45.7% 0.24 277.023)'),
  preset('violet',  'Violet',  'oklch(70.2% 0.183 293.541)', 'oklch(60.6% 0.25 292.717)',  'oklch(49.1% 0.27 292.581)'),
  preset('purple',  'Purple',  'oklch(71.4% 0.203 305.504)', 'oklch(62.7% 0.265 303.9)',   'oklch(49.6% 0.265 301.924)'),
  preset('fuchsia', 'Fuchsia', 'oklch(74% 0.238 322.16)',    'oklch(66.7% 0.295 322.15)',  'oklch(51.8% 0.253 323.949)'),
  preset('pink',    'Pink',    'oklch(71.8% 0.202 349.761)', 'oklch(65.6% 0.241 354.308)', 'oklch(52.5% 0.223 3.958)'),
  preset('rose',    'Rose',    'oklch(71.2% 0.194 13.428)',  'oklch(64.5% 0.246 16.439)',  'oklch(51.4% 0.222 16.935)'),
  preset('slate',   'Slate',   'oklch(70.4% 0.04 256.788)',  'oklch(55.4% 0.046 257.417)', 'oklch(37.2% 0.044 257.287)'),
  preset('zinc',    'Zinc',    'oklch(70.5% 0.015 286.067)', 'oklch(55.2% 0.016 285.938)', 'oklch(37% 0.013 285.805)'),
]

export const CONTRAST_KEY = 'contrast'

const CONTRAST_DARK: AccentPreset = {
  key: CONTRAST_KEY,
  label: 'Contrast',
  main: 'oklch(96.5% 0 0)',
  bright: 'oklch(100% 0 0)',
  dim: 'oklch(80% 0 0)',
  glow: 'oklch(96.5% 0 0 / 0.25)',
  subtle: 'oklch(96.5% 0 0 / 0.06)',
}

const CONTRAST_LIGHT: AccentPreset = {
  key: CONTRAST_KEY,
  label: 'Contrast',
  main: 'oklch(23% 0 0)',
  bright: 'oklch(15% 0 0)',
  dim: 'oklch(40% 0 0)',
  glow: 'oklch(23% 0 0 / 0.2)',
  subtle: 'oklch(23% 0 0 / 0.06)',
}

export const ALL_ACCENT_PRESETS: AccentPreset[] = [
  ...ACCENT_PRESETS,
  CONTRAST_DARK,
]

export const DEFAULT_ACCENT = 'coral'

function getLightness(oklch: string): number {
  const m = oklch.match(/oklch\((\d+(?:\.\d+)?)%/)
  return m ? parseFloat(m[1]) : 50
}

function getContrastPreset(): AccentPreset {
  const theme = document.documentElement.getAttribute('data-theme')
  return theme === 'light' ? CONTRAST_LIGHT : CONTRAST_DARK
}

export function applyAccent(key: string): void {
  if (typeof document === 'undefined') return

  let p: AccentPreset

  if (key === CONTRAST_KEY) {
    p = getContrastPreset()
  } else {
    p =
      ACCENT_PRESETS.find((x) => x.key === key) ??
      ACCENT_PRESETS.find((x) => x.key === DEFAULT_ACCENT) ??
      CONTRAST_DARK
  }

  const fg = getLightness(p.main) > 65 ? 'oklch(15% 0 0)' : 'oklch(100% 0 0)'

  const root = document.documentElement
  root.style.setProperty('--accent', p.main)
  root.style.setProperty('--accent-text', p.main)
  root.style.setProperty('--accent-hover', p.dim)
  root.style.setProperty('--accent-bright', p.bright)
  root.style.setProperty('--accent-dim', p.dim)
  root.style.setProperty('--accent-glow', p.glow)
  root.style.setProperty('--accent-subtle', p.subtle)
  root.style.setProperty('--accent-border', withAlpha(p.main, 0.25))
  root.style.setProperty('--accent-fg', fg)
  root.style.setProperty('--primary', p.main)
  root.style.setProperty('--primary-foreground', fg)
  root.style.setProperty('--ring', p.main)
}

export interface RadiusPreset {
  key: string
  label: string
  value: string
}

export const RADIUS_PRESETS: RadiusPreset[] = [
  { key: 'none', label: 'None', value: '0px' },
  { key: 'sm', label: 'Small', value: '0.375rem' },
  { key: 'md', label: 'Medium', value: '0.625rem' },
  { key: 'lg', label: 'Large', value: '0.875rem' },
  { key: 'xl', label: 'Extra', value: '1.25rem' },
]

export const DEFAULT_RADIUS = 'xl'

export function applyRadius(key: string): void {
  if (typeof document === 'undefined') return
  const p =
    RADIUS_PRESETS.find((x) => x.key === key) ??
    RADIUS_PRESETS.find((x) => x.key === DEFAULT_RADIUS)!
  document.documentElement.style.setProperty('--radius', p.value)
  window.dispatchEvent(new CustomEvent('theme:tokens-changed'))
}

export interface FontPreset {
  key: string
  label: string
  value: string
}

export const FONT_PRESETS: FontPreset[] = [
  { key: 'inter', label: 'Inter', value: "var(--font-body), 'Inter', 'Segoe UI Variable', 'Segoe UI', system-ui, -apple-system, sans-serif" },
  { key: 'system', label: 'System', value: "system-ui, -apple-system, 'Segoe UI Variable', 'Segoe UI', sans-serif" },
  { key: 'segoe', label: 'Segoe UI', value: "'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif" },
  { key: 'mono', label: 'Mono', value: "var(--font-mono), 'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace" },
  { key: 'serif', label: 'Serif', value: "var(--font-serif), Georgia, 'Times New Roman', serif" },
]

export const DEFAULT_FONT = 'mono'

export function applyFont(key: string): void {
  if (typeof document === 'undefined') return
  const p =
    FONT_PRESETS.find((x) => x.key === key) ??
    FONT_PRESETS.find((x) => x.key === DEFAULT_FONT)!
  document.documentElement.style.setProperty('--font-sans', p.value)
  window.dispatchEvent(new CustomEvent('theme:tokens-changed'))
}

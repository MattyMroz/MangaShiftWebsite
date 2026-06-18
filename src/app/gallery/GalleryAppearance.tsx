'use client'

import { Moon, Palette, Settings, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { neonGlow, type NeonLevel, useAppStore } from '@/stores/useAppStore'
import {
  ALL_ACCENT_PRESETS,
  CONTRAST_KEY,
  FONT_PRESETS,
  RADIUS_PRESETS,
} from '@/shared/lib/theme-presets'
import { SettingRow } from '@/shared/ui/lib/SettingRow'
import { SlidingScrollList } from '@/shared/ui/lib/SlidingScrollList'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/lib/Tabs'

const NEON_OPTIONS: { value: NeonLevel; label: string }[] = [
  { value: 'off', label: 'Off' },
  { value: 'mini', label: 'Mini' },
  { value: 'full', label: 'Full' },
]

function AccentColorPicker() {
  const { accentColor, setAccentColor, neonLevel, theme } = useAppStore()

  return (
    <SlidingScrollList
      className="-mx-3 -my-2"
      showScrollbar={false}
      captureWheel={false}
      fade={false}
      activeKey={accentColor}
      activeBg="transparent"
      viewportClassName="rounded-none px-3 py-3"
    >
      <div className="flex flex-wrap gap-1.5">
        {ALL_ACCENT_PRESETS.map((color) => {
          const isActive = accentColor === color.key
          const isContrast = color.key === CONTRAST_KEY
          const dotColor = isContrast
            ? theme === 'dark'
              ? 'oklch(96.5% 0 0)'
              : 'oklch(23% 0 0)'
            : color.main
          const dotGlow = isContrast
            ? theme === 'dark'
              ? 'rgba(255,255,255,0.3)'
              : 'rgba(0,0,0,0.2)'
            : color.glow

          return (
            <button
              key={color.key}
              data-sliding-item
              data-sliding-key={color.key}
              type="button"
              onClick={() => setAccentColor(color.key)}
              className={cn(
                'group relative z-[1] flex items-center gap-1.5 rounded-full px-2.5 py-1',
                'border transition-[background,border-color,box-shadow,color] duration-[var(--motion-base)]',
                'text-xs font-medium btn-press',
                isActive
                  ? 'text-foreground hover:brightness-110'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              style={
                isActive
                  ? {
                      background: isContrast ? (theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : color.subtle,
                      borderColor: dotGlow,
                      boxShadow: neonGlow(neonLevel, dotGlow),
                    }
                  : {
                      background: 'var(--btn-bg)',
                      borderColor: 'var(--btn-border)',
                    }
              }
              aria-label={`Accent color: ${color.label}`}
              aria-pressed={isActive}
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full transition-transform duration-[var(--motion-base)]"
                style={{
                  background: dotColor,
                  boxShadow: isActive
                    ? neonLevel !== 'off'
                      ? `0 0 8px ${dotGlow}`
                      : `0 0 3px ${dotGlow}`
                    : `0 0 2px ${dotGlow}`,
                  transform: isActive ? 'scale(1.15)' : undefined,
                }}
              />
              <span>{color.label}</span>
            </button>
          )
        })}
      </div>
    </SlidingScrollList>
  )
}

function NeonLevelSelector() {
  const { neonLevel, setNeonLevel } = useAppStore()

  return (
    <Tabs value={neonLevel} onValueChange={(v) => setNeonLevel(v as NeonLevel)}>
      <TabsList>
        {NEON_OPTIONS.map((opt) => (
          <TabsTrigger key={opt.value} value={opt.value} className="px-3 text-xs font-semibold">
            {opt.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

function RadiusSelector() {
  const { borderRadius, setBorderRadius } = useAppStore()

  return (
    <Tabs value={borderRadius} onValueChange={setBorderRadius}>
      <TabsList>
        {RADIUS_PRESETS.map((preset) => (
          <TabsTrigger key={preset.key} value={preset.key} className="px-3 text-xs font-semibold">
            {preset.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

function FontSelector() {
  const { fontFamily, setFontFamily } = useAppStore()

  return (
    <Tabs value={fontFamily} onValueChange={setFontFamily}>
      <TabsList>
        {FONT_PRESETS.map((preset) => (
          <TabsTrigger key={preset.key} value={preset.key} className="px-2 text-xs font-semibold">
            {preset.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export function GalleryAppearance() {
  const {
    neonLevel,
    theme,
    toggleTheme,
  } = useAppStore()

  return (
    <section className="gallery-appearance">
      <div className="gallery-appearance__header">
        <div className="gallery-appearance__icon">
          <Settings size={22} strokeWidth={1.8} />
        </div>
        <div>
          <h1>Settings</h1>
          <p>Configure appearance, pipeline and providers</p>
        </div>
      </div>

      <div className="gallery-appearance__body">
        <div className="gallery-appearance__content">
          <div className="gallery-appearance__title">
            <Palette size={17} strokeWidth={1.8} />
            <h2>Appearance</h2>
          </div>

          <div className="flex flex-col gap-2 px-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-dim">Accent color</p>
            <AccentColorPicker />
          </div>

          <SlidingScrollList
            showScrollbar={false}
            captureWheel={false}
            fade={false}
            viewportClassName="rounded-none"
          >
            <div className="flex flex-col p-1">
              <div data-sliding-item className="relative z-[1] rounded-lg px-3">
                <SettingRow
                  label="Theme"
                  description={theme === 'dark' ? 'Dark theme - elegant and easy on the eyes' : 'Light theme - clean and crisp'}
                  className="py-3"
                >
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={cn(
                      'btn-press surface-btn flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium',
                      'transition-[background,border-color,color] duration-[var(--motion-base)]',
                      'text-muted-foreground hover:text-foreground',
                    )}
                    aria-label="Change theme"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Moon size={13} strokeWidth={1.7} style={{ color: 'var(--accent-bright)' }} />
                        <span>Dark</span>
                      </>
                    ) : (
                      <>
                        <Sun size={13} strokeWidth={1.7} style={{ color: 'var(--accent-bright)' }} />
                        <span>Light</span>
                      </>
                    )}
                  </button>
                </SettingRow>
              </div>

              <div data-sliding-item className="relative z-[1] rounded-lg px-3">
                <SettingRow
                  label="Neon effects"
                  description={
                    neonLevel === 'full'
                      ? 'Full glow, orbs and animated borders'
                      : neonLevel === 'mini'
                        ? 'Subtle glow - soft shine, no animations'
                        : 'No neon effects'
                  }
                  className="py-3"
                >
                  <NeonLevelSelector />
                </SettingRow>
              </div>

              <div data-sliding-item className="relative z-[1] rounded-lg px-3">
                <SettingRow label="Corner radius" description="How rounded element corners appear" className="py-3">
                  <RadiusSelector />
                </SettingRow>
              </div>

              <div data-sliding-item className="relative z-[1] rounded-lg px-3">
                <SettingRow label="Font" description="Interface typeface" className="py-3">
                  <FontSelector />
                </SettingRow>
              </div>
            </div>
          </SlidingScrollList>
        </div>
      </div>
    </section>
  )
}

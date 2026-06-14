# Komponenty z MangaShift (frontend) — referencja

Skopiowane z `MangaShift/frontend/src` (Tauri app: Vite + React 19 + **shadcn/ui** +
radix + cva + tailwind). To **referencja** — przy redesignie przeniosę do `src/` tylko
to, czego faktycznie użyjemy (skill `simple` — chirurgicznie, nie hurtem).

**Wzorzec:** każdy komponent = `cva` (warianty) + `cn()` + radix primitive + `data-slot`.
Uwaga: używają **zbiorczego** pakietu `radix-ui` (np. `import { Dialog } from "radix-ui"`),
nie osobnych `@radix-ui/react-*`. Stylowanie oparte o zmienne CSS (`var(--accent)` itd.) —
dlatego dołączone są `styles/` i `globals.css`.

## Co tu jest
- `ui/` — 80 komponentów shadcn (.tsx)
- `lib/utils.ts` — `cn()` (twMerge + clsx), standardowy shadcn, do skopiowania 1:1
- `styles/` + `globals.css` — zmienne motywu (tokens, theme-light/dark, utilities)
- `components.json` — config shadcn

## ✅ Czyste — gotowe na landing (radix + cva + cn, ZERO Tauri/store)

**Rdzeń:**
`Button` · `Card` · `Accordion` (→ FAQ) · `Dialog` · `Sheet` (→ mobile menu) ·
`Input` · `Textarea` · `Label` · `Checkbox` · `RadioGroup` · `Switch` ·
`Badge` · `Separator` · `Tooltip` · `Avatar` · `Skeleton` · `Spinner` · `Alert` ·
`Tabs` · `Collapsible` · `AspectRatio` (→ ramka demo wideo)

**Opcjonalne:** `NavigationMenu` · `HoverCard` · `Popover` · `DropdownMenu` ·
`ScrollArea` · `Progress` · `Toggle`/`ToggleGroup` · `ButtonGroup` · `InputGroup` ·
`Kbd` · `Breadcrumb` · `Pagination`

**Formularz z walidacją:** `Form` + `FormField` (wymaga react-hook-form + zod)

## ⚠️ Zależne od store/query — wymagają przeróbki (wyciąć useAppStore/query)
`NeonOrbs` (⭐ fajne animowane tło hero — wystarczy usunąć store i dać propsy) ·
`PageHeader` · `SectionCard` · `Sonner` · `SplashScreen` · `SlidingCommand`

## ❌ Pominąć — desktop/ciężkie, bez sensu na landingu
`Calendar` (react-day-picker) · `Chart` (recharts) · `Command`/`Combobox` (cmdk) ·
`Carousel` (embla) · `Drawer` (vaul) · `InputOtp` · `Resizable` · `Table` · `Menubar` ·
`ContextMenu` · cała rodzina `Sliding*` (use-gesture, desktop) · `ApiKeyInput` ·
`VoiceListItem` · `SettingRow` · `SliderRow` · `Confirm*Dialog` · `StatusCard` ·
`LoadingBar` · `EmptyState` · `OverflowMenubar` · `RoundedScrollList` · `AppIcon`

## Zależności do instalacji (jeśli przenosimy czysty rdzeń)
```bash
bun add radix-ui class-variance-authority clsx tailwind-merge lucide-react
```
Wersje z ich package.json: `radix-ui@^1.4.3`, `class-variance-authority@^0.7.1`,
`clsx@^2.1.1`, `tailwind-merge@^3.5.0`, `lucide-react@^1.14.0` (+ `tw-animate-css` na
animacje accordion/dialog). Doinstalować pod konkretny komponent: Form → react-hook-form
+ @hookform/resolvers + zod.

## ⭐ Custom warte uwagi
- **`NeonOrbs.tsx`** — 3 rozmyte (`blur-[11vw]`), animowane kule w kolorze akcentu.
  Tanie animowane tło hero. Trzeba usunąć `useAppStore`, podać poziom/theme propsem.
- **`Dialog`/`Sheet`** — ładny glass-morphism (backdrop-blur + gradientowy top-border).
- **`Sliding*`** — autorski "płynny wskaźnik" jadący za aktywnym elementem (efektowny,
  ale spory kod; tylko jeśli chcemy animowany nav).

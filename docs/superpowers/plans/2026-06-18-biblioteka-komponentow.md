# Biblioteka komponentów + zunifikowany Button — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Przenieść 80 komponentów mangashift do projektu jako kanoniczny system UI (papier/koral), zunifikować Button (baza mangashift, landing=wyjątek przez skalę całego elementu), bez psucia obecnego landingu.

**Architecture:** Most CSS tokenów — adoptujemy strukturę tokenów mangashift (shadcn semantic + motion + radius + `@theme inline`) wypełnioną naszymi editorial wartościami; nasze obecne tokeny zostają jako żywa warstwa zgodności. Komponenty mangashift lądują w `src/shared/ui/lib/`, czytają tokeny przez most. Button jest unifikowany jako wzorzec; reszta mechanicznie.

**Tech Stack:** Next.js 16 (App Router, Turbopack, `output: 'export'`), React 19, TypeScript strict, Tailwind v4, framer-motion, **+radix-ui, +class-variance-authority, +lucide-react, +tw-animate-css**. Manager: **bun** (nigdy npm/yarn).

## Global Constraints

- **bun only.** `bun add`, `bun run build/type-check/lint`. Nigdy npm/yarn.
- **Pliki UTF-8 (LF).** NIGDY nie edytuj przez PowerShell (`Get/Set-Content`, `Out-File`) — niszczy polskie znaki. Tylko Edit/Write.
- **Frontend bez komentarzy.** Kod tłumaczy się sam. Żadnych rozwlekłych bloków.
- **TypeScript strict.** Wszystko `bun run type-check` zielone.
- **Branch:** `feature/component-library` od `main`. NIE mieszać z czekającymi PR #1/#2.
- **Commit:** Conventional Commits `type(scope): opis`, tryb rozkazujący, lowercase, ≤72 zn. BEZ stopki `Co-Authored-By`. Commit/push tylko gdy user prosi — w tym planie commitujemy lokalnie po każdym tasku (push osobno).
- **„Test" = build + wizualna weryfikacja.** Front statyczny bez unit testów. Każdy task kończy się `bun run type-check` + (gdy dotyczy UI) screenshotem przez CDP/full-page-screenshot. Skill `verify`: dowód = uruchomiona apka, nie typecheck sam w sobie.
- **Wartości tokenów** — patrz spec `docs/superpowers/specs/2026-06-18-biblioteka-komponentow-design.md` §3.1 (tabela mostu).
- **Layout buttona domyślny.** Żadnych padding-hacków per-miejsce; rozmiar skaluje cały element.
- `tsconfig` paths: `@/*`→`src/*`, `@/shared/*`→`src/shared/*`. Brak `@/lib/*` — komponenty mangashift importują `@/lib/utils` (74 pliki) → rozwiązane w Task 4 przez reeksport `src/lib/utils.ts`.

---

## File Structure

**Tworzone:**
- `src/app/styles/tokens.css` — `@theme inline` (most Tailwind↔vars) + radius + motion (z mangashift, ~bez zmian)
- `src/app/styles/theme.css` — wartości semantyczne shadcn = nasze editorial (papier/koral)
- `src/app/styles/utilities.css` — `.glass .section-card .btn-press .neon-* .surface-*` (z mangashift)
- `src/lib/utils.ts` — reeksport `cn` z `@/shared/lib/utils/cn` (most importu dla komponentów mangashift)
- `src/shared/ui/lib/*.tsx` — 79 komponentów mangashift (Button osobno, Task 6)
- `src/app/gallery/page.tsx` — strona-próbka galerii (weryfikacja + dowód przebarwiania)

**Modyfikowane:**
- `src/app/globals.css` — staje się orkiestratorem `@import`; usuń martwe aliasy `--primary/--secondary`; dopisz most/editorial (lub przenieś do styles/)
- `src/shared/ui/Button/Button.tsx` — zunifikowany (baza mangashift + warianty + rozmiary, landing przez `accent`+`lg/pill`)
- 17 wywołań Buttona na landingu (mapowanie wariantów — Task 7)
- `package.json` — +4 zależności

---

## Faza 0 — Branch i zależności

### Task 1: Branch `feature/component-library` + zależności

**Files:**
- Modify: `package.json` (+`radix-ui`, +`class-variance-authority`, +`lucide-react`, +`tw-animate-css`)

**Interfaces:**
- Produces: czysty branch od main; dostępne `cva`, `radix-ui`, `lucide-react`, import `tw-animate-css`.

- [ ] **Step 1: Utwórz branch od main**

```bash
git checkout main
git pull --ff-only        # jeśli main ma być świeży; pomiń jeśli offline
git checkout -b feature/component-library
```
Jeśli main niezsynchronizowany z czekającymi PR — branchuj od obecnego HEAD `refactor/reusable-ui-phase-2` zamiast main (zawiera spec+skille). Ustal z userem; domyślnie od `main`.

- [ ] **Step 2: Dodaj zależności**

```bash
bun add radix-ui class-variance-authority lucide-react tw-animate-css
```
Expected: `package.json` dependencies zawiera 4 nowe wpisy; `bun.lock` zaktualizowany.

- [ ] **Step 3: Weryfikuj że build dalej przechodzi (baseline)**

```bash
bun run type-check && bun run build
```
Expected: oba zielone (zależności dodane, jeszcze nieużywane — nic się nie zmienia wizualnie).

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lock
git commit -m "chore(deps): dodaj radix-ui, cva, lucide-react, tw-animate-css"
```

---

## Faza 1 — Fundament CSS (most tokenów). NAJWIĘKSZE RYZYKO — najpierw, z weryfikacją 1:1.

### Task 2: Reorganizacja globals.css na strukturę styles/ + most tokenów

**Files:**
- Create: `src/app/styles/tokens.css`, `src/app/styles/theme.css`, `src/app/styles/utilities.css`
- Modify: `src/app/globals.css` (orkiestrator + nasze editorial tokeny/klasy + usunięcie martwych aliasów)

**Interfaces:**
- Consumes: nic (fundament).
- Produces: tokeny shadcn (`--background --foreground --card --primary --primary-foreground --secondary --muted --muted-foreground --accent --accent-fg --accent-bright --accent-glow --accent-subtle --accent-border --border --input --ring --btn-bg --btn-border --btn-hover --overlay --overlay-hover --destructive --radius --motion-fast/base/slide/emphasized --ease-*`) z naszymi wartościami; Tailwind utilities `text-foreground bg-primary text-muted-foreground border-border` przez `@theme inline`; klasy `.glass .section-card .btn-press .surface-*`. Nasze obecne tokeny (`--text --line --surface --bg --accent-text --radius-* --shadow-* --*-font-size` itd.) ZOSTAJĄ.

- [ ] **Step 1: Potwierdź martwe aliasy (przed usunięciem)**

```bash
rg "var\(--primary\)|var\(--secondary\)|var\(--primary-hover\)|var\(--secondary-hover\)|var\(--accent-primary\)" src/
```
Expected: brak wyników (potwierdza martwość). Jeśli są wyniki — NIE usuwaj tych aliasów, przemapuj. `--text-primary/--bg-primary/--border-primary` ZOSTAJĄ (są używane).

- [ ] **Step 2: Utwórz `src/app/styles/tokens.css`**

Skopiuj z `docs/design/komponenty/mangashift/styles/tokens.css` blok `@theme inline` (most `--color-*`, radius scale) + `@theme` (motion, easings). USUŃ sekcje: sidebar, charts, neon (`--color-sidebar-*`, `--color-chart-*`) — YAGNI dla landingu (galeria ich nie potrzebuje na start; dodać gdy zajdzie). Zostaw: surface hierarchy, radius scale, shadcn semantic colors, font-sans (zostaw nasz `--font-display` mapping — NIE Inter), motion, easings.

Treść (dostosowana):
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-surface: var(--surface);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
}

@theme {
  --motion-fast: 50ms;
  --motion-base: 100ms;
  --motion-slide: 150ms;
  --motion-emphasized: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-emphasized: cubic-bezier(0.3, 0, 0, 1);
}
```
UWAGA kolizja: nasz globals.css ma już `--surface` i `@theme inline` musi mieć `--color-surface: var(--surface)` żeby `bg-surface` działało — OK. Ale `--secondary` w `@theme inline` mapuje na nasz NOWY `--secondary` (neutralny, nie `--accent-2`) — patrz Step 4.

- [ ] **Step 3: Utwórz `src/app/styles/theme.css` — wartości shadcn = nasze editorial**

```css
:root {
  /* most shadcn — wartości wprost (papier/koral) */
  --background: #f3efe6;
  --foreground: #191815;
  --card: #faf7f0;
  --card-foreground: #191815;
  --popover: #faf7f0;
  --popover-foreground: #191815;
  --primary: #e87058;
  --primary-foreground: #ffffff;
  --secondary: #e8e2d8;
  --secondary-foreground: #191815;
  --muted: #e8e2d8;
  --muted-foreground: #625e56;
  --accent-foreground: #ffffff;
  --destructive: #c0492f;
  --border: rgba(25, 24, 21, 0.14);
  --input: rgba(25, 24, 21, 0.10);
  --ring: #e87058;

  /* akcent — warianty których szuka Button/Badge mangashift */
  --accent-bright: #f0a088;
  --accent-dim: #d9624a;
  --accent-glow: rgba(232, 112, 88, 0.35);
  --accent-subtle: rgba(232, 112, 88, 0.08);
  --accent-border: rgba(232, 112, 88, 0.25);

  /* przyciski / interakcje — tusz na papierze (NIE biel mangashift) */
  --elevated: #e8e2d8;
  --btn-bg: rgba(25, 24, 21, 0.05);
  --btn-border: rgba(25, 24, 21, 0.14);
  --btn-hover: rgba(25, 24, 21, 0.09);
  --overlay: rgba(25, 24, 21, 0.05);
  --overlay-hover: rgba(25, 24, 21, 0.09);
  --row-bg: rgba(25, 24, 21, 0.04);
  --row-border: rgba(25, 24, 21, 0.10);
  --glass-bg: rgba(250, 247, 240, 0.85);
  --glass-bg-subtle: rgba(250, 247, 240, 0.70);
  --glass-border: rgba(25, 24, 21, 0.12);
  --glass-border-subtle: rgba(25, 24, 21, 0.08);

  /* section-card (utilities.css ich używa) */
  --section-card-bg: rgba(250, 247, 240, 0.85);
  --section-card-border: rgba(25, 24, 21, 0.12);
  --section-card-hover-border: rgba(25, 24, 21, 0.18);
  --section-card-shadow: 0 1px 8px rgba(38, 31, 29, 0.06);
  --section-card-bg-nested: #e8e2d8;
  --section-card-border-nested: rgba(25, 24, 21, 0.14);

  --radius: 0.8rem;
  --neon: 0;
}
```
UWAGA: `--accent` NIE jest tu definiowany — już istnieje w globals.css jako `#e87058` (koral). theme.css go nie dubluje (uniknięcie rozjazdu — jedno źródło korala). Jeśli kolejność `@import` powoduje że globals `--accent` jest po theme.css, OK (oba = koral).

- [ ] **Step 4: Utwórz `src/app/styles/utilities.css`**

Skopiuj z `docs/design/komponenty/mangashift/styles/utilities.css` TYLKO bloki potrzebne galerii, BEZ neon/orb (YAGNI landing): `.btn-press` (+`[data-pressing]`), `.scrollbar-none`, `.surface-btn/.surface-row/.surface-hover`, `.glass/.glass-subtle`, `.section-card` (+nested + `[data-slot]`), `.animate-fade-in/.animate-slide-up/.animate-scale-in/.animate-slide-down` + ich `@keyframes`, `.stagger-1..6`. POMIŃ: neon-glow/text/border, orb, gradient-text, glass-sidebar, accent-top-line, loading-slide, pulse-neon, window-focused (app-only). Wszystko w `@layer utilities`.

- [ ] **Step 5: Przebuduj `globals.css` na orkiestrator**

Na górze pliku, PO `@import "tailwindcss";`:
```css
@import "tailwindcss";
@import "tw-animate-css";
@import "./styles/tokens.css";
@import "./styles/theme.css";
@import "./styles/utilities.css";
```
W `:root` USUŃ martwe aliasy (potwierdzone w Step 1): `--primary`, `--primary-hover`, `--secondary`, `--secondary-hover`, `--accent-primary` (linie ~31-35). ZOSTAW wszystko inne (`--bg --surface --text --accent --line --radius-* --*-font-size --bg-primary --text-primary --border-primary` itd.). Editorial klasy (`.display .eyebrow .section-kicker .paper-frame .dot-grid .hairline .ring .numero .on-dark` + keyframes `live-ping`) ZOSTAJĄ w globals.css (nie przenosimy — chirurgicznie).

- [ ] **Step 6: type-check + build**

```bash
bun run type-check && bun run build
```
Expected: oba zielone. Jeśli błąd „cannot resolve tw-animate-css" — pakiet z Task 1; jeśli `@import` order error — `tailwindcss` musi być pierwszy.

- [ ] **Step 7: Weryfikacja wizualna — landing 1:1**

```bash
bun run dev   # w tle
```
Zrób screenshot strony (full-page-screenshot / CDP na http://localhost:3000). Porównaj z obecnym wyglądem: papier, koral, Hero, sekcje, Join Beta — wszystko jak teraz. **Kryterium: zero regresji wizualnej.** Jeśli coś się zmieniło (np. tło, kolor tekstu) — `--background/--foreground` rozjechały się z `--bg/--text`; popraw most.

- [ ] **Step 8: Commit**

```bash
git add src/app/globals.css src/app/styles/
git commit -m "feat(css): most tokenow mangashift na editorial wartosci (papier/koral)"
```

---

## Faza 2 — Most importu cn

### Task 3: `src/lib/utils.ts` reeksport cn

**Files:**
- Create: `src/lib/utils.ts`

**Interfaces:**
- Consumes: `@/shared/lib/utils/cn` (istniejący `cn`).
- Produces: `@/lib/utils` eksportuje `cn` — komponenty mangashift (74 pliki importują `@/lib/utils`) działają bez sed.

- [ ] **Step 1: Utwórz reeksport**

`src/lib/utils.ts`:
```ts
export { cn } from '@/shared/lib/utils/cn';
```
Wymaga aliasu `@/lib/*`. tsconfig ma `@/*`→`src/*`, więc `@/lib/utils`→`src/lib/utils` rozwiązuje się automatycznie (nie trzeba nowego aliasu). Zweryfikuj.

- [ ] **Step 2: type-check**

```bash
bun run type-check
```
Expected: zielone (plik nieużywany jeszcze, ale poprawny).

- [ ] **Step 3: Commit**

```bash
git add src/lib/utils.ts
git commit -m "feat(lib): reeksport cn pod @/lib/utils dla komponentow mangashift"
```

---

## Faza 3 — Zunifikowany Button (wzorzec referencyjny)

### Task 4: Button — baza mangashift + warianty + rozmiary skalujące cały element

**Files:**
- Modify: `src/shared/ui/Button/Button.tsx` (pełne przepisanie na bazę mangashift)
- Reference: `docs/design/komponenty/mangashift/ui/Button.tsx`

**Interfaces:**
- Consumes: `cn` z `@/shared/lib/utils/cn`, `cva` z `class-variance-authority`, `Slot` z `radix-ui`.
- Produces: `Button` z propami `variant?: 'default'|'accent'|'destructive'|'outline'|'secondary'|'ghost'|'link'`, `size?: 'sm'|'default'|'lg'|'pill'|'icon'|'icon-sm'|'icon-lg'`, `asChild?: boolean`, `buttonVariants`. Eksport nazwany `{ Button, buttonVariants }`.

- [ ] **Step 1: Przepisz Button na cva + radix, rozmiary na nasze tokeny**

`src/shared/ui/Button/Button.tsx`:
```tsx
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';

const buttonVariants = cva(
    "group relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] font-medium tracking-tight outline-none btn-press transition-[color,background-color,border-color,box-shadow] duration-[var(--motion-base)] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.2em]",
    {
        variants: {
            variant: {
                default: 'bg-[var(--btn-bg)] border border-[var(--btn-border)] text-foreground hover:bg-[var(--btn-hover)]',
                accent: 'bg-[var(--accent)] text-[var(--accent-fg)] border border-[var(--accent-bright)] hover:brightness-110',
                destructive: 'bg-[var(--destructive)] text-white hover:brightness-110',
                outline: 'bg-transparent border border-[var(--line-strong)] text-foreground hover:border-[var(--text)]',
                secondary: 'bg-[var(--surface)] border border-[var(--line)] text-foreground hover:bg-[var(--surface-2)]',
                ghost: 'text-foreground hover:bg-[var(--overlay-hover)]',
                link: 'text-[var(--accent-text)] underline-offset-4 hover:underline',
            },
            size: {
                sm: 'px-4 py-2 text-[length:var(--small-font-size)]',
                default: 'px-6 py-3 text-[length:var(--normal-font-size)]',
                lg: 'px-8 py-3.5 md:px-10 md:py-4 text-[length:var(--h3-font-size)]',
                pill: 'rounded-full px-8 py-3.5 md:px-10 md:py-4 text-[length:var(--h3-font-size)]',
                icon: 'size-11',
                'icon-sm': 'size-9',
                'icon-lg': 'size-12',
            },
        },
        defaultVariants: { variant: 'default', size: 'default' },
    },
);

type ButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
    const Comp = asChild ? Slot.Root : 'button';
    return (
        <Comp
            data-slot="button"
            data-variant={variant ?? 'default'}
            data-size={size ?? 'default'}
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Button, buttonVariants };
```
UWAGA: usuwamy framer-motion z Buttona — press przez `.btn-press` (CSS, z utilities.css) + `data-pressing` handler. ALE handler `installGlobalPressFeedback` (mangashift `src/lib/motion.ts`) NIE jest przeniesiony. Decyzja: dla statycznego landingu press przez CSS `:active` zamiast `data-pressing`. Dodaj do `.btn-press` w utilities.css regułę `:active`: `.btn-press:active { transform: scale(0.92); opacity: 0.82; }` (Step 2).

- [ ] **Step 2: Dodaj press przez :active do utilities.css**

W `src/app/styles/utilities.css`, w bloku `.btn-press`:
```css
.btn-press:active {
    transform: scale(0.92);
    opacity: 0.82;
}
```
(zamiast `[data-pressing="true"]` — bez JS handlera).

- [ ] **Step 3: type-check**

```bash
bun run type-check
```
Expected: FAIL — 17 wywołań landingu używa starych wariantów (`hero`/`primary`) których już nie ma. To oczekiwane; naprawiane w Task 5. Jeśli błąd dotyczy samego Button.tsx (np. radix Slot import) — napraw tu.

- [ ] **Step 4: Commit (Button sam w sobie)**

```bash
git add src/shared/ui/Button/Button.tsx src/app/styles/utilities.css
git commit -m "feat(ui): zunifikuj Button na baze mangashift (cva+radix, rozmiar skaluje calosc)"
```

---

### Task 5: Migracja 17 wywołań Buttona na landingu

**Files:**
- Modify: `src/app/signin/page.tsx:106`, `src/widgets/UseCasesSection/ui/UseCasesSection.tsx:139`, `src/widgets/DemoSection/ui/DemoSection.tsx:81,121,131`, `src/widgets/PricingSection/ui/PricingSection.tsx:258,263`, `src/widgets/StatsSection/ui/StatsSection.tsx:87`, `src/widgets/ContactSection/ui/ContactSection.tsx:131`, `src/widgets/Hero/ui/Hero.tsx:68,74`, `src/widgets/Header/ui/Header.tsx:120,163`, `src/widgets/PoweredSection/ui/PoweredSection.tsx:198`

**Interfaces:**
- Consumes: `Button` z Task 4 (warianty `default/accent/.../`, rozmiary `sm/default/lg/pill/...`).

Mapowanie (ze spec §3.2): `hero`→`accent` size `pill` · `primary`→`accent` (gdzie był koralowy CTA) lub `default` · `secondary`→`secondary` · `outline`→`outline` · `ghost`→`ghost` · `link`→`link`. Rozmiary: stare `size="md"`→`default`, `size="lg"`→`lg`, `size="sm"`→`sm`. Join Beta (Header/Contact, `hero`) = `accent` + `pill` (najważniejszy przycisk strony — duży koralowy).

- [ ] **Step 1: Zamień warianty w każdym z 17 miejsc**

Dla każdego pliku zmień `variant="hero"` → `variant="accent" size="pill"` (usuwając stare `size="md/lg"`), `variant="primary"` → `variant="accent"` (CTA) lub `variant="default"`, reszta wg mapowania. Przykład Hero.tsx:68:
```tsx
// było: <Button variant="hero" size="md">
<Button variant="accent" size="pill">
```
Hero.tsx:74 `variant="outline" size="md"` → `variant="outline" size="default"`.

- [ ] **Step 2: type-check**

```bash
bun run type-check
```
Expected: zielone (wszystkie warianty istnieją).

- [ ] **Step 3: build**

```bash
bun run build
```
Expected: zielone.

- [ ] **Step 4: Weryfikacja wizualna landingu (KRYTYCZNE)**

`bun run dev`, screenshot kluczowych sekcji: Hero (CTA), Header (Join Beta), Contact (Join Beta), Demo, Pricing. **Kryterium:** Join Beta / Hero CTA = duże koralowe pille (jak teraz); pozostałe buttony spójne, czytelne, press działa (`:active` scale). Jeśli coś za małe/za duże — popraw rozmiar w wywołaniu (NIE padding-hack — zmień `size`).

- [ ] **Step 5: Commit**

```bash
git add src/app src/widgets
git commit -m "refactor(ui): migruj wywolania Button landingu na nowe warianty (hero->accent+pill)"
```

---

## Faza 4 — Pozostałe 79 komponentów (mechaniczne, partiami)

### Task 6: Przenieś 79 komponentów do src/shared/ui/lib/ (partiami, delegacja)

**Files:**
- Create: `src/shared/ui/lib/*.tsx` (79 plików — wszystkie z `mangashift/ui/` POZA Button.tsx)

**Interfaces:**
- Consumes: tokeny z Task 2, `cn` przez `@/lib/utils` (Task 3) lub `@/shared/lib/utils/cn`.
- Produces: `@/shared/ui/lib/<Nazwa>` importowalne.

Każda partia = grupa komponentów bez wzajemnych zależności poza już-przeniesionymi prymitywami. Kolejność: najpierw bezzależne prymitywy (Badge, Separator, Skeleton, Spinner, Label, Kbd, Avatar, AspectRatio, Progress, Switch, Checkbox...), potem złożone (Dialog, Select, Carousel, Command, Table...). Delegować subagentom — różne pliki = brak konfliktu.

- [ ] **Step 1: Skopiuj partię N do src/shared/ui/lib/**

```bash
cp docs/design/komponenty/mangashift/ui/<Nazwa>.tsx src/shared/ui/lib/<Nazwa>.tsx
```
(dla każdego pliku w partii)

- [ ] **Step 2: Zamień import cn w każdym pliku partii**

W każdym `src/shared/ui/lib/*.tsx`: `import { cn } from "@/lib/utils"` zostaje (działa przez Task 3) LUB zmień na `@/shared/lib/utils/cn`. Wewnętrzne importy komponent-do-komponentu (`@/components/ui/X`) → `@/shared/ui/lib/X`. Sprawdź `rg "@/components" src/shared/ui/lib/`.

- [ ] **Step 3: type-check po partii**

```bash
bun run type-check
```
Expected: zielone po każdej partii. Błędy: brakujący lucide-ikon import (jest w Task 1), brakujący komponent-zależność (przenieś go w tej partii).

- [ ] **Step 4: Commit partii**

```bash
git add src/shared/ui/lib/
git commit -m "feat(ui): przenies komponenty mangashift partia N (<nazwy>)"
```

Powtórz Step 1-4 dla kolejnych partii aż wszystkie 79 przeniesione. Po ostatniej:

- [ ] **Step 5: build całości**

```bash
bun run build
```
Expected: zielone. `rg "@/components|@/lib/motion|@/hooks|@/store" src/shared/ui/lib/` — brak wyników (wszystkie wewnętrzne ścieżki przemapowane). Jeśli komponent zależy od store/hooks mangashift (np. SlidingMenubar od useAppStore) — oznacz jako wymagający osobnego portu lub pomiń (YAGNI; udokumentuj w komentarzu commita które pominięto).

---

## Faza 5 — Galeria-próbka i dowód

### Task 7: Strona galerii + weryfikacja przebarwiania

**Files:**
- Create: `src/app/gallery/page.tsx`

**Interfaces:**
- Consumes: `Button` (`@/shared/ui/Button/Button`), próbka z `@/shared/ui/lib/*` (np. Dialog, Select, Card, Badge, Checkbox, Switch).

- [ ] **Step 1: Utwórz stronę-próbkę**

`src/app/gallery/page.tsx` — renderuje siatkę: wszystkie warianty Buttona (default/accent/destructive/outline/secondary/ghost/link) × rozmiary (sm/default/lg/pill), + próbka mangashift (Badge wszystkie warianty, Card, Checkbox, Switch, Select otwarty, Dialog trigger). `'use client'`. Statyczny, bez logiki.

- [ ] **Step 2: type-check + build**

```bash
bun run type-check && bun run build
```
Expected: zielone; `out/gallery/index.html` istnieje.

- [ ] **Step 3: Weryfikacja wizualna galerii**

`bun run dev`, screenshot `/gallery`. **Kryterium:** wszystkie komponenty renderują się w kolorach papier/koral (NIE fioletowo-szare mangashift). Button accent = koral, Badge default = koralowy subtle, Card = papier surface, focus ring = koral.

- [ ] **Step 4: Dowód „1 plik kolorystyczny"**

Tymczasowo zmień w `src/app/styles/theme.css` `--primary` i `--accent` (w globals) na np. `#3b82f6` (niebieski). `bun run dev`, screenshot `/gallery` + `/` (landing). **Kryterium:** OBA przebarwiają się na niebiesko (Button accent, Join Beta, Badge, focus ring). Przywróć koral po weryfikacji (`git checkout src/app/styles/theme.css` lub ręcznie).

- [ ] **Step 5: Commit**

```bash
git add src/app/gallery/
git commit -m "feat(gallery): strona-probka komponentow + dowod przebarwiania tokenow"
```

---

## Self-Review (wypełnione przez autora planu)

**Spec coverage:**
- §2 zasada (layout domyślny, skala całości) → Task 4 (rozmiary cva skalują padding+font+radius razem; brak padding-hacków, Task 5 Step 4 egzekwuje).
- §3.1 most tokenów → Task 2 (tokens/theme/utilities + usunięcie martwych aliasów).
- §3.1 base.css nie 1:1 → Task 2 (globals zostaje nasz base; utilities tylko bezpieczne).
- §3.2 Button → Task 4 + 5.
- §3.3 79 komponentów → Task 6.
- §4 zależności → Task 1.
- §5 kryteria sukcesu → Task 2 Step 7 (landing 1:1), Task 5 Step 4 (Join Beta), Task 6 Step 5 (importowalne), Task 7 Step 3 (kolory), Task 7 Step 4 (przebarwianie).
- §6 kolejność faz → Fazy 0-5 w tej kolejności.

**Placeholder scan:** brak TBD/TODO. Każdy krok z kodem ma kod. Task 6 jest świadomie iteracyjny (partie) — wzorzec kroku jest kompletny, powtarzany; nie placeholder.

**Type consistency:** `buttonVariants` eksport nazwany użyty w Task 4; warianty/rozmiary z Task 4 użyte w Task 5 mapowaniu i Task 7 galerii — zgodne (`accent`, `pill`, `default`...). `cn` z `@/shared/lib/utils/cn` (Task 4) i reeksport `@/lib/utils` (Task 3) — spójne.

**Znane ryzyka / decyzje otwarte:**
- Task 1 Step 1: branch od `main` vs od obecnego HEAD (spec+skille są na `refactor/reusable-ui-phase-2`, nie na main). Do potwierdzenia z userem przy starcie.
- Task 6: komponenty zależne od store/hooks/motion mangashift (SlidingMenubar, Sonner, niektóre Sliding*) mogą wymagać pominięcia/portu — YAGNI, udokumentować.
- Press-feel: `:active` CSS zamiast `data-pressing` JS handlera (prostsze, statyczny front).

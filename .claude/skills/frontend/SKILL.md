---
name: frontend
description: "Bun + Vite 8 + TS 6 + React 19 + React Router 7 + Tauri 2 + Tailwind 4 + cva + cn + shadcn + TanStack Query 5 + Zustand 5. USE FOR: budowa/refaktor frontend (komponenty, hooki, stan, routing, IPC), audyt (jakość, a11y, wydajność, bundle), stylowanie UI, decyzje architektoniczne. Tryby: `frontend audit`, `frontend implement`, `frontend refactor`. Powiązane: ui-ux-design."
---

## Kiedy używać

- Budowa lub refaktor komponentów, widoków, flow w React + TypeScript + Tauri
- Analiza istniejącego frontendu (jakość, wydajność, a11y, bundle size)
- Stylowanie UI zgodnie z `.github/skills/ui-ux-design/SKILL.md`
- Decyzje architektoniczne (komponenty, stan, routing, IPC, codegen)
- Workflow Tauri 2 (commands, events, sidecar, capabilities, post-mortem analysis)

---

## Stack Lock (sprawdzony w `frontend/package.json`)

| Warstwa | Pakiety |
|---------|---------|
| **Runtime/build** | Bun + Vite 8 + TypeScript 6.0.3 |
| **UI core** | React 19.2 + react-router 7.15 |
| **Desktop** | Tauri 2.11 + 19 oficjalnych pluginów |
| **Styling** | Tailwind 4.2 + cva 0.7 + clsx 2.1 + tailwind-merge 3.5 + tw-animate-css |
| **UI components** | shadcn 4 + radix-ui 1.4 + lucide-react + cmdk + sonner + vaul + embla-carousel + react-day-picker + input-otp + react-resizable-panels + recharts |
| **State** | TanStack Query 5.100 + zustand 5 + openapi-fetch 0.17 + next-themes 0.4 |
| **Forms** | react-hook-form 7 + @hookform/resolvers + zod 4 |
| **Tooling** | ESLint 10 + typescript-eslint 8 + eslint-plugin-react-hooks + openapi-typescript 7 |

> ⚠️ **Brak w deps:** Vitest, React Testing Library, Playwright, MSW — must-add (patrz References / 07-testing).

---

## Hierarchia źródeł prawdy

Kolejność czytania zanim zaczniesz pracę:

1. **`.github/instructions/typescript.instructions.md`** — always-on baseline (reguły kondensowane, antypatterns, naming, komentarze, JSDoc, error handling)
2. **Ten SKILL.md** — workflow (tryby pracy, fazy, decision frameworks)
3. **`frontend/references/XX-*.md`** — deep-dive per warstwa (TBD — będą dodawane stopniowo)
4. **`.github/skills/ui-ux-design/SKILL.md`** — 37 zasad UI/UX (kolor, typografia, spacing, cienie, prawa UX)
5. **`temp/brain_storm/2026-05-06-frontend-migration/`** — historyczne brainstormy migracji Tailwind 3→4

---

## References (deep-dive per sekcja)

Planowana struktura `frontend/references/` (TBD — dodawane w miarę potrzeb):

| Plik | Zakres |
|------|--------|
| `00-tooling.md` | Bun, Vite 8, tsc, ESLint, scripts, openapi codegen workflow |
| `01-typescript.md` | TS 6 strict, generics, branded types, narrowing, satisfies |
| `02-react-19.md` | Function comp, hooks, useActionState, use(), refs jako props, memo |
| `03-react-router-7.md` | Data router, loaders, actions, useFetcher, lazy routes, errorElement |
| `04-state-management.md` | TanStack Query 5 + Zustand 5 + react-hook-form + zod |
| `05-styling.md` | Tailwind 4 + cva + cn + shadcn + Radix + dark mode + design tokens |
| `06-data-fetching.md` | openapi-fetch + SSE + file upload + error handling |
| `07-testing.md` | Vitest + RTL + Playwright + MSW + testing pyramid |
| `08-tauri.md` | IPC commands/events, sidecar, permissions, security, post-mortem lessons |
| `09-a11y-perf.md` | WCAG 2.2, focus, virtualization, code splitting, bundle, error boundaries |

> Status: SKELETON. Each file będzie tworzony wtedy, gdy konkretna warstwa wymaga głębszej dokumentacji. Baseline pokrywa codzienną pracę.

---

## CSS — podejście

### Tailwind CSS v4 Full Stack

**Tailwind v4 (utility-first) + cva (class-variance-authority) + cn() (clsx + tailwind-merge) + @theme (design tokens oklch).**

Utility classes żyją WEWNĄTRZ komponentów UI. Strony i layouty widzą TYLKO `<Component variant="...">`.

### Dlaczego to

| Podejście | Werdykt | Powód |
|-----------|---------|-------|
| **Tailwind v4 + cva + cn** | ✅ Używamy | ~3x szybsze, AI generuje first try, @theme = CSS variables, shadcn/ui ekosystem, 1 plik/komponent |
| CSS Modules | ⚠️ Edge cases | Tylko rendered content (MDX, CMS HTML). Zwykłe UI = Tailwind |
| @apply | ❌ | Anti-pattern — lepiej `@layer components {}` z vanilla CSS |
| CSS-in-JS (Styled, Emotion) | ❌ | Runtime, martwe w 2026, RSC incompatible |
| PandaCSS / UnoCSS / Sass | ❌ | Mniejszy ekosystem, brak przewagi nad TW v4 |

### Tailwind Discipline — 7 zasad

1. **Utility TYLKO w `components/ui/`** — strony używają komponentów, nie surowych utility
2. **Każdy UI komponent = `cva()`** — warianty centralnie, typesafe
3. **`cn()` do łączenia klas** — NIGDY interpolacja stringów, NIGDY clsx bez twMerge
4. **`@theme` dla tokenów** — NIGDY hardcoded hex/oklch/px w className
5. **Dynamiczne klasy = complete strings** — `bg-red-500` TAK, `` bg-${color}-500 `` NIGDY
6. **Powtarzająca się arbitrary value → nowy token w `@theme`**
7. **`@layer components {}` dla custom CSS** — zamiast @apply (edge cases: animacje, rendered content)

### Struktura projektu

```
src/
├── app/
│   ├── globals.css        ← @import "tailwindcss" + @theme + dark mode
│   ├── layout.tsx
│   └── (routes)/
├── components/
│   ├── ui/                ← Bazowe UI (cva + cn): button, card, input, dialog...
│   ├── layout/            ← Header, Sidebar, Footer
│   └── features/          ← Feature-specific kompozycje
├── lib/utils.ts           ← cn() helper
├── hooks/
├── types/
└── styles/                ← Opcjonalne CSS Modules (rendered content)
```

### Zależności

| Pakiet | Po co |
|--------|-------|
| `tailwindcss` + `@tailwindcss/postcss` lub `@tailwindcss/vite` | Silnik CSS + build |
| `clsx` + `tailwind-merge` | cn() helper — bezpieczne łączenie klas |
| `class-variance-authority` | Typesafe warianty (cva pattern) |

### Plan B

CSS Modules dla edge cases: rendered Markdown/HTML (CMS, MDX), złożone animacje `@keyframes`, 3rd party libs bez Tailwind.

---

## Rola

<role>
Jesteś **Frontend Expertem** — inżynier warstwy klienckiej React + TypeScript + Tauri.

**Kompetencje:**
- HTML5 semantyczny, Tailwind CSS 4 (@theme, @layer, utility-first, oklch), TypeScript 6
- React 19 (function comp, hooks, useActionState, use(), refs jako props, Suspense)
- React Router 7 (data router, loaders, actions, lazy routes, errorElement)
- TanStack Query 5 + Zustand 5 + react-hook-form + zod
- cva + cn() — typowane warianty komponentów (shadcn/ui pattern)
- Tauri 2 (IPC commands/events, sidecar, capabilities, security)
- openapi-fetch + openapi-typescript codegen, SSE, file upload
- Core Web Vitals, lazy loading, code splitting, virtualization
- Dostępność (WCAG 2.2, semantyka, klawiatura, ARIA, kontrast)
- Testing pyramid (Vitest + RTL + Playwright + MSW — must-add)
- Zasady UI/UX z `.github/skills/ui-ux-design/SKILL.md`

**Zasady pracy:**
- Najpierw cel biznesowy + kontekst, potem kod
- ZAWSZE respektuj `.github/instructions/typescript.instructions.md` (always-on baseline)
- UI komponent = 1 plik `.tsx` z `cva()` wariantami — utility WEWNĄTRZ komponentu
- Strony importują KOMPONENTY, nie piszą surowych utility
- Wartości wizualne z `@theme` tokenów — NIGDY hardcoded
- `cn()` do łączenia klas — NIGDY ręczna interpolacja
- Server state → TanStack Query; client state → Zustand; local state → useState
- Każdy interaktywny element: normal, hover, focus-visible, active, disabled
- Po edycji `.ts/.tsx` — sprawdź TypeScript errors PRZED uznaniem za skończone
</role>

---

## Instrukcje

<instructions>

### Faza 1: Rekonesans
1. Zidentyfikuj stack (framework, routing, state).
2. Sprawdź `globals.css` z `@theme {}` i `lib/utils.ts` z `cn()` — zaproponuj jeśli brak.
3. Wypisz wymagania, efekt biznesowy, ryzyka (wydajność, a11y, responsywność, spójność tokenów).

### Faza 2: Plan
1. Rozbij na komponenty i warstwy odpowiedzialności.
2. Stan: lokalny vs. globalny.
3. Tokeny z `@theme` — zaproponuj nowe jeśli brak.
4. Warianty `cva()` (variant, size, state).

### Faza 3: Implementacja
1. Semantyczny HTML, Mobile First (`md:`, `lg:`).
2. Style przez Tailwind utility WEWNĄTRZ `cva()`.
3. Stany: `hover:`, `focus-visible:`, `active:`, `disabled:`.
4. Typy TS + `VariantProps`, loading/error/empty states, `aria-*`.
5. Composability: `className` prop → `cn(base, className)`.
6. Małe komponenty (max ~60 linii z cva).

### Faza 4: Walidacja
1. Responsywność (mobile + desktop).
2. Dostępność: focus ring, kontrast ≥ 4.5:1, role, aria.
3. Tailwind Discipline: surowe utility w page/layout? Interpolacja klas? Hardcoded wartości?
4. Wydajność (re-rendery, bundle size).

### Faza 5: Output
1. Gotowy kod `.tsx` (cva + cn).
2. Nowe tokeny `@theme` jeśli potrzebne.
3. Krótkie uzasadnienie decyzji.
4. Opcjonalne next steps.

</instructions>

---

## Ograniczenia

<constraints>

**Tailwind Discipline (łamanie = fail):**
- ❌ Surowe utility w `page.tsx` / `layout.tsx` (poza kontenerami: `flex`, `gap`, `p-*`)
- ❌ Hardcoded hex/oklch/px w `className` — ZAWSZE token z `@theme`
- ❌ Dynamiczna interpolacja klas: `` bg-${color}-500 `` — ZAWSZE complete strings lub cva
- ❌ `@apply` — użyj `@layer components { .klasa { ... } }`
- ❌ `outline-none` bez zamiennika — focus ring obowiązkowy
- ❌ Pomijanie stanów granicznych (loading, error, empty, disabled)
- ❌ Łamanie semantyki HTML i a11y
- ❌ CSS-in-JS runtime (Styled Components, Emotion)
- ❌ `!important` — kontroluj kaskadę przez `@layer`

**Best practices:**
- ✅ TypeScript + `VariantProps<typeof cva>`
- ✅ Mobile First (`md:` / `lg:`)
- ✅ `cva()` dla UI komponentów z wariantami
- ✅ `cn()` do composability (className prop)
- ✅ `@theme` tokeny — definiujesz raz, używasz wszędzie
- ✅ Kontrast WCAG: ≥ 4.5:1 tekst, ≥ 3:1 duży tekst i UI
- ✅ Zasady UI/UX z `.github/skills/ui-ux-design/SKILL.md`

</constraints>

---

## Tryby pracy

| Tryb | Komenda | Co robi |
|------|---------|---------|
| 🔎 Audit | `frontend audit` | Analizuje frontend: jakość, a11y, wydajność, Tailwind Discipline |
| 🛠 Implement | `frontend implement` | Tworzy komponenty `.tsx` z cva + cn + Tailwind |
| ♻️ Refactor | `frontend refactor` | Migruje na Tailwind / cva pattern, porządkuje kod |

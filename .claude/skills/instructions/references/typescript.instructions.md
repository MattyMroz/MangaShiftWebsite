---
applyTo: "**/*.{ts,tsx,js,jsx,mjs,cjs,css}"
---

# TypeScript / Frontend Master Instructions

> **Skill:** skill `frontend` — meta-plik ze strukturą, opisami sekcji i nawigacją.
> Skondensowana wiedza z 11 sekcji (skill `frontend`, sekcje `references/00-09` + Error Handling inline).
> Hasłowe reguły — pełny kontekst w odpowiedniej sekcji `references/XX-*.md`.

---

## 🎨 UI/UX Design Rules (USER MANDATE)

- **Złota proporcja (1:1.618)** — stosuj w spacingu, podziale paneli, rozmiarach kart. Nie symetryczne 50/50 chyba że uzasadnione.
- **Reuse > tworzenie własnych prymitywów** — najpierw szukaj w `frontend/src/components/ui/*` (shadcn + custom), Component Gallery (`/components`), legacy pages (`/lab/legacy/{ocr,translation,tts}`), Settings, Profiles. Nie pisz własnych klocków bez uzasadnienia.
- **Kompozycja > izolowane "ładne" komponenty** — projektuj LAYOUT całej sekcji, nie izolowane elementy. Komponent ładny w izolacji może wyglądać źle wyrwany z kontekstu.
- **Responsive REQUIRED** — wszystkie ekrany działają na min Tauri (1366×768) i większych.
- **UI scale max 200%** — `useAppStore.uiScale` ograniczony do `max=2.0`.
- **ZERO komentarzy w testach. ZERO komentarzy w kodzie chyba że niezbędne.** JSDoc 1-line tldr only.
- **Strict typing wszędzie** — TS `strict`, zero `any`, każda zmienna typowana.

---

## ✅ Validation Commands (frontend) — MUSI być GREEN per commit

Z katalogu `frontend/`:
1. `bun run typecheck` (`tsc -b` strict) → **0 errors**
2. `bun run lint` (`eslint .`) → **clean**
3. `bun run build` (`tsc -b && vite build`) → **success**
4. `bun run test` (`vitest`, jeśli testy istnieją dla zmienionego obszaru) → **green**

Tauri Rust (gdy zmieniasz `src-tauri/`):
- `cd frontend/src-tauri && cargo check` → kompilacja OK
- `cd frontend/src-tauri && cargo clippy --all-targets -- -D warnings` → clean

Runtime smoke (gdy dotyczy UI flow):
- `bun run dev:api` lub `cargo tauri dev`, kliknij scenariusz, sprawdź `logs/errors.log.jsonl` (musi być pusty od nowych entries)

---

## 📚 Agent Required Reading (przed zmianami frontendowymi)

Każdy subagent pracujący nad frontendem MUSI przeczytać w całości PRZED kodowaniem:
1. ten plik (`references/typescript.instructions.md` w skillu `instructions`)
2. skill `simple` (podstawa)
3. skill `ui-ux-design` + `01-ui-ux-pro-max-skill.md` + `02-anthropic-frontend-design-skill.md` (POMIŃ `BIGSKILL.md`)
4. skill `frontend` (jeśli istotny dla tasku)
5. Aktualny brainstorm UX (np. `temp/brain_storm/2026-05-11-slice1-editor-ux-v2/BRAINSTORM_EDITOR_UX_V2.md`)

Po każdej zmianie kodu: uruchom `bun run typecheck && bun run lint && bun run build`. Jeśli czerwone — fix przed commitem.

---

## 00 — Tooling

- **Bun** — package manager + runtime + bundler. NIGDY `npm install` / `pnpm` / `yarn` w tym repo
- **Vite 8** — dev server + build (`vite` / `vite build` / `vite preview`)
- **TypeScript ~6.0.3** — strict mode obowiązkowo (`tsc -b` dla projektów z references)
- **ESLint 10 + typescript-eslint 8** — `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- **openapi-typescript 7** — codegen typów z OpenAPI schema (`bun run gen:api`)
- **openapi-fetch 0.17** — typed API client (zero ręcznych typów)

### bun — Komendy

- **`bun install`** — instaluj z `bun.lock` (po `git pull`)
- **`bun add <pkg>`** — dodaj do `dependencies`
- **`bun add -d <pkg>`** — dev tools → `devDependencies`
- **`bun remove <pkg>`** — usuń pakiet
- **`bun run <script>`** — uruchom script z `package.json`
- **`bun pm view <pkg> version`** — sprawdź najnowszą wersję
- **Commituj:** `package.json`, `bun.lock` ✅ · `node_modules/` → `.gitignore` ❌

### Scripts (z `frontend/package.json`)

| Script | Co robi |
|--------|---------|
| `bun run dev` | Vite dev server na :5173 (Tauri webview) |
| `bun run dev:api` | concurrently: backend (uvicorn :8721) + Vite |
| `bun run build` | `tsc -b && vite build` (typecheck przed bundle) |
| `bun run lint` | ESLint na całym projekcie |
| `bun run preview` | Preview built bundle |
| `bun run tauri dev` | Tauri dev (Rust + WebView + sidecar) |
| `bun run tauri build` | Tauri build (instalator) |

### tsconfig

- **`strict: true`** + wszystkie strict flags włączone
- **`noUncheckedIndexedAccess: true`** — `arr[0]` ma typ `T | undefined`
- **`exactOptionalPropertyTypes: true`** — `{x?: T}` ≠ `{x: T | undefined}`
- **`paths: {"@/*": ["./src/*"]}`** — alias importów
- **References:** `tsconfig.app.json` (src) + `tsconfig.node.json` (vite/eslint configs)

### Pylance/TS errors discipline

- **Zero errors** — po KAŻDEJ edycji `.ts/.tsx` sprawdź problemy i napraw ZANIM uznasz task za skończony
- **Workflow:** edytuj → check errors → napraw → commituj

**Szczegóły:** skill `frontend` (sekcja `references/00-tooling.md`)

---

## 01 — TypeScript

### Naming conventions

| Element | Konwencja | Przykład |
|---------|-----------|----------|
| Komponenty React | PascalCase | `UserCard`, `ProjectList` |
| Funkcje, zmienne | camelCase | `handleClick`, `userCount` |
| Hooks | camelCase z prefiksem `use` | `useProjects`, `useBackendHealth` |
| Boolean | `is/has/should/can` prefix | `isLoading`, `hasError`, `canSubmit` |
| Stałe modułowe | SCREAMING_SNAKE_CASE | `MAX_RETRIES`, `DEFAULT_PORT` |
| Typy/interfejsy | PascalCase | `User`, `ProjectCreateInput` |
| Generic params | `T`, `U`, `V` lub `TItem`, `TKey` | `Map<TKey, TValue>` |
| Pliki komponentów | PascalCase | `Button.tsx`, `ProjectCard.tsx` |
| Pliki utility/hooks | camelCase | `cn.ts`, `useBackendHealth.ts` |
| Pliki test | colocated `.test.tsx` | `Button.test.tsx` obok `Button.tsx` |
| Folders | kebab-case | `image-workspace/`, `project-detail/` |

### Imports order (auto przez ESLint)

1. Side effects: `import './globals.css'`
2. Node built-ins: `import path from 'node:path'`
3. External libs: `import { useState } from 'react'`
4. Internal alias: `import { cn } from '@/lib/utils'`
5. Relative: `import { Button } from './Button'`
6. Type-only imports: `import type { User } from '@/types'`

**Reguły:**
- `type` imports oddzielone (`import type {...}` lub inline `import { type X }`)
- Named imports preferowane nad default (lepsze refactor, IDE autocomplete)
- **Barrel files (`index.ts`)** — używaj OSTROŻNIE; psują tree-shaking gdy nie są pure re-exports
- **Side-effect imports** zawsze pierwsze

### `type` vs `interface`

- **`type`** — preferuj (composable, union-friendly); `interface` tylko dla declaration merging (rzadkie)
- **Discriminated unions** — `type Result = {ok: true; data: T} | {ok: false; error: E}` zamiast booleanów
- **Branded types** — `type UserId = string & {__brand: 'UserId'}` dla type-safe ID
- **Generics naming** — `T`, `U`, `V` dla generic; `TItem`, `TKey` dla opisowych
- **`as const`** — literal types, `readonly` arrays/objects
- **`satisfies`** — type-check bez wide'owania (`config satisfies Config`)
- **Narrowing** — `typeof`, `instanceof`, `in`, type predicates (`is X`), exhaustive checks (`never`)

### Komentarze — polityka

> **Reguła główna:** Komentuj **DLACZEGO**, nie **CO**. Kod ma się tłumaczyć sam przez nazwy i typy. Komentarz to ostatnia deska ratunku, nie pierwsza.

**Kiedy KOMENTOWAĆ (must):**

- **Workaround/hack** — wyjaśnij dlaczego ten dziwny kod jest konieczny + link do issue/Stack Overflow
- **Non-obvious business logic** — "20% rabat dla orderów >500zł bo Q2 promotion (PROJ-123)"
- **Performance trade-off** — "Memoize bo profile pokazał 50ms render na 1000 itemach"
- **Magic constant** uzasadnienie — `const TIMEOUT_MS = 30_000 // backend lifespan warmup ~13s + safety`
- **Type assertion** — `as X` ZAWSZE z komentarzem "dlaczego to bezpieczne"
- **`@ts-expect-error`** — opisz co ignorujesz i dlaczego (nie używaj `@ts-ignore`)
- **Side effects w hookach** — `// Cleanup AbortController on unmount`

**Kiedy NIE KOMENTOWAĆ:**

- ❌ `// increment counter` przy `count++` — oczywiste
- ❌ `// User component` nad `function User()` — nazwa już to mówi
- ❌ `// TODO:` bez kontekstu — albo zrób, albo zostaw issue tracker
- ❌ Closing tag comments `</div> {/* end of card */}` — IDE pokazuje strukturę
- ❌ Komentarze "co robi" zamiast "dlaczego" — refaktor nazwy zmiennej zamiast tego
- ❌ Komentowanie kodu zamiast kasowania — git pamięta historię
- ❌ Duplicated info z typu — `count: number // count of items` (typ już mówi)

**TODO/FIXME convention:**

```ts
// TODO(matty): Add pagination after C.7 reader merged → PROJ-456
// FIXME(matty, 2026-04-30): Race condition gdy double-click — patrz issue #123
// HACK: Tauri 2.11 bug — usuń po update → https://github.com/tauri-apps/tauri/issues/XXXX
```

- **Format:** `// TODO(autor): opis → ref` (issue, ADR, dokument)
- **Bez ref'a TODO jest długiem technicznym** — albo dodaj link, albo nie pisz

### JSDoc — kiedy używać

> **Reguła:** TypeScript types > JSDoc dla typów. JSDoc dla **publicznego API**, **non-obvious behavior**, **przykładów** i **deprecation**.

**Kiedy używać JSDoc (must):**

- **Public API komponentów** w `components/ui/` (shadcn-style) — opis + `@example`
- **Custom hooks** eksportowane — `@param`, `@returns`, `@example`
- **Utility functions** w `lib/` — opis + przykład użycia
- **`@deprecated`** — ZAWSZE z `@deprecated Use X instead since vY.Z`
- **Complex generics** — opis dla TKey/TValue gdy nie oczywiste
- **Public types eksportowane** z `types/` — co reprezentują w domenie

**Format (TSDoc-compatible):**

```ts
/**
 * Backend health probe with configurable timeout and retry.
 *
 * @param timeoutMs - Per-attempt timeout in milliseconds (default 5000)
 * @param maxRetries - Total retry count before giving up (default 3)
 * @returns `true` if backend healthy, `false` after all retries exhausted
 *
 * @example
 * ```ts
 * const healthy = await checkBackendHealth(3000, 5)
 * if (!healthy) toast.error("Backend offline")
 * ```
 */
export async function checkBackendHealth(timeoutMs = 5000, maxRetries = 3): Promise<boolean>
```

**Kiedy NIE pisać JSDoc:**

- ❌ Internal/private utilities (nie eksportowane) — types wystarczą
- ❌ Component implementation details (state hooks, refs)
- ❌ Re-eksporty (`export { X } from './x'`)
- ❌ Dla każdej linii kodu — to nie Java
- ❌ `@param name - The name parameter` (typ już mówi że to string)

**JSDoc tags w użyciu:**

- `@param`, `@returns` — public API only
- `@example` — ZAWSZE dla shared utilities/hooks
- `@deprecated` — z migracją `Use X instead`
- `@throws` — gdy fn rzuca (rzadkie w TS, preferuj Result types)
- `@see` — link do ADR/dokumentu/issue
- `@internal` — nie part of public API (pokazuje TS LSP użytkownikowi)

### Antypatterns

- ❌ `any` — używaj `unknown` + narrowing
- ❌ `Function` — `(...args: never[]) => unknown` lub konkretna sygnatura
- ❌ `Object` / `{}` — `Record<string, unknown>` lub konkretny shape
- ❌ Type assertion `as X` bez powodu — preferuj guard / narrowing
- ❌ Non-null `!` — preferuj `if (x === null) throw...` lub default value
- ❌ `enum` — używaj `as const` object (`const Status = {...} as const; type Status = typeof Status[keyof typeof Status]`)

**Szczegóły:** skill `frontend` (sekcja `references/01-typescript.md`)

---

## 02 — React 19

- **Function components only** — żadnych klas
- **`ref` jako prop** — `forwardRef` zbędny w React 19; `function Input({ref, ...props})`
- **`useActionState`** — async actions z auto pending/error/optimistic state
- **`useOptimistic`** — instant UI feedback z rollback on error
- **`useFormStatus`** — czyta status `<form>` z designerskich komponentów
- **`use()`** — czyta promise/context po early returns (warunkowo!)
- **Metadata** — `<title>`, `<meta>`, `<link>` w komponentach (auto-hoist do `<head>`)

### Hooks rules

- Top-level only (nie w pętlach, conditions, nested funkcjach)
- Custom hooks: `use*` naming
- Dependency arrays: WSZYSTKIE reactive values; `eslint-plugin-react-hooks` enforce
- **Updater functions** zamiast deps na state: `setCount(c => c + 1)` nie `setCount(count + 1)`
- **Cleanup mirror setupu** — Strict Mode double-invoke to feature, nie bug

### Memoization

- React 19 Compiler (preview) auto-memoizuje — **NIE memo wszystkiego**
- `useMemo` — expensive calc (>1ms) lub array/object dla memo dziecka
- `useCallback` — funkcja jako prop dla `memo()` dziecka lub effect dependency
- `React.memo` — child re-rendering bottleneck (mierz najpierw)

### Antypatterns

- ❌ `useEffect` do data fetching — TanStack Query / Router loader
- ❌ `key={index}` w listach — unique ID z danych
- ❌ Inline `onClick={() => {}}` w renderze hot path — extract lub useCallback
- ❌ Boolean prop explosion (`primary secondary loading danger`) — discriminated union + cva
- ❌ Suppression `// eslint-disable-next-line react-hooks/exhaustive-deps` — fix dependency
- ❌ Object literal w deps array — split na primitive deps lub useMemo
- ❌ Context dla często zmieniających się wartości — Zustand z selectorami

**Szczegóły:** skill `frontend` (sekcja `references/02-react-19.md`)

---

## 03 — React Router 7 (data router / library mode)

- **`createBrowserRouter`** + `<RouterProvider>` — data router mode (NIE framework mode dla Tauri SPA)
- **Loaders** — fetch przed renderem (`useLoaderData`); throw `Response` dla errorBoundary
- **Actions** — form mutations (`<Form method="post">`); auto invalidacja po submit
- **`useFetcher`** — non-navigation mutations + optimistic updates
- **`<Link>`** > `useNavigate()` — prefetching, a11y, semantyka
- **`errorElement` per route** — granularne ErrorBoundary (404/500)
- **Lazy routes** — `lazy: () => import('./route')` (code splitting per route)
- **Nested routes** — `<Outlet />` dla layout, `children` w config

### Antypatterns

- ❌ `useEffect` w komponencie do fetch danych — loader to robi PRZED renderem
- ❌ `<a href>` zamiast `<Link to>` — full reload, brak prefetch
- ❌ Brak `errorElement` — biały ekran na rzuconym Response
- ❌ Eager import wszystkich routes — bundle balloon

**Szczegóły:** skill `frontend` (sekcja `references/03-react-router-7.md`)

---

## 04 — State Management

| Kategoria | Źródło | Narzędzie |
|-----------|--------|-----------|
| **Server state** | API/backend | TanStack Query 5 |
| **Client state** | UI chrome (theme, sidebar, modal) | Zustand 5 |
| **Local state** | Form input, toggle | `useState` |

### TanStack Query 5

- **`useQuery`** — read; **`useMutation`** — write; **`useInfiniteQuery`** — paginacja; **`useSuspenseQuery`** — Suspense+ErrorBoundary
- **QueryKey factory** — hierarchiczne arrays: `keys.projects.detail(id) = ['projects', 'detail', id]`
- **Defaults:** `staleTime: 0`, `gcTime: 5min`, `retry: 3` — tune per use case
- **Mutations** — `onMutate` (optimistic) → `onSuccess` (invalidate) → `onError` (rollback)
- **`refetchOnWindowFocus: true`** + `staleTime: 0` = constant fetch — set sensible `staleTime`

### Zustand 5

- **`create()`** + slices pattern (`createUISlice`, `createSidebarSlice`)
- **Selectors** — `useStore(s => s.theme)` zamiast `useStore()` całości
- **`useShallow`** dla multi-select obiektów (prevents render thrash)
- **Middleware:** `persist` (localStorage), `devtools` (Redux DevTools), `immer` (mutations)

### Forms — react-hook-form 7 + zod 4

- **Uncontrolled by default** (mniej re-renderów)
- **`zodResolver(schema)`** — runtime validation z Zod
- **Integration:** `defaultValues` z `useQuery`, `onSubmit` przez `useMutation`

### Antypatterns

- ❌ Server state w Zustand — TanStack Query to robi lepiej
- ❌ `useEffect + useState` do fetch — `useQuery`
- ❌ QueryKey jako string — array (prefix invalidation)
- ❌ Zustand bez selectorów — re-render hell
- ❌ Optimistic update bez rollback — corruption on error
- ❌ Mutation bez invalidation — stale list po create/update/delete

**Szczegóły:** skill `frontend` (sekcja `references/04-state-management.md`)

---

## 05 — Styling (Tailwind 4 + cva + cn + shadcn + Radix)

### Tailwind CSS 4

- **CSS-first config** — `@theme {}` w CSS, NIE `tailwind.config.js`
- **Lightning CSS engine** — Rust, 10-100x szybsze niż v3
- **`@import "tailwindcss"`** — single import w globals
- **Native CSS variables** — wszystkie tokeny dostępne w runtime
- **Container queries native** — `@sm:`, `@md:` (no plugin)
- **Cascade layers** — `@layer base/components/utilities`

### Design tokens przez `@theme`

| Namespace | Generuje |
|-----------|----------|
| `--color-*` | `bg-*`, `text-*`, `border-*` |
| `--spacing-*` | `p-*`, `m-*`, `gap-*` |
| `--radius-*` | `rounded-*` |
| `--text-*` | `text-sm/base/lg` |
| `--font-weight-*` | `font-bold/semibold` |
| `--breakpoint-*` | `sm:`, `md:`, `lg:` |
| `--shadow-*` | `shadow-*` |

### `cn()` utility (clsx + tailwind-merge)

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```

`cn("p-4", "p-6")` → `"p-6"` (merge wins). ZAWSZE używaj dla conditional classes.

### `cva` — variants

- **`cva(base, { variants, defaultVariants, compoundVariants })`** — typesafe API
- **`VariantProps<typeof variants>`** — wyciągnij typy do props
- **Każdy UI komponent z >1 wariantem = `cva()`** centralnie

### shadcn 4 + Radix UI

- **shadcn = copy-paste** (NIE npm package); `npx shadcn@latest add <component>`
- **Owns the code** — customize bezpośrednio plik w `components/ui/`
- **Radix primitives** — unstyled, WAI-ARIA compliant; `asChild` pattern dla composition
- **Compound components** — `<Card><CardHeader/><CardBody/></Card>`

### Dark mode

- **`next-themes`** — `<ThemeProvider attribute="class" defaultTheme="system">`
- **`useTheme()`** + mounted check (prevent hydration flash)
- **Tailwind:** `dark:bg-*` variants

### Tailwind Discipline (7 zasad)

1. Utility TYLKO w `components/ui/` — strony używają komponentów
2. Każdy UI komponent z wariantami = `cva()`
3. `cn()` do conditional classes (NIGDY string interpolation)
4. `@theme` dla tokenów (NIGDY hardcoded hex/oklch/px)
5. Dynamiczne klasy = complete strings (`bg-red-500`, NIGDY `` bg-${color}-500 ``)
6. Powtarzająca się arbitrary value → nowy token w `@theme`
7. `@layer components {}` zamiast `@apply`

### Antypatterns

- ❌ `style={{padding: "25px"}}` — `p-6` (1.5rem)
- ❌ `className={isActive ? "bg-blue" : ""}` — `cn(isActive && "bg-blue")`
- ❌ `outline-none` bez focus ring — focus-visible obowiązkowy
- ❌ `!important` — kontroluj kaskadę przez `@layer`
- ❌ CSS-in-JS runtime (Styled Components, Emotion) — martwe w 2026
- ❌ `useTheme()` bez mounted check — hydration mismatch

**Szczegóły:** skill `frontend` (sekcja `references/05-styling.md`)

---

## 06 — Data Fetching

- **`openapi-fetch`** + `openapi-typescript` — typed API client z OpenAPI schema
- **No-drift policy** — CI sprawdza `git diff --exit-code` na `openapi.json`
- **`bun run gen:api`** — regen typów po zmianie backend schema
- **TanStack Query wrapper** — `useQuery` + `client.GET("/path/{id}", { params: { path: { id } } })`
- **Error handling** — `if (error) throw new Error(error.detail)` w queryFn (TanStack Query catch)

### SSE (native EventSource)

- **`new EventSource(url)`** — natywne API (nie potrzeba lib)
- **`addEventListener('event-type', cb)`** per typ eventu (nie `onmessage`)
- **Cleanup obowiązkowy** — `return () => eventSource.close()` w `useEffect`
- **Integration z TanStack:** event → `queryClient.invalidateQueries({ queryKey })`
- **Tauri WebView (Edge):** EventSource działa bez fallback

### File upload

- **`FormData` + raw `fetch`** dla multipart (openapi-fetch stringifies body)
- **`<input type="file" multiple>` + drop handler** — HTML5 drop działa w Tauri webview gdy `e.preventDefault()` na dragover
- **Progress** — `XMLHttpRequest` (fetch nie ma upload progress) lub server-side via SSE

### Antypatterns

- ❌ Hardcoded URL `http://localhost:8721/...` — env var lub localStorage override
- ❌ Brak abort controller w cleanup useEffect — memory leak
- ❌ Polling zamiast SSE/WebSocket dla real-time — battery drain, latency
- ❌ Brak retry strategy dla transient errors — TanStack Query retry config

**Szczegóły:** skill `frontend` (sekcja `references/06-data-fetching.md`)

---

## 07 — Testing

> **Status:** ZERO testów na froncie (brak Vitest/RTL/Playwright/MSW w deps). Skill rekomenduje stack jako must-have do dodania.

### Testing Pyramid

| Layer | Tool | Coverage Target |
|-------|------|-----------------|
| **Unit** | Vitest + renderHook | ~100% utilities |
| **Component** | RTL (jsdom) + user-event v14 | ~80% |
| **Integration** | RTL + MSW + renderHook | ~70% happy path |
| **E2E** | Playwright (+ tauri-driver opcjonalnie) | ~15-30% critical paths |

### Vitest

- **`vitest.config.ts`** — `globals: true`, `environment: 'jsdom'`, `setupFiles: ['./vitest.setup.ts']`
- **Parallel by default** — fresh QueryClient + MSW reset per test (isolation!)
- **Coverage** — `--coverage` z `provider: 'v8'`

### React Testing Library

- **Query priority:** `getByRole` > `getByLabel` > `getByText` > `getByTestId` (last resort)
- **`user-event` v14+** (NIE `fireEvent`) — async, real interactions
- **`renderHook`** + custom wrapper (QueryClient + Theme providers)
- **`waitFor(() => expect(...))`** — NIGDY `setTimeout`

### MSW (Mock Service Worker)

- **`setupServer(...handlers)`** w Node tests; `setupWorker` w browser dev
- **`http.get/post(...)`** + `HttpResponse.json(...)` handlers
- **`afterEach(() => server.resetHandlers())`** — isolation
- **`server.use(...)`** — per-test override
- **Same handlers** dla dev/test/E2E/Storybook (single source of truth)

### Playwright

- **Locators > selectors** — role-based, text-based; testid last resort
- **Multi-browser:** chromium + firefox + webkit projects
- **Tauri E2E:** Option A (test webview standalone vs Vite dev server + MSW) — preferowane
- **Option B:** `tauri-driver` + Playwright (slower, dla critical IPC paths)

### Antypatterns

- ❌ `getByTestId` jako pierwsza query — verify accessibility najpierw
- ❌ Snapshot tests dla wszystkiego — false confidence, snapshot rot
- ❌ Shared QueryClient między testami — cache leakage, flaky parallel
- ❌ `fireEvent` zamiast `user-event` — pomija validation triggery
- ❌ `setTimeout(0)` zamiast `waitFor` — fragile, slow
- ❌ Brak MSW reset między testami — state carry-over

**Szczegóły:** skill `frontend` (sekcja `references/07-testing.md`)

---

## 08 — Tauri 2

### Architecture

- **Rust core** (main process, OS access) + **WebView** (renderer, sandboxed) + **IPC bridge**
- **Edge WebView2** na Windows, **Safari** na macOS, **WebKit** na Linux
- **Trust boundary:** Frontend = untrusted; Rust = trusted; IPC walidowany

### Commands (`#[tauri::command]`)

- **Async > sync** (sync zamraża UI dla I/O)
- **`Result<T, String>`** dla błędów (oba serializowane)
- **`State<'_, Mutex<T>>`** dla shared state (Tokio mutex w async)
- **`generate_handler![cmd1, cmd2]`** — single call (multiple = ostatnie wygrywa)
- **TS:** `import { invoke } from '@tauri-apps/api/core'; await invoke('cmd_name', { arg })`
- **camelCase** w TS → **snake_case** w Rust (auto-convert)

### State management Rust-side

- **Type alias:** `type AppState = Mutex<AppStateInner>` (zapobiega double-wrap)
- **`SlotState` enum + mutex** dla race-prone operations (StrictMode double-mount fix)
- **Drop guard przed `.await`** (deadlock prevention)

### Events (one-way IPC)

- **`app.emit_all("name", payload)`** lub `app.emit_to(window, ...)`
- **TS:** `import { listen } from '@tauri-apps/api/event'; await listen('name', cb)`
- **Use case:** progress updates, broadcasts; dla request-response używaj **commands**

### Sidecar

- **Naming:** `{name}-{TARGET_TRIPLE}` (np. `uv-x86_64-pc-windows-msvc.exe`)
- **`bundle.externalBin`** w `tauri.conf.json`
- **`shell.sidecar("uv").spawn()`** — Rust spawn
- **`RunEvent::Exit` cleanup** — kill child processes (no orphan)

### Permissions (capabilities/)

- **Zero-trust default** — wszystkie pluginy zablokowane bez explicit allow
- **`fs:` scope** do `$APP_DATA_DIR` — NIGDY wildcard `**`
- **`shell:allow-spawn`** tylko dla nazwanego sidecara
- **CSP** w `tauri.conf.json` — `default-src 'self'`

### Cross-platform gotchas

- **WebView origin:** Windows/Linux `http://tauri.localhost`, macOS `tauri://localhost`, dev `http://localhost:5173`
- **CORS allowlist:** enumerate wszystkie 4 origins (browser silently blocks wildcard z credentials)
- **`cors_allow_credentials=True` ⊥ wildcard `*`** — must enumerate
- **Backend log "200 OK" ≠ JS dostał response** — CORS check po wire

### Antypatterns

- ❌ `invoke()` na każdy render — cache result, użyj events dla updates
- ❌ Sync command dla I/O (>100ms) — async + tokio
- ❌ Trust frontend input — validate w Rust
- ❌ Hardcoded secrets w Rust binary — env vars + capabilities
- ❌ Bundling unused pluginów — bigger bundle, attack surface
- ❌ Brak `RunEvent::Exit` cleanup — orphan child procesy
- ❌ `MutexGuard` przez `.await` — deadlock

**Szczegóły:** skill `frontend` (sekcja `references/08-tauri.md`)

---

## 09 — Error Handling

### Hierarchia błędów

| Warstwa | Mechanizm | Kiedy |
|---------|-----------|-------|
| **Component lokalny** | `try/catch` + Sonner toast | User action (button click, form submit) |
| **TanStack Query** | `error` state z `useQuery` | Async fetch failure |
| **Route boundary** | `errorElement` w router config | Loader/action throw |
| **Global app** | `<ErrorBoundary>` (react-error-boundary) | Render error niespodziewany |
| **Backend HTTP** | `error` z `openapi-fetch` | API 4xx/5xx |
| **Tauri IPC** | `Result<T, String>` w Rust → JS Promise reject | Command failure |

### Reguły

- **NIGDY** `try/catch` bez akcji — albo fix, albo log + rethrow, albo user feedback
- **Sonner toasts** dla user-facing błędów (nie `alert()`)
- **`console.error()` tylko z kontekstem** — `console.error('[useProjects] fetch failed:', err)`
- **Type errors w catch:** `catch (err: unknown)` + narrowing (`if (err instanceof Error)`)
- **TanStack Query retry** — domyślnie 3 razy; wyłącz dla mutations (`retry: false`)
- **ErrorBoundary per route** zamiast jednego globalnego — granularność
- **Backend errors** — pokazuj `error.detail` z FastAPI (nie `error.message` generic)
- **AbortController** w cleanup useEffect — fetch cancel on unmount

### Pattern: API call

```ts
const { data, error, isLoading } = useQuery({
  queryKey: keys.projects.detail(id),
  queryFn: async () => {
    const { data, error } = await client.GET("/api/v1/projects/{id}", {
      params: { path: { id } }
    })
    if (error) throw new Error(error.detail || "Unknown error")
    return data
  }
})

if (error) return <ErrorState message={error.message} onRetry={refetch} />
```

### Pattern: Mutation z toast

```ts
const mutation = useMutation({
  mutationFn: createProject,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: keys.projects.all })
    toast.success("Project created")
  },
  onError: (err) => toast.error(err.message)
})
```

### Antypatterns

- ❌ `catch (e) { console.log(e) }` — brak akcji, błąd zniknie w produkcji
- ❌ `alert()` / `confirm()` / `prompt()` — natywne dialogi w Tauri WebView wyglądają źle, brak a11y
- ❌ Throw stringów (`throw "error"`) — zawsze `Error` instance
- ❌ Brak `errorElement` w route — biały ekran użytkownika
- ❌ Generic message "Something went wrong" bez retry — frustracja
- ❌ Suppressing errors w produkcji bez Sentry/log → silent failure
- ❌ `try/catch` wokół `setState` — React renderuje, error trafi do ErrorBoundary

**Szczegóły:** Sekcja inline (Error Handling cross-cuts wiele warstw — patrz odpowiednie referencje per warstwa)

---

## 10 — A11y + Performance

- **Semantic HTML** — `<button>`, `<nav>`, `<main>` zamiast `<div role="...">`
- **`focus-visible:`** outline (NIGDY `outline-none` bez zamiennika)
- **Color contrast:** ≥ 4.5:1 tekst, ≥ 3:1 duży tekst i UI components
- **`sr-only`** utility — text dla screen readerów
- **Keyboard navigation** — Tab order, Esc closes modal, Enter submits
- **`aria-label`/`aria-labelledby`** — gdy brak visible text label
- **Radix primitives** — accessibility built-in (focus management, ARIA roles, keyboard)
- **Disable state:** `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`

### Performance

- **Code splitting** per route — `lazy: () => import('./route')` w Router
- **`<Suspense fallback={<Skeleton />}>`** — graceful loading boundary
- **Virtualization** — `@tanstack/react-virtual` dla list >100 items
- **`React.lazy()` + `<Suspense>`** dla heavy components (charts, editors)
- **Image optimization** — `loading="lazy"`, native lazy loading
- **Bundle analysis** — `vite-bundle-visualizer` (`bun run build -- --report`)
- **Tree-shake icons** — `import { Icon } from 'lucide-react'` (NIE `import * as`)
- **Memoize** mierz najpierw (DevTools Profiler), potem optymalizuj

### Tauri-specific perf

- **Bundle size:** ~50-100 MB (vs Electron 200+)
- **Startup:** 1-2s cold, <500ms warm
- **WebView2 shared memory** na Windows
- **Eager warmup** w backend lifespan (lazy CUDA detect ~13s → 87ms)
- **Strip debug symbols** w release build

### Antypatterns

- ❌ `<div onClick>` zamiast `<button>` — brak keyboard, brak ARIA
- ❌ `outline: none` bez focus ring — keyboard users blind
- ❌ Color-only state indicator — colorblind users
- ❌ Eager import wszystkich routes — bundle balloon
- ❌ List 1000 items bez virtualization — scroll jank
- ❌ Inline image base64 dla ikon — bundle bloat (use lucide-react)
- ❌ `<img>` bez `width`/`height` — CLS (cumulative layout shift)

**Szczegóły:** skill `frontend` (sekcja `references/09-a11y-perf.md`)

---

## Quick Workflow

| Etap | Komenda |
|------|---------|
| Po git pull | `cd frontend && bun install` |
| Dev (frontend only) | `bun run dev` |
| Dev (frontend + API) | `bun run dev:api` |
| Tauri dev (full app) | `bun run tauri dev` |
| Lint | `bun run lint` |
| Typecheck | `bun run build` (tsc -b w build) |
| Test | `bun run test` (po dodaniu Vitest) |
| Codegen API | `bun run gen:api` (po zmianie backend OpenAPI) |
| Build instalator | `bun run tauri build` |

---

## Stack Lock (sprawdzony w `frontend/package.json`)

- **Core:** Bun + Vite 8 + TS 6.0.3 + React 19.2 + react-router 7.15
- **Tauri:** @tauri-apps/api 2.11 + 19 oficjalnych pluginów
- **Styling:** Tailwind 4.2 + cva 0.7 + clsx 2.1 + tailwind-merge 3.5 + tw-animate-css
- **UI:** shadcn 4 + radix-ui 1.4 + lucide-react + cmdk + sonner + vaul + embla-carousel + react-day-picker + input-otp + react-resizable-panels + recharts
- **State:** TanStack Query 5.100 + zustand 5 + openapi-fetch 0.17 + next-themes 0.4
- **Forms:** react-hook-form 7 + @hookform/resolvers + zod 4
- **Tooling:** ESLint 10 + typescript-eslint 8 + eslint-plugin-react-hooks + openapi-typescript 7

> ⚠️ Brak w deps: **Vitest, React Testing Library, Playwright, MSW** — must-add per skill rekomendacja (sekcja 07).

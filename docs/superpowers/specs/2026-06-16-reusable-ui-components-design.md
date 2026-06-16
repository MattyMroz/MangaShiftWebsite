# Spec: System reużywalnych komponentów UI (MangaShift)

Data: 2026-06-16 · Branch roboczy: bieżący (`main` jest deployowalny — patrz git skill, finalnie 1 PR squash)

## Cel

Przejść z „imitowanych" (powielanych ręcznie) wzorców UI na **reużywalne, modułowe komponenty**
w `src/shared/ui/`, żeby:

- nie pisać tych samych stylów podstawowych w kółko (modułowość, DRY),
- przyspieszyć iterację (bug typu „zły rozmiar inputu na becie" naprawia się **raz**, w komponencie),
- zachować spójny, editorial wygląd strony (wygląd może być **ulepszany**, nie musi być 1:1 piksel).

## Zasady architektury

1. **Źródło prawdy wyglądu = `src/app/globals.css`** — tokeny (`--text`, `--accent`, `--line`,
   `--surface`, `--radius-*`, `--shadow-*`, rozmiary fontów) + klasy globalne (`.display`,
   `.section-kicker`, `.eyebrow`, `.editorial-rule`, `.diagram-card`, `.paper-frame`, `.dot-grid`).
   Komponenty **składają te tokeny**, nie wprowadzają nowych kolorów ani magicznych wartości.
2. **Stack:** czysty Tailwind v4 + tokeny CSS + framer-motion (wszystko już w repo).
   Jedyny dodatek: **`clsx` + `tailwind-merge`** w `cn()` — bez tego nadpisywanie `className`
   nie działa deterministycznie. **Bez `cva`, bez radix, bez lucide.**
3. **Pełna kontrola / nadpisywalność:** każdy komponent przyjmuje `className`, który trafia na
   koniec przez `cn()` i wygrywa (radius, kolor, padding, cokolwiek). To twardy wymóg usera.
4. **Warianty = zwykła mapa-obiekt** (wzorzec z istniejącego `Button.tsx`) — spójność z repo,
   zero nowej składni do nauki.
5. **Modułowość:** `src/shared/ui/<Nazwa>/<Nazwa>.tsx`, jeden plik = jeden komponent =
   jedna odpowiedzialność.
6. **Sliding > statyczne** — gdzie są taby/nav/listy wyboru, domyślnie sliding (layoutId pill),
   nie statyczne (preferencja usera).

## Zmiana fundamentu: `cn()`

`src/shared/lib/utils/cn.ts` obecnie tylko łączy stringi (`filter(Boolean).join(' ')`) — NIE
merguje konfliktów Tailwinda. Zmiana:

```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

Dodać: `bun add clsx tailwind-merge`. Sygnatura `cn(...)` zostaje zgodna — istniejące wywołania działają.

## Komponenty — Faza 1 (ta sesja)

Każdy: w `src/shared/ui/<Nazwa>/<Nazwa>.tsx`, `className` nadpisywalny, style z tokenów.

| Komponent | Warianty / propsy | Zastępuje |
|---|---|---|
| `Input` | `size: 'md'\|'lg'`, pełne props `<input>` | beta email, signin email/password |
| `Textarea` | jw. dla `<textarea>` | przyszłe formularze (kontakt) |
| `Field` | `label`, `htmlFor`, `hint`/`status`, children | owinięcie label+kontrolka+komunikat |
| `Checkbox` | custom visual (sr-only input + box + check), `label` | beta consent, signin |
| `Badge` | `variant: 'pill'\|'outline'\|'accent'`, `as` | beta feature pills, „Open now" itp. |
| `MetaLabel` | `variant: 'kicker'\|'eyebrow'`, `line?: boolean` | `.section-kicker` / `.eyebrow` inline |
| `FloatingLabel` | `position: 'tl'\|'tr'\|'br'`, `tone: 'glass'\|'accent'` | etykiety na obrazach (Demo/How/UseCases/Gallery) |
| `Card` | `variant: 'diagram'\|'paper'\|'plain'`, `radius?` | `.diagram-card`/`.paper-frame` + ramki kart |
| `TabPill` (sliding) | `tabs[]`, `active`, `onChange`, `layoutId` | tablist w UseCasesSection (sliding pill) |

### Kontrakt kluczowych komponentów

**`Input`** — ujednolica DWA dziś rozjechane rozmiary:
- beta: `min-h-12 px-5 text-[1.5rem]` (bez py)
- signin: `px-6 py-4 text-[length:var(--normal-font-size)]`

Docelowo jeden zestaw: `w-full rounded-full border border-[var(--line)] bg-[var(--surface)]
px-6 py-4 text-[length:var(--normal-font-size)] text-[var(--text)] outline-none transition-colors
placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]
focus:ring-2 focus:ring-[var(--accent)]/15 disabled:opacity-60`.
Wariant `lg` = większy padding; `md` = obecny. To **naprawia bug rozmiaru inputu na becie**.

**`TabPill`** — sliding: aktywny element ma `motion.span layoutId` z `bg-[var(--text)]`
(jak obecny tablist w UseCasesSection:100-106), reszta transparentna. Generyczny: przyjmuje
listę `{id,label}`, kontrolowany przez `active`/`onChange`.

## Podmiany w widgetach (dowód działania + fix)

1. `widgets/ContactSection` (beta) → `Field`/`Input`/`Checkbox`/`Badge`. **Znika bug rozmiaru.**
2. `app/signin/page.tsx` → `Field`/`Input`/`Checkbox`. Spójny rozmiar inputu z betą.
3. `UseCasesSection` tablist → `TabPill` (sliding).
4. Badge/MetaLabel/FloatingLabel podmienione tam, gdzie się powtarzają (Demo, HowSection,
   UseCases, Gallery) — bez zmiany wyglądu (lub z subtelnym ulepszeniem).

## Poza zakresem tej sesji (Faza 2 — następna sesja)

`Accordion` (FAQ), `NumberedItem` (listy 0X), `FeatureCard`, `ArrowButton`, `LiveDot`,
`DottedGrid`. Wypisane, by nie ginęły; robione osobno, by nie ryzykować regresji hurtem.

## Kryteria sukcesu (weryfikowalne)

1. `bun run type-check` ✅ · `bun run lint` ✅ · `bun run build` ✅ — wszystkie zielone.
2. **Bug bety naprawiony**: input w `ContactSection` ma ten sam rozmiar co reszta inputów
   (jeden komponent `Input`).
3. **Wygląd zachowany lub ulepszony** — żadnej regresji editorial-looku; sekcje renderują się
   poprawnie (porównanie wizualne kluczowych sekcji przed/po).
4. **Nadpisywalność udowodniona**: `cn()` z `tailwind-merge` sprawia, że `className="rounded-lg"`
   realnie nadpisuje domyślny `rounded-full` w dowolnym komponencie.
5. Zero pozostawionego osieroconego kodu (nieużyte importy `cn`/`motion` po podmianach usunięte).

## Ryzyka

- **Regresja wizualna przy podmianie wielu sekcji naraz.** Mitygacja: podmieniam sekcja-po-sekcji,
  build po każdej istotnej zmianie.
- **`tailwind-merge` a Tailwind v4.** v4 ma inny silnik; `tailwind-merge@^3` wspiera v4 —
  zweryfikować po instalacji (build + szybki test nadpisania radiusa).

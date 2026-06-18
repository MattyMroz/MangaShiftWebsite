# Spec: Biblioteka komponentów + zunifikowany Button

**Data:** 2026-06-18
**Branch docelowy:** `feature/component-library` (od `main`, osobny od czekających PR #1/#2)
**Status:** design do akceptacji

---

## 1. Cel i kontekst

Projekt MangaShift posiada **80 komponentów UI** (`docs/design/komponenty/mangashift/ui/`)
zbudowanych na shadcn/radix — sprawdzony, kompletny system aplikacyjny (dashboardy).
Obecna strona-wizytówka (landing) ma **własne editorial komponenty** (`src/shared/ui/`)
na papierze + koralu.

**Decyzja użytkownika (kanon):** komponenty mangashift są **regułą** — domyślnym,
kanonicznym systemem UI projektu. **Landing page to wyjątek, nie reguła.** Docelowo
projekt = galeria komponentów mangashift, z której buduje się dashboardy i inne widoki;
landing to jeden ze szczególnych przypadków użycia.

**Ten spec obejmuje fundament:**
1. Most CSS tokenów (mangashift token system → nasze editorial wartości).
2. Zunifikowany **Button** jako wzorzec referencyjny połączenia (1 komponent, baza
   mangashift, landing przez skalę całego elementu).
3. Przeniesienie pozostałych 79 komponentów (mechaniczne, wg wzorca z Buttona).

---

## 2. Zasada nadrzędna Buttona (i wszystkich komponentów)

> **Layout jest domyślny i spójny. Element skaluje się jako CAŁOŚĆ, nie per-część.**

- Padding, font, ikona, radius, wysokość — **wbudowane w warianty/rozmiary**, nie dłubane
  ręcznie w miejscu użycia. Żadnych `className="px-10 py-4"` per-button.
- Zmiana rozmiaru (`sm`/`default`/`lg`/…) skaluje **cały element proporcjonalnie**:
  padding ↑, font ↑, ikona ↑, radius ↑ — razem, spójnie.
- Warianty (`ghost`/`secondary`/`outline`/`accent`/`destructive`/`link`) to **podtypy
  jednego Buttona** — różnią się kolorem/obramowaniem, nie layoutem.
- Press-feel mangashift (`scale 0.92`, `opacity 0.82`) = domyślne zachowanie.

---

## 3. Architektura

### 3.1 Most tokenów (fundament — bez tego komponenty mają złe kolory)

Adoptujemy **strukturę** systemu tokenów mangashift do `src/app/`, wypełnioną NASZYMI
editorial wartościami. Komponenty mangashift czytają tokeny typu `--foreground`,
`--primary`, `--accent`, `--btn-bg`, `--muted-foreground`, `--border`, `--ring` oraz
Tailwind-utility z `@theme inline` (`text-foreground`, `bg-primary`, `text-muted-foreground`).

Struktura plików (wzór mangashift `globals.css` + `styles/`):
```
src/app/globals.css          → orkiestrator @import (jak mangashift)
src/app/styles/
  tokens.css      ← @theme inline (most Tailwind↔CSS vars) + radius + motion — z mangashift
  theme.css       ← wartości semantyczne shadcn = NASZE editorial (papier/koral)
  editorial.css   ← nasze obecne klasy (.display .eyebrow .section-kicker .paper-frame
                    .dot-grid .hairline .ring .numero itd.) — przeniesione 1:1
  utilities.css   ← .glass .section-card .btn-press .neon-* .surface-* itd. — z mangashift
```

**Most wartości (przykłady, wpisane wprost jako realne kolory, nie tylko aliasy):**
| token mangashift | nasza wartość | źródło |
|---|---|---|
| `--background` | `#f3efe6` | nasz `--bg` (papier) |
| `--foreground` | `#191815` | nasz `--text` (tusz) |
| `--card` | `#faf7f0` | nasz `--surface` |
| `--primary` | `#e87058` | nasz `--accent` (koral) |
| `--primary-foreground` | `#ffffff` | nasz `--accent-fg` |
| `--accent` | `#e87058` | koral (marka — zgodne semantycznie z ms) |
| `--accent-fg` | `#ffffff` | — |
| `--accent-bright` | `#f0a088` | nasz `--blush` |
| `--accent-glow` | `rgba(232,112,88,.35)` | — |
| `--accent-subtle` | `rgba(232,112,88,.08)` | — |
| `--accent-border` | `rgba(232,112,88,.25)` | — |
| `--secondary` | `#e8e2d8` | nasz `--surface-2` |
| `--muted` | `#e8e2d8` | — |
| `--muted-foreground` | `#625e56` | nasz `--text-muted` |
| `--border` | `rgba(25,24,21,.14)` | nasz `--line` |
| `--input` | `rgba(25,24,21,.10)` | — |
| `--ring` | `#e87058` | koral |
| `--btn-bg` / `--btn-border` / `--btn-hover` | tusz `rgba(25,24,21,.05/.14/.09)` | tusz na papierze (NIE biel mangashift) |
| `--overlay` / `--overlay-hover` | `rgba(25,24,21,.05/.09)` | — |
| `--destructive` | `#c0492f` | — |
| `--radius` | `0.8rem` | nasz `--radius-md` (ms liczy z tego skalę) |
| `--motion-fast/base/slide/emphasized` | `50/100/150/200ms` | z mangashift 1:1 |

**Zachowanie zgodności:** wszystkie obecne tokeny (`--text --text-muted --line --surface
--accent-text --bg --radius-* --shadow-* --h3-font-size` itd.) ZOSTAJĄ żywe — landing
używa ich w ~200 miejscach i nie może pęknąć.

**base.css — świadomie NIE kopiujemy 1:1.** base mangashift jest dla aplikacji
(`overflow:hidden`, `height:100%`, `user-select:none` global, `#root`, font Inter) i zabiłby
scroll + typografię landingu. Zostaje NASZ base (scroll, paper gradient, szum, fonty
Inter Tight/Playfair/mono); dobieramy z mangashift tylko bezpieczne i przydatne komponentom:
scrollbar, `cursor:pointer` na interaktywnych, `focus-visible`, `::selection`.

**⚠️ Kolizja do rozwiązania przed zmianą `:root`:** mamy stare aliasy
`--primary: var(--accent)` i `--secondary: var(--accent-2)` (globals.css linie 31–33).
mangashift chce `--secondary` = neutralne szare tło. Grep (zweryfikowany) potwierdza:
`var(--primary)` i `var(--secondary)` NIE są używane nigdzie w `src/` → **martwe aliasy,
usuwamy je**, kolizja znika. UWAGA: aliasy `--text-primary` (używany w globals.css:
scrollbar/nav-link/theme-toggle, linie 398–483) oraz `--bg-primary`/`--border-primary`
ZOSTAJĄ — nie ruszamy ich. Usuwamy TYLKO `--primary`, `--primary-hover`, `--secondary`,
`--secondary-hover`, `--accent-primary` po potwierdzeniu że są martwe.

### 3.2 Zunifikowany Button

Jeden plik. Baza = mangashift (cva + radix Slot + `data-slot`/`data-variant`/`data-size`).

**Warianty** (z mangashift, na naszych tokenach): `default` (subtelny btn-surface),
`accent` (koral — marka), `destructive`, `outline`, `secondary`, `ghost`, `link`.

**Rozmiary** = całość skaluje się proporcjonalnie. Bazowa skala mangashift jest app-gęsta
(`h-8`). Skala mapowana na nasze tokeny tak, by każdy rozmiar był spójnym, domyślnym
„całym elementem" (padding+font+ikona+radius razem):
```
xs       → drobny app
sm       → app
default  → app standard
lg       → wyeksponowany (CTA app + baza dla landingu)
icon*    → kwadratowe warianty ikon (icon-xs/sm/lg)
```
**Landing (wyjątek) NIE robi padding-hacków.** Duże koralowe pille = `variant="accent"`
+ `size="lg"` (ew. nowy rozmiar `pill` = lg-skala + `rounded-full`), gdzie cały element
jest większy domyślnie. Editorial pill osiągamy rozmiarem/wariantem, nie `className`
dłubaniem per-miejsce.

**Migracja obecnych wywołań landingu** (Grep — 17 miejsc): mapowanie starych wariantów
na nowe, by strona została wizualnie spójna:
| stary (landing) | nowy |
|---|---|
| `hero` | `accent` + size `lg`/`pill` |
| `primary` | `default` (lub `accent` gdzie był koral) — do weryfikacji per-miejsce |
| `secondary` | `secondary` |
| `outline` | `outline` |
| `ghost` | `ghost` |
| `link` | `link` |

Wipe-animacja landingu: jeśli okaże się chciana jako akcent — opcjonalny prop `wipe`,
domyślnie OFF (press-feel mangashift jest domyślny). YAGNI: dodajemy wipe TYLKO jeśli po
migracji wizualnie czegoś brakuje. Domyślnie pomijamy.

### 3.3 Pozostałe 79 komponentów

`mangashift/ui/*.tsx` → `src/shared/ui/lib/*.tsx`. Zmiana: import `@/lib/utils` →
`@/shared/lib/utils/cn`. Reszta ~1:1 (tokeny działają przez most z 3.1). Button jest
wzorcem; reszta mechanicznie, partiami, delegowana subagentom (różne pliki = brak
konfliktu). `lib/utils.ts` mangashift = już identyczny z naszym `cn` → nie kopiujemy.

Komponenty o nazwach pokrywających się z naszymi editorial (Button/Input/Card/Badge/
Checkbox/Textarea/Accordion) NIE nadpisują naszych — mangashift idą do `ui/lib/`,
editorial zostają w `ui/`. (Button to wyjątek: jest unifikowany wg 3.2 — docelowo jeden,
ale w tej fazie powstaje nowy zunifikowany, a stary editorial migrujemy na niego.)

---

## 4. Zależności (`bun add`)

`radix-ui` · `class-variance-authority` · `lucide-react` · `tw-animate-css`.
Mamy już: `clsx`, `tailwind-merge`, `framer-motion`.

---

## 5. Kryteria sukcesu (weryfikowalne)

1. `bun run type-check` — zielone.
2. `bun run lint` — zielone.
3. `bun run build` (export do `out/`) — zielone.
4. **Landing wizualnie spójny** — strona renderuje się sensownie po unifikacji Buttona;
   Join Beta / Hero CTA pozostają wyeksponowanymi koralowymi przyciskami (przez
   `accent`+`lg/pill`, nie padding-hacki). Weryfikacja screenshotem (skill
   `full-page-screenshot` / CDP).
5. **Wszystkie 80 komponentów importowalne** z `@/shared/ui/lib/*` i renderują się w
   kolorach papier/koral (nie fioletowo-szarych mangashift). Weryfikacja: testowa strona
   galerii renderująca próbkę (Button/Dialog/Select/Card) + screenshot.
6. **Zmiana 1 tokena `--accent`** przebarwia i landing, i komponenty galerii (dowód „1
   plik kolorystyczny").

---

## 6. Kolejność wykonania (fazy)

1. **Fundament CSS** — struktura `styles/`, most tokenów, usunięcie martwych aliasów,
   weryfikacja że landing wygląda 1:1 jak teraz. (Największe ryzyko — najpierw.)
2. **Zależności** — `bun add` radix/cva/lucide/tw-animate.
3. **Button zunifikowany** — nowy `ui/Button`, migracja 17 wywołań landingu, weryfikacja
   wizualna landingu.
4. **79 komponentów** — partiami do `ui/lib/`, import cn, build zielony po każdej partii.
5. **Galeria-próbka + weryfikacja** — strona testowa, screenshot, dowód przebarwiania.

---

## 7. Poza zakresem (YAGNI)

- Dark mode komponentów (mangashift ma `theme-dark` — pomijamy, landing jest light-only).
- Warianty kolorystyczne akcentu (pomarańcz itd.) — osobne zadanie, user odłożył.
- Refaktor 200 miejsc landingu na tokeny shadcn — zostają na naszych aliasach (warstwa
  zgodności), nie migrujemy.
- Neon/orbs/glass-sidebar efekty mangashift — kopiujemy CSS (utilities), ale nie używamy
  na landingu; dostępne dla galerii.

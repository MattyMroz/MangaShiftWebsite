# Podstrony MangaShift + legal hub + fixy dev — design

**Data:** 2026-06-19
**Branch:** feature/component-library (kontynuacja)
**Status:** zatwierdzony do implementacji

## Cel

Dobudować do istniejącego landingu (single-page, EN) zestaw realnych podstron Next
(App Router, `output: 'export'`) oraz hub prawny. Naprawić dwa problemy z logu dev
(allowedDevOrigins, favicon 404). Zero nowych zależności — reużycie istniejącej
biblioteki komponentów (`shared/ui`) i stylu editorial-minimal landingu.

## Decyzje (ustalone z userem)

1. **Język:** strony marketingowe (`/features`, `/pricing`, `/download`, `/contact`)
   — treść **EN** przez i18n (`en.json`, `t('ns.klucz')`). Dokumenty legal (`/legal/*`)
   — treść **PL 1:1** z draftów `pakiet_v3_draft`, jako natywny JSX (przetłumaczymy później).
2. **Drafty z `[[DO_POTWIERDZENIA]]` / `[[CENA]]`:** budujemy pełne UI; treść legal
   zostaje **dosłownie 1:1** (znaczniki `[[...]]` zostają widoczne w tekście jako
   naturalny placeholder) + **baner draftu** na górze każdej strony legal. Checkout
   NIE powstaje (zgodnie z zasadą autorów: „nie uruchamiaj checkoutu z placeholderem").
3. **Zakres teraz:** `/features`, `/pricing`, `/download`, `/contact`, `/legal` (hub),
   `/legal/terms`, `/legal/privacy`, `/legal/cookies`, `/legal/refunds`, `/legal/ip`,
   `/legal/third-party-notices`. Konto/billing/checkout/login — POZA zakresem.
4. **Operator:** „Mateusz Mróz, działalność nierejestrowana" (robocze); adres jako
   widoczny `[[DO_POTWIERDZENIA: adres publiczny]]`. Maile: support@/privacy@/copyright@.
5. **Treść legal technicznie:** ręczny JSX sekcja po sekcji (pełna kontrola, ładne tabele).
6. **Nawigacja podstron:** linki w **stopce** (nowa kolumna) + **menu mobilnym**.
   Górny header zostaje (anchory landingu + Beta). Anchory naprawione, by działały z podstron.

## Architektura

### Trasy (każda = `src/app/<trasa>/page.tsx`, statyczny route)

```
features/page.tsx                    EN — OCR, tłumaczenie, TTS, animacja, eksport, BYOK, lokalne projekty
pricing/page.tsx                     EN — Free / Monthly / Annual, ceny jako [[CENA]] placeholder, trial 7 dni
download/page.tsx                    EN — Windows only, GitHub Releases, wymagania, wersja
contact/page.tsx                     EN — formularz (bez backendu, jak signin) + maile
legal/page.tsx                       EN intro + lista linków do 6 dokumentów (hub)
legal/terms/page.tsx                 PL 1:1 — 01_REGULAMIN.md
legal/privacy/page.tsx               PL 1:1 — 02_POLITYKA_PRYWATNOSCI.md
legal/cookies/page.tsx               PL 1:1 — 03_POLITYKA_COOKIES.md
legal/refunds/page.tsx               PL 1:1 — 04_ODSTAPIENIE_REKLAMACJE_ZWROTY.md
legal/ip/page.tsx                    PL 1:1 — 05_ZGLOSZENIA_NARUSZEN_IP.md
legal/third-party-notices/page.tsx   PL 1:1 — 06_THIRD_PARTY_NOTICES_SZABLON.md
```

Każdy `page.tsx` eksportuje `metadata` (SEO/OG, title przez template `%s | MangaShift`).

### Nowe komponenty współdzielone (`src/shared/ui/`)

Małe, jednozadaniowe, w stylu istniejących (Container/EditorialRule/SideLabel):

- **`PageShell`** — wrapper podstrony: top padding pod fixed header (`pt` ~ `11rem`/`13rem`),
  `Container`, opcjonalny `SideLabel`. Footer pozostaje globalny (renderowany w page).
  Wejścia: `children`, `sideLabel?`. Zależy od: `Container`, `SideLabel`.
- **`PageHero`** — nagłówek podstrony w stylu Hero/Features: `EditorialRule index/page`,
  kicker, `display` h1 z `<em accent>`, lead. Wejścia: `index`, `page`, `rule`, `kicker`,
  `titleBefore`, `titleEmphasis`, `titleAfter`, `lead`. Zależy od: `EditorialRule`, motion.
- **`DraftNotice`** — baner „Draft roboczy — dokument w przygotowaniu, niewiążący prawnie".
  Wariant accent-subtle, ikona ostrzeżenia. Wejścia: `children?`. Samodzielny.
- **`LegalSection`** + **`LegalProse`** — prymitywy do renderu treści legal:
  `LegalSection` (numerowany nagłówek `h2` w stylu editorial + slot na treść),
  proste komponenty listy/tabeli spójne z designem. Znaczniki `[[...]]` zostają w tekście.

Footer dostaje sekcję linków do podstron — modyfikacja istniejącego `Footer.tsx`
(nowa kolumna „Product" / „Legal") + dodanie linków do menu mobilnego w `Header.tsx`.

### i18n

Nowe namespace w `src/shared/i18n/en.json`: `features`, `pricing`, `download`, `contact`,
`legal` (tylko hub: intro + nazwy linków). Tablice przez indeksy (jak `hero.highlights`).
Legal/* NIE idą przez i18n — to natywny JSX PL.

### Fixy dev (ortogonalne)

1. **`next.config.ts`** — `allowedDevOrigins: ['192.168.117.1', '192.168.18.145']`.
2. **favicon 404** — usunąć ręczne `icons.icon: "/MangaShiftWebsite/favicon.ico"`
   z `layout.tsx`; Next App Router auto-obsłuży `app/favicon.ico` z poprawnym basePath.
   Weryfikacja: `bun run build` → sprawdzić `out/favicon.ico` i brak hardkodu w `<head>`.

## Styl (z istniejącego systemu — bez nowych tokenów)

- Tokeny: `--accent`, `--accent-text`, `--text`, `--text-muted`, `--text-faint`, `--line`,
  `--line-strong`, `--surface`, `--bg`. Klasy: `.display`, `.section-kicker`, `.eyebrow`,
  `.section-shell`, `font-[family-name:var(--font-mono)]`.
- Komponenty: `Button` (warianty accent/outline/link, size landing-pill/landing-pill-sm),
  `Container`, `EditorialRule`, `SideLabel`, `MetaLabel`, `Card`, `Accordion`, `Badge`,
  `Input`/`Textarea`/`Checkbox`/`Field` (do formularza kontakt), `Table` (cennik/retencja).
- Motion: framer-motion, wzorzec `reveal` (opacity+y), `viewport once`, ease `[0.22,1,0.36,1]`.

## Plan weryfikacji (kryteria sukcesu)

1. `bun run type-check` — zielone.
2. `bun run lint` — zielone.
3. `bun run build` — statyczny export OK; w `out/` powstają wszystkie 11 tras
   + `favicon.ico` w roocie; brak hardkodu `/MangaShiftWebsite/favicon.ico` w `<head>`.
4. Dev log: po dodaniu origin znika ⚠ blokady; `/favicon.ico` nie 404-uje.
5. Wizualnie: każda podstrona ma header (nie chowa się), spójny PageHero, działający
   Footer z linkami; legal pokazuje baner draftu + treść 1:1 ze znacznikami `[[...]]`.
6. Nawigacja: z podstrony klik anchora w headerze → wraca na `/#sekcja`; linki w stopce
   prowadzą do podstron; menu mobilne zawiera linki do podstron.

## Poza zakresem (YAGNI)

- Checkout, /login, /account, /billing (twoje „później").
- Backend formularza kontakt (jak signin: front-only z komunikatem).
- Tłumaczenie legal na EN (drafty zostają PL 1:1, tłumaczenie później).
- Cookie banner / Google Analytics (drafty wspominają, ale to osobny temat).
- Redesign górnej nawigacji.

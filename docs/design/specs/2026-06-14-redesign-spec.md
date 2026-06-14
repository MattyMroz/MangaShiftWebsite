# Spec: Redesign MangaShift Website

> Dokument wykonawczy. Jak technicznie zrobić redesign, żeby działał i był wydajny.
> Bazuje na: `docs/design/BRIEF.md`, brainstorm `temp/brain_storm/2026-06-14-redesign-mangashift/`.
> Zasada nadrzędna: skill `simple` — chirurgicznie, KISS, jawne założenia.

---

## 1. Cel i decyzje usera (potwierdzone)

Przebudowa landing page z **ciemnego neonowego** na **ciepły edytorialny minimalizm**
(papier + animowany tusz suminagashi), wzór: firecrawl + atelier-zero + yohaku.

| # | Decyzja | Szczegół |
|---|---|---|
| 1 | **Akcent modyfikowalny** | Jedna zmienna `--accent`. Na start czerwień/pomarańcz tuszu, zmiana = 1 linia. |
| 2 | **Animowany tusz WSZĘDZIE** | Tło suminagashi pod całą stroną, każda sekcja „przepuszcza" tusz. |
| 3 | **Dark mode w fundamencie** | Od razu zmienne light+dark; budujemy na gotowej bazie. Toggle zostaje. Light domyślny. |
| 4 | **3 pary fontów** | Do wyboru wzrokowego, komentarze w kodzie, 1. para = domyślna na start. |
| 5 | **Usunąć GlassSurface** | Liquid glass — za ciężki. |
| 6 | **Zachować dobre** | Hamburger (animacja), ThemeSwitcher. |
| 7 | **i18n** | en.json + `t()`, fundament pod wiele języków, na teraz tylko en. |
| 8 | **Wszystko classy** | User perfekcjonista — dopracowanie obowiązkowe. |

---

## 2. Kluczowy problem techniczny: „tusz wszędzie" vs wydajność

**Naiwne podejście (ZŁE):** osobny shader/canvas w każdym komponencie = N× symulacja fluidów =
zabija przeglądarkę (dokładnie problem, przez który wywalamy GlassSurface).

**Rozwiązanie (DOBRE) — jeden tusz, wiele okien:**
- **JEDEN** fullscreen canvas z shaderem suminagashi, `position:fixed`, `z-index:-1`, pod całą stroną.
- Sekcje/komponenty mają **półprzezroczyste** tła (papier z alpha) — tusz „prześwituje" przez nie.
- Tam gdzie treść musi być czytelna → mocniejsza warstwa papieru (większa alpha) lub `backdrop-filter`
  delikatny. Tam gdzie „oddech" (między sekcjami) → tusz pełniejszy.
- Efekt: tusz widać wszędzie, ale liczony **raz**. Perf jak jedno tło, nie jak N animacji.

**Technika renderu (B4 z brainstormu):**
- Port shadera z Three.js (592K) na **ogl** (~15K, już w stacku). Fluid sim: advection → divergence
  → pressure (Jacobi) → gradient subtract → splat → paper fiber. Render do `WebGLRenderTarget`.
- **Optymalizacje (obowiązkowe):**
  - `IntersectionObserver` / `requestAnimationFrame` pauza gdy tab nieaktywny (`visibilitychange`).
  - Cap DPR (np. `min(devicePixelRatio, 1.5)`), niższa rozdzielczość siatki symulacji (np. 0.5×).
  - Cap FPS na mobile (np. 30).
  - `prefers-reduced-motion` → statyczna klatka (jeden render, bez pętli).
  - Mobile / brak WebGL → statyczny obraz/gradient fallback.
- Plan B (gdyby port był za długi): pre-render kilku klatek jako tekstura + subtelny CSS drift.

**Kryterium sukcesu perf:** brak spadku poniżej ~50 FPS na desktopie, płynny scroll na mobile,
Lighthouse Performance nie gorszy niż obecnie, bundle mniejszy (−Three.js).

---

## 3. Architektura motywu (tokeny light + dark od startu)

Plik: `src/app/globals.css`. **Tylko semantyczne tokeny w komponentach** (zero hardkodów kolorów).

```css
:root, [data-theme="light"] {
  --bg: #efeae0;            /* papier (z suminagashi) */
  --bg-alpha: rgba(239,234,224,0.72); /* półprzezroczysty papier — przepuszcza tusz */
  --surface: #f7f1de;       /* uniesiona karta */
  --surface-2: #e7dec9;
  --text: #1a1a1f;          /* ink (czerń tuszu, nie #000) */
  --text-muted: #5a5448;
  --text-faint: #8b8676;
  --accent: #c8372d;        /* MODYFIKOWALNY — czerwień tuszu; CTA/linki */
  --accent-2: #16407a;      /* granat tuszu — secondary/hover */
  --line: rgba(26,26,31,0.16);
}

[data-theme="dark"] {
  --bg: #14131a;            /* ciemny atrament */
  --bg-alpha: rgba(20,19,26,0.72);
  --surface: #1d1c24;
  --surface-2: #26242e;
  --text: #efeae0;          /* papier jako tekst */
  --text-muted: #b8b2a4;
  --text-faint: #8b8676;
  --accent: #e0594d;        /* rozjaśniona czerwień */
  --accent-2: #5a8fd6;
  --line: rgba(239,234,224,0.16);
}
```
- Akcent zmienialny = edycja `--accent` w jednym miejscu.
- Dark wypełniony sensownym placeholderem — działa od razu, dopracujemy wartości później.
- Tusz w shaderze: w dark przyciemnić tło shadera (uniform), atramenty zostają kolorowe.

---

## 4. Typografia — 3 pary do wyboru

Przez `next/font/google` (self-host, zero CDN latency, export-friendly). Zmienne `--font-display`,
`--font-serif`, `--font-body`, `--font-mono`. W kodzie komentarz który zestaw aktywny.

| Para | Display | Serif (emfaza) | Body | Mono | Klimat |
|---|---|---|---|---|---|
| **1 (domyślna)** | Inter Tight | Playfair Display Italic | Inter | JetBrains Mono | edytorialny premium (atelier-zero) |
| 2 | Noto Serif JP | Noto Serif JP | Noto Sans JP | JetBrains Mono | japoński, manga (yohaku) |
| 3 | Cormorant Garamond | Cormorant Italic | Inter | IBM Plex Mono | luksusowy książkowy (eguide) |

Zostawię zakomentowane warianty 2/3 + aktywny 1 — przełączenie = odkomentowanie.

---

## 5. i18n (en.json + t())

- `src/shared/i18n/en.json` — wszystkie teksty, struktura zagnieżdżona (`hero.title`, `faq.items`...).
- `src/shared/i18n/index.ts` — `t(key)` czyta z en.json (na teraz import statyczny, 1 język).
- Komponenty: zamiast inline tekstu → `t('hero.title')`.
- Przyszłość: dodanie `pl.json` + przełącznik + wybór locale. Architektura gotowa, nie budujemy teraz (YAGNI).

---

## 6. Kolejność implementacji (każdy krok = osobny, zatwierdzany)

> Każdy krok kończę: `bun run type-check` + `lint` + `build` zielone, pokazuję efekt, czekam na OK.

**ETAP I — Fundament (odblokowuje resztę):**
- **F0.1** Semantyczne tokeny CSS (light+dark) w globals.css. Default theme → light (ThemeSwitcher + layout init).
- **F0.2** Fonty (3 pary, next/font, aktywna 1.).
- **F0.3** i18n: en.json + t().

**ETAP II — Tło + rdzeń:**
- **F1** Tło suminagashi: port na ogl, jeden fullscreen canvas, optymalizacje, fallback, reduced-motion.
       Podmienić JapaneseBackground/LightRays. Sekcje dostają `--bg-alpha`.
- **F2** Button: **jeden komponent (cva), oba style jako warianty** (decyzja usera):
       - wariant `hero/classy` — zachować sprężysty ruch z obecnego src (spring hover scale 1.05,
         tap 0.95, duży pill) ALE bez GlassSurface; tło lekkie (tusz prześwituje przez `--bg-alpha`).
       - warianty shadcn z `docs/komponenty/mangashift` — default/accent/ghost/outline/secondary/link
         + rozmiary (cva + cn + radix Slot), stonowane, uniwersalne pod wszelkie przyciski.
       - Akcent z `--accent` (modyfikowalny). „Classy = ruch, nie glass". (Odblokowuje sekcje.)
- **F3** Header: usunąć GlassSurface, papierowy/przezroczysty, Hamburger + ThemeSwitcher zostają.

**ETAP III — Sekcje (po kolei, każda zatwierdzana). ROZBUDOWA na długość wg atelier-zero:**

> Obecny landing (Hero/About/Demo/FAQ/Contact/Footer) jest za ubogi. Rozbudowujemy do
> ~13 sekcji wzorem atelier-zero (mapowanie poniżej — NIE kopia 1:1, treść pod MangaShift:
> pipeline manga→wideo z AI narracją). Każda sekcja: eyebrow mono + cyfra rzymska + hairline.

| F | Sekcja MangaShift | Wzór atelier-zero | Co zawiera |
|---|---|---|---|
| F4 | **Hero** | hero | H1 (Inter Tight + serif italic emfaza), eyebrow mono, lead, CTA „Join Beta" + „See demo", collage/plansza demo |
| F5 | **Metadata strip + ticker** | wire / official-strip | pasek pod nav: status „in development", wersja, „open beta" + przewijany ticker (np. wspierane formaty/języki) |
| F6 | **About / Vision** | about | „We turn static manga into living video." — manifest, 1 mocne zdanie + lead |
| F7 | **How it works** | method | pipeline 3-4 kroki (Upload → AI panel detection → Narration → Video) z hairline i strzałkami → |
| F8 | **Features / Capabilities** | capabilities | karty z numerami 01-04 (AI narracja, wykrywanie kadrów, głosy, eksport) |
| F9 | **Demo** | labs / work | ramka wideo (AspectRatio) — przykładowe wyjście; ew. galeria before/after (manga→wideo) |
| F10 | **Tech / Powered by** | amr-band | „Powered by state-of-the-art AI" — OGÓLNIE, bez nazw modeli/firm (decyzja usera) |
| F11 | **Testimonial / Social proof** | testimonial | cytat + (placeholder, bo beta) — albo „be the first" jeśli brak opinii |
| F12 | **FAQ** | faq | accordion + hairline (bez glass) |
| F13 | **Beta CTA + signup** | cta + newsletter | mocne CTA + formularz email. **Logika signup (Google Forms) BEZ ZMIAN.** |
| F14 | **Footer** | footer | mega-słowo „MangaShift", meta, linki, pulse dot |

Uwaga: F11 (testimonial) i F10 (powered-by) zależą od realnych danych — jeśli brak,
robimy elegancki placeholder („coming soon"/„be first") zamiast fałszywych opinii (uczciwość).

**ETAP IV — Sprzątanie:**
- **F10** Usunąć `GlassSurface.tsx`. Ocenić LightRays/SplashCursor (pasują do nowej estetyki? lekkie?) —
        zostawić/usunąć. Finalny `type-check`+`lint`+`build`. Commit per etap (GitHub Flow, bez push bez zgody).

---

## 6a. Logo (brak — nie problem)
User nie ma logo. W estetyce edytorialnej to OK: **wordmark** „MangaShift" w foncie display
(Inter Tight) jako logo w nav + stopce. Opcjonalnie prosty monogram/znak jako placeholder
(łatwy do podmiany). Gdy powstanie prawdziwe logo → podmiana w 1 komponencie. NIE blokuje redesignu.

## 7. Czego NIE robimy (granice — YAGNI)
- next-intl / routing per-locale (za wcześnie, 1 język).
- Pełne dopracowanie dark mode (placeholder teraz, dopieszczenie później).
- Logo (nie istnieje — zostawiamy miejsce/tekst).
- Zmiany w logice beta signup (działa).
- Osobne shadery per komponent (perf — jeden wspólny tusz).

## 8. Ryzyka i mitygacja
| Ryzyko | Mitygacja |
|---|---|
| Tusz pod tekstem = nieczytelnie | `--bg-alpha` mocniejszy pod treścią, lżejszy „na oddechu" |
| Perf (tusz wszędzie) | jeden canvas (nie N), cap DPR/FPS, pauza, fallback, reduced-motion |
| Port ogl za długi | Plan B: pre-render statyczny + drift |
| Dark niespójny | tylko semantyczne tokeny, zero hardkodów |
| Regresja funkcji (signup) | nie ruszamy logiki, tylko wygląd |

## 9. Otwarte (do dopracowania w trakcie)
- Finalny akcent (modyfikowalny — decyzja po podglądzie).
- Wybór pary fontów (po podglądzie).
- Intensywność tuszu per sekcja (kalibracja wizualna).
- Finalne teksty (copywriting hero).

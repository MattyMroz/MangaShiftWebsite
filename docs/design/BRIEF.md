# Brief wizualny — MangaShift Website

> Źródło prawdy dla redesignu. Claude czyta ten plik przed kodowaniem — **nie zgaduje**.
> Wklejaj swobodnie: linki, opisy, screeny. Obrazki: wrzuć do `inspiracje/` lub `assets/`.

---

## 🎯 Decyzje (ustalone z userem)

1. **Tło = suminagashi** — bierzemy efekt z `suminagashi-fjdbyyqi-demo/` i zastępujemy nim
   obecne tło strony. (Uwaga techniczna niżej — to ciężki shader, trzeba optymalizować.)
2. **Zachować dobre komponenty** które już są w obecnej stronie (np. burger menu jest dobre,
   ze świetną animacją) — NIE usuwać tego co działa i ładnie wygląda. Usuwamy tylko liquid glass.
3. **Wszystko ma być ładne i dopracowane** (skłaszi = classy / dopieszczone). User jest perfekcjonistą.
4. **Liquid glass (`GlassSurface`)** ❌ — usunąć, za ciężki dla przeglądarki (WebGL/ogl). 5 użyć.

**Plan do rekomendacji ode mnie:** styl, fonty, czy robić dark mode.

### Dark mode — moja rekomendacja
- **Landing page: NIE** — user słusznie zauważa: dużo roboty, podwójne testowanie, a na
  landingu nikogo to nie obchodzi. Jeden dopracowany motyw > dwa półśrodki.
- **Logowanie / dashboard: TAK, kiedyś** — tam dark mode ma sens (długie sesje, narzędzie).
  Ale to inny etap (osobna app), nie ten landing.

---

## 🧭 Estetyka — wzór i kierunek

- **Główny wzór:** firecrawl.dev (minimalizm) ORAZ inspiracje poniżej. Wspólny mianownik:
  **ciepły, edytorialny, "drukowany" minimalizm** — papierowe tło zamiast bieli, atramentowy
  tekst, serif + mono, JEDEN akcent kolorystyczny, hojny whitespace, zero gradient/cień-szumu.

### Główna inspiracja: `inspiracje/open-design/00-atelier-zero` ⭐
Editorial / magazyn premium ("Monocle spotyka deploy"). Ma gotowy `DESIGN.md`.
- **Paleta (ciepły light, papier — NIE biel, NIE dark):**
  - tło `--paper #efe7d2`, karta `--bone #f7f1de`, ciemniejsze `--paper-dark #ddd2b6`
  - tekst `--ink #15140f` (nie #000), drugorzędny `--ink-mute #5a5448`, faint `--ink-faint #8b8676`
  - **akcent (jedyny): coral `#ed6f5c`** — tylko CTA/cyfry/kropka. Reguła: ~1 coral na ekran.
  - biżuteria: mustard `#e9b94a` (gwiazdki/dot, NIGDY na CTA), olive `#6e7448`
  - linie: `rgba(21,20,15,.16)` hairline
  - tekstura papieru: SVG `feTurbulence` ~5-6% opacity, `mix-blend:multiply` (obowiązkowa)
- **Typografia:**
  - display/UI: **Inter Tight** (700-900), letter-spacing −.025 do −.04em
  - emfaza: **Playfair Display Italic 500** — pojedyncze słowa-rzeczowniki w nagłówku, cyfry rzymskie
  - body: **Inter** (300-500), lead 16px/1.55/max 36ch
  - mono: **JetBrains Mono** — meta, współrzędne, numery, eyebrow
  - eyebrow `.label`: 11px, 600, letter-spacing .22em, UPPERCASE, coral, z hairline ::before
  - hero H1 `clamp(54px,6.6vw,100px)`; footer mega-słowo `clamp(70px,13vw,200px)`
- **Layout:** kontener `max-w 1360px`, padding 64px; sekcje 130px góra/dół; dużo whitespace,
  asymetria; side-rails (rotowany tekst na krawędziach); promienie głównie 999px (pille) / 8px.
- **Animacje:** vanilla JS + IntersectionObserver scroll-reveal (stagger, `cubic-bezier(.22,1,.36,1)`,
  pełen `prefers-reduced-motion`); pulse dot; subtelne hover (translateY -1/-3px). Zero parallax/scroll-jack.
- **Sekcje:** metadata-strip → nav → hero → wire/kontrybutorzy → about → capabilities (cyfry) →
  labs → method (kroki) → selected-work (ciemny panel) → testimonial → faq (accordion) → cta →
  newsletter → footer (mega-słowo). Każda otwiera się hairline + cyfra rzymska + meta.

### `inspiracje/yohaku` — japońska pustka (余白) ⭐
- Paleta ciepły papier `#eae5d8`, ink `#181d21`, akcenty: czerwień `#e84d26` (słońce/hinomaru),
  kobalt `#1f3ecf`, limonka `#d8e221`; ciemne pasmo `#0e1319`. Highlight musztardowy.
- Fonty: **Noto Serif JP** (nagłówki/dusza) + Noto Sans JP (UI) + JetBrains Mono (eyebrow).
- Najbardziej animowany: grain/ziarno (feTurbulence), particle network, parallax, char-by-char
  reveal w h1, rysowane podkreślenia, wielkie malarskie formy (słońce, tusz). Yohaku = pustka jako
  oddech, w której pojedynczy mięsisty gest niesie emocję. **To estetycznie blisko suminagashi.**

### `inspiracje/open-design/01-03` (article-magazine, digital-eguide, kami-parchment)
Wszystkie: ciepły papier (`#fafaf7`/`#faf3ea`/`#f5f4ed`), atramentowy tekst, JEDEN akcent
(terakota/karmin/granat), serif-display + mono-meta, drop-caps, hairline rules, zero cieni.
Manifest Kami: *"Pure white is a screen affordance, not a publishing convention. Paper has temperature."*

---

## 🌊 Tło suminagashi — uwaga techniczna (WAŻNE)

`suminagashi-fjdbyyqi-demo/` to **pełna symulacja płynów (Navier-Stokes / Stam solver)** na
**Three.js** (`three.min.js` 592K) — advection, divergence, pressure (Jacobi), splat + paper fiber.
Piękne i autentyczne, ale **ciężkie** (wiele passów na framebufferach co klatkę) — to to samo
GPU-obciążenie co liquid glass który wywalamy.

**Plan przeniesienia (skill `simple` + gsap-performance):**
- Przepisać shader na **`ogl`** (już w stacku, ~kilkanaście KB) zamiast Three.js (−592K).
- Optymalizacje: pauza gdy poza viewportem (IntersectionObserver), niższy DPR/rozdzielczość symulacji,
  cap FPS na mobile, **pełen `prefers-reduced-motion`** (statyczna klatka zamiast symulacji).
- Decyzja do potwierdzenia: tło wszędzie vs tylko hero. Rekomendacja: mocny efekt w hero,
  reszta strony lekka (spójne z minimalizmem inspiracji).

---

## 🧩 Komponenty

- **Obecna strona:** zachować dobre (burger menu z animacją!). Usunąć tylko `GlassSurface`.
- **Z MangaShift app:** skopiowane do `komponenty/mangashift/` — pełna biblioteka **shadcn/ui**
  (80 szt., radix + cva + cn, czyste). Mapa co użyć/pominąć: `komponenty/mangashift/README.md`.
  Rdzeń na landing: Button, Card, Accordion(→FAQ), Dialog, Sheet(→mobile menu), Input/Label/
  Checkbox/Textarea, Badge, Separator, Tooltip. ⭐ NeonOrbs = tanie animowane tło (po wycięciu store).

---

## 📝 Treść i dane

- **Nazwa:** MangaShift
- **Jednozdaniowy opis (hero):** _(do dopracowania — copywriting)_
- **Co robi:** pipeline zmieniający statyczną mangę w wideo (AI narracja).
- **Linki:** GitHub `github.com/MattyMroz`, LinkedIn `linkedin.com/in/mattymroz`
- **Beta signup:** działa (Google Forms) — zostaje.
- **i18n (backlog):** strona ma być tłumaczona na ~15-30 języków.

---

## 🗒️ Do uzupełnienia przez usera
- firecrawl: co konkretnie się podoba (hero? pricing? spacing?)
- makieta/screeny docelowego wyglądu (user szuka)
- ostateczny wybór fontów (rekomendacja moja: Inter Tight + Playfair Display Italic + JetBrains Mono)
- finalny tekst hero

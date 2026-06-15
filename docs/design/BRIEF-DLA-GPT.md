# Brief dla GPT — dokończenie redesignu MangaShift

> Kontekst: landing page MangaShift (pipeline: statyczna manga/manhwa → narrated AI video).
> Strona statyczna na GitHub Pages. Trwa redesign na branchu `feature/redesign-editorial`.
> Poprzedni asystent (Claude) zrobił część pracy, ale kilka rzeczy nadal jest zepsutych —
> ten dokument zbiera WSZYSTKO, żeby ktoś inny mógł to dokończyć bez zgadywania.

## Stack i komendy

- Next.js 16 (App Router, Turbopack), `output: 'export'` (statyczny build do `out/`), React 19,
  TypeScript (strict), Tailwind CSS v4, framer-motion, gsap, ogl.
- Menedżer pakietów: **bun** (nigdy npm/yarn). `bun run dev` / `build` / `type-check` / `lint`.
- `basePath` = `/MangaShiftWebsite` w produkcji.
- Architektura Feature-Sliced Design: `src/app/`, `src/widgets/` (sekcje), `src/features/`, `src/shared/`.
- Pliki UTF-8 (LF). NIE edytować plików przez PowerShell Get/Set-Content (niszczy polskie/japońskie znaki).

## Wzorzec estetyczny (czego chce user)

- Minimalizm jak **firecrawl.dev** + edytorialny magazyn (atelier-zero) + japoński tusz (yohaku).
- Papierowe tło #efeae0, atramentowy tekst, akcent czerwień tuszu #c8372d (modyfikowalny token).
- Header DOKŁADNIE jak firecrawl: pełna szerokość paska, logo lewo / nav środek / CTA prawo,
  treść trzymana do wspólnej granicy layoutu (nie rozwalona na brzegi ekranu).
- Hero rytm „wielki nagłówek → dużo oddechu → potem treść".
- Inspiracje wgrane w `docs/design/inspiracje/` (atelier-zero, yohaku, suminagashi, firecrawl).

---

## ✅ CO DZIAŁA (nie ruszać bez powodu)

### Tło suminagashi (efekt płynącego tuszu)
- ŹRÓDŁO 1:1: `docs/design/inspiracje/suminagashi/index.html` (+ `js/three.min.js`).
  To skompilowana apka React+Three.js (~393KB) — Stable Fluids, tusz płynie na papierze #efeae0.
- Kopia robocza: `public/suminagashi/index.html` — oryginał 1:1 z DWIEMA zmianami:
  1. ukryte UI demo (`.title,.hint,.dock{display:none!important}` przed `</style>`),
  2. usunięty tag trackera Plausible (martwy plik 404).
  Render tuszu NIETKNIĘTY.
- Osadzenie: `src/shared/ui/InkBackground/InkBackground.tsx` — iframe `fixed -z-10 w-screen h-screen
  pointer-events-none` + „most myszy" (przekazuje pointer eventy ze strony do canvasu w iframe).
- Animacja reaguje na KLIK/drag (pointerdown + pointermove gdy buttons!=0), NIE na sam hover.
- Zweryfikowane CDP: canvas 1440×900 pełny ekran, tusz ląduje w punkcie kliknięcia bez offsetu.

### Inne działające
- Header animacja wejścia + zmiana tła/blur przy scrollu (user potwierdził „animacja headera działa").
- Klikanie nav/CTA — w testach CDP scroll do sekcji działa (`smoothScrollTo`).
- Tekst niezaznaczalny: `select-none` na `<body>` (layout.tsx), wyjątek input/textarea (globals.css).
- type-check + lint zielone.
- i18n: `src/shared/i18n/` (en.json + `t()`). LanguageSwitcher: EN/PL enabled, reszta placeholdery.
- ThemeSwitcher (light/dark, light domyślny). Gwiazdka ✦ efektów usunięta.
- /signin placeholder (`src/app/signin/`).

---

## 🔴 CO NADAL ZEPSUTE / DO ZROBIENIA (najważniejsze dla GPT)

> UWAGA: user wielokrotnie zgłaszał, że mimo „zielonych testów CDP" w PRAWDZIWEJ przeglądarce
> rzeczy nadal wyglądają/działają źle. Headless Chrome + swiftshader NIE oddaje 1:1 tego, co user
> widzi na realnym GPU. ZWERYFIKUJ W PRAWDZIWEJ PRZEGLĄDARCE, nie tylko headless.

1. **TŁO — animacja/klikanie dalej nie satysfakcjonuje usera w realnej przeglądarce.**
   - Mimo że CDP pokazuje „działa", user twierdzi że klikanie/animacja tła nadal nie działa jak trzeba.
   - PODEJRZENIE: „most myszy" (przekazywanie syntetycznych PointerEvent przez granicę iframe) może
     nie działać tak samo w realnej przeglądarce jak w headless. ALTERNATYWA do rozważenia:
     **przenieść canvas suminagashi bezpośrednio na stronę (bez iframe)** — wyciągnąć skrypt symulacji
     z `index.html` i osadzić jako natywny `<canvas>` w tle React. Wtedy mysz działa natywnie, zero mostu.
     To trudniejsze (duży bundle React+three w index.html), ale najpewniejsze.
   - Ewentualnie: sprawdzić czy iframe na realnym GPU w ogóle inicjalizuje WebGL i czy `contentDocument`
     jest dostępny (same-origin powinno być OK na localhost i na Pages pod tym samym originem).

2. **GŁÓWNY HOME PAGE „KRZYWY / ROZJECHANY".**
   - User: „główna page jest rozjechany", „front się rozjechał", „przy zmianie szerokości wszystko się resetuje".
   - Sekcje (14 sztuk) mają NIESPÓJNY layout — każda miała własny `max-w-[120rem]` + własne paddingi.
     Powstał `src/shared/ui/Container/Container.tsx` (wspólna granica `max-w-[120rem] px-6 md:px-10 lg:px-12`),
     ale NIE został jeszcze zastosowany we wszystkich sekcjach — tylko w Header.
   - DO ZROBIENIA: przejść przez wszystkie sekcje w `src/widgets/*/ui/*.tsx` i ujednolicić je do
     jednego `Container` (ta sama granica co header) — wtedy nic się nie „rozjedzie".
   - Sprawdzić responsywność: czy przy zmianie szerokości okna layout się nie psuje/resetuje.

3. **Sekcje treściowo/wizualnie słabe (user: „wygląda jak wygenerowane przez AI", ocena 4-6/10).**
   - 14 sekcji: Hero, TickerSection, StatsSection, AboutSection, HowSection, FeaturesSection,
     UseCasesSection, GallerySection, DemoSection, PoweredSection, PricingSection, FAQSection
     (export `FaqSection`), ContactSection (export `BetaSection`), Footer.
   - Brak prawdziwych zdjęć (tylko 1: `public/images/chainsawman/RezeArc.webp`; reszta to placeholdery
     z `public/images/inspiration/`). User jest perfekcjonistą, nie ma jeszcze logo ani mockupów.
   - DO ZROBIENIA: dopracować sekcje wizualnie pod wzorzec firecrawl+atelier+yohaku, spójna typografia,
     hojny whitespace, asymetria (sekcje można pchać na boki). Rozszerzyć do długości jak open-design.

4. **Beta signup (Google Forms) — NIE RUSZAĆ logiki.**
   - W ContactSection. Działa, wysyła do Google Forms. Zachować bez zmian.

---

## 🐞 SPIS BŁĘDÓW Z CAŁEJ SESJI (czego próbowano i co poszło źle)

- **Tło robione ~6× źle:** najpierw własny shader fbm, potem particle yohaku, potem port ogl z innymi
  parametrami — wszystkie odrzucone. Działa dopiero kopia oryginału 1:1 jako iframe. LEKCJA: nie
  przepisywać/reparametryzować — brać dokładnie oryginalny plik.
- **Papier „brudny/źle wyskalowany":** winny był `body::before` grain (feTurbulence + mix-blend multiply)
  w globals.css — nakładał ziarno na czysty papier z demo. USUNIĘTY.
- **Tło za małe (1432 zamiast 1440):** scrollbar zjadał szerokość przy `w-full`. Fix: `w-screen h-screen`.
- **Animacja tła reagowała na ruch myszy zamiast na klik:** most przekazywał pointermove zawsze.
  Fix: pointermove tylko gdy buttons!=0; pointerdown/up zawsze.
- **Tekst się zaznaczał przy klikaniu** (niebieskie tło na nav = zaznaczenie) → `select-none` na body.
  UWAGA: surowy `body{user-select:none}` w globals.css NIE trafiał do skompilowanego CSS (Turbopack/HMR);
  zadziałało dopiero przez klasę Tailwind `select-none` na `<body>`.
- **Header za szeroki / logo źle / nav nie na środku:** przepisany na pełną szerokość + Container + nav
  absolute-centered. Animacja przez framer (wejście) + inline transition (scroll), żeby ominąć globalny
  `*{transition:0s}`.
- **Header znikał/migał przy scrollu:** framer `animate` mieszał wejście (y/opacity) ze stanem scrollu →
  re-animacja całości. Fix: rozdzielone (wejście framer, tło/blur inline style transition).
- **Buttony „skakały":** `whileHover scale` na każdym buttonie. Usunięte (został color hover + tap opacity).
- **Podwójny `<main>`** (layout.tsx + page.tsx) + `overflow-hidden z-10` na main blokował stacking. Naprawione.
- **ESLint walił warningami z `public/suminagashi/js/three.min.js`** → dodano `public/suminagashi/**` do ignore.
- **DEFAULT_THEME było dark** mimo że light domyślny → naprawione na light.

## ⚠️ GŁÓWNE RYZYKO / KLUCZOWA NIEPEWNOŚĆ

Headless Chrome (swiftshader) raportował „wszystko działa", a user w realnej przeglądarce widział
co innego. **Każdą zmianę weryfikować w PRAWDZIWEJ przeglądarce na realnym GPU**, nie tylko przez CDP.
Najważniejsza otwarta decyzja: czy zostać przy iframe+most myszy, czy przenieść canvas suminagashi
natywnie na stronę (pewniejsze dla interakcji, ale większa praca).

## 🧰 SKILLE — gdzie są i czego użyć

Skille (instrukcje/wiedza dla asystenta) leżą w `.claude/skills/`. Każdy ma `SKILL.md`.
Źródło zestawu design/animacja: github.com/nexu-io/open-design (Apache-2.0).

**ZAWSZE pod parasolem `simple`** (`.claude/skills/simple/SKILL.md`): chirurgiczne zmiany,
prostota KISS/YAGNI/DRY, jawne założenia, weryfikowalne kryteria. To baza pracy z kodem.

Mapa skilli do zadań redesignu:

- **Animacja / GSAP:** `gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`,
  `gsap-plugins`, `gsap-performance`, `gsap-utils`, `gsap-frameworks` — scroll-animacje, wydajność.
- **Design / UI:** `ui-ux-design` (37 zasad: kolor, typografia, spacing, WCAG — BAZA do oceny UI),
  `frontend-design`, `impeccable-design-polish`, `design-review`, `creative-director`,
  `color-expert`, `apple-hig`, `minimalist-skill`, `redesign-skill`, `shadcn-ui`,
  `reference-design-contract`.
- **Tło / wizual / shadery:** `frame-liquid-bg-hero` (płynne tło ≈ suminagashi),
  `shader-dev` (GLSL: fluid, ray-march, particle), `emilkowalski-motion`, `algorithmic-art`,
  `canvas-design`.
- **Treść / copy:** `copywriting`, `marketing-psychology`, `faq-page`, `poster-hero`.
- **Planowanie:** `brainstorm` (deliberacja przed kodowaniem), `git` (GitHub Flow, Conventional Commits).

Jak używać: czytać odpowiedni `.claude/skills/<nazwa>/SKILL.md` gdy pasuje do zadania.
Pełna lista w `CLAUDE.md` (sekcja „Skille").

UWAGA o subagentach (feedback usera): user prosił, żeby NIE puszczać subagentów do wszystkiego
(„subagenty rozjeżdżają robotę") — robić samemu. Wyjątki, na które się zgodził: agent do tła
oraz agent czyszczący komentarze. Jeśli używasz subagentów — dawaj im PEŁNY kontekst (jak ten brief),
inaczej powtórzą stare błędy.

## Gdzie czego szukać (mapa repo)

- **Instrukcje projektu:** `CLAUDE.md` (root) — stack, komendy, konwencje, skille, deploy.
- **Skille:** `.claude/skills/<nazwa>/SKILL.md`.
- **Inspiracje wizualne:** `docs/design/inspiracje/` (atelier-zero, yohaku, suminagashi, firecrawl).
- **Komponenty referencyjne usera:** `docs/design/komponenty/` (jeśli istnieją).
- **Spec / plan redesignu:** `docs/design/specs/`, `docs/design/SEKCJE.md`, ten brief.
- **Pamięć asystenta (stan/błędy):** katalog memory poza repo
  (`~/.claude/projects/.../memory/redesign-stan-i-bledy.md`) — historia decyzji i błędów.
- **Demo tła (źródło 1:1):** `docs/design/inspiracje/suminagashi/`.

## Pliki kluczowe (mapa)

- Tło: `src/shared/ui/InkBackground/InkBackground.tsx`, `public/suminagashi/index.html`
- Layout/tokeny: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`
- Header: `src/widgets/Header/ui/Header.tsx`
- Wspólna granica: `src/shared/ui/Container/Container.tsx`
- Sekcje: `src/widgets/*/ui/*.tsx`
- i18n: `src/shared/i18n/` (en.json)
- Spec/plan: `docs/design/specs/`, `docs/design/SEKCJE.md`
- Inspiracje: `docs/design/inspiracje/`

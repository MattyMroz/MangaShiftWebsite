# CLAUDE.md

Wskazówki dla Claude Code przy pracy w tym repo.

## Współpraca z userem (Matty)

- Komunikacja **po polsku**, angielskie terminy techniczne. Dysleksja: liczy się intencja, nie literówki.
- **Zero hallucination**: tool-first — sprawdzaj albo pytaj, nie zgaduj.

## Skille

**ZAWSZE używaj skilla `simple`** (`.claude/skills/simple/SKILL.md`) przy każdym pisaniu,
przeglądzie i refaktoryzacji kodu: chirurgiczne zmiany, prostota (KISS/YAGNI/DRY), jawne
założenia, weryfikowalne kryteria sukcesu. To nie jest opcjonalne.

Jeśli istnieje inny pasujący skill w `.claude/skills/` — użyj go zamiast improwizować.

### Skille design/animacja (z open-design, do redesignu)

W `.claude/skills/` jest zestaw skilli pod budowę ładnej, animowanej strony — **korzystaj z nich**
gdy pasują do zadania (nadal pod parasolem `simple`):

- **GSAP:** `gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-plugins`,
  `gsap-performance`, `gsap-utils`, `gsap-frameworks` — animacje, scroll, wydajność.
- **Design/UI:** `frontend-design`, `impeccable-design-polish`, `design-review`, `creative-director`,
  `color-expert`, `apple-hig`, `minimalist-skill`, `redesign-skill`, `shadcn-ui`, `reference-design-contract`.
- **Wizual/tło:** `frame-liquid-bg-hero` (płynne tło ≈ suminagashi), `shader-dev`, `emilkowalski-motion`,
  `algorithmic-art`, `canvas-design`.
- **Treść:** `copywriting`, `marketing-psychology`, `faq-page`, `poster-hero`.

Źródło: github.com/nexu-io/open-design (Apache-2.0).

## Co to jest

Landing page projektu **MangaShift** (pipeline: statyczna manga → wideo). Strona statyczna
hostowana na **Cloudflare Pages**, domena: <https://mangashift.com>.

## Stack i komendy (**bun** — nigdy npm/yarn)

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 · framer-motion · gsap · ogl.
`output: 'export'` → statyczny build do `out/` (bez serwera). Domena własna `mangashift.com` → bez `basePath`.

```bash
bun install                 # instalacja deps (frozen-lockfile w CI)
bun run dev                 # dev server (Turbopack)
bun run build               # statyczny export do out/
bun run lint                # eslint (Next core-web-vitals + typescript)
bun run type-check          # tsc --noEmit
```

Przed commitem: `type-check` + `lint` + `build` (wszystkie zielone).

## Architektura (`src/`, Feature-Sliced Design)

- `app/` — Next App Router (`layout.tsx`, `page.tsx`, `globals.css`). Metadane SEO/OG w `layout.tsx`.
- `widgets/` — sekcje strony: Header, Hero, About, Demo, FAQ, Contact, Footer.
- `features/` — funkcje domenowe (np. `VideoPlayer`).
- `shared/` — `ui/` (komponenty wielokrotnego użytku) + `lib/` (utils).

`suminagashi-fjdbyyqi-demo/` to wgrane statyczne demo (nie kod aplikacji) — ignorowane przez ESLint,
nie jest serwowane przez Pages (workflow publikuje tylko `out/`).

## Deploy (Cloudflare Pages)

Push na `main` → Cloudflare Pages sam buduje (`bun run build`) i publikuje katalog `out/`
pod domeną `mangashift.com`. Build i deploy w pełni po stronie Cloudflare (zero GitHub Actions).

## Git/GitHub (GitHub Flow)

Szczegóły: skill `git` (`.claude/skills/git/`). Esencja:

- **Model: GitHub Flow.** `main` zawsze deployowalny. 1 ficzer = 1 branch = 1 PR = squash merge.
- **Branch:** `<type>/<opis>` (kebab-case, type z: feature/fix/perf/chore/docs/refactor/ci).
- **Commit:** Conventional Commits — `type(scope): opis` (tryb rozkazujący, lowercase, ≤72 zn., atomic).
  **Bez stopki `Co-Authored-By: Claude`** (decyzja usera).
- Push/commituj tylko gdy user prosi.

## Konwencje

- 🚨 **Pliki są UTF-8 (LF) — NIGDY nie edytuj ich przez PowerShell** (`Get/Set-Content`, `Out-File`),
  tylko Edit/Write, bo PS 5.1 niszczy polskie znaki (mojibake).
- **Frontend praktycznie bez komentarzy** — kod ma tłumaczyć się sam. Żadnych rozwlekłych bloków.
- TypeScript strict. React 19 + Tailwind v4. Zależności: `bun add` / `bun remove`.

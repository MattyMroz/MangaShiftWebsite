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

## Co to jest

Landing page projektu **MangaShift** (pipeline: statyczna manga → wideo). Strona statyczna
hostowana na **GitHub Pages**: <https://mattymroz.github.io/MangaShiftWebsite/>.

## Stack i komendy (**bun** — nigdy npm/yarn)

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 · framer-motion · gsap · ogl.
`output: 'export'` → statyczny build do `out/` (bez serwera). `basePath` = `/MangaShiftWebsite` w produkcji.

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

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml`: push na `main` → `setup-bun` → `bun install --frozen-lockfile`
→ `bun run build` → upload `out/` → `deploy-pages`. GitHub Pages serwuje gotowy statyczny output
(bun działa tylko na etapie builda w Actions).

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

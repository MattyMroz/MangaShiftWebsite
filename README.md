# 🎌 MangaShift — Landing Page

Strona-wizytówka projektu **MangaShift** — automatycznego generatora audiowizualnych
adaptacji mangi (statyczna manga → wideo z narracją, pipeline AI: detekcja → OCR →
tłumaczenie → TTS → montaż).

🔗 **Live:** <https://mattymroz.github.io/MangaShiftWebsite/>

> Projekt w aktywnym rozwoju — strona służy jako wizytówka i zbiera zapisy na beta-testy.

## Stack

- **Next.js 16** (App Router, Turbopack) — `output: 'export'` (statyczny build, bez serwera)
- **React 19** · **TypeScript** · **Tailwind CSS 4**
- **framer-motion** (animacje) · **gsap** · **ogl** (efekty WebGL)
- Hosting: **GitHub Pages** (deploy przez GitHub Actions)
- Menedżer pakietów: **bun**

## Uruchomienie

```bash
bun install        # instalacja zależności
bun run dev        # dev server (Turbopack)
bun run build      # statyczny export do out/
bun run lint       # eslint
bun run type-check # tsc --noEmit
```

## Struktura (Feature-Sliced Design)

```
src/
├── app/        # Next App Router (layout, page, globals.css)
├── widgets/    # sekcje strony: Header, Hero, Demo, About, Contact, FAQ, Footer
├── features/   # funkcje domenowe (VideoPlayer)
└── shared/     # ui/ (komponenty reużywalne) + lib/ (utils)
```

## Deploy

Push na `main` → GitHub Actions (`.github/workflows/deploy.yml`): `setup-bun` →
`bun install --frozen-lockfile` → `bun run build` → publikacja `out/` na GitHub Pages.

## Dokumentacja

- [docs/project-brief.md](docs/project-brief.md) — wizja produktu i struktura strony
- [COMPONENT_GUIDELINES.md](COMPONENT_GUIDELINES.md) — design system (CSS variables, typografia, spacing)

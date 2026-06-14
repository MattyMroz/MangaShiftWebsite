# UI-Baza — biblioteka stylów do pisania własnego UI

Baza 4 stylów wyciągniętych z projektu Open Design (commit `bb0c049`).
Każdy styl = **prompt tematyczny + CSS + gotowy mockup HTML**. Wklejasz `PROMPT.md`
do AI (Claude/GPT/Cursor), podajesz swoją treść i dostajesz UI w danym stylu.

## Style w paczce

| Folder | Styl | Klimat | Najlepsze do |
|---|---|---|---|
| `00-atelier-zero/` | **Atelier Zero** | ciepły papierowy magazyn, koral, kolaż, rzymskie numery | landing, strona studia, portfolio |
| `01-article-magazine/` | **Article-Magazine** | długi esej, terakota, serif nagłówki, drop-cap | blog, newsletter, esej, artykuł |
| `02-digital-eguide/` | **Digital E-Guide** | 2 kartki „na biurku", Cormorant italic, creator brand | e-guide, lookbook, lead magnet, playbook |
| `03-doc-kami-parchment/` | **Doc Kami-Parchment** | pergamin + 1 granat, jeden szeryf, druk bez cieni | one-pager, raport, list, CV, changelog |

## Co jest w każdym folderze
- **`PROMPT.md`** — opis stylu (paleta hex, fonty, layout, zakazy) **+ gotowy prompt do wklejenia**. To główny plik roboczy.
- **`mockup.html`** — działający przykład; otwórz w przeglądarce (wymaga neta: Tailwind CDN + Google Fonts).
- **`mockup*.png`** — podgląd statyczny.
- **`styles.css`** — CSS wyciągnięty z mockupu (tokeny + komponenty inline).
- **`SKILL.md` / `DESIGN.md`** — pełna oryginalna specyfikacja stylu.

> `00-atelier-zero/` ma dodatkowo `atelier-zero_globals.css` (107 KB — pełny CSS produkcyjny strony), `tokens.css`, `tailwind-v4.css`, `design-tokens.json` i `mockup-components.html`.

## Jak używać
1. Wybierz styl → otwórz jego `mockup.html` (zobacz, jak wygląda) i `mockup*.png`.
2. Otwórz `PROMPT.md`, skopiuj blok **„PROMPT DO WKLEJENIA"**.
3. Wklej do AI, podmień `[STRONA/SEKCJA]` i dorzuć swoją treść.
4. Potrzebujesz dokładnych wartości? Tokeny/kolory są w `styles.css` / `tokens.css` / `PROMPT.md`.

## Źródła (w repo open-design @ bb0c049)
- Atelier Zero: `design-systems/atelier-zero/` + `apps/landing-page/app/globals.css`
- Article-Magazine: `skills/article-magazine/`
- Digital E-Guide: `design-templates/digital-eguide/`
- Doc Kami-Parchment: `skills/doc-kami-parchment/`

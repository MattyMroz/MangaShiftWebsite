# Doc Kami-Parchment — prompt stylu

**Klimat:** poważny, składany dokument („pisany jak przepuszczona przez skład
strona papieru") — nie dashboard, nie strona WWW. One-pager / raport / list /
CV / changelog / portfolio. Ciepły papier pergaminowy + jeden monochromatyczny
akcent atramentowo-niebieski + jeden krój szeryfowy. Inspiracja: tw93/kami.

## Paleta (tylko solid hex — bez rgba)
- **Pergamin (tło):** `#f5f4ed` (NIGDY czysta biel) · drugorzędne tło `#efeee5`
- Tusz: `#1f1d18` (ciepła prawie-czerń, nie `#000`) · tekst poboczny `#6b665b` · `#3a382f`
- **Jedyny kolor — atramentowy granat:** `#1B365D` — wszystkie akcenty (linki, opis tagu, ważne liczby, lewa krawędź cytatu). Zero wielobarwności.
- Linie hairline: `#d4d1c5`

## Typografia
- Jeden krój szeryfowy na język (bez mieszania): EN **Charter** / fallback **Source Serif Pro**, Iowan Old Style · CN Noto Serif SC
- Mono (etykiety/meta): **IBM Plex Mono**
- Body 400, nagłówki **500** (nigdy 700/800/900). Line-height: nagłówki 1.1–1.3, body 1.4–1.55.

## Layout
- Kontener max ~920px, padding 40px góra/dół 56px.
- Górny folio rule: meta uppercase mono + dolna hairline.
- Hero H1 `clamp(48px, 7vw, 96px)` weight 500, jedno słowo italic w granacie.
- Lede ~20px. Sekcja 3 kolumn z numerami `01/02/03 · Pillar` (mono granat).
- Pull-quote: lewa krawędź 2px granat + italic.
- Colophon w stopce („Set in … · № / №").

## Sygnatura — twarde reguły
- „Composed pages, not dashboards." Bez stosów kart KPI, bez emoji-ikon, bez hero-gradientów.
- „Ring or whisper only" — cień TYLKO jako hairline `0 0 0 1px #d4d1c5`.
- Hierarchia z **kontrastu szeryfu + rozmiaru + światła**, nie z koloru.
- Tag: solid hex blok tła (bez rgba), uppercase mono.
- Placeholdery obrazów: blok w tonie papieru + 1px granatowa krawędź.

## Zakazy
⛔ drop-shadow/blur · radius ≥ 8px · gradienty · neon/rgba · pure white/black · wiele kolorów · wagi 700+.

---
## PROMPT DO WKLEJENIA
> Złóż moją treść jako **poważny, drukarski dokument** w stylu Kami-Parchment: ciepły pergamin `#f5f4ed` (nigdy biel), tusz `#1f1d18`, JEDEN akcent — atramentowy granat `#1B365D` (linki, ważne liczby, lewa krawędź cytatu, opis tagu). Jeden krój szeryfowy w całości (Source Serif Pro/Charter), nagłówki weight 500 (nie 700+), mono IBM Plex tylko do etykiet/meta. Górny folio rule z metadanymi, H1 `clamp(48px,7vw,96px)` z jednym słowem italic w granacie, sekcja 3 filarów z numerami mono, pull-quote z lewą granatową krawędzią, colophon w stopce. Hierarchia z kontrastu szeryfu i światła, nie z koloru. ⛔ Żadnych cieni (tylko hairline `0 0 0 1px #d4d1c5`), gradientów, zaokrągleń ≥8px, rgba, czystej bieli/czerni. Tailwind CDN, CSS inline, prawdziwa treść.

**Pliki:** `mockup.html` (gotowy render) · `styles.css` (inline CSS) · `SKILL.md` (pełna specyfikacja + typy dokumentów) · `example.md` (przykładowy input).

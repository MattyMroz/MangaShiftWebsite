# Atelier Zero — prompt stylu

**Klimat:** magazyn premium przełożony na stronę WWW. Ciepły papier, kolażowa
grafika (gipsowe popiersia + architektura), gigantyczna typografia display,
włoskowate linie (hairline), rzymskie numery sekcji, drobne redakcyjne adnotacje.
Inspiracje: Monocle, Apartamento, IDEA. Wrażenie: druk, lekko postarzony, powściągliwy — nigdy neon, nigdy hałas.

## Paleta (tylko te hex)
- Papier (tło): `#efe7d2` · papier-warm `#ece4cf` · papier-dark `#ddd2b6` · karta `#f7f1de`
- Tusz (tekst): `#15140f` · soft `#2a2620` · mute `#5a5448` · faint `#8b8676`
- **Koral (jedyny gorący akcent):** `#ed6f5c` (hover `#f08e7c`) — CTA, rzymskie numery, kropka na końcu nagłówka
- Biżuteria (≤1% powierzchni): musztarda `#e9b94a`, oliwka `#6e7448`
- ⛔ Nigdy czysta biel `#fff` ani czysta czerń `#000`. Najciemniej = tusz `#15140f`.

## Typografia
- Display/sans: **Inter Tight** 700–900, letter-spacing −0.025…−0.04em
- Italic serif (emocjonalne słowa w nagłówkach): **Playfair Display** Italic 500
- Body: **Inter** 300–500 · Mono: **JetBrains Mono** (koordynaty, SHA, „FIG. 01")
- Konstrukcja nagłówka: bold sans + wtrącone italic-serif na rzeczowniku + koralowa kropka `.`

## Layout
- Kontener max 1360px, padding 64px. Sekcje 130px góra/dół.
- **Górny pasek metadanych** (Vol./Issue, „Filed under…", pulsująca kropka) — obowiązkowy.
- **Reguła sekcji** u góry każdej: `[I.] · [meta] · [004 / 008]`.
- Dwie pionowe szyny (36px) po bokach z obróconym tekstem.
- Stopka: gigantyczne słowo marki `clamp(70px, 13vw, 200px)`.
- Tekstura papieru: `::before` z szumem SVG ~5–7% + 2 miękkie gradienty radialne `rgba(106,92,56,0.06)`.

## Komponenty
- Przycisk primary: koral fill, biały tekst, radius 999px, strzałka `↗`.
- Karty: tło `#f7f1de`, radius 18px, numer `01–04` italic-serif + tag, narożna strzałka koralowa na hover.
- Obrazy: 4 narożne klamry (hairline) + numer „Plate Nº" + koordynata/SHA.

## Zakazy
⛔ Cienie >30px blur · gradienty na tekście · glassmorphism/neon/neumorphism · radius >24px · >1 koralowy CTA na ekran · pominięty rzymski numer · emoji w treści produktu.

---
## PROMPT DO WKLEJENIA
> Zaprojektuj [STRONA/SEKCJA] w stylu **Atelier Zero**: ciepły papierowy magazyn (tło `#efe7d2`, tusz `#15140f`, jedyny akcent koral `#ed6f5c`). Typografia: Inter Tight 800 na nagłówki z wtrąconymi słowami Playfair Display Italic 500 i koralową kropką na końcu; body Inter; mono JetBrains do koordynat. Dodaj górny pasek metadanych, reguły sekcji z rzymskimi numerami (I., II., III.), włoskowate linie, narożne klamry przy obrazach i gigantyczne słowo marki w stopce. Bez czystej bieli/czerni, bez cieni >30px, max jeden koralowy CTA na ekran. Użyj prawdziwej treści, nie lorem ipsum.

**Pliki (REALNA home page Open Design):**
- `home-page-site\index.html` — **DZIAŁAJĄCA** strona główna: dwuklik otwiera ją w przeglądarce z pełnymi stylami, obrazkami i fontami (assety obok w `_astro/`). To jest to, czego chciałeś.
- `home-page.css` — pełny źródłowy CSS strony (`globals.css`, 107 KB) do podglądu/kopiowania.
- `DESIGN.md` — pełna specyfikacja systemu Atelier Zero.
- `mockup-home.png` — podgląd statyczny.

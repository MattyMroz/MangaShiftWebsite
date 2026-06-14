# Digital E-Guide — prompt stylu

**Klimat:** dwustronicowy podgląd cyfrowego przewodnika (e-guide / lookbook /
lead magnet / playbook). Ton lifestyle/creator brand, dużo negatywnej przestrzeni,
serif display z italic ligaturami, staranny rytm kolumn. Dwie kartki „leżące na biurku"
z lekkim obrotem (magazine-on-desk).

## Paleta (tylko te hex)
- Backdrop (tinted): `#d8c8c0` (+ gradienty radialne `#e8d4cc`, `#c79a8e`)
- Papier kartki: `#faf3ea` · drugi ton `#f4ecdf`
- Tusz: `#1f1c14` · mute `#837964` · linie `#d3c9b3`
- **Akcent:** `#c44a47` (czerwień) + `#e07d52` (terakota)

## Typografia
- Display serif (tytuły, jedno słowo italic flourish): **Cormorant Garamond** 500/700 + ital
- Body serif: **DM Serif Text** · Sans pomocniczy: system-ui/Inter
- Mono (statystyki, etykiety, numery TOC, leader dots): **IBM Plex Mono**

## Layout
- Dwie kartki **600×860px**, paper-tone, cień 6px, lekki przeciwny obrót (±0.6deg).
- **Strona 1 — okładka:** eyebrow („STYLE & FORMAT GUIDE FOR CREATORS") → display title z mieszanymi wagami i jednym słowem italic → 3-komórkowy wiersz statystyk (mono, separator `·`) → „What's inside" 2-kolumnowy spis treści z numerami stron (mono, leader dots) → stopka + numer 01.
- **Strona 2 — rozkładówka:** eyebrow z numerem rozdziału („CHAPTER 02 · TONE") → display sub-title → 2-kolumnowy body: akapit + numerowana lista 4 kroków → pull-quote przy krawędzi (duży italic display, kolor akcentu) → pasek „EXERCISE" (mono label + 1 zdanie italic) → stopka + numer 18.

## Sygnatura
- Italic akcent dokładnie raz na stronę.
- Mono tylko do etykiet, statystyk i numerów TOC.
- Hierarchia: tytuł rządzi stroną 1, sub-title rządzi stroną 2.
- Subtelny dekoracyjny dot/sticker (CSS) w narożniku.

## Zakazy
⛔ Brak hierarchii editorialnej · italic więcej niż raz/stronę · mono w body · zewnętrzne obrazki (placeholdery rysuj blokami CSS).

---
## PROMPT DO WKLEJENIA
> Zaprojektuj cyfrowy e-guide jako **dwie kartki obok siebie** w stylu lifestyle/creator: backdrop `#d8c8c0` z miękkimi gradientami, kartki `#faf3ea` 600×860px z cieniem 6px i lekkim przeciwnym obrotem (±0.6deg). Strona 1 = okładka (eyebrow → wielki display title Cormorant Garamond z jednym słowem italic → wiersz 3 statystyk w IBM Plex Mono → spis treści 2-kolumnowy z leader dots → stopka 01). Strona 2 = rozkładówka (eyebrow „CHAPTER 02 · …" → sub-title → 2 kolumny: akapit + numerowana lista 4 kroków → duży italic pull-quote w kolorze akcentu `#c44a47` → pasek EXERCISE → stopka 18). Italic akcent raz na stronę, mono tylko do etykiet/statystyk. Dużo powietrza. Tailwind CDN + Google Fonts, CSS inline, prawdziwa treść.

**Pliki:** `mockup.html` (gotowy render) · `styles.css` (inline CSS) · `SKILL.md` (pełny workflow + output contract).

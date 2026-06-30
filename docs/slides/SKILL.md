---
name: slides
description: |
  Konstruktor prezentacji MangaShift. Jeden samodzielny plik HTML w stylu strony
  mangashift.com (koral #e87058, ziarno, Inter Tight / Playfair / JetBrains Mono),
  z galerią 25 typów slajdów do kopiowania. USE FOR: zrobić prezentację / deck /
  slajdy z jednego promptu — mało tekstu, dużo wizualizacji, czasem wykresy.
triggers:
  - "slides"
  - "prezentacja"
  - "deck"
  - "slajdy"
  - "zrób prezentację"
---

# slides — konstruktor prezentacji

Pod parasolem skilla **`simple`** (chirurgicznie, KISS/YAGNI, jawne założenia).

## Czym to jest

`template.html` = **żywa galeria-wzornik**: gotowy `<style>` (styl strony) + `<script>`
(silnik nawigacji) + **25 typów slajdów** jako bloki `<section class="slide">` do kopiowania.

Robisz deck = kopiujesz template, zostawiasz potrzebne typy, podmieniasz treść, przenumerowujesz.

## Zasady (twarde)

1. **1 plik `.html`**, zero zależności. Wykresy = czysty CSS/SVG (zero bibliotek).
2. **Mało tekstu, dużo wizualizacji.** Nagłówek + 1–2 zdania, reszta = kafelki / wykresy / diagramy.
   Limit: `h2` ≤ ~16 słów, akapit ≤ 2 zdania, kafelek ≤ 1 zdanie.
3. **Numeracja stron OBOWIĄZKOWA** — `<span class="pageno">XX / NN</span>` na każdym slajdzie, ciągła.
4. **Okładka (TYP 01) zawsze.** Werdykt/podsumowanie (TYP 24) i zamknięcie (TYP 25) **opcjonalne** — tylko gdy są wnioski.
5. **Nie ruszać `<style>` ani `<script>`** — tylko bloki `.slide`.
6. **UTF-8, polskie znaki, edycja przez Edit/Write** (nigdy PowerShell — niszczy diakrytyki).

## Jak zrobić deck (1 prompt)

1. Skopiuj `template.html` → `<temat>.html` (w `temp/slides/` lub gdzie user wskaże).
2. Z 25 wzorców **zostaw tylko potrzebne**; kopiuj blok ile razy trzeba; usuń resztę.
3. Podmień treść (nagłówki, kafelki, dane wykresów). **Tnij tekst do minimum.**
4. **Przenumeruj** `pageno` (`01 / N` … `N / N`) i popraw `data-slide-kind`.
5. Otwórz w przeglądarce, sprawdź wszystkie slajdy + tryb ESC (overview).

## Katalog 25 typów (`data-slide-kind`)

| # | Typ | Do czego |
|---|-----|----------|
| 01 | cover | okładka + agenda |
| 02 | section | przerywnik rozdziału (ciemny) |
| 03 | content | tekst + panel/cytat |
| 04 | quote | pull quote pełnoekranowy |
| 05 | tiles-3 | trzy kafelki |
| 06 | tiles-4 | cztery filary/funkcje |
| 07 | eval | ocena ✓ / ! / → |
| 08 | steps | kroki numerowane |
| 09 | flow | przepływ poziomy → |
| 10 | matrix | macierz / tabela porównań |
| 11 | bars | słupki pionowe (CSS) |
| 12 | hbars | słupki poziome / ranking |
| 13 | donut | wykres kołowy (SVG) |
| 14 | kpi | trzy metryki |
| 15 | bigstat | jedna wielka liczba |
| 16 | compare | przed/po, dwie kolumny |
| 17 | timeline | oś czasu |
| 18 | checklist | lista kontrolna |
| 19 | feature | obraz/zrzut + tekst |
| 20 | stack | technologie / chipy |
| 21 | source | długi cytat źródłowy |
| 22 | two-stat | dwie liczby obok siebie |
| 23 | quote-dark | cytat na ciemnym |
| 24 | verdict | werdykt + score (opcjonalny) |
| 25 | close | zamknięcie / CTA (opcjonalny) |

## Motyw akcentu (jeden na cały deck)

W `:root` jest blok `/* MOTYW */`. Akcent decka = **jedna** para `--accent` + `--accent-rgb`.
Podmień ją raz → cały deck się przebarwia. Gotowce: koral (domyślny), bursztyn, zieleń, śliwka.
Akcent jest **spójny dla całości**, NIE rotuje per rozdział.

## Paleta danych (pełna, niezależna od akcentu)

Wykresy i kafle korzystają z **całej palety**, nie tylko akcentu — żeby slajdy żyły:
`--c-coral` `--c-amber` `--c-green` `--c-plum` `--c-ink`. Używaj różnych barw obok siebie.

## Pomoce wizualne

- **Tony tła:** `data-tone="accent|amber|dark"` na `<section>` (domyślnie kremowe-papierowe).
- **Layout:** `layout-left` / `layout-right` (2 kolumny) · `layout-full` · `layout-center`.
- **Kolory znaczeniowe:** `.ok` (zielony=plus) · `.bad` (koral=uwaga) · `.fix` (bursztyn=poprawka).
- **Kafle kolorowe:** `t-coral` / `t-amber` / `t-green` / `t-plum` (górna kreska + ikona w kolorze).
- **Wykresy wielokolorowe:**
  - słupki: `.col.coral|amber|green|plum|mute`, wysokość `style="height:NN%"`;
  - poziome: `.fill.amber|green|plum`, szerokość `style="width:NN%"`;
  - donut: `stroke` = `var(--c-…)`, `stroke-dasharray="dł 502.6"` + `stroke-dashoffset` (obwód r=80 ≈ 502.6, segmenty sumuj w offsecie).
- **KPI kolorowe:** `.val.coral|amber|green|plum` + na karcie `.kpi.amber|green|plum` (lewa kreska).
- **Watermark:** `<div class="watermark">N</div>` — wielki numer/znak w tle.

## Wzór open-design (opcjonalnie, na przyszłość)

Idea „template + data” z open-design: jeśli kiedyś chcemy odświeżalne dane, treść
slajdów może trafić do `data.json` z bindingiem `{{data.path}}`. Na teraz **nie używamy** —
deck to jeden statyczny plik.

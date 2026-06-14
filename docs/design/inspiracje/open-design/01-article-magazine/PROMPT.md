# Article-Magazine — prompt stylu

**Klimat:** dopracowany długi esej / artykuł blogowy (styl „公众号"/newsletter).
Markdown zamieniony w elegancki long-form HTML. Jedna kolumna, dużo powietrza,
serif w nagłówkach, terakotowy akcent. Idealne na: blog, esej, newsletter, artykuł.

## Paleta (tylko te hex)
- Papier (tło): `#fafaf7` · linie: `#e7e5e0`
- Tusz: `#1a1a1a` (tekst body `#262421`) · mute: `#6b6760`
- **Akcent (terakota):** `#b8553a` — linki, lewa krawędź cytatu, drop-cap, eyebrow
- Twitter blue (opcjonalny banner źródła): `#1d9bf0`
- Tło code/inline: `#f0ece5`

## Typografia
- Body: **Inter** + Noto Sans SC (1.0625rem, line-height 1.8, max 65ch)
- Nagłówki H2/H3 + cytaty: **Noto Serif SC** / Georgia serif (kontrast do body)
- `.serif` class na display; drop-cap = pierwsza litera float-left, serif, koralowa

## Layout
- Jedna kolumna, max-width **720px**, wyśrodkowana, padding górny 80px.
- Hero: eyebrow (uppercase, tracking 0.22em, akcent) → wielki H1 serif `~3rem` → lede (mute, light) → meta row (avatar gradient + autor + data + czas czytania) z dolną linią.
- `<hr>` jako wyśrodkowany ornament (`· · ·`, krótkie linie po bokach).
- Tekstura `grain`: `::before` fixed z 2 gradientami radialnymi `rgba(106,92,56,0.04–0.05)`.
- Cytat: lewa krawędź 3px akcent + italic serif + mute.
- Karta na końcu („jeśli przydatne — podaj dalej").

## Sygnatura
- Linki: podkreślenie z `text-underline-offset:3px`, kolor akcentu.
- Listy: własny bullet (kwadracik / koralowa kropka).
- Code: zaokrąglony, jasne tło `#f0ece5`, mono, kolor `#7a3d27`.

## Zakazy
⛔ Wiele kolumn w treści · ciężkie cienie · neon · placeholdery/lorem ipsum.

---
## PROMPT DO WKLEJENIA
> Zamień moją treść w dopracowany długi artykuł HTML w stylu **magazynowego eseju**: jedna kolumna max 720px na ciepłym papierze `#fafaf7`, tusz `#1a1a1a`, terakotowy akcent `#b8553a`. Body Inter (1.0625rem / line-height 1.8), nagłówki i cytaty serif (Noto Serif/Georgia) dla kontrastu. Hero: mały uppercase eyebrow → duży serif H1 → lede → wiersz meta (autor · data · czas czytania) z linią pod spodem. Cytaty z lewą koralową krawędzią + italic. Drop-cap na początku sekcji, własne bullety, subtelna tekstura ziarna. Sekcje rozdzielaj ornamentem `· · ·`. Tailwind CDN + Google Fonts, CSS inline, prawdziwa treść (bez lorem ipsum).

**Pliki:** `mockup.html` (gotowy render) · `styles.css` (inline CSS) · `SKILL.md` (specyfikacja) · `example.md` (przykładowy input).

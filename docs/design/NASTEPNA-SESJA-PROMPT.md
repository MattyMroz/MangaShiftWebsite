# Prompt pod następną sesję — dopracowanie UI (na żywym kodzie React)

> Skopiuj treść poniżej do nowej sesji jako pierwszą wiadomość.

---

Dopracuj UI strony MangaShift **bezpośrednio na istniejącym kodzie React** — żadnych osobnych
mockupów HTML, żadnego budowania od zera. Pracujemy na rzeczywistych komponentach w `src/`,
zmiany widać na żywo na `bun run dev` (localhost:3000).

## Zasady pracy (twarde)
- **Skille są obowiązkowe.** Zacznij od `simple` (parasol nad wszystkim). Do designu wczytaj i
  realnie zastosuj: `ui-ux-design` (37 zasad), `frontend-design`, `impeccable-design-polish`,
  `redesign-skill`, `color-expert`. Do animacji: `gsap-core`, `gsap-scrolltrigger`, `gsap-react`,
  `emilkowalski-motion`. Wczytuj te, które faktycznie pomagają w danej sekcji.
- **Chirurgiczne zmiany na istniejących plikach** (Edit/Write), nie przepisywanie strony.
- Zachowaj stack i konwencje: Next 16, React 19, Tailwind v4, framer-motion + gsap, tokeny CSS
  z `globals.css`, FSD (`src/widgets/`). Frontend **bez komentarzy**. Pliki UTF-8 LF — nigdy PowerShell.
- bun, nie npm. Przed końcem: `type-check` + `lint` + `build` zielone.
- Weryfikuj wizualnie (CDP screeny z `temp/`), nie zgaduj.

## Co poprawić (priorytety)
1. **Kontrast akcentu (WCAG AA) — KRYTYCZNE.** Biały tekst na `--accent #e87058` daje ~3:1
   (oblewa 4.5:1) na CTA. `--accent` jako kolor tekstu na jasnym tle też oblewa. Dodaj/popraw
   token ciemniejszego akcentu do tekstu/CTA na jasnym tle, zostaw `#e87058` na wypełnienia i
   ciemne tła. Zweryfikuj wszystkie CTA i serif-italic emfazy.
2. **Animacje wejścia/scroll na całej stronie** — spójny system reveal (fade+y, stagger) przez
   GSAP ScrollTrigger lub framer `whileInView`, hero kaskada, micro-interakcje (hover lift,
   magnetyczne CTA, akordeon FAQ smooth). Szanuj `prefers-reduced-motion`.
3. **Placeholdery** — dopracuj te które wyglądają szkicowo, by były ładne (palety, podpisy mono).
4. **Sekcje do podniesienia** (z wcześniejszego przeglądu): Gallery (strip mniejszych kafelków,
   nie wielkie), Demo (rozbuduj dół — "From page to sequence"), FAQ (sticky lead + wielka cyfra).
5. **Dostępność**: `:focus-visible` ring 2px, touch target ≥44px, aria na akordeonie FAQ.
6. Wzoruj się na C:\Users\MattyMroz\Desktop\PROJECTS\MangaShiftWebsite\docs\design\inspiracje\open-design\00-atelier-zero\home-page-site w możesz duzo z niego wynieść np w senie taki że nap po bokach czy coś mozesz wzorac się tea na tym powaianym stylu: C:\Users\MattyMroz\Desktop\PROJECTS\MangaShiftWebsite\docs\design\inspiracje\open-design\02-digital-eguide 


## Workflow
Pracuj **sekcja po sekcji** (Hero → About → How → Features → UseCases → Gallery → Demo → FAQ →
Beta → Footer). Dla każdej: wczytaj komponent, zastosuj zasady skilli, edytuj na miejscu,
zweryfikuj screenem, przejdź dalej. Pytaj tylko o realne rozwidlenia decyzji, drobiazgi rób sam.
Ale też PRACUJ GLOBALNIE! TAK BY WSKZO WSPÓAGAŁO NIE BYŁO POWTADZJAĆYCH SIĘ ELTÓW TAM GDZI SĄ PALCEHLEDY I DUZ ZRTOB ORGIANLNEI I PIĘTRKNIE 

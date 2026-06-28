# brief: styl wizualny + waifu/maskotka

> status: DRAFT (zrewidowany po referencjach KotteriArt) — 2026-06-27
> źródło: `2026-06-27-styl-wizualny-i-waifu-maskotka.md` | tryb: small
> referencje: `docs/design/inspiracje/waifu/` (110 prac KotteriArt, autor mangi „Veil")

## ⭐ BENCHMARK: KotteriArt (twitter.com/KotteriArt)
User wskazał konkretny styl docelowy. Analiza 6 prac potwierdza — to niemal idealny match dla MangaShift:
- **tusz line-art + spot-color** (czarny tusz na papierze + POMARAŃCZOWO-CZERWONY akcent) = 1:1 z paletą strony
- **diwy**: dojrzałe, pewne siebie, eleganckie (kieliszek wina, czerwone paznokcie, opadające powieki) — NIE moe
- mocne czarne plamy + gęsty hatching, dramatyczny kontrast, edytorialne
- **WNIOSEK: napięcia diva↔minimalizm NIE MA** — KotteriArt dowodzi że tuszowa diva z pomarańczowym akcentem to jedna spójna estetyka. To dokładnie świat MangaShift.

## tl;dr
Strona ma już spójny język (papier + tusz + koral). Dochodzą postacie: waifu-diva + maskotka-puszek. Kierunek POTWIERDZONY przez referencje: styl KotteriArt — tuszowy line-art z pomarańczowym spot-color, dojrzała diva. Maskotka = ożywiona kropla tuszu w tym samym języku.

## decyzja
- **Kolory:** 60% papier / 30% tusz / 10% akcent. Na START (home page) akcent = POMARAŃCZOWY (paleta strony teraz). DOCELOWO postać nie ogranicza się do 1 koloru — różne odsłony mogą mieć różny akcent (styl ma ewoluować/„dukać się"). Generujemy pomarańczowo na początek.
- **Waifu — WIZJA USERA:** jedna spójna postać, ale o WIELU ODSŁONACH (garderoba — nie jeden strój, prawdziwa diva ze stylem). Charakter: **pewna siebie + kobieca siła, a jednocześnie delikatna**. Tuszowy line-art KotteriArt na papierze, blond, pomarańczowy akcent na start. Twarz/przewodniczka produktu.
- **Maskotka:** „sumi-dama" — puchata kropla czarnego tuszu, kawaii, pomarańczowy rumieniec. Chowaniec divy. Ucieleśnia misję statyczne→żywe.
- **Narzędzie generowania:** OpenAI GPT Image 2.

## zadania
### 🔴 krytyczne
- [ ] **Wygenerować waifu** promptami z rozważania → 4-6 wariantów → wybór 1 kierunku → **rezultat:** kierunek waifu zatwierdzony
- [ ] **Wygenerować maskotkę** (character sheet) → **rezultat:** spójny puszek + pozy
- [ ] **Potwierdzić oczy waifu** (koralowo-bursztynowe vs tuszowe) → **rezultat:** finalny look

### 🟡 wysokie
- [ ] **Wrzucić wybrane do `docs/design/inspiracje/`** i iterować z Claude → **rezultat:** zatwierdzone assety
- [ ] **Sformalizować 60/30/10 w CSS** (komentarz/dokumentacja tokenów) → **rezultat:** jasny system

### 🟢 normalne
- [ ] **Logo** (osobny temat — teraz tekstowe „MangaShift.")
- [ ] **Podmienić placeholdery na home** na finalne assety → DOPIERO wtedy dopracowanie wyglądu
- [ ] **Dynamiczny akcent SVG** (postać reaguje na gallery) — etap 2

## ryzyka
| ryzyko | trigger | akcja |
|--------|---------|-------|
| waifu wychodzi jak generyczne anime | pełny kolor/cieniowanie w outputcie | wzmocnić negatywy, trzymać line-art |
| za sucho/za mało „diva" | hero bez wow | zwiększyć udział koralowego elementu (W4) lub przejść w sumi-e (W1) |
| maskotka cała koralowa | psuje proporcję 10% | tylko rumieniec/oczko koralowe, reszta tusz |

## 🎨 PROMPTY (GPT Image 2 — naturalny opisowy język + obrazek referencyjny)

> 💡 GPT Image 2 działa najlepiej gdy: (1) opiszesz scenę zdaniami, (2) DOŁĄCZYSZ 1-2 obrazki referencyjne z folderu waifu/ jako wzór stylu, (3) jasno powiesz czego NIE chcesz. Generuj kwadrat 1024² lub portret 1024×1536.

### Waifu — hero (główna, na home)
```
Create an editorial manga ink illustration of an elegant diva woman — confident and
powerful, yet delicate and feminine. Bold black brush-pen linework on warm cream paper,
dramatic solid black shadow shapes and fine hatching, expressive eyelashes, flowing
blonde hair, half-lidded sophisticated gaze. Use a SINGLE warm orange accent color as a
spot-color (her lips, a ribbon, or an orange sun/ink splash behind her) — everything
else is black ink on cream paper. Lots of negative space, poster-like composition.
Match the hand-drawn ink style of the attached reference. No full color, no soft anime
shading, no digital gradients — pure ink-on-paper aesthetic.
[ZAŁĄCZ 1-2 obrazki z folderu waifu/ jako referencję stylu]
```

### Waifu — portret (mniejsze użycia)
```
An editorial ink portrait of the same blonde diva — confident but gentle. Black manga
brush-pen linework on cream paper, dramatic black masses, hatching for shadows. Only
her lips and nails are colored, in warm orange — the rest is pure black ink. Mature,
self-assured expression. Match the attached reference style. No full color.
```

### Maskotka — kropla tuszu „sumi-dama"
```
A small round fluffy mascot character shaped like a living drop of black sumi ink — a
cute tamagotchi-like creature with a simple kawaii face, on warm cream paper. Bold
brush-pen ink outline matching the diva illustrations. Its only color is a tiny warm
orange blush on the cheeks. Soft, friendly, minimal. No rainbow colors, no complex
detail — pure ink with one orange accent.
```

### Wariant: garderoba (różne odsłony tej samej divy)
```
Show the same diva character in [a flowing evening gown / a casual coat / a kimono],
keeping her face, blonde hair and ink style identical to the reference. Black ink on
cream paper, single orange accent. Consistent character, different outfit.
```

> 🔑 KLUCZ do spójności w GPT Image 2: ZAWSZE dołączaj ten sam obrazek waifu (gdy już masz dobry) jako referencję, żeby twarz/styl się nie zmieniały między odsłonami.

> Workflow: 1) wygeneruj 4-6 wariantów hero z różnymi refkami z folderu → 2) wybierz JEDNĄ twarz/kierunek → 3) tę jedną używaj jako referencję do kolejnych odsłon (garderoba) i maskotki → 4) wrzucaj wyniki do inspiracje/ i iterujemy.

## otwarte pytania
- ❓ Oczy waifu: pomarańczowo-bursztynowe vs tuszowo-czarne? (KotteriArt często: czarne oczy + pomarańczowe usta/paznokcie)
- ❓ Logo teraz czy po waifu?
- ❓ Konkretna pierwsza odsłona na home: gala/glamour, elegancki portret, czy luźny szkic?

# styl wizualny i waifu/maskotka mangashift

> tryb: small ideate · data: 2026-06-27
> kontekst: edytorialny minimalizm (papier + tusz sumi-e + koralowy akcent), dochodzi waifu-diva + maskotka-tamagotchi

---

## 🎯 Definicja Problemu

MangaShift ma spójny, dojrzały język wizualny (kremowy papier + czarny tusz/suminagashi + koralowo-pomarańczowy akcent „japońskiego słońca", akcent zmienialny przez gallery). Ale brakuje **tożsamości postaci**: waifu (diva, blondynka) + maskotki (tamagotchi-stworek „puszek"). Bez nich dopracowanie home jest robotą na ślepo (obrazki-placeholdery i tak pójdą do wymiany).

Trzeba rozstrzygnąć **trzy splecione rzeczy**:
1. **System kolorystyczny** — sformalizować zasadę 60/30/10 na bazie obecnej palety.
2. **Waifu** — kim jest, jak wygląda, jak NIE zgrzyta z japońskim tuszowym minimalizmem.
3. **Maskotka** — czym jest „puszek", jak współgra z waifu i z marką.

Plus: **jak to ma ewoluować** („dukać się") — od czystego minimalizmu w stronę czegoś bogatszego, bez utraty spójności.

---

## 📐 Tablica Prawdy (Constraints)

| # | Święta Zasada (Non-Negotiable) | Źródło | Status |
|---|-------------------------------|--------|--------|
| 1 | Bazowa paleta: papier kremowy + czerń tuszu + koralowo-pomarańczowy akcent | user + repo | 🔒 ABSOLUTNA |
| 2 | Akcent musi zostać zmienialny przez gallery (system presetów) | repo (theme-presets.ts) | 🔒 ABSOLUTNA |
| 3 | Estetyka: edytorialny minimalizm, japoński tusz (sumi-e/suminagashi), yohaku (pustka) | user + repo | 🔒 ABSOLUTNA |
| 4 | Waifu = diva, blondynka | user | 🔒 ABSOLUTNA |
| 5 | Maskotka = tamagotchi-stworek „puszek" reprezentujący apkę | user | 🔒 ABSOLUTNA |
| 6 | Output końcowy: briefy + prompty do generowania AI (user sam generuje) | user | 🔒 ABSOLUTNA |
| 7 | Styl pomarańcz+czerń zostaje kierunkiem (nie zmieniamy na inny) | user (lista) | 🔒 ABSOLUTNA |

> ⚠️ Napięcie centralne: **japoński tuszowy minimalizm (powściągliwy, pusty, mono) ↔ diva-blondynka (zachodnia, wyrazista, glamour)**. To nie jest constraint do złamania — to problem do *rozwiązania stylistycznie*.

---

## 🧩 Część A: SYSTEM KOLORYSTYCZNY (60/30/10)

Zasada 60/30/10 = 60% dominujący (tło), 30% drugorzędny (tekst/struktura), 10% akcent. Obecna paleta MangaShift mapuje się na to niemal idealnie:

### 💡 Pomysł K1: Klasyczne 60/30/10 — papier / tusz / koral
- **60%** kremowy papier (`#f3efe6`) — tło, oddech, yohaku
- **30%** czarny tusz (`#171715`) — tekst, ramki, ilustracje sumi-e
- **10%** koralowy akcent (`#e87058`) — słońce, CTA, podkreślenia
- **Mocne:** 1:1 z obecnym stanem i referencją taste-triangle. Zero pracy do wdrożenia — to już jest.
- **Słabe:** „tylko" 3 kolory — może być za ubogie gdy dojdzie waifu (postać potrzebuje cielistości, włosów blond, oczu).
- **Ocena:** ⭐⭐⭐⭐⭐⭐⭐⭐☆☆ (8/10) — solidny fundament, ale niekompletny dla postaci.
- **Test tablicy:** ✅

### 💡 Pomysł K2: 60/30/10 + paleta postaci (rozszerzenie)
Trzy kolory marki ZOSTAJĄ jako 60/30/10 strony. Waifu/maskotka dostają **wąską, podporządkowaną paletę postaci** wyprowadzoną z bazy:
- blond włosy = **rozjaśniony papier/piasek** (nie żółty — ciepły kremowy blond, z rodziny 60%)
- skóra = **bardzo jasny warm-grey/papier** (tusz rozcieńczony)
- usta/rumieniec/oczy = **koral** (akcent 10% — postać „nosi" markowy akcent na sobie!)
- cienie/kontury = **tusz** (30%)
- **Mocne:** waifu staje się fizycznym ucieleśnieniem palety marki. Koral w jej oczach/ustach = sprytne. Spójność absolutna.
- **Słabe:** wymaga dyscypliny przy generowaniu (łatwo o „kolorowy" obrazek który zepsuje monochrom).
- **Ocena:** ⭐⭐⭐⭐⭐⭐⭐⭐⭐☆ (9/10) — rozwiązuje napięcie postać↔minimalizm przez kolor.
- **Test tablicy:** ✅

### 💡 Pomysł K3: Dynamiczny akcent (postać reaguje na gallery)
Skoro akcent jest zmienialny przez gallery — waifu/maskotka mogłyby być **dwukolorowe**: tusz + akcent, gdzie akcent renderowany dynamicznie (SVG/warstwa). Zmiana akcentu w gallery → zmienia kolor słońca, ust waifu, „puszku" maskotki.
- **Mocne:** spektakularne, unikalne, wykorzystuje istniejący system. „Żywa" maskotka.
- **Słabe:** trudne technicznie (postać jako SVG z wymienialnym kolorem, nie rastrowy obrazek AI). Duży nakład.
- **Ryzyko:** AI-generated raster nie da się łatwo przebarwić; trzeba by ilustracji wektorowej.
- **Ocena:** ⭐⭐⭐⭐⭐⭐⭐☆☆☆ (7/10) — genialne docelowo, za ciężkie na teraz. Plan na później.
- **Test tablicy:** ✅

---

## 🧩 Część B: WAIFU (diva, blondynka)

Centralne pytanie: **jak pogodzić divę-blondynkę z japońskim tuszem?** Generuję podejścia stylistyczne.

### 💡 Pomysł W1: Sumi-e diva — diva narysowana tuszem
Waifu rysowana w stylu **sumi-e/ink-wash**: czarny tusz, ekspresyjne pociągnięcia pędzla, blond = jasne partie niezamalowane (papier), koral tylko na ustach/oczach/kwiacie we włosach.
- **Mocne:** ZERO zgrzytu — diva mówi językiem strony. Elegancka, dojrzała, „editorial". Pasuje do yohaku.
- **Słabe:** mniej „anime/waifu" w popularnym sensie — bardziej artystyczna ilustracja. Może nie tego user oczekuje pod słowem „waifu".
- **Ocena:** ⭐⭐⭐⭐⭐⭐⭐⭐⭐☆ (9/10) — najbardziej spójne z marką.
- **Test tablicy:** ✅ (blondynka = jasne partie + ciepły blond)

### 💡 Pomysł W2: Manga line-art diva — czysta kreska
Waifu w stylu **czystego manga line-art** (czarny kontur na papierze, minimalne wypełnienie, screentony/raster jako tekstura). Blond przez delikatny ton, koral jako spot-color (oczy/usta/akcesorium).
- **Mocne:** to dosłownie MANGA-shift — line-art mangi to rdzeń produktu! Najbardziej „on-brand" konceptualnie. Czytelna jako „waifu".
- **Słabe:** trzeba pilnować żeby nie wpadła w generyczne anime (tony, błyski, kolor) — to zabiłoby minimalizm.
- **Ocena:** ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ (10/10) — łączy „waifu" + „manga" + minimalizm + markę. Strzał w 10.
- **Test tablicy:** ✅

### 💡 Pomysł W3: Pełnokolorowa anime waifu
Klasyczna, pełnokolorowa, cieniowana anime-diva (jak z gry/VN).
- **Mocne:** najbardziej „waifu" w potocznym sensie, atrakcyjna, popularny styl.
- **Słabe:** **łamie estetykę** — kolor + cieniowanie zabija papier+tusz+yohaku. Zgrzyt z resztą strony. Wygląda jak doklejona z innego świata.
- **Ocena:** ⭐⭐⭐☆☆☆☆☆☆☆ (3/10) — atrakcyjna osobno, niszczy spójność.
- **Test tablicy:** ⚠️ napina zasadę #3 (minimalizm/tusz).

### 💡 Pomysł W4: Hybryda — tusz + jeden kolorowy element (hero look)
Waifu w line-art/tuszu (W2), ALE z **jednym pełnokolorowym elementem** który przyciąga oko: np. tylko włosy blond w pełnym kolorze, reszta tuszowa. Albo tylko koralowy element (kimono/wstążka).
- **Mocne:** napięcie staje się *cechą* — „diva wyłaniająca się z tuszu". Bardzo edytorialne, zapadające w pamięć. Drama divy + powściągliwość tła.
- **Słabe:** trudniejsze do wygenerowania spójnie (AI lubi albo całe kolor, albo całe mono).
- **Ocena:** ⭐⭐⭐⭐⭐⭐⭐⭐⭐☆ (9/10) — najbardziej „diva", a wciąż w stylu. Mocny kandydat na hero.
- **Test tablicy:** ✅

### Osobowość waifu (niezależnie od stylu rysunku)
Diva = pewna siebie, elegancka, lekko teatralna, „primadonna" sztuki. NIE słodka/moe — raczej **dojrzała, dystyngowana, z charakterem**. To pasuje do „divy" i do dojrzałego edytorialnego tonu marki. Rola: **przewodniczka/twarz** produktu (pojawia się w hero, prowadzi przez sekcje).

> Oczy (otwarte pytanie usera): przy palecie koralowej — **oczy koralowo-bursztynowe** byłyby spójne z akcentem. Alternatywa: tuszowo-czarne (mono). Blond + koralowe oczy = egzotyczne, markowe.

---

## 🧩 Część C: MASKOTKA (tamagotchi „puszek")

### 💡 Pomysł M1: Kulka tuszu z twarzą („sumi-dama")
Maskotka = okrągły, puchaty stworek wyglądający jak **kropla/kulka tuszu** z prostą twarzą. Czarny puszek na papierze, koralowy akcent (policzki/oczko). Reprezentuje „tusz mangi ożywiony".
- **Mocne:** dosłownie ucieleśnia produkt (tusz mangi → życie → ruch/wideo). Idealnie monochrom. Tani do animacji.
- **Ocena:** ⭐⭐⭐⭐⭐⭐⭐⭐⭐☆ (9/10) — koncept 1:1 z misją MangaShift.
- **Test tablicy:** ✅

### 💡 Pomysł M2: Słońce-stworek
Maskotka oparta na koralowym „słońcu" z referencji — okrągłe, z twarzą, czasem z nóżkami.
- **Mocne:** akcent marki staje się postacią; spójność z motywem słońca.
- **Słabe:** koral to 10% akcent — maskotka cała koralowa zaburza proporcje; konkuruje z waifu o akcent.
- **Ocena:** ⭐⭐⭐⭐⭐⭐☆☆☆☆ (6/10).
- **Test tablicy:** ⚠️ napina zasadę #1 (proporcja akcentu).

### 💡 Pomysł M3: Plamka suminagashi
Stworek z nieregularnej, płynnej plamy suminagashi (marmurkowy tusz) — organiczny, „żywy atrament".
- **Mocne:** unikalny, 1:1 z suminagashi w repo, artystyczny.
- **Słabe:** trudny do utrzymania spójności jako rozpoznawalna maskotka (każda plama inna); słabo „tamagotchi" (kawaii).
- **Ocena:** ⭐⭐⭐⭐⭐⭐⭐☆☆☆ (7/10).
- **Test tablicy:** ✅

### 💡 Pomysł M4: Duszek-yokai (kawaii oni/yurei)
Mały japoński duszek (yurei/oni mini) — puchaty, kawaii, tuszowy, z koralowym akcentem.
- **Mocne:** japoński folklor + kawaii + tusz; charakterny, „tamagotchi" w duchu.
- **Słabe:** ryzyko generyczności (dużo takich maskotek istnieje).
- **Ocena:** ⭐⭐⭐⭐⭐⭐⭐⭐☆☆ (8/10).
- **Test tablicy:** ✅

> **Relacja waifu↔maskotka:** waifu = diva (elegancja, twarz marki), maskotka = puszek (ciepło, zabawa, „pet" usera). Kontrast ról dobry: diva imponuje, puszek oswaja. Maskotka może być „chowańcem" divy → spójna para.

---

## 📊 Matryca Porównawcza — WAIFU

| Kryterium | Waga | W1 sumi-e | W2 line-art | W3 kolor | W4 hybryda |
|-----------|------|-----------|-------------|----------|------------|
| Spójność z marką | 30% | ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ | ⭐⭐⭐☆☆☆☆☆☆☆ | ⭐⭐⭐⭐⭐⭐⭐⭐⭐☆ |
| „Waifu/diva" feel | 25% | ⭐⭐⭐⭐⭐⭐☆☆☆☆ | ⭐⭐⭐⭐⭐⭐⭐⭐☆☆ | ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐⭐⭐⭐⭐☆ |
| „Manga" konceptualnie | 20% | ⭐⭐⭐⭐⭐⭐⭐☆☆☆ | ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐⭐☆☆☆☆ | ⭐⭐⭐⭐⭐⭐⭐⭐⭐☆ |
| Łatwość generowania AI | 15% | ⭐⭐⭐⭐⭐⭐⭐☆☆☆ | ⭐⭐⭐⭐⭐⭐⭐⭐☆☆ | ⭐⭐⭐⭐⭐⭐⭐⭐⭐☆ | ⭐⭐⭐⭐⭐⭐☆☆☆☆ |
| Wyróżnialność | 10% | ⭐⭐⭐⭐⭐⭐⭐⭐☆☆ | ⭐⭐⭐⭐⭐⭐⭐⭐☆☆ | ⭐⭐⭐⭐☆☆☆☆☆☆ | ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ |
| **SUMA WAŻONA** | 100% | **8.0** | **9.0** | **5.4** | **8.8** |

---

## 🔍 Strategie Decyzyjne

**1. Eliminacja negatywna:** W3 (pełny kolor) napina zasadę #3 → odpada jako baza (zostaje co najwyżej jako „easter egg"). Reszta przechodzi.

**2. Premortum („rok później, wizualnie się sypie — dlaczego?"):** Bo waifu wyglądała jak doklejona anime z innego świata (=W3), albo strona straciła oddech yohaku przez przeładowanie kolorem. Wniosek: **trzymać waifu w tuszu**, kolor dawkować.

**3. First Principles:** Co jest fundamentem? Produkt = **manga → wideo**. Manga to **line-art + tusz**. Więc waifu w line-art (W2) nie jest „wyborem stylu" — to *dosłowne ucieleśnienie produktu*. To najmocniejszy argument.

**4. Red Team na W2 (line-art):** Słabość — „zbyt powściągliwa, brak wow divy". Mitygacja: **W2 jako baza + element W4** (jeden kolorowy/koralowy akcent na waifu w hero) = drama bez utraty spójności.

---

## 🏆 REKOMENDACJA FINALNA

### Kolorystyka: **K2 — 60/30/10 + podporządkowana paleta postaci** ⭐⭐⭐⭐⭐⭐⭐⭐⭐☆ (9/10)
Trzy kolory marki (papier/tusz/koral) jako 60/30/10 strony ZOSTAJĄ. Waifu/maskotka noszą koral na sobie (usta, oczy, policzki) — postać = fizyczne ucieleśnienie akcentu. K3 (dynamiczny akcent SVG) = plan na później.

### Waifu: **W2 (manga line-art) jako baza + akcent W4 (jeden koralowy element w hero)** ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ (9-10/10)
Czysta manga-kreska na papierze, tusz, blond jako ciepłe jasne partie, koral jako spot-color. W hero — jeden mocniejszy koralowy element (kimono/wstążka/słońce za nią) dla efektu „diva wyłaniająca się z tuszu". Osobowość: dojrzała primadonna, twarz/przewodniczka produktu.

### Maskotka: **M1 (kulka tuszu „sumi-dama") z domieszką M4 (kawaii duszek)** ⭐⭐⭐⭐⭐⭐⭐⭐⭐☆ (9/10)
Puchaty czarny puszek = ożywiona kropla tuszu mangi, koralowy akcent (policzki/oczko), kawaii duch japoński. Chowaniec divy. Dosłownie ucieleśnia misję „statyczny tusz → żywy ruch".

### Dlaczego nie pozostałe?
- W3 (kolor) — niszczy spójność (3/10).
- K1 (czyste 3 kolory) — dobre, ale niekompletne dla postaci.
- M2 (słońce) — zjada akcent marki.

### Plan B
Jeśli W2 wyjdzie za sucho → przesuń w stronę W1 (sumi-e, bardziej malarskie) lub zwiększ udział W4 (więcej koloru na divie).

---

## ✅❌ Podział Kontekstowy

### ✅ DOBRE tutaj
| Co | Dlaczego | Warunek |
|----|----------|---------|
| Waifu nosi koral (usta/oczy) | postać = ucieleśnienie akcentu marki | trzymać resztę w tuszu |
| Line-art = dosłowna „manga" | konceptualna spójność z produktem | nie wpaść w pełne anime |
| Maskotka = kropla tuszu | ucieleśnia misję statyczne→żywe | monochrom + 1 akcent |

### ❌ ZŁE tutaj
| Co | Dlaczego |
|----|----------|
| Pełnokolorowa anime waifu | zabija papier+tusz+yohaku |
| Maskotka cała koralowa | zaburza proporcję 10% akcentu |

### ⚠️ Zależy
| Co | Dobre gdy | Złe gdy |
|----|-----------|---------|
| Kolorowy element na waifu (W4) | jeden, celowy, w hero | rozlany na całość |
| Dynamiczny akcent SVG (K3) | jako etap 2, wektor | próba teraz na rasterze AI |

---

## 🎨 GOTOWE PROMPTY (do generowania AI)

> Działają w Midjourney / DALL-E / Nano Banana / SDXL. Dostosuj wagi. Zawsze dodawaj negatywy by trzymać minimalizm.

### Waifu — hero (W2+W4)
```
A confident diva woman, manga line-art illustration, clean black ink linework on
warm cream paper background, blonde hair rendered as light warm tones, elegant
mature primadonna expression, single coral-red accent element (silk ribbon / kimono
detail), minimal screentone shading, lots of negative space (yohaku), sumi-e ink
aesthetic, editorial poster composition, muted palette: cream paper / black ink /
coral accent only. NOT full color, NO heavy anime shading, NO busy background.
--ar 3:4 --style raw
```

### Waifu — wariant portret (spójny)
```
Editorial portrait of an elegant blonde diva, Japanese ink wash + manga line-art,
black brush ink on cream washi paper, coral-amber eyes, coral lips as the only
saturated color, restrained, sophisticated, negative space, minimalist. Mono ink +
single coral accent. --ar 1:1
```

### Maskotka — kulka tuszu (M1+M4)
```
A small round fluffy mascot creature shaped like a living drop of black sumi ink,
kawaii simple face, soft puff, on cream paper, tiny coral-red blush cheeks as the
only color accent, Japanese ink aesthetic, minimal, cute tamagotchi-like character,
clean. Monochrome ink + single coral accent, NO rainbow colors, NO complex detail.
--ar 1:1
```

### Maskotka — arkusz min (pozy/emocje)
```
Character sheet of the same round black ink-blob mascot, 6 poses and expressions
(happy, sleepy, excited, curious), consistent design, cream paper, coral blush
accent, kawaii minimal Japanese ink style. --ar 16:9
```

> **Workflow generowania:** 1) wygeneruj 4-6 wariantów waifu → wybierz 1 kierunek → 2) regeneruj pod hero w proporcji 3:4 → 3) maskotkę osobno jako character sheet dla spójności → 4) wrzuć do `docs/design/inspiracje/` i iterujemy.

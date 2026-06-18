---
name: end
description: "Autorefleksja na KONIEC sesji lub zadania. USE FOR: zanim ogłosisz że skończone, gotowe, działa, zmergowane lub przed oddaniem pracy userowi. Wymusza szczerą listę niepewności, wad/zalet i największego ślepego punktu. Antidotum na fałszywe 'jest ok'."
---

# Domknięcie (end)

Zanim powiesz "zrobione", "gotowe", "działa" albo oddasz pracę: zatrzymaj się i przejdź te trzy rzeczy. Szczerze, bez upiększania. Cel: złapać to, co przeoczyłeś, zanim zrobi to user.

Reguła nadrzędna: lepiej przyznać niepewność teraz niż udawać pewność, która pęknie później. Nie pisz "jest ok" bez dowodu. Skill `simple` mówi: dowód przed twierdzeniem.

## 1. Czego jestem najmniej pewny (lista, od najgroźniejszego)

Wypisz konkretne rzeczy, które mogą NIE działać, posortowane wg ryzyka (najpierw to, co wysadza całość). Dla każdej:
- co dokładnie jest niepewne (nie "może być bug" — który plik/założenie/integracja),
- czy to zweryfikowane czy tylko założone (cytat z docs ≠ uruchomiony test),
- co by to potwierdziło albo obaliło (konkretna komenda/test).

Twardo oddziel:
- ZWERYFIKOWANE: uruchomiłem, zobaczyłem wynik.
- ZAŁOŻONE: brzmi rozsądnie, ale nie sprawdziłem.
- USŁYSZANE: subagent/dokumentacja tak twierdzi (subagenci się mylą — traktuj jak hipotezę).

Jeśli fundament całej pracy jest w kategorii ZAŁOŻONE/USŁYSZANE, powiedz to jako pierwsze.

## 2. Wady i zalety — rozważanie

Uczciwy bilans tego, co zrobiłeś. Nie laurka.

Zalety: co realnie wyszło dobrze i dlaczego.

Wady (ważniejsze — szukaj ich aktywnie):
- Czy powstał DZIAŁAJĄCY produkt, czy tylko plan/dokument? (plan ≠ produkt)
- Co odłożone "na później", co może wrócić jako dług.
- Gdzie zaufałeś bez sprawdzenia.
- Czy nie ma analysis paralysis (dużo planowania, zero kodu / zero uruchomienia).
- Ile kosztowało vs ile dało (tokeny, kroki, czas) — czy proporcjonalnie.

## 3. Największa rzecz, z której prawdopodobnie nie zdaję sobie sprawy

Jedna rzecz. Najtrudniejsza do zobaczenia z wewnątrz własnej pracy. Pomocne pytania:
- Czy całe podejście nie jest rozwiązaniem problemu, którego nie ma? (skill `simple` krok 1-2: najpierw kwestionuj wymóg, potem USUŃ część — zanim coś dodasz/zoptymalizujesz)
- Czy nie dodaję, gdy prostsze byłoby usunąć?
- Jakie pytanie POWINIENEM był zadać userowi, a nie zadałem?
- Co user uzna za oczywiste, a ja zupełnie pominąłem?
- Gdyby ktoś mądrzejszy spojrzał na to świeżym okiem — co powiedziałby pierwsze?

To ma być niewygodne. Jeśli wyszło wygodnie, nie szukałeś wystarczająco głęboko.

## 4. Domknięcie

Po tych trzech: jeśli coś jest w kategorii ZAŁOŻONE i jest fundamentem — zaproponuj najmniejszy krok, który to zweryfikuje, ZANIM pójdziecie dalej. Nie ogłaszaj sukcesu na niesprawdzonym fundamencie.

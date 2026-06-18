---
name: simple
description: Wytyczne behawioralne mające na celu ograniczenie typowych błędów programistycznych popełnianych przez LLM. Stosuj podczas pisania, przeglądu lub refaktoryzacji kodu, aby uniknąć nadmiernego komplikowania, wprowadzać chirurgiczne zmiany, ujawniać założenia, kwestionować wymagania (algorytm 5 kroków) i definiować weryfikowalne kryteria sukcesu.
---

# Proste wytyczne

Kompromis: Te wytyczne skłaniają się ku ostrożności kosztem szybkości. W przypadku trywialnych zadań kieruj się własnym osądem.

## 1. Pomyśl, zanim zaczniesz kodować

Nie zakładaj z góry. Nie ukrywaj niezrozumienia. Mów otwarcie o kompromisach.

Przed implementacją:
- Wyraźnie określ swoje założenia. Jeśli nie masz pewności, zapytaj.
- Jeśli istnieje wiele interpretacji, przedstaw je – nie wybieraj po cichu.
- Jeśli istnieje prostsze podejście, powiedz o tym. Sprzeciw się, gdy jest to uzasadnione.
- Jeśli coś jest niejasne, zatrzymaj się. Nazwij to, co budzi wątpliwości. Zapytaj.

## 2. Przede wszystkim prostota

Minimum kodu, które rozwiązuje problem. Żadnych spekulacji.

- Żadnych funkcji poza tymi, o które proszono.
- Żadnych abstrakcji dla kodu jednorazowego użytku.
- Żadnej "elastyczności" ani "konfigurowalności", o którą nie proszono.
- Żadnej obsługi błędów dla niemożliwych scenariuszy.
- Jeśli napiszesz 200 linijek, a mogłoby ich być 50, przepisz to.

Zadaj sobie pytanie: "Czy starszy programista (senior engineer) powiedziałby, że to jest przekombinowane?". Jeśli tak, uprość to.

## 3. Chirurgiczne zmiany

Dotykaj tylko tego, co musisz. Sprzątaj tylko po sobie.

Podczas edycji istniejącego kodu:
- Nie "ulepszaj" sąsiadującego kodu, komentarzy ani formatowania.
- Nie refaktoryzuj rzeczy, które nie są zepsute.
- Dopasuj się do istniejącego stylu, nawet jeśli sam zrobiłbyś to inaczej.
- Jeśli zauważysz niepowiązany martwy kod, wspomnij o nim – nie usuwaj go.

Gdy twoje zmiany tworzą osierocony kod:
- Usuń importy/zmienne/funkcje, które stały się nieużywane przez TWOJE zmiany.
- Nie usuwaj wcześniej istniejącego martwego kodu, chyba że cię o to poproszono.

Test: Każda zmieniona linijka powinna bezpośrednio wynikać z prośby użytkownika.

## 4. Działanie zorientowane na cel

Zdefiniuj kryteria sukcesu. Powtarzaj (iteruj) aż do zweryfikowania.

Przekształcaj zadania w weryfikowalne cele:
- "Dodaj walidację" -> "Napisz testy dla nieprawidłowych danych wejściowych, a następnie spraw, by przeszły"
- "Napraw błąd" -> "Napisz test, który go reprodukuje, a następnie spraw, by przeszedł"
- "Zrefaktoryzuj X" -> "Upewnij się, że testy przechodzą przed i po"

W przypadku zadań wieloetapowych, przedstaw krótki plan:
1. [Krok] -> weryfikacja: [sprawdzenie]
2. [Krok] -> weryfikacja: [sprawdzenie]
3. [Krok] -> weryfikacja: [sprawdzenie]

Silne kryteria sukcesu pozwalają na samodzielne iterowanie. Słabe kryteria ("spraw, żeby działało") wymagają ciągłych wyjaśnień.

## 5. Algorytm 5 kroków Elona Muska (kolejność jest święta)

Zanim coś usprawnisz, przejdź te kroki w tej kolejności. Najczęstszy błąd to robienie ich od tyłu – automatyzowanie i optymalizowanie czegoś, co w ogóle nie powinno istnieć.

1. Spraw, by wymaganie było mniej głupie. Każde wymaganie jest podejrzane – bez względu na to, kto je wymyślił (im mądrzejszy autor, tym groźniej, bo mniej je kwestionujesz). Każdy wymóg musi mieć nazwisko, nie "dział" – pytaj konkretną osobę, która za niego odpowiada. Inaczej okaże się, że wymyślił go na poczekaniu ktoś, kogo już dawno nie ma.
2. Usuń część lub proces. Domyślnie kasuj, nie asekuruj się "na wszelki wypadek". Jeśli czasem nie musisz dodać czegoś z powrotem, usuwasz za mało – celuj w ~10% przypadków, gdy trzeba cofnąć usunięcie.
3. Uprość lub zoptymalizuj. Dopiero teraz – nigdy jako pierwszy krok. Nie optymalizuj rzeczy, która nie powinna istnieć.
4. Poruszasz się zbyt wolno – przyspiesz. Ale nie rób tego, dopóki nie przepracujesz pierwszych trzech kroków!
5. Automatyzuj. Na samym końcu.

## 6. Pamiętaj podczas implementacji

Krańcowy koszt kompletności w przypadku AI jest bliski zeru. Zrób całość. Zrób to dobrze. Zrób to z testami. Zrób to z dokumentacją. Zrób to tak dobrze, abym był szczerze pod wrażeniem – nie grzecznie usatysfakcjonowany, ale faktycznie pod wrażeniem.

- Nigdy nie proponuj odłożenia tego na później, gdy trwałe rozwiązanie jest w zasięgu ręki.
- Nigdy nie zostawiaj niedokończonych wątków, gdy ich domknięcie zajmuje tylko pięć minut więcej.
- Nigdy nie przedstawiaj obejścia (workaround), gdy istnieje prawdziwe rozwiązanie.

Standardem nie jest "wystarczająco dobrze" – standardem jest "o jasna cholera, zrobione".

Przestrzegaj tych zasad:
- KISS: Keep it simple (Nie komplikuj). Nie przekombinowuj. Złożoność to wróg.
- DRY: Don't repeat yourself (Nie powtarzaj się). Napisz to raz. Używaj kodu ponownie.
- YAGNI: You aren't gonna need it (Nie będziesz tego potrzebować). Nie buduj na przyszłość. Rozwiąż dzisiejszy problem.
- SOLID i GRASP: Pojedyncza odpowiedzialność. Niskie sprzężenie (low coupling), wysoka spójność (high cohesion). Polegaj na abstrakcjach.
- Wzorce projektowe (Design Patterns): Używaj sprawdzonych rozwiązań dla powszechnych problemów, ale nie przeinżynierowuj (don't over-engineer).
- Brak "zapachów kodu" (Code Smells): Refaktoryzuj Boskie Obiekty (God Objects) i duplikacje. Natychmiast przerywaj zależności cykliczne (Circular Dependencies), wydzielając wspólną logikę.
- TDD i BDD: Najpierw myśl o testach (Red-Green-Refactor). Testuj zachowanie (Given-When-Then), a nie szczegóły implementacji.
- Mockowanie i Pytest: Izoluj systemy zewnętrzne, ale nie nadużywaj mocków. Wykorzystuj fixtury i parametryzację w pytest dla czystych, szybkich testów.
- Szukaj, zanim zaczniesz budować.
- Testuj, zanim dostarczysz.
- Dostarczaj kompletny produkt.

Kiedy o coś proszę, odpowiedzią ma być gotowy produkt, a nie plan jego budowy. Czas nie jest wymówką. Zmęczenie nie jest wymówką. Złożoność nie jest wymówką. 

Dokonaj niemożliwego (Boil the ocean).
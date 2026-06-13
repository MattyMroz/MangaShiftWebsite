1. Struktura projektu i organizacja kodu
 Dlaczego?
 Czytelna struktura pozwala szybko odnaleźć się w projekcie Tobie i każdemu innemu devowi.
 📁
 Rekomendowana struktura:
 src/
 ├──
 app/           
├──
 pages/         
# konfiguracja globalna, router
 # strony / route-level components
 ├──
 features/      # konkretne funkcjonalności (np. login, cart)
 ├──
 entities/      # elementy wielokrotnego użycia (np. UserCard)
 ├──
 shared/        # utils, hooki, komponenty wspólne
 └──
 widgets/       # UI elementy złożone, ale współdzielone
 2. TypeScript i typowanie
 Po co?
 TypeScript wykrywa błędy zanim klikniesz „Start dev server”.
 Dobre praktyki:
 Typuj propsy: type ButtonProps = { onClick: () => void }
 Typuj API response: interface ProductResponse { id: string; price: number }
 Zamiast any, używaj: unknown, Record<string, unknown>, Partial<T>, Pick<T, K>
 3. Custom hooki – separacja logiki od widoku
Dlaczego?
 Trzymanie fetchy, logiki i eventów w komponentach to droga do chaosu.
 // useProducts.ts
 export const useProducts = () => {
 const { data, error, isLoading } = useSWR("/api/products", fetcher)
 return { data, error, isLoading }
 }
 A w komponencie:
 const ProductList = () => {
 const { data, isLoading } = useProducts()
 // ...
 }
 4. Design Patterns w React
 Po co?
 Wzorce projektowe to sprawdzone sposoby budowy skalowalnych aplikacji.
 Warto znać:
 Compound Components – np. Tabs, Accordion, Modal
 Container/Presentational – logika vs. UI
 Render Props – elastyczne przekazywanie logiki
 Custom Hooks + Context – współdzielona logika
 State Machines (XState) – pełna kontrola flowów
 5. Testowanie aplikacji
 Dlaczego?
 Testy ratują przed bugami.
 Rodzaje testów:
 Unit tests (Vitest, Jest) – funkcje, hooki
 Component tests (React Testing Library) – zachowania UI
 E2E tests (Playwright, Cypress) – cały user flow
 6. Styl i jakość kodu
Po co?
 Ujednolicenie stylu kodu to mniej błędów, lepszy teamwork i czystsze PR-y.
 Jak to wdrożyć:
 ESLint + Prettier
 Husky (pre-commit hooki)
 Reguły nazewnictwa, zakaz magicznych stringów/liczb
 7. Hosting
 Gdzie hostować?
 Vercel – szybki deploy, preview PR
 Netlify – bardzo dobry dla SPA
 Firebase Hosting – lekki, prosty
 🪄
 Dodatki:
 Auto deploy z GitHub
 SSL za darmo
 Obsługa 404 / SPA fallback
 8. CI/CD i Docker – automatyczne testowanie i wdrażanie
 Po co?
 Automatyzacja = brak ręcznego deployowania i błędów przez zapomnienie. Docker - tworzy 
kontener.
 Pipeline przykład (GitHub Actions):
 lint
 test
 build
 Deploy do Vercel/Netlify/AWS
 Publikacja obrazu Dockera
 9. UX i dostępność (a11y)
 Dlaczego warto?
 Użytkownicy mają różne potrzeby – zadbaj o każdego.
 Co warto wdrożyć:
 Skeletony i fallbacki (nie biały ekran)
 aria-labels, role, focus states
 Kontrast kolorów, duże klikane obszary
10. Bezpieczeństwo frontendu
 Co trzeba wiedzieć?
 Nie trzymaj secretów w kodzie (.env!)
 Waliduj wszystkie dane wejściowe
 Zabezpiecz przed XSS, CSRF, CORS
 Używaj narzędzi jak helmet, Content-Security-Policy
 Co robić krok po kroku (plan wdrożenia)
 1. 
2. 
3. 
4. 
5. 
6. 
7. 
8. 
9. 
10. 
11. 
Ustal strukturę projektu
 ➤ Podziel projekt wg. features/, shared/, entities/
 Wprowadź TypeScript (jeśli jeszcze nie masz)
 ➤ Zainstaluj TS, przekonwertuj .js →
 .tsx, dodaj typy
 Stwórz swój pierwszy custom hook
 ➤ Wyodrębnij logikę fetchowania lub formularza
 Dodaj ESLint + Prettier + Husky
 ➤ Automatyczne sprawdzanie i formatowanie kodu
 Wdróż jeden pattern designu
 ➤ Np. zamień duży komponent w Compound Component
 Dodaj testy
 ➤ Zacznij od jednego testu do komponentu i jednego do hooka
 Skonfiguruj Docker i DockerHub
 ➤ Utwórz konto na docker hub oraz obraz dockera
 Skonfiguruj CI/CD (np. GitHub Actions)
 ➤ Testy + build + deploy na push/PR
 Zdeplouj projekt (np. na Vercel)
 ➤ Podłącz repo, ustaw preview builds
 Popraw UX – loadingi, dostępność, aria
 ➤ Dodaj Skeleton, popraw kontrast, przetestuj klawiaturą
 Zadbaj o bezpieczeństwo
 ➤ Ukryj API klucze, waliduj formularze
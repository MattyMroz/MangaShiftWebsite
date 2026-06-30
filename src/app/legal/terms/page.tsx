import type { Metadata } from 'next';
import { PageHero } from '@/shared/ui/page-hero';
import { PageShell } from '@/shared/ui/page-shell';
import { DraftNotice } from '@/shared/ui/draft-notice';
import { LegalSection, LegalP, LegalList } from '@/shared/ui/legal-section';
import { Footer } from '@/widgets/footer/ui/footer';

export const metadata: Metadata = {
    title: 'Regulamin',
    description: 'Regulamin MangaShift (V3 draft).',
};

export default function TermsPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="L1."
                    page="01 / 06"
                    rule="MangaShift / regulamin / 2026"
                    kicker="Dokument prawny"
                    titleBefore="Regulamin"
                    titleEmphasis="MangaShift"
                    titleAfter="."
                    lead="Wersja: V3 draft. Data: [[DO_POTWIERDZENIA: data publikacji]]. Status: dokument do weryfikacji przez prawniczkę przed publikacją."
                />

                <PageShell sideLabel="Regulamin">
                    <DraftNotice />

                    <div className="mt-10 space-y-12">
                        <LegalSection index="1." title="Operator">
                            <LegalList
                                ordered
                                items={[
                                    'Operatorem MangaShift jest Mateusz Mróz, działający jako [[DO_POTWIERDZENIA: działalność nierejestrowana / JDG / inna forma]], pod adresem [[DO_POTWIERDZENIA: adres publiczny do doręczeń / adres działalności]], e-mail: support@mangashift.com.',
                                    'Kontakt w sprawach prywatności: privacy@mangashift.com.',
                                    'Kontakt w sprawach praw autorskich i naruszeń IP: copyright@mangashift.com.',
                                    'Strona internetowa usługi: https://mangashift.com.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="2." title="Definicje">
                            <LegalList
                                ordered
                                items={[
                                    <><strong>Aplikacja</strong> — desktopowe oprogramowanie MangaShift przeznaczone na system Windows, pobierane ze strony Operatora lub z linku do GitHub Releases.</>,
                                    <><strong>Konto</strong> — konto użytkownika tworzone lub autoryzowane z użyciem logowania Google.</>,
                                    <><strong>Użytkownik</strong> — osoba korzystająca z Aplikacji lub Strony. Usługa jest przeznaczona dla osób, które ukończyły 18 lat.</>,
                                    <><strong>Konsument</strong> — Użytkownik będący konsumentem w rozumieniu właściwych przepisów.</>,
                                    <><strong>Przedsiębiorca na prawach konsumenta</strong> — osoba fizyczna zawierająca umowę bezpośrednio związaną z jej działalnością gospodarczą, gdy z treści umowy wynika, że nie ma ona dla niej charakteru zawodowego.</>,
                                    <><strong>Materiały</strong> — pliki, obrazy, strony komiksów, tekst, dialogi, metadane, ustawienia, głosy, dane projektowe i inne treści wczytywane lub tworzone przez Użytkownika w Aplikacji.</>,
                                    <><strong>Projekt</strong> — lokalny zestaw Materiałów, ustawień i Wyników zapisany na urządzeniu Użytkownika.</>,
                                    <><strong>Wyniki</strong> — rezultaty działania Aplikacji, w tym OCR, tłumaczenie, dźwięk, napisy, upscaling, animacje, eksport audio, eksport wideo lub motion comic.</>,
                                    <><strong>BYOK</strong> — &quot;Bring Your Own Key&quot;, czyli model, w którym Użytkownik korzysta z własnego klucza API lub własnego konta u Dostawcy Zewnętrznego.</>,
                                    <><strong>Dostawca Zewnętrzny</strong> — zewnętrzny dostawca technologii, np. Google, Stripe, GitHub, OpenAI, Anthropic, Google Gemini, ElevenLabs, OpenRouter, DeepSeek, DeepL lub inny dostawca wskazany w Aplikacji.</>,
                                    <><strong>Plan</strong> — wariant dostępu do Aplikacji, w szczególności Plan Free, Plan Miesięczny albo Plan Roczny.</>,
                                    <><strong>Trial</strong> — bezpłatny okres próbny Planu płatnego.</>,
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="3." title="Czym jest MangaShift">
                            <LegalList
                                ordered
                                items={[
                                    'MangaShift to desktopowy czytnik komiksów i zestaw narzędzi AI/ML do tłumaczenia, udźwiękowienia oraz tworzenia adaptacji audio-wizualnych z materiałów, do których Użytkownik posiada odpowiednie prawa.',
                                    <>Aplikacja może obejmować w szczególności:
                                        <LegalList items={['lokalny czytnik komiksów;', 'odtwarzacz audio i wideo;', 'OCR;', 'tłumaczenie;', 'syntezę mowy;', 'upscaling;', 'czyszczenie dymków i inpainting;', 'detekcję obiektów;', 'animacje kadrów;', 'montaż;', 'eksport audio, wideo lub motion comic;', 'przetwarzanie wsadowe, jeżeli dana wersja Aplikacji to obsługuje.']} className="mt-3" /></>,
                                    'MangaShift nie jest biblioteką komiksów, serwisem pirackim, marketplace\'em treści, hostingiem plików ani narzędziem do obchodzenia praw autorskich.',
                                    'Operator nie dostarcza Użytkownikowi komiksów ani licencji do cudzych utworów.',
                                    'Aplikacja może korzystać z modeli lokalnych lub zewnętrznych integracji BYOK, jeżeli Użytkownik sam je skonfiguruje.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="4." title="Warunki techniczne">
                            <LegalList
                                ordered
                                items={[
                                    'Na start Aplikacja jest przeznaczona na system Windows. Wsparcie macOS lub Linux może zostać dodane później.',
                                    'Wymagane jest Konto Google oraz dostęp do Internetu co najmniej w celu logowania, weryfikacji licencji, obsługi subskrypcji, aktualizacji i korzystania z zewnętrznych integracji.',
                                    '[[DO_POTWIERDZENIA: czy Aplikacja działa offline przez okres ważności tokenu/licencji i jaki to okres]].',
                                    <>Użytkownik odpowiada za:
                                        <LegalList items={['posiadanie kompatybilnego urządzenia;', 'aktualizacje systemu;', 'backup własnych plików i Projektów;', 'prawidłowe skonfigurowanie kluczy API BYOK;', 'przestrzeganie regulaminów Dostawców Zewnętrznych.']} className="mt-3" /></>,
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="5." title="Konto i logowanie">
                            <LegalList
                                ordered
                                items={[
                                    'Logowanie do MangaShift odbywa się przez Google.',
                                    'Operator przetwarza minimalne dane niezbędne do Konta, w szczególności identyfikator Google, adres e-mail, nazwę profilu i opcjonalnie avatar, zgodnie z Polityką prywatności.',
                                    'Użytkownik nie może udostępniać Konta osobom trzecim ani obchodzić ograniczeń licencyjnych.',
                                    'Operator może odmówić dostępu, zawiesić Konto albo ograniczyć funkcje, jeżeli Użytkownik narusza Regulamin, prawo, prawa osób trzecich albo bezpieczeństwo Usługi.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="6." title="Licencja na Aplikację">
                            <LegalList
                                ordered
                                items={[
                                    'Operator udziela Użytkownikowi niewyłącznej, nieprzenoszalnej, odwołalnej w zakresie przewidzianym Regulaminem licencji na korzystanie z Aplikacji w ramach aktywnego Planu.',
                                    'Licencja obejmuje instalację i korzystanie z Aplikacji na potrzeby zgodne z Regulaminem i wybranym Planem.',
                                    <>Użytkownik nie może:
                                        <LegalList items={['sprzedawać, sublicencjonować ani udostępniać Konta lub Aplikacji osobom trzecim;', 'obchodzić zabezpieczeń, limitów, licencji, płatności lub mechanizmów dostępu;', 'dekompilować Aplikacji poza zakresem bezwzględnie dozwolonym przez prawo;', 'używać Aplikacji do naruszania praw autorskich, znaków towarowych, dóbr osobistych, prywatności lub innych praw osób trzecich.']} className="mt-3" /></>,
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="7." title="Prawa do Materiałów Użytkownika">
                            <LegalList
                                ordered
                                items={[
                                    'Użytkownik może wgrywać, otwierać, przetwarzać i eksportować tylko takie Materiały, do których posiada odpowiednie prawa, licencje, zgody albo inną podstawę prawną.',
                                    <>Przez &quot;odpowiednie prawa&quot; należy rozumieć prawa wystarczające do faktycznego sposobu użycia w Aplikacji, w tym w zależności od funkcji:
                                        <LegalList items={['skopiowania i wczytania pliku do Aplikacji;', 'OCR i ekstrakcji tekstu;', 'tłumaczenia;', 'przetwarzania obrazu;', 'syntezy mowy;', 'animacji kadrów;', 'montażu;', 'stworzenia opracowania, adaptacji, utworu zależnego lub materiału audio-wizualnego;', 'wysłania fragmentów do wybranego Dostawcy Zewnętrznego;', 'eksportu i dalszego wykorzystania Wyników.']} className="mt-3" /></>,
                                    'Sam zakup egzemplarza komiksu, mangi, manhwy, manhua, webtoonu albo innego utworu nie oznacza automatycznie prawa do tworzenia tłumaczeń, adaptacji, motion comiców, syntezy głosu, publikacji albo komercyjnego wykorzystania Wyników.',
                                    'Użytkownik oświadcza, że jego korzystanie z Materiałów nie narusza prawa ani praw osób trzecich.',
                                    'Użytkownik ponosi odpowiedzialność za Materiały, ustawienia, polecenia, prompty i sposób wykorzystania Wyników.',
                                    'Operator może zablokować Konto lub dostęp do funkcji, jeżeli otrzyma wiarygodną informację o naruszeniu praw lub jeżeli sposób korzystania z Aplikacji wskazuje na naruszenie Regulaminu.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="8." title="Wyniki, AI i jakość rezultatów">
                            <LegalList
                                ordered
                                items={[
                                    'Wyniki generowane przez Aplikację lub Dostawców Zewnętrznych mogą być niepełne, niedokładne, błędne, halucynacyjne, nienaturalne, zniekształcone albo nieodpowiednie do zamierzonego celu.',
                                    'Operator nie gwarantuje, że OCR, tłumaczenia, dialogi, głosy, animacje, upscaling, montaż lub inne Wyniki będą poprawne językowo, technicznie, prawnie, kulturowo albo komercyjnie.',
                                    'Użytkownik powinien samodzielnie sprawdzić Wyniki przed ich wykorzystaniem, publikacją, przekazaniem osobom trzecim lub użyciem komercyjnym.',
                                    'Aplikacja jest narzędziem. Nie udziela porad prawnych, licencyjnych, podatkowych, medycznych, finansowych ani profesjonalnych.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="9." title="BYOK i Dostawcy Zewnętrzni">
                            <LegalList
                                ordered
                                items={[
                                    'W pierwszej wersji publicznej MangaShift przyjmuje model BYOK oraz modele lokalne. Operator nie zapewnia Użytkownikowi własnych płatnych limitów API do zewnętrznych modeli AI, chyba że wyraźnie wskazano inaczej w Cenniku lub Aplikacji.',
                                    'Jeżeli Użytkownik łączy Aplikację z Dostawcą Zewnętrznym, korzysta z tego dostawcy na podstawie jego regulaminu, polityki prywatności, cennika, limitów i zasad bezpieczeństwa.',
                                    'Użytkownik odpowiada za koszty, limity, blokady, ban, retencję i zgodność swojego użycia z zasadami Dostawcy Zewnętrznego.',
                                    'W roboczym modelu V3 klucz BYOK jest przechowywany lokalnie w systemowym magazynie poświadczeń i nie jest wysyłany do Operatora.',
                                    'W roboczym modelu V3 zapytania BYOK są wysyłane bezpośrednio z Aplikacji do wybranego Dostawcy Zewnętrznego. [[DO_POTWIERDZENIA TECHNICZNIE: backend MangaShift nie widzi klucza, promptu, OCR, obrazu ani wyniku API]].',
                                    'Przed wysłaniem Materiałów do Dostawcy Zewnętrznego Aplikacja powinna wskazać, który dostawca zostanie użyty.',
                                    'Funkcje eksperymentalne mogą być mniej stabilne, mogą zostać usunięte albo zmienione bez zachowania pełnej kompatybilności.',
                                    'Integracje nieoficjalne, testowe lub deweloperskie nie stanowią części publicznej Usługi, jeżeli nie są wyraźnie opisane w Aplikacji i dokumentach.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="10." title="Plany, Trial i płatności">
                            <LegalList
                                ordered
                                items={[
                                    'MangaShift może być dostępny w Planie Free, Planie Miesięcznym i Planie Rocznym.',
                                    'Aktualne ceny, waluty, podatki, okresy rozliczeniowe, limity i funkcje Planów są wskazane w Cenniku oraz w checkout przed zawarciem umowy.',
                                    'Płatności obsługuje Stripe lub inny wskazany dostawca płatności.',
                                    'Trial trwa 7 dni, chyba że checkout wskazuje inaczej.',
                                    'Trial z kartą oznacza, że Użytkownik podaje metodę płatności przy aktywacji Trialu, a po zakończeniu Trialu Plan automatycznie zmienia się w płatną subskrypcję, jeżeli Użytkownik nie anuluje jej przed końcem Trialu.',
                                    <>Przed aktywacją Trialu Użytkownik powinien otrzymać jasną informację o:
                                        <LegalList items={['długości Trialu;', 'cenie po Trialu;', 'dacie lub zasadzie pierwszego obciążenia;', 'cyklu odnowienia;', 'sposobie anulowania.']} className="mt-3" /></>,
                                    'Subskrypcja odnawia się automatycznie z góry za kolejny okres rozliczeniowy, do czasu anulowania.',
                                    'Użytkownik może anulować subskrypcję przez [[DO_POTWIERDZENIA: panel konta / portal Stripe / formularz / e-mail]].',
                                    'Po anulowaniu dostęp do funkcji płatnych trwa do końca opłaconego okresu, chyba że przepisy prawa, decyzja Operatora albo warunki promocji stanowią inaczej.',
                                    'Po nieudanej płatności Operator może ograniczyć funkcje płatne, przenieść Konto do Planu Free albo zablokować dostęp premium do czasu uregulowania płatności. Lokalne pliki i Projekty Użytkownika nie są z tego powodu kasowane przez Operatora.',
                                    'Stripe może ponawiać próby płatności zgodnie z ustawieniami płatności i komunikatami checkoutu.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="11." title="Odstąpienie, reklamacje i zwroty">
                            <LegalList
                                ordered
                                items={[
                                    'Zasady odstąpienia od umowy, reklamacji i zwrotów określa dokument Odstąpienie, reklamacje i zwroty.',
                                    'Żadna część Regulaminu nie ogranicza praw Konsumenta ani Przedsiębiorcy na prawach konsumenta wynikających z bezwzględnie obowiązujących przepisów.',
                                    'Jeżeli checkout wymaga zgody na natychmiastowe rozpoczęcie świadczenia usługi cyfrowej lub dostarczania treści cyfrowych przed upływem terminu odstąpienia, zgoda musi być odebrana w sposób jasny i możliwy do udowodnienia.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="12." title="Brak hostingu treści Użytkownika">
                            <LegalList
                                ordered
                                items={[
                                    'MangaShift w modelu V3 nie hostuje publicznie Materiałów ani Wyników Użytkownika.',
                                    'Użytkownik eksportuje Wyniki lokalnie na swoje urządzenie.',
                                    'Operator nie prowadzi galerii publicznej, serwisu streamingowego, katalogu komiksów ani platformy do udostępniania Wyników.',
                                    'Jeżeli w przyszłości zostaną dodane funkcje hostingu, galerii, publikacji, linków publicznych, komentarzy albo profili społecznościowych, Regulamin i procedury naruszeń będą wymagały aktualizacji.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="13." title="Zakazane sposoby korzystania">
                            <LegalP>Użytkownik nie może korzystać z MangaShift w celu:</LegalP>
                            <LegalList
                                ordered
                                items={[
                                    'naruszania praw autorskich, praw pokrewnych, znaków towarowych, dóbr osobistych, prywatności lub tajemnic handlowych;',
                                    'tworzenia, dystrybucji lub monetyzacji nieuprawnionych adaptacji cudzych utworów;',
                                    'obchodzenia DRM, zabezpieczeń, paywalli, licencji, limitów technicznych lub mechanizmów płatności;',
                                    'podszywania się pod inne osoby, klonowania głosu bez wymaganej zgody lub tworzenia mylącej identyfikacji osoby;',
                                    'generowania treści bezprawnych, szkodliwych lub naruszających regulaminy Dostawców Zewnętrznych;',
                                    'przechwytywania ekranu, nagrywania albo automatycznego kopiowania w celu obejścia ograniczeń eksportu, licencji lub bezprawnej dystrybucji;',
                                    'testowania bezpieczeństwa, scrapingu, automatyzacji lub reverse engineeringu poza zakresem dozwolonym przez prawo i uzgodnionym z Operatorem.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="14." title="Aktualizacje, zmiany i dostępność">
                            <LegalList
                                ordered
                                items={[
                                    'Operator może udostępniać aktualizacje Aplikacji, w tym poprawki bezpieczeństwa, zmiany funkcji, nowe integracje i usunięcie funkcji eksperymentalnych.',
                                    'Niektóre aktualizacje mogą być wymagane do dalszego korzystania z Aplikacji.',
                                    'Operator może czasowo ograniczyć dostęp do Usługi z powodu konserwacji, awarii, aktualizacji, bezpieczeństwa, działania Dostawców Zewnętrznych albo przyczyn niezależnych od Operatora.',
                                    'Operator nie gwarantuje nieprzerwanego działania wszystkich funkcji, szczególnie funkcji eksperymentalnych i integracji zewnętrznych.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="15." title="Support">
                            <LegalList
                                ordered
                                items={[
                                    'Formalny kontakt z Operatorem odbywa się przez e-mail support@mangashift.com lub formularz https://mangashift.com/contact.',
                                    'Discord może być dodatkowym, nieformalnym kanałem społecznościowym lub technicznym, ale nie jest podstawowym kanałem składania odstąpień, reklamacji, wniosków RODO ani zgłoszeń prawnych.',
                                    'Operator nie obiecuje wsparcia 24/7 ani SLA. Zwykły czas odpowiedzi może wynosić do 7 dni, chyba że przepisy prawa wymagają innego terminu.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="16." title="Odpowiedzialność">
                            <LegalList
                                ordered
                                items={[
                                    'Operator odpowiada wobec Konsumentów i Przedsiębiorców na prawach konsumenta w zakresie wymaganym przez bezwzględnie obowiązujące przepisy.',
                                    'Regulamin nie wyłącza ani nie ogranicza odpowiedzialności, której nie można wyłączyć zgodnie z prawem, w szczególności za umyślne naruszenie, rażące niedbalstwo tam, gdzie wyłączenie jest niedopuszczalne, szkody na osobie albo ustawowe prawa konsumenckie.',
                                    <>W zakresie dopuszczalnym przez prawo Operator nie odpowiada za:
                                        <LegalList items={['brak praw Użytkownika do Materiałów;', 'decyzje Użytkownika o wysłaniu Materiałów do Dostawcy Zewnętrznego;', 'koszty, blokady i decyzje Dostawców Zewnętrznych;', 'jakość lub prawdziwość Wyników AI;', 'utratę danych, jeżeli Użytkownik nie wykonał backupu, z zastrzeżeniem praw Konsumenta;', 'nieuprawnione wykorzystanie Wyników przez Użytkownika;', 'skutki użycia Aplikacji niezgodnie z Regulaminem.']} className="mt-3" /></>,
                                    'Użytkownik powinien regularnie wykonywać kopie zapasowe Materiałów, Projektów i Wyników.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="17." title="Indemnizacja B2B">
                            <LegalList
                                ordered
                                items={[
                                    <>Jeżeli Użytkownik korzysta z MangaShift jako przedsiębiorca, zobowiązuje się zwolnić Operatora z odpowiedzialności i pokryć uzasadnione koszty, roszczenia, odszkodowania i wydatki wynikające z:
                                        <LegalList items={['naruszenia praw osób trzecich przez Materiały lub Wyniki;', 'braku wymaganych licencji;', 'naruszenia regulaminów Dostawców Zewnętrznych;', 'wykorzystania Aplikacji niezgodnie z Regulaminem lub prawem.']} className="mt-3" /></>,
                                    'Postanowienie nie ogranicza uprawnień Konsumentów ani Przedsiębiorców na prawach konsumenta.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="18." title="Zmiany Regulaminu">
                            <LegalList
                                ordered
                                items={[
                                    'Operator może zmienić Regulamin z ważnych przyczyn, w szczególności z powodu zmian prawa, funkcji Aplikacji, modelu płatności, bezpieczeństwa, Dostawców Zewnętrznych albo organizacji Usługi.',
                                    'O istotnych zmianach Operator poinformuje Użytkownika z odpowiednim wyprzedzeniem, co do zasady co najmniej 14 dni przed wejściem zmian w życie, a przy zmianach ceny aktywnej subskrypcji co do zasady co najmniej 30 dni, chyba że przepisy lub charakter zmiany wymagają innego terminu.',
                                    'Zmiana ceny nie wpływa na już opłacony okres rozliczeniowy, chyba że jest korzystna dla Użytkownika albo Użytkownik wyrazi odrębną zgodę.',
                                    'Jeżeli Użytkownik nie akceptuje zmian, może zrezygnować z Usługi zgodnie z zasadami anulowania.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="19." title="Prawo właściwe i spory">
                            <LegalList
                                ordered
                                items={[
                                    'Do Regulaminu stosuje się prawo polskie, z zastrzeżeniem bezwzględnie obowiązujących przepisów chroniących Konsumenta w kraju jego zwykłego pobytu, jeżeli takie przepisy mają zastosowanie.',
                                    'Konsument może korzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń, jeżeli takie mechanizmy są dostępne zgodnie z prawem.',
                                    'Spory z Użytkownikami niebędącymi Konsumentami ani Przedsiębiorcami na prawach konsumenta będą rozstrzygane przez sąd właściwy dla siedziby lub adresu Operatora, chyba że bezwzględnie obowiązujące przepisy stanowią inaczej.',
                                ]}
                            />
                        </LegalSection>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}

import type { Metadata } from 'next';
import { PageHero } from '@/shared/ui/PageHero/page-hero';
import { PageShell } from '@/shared/ui/PageShell/page-shell';
import { DraftNotice } from '@/shared/ui/DraftNotice/draft-notice';
import { LegalSection, LegalP, LegalList, LegalTable } from '@/shared/ui/LegalSection/legal-section';
import { Footer } from '@/widgets/Footer/ui/footer';

export const metadata: Metadata = {
    title: 'Polityka prywatności',
    description: 'Polityka prywatności MangaShift (V3 draft).',
};

export default function PrivacyPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="L2."
                    page="02 / 06"
                    rule="MangaShift / prywatność / 2026"
                    kicker="Dokument prawny"
                    titleBefore="Polityka"
                    titleEmphasis="prywatności"
                    titleAfter="."
                    lead="Wersja: V3 draft. Data: [[DO_POTWIERDZENIA: data publikacji]]. Status: dokument do weryfikacji przez prawniczkę przed publikacją."
                />

                <PageShell sideLabel="Polityka prywatności">
                    <DraftNotice />

                    <div className="mt-10 space-y-12">
                        <LegalSection index="1." title="Administrator danych">
                            <LegalP>Administratorem danych jest Mateusz Mróz, działający jako [[DO_POTWIERDZENIA: forma działalności]], adres: [[DO_POTWIERDZENIA: adres publiczny]], e-mail: privacy@mangashift.com.</LegalP>
                            <LegalP>W sprawach ogólnych: support@mangashift.com.</LegalP>
                            <LegalP>W sprawach praw autorskich: copyright@mangashift.com.</LegalP>
                        </LegalSection>

                        <LegalSection index="2." title="Najkrótsze wyjaśnienie">
                            <LegalP>MangaShift jest aplikacją desktopową. Założenie V3 jest takie:</LegalP>
                            <LegalList
                                items={[
                                    'Twoje komiksy, Projekty i Wyniki są przechowywane lokalnie na Twoim urządzeniu;',
                                    'nie wysyłamy do siebie treści komiksów, obrazów, OCR, promptów ani kluczy API BYOK;',
                                    'logujemy dane konta, płatności, zgody, wersje regulaminu i minimalne dane techniczne;',
                                    'jeżeli wybierzesz integrację z Dostawcą Zewnętrznym, dane mogą zostać wysłane do tego dostawcy zgodnie z Twoją konfiguracją i jego zasadami;',
                                    'Google Analytics na stronie działa tylko po zgodzie albo jest wyłączony.',
                                ]}
                            />
                            <LegalP>[[DO_POTWIERDZENIA TECHNICZNIE: powyższe jest prawdziwe tylko wtedy, gdy backend MangaShift nie proxy&apos;uje promptów, obrazów, OCR ani kluczy BYOK.]]</LegalP>
                        </LegalSection>

                        <LegalSection index="3." title="Jakie dane przetwarzamy">
                            <LegalP><strong>3.1. Konto</strong></LegalP>
                            <LegalP>Przetwarzamy:</LegalP>
                            <LegalList
                                items={[
                                    'identyfikator Google;',
                                    'adres e-mail;',
                                    'nazwę profilu;',
                                    'opcjonalnie avatar;',
                                    'status Konta;',
                                    'wersje zaakceptowanych dokumentów;',
                                    'datę i godzinę akceptacji.',
                                ]}
                            />
                            <LegalP><strong>3.2. Płatności i subskrypcja</strong></LegalP>
                            <LegalP>Przetwarzamy:</LegalP>
                            <LegalList
                                items={[
                                    'identyfikator klienta/subskrypcji w Stripe;',
                                    'status Trialu, Planu, odnowienia i anulowania;',
                                    'informacje o płatności otrzymane od Stripe, np. status transakcji, kwota, waluta, data;',
                                    'dane wymagane do rozliczeń, reklamacji, zwrotów, chargebacków i obowiązków podatkowych.',
                                ]}
                            />
                            <LegalP>Nie przechowujemy pełnych danych karty płatniczej. Obsługuje je Stripe.</LegalP>
                            <LegalP><strong>3.3. Dane techniczne i bezpieczeństwa</strong></LegalP>
                            <LegalP>Możemy przetwarzać:</LegalP>
                            <LegalList
                                items={[
                                    'adres IP;',
                                    'datę i godzinę logowania;',
                                    'identyfikatory sesji;',
                                    'wersje Aplikacji;',
                                    'system operacyjny;',
                                    'zdarzenia bezpieczeństwa;',
                                    'minimalne logi błędów.',
                                ]}
                            />
                            <LegalP><strong>3.4. Crash reporting</strong></LegalP>
                            <LegalP>Crash reporting, jeżeli jest włączony, powinien obejmować tylko minimalne dane techniczne potrzebne do diagnozy błędów. Nie powinien zawierać:</LegalP>
                            <LegalList
                                items={[
                                    'treści komiksów;',
                                    'obrazów stron;',
                                    'OCR;',
                                    'promptów;',
                                    'kluczy API;',
                                    'nazw lokalnych plików, chyba że Użytkownik sam je dołączy do zgłoszenia.',
                                ]}
                            />
                            <LegalP><strong>3.5. Support</strong></LegalP>
                            <LegalP>Jeżeli kontaktujesz się z supportem, przetwarzamy:</LegalP>
                            <LegalList
                                items={[
                                    'dane kontaktowe;',
                                    'treść wiadomości;',
                                    'załączniki, które samodzielnie prześlesz;',
                                    'informacje potrzebne do rozwiązania sprawy.',
                                ]}
                            />
                            <LegalP>Nie wysyłaj do supportu cudzych komiksów, poufnych danych ani kluczy API, chyba że jest to konieczne i masz do tego prawa.</LegalP>
                            <LegalP><strong>3.6. Materiały, Projekty i Wyniki</strong></LegalP>
                            <LegalP>W modelu V3 Materiały, Projekty i Wyniki są lokalne. Operator nie zbiera domyślnie:</LegalP>
                            <LegalList
                                items={[
                                    'plików komiksów;',
                                    'nazw otwieranych plików;',
                                    'obrazów stron;',
                                    'tekstu OCR;',
                                    'promptów;',
                                    'wygenerowanego audio/wideo;',
                                    'kluczy API.',
                                ]}
                            />
                            <LegalP>Wyjątek: Użytkownik może dobrowolnie przesłać fragment materiału do supportu albo wybrać integrację z Dostawcą Zewnętrznym.</LegalP>
                        </LegalSection>

                        <LegalSection index="4." title="BYOK i Dostawcy Zewnętrzni">
                            <LegalList
                                ordered
                                items={[
                                    'Jeżeli korzystasz z BYOK, używasz własnego klucza API lub konta u Dostawcy Zewnętrznego.',
                                    'W modelu roboczym V3 klucz BYOK jest przechowywany lokalnie w systemowym magazynie poświadczeń i nie jest wysyłany do Operatora.',
                                    'Jeżeli wybierzesz Dostawcę Zewnętrznego, Aplikacja może wysłać do niego treści potrzebne do wykonania zadania, np. tekst OCR, fragment obrazu, prompt, ustawienia, audio lub inne dane.',
                                    'Dostawca Zewnętrzny przetwarza te dane zgodnie z własnymi zasadami, regulaminem, polityką prywatności i Twoją relacją z tym dostawcą.',
                                    'Operator nie odpowiada za polityki retencji, koszty, limity, blokady ani decyzje Dostawców Zewnętrznych, z zastrzeżeniem praw, których nie można wyłączyć.',
                                    'Aktywne integracje mogą obejmować m.in. Google Gemini, ElevenLabs, OpenAI, Anthropic, OpenRouter, DeepSeek, DeepL lub inne integracje wskazane w Aplikacji.',
                                    'ElevenBytes nie jest częścią publicznego wydania V3.',
                                    'Edge TTS, jeżeli jest dostępny, ma status eksperymentalny i wymaga potwierdzenia zgodności z warunkami dostawcy.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="5." title="Podstawy prawne RODO">
                            <LegalP>Przetwarzamy dane na podstawie:</LegalP>
                            <LegalList
                                items={[
                                    'wykonania umowy — Konto, dostęp do Aplikacji, subskrypcja, support techniczny;',
                                    'obowiązku prawnego — rozliczenia, podatki, reklamacje, prawa konsumenta;',
                                    'uzasadnionego interesu — bezpieczeństwo, zapobieganie nadużyciom, dochodzenie roszczeń, podstawowe logi techniczne;',
                                    'zgody — opcjonalne cookies/analityka, jeżeli są włączone;',
                                    'Twojego żądania lub zgody — materiały dobrowolnie wysłane do supportu.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="6." title="Odbiorcy danych">
                            <LegalP>Dane mogą być przekazywane:</LegalP>
                            <LegalList
                                items={[
                                    'Google — logowanie;',
                                    'Stripe — płatności, subskrypcje, fakturowanie/checkout;',
                                    'dostawcy hostingu, domeny, poczty i infrastruktury;',
                                    'GitHub — jeżeli pobierasz instalator przez GitHub Releases;',
                                    'dostawcy analityki, np. Google Analytics, jeżeli wyrazisz zgodę;',
                                    'dostawcy crash reportingu, jeżeli zostanie wdrożony;',
                                    'Dostawcy Zewnętrzni wybrani przez Ciebie w BYOK;',
                                    'kancelarie, księgowość, doradcy, organy publiczne — jeżeli jest to potrzebne lub wymagane prawem.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="7." title="Transfery poza EOG">
                            <LegalP>Niektórzy dostawcy mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym. W takim przypadku stosujemy mechanizmy przewidziane przez RODO, jeżeli odpowiadamy za dany transfer, np. decyzje stwierdzające odpowiedni poziom ochrony, standardowe klauzule umowne albo inne podstawy z rozdziału V RODO.</LegalP>
                            <LegalP>W modelu BYOK część transferów może wynikać z Twojej samodzielnej konfiguracji dostawcy i Twojej relacji z tym dostawcą.</LegalP>
                        </LegalSection>

                        <LegalSection index="8." title="Retencja">
                            <LegalTable
                                head={['Kategoria danych', 'Okres']}
                                rows={[
                                    ['Konto aktywne', 'przez czas posiadania Konta'],
                                    ['Dane operacyjne po usunięciu Konta', 'co do zasady do 30 dni, chyba że prawo lub roszczenia wymagają dłużej'],
                                    ['Backup Konta', 'do 90 dni'],
                                    ['Logi bezpieczeństwa', 'co do zasady 90 dni'],
                                    ['Crash report', '30-90 dni'],
                                    ['Support', 'przez czas obsługi sprawy i okres potrzebny do obrony roszczeń'],
                                    ['Płatności, faktury, podatki', 'przez okres wymagany prawem'],
                                    ['Dowód akceptacji Regulaminu i zgody', 'przez czas umowy i okres przedawnienia roszczeń'],
                                    ['Cookies/analityka', 'zgodnie z Polityką cookies i ustawieniami narzędzia'],
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="9." title="Twoje prawa">
                            <LegalP>W zakresie wynikającym z RODO masz prawo do:</LegalP>
                            <LegalList
                                items={[
                                    'dostępu do danych;',
                                    'sprostowania danych;',
                                    'usunięcia danych;',
                                    'ograniczenia przetwarzania;',
                                    'przenoszenia danych;',
                                    'sprzeciwu;',
                                    'cofnięcia zgody;',
                                    'złożenia skargi do Prezesa UODO.',
                                ]}
                            />
                            <LegalP>Wnioski wysyłaj na privacy@mangashift.com.</LegalP>
                        </LegalSection>

                        <LegalSection index="10." title="Usunięcie Konta">
                            <LegalP>Konto można usunąć przez [[DO_POTWIERDZENIA: ustawienia konta / strona konta / formularz]] albo kontakt z privacy@mangashift.com.</LegalP>
                            <LegalP>Usunięcie Konta nie musi oznaczać natychmiastowego usunięcia danych, które musimy zachować z powodu prawa, rozliczeń, bezpieczeństwa lub roszczeń.</LegalP>
                        </LegalSection>

                        <LegalSection index="11." title="Dzieci">
                            <LegalP>MangaShift jest przeznaczony dla osób 18+. Nie kierujemy Usługi do dzieci.</LegalP>
                        </LegalSection>

                        <LegalSection index="12." title="Mieszkańcy Kalifornii">
                            <LegalP>Na dzień przygotowania tego draftu Operator nie zakłada, że spełnia progi podmiotowe CCPA/CPRA, w szczególności próg wysokiego rocznego przychodu, próg 100 000 mieszkańców/gospodarstw domowych ani model sprzedaży/udostępniania danych jako główne źródło przychodu.</LegalP>
                            <LegalP>Nie sprzedajemy danych osobowych w klasycznym znaczeniu sprzedaży danych. Jeżeli w przyszłości skala, analityka, reklama albo przepisy spowodują, że CCPA/CPRA będzie miała zastosowanie, Polityka prywatności zostanie uzupełniona.</LegalP>
                            <LegalP>Mieszkańcy Kalifornii mogą kontaktować się w sprawach prywatności przez privacy@mangashift.com.</LegalP>
                        </LegalSection>

                        <LegalSection index="13." title="Zmiany Polityki">
                            <LegalP>Polityka może być zmieniana, gdy zmienia się Aplikacja, dostawcy, prawo, model danych albo sposób sprzedaży. O istotnych zmianach poinformujemy w sposób odpowiedni do sytuacji.</LegalP>
                        </LegalSection>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}

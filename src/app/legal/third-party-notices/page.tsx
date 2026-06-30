import type { Metadata } from 'next';
import { PageHero } from '@/shared/ui/page-hero';
import { PageShell } from '@/shared/ui/page-shell';
import { DraftNotice } from '@/shared/ui/draft-notice';
import { LegalSection, LegalP, LegalList, LegalTable } from '@/shared/ui/legal-section';
import { Footer } from '@/widgets/footer/ui/footer';

export const metadata: Metadata = {
    title: 'Third-party notices',
    description: 'Third-party notices i komponenty zewnętrzne MangaShift (V3 draft).',
};

export default function ThirdPartyNoticesPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="L6."
                    page="06 / 06"
                    rule="MangaShift / third-party / 2026"
                    kicker="Dokument prawny"
                    titleBefore="Third-party"
                    titleEmphasis="notices"
                    titleAfter="."
                    lead="Wersja: V3 draft. Status: szablon. Wypełnić dla konkretnego publicznego release'u."
                />

                <PageShell sideLabel="Third-party">
                    <DraftNotice />

                    <div className="mt-10 space-y-12">
                        <LegalSection index="1." title="Po co ten plik">
                            <LegalP>Ten dokument ma opisać zewnętrzne komponenty, biblioteki, modele, narzędzia i usługi, które są:</LegalP>
                            <LegalList
                                items={[
                                    'dystrybuowane w instalatorze;',
                                    'pobierane automatycznie przy pierwszym użyciu;',
                                    'wymagane do działania Aplikacji;',
                                    'dostępne jako integracje zewnętrzne.',
                                ]}
                            />
                            <LegalP>Nie trzeba opisywać każdej biblioteki z repozytorium, jeżeli nie trafia do publicznego builda. Trzeba opisać to, co realnie dostaje lub uruchamia Użytkownik.</LegalP>
                        </LegalSection>

                        <LegalSection index="2." title="Tabela release'u">
                            <LegalTable
                                head={['Komponent', 'Typ', 'Czy w paczce', 'Licencja/warunki', 'Źródło', 'Uwagi']}
                                rows={[
                                    ['MangaShift', 'aplikacja', 'tak', 'własna licencja Operatora', <><code>mangashift.com</code> / GitHub Releases</>, ''],
                                    ['FFmpeg', 'narzędzie audio/wideo', '[[TAK/NIE]]', '[[LGPL/GPL - potwierdzić build]]', '[[link]]', 'sprawdzić flags builda'],
                                    ['OneOCR', 'OCR', 'nie', 'n/d', 'n/d', 'nie pakować nieautoryzowanej DLL'],
                                    ['Modele lokalne', 'AI/ML', '[[TAK/NIE]]', '[[licencja]]', '[[link]]', 'sprawdzić commercial use'],
                                    ['Fonty', 'fonty', '[[TAK/NIE]]', '[[licencja]]', '[[link]]', ''],
                                    ['Biblioteki GPL/AGPL', 'biblioteki', '[[TAK/NIE]]', '[[licencja]]', '[[link]]', 'wymaga analizy dystrybucji'],
                                    ['Google OAuth', 'logowanie', 'usługa', 'warunki Google', 'Google', 'logowanie Konta'],
                                    ['Stripe', 'płatności', 'usługa', 'warunki Stripe', 'Stripe', 'checkout/subskrypcja'],
                                    ['GitHub Releases', 'hosting pliku', 'usługa', 'warunki GitHub', 'GitHub', 'pobieranie instalatora'],
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="3." title="Dostawcy BYOK">
                            <LegalTable
                                head={['Dostawca', 'Funkcja', 'Czy aktywny w UI', 'Dane wysyłane', 'Kto podaje klucz', 'Uwagi']}
                                rows={[
                                    ['Google Gemini', 'AI/OCR/tłumaczenie/inne', '[[TAK/NIE]]', 'zależne od funkcji', 'Użytkownik', 'BYOK'],
                                    ['OpenAI', 'AI', '[[TAK/NIE]]', 'prompt/tekst/obraz zależne od funkcji', 'Użytkownik', 'BYOK'],
                                    ['Anthropic', 'AI', '[[TAK/NIE]]', 'prompt/tekst zależne od funkcji', 'Użytkownik', 'BYOK'],
                                    ['ElevenLabs', 'TTS', '[[TAK/NIE]]', 'tekst do syntezy, ustawienia głosu', 'Użytkownik', 'oficjalny BYOK'],
                                    ['OpenRouter', 'routing AI', '[[TAK/NIE]]', 'prompt/tekst/obraz zależne od modelu', 'Użytkownik', 'dodatkowa warstwa dostawcy'],
                                    ['DeepSeek', 'AI', '[[TAK/NIE]]', 'prompt/tekst zależne od funkcji', 'Użytkownik', 'BYOK'],
                                    ['DeepL', 'tłumaczenie', '[[TAK/NIE]]', 'tekst do tłumaczenia', 'Użytkownik', 'BYOK'],
                                    ['Edge TTS', 'TTS eksperymentalny', '[[TAK/NIE]]', 'tekst do syntezy', 'brak/inna konfiguracja', 'do potwierdzenia prawnego'],
                                    ['ElevenBytes', 'TTS proxy', 'NIE', 'n/d', 'n/d', 'nie w publicznym wydaniu'],
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="4." title="Minimalny proces przed release'em">
                            <LegalList
                                ordered
                                items={[
                                    "Wygeneruj listę paczki instalatora.",
                                    'Oznacz komponenty dystrybuowane z aplikacją.',
                                    'Sprawdź licencję komercyjną i obowiązki notice/source.',
                                    'Oznacz komponenty GPL, AGPL, SSPL, Non-Commercial, Research Only.',
                                    'Sprawdź, czy model/wagi pozwalają na komercyjne użycie.',
                                    'Sprawdź, czy instalator nie pakuje plików wydobytych z cudzych aplikacji bez prawa redystrybucji.',
                                    'Zapisz wersje i link do źródła.',
                                    'Dołącz wymagane notice do paczki albo strony.',
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

import type { Metadata } from 'next';
import { PageHero } from '@/shared/ui/page-hero';
import { PageShell } from '@/shared/ui/page-shell';
import { DraftNotice } from '@/shared/ui/draft-notice';
import { LegalSection, LegalP, LegalList, LegalTable } from '@/shared/ui/legal-section';
import { Footer } from '@/widgets/footer/ui/footer';

export const metadata: Metadata = {
    title: 'Polityka cookies',
    description: 'Polityka cookies MangaShift (V3 draft).',
};

export default function CookiesPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="L3."
                    page="03 / 06"
                    rule="MangaShift / cookies / 2026"
                    kicker="Dokument prawny"
                    titleBefore="Polityka"
                    titleEmphasis="cookies"
                    titleAfter="."
                    lead="Wersja: V3 draft. Data: [[DO_POTWIERDZENIA: data publikacji]]."
                />

                <PageShell sideLabel="Polityka cookies">
                    <DraftNotice />

                    <div className="mt-10 space-y-12">
                        <LegalSection index="1." title="Czym są cookies">
                            <LegalP>Cookies i podobne technologie to małe informacje zapisywane w przeglądarce lub urządzeniu Użytkownika. Mogą służyć m.in. do utrzymania sesji, bezpieczeństwa, logowania, płatności, zapamiętania wyborów i analityki.</LegalP>
                        </LegalSection>

                        <LegalSection index="2." title="Jakich technologii używamy">
                            <LegalTable
                                head={['Kategoria', 'Przykłady', 'Czy wymaga zgody']}
                                rows={[
                                    ['Niezbędne', 'sesja, bezpieczeństwo, zapamiętanie wyboru cookies', 'zwykle nie'],
                                    ['Logowanie', 'Google OAuth', 'zależy od implementacji, zasadniczo niezbędne do Konta'],
                                    ['Płatności', 'Stripe Checkout, Stripe Customer Portal', 'zasadniczo niezbędne do płatności'],
                                    ['Analityka', 'Google Analytics', 'tak, jeżeli nie jest wdrożony wariant niewymagający zgody po analizie'],
                                    ['Marketing', 'Meta/TikTok Pixel, remarketing', 'nieużywane w V3 draft; wymagałoby zgody'],
                                    ['Wideo/chat/newsletter', 'YouTube/Vimeo/chat/newsletter', 'nieużywane w V3 draft; wymagałoby oceny i zwykle zgody'],
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="3." title="Google Analytics">
                            <LegalP>Jeżeli Google Analytics jest włączony, powinien uruchamiać się dopiero po zgodzie Użytkownika w banerze cookies.</LegalP>
                            <LegalP>Plan minimum bez banera: wyłączyć Google Analytics i zostawić tylko technologie niezbędne.</LegalP>
                        </LegalSection>

                        <LegalSection index="4." title="Zarządzanie zgodami">
                            <LegalP>Użytkownik może:</LegalP>
                            <LegalList
                                items={[
                                    'zaakceptować wszystkie opcjonalne cookies;',
                                    'odrzucić opcjonalne cookies;',
                                    'zmienić wybór w ustawieniach cookies na stronie;',
                                    'usunąć cookies w ustawieniach przeglądarki.',
                                ]}
                            />
                            <LegalP>[[DO_POTWIERDZENIA: link do panelu preferencji cookies]]</LegalP>
                        </LegalSection>

                        <LegalSection index="5." title="Aplikacja desktopowa">
                            <LegalP>Aplikacja desktopowa może korzystać z lokalnego przechowywania ustawień, tokenów sesji lub danych technicznych niezbędnych do działania Konta, licencji, logowania i konfiguracji. To nie oznacza automatycznie użycia cookies przeglądarkowych, ale podobne zasady przejrzystości i minimalizacji pozostają aktualne.</LegalP>
                        </LegalSection>

                        <LegalSection index="6." title="Zmiany">
                            <LegalP>Lista cookies może się zmienić wraz z rozwojem strony, checkoutu, logowania i analityki. Przed dodaniem narzędzi marketingowych trzeba zaktualizować tę Politykę i baner zgody.</LegalP>
                        </LegalSection>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}

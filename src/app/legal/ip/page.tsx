import type { Metadata } from 'next';
import { PageHero } from '@/shared/ui/PageHero/page-hero';
import { PageShell } from '@/shared/ui/PageShell/page-shell';
import { DraftNotice } from '@/shared/ui/DraftNotice/draft-notice';
import { LegalSection, LegalP, LegalList } from '@/shared/ui/LegalSection/legal-section';
import { Footer } from '@/widgets/Footer/ui/footer';

export const metadata: Metadata = {
    title: 'Zgłoszenia naruszeń IP',
    description: 'Procedura zgłaszania naruszeń praw własności intelektualnej MangaShift (V3 draft).',
};

export default function IpPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="L5."
                    page="05 / 06"
                    rule="MangaShift / naruszenia IP / 2026"
                    kicker="Dokument prawny"
                    titleBefore="Zgłoszenia naruszeń"
                    titleEmphasis="IP"
                    titleAfter="."
                    lead="Wersja: V3 draft. Data: [[DO_POTWIERDZENIA: data publikacji]]."
                />

                <PageShell sideLabel="Naruszenia IP">
                    <DraftNotice />

                    <div className="mt-10 space-y-12">
                        <LegalSection index="1." title="Zakres procedury">
                            <LegalP>MangaShift w modelu V3 nie hostuje publicznie treści Użytkowników, nie prowadzi galerii, streamingu ani katalogu komiksów.</LegalP>
                            <LegalP>Ta procedura służy do kontaktu z Operatorem, jeżeli uważasz, że:</LegalP>
                            <LegalList
                                items={[
                                    'strona MangaShift narusza Twoje prawa;',
                                    'materiał promocyjny MangaShift narusza Twoje prawa;',
                                    'Użytkownik wykorzystuje MangaShift w sposób naruszający Twoje prawa i Operator może realnie podjąć działanie dotyczące Konta, licencji lub funkcji;',
                                    'integracja, demo, zrzut ekranu, tekst marketingowy lub publiczny materiał Operatora wymaga reakcji.',
                                ]}
                            />
                            <LegalP>Operator nie ma technicznej możliwości usunięcia lokalnych plików z urządzenia Użytkownika, jeżeli nie są hostowane przez MangaShift.</LegalP>
                        </LegalSection>

                        <LegalSection index="2." title="Gdzie wysłać zgłoszenie">
                            <LegalP>Zgłoszenia wysyłaj na:</LegalP>
                            <LegalP><code>copyright@mangashift.com</code></LegalP>
                            <LegalP>Możesz też użyć formularza:</LegalP>
                            <LegalP><code>https://mangashift.com/contact</code></LegalP>
                        </LegalSection>

                        <LegalSection index="3." title="Co powinno zawierać zgłoszenie">
                            <LegalP>Zgłoszenie powinno zawierać:</LegalP>
                            <LegalList
                                ordered
                                items={[
                                    'dane zgłaszającego;',
                                    'wskazanie, czy działasz we własnym imieniu, czy jako pełnomocnik;',
                                    'opis utworu lub prawa, które ma być naruszone;',
                                    'wskazanie materiału lub działania, które ma naruszać prawo;',
                                    'informacje pozwalające Operatorowi znaleźć materiał, jeżeli jest pod kontrolą Operatora;',
                                    'opis naruszenia;',
                                    'oświadczenie, że informacje są prawdziwe według najlepszej wiedzy zgłaszającego;',
                                    'podpis elektroniczny, imię i nazwisko albo inną identyfikację osoby uprawnionej.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="4." title="Co może zrobić Operator">
                            <LegalP>W zależności od sytuacji Operator może:</LegalP>
                            <LegalList
                                items={[
                                    'poprosić o dodatkowe informacje;',
                                    'usunąć lub zmienić własny materiał promocyjny;',
                                    'zablokować konto Użytkownika;',
                                    'ograniczyć funkcje;',
                                    'zachować logi dowodowe;',
                                    'przekazać sprawę do prawnika;',
                                    'odmówić działania, jeżeli zgłoszenie jest niewiarygodne, niepełne albo dotyczy materiału, nad którym Operator nie ma kontroli.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="5." title="DMCA">
                            <LegalP>Na dzień V3 MangaShift nie deklaruje aktywnego korzystania z pełnego trybu DMCA safe harbor dla hostingu UGC, bo nie hostuje publicznych treści Użytkowników.</LegalP>
                            <LegalP>[[DO PRAWNICZKI: czy mimo braku hostingu warto wyznaczyć DMCA agent dla USA, biorąc pod uwagę globalną stronę, GitHub Releases i ryzyko zgłoszeń od posiadaczy praw.]]</LegalP>
                            <LegalP>Jeżeli Operator wyznaczy DMCA agent, trzeba:</LegalP>
                            <LegalList
                                items={[
                                    'podać publicznie dane agenta na stronie;',
                                    'zarejestrować agenta w U.S. Copyright Office;',
                                    'wdrożyć procedury notice/counter-notice/repeat infringer.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="6." title="Zgłoszenia nieuczciwe albo błędne">
                            <LegalP>Zgłaszający odpowiada za treść zgłoszenia. Nieprawdziwe lub nadużywające zgłoszenia mogą powodować odpowiedzialność prawną.</LegalP>
                        </LegalSection>

                        <LegalSection index="7." title="Własne materiały demo MangaShift">
                            <LegalP>MangaShift powinien używać w demo tylko materiałów:</LegalP>
                            <LegalList
                                items={[
                                    'własnych;',
                                    'zamówionych z pisemną licencją obejmującą adaptacje i promocję;',
                                    'public domain po indywidualnym sprawdzeniu;',
                                    'innych materiałów z wyraźną zgodą.',
                                ]}
                            />
                            <LegalP>Nie używać kadrów, nazw serii, bohaterów ani stylistyki sugerującej konkretną cudzą serię bez zgody.</LegalP>
                        </LegalSection>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}

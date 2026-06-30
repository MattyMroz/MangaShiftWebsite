import type { Metadata } from 'next';
import { PageHero } from '@/shared/ui/PageHero/page-hero';
import { PageShell } from '@/shared/ui/PageShell/page-shell';
import { DraftNotice } from '@/shared/ui/DraftNotice/draft-notice';
import { LegalSection, LegalP, LegalList } from '@/shared/ui/LegalSection/legal-section';
import { Footer } from '@/widgets/Footer/ui/footer';

export const metadata: Metadata = {
    title: 'Odstąpienie, reklamacje i zwroty',
    description: 'Zasady odstąpienia od umowy, reklamacji i zwrotów MangaShift (V3 draft).',
};

export default function RefundsPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="L4."
                    page="04 / 06"
                    rule="MangaShift / zwroty / 2026"
                    kicker="Dokument prawny"
                    titleBefore="Odstąpienie, reklamacje i"
                    titleEmphasis="zwroty"
                    titleAfter="."
                    lead="Wersja: V3 draft. Data: [[DO_POTWIERDZENIA: data publikacji]]."
                />

                <PageShell sideLabel="Zwroty">
                    <DraftNotice />

                    <div className="mt-10 space-y-12">
                        <LegalSection index="1." title="Kontakt">
                            <LegalP>Odstąpienia, reklamacje i prośby o zwrot można składać przez:</LegalP>
                            <LegalList
                                items={[
                                    <>e-mail: <code>support@mangashift.com</code>;</>,
                                    <>formularz: <code>https://mangashift.com/contact</code>;</>,
                                    '[[DO_POTWIERDZENIA: panel konta / portal Stripe]].',
                                ]}
                            />
                            <LegalP>Discord nie jest formalnym kanałem odstąpień ani reklamacji.</LegalP>
                        </LegalSection>

                        <LegalSection index="2." title="Trial z kartą">
                            <LegalList
                                ordered
                                items={[
                                    'Trial trwa 7 dni, chyba że checkout wskazuje inaczej.',
                                    'Do aktywacji Trialu może być wymagana karta płatnicza.',
                                    'Jeżeli Użytkownik anuluje subskrypcję przed końcem Trialu, nie zostanie obciążony pierwszą opłatą.',
                                    'Jeżeli Użytkownik nie anuluje subskrypcji przed końcem Trialu, subskrypcja automatycznie przejdzie w płatny Plan wskazany w checkout.',
                                    'Checkout musi pokazać cenę, walutę, okres rozliczeniowy i datę albo jasną zasadę pierwszego obciążenia.',
                                    'Rekomendacja wdrożeniowa: wysłać przypomnienie e-mail ok. 2 dni przed końcem Trialu, jeżeli Stripe lub system MangaShift pozwala to zrobić bez nadmiernej złożoności.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="3." title="Anulowanie subskrypcji">
                            <LegalList
                                ordered
                                items={[
                                    'Użytkownik może anulować subskrypcję przez [[DO_POTWIERDZENIA: portal Stripe / konto / formularz]].',
                                    'Samo odinstalowanie Aplikacji nie anuluje subskrypcji.',
                                    'Po anulowaniu dostęp do funkcji płatnych trwa do końca opłaconego okresu, chyba że przepisy prawa, warunki promocji albo decyzja Operatora są korzystniejsze dla Użytkownika.',
                                    'Anulowanie nie usuwa automatycznie Konta.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="4." title="Prawo odstąpienia">
                            <LegalList
                                ordered
                                items={[
                                    'Konsumentowi oraz Przedsiębiorcy na prawach konsumenta może przysługiwać prawo odstąpienia od umowy zawartej na odległość w terminie 14 dni, zgodnie z przepisami.',
                                    'W przypadku usług cyfrowych lub treści cyfrowych prawo odstąpienia może być ograniczone lub wyłączone tylko w zakresie dopuszczonym przez prawo, po spełnieniu wymaganych warunków informacyjnych i zgody Użytkownika.',
                                    <>Jeżeli checkout wymaga natychmiastowego dostępu do Aplikacji lub rozpoczęcia świadczenia przed upływem 14 dni, Użytkownik powinien otrzymać jasny checkbox dotyczący:
                                        <LegalList items={['zgody na rozpoczęcie świadczenia przed upływem terminu odstąpienia;', 'informacji o skutkach dla prawa odstąpienia, jeżeli takie skutki wynikają z przepisów.']} className="mt-3" /></>,
                                    '[[DO PRAWNICZKI: ostateczne brzmienie checkboxa dla subskrypcji/trialu i kwalifikacji MangaShift jako usługi cyfrowej/treści cyfrowej.]]',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="5." title="Wzór odstąpienia">
                            <LegalP>Użytkownik może skorzystać z poniższego wzoru, ale nie musi.</LegalP>
                            <pre className="overflow-x-auto rounded-[1.4rem] border border-[var(--line-strong)] bg-[var(--surface)] p-6 font-mono text-[1.25rem] leading-[1.7] text-[var(--text-muted)] whitespace-pre-wrap">
{`Adresat: MangaShift / Mateusz Mróz
E-mail: support@mangashift.com

Ja, [imię i nazwisko], informuję o odstąpieniu od umowy dotyczącej MangaShift.

Data zawarcia umowy / aktywacji Planu:
Adres e-mail Konta:
Imię i nazwisko:
Data:
Podpis (jeżeli formularz jest wysyłany papierowo):`}
                            </pre>
                        </LegalSection>

                        <LegalSection index="6." title="Zwroty płatności">
                            <LegalList
                                ordered
                                items={[
                                    'Zwrot środków nastąpi tą samą metodą płatności, chyba że uzgodniono inaczej i nie powoduje to kosztów dla Użytkownika.',
                                    'Operator może przyznać zwrot uznaniowy, nawet jeżeli przepisy nie wymagają zwrotu.',
                                    'Brak dodatkowej gwarancji zwrotu oznacza, że poza prawami ustawowymi zwroty są rozpatrywane indywidualnie.',
                                    'Chargeback może spowodować czasowe ograniczenie Konta do czasu wyjaśnienia sprawy.',
                                ]}
                            />
                        </LegalSection>

                        <LegalSection index="7." title="Reklamacje">
                            <LegalP>Reklamacja powinna zawierać:</LegalP>
                            <LegalList
                                items={[
                                    'adres e-mail Konta;',
                                    'opis problemu;',
                                    'wersję Aplikacji;',
                                    'system operacyjny;',
                                    'datę wystąpienia problemu;',
                                    'oczekiwane rozwiązanie;',
                                    'zrzuty ekranu lub logi tylko wtedy, gdy nie zawierają cudzych treści, kluczy API ani danych poufnych.',
                                ]}
                            />
                            <LegalP>Operator odpowie na reklamację w terminie wymaganym przez prawo. Dla Konsumentów przyjmujemy roboczo termin 14 dni, chyba że prawniczka wskaże inny termin dla konkretnej kategorii sprawy.</LegalP>
                        </LegalSection>

                        <LegalSection index="8." title="Niezgodność usługi cyfrowej">
                            <LegalP>Jeżeli MangaShift jest niezgodny z umową, Konsumentowi mogą przysługiwać uprawnienia przewidziane przepisami, w szczególności doprowadzenie do zgodności, obniżenie ceny albo odstąpienie od umowy, jeżeli spełnione są warunki ustawowe.</LegalP>
                            <LegalP>Postanowienia dokumentów MangaShift nie ograniczają praw ustawowych Konsumenta.</LegalP>
                        </LegalSection>

                        <LegalSection index="9." title="Problemy zależne od Dostawców Zewnętrznych">
                            <LegalP>Niektóre problemy mogą wynikać z:</LegalP>
                            <LegalList
                                items={[
                                    'limitów API;',
                                    'błędnego klucza BYOK;',
                                    'blokady konta u Dostawcy Zewnętrznego;',
                                    'zmian cennika lub regulaminu dostawcy;',
                                    'awarii dostawcy;',
                                    'niezgodnego z regulaminem użycia API.',
                                ]}
                            />
                            <LegalP>W takich przypadkach Operator pomoże w zakresie, w jakim jest to rozsądnie możliwe, ale może nie mieć kontroli nad decyzją Dostawcy Zewnętrznego.</LegalP>
                        </LegalSection>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}

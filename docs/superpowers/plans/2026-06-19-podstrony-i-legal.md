# Podstrony MangaShift + legal hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dobudować do landingu (single-page, EN) zestaw podstron Next (App Router, `output: 'export'`): marketing (EN/i18n) + hub prawny (PL 1:1 z draftów), oraz naprawić 2 problemy dev (allowedDevOrigins, favicon 404).

**Architecture:** Każda trasa = `src/app/<trasa>/page.tsx` (statyczny route). Reużycie istniejącej biblioteki `shared/ui` i stylu editorial-minimal. 4 nowe małe komponenty współdzielone (`PageShell`, `PageHero`, `DraftNotice`, `LegalSection`). Marketing przez i18n (`en.json`), legal jako natywny JSX PL 1:1 (znaczniki `[[...]]` zostają w tekście). Nawigacja do podstron w stopce + menu mobilnym. Zero nowych zależności.

**Tech Stack:** Next 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind v4, framer-motion, lucide-react. Bun (nigdy npm/yarn).

## Global Constraints

- **Pakiet menedżera:** wyłącznie `bun` (`bun run type-check`, `bun run lint`, `bun run build`). Nigdy npm/yarn.
- **Zero nowych zależności** — tylko to, co już jest w `package.json`.
- **Pliki UTF-8 (LF)** — edytować WYŁĄCZNIE przez Edit/Write, NIGDY przez PowerShell (mojibake polskich znaków).
- **Frontend praktycznie bez komentarzy** — kod tłumaczy się sam.
- **Commity:** Conventional Commits `type(scope): opis` (rozkazujący, lowercase, ≤72 zn., atomic). BEZ stopki `Co-Authored-By: Claude`.
- **Styl:** tokeny CSS (`--accent`, `--accent-text`, `--text`, `--text-muted`, `--text-faint`, `--line`, `--line-strong`, `--surface`, `--bg`); klasy `.display`, `.section-kicker`, `.eyebrow`, `.section-shell`; fonty `var(--font-display)`, `var(--font-serif)`, `var(--font-mono)`.
- **Marketing = EN** przez `t('ns.klucz')` z `en.json`. **Legal = PL 1:1** z draftów (NIE przez i18n), znaczniki `[[DO_POTWIERDZENIA: ...]]`/`[[CENA]]` zostają dosłownie w tekście.
- **Operator:** „Mateusz Mróz, działalność nierejestrowana" (robocze); adres = `[[DO_POTWIERDZENIA: adres publiczny]]`. Maile: `support@mangashift.com`, `privacy@mangashift.com`, `copyright@mangashift.com`.
- **Bramka testowa** (repo nie ma testów jednostkowych — frontend statyczny): każde zadanie kończy się `bun run type-check` + `bun run lint` zielone; zadania zmieniające routing/strony dodatkowo `bun run build` zielony.
- **`assetPath(path)`** z `@/shared/lib/utils/assetPath` dla zasobów (dokłada basePath w prod).
- **`cn(...)`** z `@/shared/lib/utils/cn` do łączenia klas.

**Źródła treści legal** (folder `C:\Users\MattyMroz\Desktop\PROJECTS\ProPrompts\knowledge\MangaShift\01_projekt\statute\pakiet_v3_draft\`):
`01_REGULAMIN.md`, `02_POLITYKA_PRYWATNOSCI.md`, `03_POLITYKA_COOKIES.md`, `04_ODSTAPIENIE_REKLAMACJE_ZWROTY.md`, `05_ZGLOSZENIA_NARUSZEN_IP.md`, `06_THIRD_PARTY_NOTICES_SZABLON.md`, `07_COPY_NA_STRONE_I_CHECKOUT.md` (copy marketing), `11_CENNIK_SZABLON.md` (cennik).

---

## File Structure

**Nowe komponenty współdzielone:**
- `src/shared/ui/PageHero/PageHero.tsx` — nagłówek podstrony (EditorialRule + kicker + display h1 + lead)
- `src/shared/ui/PageShell/PageShell.tsx` — wrapper podstrony (top padding pod header + Container + opcjonalny SideLabel)
- `src/shared/ui/DraftNotice/DraftNotice.tsx` — baner draftu legal
- `src/shared/ui/LegalSection/LegalSection.tsx` — numerowana sekcja legal (h2 editorial + slot) + sub-eksporty `LegalP`, `LegalList`, `LegalTable`

**Modyfikacje:**
- `next.config.ts` — allowedDevOrigins
- `src/app/layout.tsx` — usunięcie hardkodu favicon
- `src/widgets/Footer/ui/Footer.tsx` — kolumna linków do podstron
- `src/widgets/Header/ui/Header.tsx` — anchory działające z podstron + linki podstron w menu mobilnym
- `src/shared/i18n/en.json` — namespace `features`, `pricing`, `download`, `contact`, `legal`

**Nowe trasy:**
- `src/app/features/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/download/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/legal/page.tsx`
- `src/app/legal/terms/page.tsx`
- `src/app/legal/privacy/page.tsx`
- `src/app/legal/cookies/page.tsx`
- `src/app/legal/refunds/page.tsx`
- `src/app/legal/ip/page.tsx`
- `src/app/legal/third-party-notices/page.tsx`

---

## Task 1: Fixy dev (allowedDevOrigins + favicon)

**Files:**
- Modify: `next.config.ts:9`
- Modify: `src/app/layout.tsx:57-59`

**Interfaces:**
- Produces: nic dla innych zadań (ortogonalne fixy).

- [ ] **Step 1: Dodaj brakujący origin do next.config.ts**

W `next.config.ts` zmień linię `allowedDevOrigins`:

```ts
  allowedDevOrigins: ['192.168.117.1', '192.168.18.145'],
```

- [ ] **Step 2: Usuń hardkod favicon z layout.tsx**

Next App Router auto-obsługuje `src/app/favicon.ico` z poprawnym basePath. Hardkod `/MangaShiftWebsite/favicon.ico` 404-uje w dev (basePath=''). Usuń blok `icons` z `metadata` w `src/app/layout.tsx`:

Usuń (linie ~57-59):
```ts
  icons: {
    icon: "/MangaShiftWebsite/favicon.ico"
  }
```
(wraz z poprzedzającym przecinkiem po bloku `robots`).

- [ ] **Step 3: Build i weryfikacja favicon**

Run: `bun run build`
Expected: build PASS. Następnie sprawdź, że `out/favicon.ico` istnieje i że w `out/index.html` w `<head>` link do favicon NIE zawiera podwójnego `/MangaShiftWebsite/MangaShiftWebsite` ani hardkodu — Next wstawia `/MangaShiftWebsite/favicon.ico?<hash>` automatycznie w prod.

- [ ] **Step 4: type-check + lint**

Run: `bun run type-check && bun run lint`
Expected: oba PASS.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts src/app/layout.tsx
git commit -m "fix(dev): add lan dev origin and let app router serve favicon"
```

---

## Task 2: Komponent PageHero

**Files:**
- Create: `src/shared/ui/PageHero/PageHero.tsx`

**Interfaces:**
- Consumes: `Container` (`@/shared/ui/Container/Container`), `EditorialRule` (`@/shared/ui/EditorialRule/EditorialRule`), `MetaLabel` (`@/shared/ui/MetaLabel/MetaLabel`), framer-motion.
- Produces: `PageHero` — props `{ index: string; page: string; rule: string; kicker: string; titleBefore: string; titleEmphasis: string; titleAfter?: string; lead: string; className?: string }`. Renderuje sekcję z paddingiem top pod fixed header.

- [ ] **Step 1: Napisz komponent**

```tsx
'use client';

import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { EditorialRule } from '@/shared/ui/EditorialRule/EditorialRule';
import { MetaLabel } from '@/shared/ui/MetaLabel/MetaLabel';
import { cn } from '@/shared/lib/utils/cn';

interface PageHeroProps {
    index: string;
    page: string;
    rule: string;
    kicker: string;
    titleBefore: string;
    titleEmphasis: string;
    titleAfter?: string;
    lead: string;
    className?: string;
}

const reveal = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
};

export const PageHero = ({
    index,
    page,
    rule,
    kicker,
    titleBefore,
    titleEmphasis,
    titleAfter = '.',
    lead,
    className,
}: PageHeroProps) => (
    <section className={cn('relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40', className)}>
        <Container>
            <EditorialRule index={index} page={page}>
                {rule}
            </EditorialRule>

            <div className="mt-10 max-w-[58rem] lg:mt-14">
                <motion.div {...reveal} transition={{ duration: 0.55 }}>
                    <MetaLabel>{kicker}</MetaLabel>
                </motion.div>

                <motion.h1
                    className="display mt-7 text-[clamp(4.4rem,6.6vw,8.4rem)]"
                    {...reveal}
                    transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                    {titleBefore}{' '}
                    <em className="text-[var(--accent-text)]">{titleEmphasis}</em>
                    {titleAfter}
                </motion.h1>

                <motion.p
                    className="mt-8 max-w-[54ch] text-[1.7rem] leading-[1.65] text-[var(--text-muted)] md:text-[1.9rem]"
                    {...reveal}
                    transition={{ duration: 0.7, delay: 0.18 }}
                >
                    {lead}
                </motion.p>
            </div>
        </Container>
    </section>
);
```

- [ ] **Step 2: type-check + lint**

Run: `bun run type-check && bun run lint`
Expected: oba PASS.

- [ ] **Step 3: Commit**

```bash
git add src/shared/ui/PageHero/PageHero.tsx
git commit -m "feat(ui): add PageHero for subpage headers"
```

---

## Task 3: Komponent PageShell

**Files:**
- Create: `src/shared/ui/PageShell/PageShell.tsx`

**Interfaces:**
- Consumes: `Container`, `SideLabel` (`@/shared/ui/SideLabel/SideLabel`), `cn`.
- Produces: `PageShell` — props `{ children: ReactNode; sideLabel?: ReactNode; className?: string }`. Sekcja z `section-shell` paddingiem + Container; jeśli `sideLabel` podany, renderuje `<SideLabel side="left">`.

- [ ] **Step 1: Napisz komponent**

```tsx
import type { ReactNode } from 'react';
import { Container } from '@/shared/ui/Container/Container';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';
import { cn } from '@/shared/lib/utils/cn';

interface PageShellProps {
    children: ReactNode;
    sideLabel?: ReactNode;
    className?: string;
}

export const PageShell = ({ children, sideLabel, className }: PageShellProps) => (
    <section className={cn('relative pb-[clamp(6rem,9vw,11rem)]', className)}>
        {sideLabel ? <SideLabel side="left">{sideLabel}</SideLabel> : null}
        <Container className="relative">{children}</Container>
    </section>
);
```

- [ ] **Step 2: type-check + lint**

Run: `bun run type-check && bun run lint`
Expected: oba PASS.

- [ ] **Step 3: Commit**

```bash
git add src/shared/ui/PageShell/PageShell.tsx
git commit -m "feat(ui): add PageShell wrapper for subpages"
```

---

## Task 4: Komponent DraftNotice

**Files:**
- Create: `src/shared/ui/DraftNotice/DraftNotice.tsx`

**Interfaces:**
- Consumes: `lucide-react` (`AlertTriangle`), `cn`.
- Produces: `DraftNotice` — props `{ children?: ReactNode; className?: string }`. Domyślna treść PL: tytuł „Draft roboczy" + opis. Wariant accent-subtle.

- [ ] **Step 1: Napisz komponent**

```tsx
import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';

interface DraftNoticeProps {
    children?: ReactNode;
    className?: string;
}

export const DraftNotice = ({ children, className }: DraftNoticeProps) => (
    <div
        role="note"
        className={cn(
            'flex items-start gap-4 rounded-[1.4rem] border p-6 md:p-7',
            'border-[var(--accent-border)] bg-[var(--accent-subtle)]',
            className,
        )}
    >
        <AlertTriangle
            aria-hidden="true"
            className="mt-1 h-6 w-6 shrink-0 text-[var(--accent-text)]"
        />
        <div className="text-[1.4rem] leading-[1.7] text-[var(--text-muted)]">
            <p className="font-mono text-[1rem] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                Draft roboczy
            </p>
            <p className="mt-2">
                {children ?? (
                    <>
                        Ten dokument jest wersją roboczą (V3 draft) i nie jest jeszcze wiążący prawnie.
                        Zostanie zweryfikowany przez prawnika i opublikowany w finalnej wersji przed
                        uruchomieniem płatnych planów. Miejsca oznaczone{' '}
                        <code className="rounded bg-[var(--overlay)] px-1.5 py-0.5 font-mono text-[1.1rem] text-[var(--text)]">
                            [[…]]
                        </code>{' '}
                        wymagają jeszcze uzupełnienia.
                    </>
                )}
            </p>
        </div>
    </div>
);
```

- [ ] **Step 2: type-check + lint**

Run: `bun run type-check && bun run lint`
Expected: oba PASS.

- [ ] **Step 3: Commit**

```bash
git add src/shared/ui/DraftNotice/DraftNotice.tsx
git commit -m "feat(ui): add DraftNotice banner for legal drafts"
```

---

## Task 5: Komponenty LegalSection + prymitywy treści

**Files:**
- Create: `src/shared/ui/LegalSection/LegalSection.tsx`

**Interfaces:**
- Consumes: `cn`.
- Produces:
  - `LegalSection` — props `{ index: string; title: string; children: ReactNode; className?: string }`. Renderuje numerowany `h2` (mono index accent + tytuł display) + slot treści.
  - `LegalP` — props `{ children: ReactNode; className?: string }`. Paragraf treści (`<p>` ~1.5rem leading 1.8).
  - `LegalList` — props `{ items: ReactNode[]; ordered?: boolean; className?: string }`. Lista `<ol>`/`<ul>` z markerami.
  - `LegalTable` — props `{ head: ReactNode[]; rows: ReactNode[][]; className?: string }`. Tabela w stylu editorial (cennik/retencja/cookies).

- [ ] **Step 1: Napisz komponenty**

```tsx
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface LegalSectionProps {
    index: string;
    title: string;
    children: ReactNode;
    className?: string;
}

export const LegalSection = ({ index, title, children, className }: LegalSectionProps) => (
    <section className={cn('border-t border-[var(--line)] pt-10', className)}>
        <h2 className="flex items-baseline gap-4 text-[clamp(2.2rem,3vw,3.2rem)] font-bold tracking-tight text-[var(--text)]">
            <span className="font-mono text-[1.2rem] font-medium text-[var(--accent-text)]">{index}</span>
            <span>{title}</span>
        </h2>
        <div className="mt-6 space-y-5">{children}</div>
    </section>
);

interface LegalPProps {
    children: ReactNode;
    className?: string;
}

export const LegalP = ({ children, className }: LegalPProps) => (
    <p className={cn('max-w-[72ch] text-[1.5rem] leading-[1.8] text-[var(--text-muted)]', className)}>
        {children}
    </p>
);

interface LegalListProps {
    items: ReactNode[];
    ordered?: boolean;
    className?: string;
}

export const LegalList = ({ items, ordered = false, className }: LegalListProps) => {
    const Tag = ordered ? 'ol' : 'ul';
    return (
        <Tag
            className={cn(
                'max-w-[72ch] space-y-2.5 pl-6 text-[1.5rem] leading-[1.75] text-[var(--text-muted)]',
                ordered ? 'list-decimal' : 'list-disc',
                'marker:text-[var(--accent-text)]',
                className,
            )}
        >
            {items.map((item, index) => (
                <li key={index} className="pl-1">
                    {item}
                </li>
            ))}
        </Tag>
    );
};

interface LegalTableProps {
    head: ReactNode[];
    rows: ReactNode[][];
    className?: string;
}

export const LegalTable = ({ head, rows, className }: LegalTableProps) => (
    <div className={cn('overflow-x-auto', className)}>
        <table className="w-full min-w-[40rem] border-collapse text-left text-[1.35rem] leading-[1.6]">
            <thead>
                <tr className="border-y border-[var(--line-strong)]">
                    {head.map((cell, index) => (
                        <th
                            key={index}
                            className="px-4 py-3 font-mono text-[1rem] uppercase tracking-[0.14em] text-[var(--text-faint)]"
                        >
                            {cell}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-[var(--line)]">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-3 align-top text-[var(--text-muted)]">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
```

- [ ] **Step 2: type-check + lint**

Run: `bun run type-check && bun run lint`
Expected: oba PASS.

- [ ] **Step 3: Commit**

```bash
git add src/shared/ui/LegalSection/LegalSection.tsx
git commit -m "feat(ui): add legal content primitives (section, p, list, table)"
```

---

## Task 6: i18n — namespace dla podstron marketingowych

**Files:**
- Modify: `src/shared/i18n/en.json` (dodanie kluczy `pages`)

**Interfaces:**
- Consumes: istniejący `t('ns.klucz')` z `@/shared/i18n`.
- Produces: klucze `pages.features.*`, `pages.pricing.*`, `pages.download.*`, `pages.contact.*`, `pages.legalHub.*`. Tablice przez indeksy (`pages.features.items.0.title`).

- [ ] **Step 1: Dodaj namespace `pages` do en.json**

Dodaj nowy top-level klucz `"pages"` (np. po istniejących sekcjach, przed zamykającym `}`). Pełna treść:

```json
"pages": {
  "nav": {
    "features": "Features",
    "pricing": "Pricing",
    "download": "Download",
    "contact": "Contact",
    "legal": "Legal"
  },
  "features": {
    "rule": "MangaShift / capabilities / 2026",
    "kicker": "What MangaShift does",
    "page": "F / 11",
    "titleBefore": "A local studio for comics you",
    "titleEmphasis": "own",
    "titleAfter": ".",
    "lead": "MangaShift is a desktop comic reader and a toolkit of AI features for translating, narrating and adapting material you hold the rights to. Your projects stay on your machine.",
    "sideLabel": "Capabilities",
    "items": [
      { "title": "Local comic reader", "text": "Read your library on Windows with a focused, panel-aware reader. MangaShift is not a content store and ships no comics of its own." },
      { "title": "OCR & translation", "text": "Extract text and translate it with local models or your own API keys (BYOK). You stay in control of every provider you connect." },
      { "title": "Text-to-speech", "text": "Turn dialogue and narration into speech for material you are allowed to process, with voices from your configured providers." },
      { "title": "Frame animation", "text": "Add motion to panels and assemble scenes for legally held material — a path from static page toward a moving adaptation." },
      { "title": "Audio & video export", "text": "Export audio, video or motion comic when you hold the rights for that use. Results render locally and stay yours." },
      { "title": "BYOK & local projects", "text": "Bring your own keys for Gemini, OpenAI, Anthropic, ElevenLabs, DeepL and more. Keys live in your system credential store; projects stay on disk." }
    ],
    "noteTitle": "What MangaShift is not",
    "note": "MangaShift does not host your files, does not provide comics, and is not a way around copyright. Importing a comic does not by itself grant the right to adapt, narrate or publish it."
  },
  "pricing": {
    "rule": "MangaShift / pricing / 2026",
    "kicker": "Plans & pricing",
    "page": "P / 11",
    "titleBefore": "Pricing is being",
    "titleEmphasis": "finalised",
    "titleAfter": ".",
    "lead": "MangaShift will offer a Free plan plus paid Monthly and Annual plans with a 7-day card trial. Final prices, currency and billing dates are confirmed at checkout before you pay.",
    "sideLabel": "Plans",
    "trialNote": "7 days free, then [[CENA]] per month. Card required. Cancel before the trial ends to avoid the charge.",
    "draftNote": "Prices below are placeholders. Checkout is not enabled until pricing, operator details and consent checkboxes are final.",
    "plans": [
      { "name": "Free", "price": "0", "period": "forever", "desc": "Basic access to MangaShift with feature or usage limits.", "cta": "Get started" },
      { "name": "Monthly", "price": "[[CENA]]", "period": "per month", "desc": "Fuller access to MangaShift features. Renews automatically. Cancel anytime — access lasts until the end of the paid period.", "cta": "Start 7-day trial" },
      { "name": "Annual", "price": "[[CENA]]", "period": "per year", "desc": "Fuller access to MangaShift features, billed yearly. Renews automatically unless checkout states otherwise.", "cta": "Start 7-day trial" }
    ],
    "byokTitle": "BYOK costs are separate",
    "byok": "MangaShift's price does not cover the cost of third-party API accounts (OpenAI, Anthropic, Google Gemini, ElevenLabs, OpenRouter, DeepSeek, DeepL). You pay those providers directly under their own terms."
  },
  "download": {
    "rule": "MangaShift / download / 2026",
    "kicker": "Get the app",
    "page": "D / 11",
    "titleBefore": "Download MangaShift for",
    "titleEmphasis": "Windows",
    "titleAfter": ".",
    "lead": "MangaShift ships first as a Windows desktop app via GitHub Releases. A Google account and an internet connection are required at least for sign-in, licensing and updates.",
    "sideLabel": "Install",
    "ctaPrimary": "GitHub Releases",
    "ctaSecondary": "Join the private beta",
    "availability": "The public installer arrives with the beta. Until then, request access and you'll get the link first.",
    "reqTitle": "Requirements",
    "requirements": [
      { "label": "Operating system", "value": "Windows 10/11 (64-bit)" },
      { "label": "Account", "value": "Google sign-in" },
      { "label": "Network", "value": "Online for sign-in, licensing, updates" },
      { "label": "Version", "value": "[[DO_POTWIERDZENIA: wersja aplikacji]]" }
    ],
    "noteTitle": "macOS & Linux",
    "note": "Support for macOS or Linux may be added later. For now, MangaShift targets Windows."
  },
  "contact": {
    "rule": "MangaShift / contact / 2026",
    "kicker": "Get in touch",
    "page": "C / 11",
    "titleBefore": "Talk to the",
    "titleEmphasis": "studio",
    "titleAfter": ".",
    "lead": "Questions about MangaShift, your account or a legal matter — reach the right inbox below, or use the form. Formal complaints and refunds go by email or the form, not Discord.",
    "sideLabel": "Support",
    "formName": "Name",
    "formEmail": "Email",
    "formTopic": "Topic",
    "formMessage": "Message",
    "formSubmit": "Send message",
    "formNotice": "The contact backend opens with the beta. For now, email us directly at the address above.",
    "channels": [
      { "label": "Support", "email": "support@mangashift.com", "desc": "General help, billing, refunds, complaints." },
      { "label": "Privacy", "email": "privacy@mangashift.com", "desc": "Data requests, GDPR, account deletion." },
      { "label": "Copyright", "email": "copyright@mangashift.com", "desc": "IP and copyright notices." }
    ]
  },
  "legalHub": {
    "rule": "MangaShift / legal / 2026",
    "kicker": "Legal hub",
    "page": "L / 11",
    "titleBefore": "Legal",
    "titleEmphasis": "documents",
    "titleAfter": ".",
    "lead": "Drafts of the MangaShift legal documents. They are being finalised with a lawyer and will be published before paid plans launch. Documents are kept in Polish for now and will be translated later.",
    "sideLabel": "Documents",
    "draftNote": "These documents are working drafts (V3) and are not yet legally binding.",
    "links": [
      { "title": "Regulamin", "desc": "Terms of service", "href": "/legal/terms" },
      { "title": "Polityka prywatności", "desc": "Privacy policy", "href": "/legal/privacy" },
      { "title": "Polityka cookies", "desc": "Cookies", "href": "/legal/cookies" },
      { "title": "Odstąpienie, reklamacje i zwroty", "desc": "Refunds & withdrawal", "href": "/legal/refunds" },
      { "title": "Zgłoszenia naruszeń IP", "desc": "IP infringement", "href": "/legal/ip" },
      { "title": "Third-party notices", "desc": "External components", "href": "/legal/third-party-notices" }
    ]
  }
}
```

- [ ] **Step 2: type-check + lint**

Run: `bun run type-check && bun run lint`
Expected: oba PASS (JSON poprawny, brak literówek składni).

- [ ] **Step 3: Commit**

```bash
git add src/shared/i18n/en.json
git commit -m "feat(i18n): add copy for marketing subpages and legal hub"
```

---

## Task 7: Nawigacja — Footer (kolumna podstron) + Header (menu mobilne + anchory z podstron)

**Files:**
- Modify: `src/widgets/Footer/ui/Footer.tsx`
- Modify: `src/widgets/Header/ui/Header.tsx`

**Interfaces:**
- Consumes: `Link` (next/link), `usePathname`, `t`, istniejące `navLinks`/`exploreLinks`.
- Produces: stałą `pageLinks` (współdzielony kształt) używaną w Footer i Header.

- [ ] **Step 1: Dodaj kolumnę „Pages" w Footer**

W `src/widgets/Footer/ui/Footer.tsx` dodaj nad/obok istniejących nawigacji listę linków do podstron. Najpierw dodaj stałą po `productNotes`:

```tsx
const pageLinks = [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/download', label: 'Download' },
    { href: '/contact', label: 'Contact' },
    { href: '/legal', label: 'Legal' },
] as const;
```

Następnie zmień siatkę linków: kolumna „Connect" jest `lg:col-span-2`, a „Explore"/„Product" zajmują resztę. Zmień `<nav aria-label="Footer navigation" className="lg:col-span-3">` na `lg:col-span-2` i dodaj NOWĄ kolumnę zaraz po niej (przed kolumną „Product"):

```tsx
<nav aria-label="Pages" className="lg:col-span-2">
    <p className="font-mono text-[1rem] uppercase tracking-[0.2em] text-white/35">
        Pages
    </p>
    <ul className="mt-6 flex flex-col gap-3">
        {pageLinks.map((link) => (
            <li key={link.href}>
                <Link
                    href={link.href}
                    className="text-[1.4rem] text-white/60 transition-colors duration-200 hover:text-white"
                >
                    {link.label}
                </Link>
            </li>
        ))}
    </ul>
</nav>
```

Zmień też kolumnę „Product" `dl` z `lg:col-span-3` na `lg:col-span-3` (zostaje), a brand `sm:col-span-2 lg:col-span-4` → `lg:col-span-3`, by w sumie 3+2+2+3+2=12 się zmieściło. Docelowy podział kolumn (lg, suma 12): brand `lg:col-span-3`, Explore `lg:col-span-2`, Pages `lg:col-span-2`, Product `lg:col-span-3`, Connect `lg:col-span-2`.

- [ ] **Step 2: Anchory działające z podstron + linki podstron w menu mobilnym (Header)**

W `src/widgets/Header/ui/Header.tsx`:

(a) Dodaj stałą `pageLinks` po `navLinks`:

```tsx
const pageLinks = [
    { name: t('pages.nav.features'), href: '/features' },
    { name: t('pages.nav.pricing'), href: '/pricing' },
    { name: t('pages.nav.download'), href: '/download' },
    { name: t('pages.nav.contact'), href: '/contact' },
    { name: t('pages.nav.legal'), href: '/legal' },
];
```

(b) Napraw anchory dla podstron — `smoothScrollTo` działa tylko, gdy cel istnieje na stronie. Zmień handler `nav`, by na innych trasach niż `/` przekierowywał do `/#sekcja`:

Zamień funkcję `nav`:
```tsx
    const nav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (isOpen) setIsOpen(false);
        if (pathname === '/' && href && smoothScrollTo(href)) e.preventDefault();
    };
```

Oraz w renderze linków desktop i mobile, gdy nie jesteśmy na `/`, anchor musi prowadzić do `/#...`. Dodaj helper przed `return`:
```tsx
    const anchorHref = (href: string) => (pathname === '/' ? href : `/${href}`);
```
i użyj `href={anchorHref(link.href)}` w obu `navLinks.map` (desktop nav + mobilne menu).

(c) `joinBeta` — analogicznie, gdy nie na `/`, kieruj do `/#beta`:
```tsx
    const joinBeta = () => {
        if (isOpen) setIsOpen(false);
        if (pathname === '/') {
            smoothScrollTo('#beta');
        } else {
            window.location.href = '/#beta';
        }
    };
```

(d) W mobilnym menu (`AnimatePresence` blok) dodaj sekcję linków do podstron pod listą anchorów. Po `</ul>` z anchorami, przed `<div className="mt-10 flex justify-center">`, wstaw:
```tsx
                        <ul className="mt-8 flex flex-col items-center gap-5 border-t border-[var(--line)] pt-8 list-none">
                            {pageLinks.map((link, i) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (navLinks.length + i) * 0.05 + 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="font-[family-name:var(--font-mono)] text-[1.5rem] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
```

- [ ] **Step 3: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: wszystkie PASS. (Build potwierdza, że Header/Footer renderują się z nowymi linkami bez błędów SSR/eksportu.)

- [ ] **Step 4: Commit**

```bash
git add src/widgets/Footer/ui/Footer.tsx src/widgets/Header/ui/Header.tsx
git commit -m "feat(nav): link subpages in footer and mobile menu, fix anchors off-home"
```

---

## Task 8: Strona /features

**Files:**
- Create: `src/app/features/page.tsx`

**Interfaces:**
- Consumes: `PageHero`, `PageShell`, `Footer` (`@/widgets/Footer/ui/Footer`), `Card` (`@/shared/ui/lib/Card`), `t`.
- Produces: route `/features`.

- [ ] **Step 1: Sprawdź eksport Card**

Run: otwórz `src/shared/ui/lib/Card.tsx` i potwierdź eksportowane nazwy (`Card`, `CardHeader`, `CardTitle`, `CardContent` itp.). Jeśli inne — użyj prostego `<article>` zamiast Card (patrz Step 2, wariant bez Card).

- [ ] **Step 2: Napisz stronę**

```tsx
import type { Metadata } from 'next';
import { PageHero } from '@/shared/ui/PageHero/PageHero';
import { PageShell } from '@/shared/ui/PageShell/PageShell';
import { Footer } from '@/widgets/Footer/ui/Footer';
import { t } from '@/shared/i18n';

export const metadata: Metadata = {
    title: 'Features',
    description: 'A local comic reader and AI toolkit: OCR, translation, text-to-speech, frame animation, export and BYOK — for material you own.',
};

const items = [0, 1, 2, 3, 4, 5] as const;

export default function FeaturesPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="F."
                    page={t('pages.features.page')}
                    rule={t('pages.features.rule')}
                    kicker={t('pages.features.kicker')}
                    titleBefore={t('pages.features.titleBefore')}
                    titleEmphasis={t('pages.features.titleEmphasis')}
                    titleAfter={t('pages.features.titleAfter')}
                    lead={t('pages.features.lead')}
                />

                <PageShell sideLabel={t('pages.features.sideLabel')}>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((index) => (
                            <article
                                key={index}
                                className="group relative overflow-hidden rounded-[2rem] border border-[var(--line-strong)] bg-[var(--surface)] p-7 transition-colors duration-500 hover:border-[var(--accent)]"
                            >
                                <span className="font-mono text-[1rem] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <h2 className="mt-5 text-[2rem] font-bold leading-tight tracking-tight text-[var(--text)]">
                                    {t(`pages.features.items.${index}.title`)}
                                </h2>
                                <p className="mt-4 text-[1.4rem] leading-[1.65] text-[var(--text-muted)]">
                                    {t(`pages.features.items.${index}.text`)}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
                        <h2 className="text-[1.8rem] font-bold tracking-tight text-[var(--text)]">
                            {t('pages.features.noteTitle')}
                        </h2>
                        <p className="mt-4 max-w-[64ch] text-[1.5rem] leading-[1.75] text-[var(--text-muted)]">
                            {t('pages.features.note')}
                        </p>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}
```

- [ ] **Step 3: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: PASS; `out/features/index.html` istnieje.

- [ ] **Step 4: Commit**

```bash
git add src/app/features/page.tsx
git commit -m "feat(pages): add features page"
```

---

## Task 9: Strona /pricing

**Files:**
- Create: `src/app/pricing/page.tsx`

**Interfaces:**
- Consumes: `PageHero`, `PageShell`, `DraftNotice`, `Footer`, `Button` (`@/shared/ui/lib/Button`), `t`.
- Produces: route `/pricing`. Klient (Button onClick) → `'use client'`.

- [ ] **Step 1: Napisz stronę**

```tsx
'use client';

import Link from 'next/link';
import { PageHero } from '@/shared/ui/PageHero/PageHero';
import { PageShell } from '@/shared/ui/PageShell/PageShell';
import { DraftNotice } from '@/shared/ui/DraftNotice/DraftNotice';
import { Footer } from '@/widgets/Footer/ui/Footer';
import { Button } from '@/shared/ui/lib/Button';
import { t } from '@/shared/i18n';

const plans = [0, 1, 2] as const;

export default function PricingPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="P."
                    page={t('pages.pricing.page')}
                    rule={t('pages.pricing.rule')}
                    kicker={t('pages.pricing.kicker')}
                    titleBefore={t('pages.pricing.titleBefore')}
                    titleEmphasis={t('pages.pricing.titleEmphasis')}
                    titleAfter={t('pages.pricing.titleAfter')}
                    lead={t('pages.pricing.lead')}
                />

                <PageShell sideLabel={t('pages.pricing.sideLabel')}>
                    <DraftNotice>{t('pages.pricing.draftNote')}</DraftNotice>

                    <div className="mt-8 grid gap-4 lg:grid-cols-3">
                        {plans.map((index) => {
                            const featured = index === 1;
                            return (
                                <article
                                    key={index}
                                    className={
                                        featured
                                            ? 'on-dark relative overflow-hidden rounded-[2rem] bg-[var(--text)] p-8 text-[var(--bg)]'
                                            : 'relative overflow-hidden rounded-[2rem] border border-[var(--line-strong)] bg-[var(--surface)] p-8'
                                    }
                                >
                                    <h2 className="font-mono text-[1.1rem] uppercase tracking-[0.2em] text-[var(--accent-text)]">
                                        {t(`pages.pricing.plans.${index}.name`)}
                                    </h2>
                                    <p className="mt-6 flex items-baseline gap-2">
                                        <span className="text-[clamp(3.2rem,4vw,4.4rem)] font-extrabold tracking-tight">
                                            {t(`pages.pricing.plans.${index}.price`)}
                                        </span>
                                        <span className={featured ? 'text-[1.3rem] text-white/60' : 'text-[1.3rem] text-[var(--text-faint)]'}>
                                            {t(`pages.pricing.plans.${index}.period`)}
                                        </span>
                                    </p>
                                    <p className={featured ? 'mt-5 text-[1.4rem] leading-[1.65] text-white/70' : 'mt-5 text-[1.4rem] leading-[1.65] text-[var(--text-muted)]'}>
                                        {t(`pages.pricing.plans.${index}.desc`)}
                                    </p>
                                    <Button
                                        asChild
                                        variant={featured ? 'accent' : 'outline'}
                                        size="landing-pill"
                                        className="mt-8 w-full"
                                    >
                                        <Link href="/#beta">{t(`pages.pricing.plans.${index}.cta`)}</Link>
                                    </Button>
                                </article>
                            );
                        })}
                    </div>

                    <p className="mt-6 text-center text-[1.3rem] text-[var(--text-faint)]">
                        {t('pages.pricing.trialNote')}
                    </p>

                    <div className="mt-10 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
                        <h2 className="text-[1.8rem] font-bold tracking-tight text-[var(--text)]">
                            {t('pages.pricing.byokTitle')}
                        </h2>
                        <p className="mt-4 max-w-[64ch] text-[1.5rem] leading-[1.75] text-[var(--text-muted)]">
                            {t('pages.pricing.byok')}
                        </p>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}
```

- [ ] **Step 2: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: PASS; `out/pricing/index.html` istnieje.

- [ ] **Step 3: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat(pages): add pricing page with placeholder prices and draft notice"
```

---

## Task 10: Strona /download

**Files:**
- Create: `src/app/download/page.tsx`

**Interfaces:**
- Consumes: `PageHero`, `PageShell`, `Footer`, `Button`, `lucide-react` (`Download`, `ArrowUpRight`), `t`.
- Produces: route `/download`.

- [ ] **Step 1: Napisz stronę**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/shared/ui/PageHero/PageHero';
import { PageShell } from '@/shared/ui/PageShell/PageShell';
import { Footer } from '@/widgets/Footer/ui/Footer';
import { Button } from '@/shared/ui/lib/Button';
import { t } from '@/shared/i18n';

export const metadata: Metadata = {
    title: 'Download',
    description: 'Download MangaShift for Windows via GitHub Releases. Requirements and version details inside.',
};

const requirements = [0, 1, 2, 3] as const;

export default function DownloadPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="D."
                    page={t('pages.download.page')}
                    rule={t('pages.download.rule')}
                    kicker={t('pages.download.kicker')}
                    titleBefore={t('pages.download.titleBefore')}
                    titleEmphasis={t('pages.download.titleEmphasis')}
                    titleAfter={t('pages.download.titleAfter')}
                    lead={t('pages.download.lead')}
                />

                <PageShell sideLabel={t('pages.download.sideLabel')}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Button asChild variant="accent" size="landing-pill">
                            <a href="https://github.com/MattyMroz" target="_blank" rel="noreferrer">
                                {t('pages.download.ctaPrimary')}
                                <Download aria-hidden="true" />
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="landing-pill">
                            <Link href="/#beta">
                                {t('pages.download.ctaSecondary')}
                                <ArrowUpRight aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>

                    <p className="mt-6 max-w-[60ch] text-[1.4rem] leading-[1.7] text-[var(--text-muted)]">
                        {t('pages.download.availability')}
                    </p>

                    <div className="mt-12 rounded-[2rem] border border-[var(--line-strong)] bg-[var(--surface)] p-8 md:p-10">
                        <h2 className="font-mono text-[1.1rem] uppercase tracking-[0.2em] text-[var(--accent-text)]">
                            {t('pages.download.reqTitle')}
                        </h2>
                        <dl className="mt-6 border-t border-[var(--line)]">
                            {requirements.map((index) => (
                                <div
                                    key={index}
                                    className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] py-4"
                                >
                                    <dt className="font-mono text-[1rem] uppercase tracking-[0.15em] text-[var(--text-faint)]">
                                        {t(`pages.download.requirements.${index}.label`)}
                                    </dt>
                                    <dd className="text-right text-[1.45rem] text-[var(--text)]">
                                        {t(`pages.download.requirements.${index}.value`)}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="mt-10 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
                        <h2 className="text-[1.8rem] font-bold tracking-tight text-[var(--text)]">
                            {t('pages.download.noteTitle')}
                        </h2>
                        <p className="mt-4 max-w-[64ch] text-[1.5rem] leading-[1.75] text-[var(--text-muted)]">
                            {t('pages.download.note')}
                        </p>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}
```

- [ ] **Step 2: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: PASS; `out/download/index.html` istnieje.

- [ ] **Step 3: Commit**

```bash
git add src/app/download/page.tsx
git commit -m "feat(pages): add download page (windows, github releases)"
```

---

## Task 11: Strona /contact

**Files:**
- Create: `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: `PageHero`, `PageShell`, `Footer`, `Button`, `Input` (`@/shared/ui/lib/Input`), `Textarea` (`@/shared/ui/lib/Textarea`), `Label` (`@/shared/ui/lib/Label`), `t`, `useState`.
- Produces: route `/contact`. Front-only form (jak `signin`), `'use client'`.

- [ ] **Step 1: Potwierdź eksporty Input/Textarea/Label**

Run: sprawdź `src/shared/ui/lib/Input.tsx`, `Textarea.tsx`, `Label.tsx` — potwierdź `export { Input }`, `export { Textarea }`, `export { Label }`. (signin używa `Input`/`Label` z lib, więc wzorzec znany.)

- [ ] **Step 2: Napisz stronę**

```tsx
'use client';

import { useState } from 'react';
import { PageHero } from '@/shared/ui/PageHero/PageHero';
import { PageShell } from '@/shared/ui/PageShell/PageShell';
import { Footer } from '@/widgets/Footer/ui/Footer';
import { Button } from '@/shared/ui/lib/Button';
import { Input } from '@/shared/ui/lib/Input';
import { Textarea } from '@/shared/ui/lib/Textarea';
import { Label } from '@/shared/ui/lib/Label';
import { t } from '@/shared/i18n';

const channels = [0, 1, 2] as const;
const fieldClass =
    'rounded-[1.2rem] border-[var(--line)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] focus-visible:border-[var(--accent)] focus-visible:ring-[var(--accent)]/15';

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="C."
                    page={t('pages.contact.page')}
                    rule={t('pages.contact.rule')}
                    kicker={t('pages.contact.kicker')}
                    titleBefore={t('pages.contact.titleBefore')}
                    titleEmphasis={t('pages.contact.titleEmphasis')}
                    titleAfter={t('pages.contact.titleAfter')}
                    lead={t('pages.contact.lead')}
                />

                <PageShell sideLabel={t('pages.contact.sideLabel')}>
                    <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                        <div className="flex flex-col gap-4">
                            {channels.map((index) => (
                                <a
                                    key={index}
                                    href={`mailto:${t(`pages.contact.channels.${index}.email`)}`}
                                    className="group rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--surface)] p-6 transition-colors duration-300 hover:border-[var(--accent)]"
                                >
                                    <p className="font-mono text-[1rem] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                                        {t(`pages.contact.channels.${index}.label`)}
                                    </p>
                                    <p className="mt-2 text-[1.7rem] font-semibold tracking-tight text-[var(--text)]">
                                        {t(`pages.contact.channels.${index}.email`)}
                                    </p>
                                    <p className="mt-2 text-[1.35rem] leading-[1.6] text-[var(--text-muted)]">
                                        {t(`pages.contact.channels.${index}.desc`)}
                                    </p>
                                </a>
                            ))}
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <Label className="font-mono text-[1rem] uppercase tracking-[0.15em] text-[var(--text-faint)]">
                                        {t('pages.contact.formName')}
                                    </Label>
                                    <Input name="name" autoComplete="name" className={fieldClass} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="font-mono text-[1rem] uppercase tracking-[0.15em] text-[var(--text-faint)]">
                                        {t('pages.contact.formEmail')}
                                    </Label>
                                    <Input type="email" name="email" autoComplete="email" className={fieldClass} />
                                </div>
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                <Label className="font-mono text-[1rem] uppercase tracking-[0.15em] text-[var(--text-faint)]">
                                    {t('pages.contact.formTopic')}
                                </Label>
                                <Input name="topic" className={fieldClass} />
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                <Label className="font-mono text-[1rem] uppercase tracking-[0.15em] text-[var(--text-faint)]">
                                    {t('pages.contact.formMessage')}
                                </Label>
                                <Textarea name="message" rows={5} className={fieldClass} />
                            </div>

                            <Button type="submit" variant="accent" size="landing-pill" className="mt-7 w-full">
                                {t('pages.contact.formSubmit')}
                            </Button>

                            <p
                                className="mt-4 min-h-[1.4em] text-center text-[1.3rem]"
                                style={{ color: sent ? 'var(--accent-text)' : 'var(--text-faint)' }}
                                role="status"
                                aria-live="polite"
                            >
                                {t('pages.contact.formNotice')}
                            </p>
                        </form>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}
```

- [ ] **Step 3: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: PASS; `out/contact/index.html` istnieje. Jeśli `Textarea`/`Input` mają inne propsy (np. wymagany `id`), dostosuj minimalnie wg błędu type-check.

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat(pages): add contact page with channels and front-only form"
```

---

## Task 12: Strona /legal (hub)

**Files:**
- Create: `src/app/legal/page.tsx`

**Interfaces:**
- Consumes: `PageHero`, `PageShell`, `DraftNotice`, `Footer`, `Link`, `lucide-react` (`ArrowUpRight`), `t`.
- Produces: route `/legal`.

- [ ] **Step 1: Napisz stronę**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/shared/ui/PageHero/PageHero';
import { PageShell } from '@/shared/ui/PageShell/PageShell';
import { DraftNotice } from '@/shared/ui/DraftNotice/DraftNotice';
import { Footer } from '@/widgets/Footer/ui/Footer';
import { t } from '@/shared/i18n';

export const metadata: Metadata = {
    title: 'Legal',
    description: 'MangaShift legal documents — terms, privacy, cookies, refunds, IP and third-party notices.',
};

const links = [0, 1, 2, 3, 4, 5] as const;

export default function LegalHubPage() {
    return (
        <div className="relative z-10 bg-transparent text-[var(--text)]">
            <main className="relative">
                <PageHero
                    index="L."
                    page={t('pages.legalHub.page')}
                    rule={t('pages.legalHub.rule')}
                    kicker={t('pages.legalHub.kicker')}
                    titleBefore={t('pages.legalHub.titleBefore')}
                    titleEmphasis={t('pages.legalHub.titleEmphasis')}
                    titleAfter={t('pages.legalHub.titleAfter')}
                    lead={t('pages.legalHub.lead')}
                />

                <PageShell sideLabel={t('pages.legalHub.sideLabel')}>
                    <DraftNotice>{t('pages.legalHub.draftNote')}</DraftNotice>

                    <ul className="mt-8 grid gap-4 sm:grid-cols-2 list-none">
                        {links.map((index) => (
                            <li key={index}>
                                <Link
                                    href={t(`pages.legalHub.links.${index}.href`)}
                                    className="group flex items-center justify-between gap-4 rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--surface)] p-7 transition-colors duration-300 hover:border-[var(--accent)]"
                                >
                                    <span>
                                        <span className="block text-[1.9rem] font-semibold tracking-tight text-[var(--text)]">
                                            {t(`pages.legalHub.links.${index}.title`)}
                                        </span>
                                        <span className="mt-1 block text-[1.3rem] text-[var(--text-muted)]">
                                            {t(`pages.legalHub.links.${index}.desc`)}
                                        </span>
                                    </span>
                                    <ArrowUpRight
                                        aria-hidden="true"
                                        className="h-6 w-6 shrink-0 text-[var(--accent-text)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}
```

- [ ] **Step 2: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: PASS; `out/legal/index.html` istnieje.

- [ ] **Step 3: Commit**

```bash
git add src/app/legal/page.tsx
git commit -m "feat(pages): add legal hub page"
```

---

## Task 13: Strona /legal/terms (WZÓR dla wszystkich stron legal)

Ta strona jest **kanonicznym wzorem**: zadania 14–18 powtarzają dokładnie ten kształt, zmieniając tylko treść (1:1 z odpowiedniego pliku `.md`), `index`, `page`, tytuł i `metadata`. Każda strona legal: `PageHero` → `PageShell` → `DraftNotice` → ciąg `LegalSection` z `LegalP`/`LegalList`/`LegalTable` → `Footer`.

**Files:**
- Create: `src/app/legal/terms/page.tsx`

**Źródło treści (1:1):** `01_REGULAMIN.md`. Przepisz **wszystkie** sekcje 1-19 dosłownie. Znaczniki `[[DO_POTWIERDZENIA: ...]]` zostają w tekście jako zwykły string. Polskie znaki — tylko Edit/Write (nie PowerShell).

**Interfaces:**
- Consumes: `PageHero`, `PageShell`, `DraftNotice`, `LegalSection`/`LegalP`/`LegalList` (`@/shared/ui/LegalSection/LegalSection`), `Footer`, `Metadata`.
- Produces: route `/legal/terms`.

- [ ] **Step 1: Napisz stronę (pełny szkielet + pierwsze 3 sekcje jako wzór; kontynuuj 1:1 do sekcji 19)**

```tsx
import type { Metadata } from 'next';
import { PageHero } from '@/shared/ui/PageHero/PageHero';
import { PageShell } from '@/shared/ui/PageShell/PageShell';
import { DraftNotice } from '@/shared/ui/DraftNotice/DraftNotice';
import { LegalSection, LegalP, LegalList } from '@/shared/ui/LegalSection/LegalSection';
import { Footer } from '@/widgets/Footer/ui/Footer';

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
                                    <><strong>BYOK</strong> — „Bring Your Own Key", czyli model, w którym Użytkownik korzysta z własnego klucza API lub własnego konta u Dostawcy Zewnętrznego.</>,
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
                                        <LegalList items={['lokalny czytnik komiksów;', 'odtwarzacz audio i wideo;', 'OCR;', 'tłumaczenie;', 'syntezę mowy;', 'upscaling;', 'czyszczenie dymków i inpainting;', 'detekcję obiektów;', 'animacje kadrów;', 'montaż;', 'eksport audio, wideo lub motion comic;', 'przetwarzanie wsadowe, jeżeli dana wersja Aplikacji to obsługuje.']} className="mt-3" />
                                    </>,
                                    'MangaShift nie jest biblioteką komiksów, serwisem pirackim, marketplace\'em treści, hostingiem plików ani narzędziem do obchodzenia praw autorskich.',
                                    'Operator nie dostarcza Użytkownikowi komiksów ani licencji do cudzych utworów.',
                                    'Aplikacja może korzystać z modeli lokalnych lub zewnętrznych integracji BYOK, jeżeli Użytkownik sam je skonfiguruje.',
                                ]}
                            />
                        </LegalSection>

                        {/* KONTYNUUJ sekcje 4-19 z 01_REGULAMIN.md w tym samym wzorcu:
                            4. Warunki techniczne (LegalList ordered; ppkt 4 ma zagnieżdżoną LegalList)
                            5. Konto i logowanie
                            6. Licencja na Aplikację
                            7. Prawa do Materiałów Użytkownika
                            8. Wyniki, AI i jakość rezultatów
                            9. BYOK i Dostawcy Zewnętrzni
                            10. Plany, Trial i płatności (ppkt 6 ma zagnieżdżoną listę)
                            11. Odstąpienie, reklamacje i zwroty
                            12. Brak hostingu treści Użytkownika
                            13. Zakazane sposoby korzystania (lista numerowana)
                            14. Aktualizacje, zmiany i dostępność
                            15. Support
                            16. Odpowiedzialność (ppkt 3 ma zagnieżdżoną listę)
                            17. Indemnizacja B2B
                            18. Zmiany Regulaminu
                            19. Prawo właściwe i spory
                            Zachowaj polskie znaki i znaczniki [[...]] dosłownie. */}
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}
```

- [ ] **Step 2: Uzupełnij sekcje 4-19**

Przepisz pozostałe sekcje 1:1 z `01_REGULAMIN.md`, używając `LegalSection` + `LegalList ordered` dla numerowanych podpunktów i zagnieżdżonego `LegalList` (bez `ordered`) dla list wypunktowanych w obrębie punktu. Treść dosłowna, z polskimi znakami i znacznikami `[[...]]`.

- [ ] **Step 3: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: PASS; `out/legal/terms/index.html` istnieje.

- [ ] **Step 4: Weryfikacja polskich znaków**

Otwórz `src/app/legal/terms/page.tsx` i sprawdź wzrokowo, że znaki ą/ć/ę/ł/ó/ż/ź są poprawne (nie mojibake). Sprawdź, że znaczniki `[[DO_POTWIERDZENIA: ...]]` są obecne w tekście.

- [ ] **Step 5: Commit**

```bash
git add src/app/legal/terms/page.tsx
git commit -m "feat(legal): add terms page (regulamin v3 draft, pl 1:1)"
```

---

## Task 14: Strona /legal/privacy

**Files:**
- Create: `src/app/legal/privacy/page.tsx`

**Źródło (1:1):** `02_POLITYKA_PRYWATNOSCI.md`, sekcje 1-13. Sekcja 8 („Retencja") to tabela → użyj `LegalTable` (`head`: `['Kategoria danych', 'Okres']`, `rows`: pary z pliku).

**Interfaces:**
- Consumes: jak Task 13 + `LegalTable`.
- Produces: route `/legal/privacy`.

- [ ] **Step 1: Napisz stronę wg wzoru z Task 13**

`PageHero` props: `index="L2."`, `page="02 / 06"`, `rule="MangaShift / prywatność / 2026"`, `kicker="Dokument prawny"`, `titleBefore="Polityka"`, `titleEmphasis="prywatności"`, `titleAfter="."`, `lead="Wersja: V3 draft. Data: [[DO_POTWIERDZENIA: data publikacji]]. Status: dokument do weryfikacji przez prawniczkę przed publikacją."`. `metadata.title = 'Polityka prywatności'`.

Sekcje 1-13 z `02_POLITYKA_PRYWATNOSCI.md` jako `LegalSection`. Sekcja 8 jako `LegalTable`:
```tsx
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
```

- [ ] **Step 2: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: PASS; `out/legal/privacy/index.html` istnieje.

- [ ] **Step 3: Commit**

```bash
git add src/app/legal/privacy/page.tsx
git commit -m "feat(legal): add privacy policy page (pl 1:1)"
```

---

## Task 15: Strona /legal/cookies

**Files:**
- Create: `src/app/legal/cookies/page.tsx`

**Źródło (1:1):** `03_POLITYKA_COOKIES.md`, sekcje 1-6. Sekcja 2 to tabela → `LegalTable` (`head`: `['Kategoria', 'Przykłady', 'Czy wymaga zgody']`).

**Interfaces:** jak Task 14. Produces: route `/legal/cookies`.

- [ ] **Step 1: Napisz stronę wg wzoru**

`PageHero`: `index="L3."`, `page="03 / 06"`, `rule="MangaShift / cookies / 2026"`, `kicker="Dokument prawny"`, `titleBefore="Polityka"`, `titleEmphasis="cookies"`, `titleAfter="."`, `lead="Wersja: V3 draft. Data: [[DO_POTWIERDZENIA: data publikacji]]."`. `metadata.title = 'Polityka cookies'`.

Sekcja 2 jako `LegalTable`:
```tsx
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
```
Sekcje 1, 3, 4 (z `[[DO_POTWIERDZENIA: link do panelu preferencji cookies]]`), 5, 6 jako `LegalSection`+`LegalP`/`LegalList`.

- [ ] **Step 2: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: PASS; `out/legal/cookies/index.html` istnieje.

- [ ] **Step 3: Commit**

```bash
git add src/app/legal/cookies/page.tsx
git commit -m "feat(legal): add cookies policy page (pl 1:1)"
```

---

## Task 16: Strona /legal/refunds

**Files:**
- Create: `src/app/legal/refunds/page.tsx`

**Źródło (1:1):** `04_ODSTAPIENIE_REKLAMACJE_ZWROTY.md`, sekcje 1-9. Sekcja 5 („Wzór odstąpienia") to blok tekstowy w ``` ``` → renderuj jako `<pre>` w stylu mono.

**Interfaces:** jak Task 13. Produces: route `/legal/refunds`.

- [ ] **Step 1: Napisz stronę wg wzoru**

`PageHero`: `index="L4."`, `page="04 / 06"`, `rule="MangaShift / zwroty / 2026"`, `kicker="Dokument prawny"`, `titleBefore="Odstąpienie, reklamacje i"`, `titleEmphasis="zwroty"`, `titleAfter="."`, `lead="Wersja: V3 draft. Data: [[DO_POTWIERDZENIA: data publikacji]]."`. `metadata.title = 'Odstąpienie, reklamacje i zwroty'`.

Sekcja 5 (wzór) jako blok preformatowany:
```tsx
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
```
Pozostałe sekcje 1-4, 6-9 jako `LegalSection` (zachowaj znaczniki `[[DO_POTWIERDZENIA: ...]]` i `[[DO PRAWNICZKI: ...]]`).

- [ ] **Step 2: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: PASS; `out/legal/refunds/index.html` istnieje.

- [ ] **Step 3: Commit**

```bash
git add src/app/legal/refunds/page.tsx
git commit -m "feat(legal): add refunds page (pl 1:1)"
```

---

## Task 17: Strona /legal/ip

**Files:**
- Create: `src/app/legal/ip/page.tsx`

**Źródło (1:1):** `05_ZGLOSZENIA_NARUSZEN_IP.md`, sekcje 1-7 (zachowaj `[[DO PRAWNICZKI: ...]]` w sekcji 5).

**Interfaces:** jak Task 13. Produces: route `/legal/ip`.

- [ ] **Step 1: Napisz stronę wg wzoru**

`PageHero`: `index="L5."`, `page="05 / 06"`, `rule="MangaShift / naruszenia IP / 2026"`, `kicker="Dokument prawny"`, `titleBefore="Zgłoszenia naruszeń"`, `titleEmphasis="IP"`, `titleAfter="."`, `lead="Wersja: V3 draft. Data: [[DO_POTWIERDZENIA: data publikacji]]."`. `metadata.title = 'Zgłoszenia naruszeń IP'`. Sekcje 1-7 jako `LegalSection`+`LegalP`/`LegalList`.

- [ ] **Step 2: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: PASS; `out/legal/ip/index.html` istnieje.

- [ ] **Step 3: Commit**

```bash
git add src/app/legal/ip/page.tsx
git commit -m "feat(legal): add ip notices page (pl 1:1)"
```

---

## Task 18: Strona /legal/third-party-notices

**Files:**
- Create: `src/app/legal/third-party-notices/page.tsx`

**Źródło (1:1):** `06_THIRD_PARTY_NOTICES_SZABLON.md`, sekcje 1-4. Sekcja 2 i 3 to tabele → `LegalTable`. Zachowaj znaczniki `[[TAK/NIE]]`, `[[link]]`, `[[licencja]]` dosłownie.

**Interfaces:** jak Task 14 (+`LegalTable`). Produces: route `/legal/third-party-notices`.

- [ ] **Step 1: Napisz stronę wg wzoru**

`PageHero`: `index="L6."`, `page="06 / 06"`, `rule="MangaShift / third-party / 2026"`, `kicker="Dokument prawny"`, `titleBefore="Third-party"`, `titleEmphasis="notices"`, `titleAfter="."`, `lead="Wersja: V3 draft. Status: szablon. Wypełnić dla konkretnego publicznego release'u."`. `metadata.title = 'Third-party notices'`.

Sekcja 2 jako `LegalTable` (`head`: `['Komponent', 'Typ', 'Czy w paczce', 'Licencja/warunki', 'Źródło', 'Uwagi']`, wiersze 1:1 z pliku ze znacznikami `[[...]]`). Sekcja 3 analogicznie (`head`: `['Dostawca', 'Funkcja', 'Czy aktywny w UI', 'Dane wysyłane', 'Kto podaje klucz', 'Uwagi']`). Sekcje 1 i 4 jako `LegalSection`+`LegalP`/`LegalList`.

- [ ] **Step 2: type-check + lint + build**

Run: `bun run type-check && bun run lint && bun run build`
Expected: PASS; `out/legal/third-party-notices/index.html` istnieje.

- [ ] **Step 3: Commit**

```bash
git add src/app/legal/third-party-notices/page.tsx
git commit -m "feat(legal): add third-party notices page (pl 1:1)"
```

---

## Task 19: Finalna weryfikacja całości

**Files:** brak (weryfikacja).

- [ ] **Step 1: Pełny build i przegląd tras**

Run: `bun run type-check && bun run lint && bun run build`
Expected: wszystkie PASS. W `out/` istnieją: `features/`, `pricing/`, `download/`, `contact/`, `legal/`, `legal/terms/`, `legal/privacy/`, `legal/cookies/`, `legal/refunds/`, `legal/ip/`, `legal/third-party-notices/` (każdy z `index.html`) + `favicon.ico` w roocie.

- [ ] **Step 2: Dev smoke test**

Run: `bun run dev`, otwórz `/`, `/features`, `/pricing`, `/download`, `/contact`, `/legal` i jedną stronę legal. Sprawdź: header widoczny (nie chowa się), anchory w headerze z podstrony prowadzą do `/#sekcja`, stopka ma kolumnę „Pages", legal pokazuje baner draftu + treść PL ze znacznikami `[[...]]`. Brak ⚠ cross-origin w logu, brak 404 faviconu.

- [ ] **Step 3: Commit (jeśli były poprawki)**

```bash
git add -A
git commit -m "chore: verify subpages build and navigation"
```

---

## Self-Review (wypełnione przy pisaniu planu)

**Spec coverage:**
- Fixy dev (allowedDevOrigins, favicon) → Task 1 ✅
- 4 komponenty współdzielone → Tasks 2-5 ✅
- i18n marketing → Task 6 ✅
- Nawigacja (Footer + Header) → Task 7 ✅
- /features, /pricing, /download, /contact → Tasks 8-11 ✅
- /legal hub → Task 12 ✅
- 6 stron legal PL 1:1 → Tasks 13-18 ✅
- DraftNotice na legal + zachowanie `[[...]]` → Tasks 13-18 ✅
- Operator + maile → Task 13 (terms) ✅
- Weryfikacja → Task 19 ✅

**Placeholder scan:** Tasks 13-18 odsyłają do plików `.md` jako źródła 1:1 — to NIE placeholder (źródło jest dosłowne, kompletne i wskazane co do sekcji; wzorzec kodu pełny w Task 13). Pełne przepisywanie 1200 linii treści do planu byłoby duplikacją żywego źródła (DRY).

**Type consistency:** `PageHero` props spójne we wszystkich stronach; `LegalSection`/`LegalP`/`LegalList`/`LegalTable` sygnatury z Task 5 użyte spójnie; `pageLinks` kształt `{href,label}` w Footer, `{name,href}` w Header (różne, bo różne renderery — świadome).

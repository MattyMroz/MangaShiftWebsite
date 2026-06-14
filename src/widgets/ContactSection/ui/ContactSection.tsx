'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { SecRule } from '@/shared/ui/SecRule/SecRule';
import { cn } from '@/shared/lib/utils/cn';

// ── Google Forms ──────────────────────────────────────────────────────────────
// Maile lądują w arkuszu Google Sheets podpiętym do formularza. Darmowe, bez limitu.
// LOGIKA NIENARUSZALNA — przepisany jest TYLKO wygląd.
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScyTs1gTH1kmVC8EHkB_pdPsdrWwEtGIwLvQYu4StRfSkVYpA/formResponse';
const GOOGLE_FORM_EMAIL_ENTRY = 'entry.1654989478';
const GOOGLE_FORM_CONSENT_ENTRY = 'entry.980875902';
const GOOGLE_FORM_CONSENT_VALUE = 'Yes, I agree';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const SEATS = [
    { label: 'Pages in', value: 'Static manga' },
    { label: 'Pages out', value: 'Narrated video' },
    { label: 'Cohort', value: 'Founding 200' },
];

const ROADMAP = [
    { tag: 'NOW', text: 'Panel detection & reading-order parsing' },
    { tag: 'NEXT', text: 'AI narration, voices & paced motion' },
    { tag: 'SOON', text: 'Export to 1080p / vertical / subtitles' },
];

// Narożne wsporniki — drukarski detal kadru (atelier-zero).
const Corners = () => (
    <>
        <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[var(--line-strong)]" />
        <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[var(--line-strong)]" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[var(--line-strong)]" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[var(--line-strong)]" />
    </>
);

export const BetaSection = () => {
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState<SubmitState>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === 'submitting') return;

        const form = e.currentTarget;
        // Honeypot — jeśli ukryte pole zostało wypełnione, to bot.
        if ((form.elements.namedItem('company') as HTMLInputElement)?.value) return;

        setStatus('submitting');
        try {
            const body = new URLSearchParams({
                [GOOGLE_FORM_EMAIL_ENTRY]: email,
                [GOOGLE_FORM_CONSENT_ENTRY]: GOOGLE_FORM_CONSENT_VALUE,
            });
            // Google Forms zwraca opaque response (no-cors) — brak wyjątku traktujemy jako sukces.
            await fetch(GOOGLE_FORM_ACTION, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body,
            });
            setStatus('success');
            setEmail('');
            setConsent(false);
        } catch {
            setStatus('error');
        }
    };

    const isLocked = status === 'submitting' || status === 'success';

    return (
        <section
            id="beta"
            className="relative py-[clamp(10rem,16vw,13rem)] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            {/* Side-rails: pionowe znaczniki na krawędziach kolumny (magazyn) */}
            <span
                aria-hidden
                className="absolute left-[var(--section-padding-x-mobile)] top-[clamp(10rem,16vw,13rem)] hidden font-mono text-[10.5px] uppercase tracking-[0.32em] text-[var(--text-faint)] [writing-mode:vertical-rl] lg:block"
            >
                MangaShift — Beta Program
            </span>
            <span
                aria-hidden
                className="absolute right-[var(--section-padding-x-mobile)] top-[clamp(10rem,16vw,13rem)] hidden rotate-180 font-mono text-[10.5px] uppercase tracking-[0.32em] text-[var(--text-faint)] [writing-mode:vertical-rl] lg:block"
            >
                51.1079° N · 17.0385° E
            </span>

            <div className="relative z-10 mx-auto max-w-[88rem]">
                <SecRule roman="VII." meta="Beta · Founding cohort" page="008 / 008" />

                {/* ── Stamp + eyebrow ─────────────────────────────────────────── */}
                <motion.div
                    className="mt-12 flex flex-col items-center gap-6 text-center"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                        </span>
                        Live · v0.1 beta
                    </span>

                    <div className="flex items-center gap-4">
                        <span className="h-px w-10 bg-[var(--accent)]" />
                        <span className="eyebrow">Nº 008 — Request access</span>
                        <span className="h-px w-10 bg-[var(--accent)]" />
                    </div>
                </motion.div>

                {/* ── Mega-słowo / nagłówek ───────────────────────────────────── */}
                <motion.h2
                    className="mx-auto mt-8 max-w-[16ch] text-center text-[clamp(3.6rem,7.2vw,8.2rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-[var(--text)]"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85 }}
                >
                    Be the first to try <em className="text-[var(--accent-text)]">MangaShift</em>.
                </motion.h2>

                <motion.p
                    className="mx-auto mt-8 max-w-[54ch] text-center text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)]"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    We turn static manga and manhwa pages into fully narrated video — panels read in order,
                    paced, voiced. Join the founding cohort and shape the pipeline before public launch.
                </motion.p>

                {/* ── Kolaż: manga → wideo (kadr + strip) ─────────────────────── */}
                <motion.figure
                    className="relative mx-auto mt-16 grid max-w-[68rem] grid-cols-1 items-stretch gap-4 sm:grid-cols-[1.15fr_auto_1fr]"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, delay: 0.15 }}
                >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)]">
                        <Image
                            src="/images/chainsawman/RezeArc.webp"
                            alt="Source manga page — static panels"
                            fill
                            sizes="(max-width: 640px) 100vw, 420px"
                            className="object-cover"
                        />
                        <Corners />
                        <figcaption className="absolute bottom-3 left-3 rounded-full bg-[var(--bg-alpha)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] backdrop-blur-sm">
                            In — Fig. 01 · static
                        </figcaption>
                    </div>

                    {/* Łącznik z kierunkiem przepływu */}
                    <div className="flex items-center justify-center sm:flex-col sm:gap-3">
                        <span className="hidden h-px w-12 bg-[var(--line-strong)] sm:block" />
                        <span className="serif text-[2.4rem] leading-none text-[var(--accent-text)] sm:rotate-90">
                            →
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
                            render
                        </span>
                    </div>

                    <div className="relative grid aspect-[4/5] grid-rows-2 gap-4">
                        {(['/images/inspiration/work-1.png', '/images/inspiration/work-2.png'] as const).map((src, i) => (
                            <div
                                key={src}
                                className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)]"
                            >
                                <Image
                                    src={src}
                                    alt={`Rendered video frame ${i + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 320px"
                                    className="object-cover"
                                />
                                <Corners />
                            </div>
                        ))}
                        <figcaption className="absolute bottom-3 right-3 rounded-full bg-[var(--bg-alpha)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] backdrop-blur-sm">
                            Out — Fig. 02 · 24 fps
                        </figcaption>
                    </div>
                </motion.figure>

                {/* ── Karta signup ────────────────────────────────────────────── */}
                <motion.div
                    className="relative mx-auto mt-16 max-w-[58rem] rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-[clamp(2rem,4vw,3.6rem)] shadow-[var(--shadow-md)]"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.85, delay: 0.2 }}
                >
                    {/* Ribbon w rogu karty */}
                    <span className="absolute -top-3 right-8 rounded-full border border-[var(--accent)] bg-[var(--bg)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                        Free during beta
                    </span>

                    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-4">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                            Nº 008 / Application
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                            <em className="serif not-italic text-[var(--accent-text)]">VII.</em> Beta
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                        {/* Honeypot — ukryte przed ludźmi, łapie boty */}
                        <input
                            type="text"
                            name="company"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="pointer-events-none absolute h-0 w-0 opacity-0"
                        />

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                                    @
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLocked}
                                    placeholder="you@studio.com"
                                    aria-label="Email address"
                                    className="w-full rounded-full border border-[var(--line)] bg-[var(--bg)] py-4 pl-11 pr-6 text-[length:var(--normal-font-size)] text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] disabled:opacity-60"
                                />
                            </div>
                            <Button type="submit" variant="hero" size="md" disabled={isLocked}>
                                {status === 'submitting'
                                    ? 'Sending…'
                                    : status === 'success'
                                        ? 'You’re in ✓'
                                        : 'Request access'}
                            </Button>
                        </div>

                        <label className="flex cursor-pointer items-start gap-3 text-left">
                            <input
                                type="checkbox"
                                name="consent"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                required
                                disabled={isLocked}
                                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--accent)] disabled:opacity-60"
                            />
                            <span className="text-[length:var(--small-font-size)] leading-snug text-[var(--text-muted)]">
                                I agree to receive beta updates about MangaShift and accept the privacy policy.
                                No spam — we email only when the pipeline ships something worth watching.
                            </span>
                        </label>

                        <p
                            className="min-h-[1.5em] text-center text-[length:var(--small-font-size)]"
                            style={{ color: status === 'error' ? 'var(--accent-text)' : 'var(--text-faint)' }}
                            role="status"
                            aria-live="polite"
                        >
                            {status === 'success' &&
                                'Welcome aboard — check your inbox, your founding-cohort seat is reserved.'}
                            {status === 'error' &&
                                'Something went wrong. Please try again in a moment.'}
                            {status === 'idle' &&
                                'Founding cohort · limited to 200 seats · no credit card.'}
                        </p>
                    </form>

                    {/* Współrzędne / stopka karty */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
                        <span>Wrocław · PL</span>
                        <span className="tabular-nums">51.1079° N · 17.0385° E</span>
                        <span>Rev. 0.1 — 2026</span>
                    </div>
                </motion.div>

                {/* ── Specyfikacja: in/out + roadmap ──────────────────────────── */}
                <motion.dl
                    className="mx-auto mt-12 grid max-w-[58rem] grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                >
                    {SEATS.map((s, i) => (
                        <div key={s.label} className="bg-[var(--bg)] px-6 py-5">
                            <dt className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                                <span className="tabular-nums text-[var(--accent-text)]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                {s.label}
                            </dt>
                            <dd className="mt-2 text-[length:var(--normal-font-size)] font-medium text-[var(--text)]">
                                {s.value}
                            </dd>
                        </div>
                    ))}
                </motion.dl>

                <motion.ul
                    className="mx-auto mt-6 flex max-w-[58rem] flex-col gap-3 sm:flex-row sm:items-stretch"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {ROADMAP.map((r) => (
                        <li
                            key={r.tag}
                            className={cn(
                                'flex flex-1 items-start gap-3 rounded-[var(--radius-md)] border border-[var(--line)]',
                                'bg-[var(--surface)] px-5 py-4',
                            )}
                        >
                            <span className="mt-0.5 shrink-0 rounded-full border border-[var(--accent)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-text)]">
                                {r.tag}
                            </span>
                            <span className="text-[length:var(--small-font-size)] leading-snug text-[var(--text-muted)]">
                                {r.text}
                            </span>
                        </li>
                    ))}
                </motion.ul>

                {/* ── Stopka sekcji ───────────────────────────────────────────── */}
                <div className="mx-auto mt-16 flex max-w-[58rem] items-center justify-between gap-4 border-t border-[var(--line)] pt-5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                    <span><em className="serif not-italic text-[var(--accent-text)]">VII.</em> — Beta</span>
                    <span className="hidden sm:block">Static manga → narrated video</span>
                    <span className="tabular-nums">008 / 008</span>
                </div>
            </div>
        </section>
    );
};

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { t } from '@/shared/i18n';

// ── Google Forms ──────────────────────────────────────────────────────────────
// Maile lądują w arkuszu Google Sheets podpiętym do formularza. Darmowe, bez limitu.
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScyTs1gTH1kmVC8EHkB_pdPsdrWwEtGIwLvQYu4StRfSkVYpA/formResponse';
const GOOGLE_FORM_EMAIL_ENTRY = 'entry.1654989478';
// Zgoda RODO — formularz wymaga jej do przyjęcia wpisu; user akceptuje przez nasz checkbox.
const GOOGLE_FORM_CONSENT_ENTRY = 'entry.980875902';
const GOOGLE_FORM_CONSENT_VALUE = 'Yes, I agree';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export const ContactSection = () => {
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
            className="relative py-[12rem] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            <div className="relative z-10 max-w-[72rem] mx-auto flex flex-col items-center text-center">
                <div className="flex items-center gap-4">
                    <span className="h-px w-10 bg-[var(--accent)]" />
                    <span className="eyebrow">{t('beta.eyebrow')}</span>
                </div>

                <motion.h2
                    className="mt-8 max-w-[18ch] text-[clamp(3.2rem,5vw,6rem)] font-extrabold text-[var(--text)] tracking-tight leading-[1.05]"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8 }}
                >
                    {t('beta.title')}
                </motion.h2>

                <p className="mt-8 max-w-[52ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)]">
                    {t('beta.lead')}
                </p>

                <form onSubmit={handleSubmit} className="mt-12 w-full max-w-[48rem] flex flex-col gap-6 items-center">
                    {/* Honeypot — ukryte przed ludźmi, łapie boty */}
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
                        className="absolute w-0 h-0 opacity-0 pointer-events-none" />

                    <div className="w-full flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLocked}
                            placeholder={t('beta.emailPlaceholder')}
                            aria-label={t('beta.emailLabel')}
                            className="flex-1 px-6 py-4 rounded-full bg-[var(--surface)] border border-[var(--line)] text-[length:var(--normal-font-size)] text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-60"
                        />
                        <Button type="submit" variant="hero" size="md" disabled={isLocked}>
                            {status === 'submitting' ? t('beta.submitting') : status === 'success' ? t('beta.success') : t('beta.submit')}
                        </Button>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer text-left">
                        <input
                            type="checkbox"
                            name="consent"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            required
                            disabled={isLocked}
                            className="mt-1 shrink-0 w-4 h-4 accent-[var(--accent)] cursor-pointer disabled:opacity-60"
                        />
                        <span className="text-[length:var(--small-font-size)] text-[var(--text-muted)] leading-snug">
                            {t('beta.consent')}
                        </span>
                    </label>

                    <p
                        className="text-[length:var(--small-font-size)] min-h-[1.5em]"
                        style={{ color: status === 'error' ? '#c8372d' : 'var(--text-faint)' }}
                        role="status"
                        aria-live="polite"
                    >
                        {status === 'success' && t('beta.successMessage')}
                        {status === 'error' && t('beta.errorMessage')}
                    </p>
                </form>
            </div>
        </section>
    );
};

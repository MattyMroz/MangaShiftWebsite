'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { Container } from '@/shared/ui/Container/Container';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';

const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScyTs1gTH1kmVC8EHkB_pdPsdrWwEtGIwLvQYu4StRfSkVYpA/formResponse';
const GOOGLE_FORM_EMAIL_ENTRY = 'entry.1654989478';
const GOOGLE_FORM_CONSENT_ENTRY = 'entry.980875902';
const GOOGLE_FORM_CONSENT_VALUE = 'Yes, I agree';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export const BetaSection = () => {
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState<SubmitState>('idle');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (status === 'submitting') return;

        const form = event.currentTarget;
        if ((form.elements.namedItem('company') as HTMLInputElement)?.value) return;

        setStatus('submitting');
        try {
            const body = new URLSearchParams({
                [GOOGLE_FORM_EMAIL_ENTRY]: email,
                [GOOGLE_FORM_CONSENT_ENTRY]: GOOGLE_FORM_CONSENT_VALUE,
            });
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

    const locked = status === 'submitting' || status === 'success';

    return (
        <section id="beta" className="section-shell relative border-t border-[var(--line-strong)] bg-[var(--surface)]">
            <SideLabel side="right">Nº 09 — Private beta</SideLabel>
            <Container>
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                    <motion.div
                        className="lg:col-span-6"
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.72 }}
                    >
                        <p className="section-kicker">Private beta</p>
                        <h2 className="display mt-7 max-w-[10ch] text-[clamp(4.6rem,6.6vw,8.2rem)]">
                            Your manga could be{' '}
                            <em className="text-[var(--accent-text)]">next</em>.
                        </h2>
                        <p className="mt-8 max-w-[52ch] text-[1.7rem] leading-[1.7] text-[var(--text-muted)]">
                            Leave your email to receive a beta invitation. You will hear from us
                            when there is a real build to test, not another generic newsletter.
                        </p>

                        <ul className="mt-9 flex flex-wrap gap-3">
                            {['Free during beta', 'No credit card', 'Early product access'].map((item) => (
                                <li
                                    key={item}
                                    className="rounded-full border border-[var(--line-strong)] px-4 py-2 font-mono text-[1rem] uppercase tracking-[0.14em] text-[var(--text-muted)]"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="relative rounded-[2.6rem] border border-[var(--line-strong)] bg-[var(--bg)] p-6 shadow-[var(--shadow-md)] sm:p-8 lg:col-span-6 lg:p-10"
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
                            <div>
                                <p className="font-mono text-[1rem] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                                    Request access
                                </p>
                                <p className="mt-2 text-[2.2rem] font-bold tracking-tight text-[var(--text)]">
                                    Join the MangaShift list
                                </p>
                            </div>
                            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)] text-white">
                                ↗
                            </span>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-7">
                            <input
                                type="text"
                                name="company"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className="pointer-events-none absolute h-0 w-0 opacity-0"
                            />

                            <label htmlFor="beta-email" className="font-mono text-[1rem] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                                Email address
                            </label>
                            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                                <input
                                    id="beta-email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    disabled={locked}
                                    placeholder="you@studio.com"
                                    className="min-h-12 flex-1 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] px-5 text-[1.5rem] text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 disabled:opacity-60"
                                />
                                <Button type="submit" variant="hero" size="md" disabled={locked}>
                                    {status === 'submitting'
                                        ? 'Sending…'
                                        : status === 'success'
                                            ? 'You’re on the list'
                                            : 'Join beta'}
                                </Button>
                            </div>

                            <label className="mt-5 flex cursor-pointer items-center gap-3">
                                <span className="relative grid h-6 w-6 shrink-0 place-items-center">
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        checked={consent}
                                        onChange={(event) => setConsent(event.target.checked)}
                                        required
                                        disabled={locked}
                                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] transition-colors duration-200 checked:border-[var(--accent)] checked:bg-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] disabled:opacity-50"
                                    />
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="pointer-events-none absolute h-3.5 w-3.5 scale-0 text-white opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                </span>
                                <span className="text-[1.3rem] leading-[1.55] text-[var(--text-muted)]">
                                    I agree to receive email about MangaShift beta access and product updates.
                                </span>
                            </label>

                            <p
                                className="mt-5 min-h-8 border-t border-[var(--line)] pt-5 text-[1.35rem] text-[var(--text-faint)]"
                                role="status"
                                aria-live="polite"
                            >
                                {status === 'success' && 'Thanks. Your beta request has been recorded.'}
                                {status === 'error' && 'The request could not be sent. Please try again.'}
                                {status === 'idle' && 'Only useful product emails. Unsubscribe whenever you want.'}
                            </p>
                        </form>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

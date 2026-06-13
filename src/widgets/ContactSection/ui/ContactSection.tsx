'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/shared/ui/Section/Section';
import { SmartText } from '@/shared/ui/SmartText/SmartText';
import { Button } from '@/shared/ui/Button/Button';
import GlassSurface from '@/shared/ui/GlassSurface/GlassSurface';

// ── Google Forms ──────────────────────────────────────────────────────────────
// Maile lądują w arkuszu Google Sheets podpiętym do formularza. Darmowe, bez limitu.
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScyTs1gTH1kmVC8EHkB_pdPsdrWwEtGIwLvQYu4StRfSkVYpA/formResponse';
const GOOGLE_FORM_EMAIL_ENTRY = 'entry.1654989478';
// Zgoda RODO — formularz wymaga jej do przyjęcia wpisu; user akceptuje przez nasz checkbox.
const GOOGLE_FORM_CONSENT_ENTRY = 'entry.980875902';
const GOOGLE_FORM_CONSENT_VALUE = 'Yes, I agree';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const contactMethods = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
        title: 'GitHub',
        value: 'github.com/MattyMroz',
        href: 'https://github.com/MattyMroz'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
        title: 'LinkedIn',
        value: 'linkedin.com/in/mattymroz',
        href: 'https://www.linkedin.com/in/mattymroz/'
    }
];

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
        <Section id="contact" title="Join the Beta" gridCols={1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--section-gap-horizontal)] items-center w-full">

                {/* Beta signup column */}
                <motion.div
                    className="order-1 w-full flex flex-col items-center lg:items-start gap-[var(--section-gap-vertical)] text-center lg:text-left px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:pl-[var(--section-padding-x-desktop-sm)] lg:pr-[var(--section-padding-x-tablet)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h3
                        className="text-[length:var(--h1-font-size)] font-bold text-[var(--text-primary)] leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Be the first to try MangaShift
                    </motion.h3>

                    <motion.div
                        className="flex flex-col gap-[var(--card-gap)] max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <SmartText>
                            <p className="text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-primary)] opacity-90">
                                MangaShift turns static manga into immersive videos with AI narration.
                                <br /><br />
                                Leave your email to join the private beta — we&apos;ll reach out the moment it&apos;s ready. No spam, just the invite.
                            </p>
                        </SmartText>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md flex flex-col gap-[var(--card-gap)] items-center lg:items-start"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        {/* Honeypot — ukryte przed ludźmi, łapie boty */}
                        <input
                            type="text"
                            name="company"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="absolute w-0 h-0 opacity-0 pointer-events-none"
                        />

                        <GlassSurface
                            width="100%"
                            height="auto"
                            borderRadius={50}
                            borderWidth={0.07}
                            brightness={50}
                            opacity={0.5}
                            blur={11}
                            displace={0.5}
                            backgroundOpacity={0.05}
                            saturation={1}
                            distortionScale={-180}
                            redOffset={0}
                            greenOffset={10}
                            blueOffset={20}
                            mixBlendMode="lighten"
                            className="w-full px-6 py-3"
                        >
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLocked}
                                placeholder="you@example.com"
                                aria-label="Email address"
                                className="w-full bg-transparent outline-none text-[length:var(--normal-font-size)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] disabled:opacity-60"
                            />
                        </GlassSurface>

                        <label className="flex items-start gap-3 cursor-pointer text-left max-w-md">
                            <input
                                type="checkbox"
                                name="consent"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                required
                                disabled={isLocked}
                                className="mt-1 shrink-0 w-4 h-4 accent-[var(--text-primary)] cursor-pointer disabled:opacity-60"
                            />
                            <SmartText>
                                <span className="text-[length:var(--normal-font-size)] text-[var(--text-secondary)] leading-snug">
                                    I agree to be contacted by email about the beta test.
                                </span>
                            </SmartText>
                        </label>

                        <Button type="submit" variant="primary" disabled={isLocked}>
                            {status === 'submitting' ? 'Joining…' : status === 'success' ? 'You’re in!' : 'Join the Beta'}
                        </Button>

                        <SmartText>
                            <p
                                className="text-[length:var(--normal-font-size)] min-h-[1.5em]"
                                style={{ color: status === 'error' ? '#ff6b6b' : 'var(--text-secondary)' }}
                                role="status"
                                aria-live="polite"
                            >
                                {status === 'success' && 'Thanks! We’ll email you when the beta opens.'}
                                {status === 'error' && 'Something went wrong — please try again or email us directly.'}
                            </p>
                        </SmartText>
                    </motion.form>
                </motion.div>

                {/* Contact links column */}
                <div className="order-2 w-full flex flex-col gap-[var(--card-gap)] py-12 lg:py-16 px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:pl-[var(--section-padding-x-tablet)] lg:pr-[var(--section-padding-x-desktop-sm)]">
                    {contactMethods.map((method) => (
                        <motion.a
                            key={method.title}
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <GlassSurface
                                width="100%"
                                height="auto"
                                borderRadius={20}
                                borderWidth={0.07}
                                brightness={50}
                                opacity={0.5}
                                blur={11}
                                displace={0.5}
                                backgroundOpacity={0.05}
                                saturation={1}
                                distortionScale={-180}
                                redOffset={0}
                                greenOffset={10}
                                blueOffset={20}
                                mixBlendMode="lighten"
                                className="p-[var(--card-padding-mobile)] md:p-[var(--card-padding-desktop)] hover:shadow-lg transition-shadow"
                            >
                                <div className="w-full flex items-center justify-center">
                                    <div className="w-full max-w-[300px] flex items-center gap-6">
                                        <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-[var(--text-primary)]">
                                            {method.icon}
                                        </div>
                                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                                            <h4 className="text-[length:var(--h2-font-size)] font-bold text-[var(--text-primary)]">
                                                {method.title}
                                            </h4>
                                            <SmartText>
                                                <p className="text-[length:var(--normal-font-size)] text-[var(--text-secondary)] truncate">
                                                    {method.value}
                                                </p>
                                            </SmartText>
                                        </div>
                                    </div>
                                </div>
                            </GlassSurface>
                        </motion.a>
                    ))}
                </div>

            </div>
        </Section>
    );
};

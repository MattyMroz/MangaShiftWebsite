'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import { Container } from '@/shared/ui/Container/Container';
import { IconCircle } from '@/shared/ui/IconCircle/IconCircle';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';
import { Input } from '@/shared/ui/Input/Input';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Field } from '@/shared/ui/Field/Field';
import { MetaLabel } from '@/shared/ui/MetaLabel/MetaLabel';
import { t } from '@/shared/i18n';

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
                        <MetaLabel>{t('beta.metaLabel')}</MetaLabel>
                        <h2 className="display mt-7 max-w-[10ch] text-[clamp(4.6rem,6.6vw,8.2rem)]">
                            {t('beta.titleBefore')}{' '}
                            <em className="text-[var(--accent-text)]">{t('beta.titleEmphasis')}</em>.
                        </h2>
                        <p className="mt-8 max-w-[52ch] text-[1.7rem] leading-[1.7] text-[var(--text-muted)]">
                            {t('beta.lead')}
                        </p>

                        <ul className="mt-9 flex flex-wrap gap-3">
                            {Array.from({ length: 3 }, (_, i) => t(`beta.badges.${i}`)).map((item) => (
                                <Badge key={item} as="li" variant="outline" className="tracking-[0.14em]">
                                    {item}
                                </Badge>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="relative rounded-[2.4rem] border border-[var(--line-strong)] bg-[var(--bg)] p-6 shadow-[var(--shadow-md)] sm:p-8 lg:col-span-6 lg:p-10"
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
                            <div>
                                <p className="font-mono text-[1rem] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                                    {t('beta.requestAccess')}
                                </p>
                                <p className="mt-2 text-[2.2rem] font-bold tracking-tight text-[var(--text)]">
                                    {t('beta.listTitle')}
                                </p>
                            </div>
                            <IconCircle as="span" size="lg">
                                ↗
                            </IconCircle>
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

                            <Field label={t('beta.emailLabel')} htmlFor="beta-email">
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Input
                                        id="beta-email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                        disabled={locked}
                                        placeholder={t('beta.emailPlaceholder')}
                                        className="flex-1"
                                    />
                                    <Button type="submit" variant="accent" size="pill" disabled={locked} className="self-start sm:self-auto">
                                        {status === 'submitting'
                                            ? t('beta.submitting')
                                            : status === 'success'
                                                ? t('beta.submitSuccess')
                                                : t('beta.submit')}
                                    </Button>
                                </div>
                            </Field>

                            <Checkbox
                                className="mt-5"
                                name="consent"
                                checked={consent}
                                onChange={(event) => setConsent(event.target.checked)}
                                required
                                disabled={locked}
                                label={t('beta.consent')}
                            />

                            <p
                                className="mt-5 min-h-8 border-t border-[var(--line)] pt-5 text-[1.35rem] text-[var(--text-faint)]"
                                role="status"
                                aria-live="polite"
                            >
                                {status === 'success' && t('beta.successMessage')}
                                {status === 'error' && t('beta.errorMessage')}
                                {status === 'idle' && t('beta.disclaimer')}
                            </p>
                        </form>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

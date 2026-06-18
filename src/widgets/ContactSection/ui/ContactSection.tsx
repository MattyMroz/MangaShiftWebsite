'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/shared/ui/lib/Button';
import { Container } from '@/shared/ui/Container/Container';
import { SideLabel } from '@/shared/ui/SideLabel/SideLabel';
import { Input } from '@/shared/ui/lib/Input';
import { Checkbox } from '@/shared/ui/lib/Checkbox';
import { Badge } from '@/shared/ui/lib/Badge';
import { Label } from '@/shared/ui/lib/Label';
import { MetaLabel } from '@/shared/ui/MetaLabel/MetaLabel';
import { t } from '@/shared/i18n';

const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScyTs1gTH1kmVC8EHkB_pdPsdrWwEtGIwLvQYu4StRfSkVYpA/formResponse';
const GOOGLE_FORM_EMAIL_ENTRY = 'entry.1654989478';
const GOOGLE_FORM_CONSENT_ENTRY = 'entry.980875902';
const GOOGLE_FORM_CONSENT_VALUE = 'Yes, I agree';
const landingInputClass = 'h-auto rounded-full border-[var(--line)] bg-[var(--surface)] px-8 py-4 text-[length:var(--normal-font-size)] text-[var(--text)] placeholder:text-[var(--text-faint)] hover:bg-[var(--surface)] focus-visible:border-[var(--accent)] focus-visible:ring-[var(--accent)]/15';

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
                                <Badge
                                    key={item}
                                    asChild
                                    variant="outline"
                                    className="px-4 py-2 font-mono text-[1rem] uppercase tracking-[0.14em] text-[var(--text-muted)]"
                                >
                                    <li>{item}</li>
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
                            <Button asChild variant="accent" size="icon-lg" className="pointer-events-none rounded-full">
                                <span>
                                    <ArrowUpRight aria-hidden="true" />
                                </span>
                            </Button>
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

                            <div className="flex flex-col gap-2">
                                <Label
                                    htmlFor="beta-email"
                                    className="flex items-baseline justify-between gap-3 font-mono text-[1rem] uppercase tracking-[0.18em] text-[var(--text-faint)]"
                                >
                                    {t('beta.emailLabel')}
                                </Label>
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
                                        className={`flex-1 ${landingInputClass}`}
                                    />
                                    <Button type="submit" variant="accent" size="landing-pill" disabled={locked} className="self-start sm:self-auto">
                                        {status === 'submitting'
                                            ? t('beta.submitting')
                                            : status === 'success'
                                                ? t('beta.submitSuccess')
                                                : t('beta.submit')}
                                    </Button>
                                </div>
                            </div>

                            <label className="mt-5 flex cursor-pointer items-center gap-3">
                                <Checkbox
                                    name="consent"
                                    checked={consent}
                                    onCheckedChange={(checked) => setConsent(checked === true)}
                                    required
                                    disabled={locked}
                                    className="size-6 rounded-[0.8rem] border-[var(--line-strong)] bg-[var(--surface)]"
                                />
                                <span className="text-[1.3rem] leading-[1.55] text-[var(--text-muted)]">
                                    {t('beta.consent')}
                                </span>
                            </label>

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

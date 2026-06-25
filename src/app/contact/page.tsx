'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/shared/ui/PageHero/PageHero';
import { PageShell } from '@/shared/ui/PageShell/PageShell';
import { Footer } from '@/widgets/Footer/ui/Footer';
import { Button } from '@/shared/ui/lib/Button';
import { Input } from '@/shared/ui/lib/Input';
import { Textarea } from '@/shared/ui/lib/Textarea';
import { Label } from '@/shared/ui/lib/Label';
import { t } from '@/shared/i18n';

const channels = [0, 1, 2] as const;

const pillInputClass =
    'h-auto rounded-full border-[var(--line)] bg-[var(--surface)] px-8 py-4 text-[length:var(--normal-font-size)] text-[var(--text)] placeholder:text-[var(--text-faint)] hover:bg-[var(--surface)] focus-visible:border-[var(--accent)] focus-visible:ring-[var(--accent)]/15';

const textareaClass =
    'h-auto rounded-[1.6rem] border-[var(--line)] bg-[var(--surface)] px-8 py-4 text-[length:var(--normal-font-size)] text-[var(--text)] placeholder:text-[var(--text-faint)] hover:bg-[var(--surface)] focus-visible:border-[var(--accent)] focus-visible:ring-[var(--accent)]/15';

const labelClass = 'font-mono text-[1.05rem] uppercase tracking-[0.18em] text-[var(--text-faint)]';

const Corners = () => (
    <>
        <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[var(--line-strong)]" />
        <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[var(--line-strong)]" />
        <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[var(--line-strong)]" />
        <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[var(--line-strong)]" />
    </>
);

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

                        <motion.form
                            onSubmit={handleSubmit}
                            className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <Corners />

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="flex flex-col gap-3">
                                    <Label className={labelClass}>{t('pages.contact.formName')}</Label>
                                    <Input
                                        name="name"
                                        autoComplete="name"
                                        placeholder={t('pages.contact.formNamePlaceholder')}
                                        className={pillInputClass}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label className={labelClass}>{t('pages.contact.formEmail')}</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder={t('pages.contact.formEmailPlaceholder')}
                                        className={pillInputClass}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col gap-3">
                                <Label className={labelClass}>{t('pages.contact.formTopic')}</Label>
                                <Input
                                    name="topic"
                                    placeholder={t('pages.contact.formTopicPlaceholder')}
                                    className={pillInputClass}
                                />
                            </div>

                            <div className="mt-6 flex flex-col gap-3">
                                <Label className={labelClass}>{t('pages.contact.formMessage')}</Label>
                                <Textarea
                                    name="message"
                                    rows={5}
                                    placeholder={t('pages.contact.formMessagePlaceholder')}
                                    className={textareaClass}
                                />
                            </div>

                            <Button type="submit" variant="accent" size="landing-pill" className="mt-8 w-full">
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
                        </motion.form>
                    </div>
                </PageShell>
            </main>
            <Footer />
        </div>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/lib/Button';
import { Input } from '@/shared/ui/lib/Input';
import { Label } from '@/shared/ui/lib/Label';

const landingInputClass = 'h-auto rounded-full border-[var(--line)] bg-[var(--surface)] px-8 py-4 text-[length:var(--normal-font-size)] text-[var(--text)] placeholder:text-[var(--text-faint)] hover:bg-[var(--surface)] focus-visible:border-[var(--accent)] focus-visible:ring-[var(--accent)]/15';

const Corners = () => (
    <>
        <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-[var(--line-strong)]" />
        <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-[var(--line-strong)]" />
        <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[var(--line-strong)]" />
        <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[var(--line-strong)]" />
    </>
);

export default function LoginPage() {
    const [notice, setNotice] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNotice(true);
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center px-[var(--section-padding-x-mobile)] py-[12rem] md:px-[var(--section-padding-x-tablet)]">
            <span
                aria-hidden
                className="absolute left-[var(--section-padding-x-mobile)] top-1/2 hidden -translate-y-1/2 font-mono text-[10.5px] uppercase tracking-[0.32em] text-[var(--text-faint)] [writing-mode:vertical-rl] lg:block"
            >
                MangaShift - Account access
            </span>
            <span
                aria-hidden
                className="absolute right-[var(--section-padding-x-mobile)] top-1/2 hidden -translate-y-1/2 rotate-180 font-mono text-[10.5px] uppercase tracking-[0.32em] text-[var(--text-faint)] [writing-mode:vertical-rl] lg:block"
            >
                51.1079 N - 17.0385 E
            </span>

            <motion.div
                data-theme="dark"
                className="relative z-10 w-full max-w-[34rem] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--bg)] p-[clamp(2rem,5vw,3.2rem)] text-[var(--text)] shadow-[var(--shadow-lg)]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <Corners />

                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-4 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                    <em className="serif shrink-0 text-[1.5em] leading-none tracking-normal text-[var(--accent-text)]">
                        0
                    </em>
                    <span className="truncate font-mono">Account - Sign in</span>
                    <span className="shrink-0 font-mono tabular-nums">000 / 008</span>
                </div>

                <div className="mt-10 flex flex-col items-center text-center">
                    <span className="font-[family-name:var(--font-display)] text-[2.8rem] font-extrabold tracking-tight text-[var(--text)]">
                        MangaShift<span className="text-[var(--accent)]">.</span>
                    </span>
                    <div className="mt-5 flex items-center gap-4">
                        <span className="h-px w-8 bg-[var(--accent)]" />
                        <span className="eyebrow">No. 00 - Account</span>
                        <span className="h-px w-8 bg-[var(--accent)]" />
                    </div>
                    <p className="mt-5 max-w-[30ch] text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                        Sign in to your studio. The dashboard ships with the beta - your seat is on the way.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Label className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                            Email
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="you@studio.com"
                            aria-label="Email address"
                            className={landingInputClass}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label className="flex items-baseline justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                            <span>Password</span>
                            <Button
                                type="button"
                                variant="link"
                                size="xs"
                                onClick={() => setNotice(true)}
                                className="h-auto p-0 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--accent-text)]"
                            >
                                Forgot?
                            </Button>
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="********"
                            aria-label="Password"
                            className={landingInputClass}
                        />
                    </div>

                    <Button type="submit" variant="accent" size="landing-pill" className="mt-2 w-full">
                        Sign in
                    </Button>

                    <p
                        className="min-h-[1.4em] text-center text-[length:var(--small-font-size)]"
                        style={{ color: notice ? 'var(--accent-text)' : 'var(--text-faint)' }}
                        role="status"
                        aria-live="polite"
                    >
                        {notice
                            ? 'Accounts are coming soon - join the beta to get yours first.'
                            : 'Authentication opens with the public beta.'}
                    </p>
                </form>

                <div className="mt-8 flex flex-col items-center gap-4 border-t border-[var(--line)] pt-6 text-center">
                    <p className="text-[length:var(--small-font-size)] text-[var(--text-muted)]">
                        No account yet?{' '}
                        <Link href="/#beta" className="text-[var(--accent-text)] underline-offset-4 hover:underline">
                            Request beta access
                        </Link>
                    </p>
                    <Link
                        href="/"
                        className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)] transition-colors hover:text-[var(--text)]"
                    >
                        Back to home
                    </Link>
                </div>

                <div className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
                    <span>Wroclaw, Poland</span>
                    <span className="tabular-nums">Rev. 0.1 - 2026</span>
                </div>
            </motion.div>
        </section>
    );
}

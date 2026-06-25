'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/lib/Button';
import { Input } from '@/shared/ui/lib/Input';
import { Label } from '@/shared/ui/lib/Label';
import { assetPath } from '@/shared/lib/utils/assetPath';

const landingInputClass =
    'h-auto rounded-full border-[var(--line)] bg-[var(--surface)] px-8 py-4 text-[length:var(--normal-font-size)] text-[var(--text)] placeholder:text-[var(--text-faint)] hover:bg-[var(--surface)] focus-visible:border-[var(--accent)] focus-visible:ring-[var(--accent)]/15';

export default function LoginPage() {
    const [notice, setNotice] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNotice(true);
    };

    return (
        <section className="relative min-h-screen">
            <div className="grid min-h-screen lg:grid-cols-[0.92fr_1.08fr]">
                <div className="flex items-center justify-center px-6 py-24 sm:px-10 md:px-[clamp(4rem,7vw,9rem)] md:py-28">
                    <motion.div
                        className="w-full max-w-[42rem]"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="mb-10 flex flex-col items-center text-center">
                            <span className="font-[family-name:var(--font-display)] text-[2.8rem] font-extrabold tracking-tight text-[var(--text)]">
                                MangaShift<span className="text-[var(--accent)]">.</span>
                            </span>
                            <div className="mt-5 flex items-center gap-4">
                                <span className="h-px w-8 bg-[var(--accent)]" />
                                <span className="eyebrow">Sign in to your studio</span>
                                <span className="h-px w-8 bg-[var(--accent)]" />
                            </div>
                            <p className="mt-5 max-w-[36ch] text-[length:var(--small-font-size)] leading-relaxed text-[var(--text-muted)]">
                                The dashboard ships with the beta — your seat is on the way.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                </div>

                <motion.div
                    data-theme="dark"
                    className="relative hidden overflow-hidden bg-[var(--bg)] lg:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.15 }}
                >
                    <span
                        aria-hidden="true"
                        className="absolute right-[-4rem] top-[8rem] h-[28rem] w-[28rem] rounded-full bg-[var(--accent)] opacity-70"
                    />

                    <div className="flex h-full flex-col items-center justify-center px-[clamp(3rem,5vw,7rem)] py-[10rem]">
                        <div className="diagram-card relative w-full max-w-[44rem] p-4">
                            <div className="flex items-center justify-between border-b border-[var(--line)] px-2 pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="h-4 w-4 rounded-full bg-[var(--accent)]" />
                                    <span className="font-mono text-[0.9rem] uppercase tracking-[0.17em] text-[var(--text-faint)]">
                                        Motion Study
                                    </span>
                                </div>
                                <span className="font-mono text-[1.4rem] tracking-[0.14em] text-[var(--text)]">≡</span>
                            </div>

                            <div className="relative mt-3 aspect-[4/5] overflow-hidden rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface-2)]">
                                <span className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[var(--accent)] opacity-80" />
                                <Image
                                    src={assetPath('/images/inspiration/hero-angel.png')}
                                    alt="MangaShift hero visual"
                                    fill
                                    priority
                                    sizes="(max-width: 1280px) 55vw, 44rem"
                                    className="relative z-10 object-contain object-bottom"
                                />
                            </div>

                            <div className="mt-4 flex items-end justify-between px-1">
                                <div>
                                    <p className="font-[family-name:var(--font-display)] text-[2.4rem] font-extrabold tracking-tight text-[var(--text)]">
                                        MangaShift<span className="text-[var(--accent)]">.</span>
                                    </p>
                                    <p className="mt-1 font-mono text-[0.85rem] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                                        Manga to video pipeline
                                    </p>
                                </div>
                                <span className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-[var(--text-faint)]">
                                    Beta 2026
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

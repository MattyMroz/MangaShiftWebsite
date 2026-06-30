'use client';

import { Container } from '@/shared/ui/container';
import { t } from '@/shared/i18n';

const rowTop = Array.from({ length: 12 }, (_, i) => t(`tickerbar.rowTop.${i}`));
const rowBottom = Array.from({ length: 12 }, (_, i) => t(`tickerbar.rowBottom.${i}`));

const GROUP_REPEAT = 3;

const Group = ({ items }: { items: readonly string[] }) => (
    <ul className="wire-group" aria-hidden="false">
        {Array.from({ length: GROUP_REPEAT }, (_, repeat) =>
            items.map((item, index) => (
                <li key={`${item}-${repeat}-${index}`} className="wire-item">
                    <span className="wire-dot" aria-hidden="true">●</span>
                    {item}
                </li>
            )),
        )}
    </ul>
);

const Row = ({ items, reverse }: { items: readonly string[]; reverse?: boolean }) => (
    <div className="wire-row">
        <div className={`wire-track ${reverse ? 'reverse' : ''}`}>
            <Group items={items} />
            <Group items={items} />
        </div>
    </div>
);

export const TickerSection = () => (
    <section
        aria-label="MangaShift capabilities"
        className="border-y border-[var(--line)] bg-[var(--surface)]"
    >
        <Container className="wire-inner py-7">
            <div className="wire-left">
                <span className="wire-mark">
                    <span className="wire-pulse" />
                </span>
                <span className="wire-title">
                    <b>{t('tickerbar.buildingNow')}</b>
                    <span>{t('tickerbar.status')}</span>
                </span>
            </div>

            <div className="wire-rows">
                <Row items={rowTop} />
                <Row items={rowBottom} reverse />
            </div>
        </Container>

        <style>{`
            @keyframes wire-x {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
            }
            .wire-inner {
                display: grid;
                grid-template-columns: minmax(180px, 220px) minmax(0, 1fr);
                gap: 32px;
                align-items: center;
            }
            @media (max-width: 768px) {
                .wire-inner { grid-template-columns: 1fr; gap: 18px; }
            }
            .wire-left {
                display: inline-flex;
                align-items: center;
                gap: 14px;
                min-height: 56px;
            }
            @media (min-width: 769px) {
                .wire-left {
                    border-right: 1px solid var(--line);
                    padding-right: 24px;
                }
            }
            .wire-mark {
                width: 22px;
                height: 22px;
                border-radius: 50%;
                border: 1px solid var(--line);
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .wire-pulse {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: var(--accent);
                display: inline-block;
                animation: wire-pulse 2.4s ease-in-out infinite;
            }
            @keyframes wire-pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.35; }
            }
            .wire-title {
                display: flex;
                flex-direction: column;
                gap: 3px;
                font-family: var(--font-mono), monospace;
                line-height: 1.4;
            }
            .wire-title b {
                color: var(--text);
                font-weight: 700;
                font-size: 1.1rem;
                letter-spacing: 0.18em;
                text-transform: uppercase;
            }
            .wire-title span {
                color: var(--text-faint);
                font-size: 1rem;
                letter-spacing: 0.12em;
                text-transform: uppercase;
            }
            .wire-rows {
                display: grid;
                gap: 10px;
                min-width: 0;
            }
            .wire-row {
                overflow: hidden;
                mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
                -webkit-mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
            }
            .wire-track {
                display: flex;
                align-items: center;
                gap: 0;
                width: max-content;
                white-space: nowrap;
                animation: wire-x 60s linear infinite;
                will-change: transform;
            }
            .wire-track.reverse {
                animation-direction: reverse;
                animation-duration: 95s;
            }
            .wire-row:hover .wire-track {
                animation-play-state: paused;
            }
            .wire-group {
                display: flex;
                align-items: center;
                gap: 22px;
                padding-right: 22px;
                list-style: none;
                margin: 0;
                flex-shrink: 0;
            }
            .wire-item {
                display: inline-flex;
                align-items: center;
                gap: 22px;
                flex-shrink: 0;
                font-size: 1.3rem;
                font-weight: 500;
                letter-spacing: 0.01em;
                color: var(--text-muted);
            }
            .wire-dot {
                color: var(--accent);
                font-size: 0.8rem;
                line-height: 0;
            }
            @media (prefers-reduced-motion: reduce) {
                .wire-track { animation: none; }
            }
        `}</style>
    </section>
);

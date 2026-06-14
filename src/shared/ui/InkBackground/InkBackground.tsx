'use client';

import { useEffect, useRef } from 'react';

const base = process.env.NODE_ENV === 'production' ? '/MangaShiftWebsite' : '';

export const InkBackground = () => {
    const ref = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframe = ref.current;
        if (!iframe) return;

        const relay = (type: string, e: PointerEvent) => {
            const canvas = iframe.contentDocument?.querySelector('canvas');
            if (!canvas) return;
            canvas.dispatchEvent(
                new PointerEvent(type, {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pointerType: 'mouse',
                    bubbles: true,
                    cancelable: true,
                }),
            );
        };

        const onDown = (e: PointerEvent) => relay('pointerdown', e);
        const onUp = (e: PointerEvent) => relay('pointerup', e);
        const onMove = (e: PointerEvent) => {
            if (e.buttons === 0) return;
            relay('pointermove', e);
        };

        window.addEventListener('pointerdown', onDown, { passive: true });
        window.addEventListener('pointerup', onUp, { passive: true });
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointermove', onMove);
        };
    }, []);

    return (
        <iframe
            ref={ref}
            src={`${base}/suminagashi/index.html`}
            title=""
            aria-hidden="true"
            tabIndex={-1}
            scrolling="no"
            className="pointer-events-none fixed left-0 top-0 -z-10 h-screen w-screen border-0"
        />
    );
};

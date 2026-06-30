'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const CursorHalo = () => {
    const [clicks, setClicks] = useState<Array<{ id: number; x: number; y: number }>>([]);

    useEffect(() => {
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        if (!finePointer.matches) return;

        let clickId = 0;
        const onDown = (event: PointerEvent) => {
            const id = ++clickId;
            setClicks((current) => [...current, { id, x: event.clientX, y: event.clientY }]);
            window.setTimeout(() => {
                setClicks((current) => current.filter((click) => click.id !== id));
            }, 450);
        };

        window.addEventListener('pointerdown', onDown, { passive: true });

        return () => {
            window.removeEventListener('pointerdown', onDown);
        };
    }, []);

    return (
        <AnimatePresence>
            {clicks.map((click) => (
                <motion.span
                    key={click.id}
                    aria-hidden="true"
                    className="click-feedback"
                    style={{ left: click.x, top: click.y }}
                    initial={{ opacity: 0.9, scale: 0.25 }}
                    animate={{ opacity: 0, scale: 1.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                />
            ))}
        </AnimatePresence>
    );
};

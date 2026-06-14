'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorHalo = () => {
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const smoothX = useSpring(x, { stiffness: 520, damping: 38, mass: 0.25 });
    const smoothY = useSpring(y, { stiffness: 520, damping: 38, mass: 0.25 });
    const [visible, setVisible] = useState(false);
    const [interactive, setInteractive] = useState(false);
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        if (!finePointer.matches) return;

        const onMove = (event: PointerEvent) => {
            x.set(event.clientX);
            y.set(event.clientY);
            setVisible(true);
            const target = event.target as Element | null;
            setInteractive(Boolean(target?.closest('a, button, input, label, [data-cursor]')));
        };
        const onLeave = () => setVisible(false);
        const onDown = () => setPressed(true);
        const onUp = () => setPressed(false);

        window.addEventListener('pointermove', onMove, { passive: true });
        document.documentElement.addEventListener('mouseleave', onLeave);
        window.addEventListener('pointerdown', onDown, { passive: true });
        window.addEventListener('pointerup', onUp, { passive: true });

        return () => {
            window.removeEventListener('pointermove', onMove);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
        };
    }, [x, y]);

    return (
        <motion.div
            aria-hidden="true"
            className="cursor-halo"
            style={{ x: smoothX, y: smoothY }}
            animate={{
                opacity: visible ? 1 : 0,
                scale: pressed ? 0.72 : interactive ? 1.55 : 1,
            }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
        >
            <span />
        </motion.div>
    );
};

'use client';

import { ElementType } from 'react';
import { HTMLMotionProps, motion, useReducedMotion } from 'framer-motion';

type RevealProps = HTMLMotionProps<'div'> & {
    as?: ElementType;
    delay?: number;
    y?: number;
    duration?: number;
    once?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export const Reveal = ({
    as = 'div',
    delay = 0,
    y = 24,
    duration = 0.7,
    once = true,
    children,
    ...props
}: RevealProps) => {
    const reduce = useReducedMotion();
    const Motion = motion(as as 'div');

    return (
        <Motion
            initial={reduce ? false : { opacity: 0, y }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once, margin: '-80px' }}
            transition={{ duration, delay, ease: EASE }}
            {...props}
        >
            {children}
        </Motion>
    );
};

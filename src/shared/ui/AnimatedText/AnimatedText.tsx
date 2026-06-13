'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedTextProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
}

export const AnimatedText = ({
    children,
    className = '',
    delay = 0,
    duration = 0.5,
    once = true
}: AnimatedTextProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once });

    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');

    // If children is not a string, just animate the whole element
    if (typeof children !== 'string') {
        return (
            <motion.div
                ref={ref}
                className={className}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration, delay }}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <span ref={ref} className={className}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className="inline-block mr-[0.25em]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                        duration,
                        delay: delay + index * 0.05,
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

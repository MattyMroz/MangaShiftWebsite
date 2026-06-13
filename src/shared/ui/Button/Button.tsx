'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import GlassSurface from '@/shared/ui/GlassSurface/GlassSurface';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'ghost';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
    const baseStyles = "relative inline-block cursor-pointer";
    const animationProps = {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    };

    if (variant === 'primary') {
        return (
            <motion.button
                className={`${baseStyles} ${className || ''}`}
                {...props}
                {...animationProps}
            >
                <GlassSurface
                    width="auto"
                    height="auto"
                    borderRadius={50}
                    borderWidth={0.3}
                    brightness={50}
                    opacity={0.5}
                    blur={11}
                    displace={0.5}
                    backgroundOpacity={0.75}
                    saturation={1}
                    distortionScale={-180}
                    redOffset={0}
                    greenOffset={10}
                    blueOffset={20}
                    mixBlendMode="lighten"
                    className="px-8 py-4 md:px-12 md:py-5 backdrop-invert"
                    style={{ boxShadow: 'none' }}
                >
                    <span className="text-[length:var(--h2-font-size)] font-bold text-[var(--text-primary)] tracking-tight whitespace-nowrap">
                        {children}
                    </span>
                </GlassSurface>
            </motion.button>
        );
    }

    return (
        <motion.button
            className={`${baseStyles} ${className || ''}`}
            {...props}
            {...animationProps}
        >
            <GlassSurface
                width="auto"
                height="auto"
                borderRadius={50}
                borderWidth={0.07}
                brightness={50}
                opacity={0.5}
                blur={11}
                displace={0.5}
                backgroundOpacity={0.05}
                saturation={1}
                distortionScale={-180}
                redOffset={0}
                greenOffset={10}
                blueOffset={20}
                mixBlendMode="lighten"
                className="px-8 py-4 md:px-12 md:py-5"
                style={{ boxShadow: 'none' }}
            >
                <span className="text-[length:var(--h2-font-size)] font-bold text-[var(--text-primary)] tracking-tight whitespace-nowrap">
                    {children}
                </span>
            </GlassSurface>
        </motion.button>
    );
};
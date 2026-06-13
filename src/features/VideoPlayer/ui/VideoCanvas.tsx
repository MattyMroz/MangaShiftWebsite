'use client';

import { forwardRef } from 'react';

interface VideoCanvasProps {
    /** Whether the canvas is visible */
    isVisible?: boolean;
    /** Width of the canvas */
    width?: number;
    /** Height of the canvas */
    height?: number;
    /** Additional className */
    className?: string;
}

/**
 * Canvas component that displays video colors with blur effect
 * Features gradient opacity that fades at top and bottom
 */
export const VideoCanvas = forwardRef<HTMLCanvasElement, VideoCanvasProps>(
    ({ isVisible = true, width = 1920, height = 1080, className = '' }, ref) => {
        return (
            <canvas
                ref={ref}
                width={width}
                height={height}
                aria-hidden="true"
                className={`
                    absolute inset-0 z-0
                    w-full h-full
                    pointer-events-none
                    transition-opacity duration-700 ease-out
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                    ${className}
                `}
                style={{
                    // Blur and brightness effect
                    filter: 'blur(50px) brightness(1.2) saturate(1.3)',
                    // Gradient mask - fades at top and bottom
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    // Scale up to cover more area
                    transform: 'scale(1.5)',
                    transformOrigin: 'center center',
                }}
            />
        );
    }
);

VideoCanvas.displayName = 'VideoCanvas';

'use client';

import { forwardRef } from 'react';

interface VideoCanvasProps {
    isVisible?: boolean;
    width?: number;
    height?: number;
    className?: string;
}

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
                    filter: 'blur(50px) brightness(1.2) saturate(1.3)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    transform: 'scale(1.5)',
                    transformOrigin: 'center center',
                }}
            />
        );
    }
);

VideoCanvas.displayName = 'VideoCanvas';

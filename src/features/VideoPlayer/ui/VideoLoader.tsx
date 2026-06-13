'use client';

interface VideoLoaderProps {
    /** Whether the loader is visible */
    isLoading: boolean;
}

/**
 * Spinning loader displayed while video is loading
 */
export const VideoLoader = ({ isLoading }: VideoLoaderProps) => {
    if (!isLoading) return null;

    return (
        <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-[rgb(15,15,15)]"
            aria-label="Loading video..."
            role="status"
        >
            <div
                className="w-16 h-16 rounded-full border-4 border-[rgb(15,15,15)] border-t-white/90 animate-spin"
                style={{ animationDuration: '1s' }}
            />
            <span className="sr-only">Loading video...</span>
        </div>
    );
};

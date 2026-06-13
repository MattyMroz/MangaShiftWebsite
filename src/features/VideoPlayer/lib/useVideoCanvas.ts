import { useEffect, useRef } from 'react';

interface UseVideoCanvasOptions {
    /** Target FPS for canvas updates (default: 30) */
    targetFps?: number;
    /** Whether the canvas should be active */
    isActive?: boolean;
}

/**
 * Hook to copy video frames to canvas with blur effect
 * Creates ambient light effect behind the video player
 */
export const useVideoCanvas = (
    videoRef: React.RefObject<HTMLVideoElement | null>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    options: UseVideoCanvasOptions = {}
) => {
    const { targetFps = 30, isActive = true } = options;
    const animationFrameRef = useRef<number | null>(null);
    const lastDrawTimeRef = useRef<number>(0);
    const isFullscreenRef = useRef<boolean>(false);

    // Handle fullscreen changes - pause canvas drawing in fullscreen
    useEffect(() => {
        const handleFullscreenChange = () => {
            isFullscreenRef.current = !!document.fullscreenElement;
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, []);

    // Start/stop animation loop
    useEffect(() => {
        if (!isActive) return;

        const drawFrame = (timestamp: number) => {
            const currentVideo = videoRef.current;
            const currentCanvas = canvasRef.current;

            if (!currentVideo || !currentCanvas) {
                animationFrameRef.current = requestAnimationFrame(drawFrame);
                return;
            }

            if (isFullscreenRef.current) {
                animationFrameRef.current = requestAnimationFrame(drawFrame);
                return;
            }

            // Throttle to target FPS
            const frameInterval = 1000 / targetFps;
            const elapsed = timestamp - lastDrawTimeRef.current;

            if (elapsed >= frameInterval) {
                lastDrawTimeRef.current = timestamp - (elapsed % frameInterval);

                const ctx = currentCanvas.getContext('2d', {
                    alpha: true,
                    willReadFrequently: false
                });

                if (ctx && currentVideo.readyState >= 2) {
                    // Clear canvas first
                    ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
                    // Draw video frame to canvas
                    ctx.drawImage(currentVideo, 0, 0, currentCanvas.width, currentCanvas.height);
                }
            }

            animationFrameRef.current = requestAnimationFrame(drawFrame);
        };

        animationFrameRef.current = requestAnimationFrame(drawFrame);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isActive, videoRef, canvasRef, targetFps]);
};

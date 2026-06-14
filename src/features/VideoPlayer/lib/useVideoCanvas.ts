import { useEffect, useRef } from 'react';

interface UseVideoCanvasOptions {
    targetFps?: number;
    isActive?: boolean;
}

export const useVideoCanvas = (
    videoRef: React.RefObject<HTMLVideoElement | null>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    options: UseVideoCanvasOptions = {}
) => {
    const { targetFps = 30, isActive = true } = options;
    const animationFrameRef = useRef<number | null>(null);
    const lastDrawTimeRef = useRef<number>(0);
    const isFullscreenRef = useRef<boolean>(false);

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

            const frameInterval = 1000 / targetFps;
            const elapsed = timestamp - lastDrawTimeRef.current;

            if (elapsed >= frameInterval) {
                lastDrawTimeRef.current = timestamp - (elapsed % frameInterval);

                const ctx = currentCanvas.getContext('2d', {
                    alpha: true,
                    willReadFrequently: false
                });

                if (ctx && currentVideo.readyState >= 2) {
                    ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
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

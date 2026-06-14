'use client';

import { useRef, useState, useEffect } from 'react';
import { Plyr, type APITypes } from 'plyr-react';
import 'plyr-react/plyr.css';

import { plyrOptions, demoVideoSource } from '../lib/plyrConfig';

interface VideoPlayerProps {
    className?: string;
    disableCanvas?: boolean;
}

export const VideoPlayer = ({ className = '', disableCanvas = false }: VideoPlayerProps) => {
    const playerRef = useRef<APITypes>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (disableCanvas) return;
        let animationFrameId: number;
        let isCopyingActive = true;

        const updateCanvas = () => {
            const canvas = canvasRef.current;
            const video = document.querySelector('.plyr video') as HTMLVideoElement;

            if (canvas && video && video.readyState >= 2 && isCopyingActive) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                }
            }

            animationFrameId = requestAnimationFrame(updateCanvas);
        };

        animationFrameId = requestAnimationFrame(updateCanvas);

        const handleFullscreen = () => {
            isCopyingActive = !document.fullscreenElement;
        };

        document.addEventListener('fullscreenchange', handleFullscreen);

        return () => {
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener('fullscreenchange', handleFullscreen);
        };
    }, [disableCanvas]);

    useEffect(() => {
        const checkVideo = () => {
            const video = document.querySelector('.plyr video') as HTMLVideoElement;
            if (video) {
                video.addEventListener('loadeddata', () => {
                    setIsLoaded(true);
                });

                if (video.readyState >= 2) {
                    setIsLoaded(true);
                }

                return true;
            }
            return false;
        };

        if (!checkVideo()) {
            const t1 = setTimeout(checkVideo, 100);
            const t2 = setTimeout(checkVideo, 500);
            const t3 = setTimeout(checkVideo, 1000);
            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
            };
        }
    }, []);

    return (
        <div className={`relative w-full ${className}`}>
            {!disableCanvas && (
                <canvas
                    ref={canvasRef}
                    width={1920}
                    height={1080}
                    className="absolute w-full max-h-full pointer-events-none"
                    style={{
                        display: isLoaded ? 'block' : 'none',
                        filter: 'blur(50px) drop-shadow(0 0 1rem rgba(0,0,0,1)) brightness(1.2)',
                        animation: isLoaded ? 'fadeInCanvas 0.5s ease-out 0.5s forwards' : 'none',
                        opacity: 0,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) scale(1.2)',
                        zIndex: 0,
                    }}
                />
            )}

            <div
                className="relative overflow-hidden rounded-2xl bg-[rgb(15,15,15)] shadow-2xl shadow-black/50"
                style={{ aspectRatio: '16 / 9', zIndex: 1 }}
            >
                {!isLoaded && (
                    <div 
                        className="absolute inset-0 flex items-center justify-center bg-[rgb(15,15,15)]"
                        style={{ zIndex: 10 }}
                    >
                        <div 
                            className="w-[70px] h-[70px] rounded-full border-[6px] border-[rgb(15,15,15)] border-t-white/90 animate-spin"
                        />
                    </div>
                )}

                <div
                    className="relative w-full h-full"
                    style={{
                        display: isLoaded ? 'block' : 'none',
                        animation: isLoaded ? 'fadeInPlayer 0.4s ease-out 0.4s forwards' : 'none',
                        opacity: 0,
                    }}
                >
                    <Plyr
                        ref={playerRef}
                        source={demoVideoSource}
                        options={plyrOptions}
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInCanvas {
                    from { opacity: 0; }
                    to { opacity: 0.5; }
                }
                @keyframes fadeInPlayer {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

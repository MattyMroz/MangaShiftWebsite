'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface LazySectionProps {
    children: ReactNode;
    threshold?: number;
    rootMargin?: string;
    className?: string;
}

/**
 * LazySection - komponent optymalizujący wydajność poprzez lazy loading zawartości
 * Zawartość jest renderowana dopiero gdy sekcja staje się widoczna w viewport
 */
export const LazySection = ({ 
    children, 
    threshold = 0.1, 
    rootMargin = '100px',
    className = ''
}: LazySectionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsVisible(entry.isIntersecting);
                
                // Zapamiętaj, że sekcja była widoczna (dla komponentów które mają działać dalej)
                if (entry.isIntersecting && !hasBeenVisible) {
                    setHasBeenVisible(true);
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, hasBeenVisible]);

    return (
        <div ref={ref} className={className} data-visible={isVisible}>
            {hasBeenVisible && children}
        </div>
    );
};

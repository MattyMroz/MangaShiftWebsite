'use client';

import React, {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    ReactElement,
    ReactNode,
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
    width?: number | string;
    height?: number | string;
    cardDistance?: number;
    verticalDistance?: number;
    delay?: number;
    pauseOnHover?: boolean;
    onCardClick?: (idx: number) => void;
    skewAmount?: number;
    easing?: 'linear' | 'elastic';
    children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
    <div
        ref={ref}
        {...rest}
        className={`absolute top-1/2 left-1/2 rounded-2xl border border-[var(--border-secondary)] bg-[var(--bg-secondary)] shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3)] [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] cursor-pointer ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    />
));
Card.displayName = 'Card';

interface Slot {
    x: number;
    y: number;
    z: number;
    zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true
    });

const CardSwap: React.FC<CardSwapProps> = ({
    width = 500,
    height = 400,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    onCardClick,
    skewAmount = 6,
    easing = 'elastic',
    children
}) => {
    const config = useMemo(() =>
        easing === 'elastic'
            ? {
                ease: 'elastic.out(0.6,0.9)',
                durDrop: 2,
                durMove: 2,
                durReturn: 2,
                promoteOverlap: 0.9,
                returnDelay: 0.05
            }
            : {
                ease: 'power1.inOut',
                durDrop: 0.8,
                durMove: 0.8,
                durReturn: 0.8,
                promoteOverlap: 0.45,
                returnDelay: 0.2
            }, [easing]);

    const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
    const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

    const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const intervalRef = useRef<number>(0);
    const container = useRef<HTMLDivElement>(null);
    const isHovered = useRef(false);
    const isAnimating = useRef(false);

    const swap = useCallback(() => {
        if (order.current.length < 2 || isAnimating.current) return;

        isAnimating.current = true;

        const [front, ...rest] = order.current;
        const elFront = elementsRef.current[front];
        if (!elFront) return;

        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.to(elFront, {
            y: '+=500',
            duration: config.durDrop,
            ease: config.ease
        });

        tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
        rest.forEach((idx, i) => {
            const el = elementsRef.current[idx];
            if (el) {
                const slot = makeSlot(i, cardDistance, verticalDistance, elementsRef.current.length);
                tl.set(el, { zIndex: slot.zIndex }, 'promote');
                tl.to(
                    el,
                    {
                        x: slot.x,
                        y: slot.y,
                        z: slot.z,
                        duration: config.durMove,
                        ease: config.ease
                    },
                    `promote+=${i * 0.15}`
                );
            }
        });

        const backSlot = makeSlot(elementsRef.current.length - 1, cardDistance, verticalDistance, elementsRef.current.length);
        tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
        tl.call(
            () => {
                gsap.set(elFront, { zIndex: backSlot.zIndex });
            },
            undefined,
            'return'
        );
        tl.to(
            elFront,
            {
                x: backSlot.x,
                y: backSlot.y,
                z: backSlot.z,
                duration: config.durReturn,
                ease: config.ease
            },
            'return'
        );

        tl.call(() => {
            order.current = [...rest, front];
            isAnimating.current = false;
        });
    }, [config, cardDistance, verticalDistance]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const total = elementsRef.current.length;
            elementsRef.current.forEach((el, i) => {
                if (el) {
                    placeNow(el, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
                }
            });
        }, container);

        intervalRef.current = window.setInterval(swap, delay);

        const node = container.current;
        const pause = () => {
            isHovered.current = true;
            tlRef.current?.pause();
            clearInterval(intervalRef.current);
        };
        const resume = () => {
            isHovered.current = false;
            tlRef.current?.play();
            clearInterval(intervalRef.current);
            intervalRef.current = window.setInterval(swap, delay);
        };

        if (pauseOnHover && node) {
            node.addEventListener('mouseenter', pause);
            node.addEventListener('mouseleave', resume);
        }

        return () => {
            ctx.revert();
            clearInterval(intervalRef.current);
            if (tlRef.current) tlRef.current.kill();
            if (pauseOnHover && node) {
                node.removeEventListener('mouseenter', pause);
                node.removeEventListener('mouseleave', resume);
            }
        };
    }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, config, swap]);

    const handleCardClickInternal = (i: number) => {
        if (isAnimating.current && tlRef.current) {
            tlRef.current.progress(1);
            isAnimating.current = false;
        }

        swap();

        if (!isHovered.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = window.setInterval(swap, delay);
        }

        onCardClick?.(i);
    };

    // eslint-disable-next-line react-hooks/refs
    const rendered = childArr.map((child, i) =>
        isValidElement<CardProps>(child)
            ? cloneElement(child, {
                key: child.key || i,
                ref: (el: HTMLDivElement | null) => {
                    elementsRef.current[i] = el;
                },
                style: { width, height, ...(child.props.style ?? {}) },
                onClick: e => {
                    child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
                    handleCardClickInternal(i);
                }
            } as CardProps & React.RefAttributes<HTMLDivElement>)
            : child
    );

    return (
        <div
            ref={container}
            className="relative perspective-[900px] overflow-visoble"
            style={{ width, height }}
        >
            {rendered}
        </div>
    );
};

export default CardSwap;

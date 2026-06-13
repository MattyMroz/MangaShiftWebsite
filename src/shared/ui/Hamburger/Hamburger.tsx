"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface HamburgerProps {
    isOpen: boolean;
    toggle: () => void;
}

export const Hamburger = ({ isOpen, toggle }: HamburgerProps) => {
    const bar1Ref = useRef<SVGRectElement>(null);
    const bar2Ref = useRef<SVGRectElement>(null);
    const bar3Ref = useRef<SVGRectElement>(null);
    const isChangingState = useRef(false);
    const previousIsOpen = useRef(isOpen);
    const isFirstRender = useRef(true);
    const isHovered = useRef(false);

    const Y_OFFSET = 9;

    const applyHoverState = (open: boolean) => {
        if (open) {
            gsap.to(bar1Ref.current, { scaleX: 1.2, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            gsap.to(bar3Ref.current, { scaleX: 1.2, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        } else {
            gsap.to(bar1Ref.current, { y: -2, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            gsap.to(bar2Ref.current, { scaleX: 0.6, transformOrigin: "50% 50%", duration: 0.5, ease: "elastic.out(1, 0.3)" });
            gsap.to(bar3Ref.current, { y: 2, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        }
    };

    const resetHoverState = (open: boolean) => {
        if (open) {
            gsap.to(bar1Ref.current, { scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            gsap.to(bar3Ref.current, { scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        } else {
            gsap.to(bar1Ref.current, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            gsap.to(bar2Ref.current, { scaleX: 1, transformOrigin: "50% 50%", duration: 0.5, ease: "elastic.out(1, 0.3)" });
            gsap.to(bar3Ref.current, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            if (isOpen) {
                gsap.set(bar1Ref.current, { y: Y_OFFSET, rotation: 45, transformOrigin: "50% 50%" });
                gsap.set(bar2Ref.current, { opacity: 0 });
                gsap.set(bar3Ref.current, { y: -Y_OFFSET, rotation: -45, transformOrigin: "50% 50%" });
            } else {
                gsap.set([bar1Ref.current, bar2Ref.current, bar3Ref.current], {
                    rotation: 0,
                    y: 0,
                    scaleX: 1,
                    opacity: 1
                });
            }
            isFirstRender.current = false;
            previousIsOpen.current = isOpen;
            return;
        }

        if (isOpen === previousIsOpen.current) return;

        isChangingState.current = true;
        gsap.killTweensOf([bar1Ref.current, bar2Ref.current, bar3Ref.current]);

        const onAnimationComplete = () => {
            isChangingState.current = false;
            if (isHovered.current) {
                applyHoverState(isOpen);
            }
        };

        if (isOpen) {
            const tl = gsap.timeline({ onComplete: onAnimationComplete });
            tl.to(bar1Ref.current, { y: Y_OFFSET, duration: 0.3, ease: "power4.in" })
                .to(bar2Ref.current, { scaleX: 1, duration: 0.3, ease: "power4.in" }, "-=0.3")
                .to(bar3Ref.current, { y: -Y_OFFSET, duration: 0.3, ease: "power4.in" }, "-=0.3")
                .to(bar1Ref.current, { rotation: 45, duration: 0.5, ease: "elastic.out(1, 0.3)", transformOrigin: "50% 50%" })
                .set(bar2Ref.current, { opacity: 0 }, "-=0.5")
                .to(bar3Ref.current, { rotation: -45, duration: 0.5, ease: "elastic.out(1, 0.3)", transformOrigin: "50% 50%" }, "-=0.5");
        } else {
            const tl = gsap.timeline({ onComplete: onAnimationComplete });
            tl.to(bar1Ref.current, { scaleX: 0, duration: 0.3, ease: "back.in(1.7)" })
                .to(bar3Ref.current, { scaleX: 0, duration: 0.3, ease: "back.in(1.7)" }, "-=0.3")
                .set(bar1Ref.current, { rotation: 0, y: 0 })
                .set(bar2Ref.current, { scaleX: 0, opacity: 1 })
                .set(bar3Ref.current, { rotation: 0, y: 0 })
                .to(bar2Ref.current, { scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" })
                .to(bar1Ref.current, { scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }, "-=0.4")
                .to(bar3Ref.current, { scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }, "-=0.5");
        }

        previousIsOpen.current = isOpen;
    }, [isOpen]);

    const handleMouseEnter = () => {
        // Disable hover effect on touch devices to prevent sticky hover state
        if (window.matchMedia && !window.matchMedia('(hover: hover)').matches) {
            return;
        }

        isHovered.current = true;
        if (isChangingState.current) return;
        gsap.killTweensOf([bar1Ref.current, bar2Ref.current, bar3Ref.current]);
        applyHoverState(isOpen);
    };

    const handleMouseLeave = () => {
        isHovered.current = false;
        if (isChangingState.current) return;
        gsap.killTweensOf([bar1Ref.current, bar2Ref.current, bar3Ref.current]);
        resetHoverState(isOpen);
    };

    const handleTouchEnd = () => {
        // Reset hover state after touch on tablets to prevent sticky hover
        isHovered.current = false;
        if (isChangingState.current) return;
        gsap.killTweensOf([bar1Ref.current, bar2Ref.current, bar3Ref.current]);
        resetHoverState(isOpen);
    };

    return (
        <button
            className="burger"
            onClick={() => !isChangingState.current && toggle()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchEnd={handleTouchEnd}
            aria-label="Toggle menu"
        >
            <svg id="burger-svg" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g className="burger-svg__bars">
                    <rect ref={bar1Ref} className="burger-svg__bar-1" x="10" y="14" width="30" height="4" rx="2" fill="currentColor" />
                    <rect ref={bar2Ref} className="burger-svg__bar-2" x="10" y="23" width="30" height="4" rx="2" fill="currentColor" />
                    <rect ref={bar3Ref} className="burger-svg__bar-3" x="10" y="32" width="30" height="4" rx="2" fill="currentColor" />
                </g>
            </svg>
        </button>
    );
};

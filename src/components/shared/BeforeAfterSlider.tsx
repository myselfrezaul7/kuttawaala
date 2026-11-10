"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    className?: string;
}

export function BeforeAfterSlider({
    beforeImage,
    afterImage,
    beforeLabel = "Before",
    afterLabel = "After",
    className = ""
}: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const rafId = useRef<number | null>(null);
    const containerRectRef = useRef<DOMRect | null>(null);

    const updatePosition = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRectRef.current || containerRef.current.getBoundingClientRect();
        if (rect.width === 0) return;
        const position = ((clientX - rect.left) / rect.width) * 100;
        setSliderPosition(Math.min(Math.max(position, 0), 100));
    }, []);

    const handleMove = useCallback((event: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        if (rafId.current !== null) {
            cancelAnimationFrame(rafId.current);
        }
        rafId.current = requestAnimationFrame(() => {
            updatePosition(clientX);
            rafId.current = null;
        });
    }, [isDragging, updatePosition]);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        if (containerRef.current) {
            containerRectRef.current = containerRef.current.getBoundingClientRect();
        }
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        updatePosition(clientX);
    };

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        if (rafId.current !== null) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove, { passive: true });
            window.addEventListener('mouseup', handleMouseUp, { passive: true });
            window.addEventListener('touchmove', handleMove, { passive: true });
            window.addEventListener('touchend', handleMouseUp, { passive: true });
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleMouseUp);
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current);
                rafId.current = null;
            }
        };
    }, [isDragging, handleMove, handleMouseUp]);

    return (
        <div
            ref={containerRef}
            role="slider"
            tabIndex={0}
            aria-label="Before and after rescue image comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    setSliderPosition((p) => Math.max(0, p - 5));
                } else if (e.key === "ArrowRight") {
                    e.preventDefault();
                    setSliderPosition((p) => Math.min(100, p + 5));
                }
            }}
            className={`relative w-full h-full overflow-hidden select-none cursor-ew-resize group touch-none focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* After Image (Background) */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={afterImage}
                    alt="After transformation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    decoding="async"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
                    {afterLabel}
                </div>
            </div>

            {/* Before Image (Foreground - Clipped) */}
            <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
                <Image
                    src={beforeImage}
                    alt="Before transformation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    decoding="async"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 will-change-[left]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl text-primary transform transition-transform group-hover:scale-110">
                    <GripVertical className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}

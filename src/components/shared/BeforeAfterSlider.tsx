"use client";

import { useState, useRef, useEffect } from "react";
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

    const handleMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : (event as any).clientX;

        const position = ((clientX - containerRect.left) / containerRect.width) * 100;
        setSliderPosition(Math.min(Math.max(position, 0), 100));
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden select-none cursor-ew-resize group ${className}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* After Image (Background) */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={afterImage}
                    alt="After transformation"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
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
                    className="object-cover"
                    priority
                />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl text-primary transform transition-transform group-hover:scale-110">
                    <GripVertical className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}

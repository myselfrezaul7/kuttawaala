"use client";

interface KuttawaalaLogoProps {
    className?: string;
    priority?: boolean;
    alt?: string;
}

export function KuttawaalaLogo({
    className = "h-8 w-auto",
    priority = false,
    alt = "কুত্তাওয়ালা - Kuttawaala",
}: KuttawaalaLogoProps) {
    return (
        <span className={`relative inline-flex items-center shrink-0 ${className}`}>
            {/* Light Mode: Crisp Dark Charcoal Logo on Light Backgrounds */}
            <img
                src="/assets/kuttawaala-watermark-dark.png"
                alt={alt}
                className="h-full w-auto object-contain block dark:hidden transition-transform duration-200 group-hover:scale-105"
                loading={priority ? "eager" : "lazy"}
            />
            {/* Dark Mode: Crisp White Logo on Dark Backgrounds */}
            <img
                src="/assets/kuttawaala-watermark-light.png"
                alt={alt}
                className="h-full w-auto object-contain hidden dark:block transition-transform duration-200 group-hover:scale-105"
                loading={priority ? "eager" : "lazy"}
            />
        </span>
    );
}

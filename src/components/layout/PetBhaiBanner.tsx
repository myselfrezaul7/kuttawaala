"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, ArrowRight } from "lucide-react";

export function PetBhaiBanner() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isHomePage) {
            window.dispatchEvent(new CustomEvent("petbhai-banner-change", { detail: { isVisible: false } }));
            return;
        }

        const isDismissed = localStorage.getItem("petbhai-banner-dismissed");
        if (!isDismissed) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                window.dispatchEvent(new CustomEvent("petbhai-banner-change", { detail: { isVisible: true } }));
            }, 600);
            return () => clearTimeout(timer);
        } else {
            window.dispatchEvent(new CustomEvent("petbhai-banner-change", { detail: { isVisible: false } }));
        }
    }, [isHomePage]);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("petbhai-banner-dismissed", "true");
        window.dispatchEvent(new CustomEvent("petbhai-banner-change", { detail: { isVisible: false } }));
    };

    return (
        <AnimatePresence>
            {isHomePage && isVisible && (
                <motion.aside
                    aria-label="PetBhai Shop announcement"
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="fixed bottom-24 md:bottom-6 left-4 md:left-6 right-20 md:right-auto max-w-[calc(100vw-5.5rem)] md:max-w-sm z-40 print:hidden bg-zinc-900/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-white/10 text-white rounded-full px-3.5 py-2 shadow-lg flex items-center gap-3"
                >
                    <div className="w-7 h-7 rounded-full bg-purple-600/90 flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-3.5 h-3.5 text-white" />
                    </div>

                    <div className="flex flex-col min-w-0 pr-1">
                        <span className="font-semibold text-xs tracking-tight text-white truncate">
                            PetBhai Shop
                        </span>
                        <span className="text-[11px] text-zinc-400 truncate">
                            Dog food & essentials
                        </span>
                    </div>

                    <a
                        href="https://www.petbhai.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 text-xs font-semibold shadow-sm transition-colors shrink-0 ml-auto"
                    >
                        <span>Visit</span>
                        <ArrowRight className="w-3 h-3" />
                    </a>

                    <button
                        onClick={handleDismiss}
                        className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
                        aria-label="Dismiss banner"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}


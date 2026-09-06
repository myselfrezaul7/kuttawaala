"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, ArrowRight } from "lucide-react";

export function PetBhaiBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user previously dismissed the banner
        const isDismissed = localStorage.getItem("petbhai-banner-dismissed");
        if (!isDismissed) {
            // Small delay for smooth entrance
            const timer = setTimeout(() => setIsVisible(true), 600);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("petbhai-banner-dismissed", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.aside
                    aria-label="PetBhai Shop announcement"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-40 max-w-sm print:hidden bg-zinc-900/90 dark:bg-zinc-800/90 backdrop-blur-xl border border-white/10 text-white rounded-full px-4 py-2.5 shadow-2xl flex items-center gap-3"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-500 flex items-center justify-center shrink-0 shadow-inner">
                        <ShoppingBag className="w-4 h-4 text-white" />
                    </div>

                    <div className="flex flex-col min-w-0 pr-1">
                        <span className="font-bold text-xs tracking-tight text-white truncate">
                            PetBhai Shop
                        </span>
                        <span className="text-[11px] text-zinc-400 truncate">
                            Dog food & accessories
                        </span>
                    </div>

                    <a
                        href="https://www.petbhai.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 text-xs font-semibold shadow-sm transition-all hover:scale-105 shrink-0 ml-auto"
                    >
                        <span>Visit Store</span>
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


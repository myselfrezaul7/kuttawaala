"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

const PWA_STORAGE_KEY = "kuttawaala-pwa-dismissed";

export function PWAInstallPrompt() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [canInstall, setCanInstall] = useState(false);
    const [isPetBhaiActive, setIsPetBhaiActive] = useState(false);
    const hasShownOnHomeRef = useRef(false);

    useEffect(() => {
        const petBhaiDismissed = localStorage.getItem("petbhai-banner-dismissed");
        if (!petBhaiDismissed) {
            setIsPetBhaiActive(true);
        }

        const handleBannerChange = (e: Event) => {
            const customEvent = e as CustomEvent<{ isVisible: boolean }>;
            if (customEvent.detail !== undefined) {
                setIsPetBhaiActive(customEvent.detail.isVisible);
            }
        };

        window.addEventListener("petbhai-banner-change", handleBannerChange);
        return () => {
            window.removeEventListener("petbhai-banner-change", handleBannerChange);
        };
    }, []);

    useEffect(() => {
        // Only ever allow the install notification preview once on the home page
        if (pathname !== "/") {
            if (hasShownOnHomeRef.current) {
                setCanInstall(false);
            }
            return;
        }

        const isDismissedOrShown = localStorage.getItem(PWA_STORAGE_KEY);
        if (isDismissedOrShown) return;

        const isStandalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            (window.navigator as unknown as { standalone?: boolean }).standalone === true;
        if (isStandalone) return;

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            if (localStorage.getItem(PWA_STORAGE_KEY)) return;
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setCanInstall(true);
            hasShownOnHomeRef.current = true;
            // Mark as shown so it only ever previews once on the home page
            localStorage.setItem(PWA_STORAGE_KEY, "true");
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, [pathname]);

    // Subtle auto-hide after 14 seconds on the home page so it doesn't linger indefinitely
    useEffect(() => {
        if (!canInstall || !isHomePage) return;
        const timer = setTimeout(() => {
            setCanInstall(false);
        }, 14000);
        return () => clearTimeout(timer);
    }, [canInstall, isHomePage]);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                setCanInstall(false);
            }
        } catch (err) {
            console.error("Error during PWA installation:", err);
        } finally {
            setDeferredPrompt(null);
            setCanInstall(false);
            localStorage.setItem(PWA_STORAGE_KEY, "true");
        }
    };

    const handleDismiss = () => {
        setCanInstall(false);
        localStorage.setItem(PWA_STORAGE_KEY, "true");
    };

    return (
        <AnimatePresence>
            {isHomePage && canInstall && (
                <motion.aside
                    aria-label="Install Kuttawaala App"
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`fixed ${
                        isPetBhaiActive ? "bottom-[142px] md:bottom-20" : "bottom-24 md:bottom-6"
                    } left-4 md:left-6 right-20 md:right-auto max-w-[calc(100vw-5.5rem)] md:max-w-sm z-40 print:hidden bg-zinc-900/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-white/10 text-white rounded-full px-3.5 py-2 shadow-lg flex items-center gap-3 transition-all duration-300`}
                >
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Kuttawaala"
                            width={28}
                            height={28}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col min-w-0 pr-1">
                        <span className="font-semibold text-xs tracking-tight text-white truncate">
                            Kuttawaala App
                        </span>
                        <span className="text-[11px] text-zinc-400 truncate">
                            Quick access for dog rescue
                        </span>
                    </div>

                    <button
                        onClick={handleInstall}
                        className="inline-flex items-center gap-1 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 px-3 py-1 text-xs font-semibold shadow-sm transition-colors shrink-0 ml-auto"
                    >
                        <span>Install</span>
                        <Download className="w-3 h-3" />
                    </button>

                    <button
                        onClick={handleDismiss}
                        className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
                        aria-label="Dismiss install prompt"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}

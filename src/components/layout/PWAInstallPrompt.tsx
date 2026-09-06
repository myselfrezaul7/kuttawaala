"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

export function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [canInstall, setCanInstall] = useState(false);

    useEffect(() => {
        // Check if user previously dismissed the prompt
        const isDismissed = localStorage.getItem("kuttawaala-pwa-dismissed");
        if (isDismissed) return;

        // Check if app is already installed / standalone
        const isStandalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            (window.navigator as unknown as { standalone?: boolean }).standalone === true;
        if (isStandalone) return;

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setCanInstall(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

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
        }
    };

    const handleDismiss = () => {
        setCanInstall(false);
        localStorage.setItem("kuttawaala-pwa-dismissed", "true");
    };

    return (
        <AnimatePresence>
            {canInstall && (
                <motion.aside
                    aria-label="Install Kuttawaala App"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-40 max-w-sm print:hidden bg-zinc-900/90 dark:bg-zinc-800/90 backdrop-blur-xl border border-white/10 text-white rounded-full px-4 py-2.5 shadow-2xl flex items-center gap-3"
                >
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-amber-500/40 bg-amber-500/10 flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Kuttawaala"
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col min-w-0 pr-1">
                        <span className="font-bold text-xs tracking-tight text-white truncate">
                            Kuttawaala App
                        </span>
                        <span className="text-[11px] text-zinc-400 truncate">
                            Install for offline dog rescue
                        </span>
                    </div>

                    <button
                        onClick={handleInstall}
                        className="inline-flex items-center gap-1 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 px-3 py-1.5 text-xs font-bold shadow-sm transition-all hover:scale-105 shrink-0 ml-auto"
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

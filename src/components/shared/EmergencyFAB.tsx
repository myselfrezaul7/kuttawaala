"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, AlertTriangle, MapPin, Heart, Dog } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EmergencyFAB() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Hide on routes where the FAB is redundant or intrusive
    if (
        pathname === "/report" ||
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname?.startsWith("/admin")
    ) {
        return null;
    }

    const toggleOpen = () => setIsOpen(!isOpen);

    const menuItems = [
        {
            label: "Report Rescue",
            icon: AlertTriangle,
            href: "/report",
            color: "bg-red-600 text-white",
            delay: 0.08
        },
        {
            label: "Find Vet",
            icon: MapPin,
            href: "/find-vet",
            color: "bg-emerald-600 text-white",
            delay: 0.04
        },
        {
            label: "Donate",
            icon: Heart,
            href: "/donate",
            color: "bg-rose-500 text-white",
            delay: 0
        }
    ];

    return (
        <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-2.5 print:hidden">
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay to close on click outside */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/15 backdrop-blur-[1px] z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Items */}
                        <div className="flex flex-col gap-2.5 items-end z-50 mb-1">
                            {menuItems.map((item) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 12, scale: 0.92 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.92 }}
                                    transition={{ duration: 0.18, delay: item.delay }}
                                >
                                    <Link href={item.href} onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 group">
                                        <span className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-stone-200/80 dark:border-zinc-800 text-foreground text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md transition-opacity whitespace-nowrap">
                                            {item.label}
                                        </span>
                                        <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md ${item.color} transition-transform group-hover:scale-105`}>
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                onClick={toggleOpen}
                aria-label={isOpen ? "Close quick rescue menu" : "Open quick rescue menu"}
                aria-expanded={isOpen}
                className={`relative z-50 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg hover:shadow-xl border border-white/15 flex items-center justify-center transition-colors duration-200 ${
                    isOpen
                        ? "bg-zinc-800 text-white"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: isOpen ? 45 : 0 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? (
                    <Plus className="w-6 h-6" />
                ) : (
                    <Dog className="w-6 h-6" />
                )}
            </motion.button>
        </div>
    );
}

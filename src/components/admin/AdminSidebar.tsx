"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    Users, 
    Heart, 
    FileText, 
    Settings, 
    LogOut, 
    Dog, 
    AlertTriangle, 
    Activity, 
    DollarSign, 
    HandHeart,
    Menu,
    X 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { KuttawaalaLogo } from "@/components/shared/KuttawaalaLogo";

export function AdminSidebar() {
    const pathname = usePathname();
    const { signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    // Close mobile drawer on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const links = [
        { href: "/admin", label: "Overview", icon: LayoutDashboard },
        { href: "/admin/applications", label: "Adoptions", icon: FileText },
        { href: "/admin/volunteers", label: "Volunteers", icon: HandHeart },
        { href: "/admin/donations", label: "Donations", icon: DollarSign },
        { href: "/admin/memorials", label: "Memorials", icon: Heart },
        { href: "/admin/reports", label: "Rescue Reports", icon: AlertTriangle },
        { href: "/admin/users", label: "Users", icon: Users },
        { href: "/admin/dogs", label: "Manage Dogs", icon: Dog },
        { href: "/admin/vets", label: "Veterinarians", icon: Activity },
        { href: "/admin/settings", label: "Settings", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Menu Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close admin navigation menu" : "Open admin navigation menu"}
                className="md:hidden fixed top-3 left-4 z-50 p-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-border/50 shadow-md text-foreground hover:bg-secondary transition-colors"
            >
                {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
                    aria-hidden="true"
                />
            )}

            {/* Sidebar / Slide-out Drawer */}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border-r border-white/50 dark:border-zinc-800/50 shadow-2xl md:shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-6 border-b border-border dark:border-zinc-800 flex items-center justify-between">
                    <div>
                        <Link href="/" className="flex items-center gap-2 group" aria-label="Kuttawaala Home">
                            <KuttawaalaLogo className="h-7 sm:h-8" />
                        </Link>
                        <div className="mt-2 text-xs font-bold text-muted-foreground bg-secondary/50 px-2 py-1 rounded inline-block">
                            ADMIN PANEL
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-1.5 rounded-xl text-muted-foreground hover:bg-secondary"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                                    isActive
                                        ? "bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 scale-[1.02]"
                                        : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground hover:scale-[1.02]"
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border dark:border-zinc-800">
                    <button
                        onClick={() => signOut()}
                        className="flex w-full items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}

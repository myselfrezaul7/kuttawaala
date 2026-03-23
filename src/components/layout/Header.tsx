"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Heart, User, LogIn, Dog, Search, MapPin, Users, HelpCircle, LayoutDashboard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

import { useRouter } from "next/navigation";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { MobileBottomNav } from "./MobileBottomNav";

export function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { user, userData, loading } = useAuth();
    const { t } = useLanguage();

    useEffect(() => setMounted(true), []);

    const navLinks = [
        { name: t.nav.home, href: "/" },
        { name: t.nav.adopt, href: "/adopt" },
        { name: t.nav.community, href: "/community" },
        { name: t.nav.findVet, href: "/find-vet" },
        { name: t.nav.report, href: "/report" },
        { name: t.nav.dashboard, href: "/dashboard" },
    ];

    // Conditionally add Admin link
    if (user?.email === "kuttawaala@gmail.com") {
        navLinks.push({ name: "Admin", href: "/admin" });
    }

    const handleSearch = () => {
        setIsSearchOpen(false);
        router.push(`/adopt?query=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <>
            <header className={`fixed top-4 left-0 right-0 z-50 mx-auto max-w-6xl w-[calc(100%-2rem)] transition-all duration-500 ease-out bg-white/50 dark:bg-zinc-900/50 backdrop-blur-2xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[100px] print:hidden`}>
                <div className="px-5 py-2.5 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <img src="/logo.png" alt="Kuttawaala Logo" className="w-8 h-8 object-contain transition-transform group-hover:scale-110" />
                        <span className="text-2xl font-bold font-sans text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
                            KUTTAWAALA
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-foreground/90 dark:text-stone-300 hover:text-primary dark:hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-sm font-medium text-foreground/90 dark:text-stone-300 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" /> {t.nav.search}
                        </button>
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-2 ml-auto">


                        <LanguageToggle />
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 text-muted-foreground dark:text-muted-foreground hover:text-primary transition-colors rounded-full"
                        >
                            {mounted && theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {!loading && (
                            user ? (
                                <Link href="/profile">
                                    <Button variant="ghost" size="sm" className="gap-2 rounded-full text-foreground/90 dark:text-stone-300 hover:bg-muted dark:hover:bg-zinc-800">
                                        {user.photoURL ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full" />
                                        ) : (
                                            <User className="w-5 h-5" />
                                        )}
                                        <span className="max-w-[100px] truncate">{user.displayName?.split(' ')[0] || "User"}</span>
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/login">
                                    <Button variant="outline" size="sm" className="gap-2 rounded-full border-border text-primary hover:text-primary hover:bg-secondary/50">
                                        <LogIn className="w-4 h-4" /> Login
                                    </Button>
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile Menu & Icons */}
                    <div className="md:hidden flex items-center gap-1 ml-auto">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 text-foreground/90 dark:text-stone-300 hover:bg-muted dark:hover:bg-zinc-800 rounded-full transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 text-foreground/90 dark:text-stone-300 hover:bg-muted dark:hover:bg-zinc-800 rounded-full transition-colors"
                        >
                            {mounted && theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute bottom-[calc(100%+12px)] left-0 w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-3xl p-5 flex flex-col gap-4 animate-in slide-in-from-bottom-4 fade-in duration-300 overflow-hidden origin-bottom">
                        
                        {/* Search Bar Trigger */}
                        <button
                            onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
                            className="w-full bg-muted dark:bg-zinc-800 hover:bg-muted/80 text-foreground/80 dark:text-stone-300 p-3 rounded-xl flex items-center justify-between transition-colors border border-border/50"
                        >
                            <span className="font-medium">Search anything...</span>
                            <Search className="w-5 h-5 text-muted-foreground" />
                        </button>

                        <div className="space-y-4 overflow-y-auto max-h-[60vh] pb-2">
                            {/* Explore Group */}
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground dark:text-stone-400 uppercase tracking-wider mb-2 px-2">Explore</h4>
                                <div className="space-y-1">
                                    <Link href="/find-vet" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 dark:hover:bg-zinc-800/50 transition-colors text-foreground font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center"><MapPin className="w-4 h-4" /></div>
                                        Find a Vet
                                    </Link>
                                    <Link href="/community" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 dark:hover:bg-zinc-800/50 transition-colors text-foreground font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center"><Users className="w-4 h-4" /></div>
                                        Community
                                    </Link>
                                    <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 dark:hover:bg-zinc-800/50 transition-colors text-foreground font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center"><HelpCircle className="w-4 h-4" /></div>
                                        FAQ & Guides
                                    </Link>
                                </div>
                            </div>

                            <div className="h-px bg-border/50 w-full" />

                            {/* Account Group */}
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground dark:text-stone-400 uppercase tracking-wider mb-2 px-2">Account</h4>
                                <div className="space-y-1">
                                    {!loading && user && (
                                        <>
                                            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 dark:hover:bg-zinc-800/50 transition-colors text-foreground font-medium">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center"><LayoutDashboard className="w-4 h-4" /></div>
                                                Dashboard
                                            </Link>
                                            <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 dark:hover:bg-zinc-800/50 transition-colors text-foreground font-medium">
                                                <div className="w-8 h-8 rounded-lg bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 flex items-center justify-center"><User className="w-4 h-4" /></div>
                                                My Profile
                                            </Link>
                                            {(user?.email === "kuttawaala@gmail.com" || userData?.role === "admin") && (
                                                <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 dark:hover:bg-zinc-800/50 transition-colors text-foreground font-medium">
                                                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center"><Settings className="w-4 h-4" /></div>
                                                    Admin Panel
                                                </Link>
                                            )}
                                        </>
                                    )}
                                    {!loading && !user && (
                                        <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 dark:hover:bg-zinc-800/50 transition-colors text-foreground font-medium">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><LogIn className="w-4 h-4" /></div>
                                            Login / Register
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Settings Bar */}
                        <div className="flex items-center justify-between px-3 pt-4 border-t border-border/50">
                            <span className="text-muted-foreground dark:text-stone-400 font-bold text-xs uppercase tracking-wider">{t.nav.theme}</span>
                            <div className="flex items-center gap-2">
                                <LanguageToggle />
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="p-2 bg-muted dark:bg-zinc-800 rounded-full hover:bg-muted/80 transition-colors"
                                >
                                    {mounted && theme === 'dark' ? <Sun className="w-4 h-4 text-stone-300" /> : <Moon className="w-4 h-4 text-foreground/80" />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <MobileBottomNav 
                isMenuOpen={isMenuOpen} 
                onMoreTap={() => setIsMenuOpen(!isMenuOpen)} 
            />

            {/* Full Screen Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[100] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-start pt-32 animate-in fade-in duration-200">
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted dark:hover:bg-zinc-800 transition-colors"
                    >
                        <X className="w-8 h-8 text-muted-foreground" />
                    </button>

                    <div className="w-full max-w-2xl px-4 text-center space-y-8">
                        <h2 className="text-3xl font-bold font-heading text-foreground dark:text-white">What are you looking for?</h2>
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/80 w-6 h-6" />
                            <input
                                type="text"
                                placeholder="Search for dogs, vets, or volunteer..."
                                autoFocus
                                className="w-full pl-16 pr-6 py-6 text-xl rounded-2xl bg-muted/30 dark:bg-zinc-900 border-2 border-border/50 dark:border-zinc-800 focus:border-primary focus:ring-0 outline-none transition-all shadow-xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground w-full">
                            {searchQuery ? (
                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                    <button
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            router.push(`/adopt?query=${encodeURIComponent(searchQuery)}`);
                                        }}
                                        className="flex-1 p-6 rounded-2xl bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all text-left flex items-start gap-4 group"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            🐕
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-lg mb-1">Search Adoptions</h3>
                                            <p className="text-muted-foreground line-clamp-1">Find dogs matching "{searchQuery}"</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            router.push(`/find-vet?query=${encodeURIComponent(searchQuery)}`);
                                        }}
                                        className="flex-1 p-6 rounded-2xl bg-secondary hover:bg-secondary/80 border border-border transition-all text-left flex items-start gap-4 group dark:bg-zinc-800 dark:hover:bg-zinc-700"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform dark:bg-zinc-900">
                                            🏥
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-lg mb-1">Search Vets</h3>
                                            <p className="text-muted-foreground line-clamp-1">Find clinics matching "{searchQuery}"</p>
                                        </div>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span>Try searching for:</span>
                                    <button className="text-primary hover:underline" onClick={() => setSearchQuery("Urgent Adoptions")}>Urgent Adoptions</button>
                                    <button className="text-primary hover:underline" onClick={() => setSearchQuery("Vet in Dhaka")}>Vet in Dhaka</button>
                                    <button className="text-primary hover:underline" onClick={() => setSearchQuery("Volunteer")}>Volunteer</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

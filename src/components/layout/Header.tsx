"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Heart, User, LogIn, Dog, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

import { useRouter } from "next/navigation";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { user, loading } = useAuth();
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
            <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-border dark:border-zinc-800 transition-all duration-300">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageToggle />
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 text-muted-foreground dark:text-muted-foreground hover:text-primary transition-colors"
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

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground/90 dark:text-stone-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b border-border shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium p-2 hover:bg-secondary/50 dark:hover:bg-zinc-800 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
                            className="text-lg font-medium p-2 hover:bg-secondary/50 dark:hover:bg-zinc-800 rounded-lg text-left flex items-center gap-2"
                        >
                            <Search className="w-5 h-5" /> Search
                        </button>
                        <div className="h-px bg-border my-2" />
                        <div className="flex justify-between items-center px-2">
                            <span className="text-sm font-medium">{t.nav.theme}</span>
                            <div className="flex items-center gap-2">
                                <LanguageToggle />
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="p-2 bg-muted dark:bg-zinc-800 rounded-full"
                                >
                                    {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full mt-2">Login</Button>
                        </Link>
                    </div>
                )}
            </header>

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

                        <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
                            <span>Try searching for:</span>
                            <button className="text-primary hover:underline">Urgent Adoptions</button>
                            <button className="text-primary hover:underline">Vet in Dhaka</button>
                            <button className="text-primary hover:underline">Volunteer</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

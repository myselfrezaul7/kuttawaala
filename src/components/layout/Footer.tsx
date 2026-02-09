"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, Dog, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-50/50 to-secondary/50 dark:from-transparent dark:via-zinc-900 dark:to-zinc-950" />

            <div className="relative z-10 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    {/* Main footer content with glassmorphism */}
                    <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            {/* Brand */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Dog className="w-8 h-8 text-primary" />
                                    <h3 className="text-2xl font-bold text-foreground dark:text-white">CATWAALA</h3>
                                </div>
                                <p className="text-xs font-semibold text-primary dark:text-primary/80">
                                    Non-Profit Animal Welfare Organization
                                </p>
                                <p className="text-muted-foreground dark:text-muted-foreground/80 text-sm leading-relaxed">
                                    Giving every street dog a chance at a warm lap and a full bowl. Join our mission to care for the purring population.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="font-bold mb-5 text-foreground dark:text-white text-sm uppercase tracking-wider">Quick Links</h4>
                                <ul className="space-y-3">
                                    {[
                                        { href: "/adopt", label: "Adopt a Dog" },
                                        { href: "/report", label: "Report a Stray" },
                                        { href: "/volunteer", label: "Volunteer" },
                                        { href: "/donate", label: "Donate" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-sm text-muted-foreground dark:text-muted-foreground/80 hover:text-primary dark:hover:text-primary/80 transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link
                                            href="https://www.kuttawaala.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-primary hover:text-primary transition-colors inline-flex items-center gap-1"
                                        >
                                            Visit Kuttawaala (Dogs) 🐕
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h4 className="font-bold mb-5 text-foreground dark:text-white text-sm uppercase tracking-wider">Care Resources</h4>
                                <ul className="space-y-3">
                                    {[
                                        { href: "/faq", label: "FAQ" },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-sm text-muted-foreground dark:text-muted-foreground/80 hover:text-primary dark:hover:text-primary/80 transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Connect */}
                            <div>
                                <h4 className="font-bold mb-5 text-foreground dark:text-white text-sm uppercase tracking-wider">Connect</h4>
                                <div className="flex gap-3 mb-5">
                                    <a
                                        href="https://www.facebook.com/kuttawaalaa/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 glass-card rounded-xl text-primary hover:text-white hover:bg-[#1877F2] transition-all duration-300"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/kutta_waala"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 glass-card rounded-xl text-primary hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@kuttawaala"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 glass-card rounded-xl text-primary hover:text-white hover:bg-[#FF0000] transition-all duration-300"
                                    >
                                        <Youtube className="w-5 h-5" />
                                    </a>
                                </div>
                                <div className="space-y-3 text-sm text-muted-foreground dark:text-muted-foreground/80">
                                    <a href="https://www.facebook.com/groups/721498465956239/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors font-medium">
                                        <Facebook className="w-4 h-4 text-primary" />
                                        Join our Community
                                    </a>
                                    <a href="https://www.tiktok.com/@kuttawaala" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                                        Follow on TikTok
                                    </a>
                                    <a href="mailto:kuttawaala@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                                        <Mail className="w-4 h-4 text-primary" />
                                        kuttawaala@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-sm text-muted-foreground dark:text-muted-foreground">
                        <p>&copy; 2025 Kuttawaala. All rights reserved. Made with ❤️ and lots of treats.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

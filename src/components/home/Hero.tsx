"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RemoteConfigService } from "@/services/RemoteConfigService";

export function Hero() {
    return (
        <section className="relative py-12 lg:py-32 flex items-center overflow-hidden bg-background">
            {/* Subtle premium gradient background instead of muddy blobs */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-70" />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div 
                    className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
                >
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                        {RemoteConfigService.isHeroAnnouncementEnabled ? (
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-sm font-semibold text-amber-700 dark:text-amber-400 mb-6 border border-amber-200 dark:border-amber-800/50">
                                <AlertCircle className="w-4 h-4" />
                                {RemoteConfigService.heroAnnouncementText}
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-semibold text-primary mb-6 border border-border">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                Bangladesh&apos;s biggest dog community platform
                            </div>
                        )}
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground dark:text-white leading-[1.1] mb-6 font-heading">
                            Every Dog Deserves a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Loving Home</span>
                        </h1>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                        <p className="text-xl text-muted-foreground dark:text-stone-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Join us in transforming the lives of street dogs in Bangladesh through rescue, care, and adoption.
                        </p>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 w-full sm:w-auto">
                            <Link href="/adopt" className="w-full sm:w-auto">
                                <motion.div whileTap={{ scale: 0.98 }} className="w-full">
                                    <Button size="lg" className="w-full sm:w-auto text-base h-13 sm:h-14 px-8 rounded-2xl shadow-md shadow-primary/15 bg-primary hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5 font-semibold">
                                        Adopt a Dog
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link href="/volunteer" className="w-full sm:w-auto">
                                <motion.div whileTap={{ scale: 0.98 }} className="w-full">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-foreground dark:text-stone-200 text-base h-13 sm:h-14 px-8 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:bg-secondary/50 transition-all duration-200 hover:-translate-y-0.5 font-semibold shadow-sm">
                                        Become a Volunteer
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Hero Newborn Stray Puppy Visual — Subtle & Clean Design */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative order-1 lg:order-2 flex justify-center mb-8 lg:mb-0"
                >
                    <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
                        <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-stone-100 dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(28,25,23,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                            <Image
                                src="/assets/hero-newborn-puppy.jpg"
                                alt="Rescued newborn native Bangladeshi Desi stray puppy resting warmly"
                                fill
                                priority
                                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 420px, 420px"
                                className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 right-4 bg-black/45 backdrop-blur-md text-white/95 px-3 py-1 rounded-full text-xs font-medium tracking-wide border border-white/10">
                                Newborn Street Rescue • Dhaka
                            </div>
                        </div>

                        {/* Subtle Floating Status Badge (positioned outside overflow-hidden so it never clips) */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-4 left-4 sm:-left-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-stone-200/80 dark:border-zinc-800 flex items-center gap-3 z-20"
                        >
                            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-secondary rounded-full flex items-center justify-center text-primary shrink-0">
                                <Heart className="w-4 h-4 fill-current" />
                            </div>
                            <div>
                                <p className="font-bold text-xs sm:text-sm text-foreground dark:text-stone-100 leading-tight">500+ Rescued</p>
                                <p className="text-[11px] text-muted-foreground leading-tight">Since 2020</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

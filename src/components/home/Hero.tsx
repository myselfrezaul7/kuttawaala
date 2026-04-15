"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative py-12 lg:py-32 flex items-center overflow-hidden bg-background">
            {/* Subtle premium gradient background instead of muddy blobs */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-70" />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-semibold text-primary mb-6 border border-border">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Bangladesh&apos;s largest dog rescue community
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground dark:text-white leading-[1.1] mb-6 font-heading">
                            Every Dog Deserves a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Loving Home</span>
                        </h1>
                        <p className="text-xl text-muted-foreground dark:text-stone-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Join us in transforming the lives of street dogs in Bangladesh through rescue, care, and adoption.
                        </p>
                    </motion.div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 w-full sm:w-auto">
                            <Link href="/adopt" className="w-full sm:w-auto">
                                <motion.div whileTap={{ scale: 0.96 }} className="w-full">
                                    <Button size="lg" className="w-full text-lg h-16 sm:h-14 rounded-2xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-transform hover:-translate-y-1">
                                        Adopt a Dog
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link href="/volunteer" className="w-full sm:w-auto text-center">
                                <motion.div whileTap={{ scale: 0.96 }} className="w-full">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-muted-foreground sm:text-primary text-base sm:text-lg h-12 sm:h-14 rounded-2xl border-none sm:border-2 border-border/50 hover:bg-secondary/50 transition-transform sm:hover:-translate-y-1 bg-transparent hover:text-primary underline sm:no-underline">
                                        Become a Volunteer
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>
                </div>

                {/* Hero Illustration/Image Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative order-1 lg:order-2 flex justify-center"
                >
                    <div className="relative w-full max-w-md aspect-[3/4] rounded-t-full rounded-b-[200px] overflow-hidden border-8 border-white/50 dark:border-white/10 shadow-2xl bg-secondary flex items-center justify-center">
                        {/* This would be a real image */}
                        <img
                            src="/hero-community.png"
                            alt="Community caring for dogs in Bangladesh"
                            className="w-full h-full object-cover"
                        />

                        {/* Floating badge */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-6 sm:bottom-20 left-4 sm:-left-6 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md p-2.5 sm:p-4 rounded-full sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 z-20"
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center text-primary shrink-0">
                                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                            </div>
                            <div className="pr-2 sm:pr-0 flex items-center gap-2 sm:block">
                                <p className="font-bold text-sm">500+ Rescued</p>
                                <p className="text-xs text-muted-foreground hidden sm:block">Since 2020</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

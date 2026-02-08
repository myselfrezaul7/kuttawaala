"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-orange-50/50 dark:bg-zinc-900/50">
            {/* Decorative blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-orange-200/30 mix-blend-multiply filter blur-3xl opacity-60 animate-float" />
            <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-amber-200/30 mix-blend-multiply filter blur-3xl opacity-60 animate-float delay-1000" />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-slate-100 leading-[1.1] mb-6 font-heading">
                            Find a Friend <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Save a Life</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Connecting street dogs in Bangladesh with loving homes. Be the hero they need.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Link href="/adopt">
                            <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1">
                                Adopt a Dog
                            </Button>
                        </Link>
                        <Link href="/report">
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all">
                                Report a Stray
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Image/Hero Content - Placeholder for right side if previously existing */}
                <div className="order-1 lg:order-2 relative">
                    {/* Add image or graphic if needed/available */}
                </div>
            </div>
        </section>
    );
}

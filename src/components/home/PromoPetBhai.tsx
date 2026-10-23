"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";

export function PromoPetBhai() {
    return (
        <section className="py-10 md:py-16 relative overflow-hidden bg-stone-50/70 dark:bg-zinc-900/40">
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-purple-950/90 border border-purple-500/20 rounded-3xl p-8 sm:p-10 md:p-12 overflow-hidden shadow-lg text-white">
                    {/* Subtle Ambient Glow */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Main Content inside One Clean Card */}
                    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-4 sm:space-y-5">
                        {/* Tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/25 text-purple-300 text-xs font-semibold"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                            Official E-Commerce Partner
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 }}
                            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight"
                        >
                            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300">PetBhai.com</span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-sm sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed"
                        >
                            Everything your rescued pup needs—trusted nutrition, collars, and care essentials delivered across Bangladesh.
                        </motion.p>

                        {/* Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.22 }}
                            className="pt-2 w-full sm:w-auto"
                        >
                            <a
                                href="https://www.petbhai.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-sm sm:text-base hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Explore PetBhai Shop
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { Hero } from "@/components/home/Hero";
import { FeaturedDogs } from "@/components/home/FeaturedDogs";
import { PromoPetBhai } from "@/components/home/PromoPetBhai";
import { SuccessStories } from "@/components/home/SuccessStories";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Heart, Users, Stethoscope, ArrowRight, ShieldAlert, Home as HomeIcon, Cat } from "lucide-react";
import { motion } from "framer-motion";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";


export default function Home() {

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Hero />

            {/* Featured Dogs Section */}
            <section className="py-12 md:py-20 bg-secondary/20 dark:bg-stone-900/20">
                <FeaturedDogs />
            </section>

            {/* PetBhai Integration Promo */}
            <PromoPetBhai />

            {/* Success Stories Ticker */}
            <SuccessStories />

            {/* Transformations Section */}
            <section className="py-12 md:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10 md:mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold text-xs uppercase tracking-wider mb-5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Real Life Miracles</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading tracking-tight">
                            Incredible <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">Transformations</span>
                        </h2>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            See the difference love, medical care, and a warm home can make. Drag the slider to see how we change lives, one dog at a time.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
                            <div className="order-2 md:order-1 space-y-6">
                                <motion.div 
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.45 }}
                                    viewport={{ once: true }}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                                            <ShieldAlert className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground">The Rescue</h3>
                                            <p className="text-sm text-muted-foreground">Found abandoned with severe skin issues.</p>
                                        </div>
                                    </div>
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        whileInView={{ height: 36 }}
                                        transition={{ duration: 0.4, delay: 0.2 }}
                                        viewport={{ once: true }}
                                        className="w-px bg-border ml-5"
                                    />
                                    <motion.div 
                                        initial={{ opacity: 0, y: 8 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.45, delay: 0.35 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                            <HomeIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground">The Recovery</h3>
                                            <p className="text-sm text-muted-foreground">After 3 months of medical care and love.</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                                <motion.div 
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: 0.5 }}
                                    viewport={{ once: true }}
                                    className="bg-stone-50 dark:bg-zinc-900/60 p-6 rounded-2xl border border-stone-200/80 dark:border-zinc-800/80 shadow-sm relative overflow-hidden"
                                >
                                    <p className="italic text-muted-foreground text-sm sm:text-base leading-relaxed relative z-10">&ldquo;Max was scared of his own shadow. Now he&apos;s the king of our sofa!&rdquo;</p>
                                    <p className="font-semibold text-sm mt-3 text-foreground relative z-10">— Sarah, Adopter</p>
                                </motion.div>
                            </div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="order-1 md:order-2 h-[300px] md:h-[460px] rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 dark:border-zinc-800"
                            >
                                <BeforeAfterSlider
                                    beforeImage="/images/resi-before.png"
                                    afterImage="/images/resi-after.png"
                                    beforeLabel="Rescued"
                                    afterLabel="Adopted"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Visit Catwaala Section */}
            <section className="py-4 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    {/* Companion Chip */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex justify-center -mt-2 mb-4"
                    >
                        <a href="https://catwaala.com" target="_blank" rel="noopener noreferrer"
                           className="group flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-stone-200/80 dark:border-zinc-800/80 hover:border-teal-500/40 dark:hover:border-teal-500/40 transition-all shadow-sm hover:shadow-md">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                                <Cat className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0 pr-2">
                                <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Also love cats?</span>
                                <span className="text-sm font-semibold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center gap-1.5">
                                    Visit Catwaala 
                                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all duration-200" />
                                </span>
                            </div>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 md:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider mb-5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Our Impact</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-foreground font-heading tracking-tight">
                            Our Mission
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 md:mb-14 leading-relaxed max-w-2xl mx-auto">
                            We are dedicated to improving the lives of street dogs in Bangladesh through rescue, rehabilitation, and adoption programs.
                        </p>
                    </motion.div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 sm:pb-0 sm:grid sm:grid-cols-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                        {[
                            { icon: Heart, count: "500+", label: "Dogs Rescued", color: "text-rose-500", bg: "bg-rose-500/10 border-rose-500/20" },
                            { icon: Users, count: "200+", label: "Adoptions", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
                            { icon: Stethoscope, count: "50+", label: "Vet Camps", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" }
                        ].map((stat, index) => (
                            <motion.div 
                                key={index} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="min-w-[75%] sm:min-w-0 snap-center flex-shrink-0 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 hover:-translate-y-1 transition-all duration-300 border border-stone-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md"
                            >
                                <div className={`w-12 h-12 rounded-2xl border ${stat.bg} flex items-center justify-center mx-auto mb-4`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <span className="block text-3xl md:text-4xl font-bold text-foreground mb-1.5 tracking-tight">{stat.count}</span>
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto border border-stone-200/80 dark:border-zinc-800/80 shadow-sm"
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-xs font-semibold mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Over 500+ dogs rescued and counting
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4 font-heading tracking-tight">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-base sm:text-lg text-muted-foreground dark:text-stone-400 mb-8 max-w-xl mx-auto leading-relaxed">
                            Join our community of dog lovers and help us create a safer, kinder world for street dogs in Bangladesh.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
                            <Link href="/adopt" className="w-full sm:w-auto">
                                <Button size="lg" className="h-12 md:h-13 px-7 w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                                    Adopt a Dog
                                </Button>
                            </Link>
                            <Link href="/volunteer" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="h-12 md:h-13 px-7 w-full rounded-xl border border-stone-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800 text-stone-700 dark:text-stone-200 font-semibold text-base hover:-translate-y-0.5 transition-all duration-200 bg-white dark:bg-zinc-900">
                                    Become a Volunteer
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

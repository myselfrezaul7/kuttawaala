"use client";

import { Hero } from "@/components/home/Hero";
import { SuccessStories } from "@/components/home/SuccessStories";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Heart, Users, Stethoscope, ArrowRight, Cat } from "lucide-react";
import { motion } from "framer-motion";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";


export default function Home() {

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Hero />

            {/* Success Stories Ticker */}
            <SuccessStories />

            {/* Transformations Section */}
            <section className="py-12 md:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10 md:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-sm mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>Real Life Miracles</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
                            Incredible <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Transformations</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            See the difference love, care, and a warm home can make. Slide to see how we change lives, one dog at a time.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">🏚️</div>
                                        <div>
                                            <h3 className="text-xl font-bold">The Rescue</h3>
                                            <p className="text-muted-foreground">Found abandoned with severe skin issues.</p>
                                        </div>
                                    </div>
                                    <div className="w-0.5 h-12 bg-border ml-6"></div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">🏡</div>
                                        <div>
                                            <h3 className="text-xl font-bold">The Recovery</h3>
                                            <p className="text-muted-foreground">After 3 months of medical care and love.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                                    <p className="italic text-muted-foreground">"Max was scared of his own shadow. Now he's the king of our sofa!"</p>
                                    <p className="font-bold mt-2 text-right">- Sarah, Adopter</p>
                                </div>
                            </div>

                            <div className="order-1 md:order-2 h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-500/10 border-4 border-white dark:border-stone-800">
                                <BeforeAfterSlider
                                    beforeImage="/images/resi-before.png"
                                    afterImage="/images/resi-after.png"
                                    beforeLabel="Rescued"
                                    afterLabel="Adopted"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Visit Catwaala Section */}
            <section className="py-4 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    {/* Companion Chip */}
                    <div className="flex justify-center -mt-4 mb-4">
                        <a href="https://catwaala.com" target="_blank" rel="noopener noreferrer"
                           className="group flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200/50 dark:border-teal-800/30 hover:border-teal-300 dark:hover:border-teal-700 transition-all shadow-sm hover:shadow-md">
                            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center shrink-0 border border-teal-200/50 dark:border-teal-800/50 text-xl sm:text-2xl group-hover:scale-105 transition-transform">
                                🐈
                            </div>
                            <div className="flex-1 min-w-0 pr-4">
                                <span className="block text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Also love cats?</span>
                                <span className="block text-sm sm:text-base font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center gap-1">
                                    Visit Catwaala 
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-teal-500" />
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 md:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 mb-10 rotate-3">
                        <Sparkles className="w-10 h-10 text-primary" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground font-heading tracking-tight">
                        Our Mission
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-20 leading-relaxed max-w-3xl mx-auto">
                        We are dedicated to improving the lives of street dogs in Bangladesh through rescue, rehabilitation, and adoption programs.
                    </p>

                    <div className="grid grid-cols-3 gap-3 md:gap-8">
                        {[
                            { icon: Heart, count: "500+", label: "Dogs Rescued", color: "text-rose-500", bg: "bg-rose-500/10" },
                            { icon: Users, count: "200+", label: "Adoptions", color: "text-blue-500", bg: "bg-blue-500/10" },
                            { icon: Stethoscope, count: "50+", label: "Vet Camps", color: "text-emerald-500", bg: "bg-emerald-500/10" }
                        ].map((stat, index) => (
                            <div key={index} className="glass-card rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-10 hover:translate-y-[-5px] transition-transform duration-300 border border-border mt-4">
                                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-3 md:mb-6`}>
                                    <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
                                </div>
                                <span className="block text-2xl md:text-5xl font-bold text-foreground mb-1 md:mb-3 tracking-tight">{stat.count}</span>
                                <span className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-wider md:tracking-widest">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-24 text-center max-w-5xl mx-auto border border-white/50 dark:border-zinc-800 shadow-2xl"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-stone-800 dark:text-stone-100 mb-8 font-heading">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-xl text-muted-foreground dark:text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Join our community of dog lovers and help us create a better world for stray dogs in Bangladesh.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/adopt">
                                <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
                                    Adopt a Dog
                                </Button>
                            </Link>
                            <Link href="/volunteer">
                                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-2 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-zinc-800 text-stone-700 dark:text-stone-200 font-bold text-xl hover:-translate-y-1 transition-all duration-300">
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

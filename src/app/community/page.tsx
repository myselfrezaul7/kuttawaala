"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Star, ChevronRight, Users, Facebook, FileText } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { resources } from "@/data/resources";

export default function CommunityPage() {
    return (
        <div className="flex flex-col min-h-screen bg-stone-50/50 dark:bg-zinc-950 transition-colors duration-300">
            <div className="flex-1 pb-24">
                {/* Hero Section */}
                <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-secondary/30 dark:bg-zinc-900/50 border-b border-stone-200/70 dark:border-zinc-800/80 mb-14 md:mb-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                    <div className="container mx-auto text-center relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-stone-200/80 dark:border-zinc-700 text-primary text-xs font-semibold mb-6">
                            <Users className="w-3.5 h-3.5" />
                            <span>17,000+ Members Strong</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-heading text-foreground mb-5 leading-tight tracking-tight">
                            Kuttawaala Community <span className="text-primary">Hub</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                            Join our pack of dog lovers in Dhaka. From adoption drives to vaccination camps, connect with rescuers and caregivers across Bangladesh.
                        </p>

                        <a
                            href="https://www.facebook.com/groups/721498465956239"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold py-3.5 px-7 rounded-xl shadow-sm hover:-translate-y-0.5 transition-all duration-200 group text-sm sm:text-base"
                        >
                            <Facebook className="w-4 h-4 fill-current" />
                            <span>Visit Facebook Community</span>
                            <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </div>
                </section>

                <div className="container mx-auto px-4 max-w-6xl space-y-16 md:space-y-20">
                    {/* Upcoming Events */}
                    <section>
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-heading tracking-tight mb-1.5">Upcoming Events</h2>
                                <p className="text-sm sm:text-base text-muted-foreground">Mark your calendars for community drives and gatherings.</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 text-center border border-stone-200/80 dark:border-zinc-800/80 shadow-sm relative overflow-hidden">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-5">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Events Schedule Updating</h3>
                            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-6">
                                We are organizing our upcoming vaccination drives, feeding programs, and adoption meetups. Stay tuned for dates!
                            </p>
                            <Button disabled variant="outline" className="opacity-60 cursor-not-allowed rounded-xl px-6 h-11 font-semibold text-sm">
                                Schedule Announcing Soon
                            </Button>
                        </div>
                    </section>

                    {/* Volunteer Spotlight */}
                    <section className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 border border-stone-200/80 dark:border-zinc-800/80 relative overflow-hidden shadow-sm text-center">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                Volunteer of the Month
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                                Meet Ruksath Hoqe
                            </h2>
                            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
                                Ruksath has been a dedicated member of our community, helping organize feeding drives and coordinate emergency street rescues across Dhaka.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <div className="bg-stone-50 dark:bg-zinc-800/60 px-5 py-3 rounded-2xl border border-stone-200/70 dark:border-zinc-700/60 text-center min-w-[110px]">
                                    <span className="block text-2xl font-bold text-foreground">50+</span>
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Rescues</span>
                                </div>
                                <div className="bg-stone-50 dark:bg-zinc-800/60 px-5 py-3 rounded-2xl border border-stone-200/70 dark:border-zinc-700/60 text-center min-w-[110px]">
                                    <span className="block text-2xl font-bold text-foreground">3 yrs</span>
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Service</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Resources */}
                    <section>
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-heading tracking-tight mb-2">Canine Care Guides</h2>
                            <p className="text-sm sm:text-base text-muted-foreground">Practical guides on diet, health, and caring for native Deshi dogs.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {resources.map((resource) => {
                                const badgeColor = {
                                    "blue": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
                                    "amber": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
                                    "teal": "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
                                }[resource.color] || "bg-stone-100 text-stone-600 dark:bg-zinc-800 dark:text-stone-400 border-stone-200";

                                const iconBgColor = {
                                    "blue": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
                                    "amber": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                                    "teal": "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20",
                                }[resource.color] || "bg-stone-100 text-stone-500";

                                return (
                                    <motion.div
                                        key={resource.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.4 }}
                                        className="h-full block"
                                    >
                                        <Link
                                            href={resource.slug === "emergency-vet-list" ? "/find-vet" : `/resources/${resource.slug}`}
                                            className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-md transition-all duration-200 border border-stone-200/80 dark:border-zinc-800/80 overflow-hidden flex flex-col h-full hover:-translate-y-0.5"
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBgColor}`}>
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div className={`text-xs font-semibold px-3 py-1 rounded-full border ${badgeColor}`}>
                                                    {resource.badge}
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
                                            <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-1">{resource.description}</p>

                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100 dark:border-zinc-800/70">
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    {resource.readTime}
                                                </span>
                                                <span className="text-foreground font-semibold text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-transform group-hover:text-primary">
                                                    Read Guide <ChevronRight className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="text-center py-6">
                        <p className="text-xl font-bold text-foreground mb-5">Want to join the volunteer pack?</p>
                        <Link href="/volunteer">
                            <Button className="h-12 px-7 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-sm hover:-translate-y-0.5 transition-all">
                                Become a Volunteer
                            </Button>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
}

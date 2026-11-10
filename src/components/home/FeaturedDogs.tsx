"use client";

import { useEffect, useState } from "react";
import { DogService } from "@/services/DogService";
import { PetCard } from "@/components/shared/PetCard";
import { Dog, dogs as mockDogs } from "@/data/dogs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Facebook, Search, HeartHandshake, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const FB_GROUP_URL = "https://www.facebook.com/groups/721498465956239/";
const FB_PAGE_URL = "https://www.facebook.com/kuttawaalaa/";

export function FeaturedDogs() {
    const [featuredDogs, setFeaturedDogs] = useState<Dog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const allDogs = await DogService.getAll();
                // Ensure featured dogs list is populated
                setFeaturedDogs(allDogs && allDogs.length > 0 ? allDogs.slice(0, 3) : mockDogs.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch featured dogs", error);
                setFeaturedDogs(mockDogs.slice(0, 3));
            } finally {
                setIsLoading(false);
            }
        };

        fetchDogs();
    }, []);

    if (isLoading) {
        return <div className="text-center py-12">Loading featured stars...</div>;
    }

    return (
        <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-14 gap-6">
                <div className="space-y-3 sm:space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider">
                        <span>Forever Homes Found</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-white leading-tight">
                        Recently Adopted <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Stars</span>
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground dark:text-muted-foreground/80 leading-relaxed">
                        All our featured rescue pups have happily found their loving forever families! Looking to adopt a dog, or have a rescued pup you need to rehome? Connect directly with rescuers and adopters in our Facebook community.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <a
                        href={FB_GROUP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                    >
                        <Button className="w-full sm:w-auto justify-center gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-sm sm:text-base font-semibold rounded-2xl px-6 h-12 shadow-sm transition-all hover:-translate-y-0.5">
                            <Facebook className="w-4 h-4 fill-current" />
                            <span>Join Adoption Community</span>
                        </Button>
                    </a>
                    <Link href="/adopt" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto justify-between sm:justify-center gap-2 border-stone-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-foreground hover:bg-secondary/50 text-sm sm:text-base font-semibold rounded-2xl px-5 h-12 shadow-sm">
                            <span>Adoption Hub</span> <ArrowRight className="w-4 h-4 text-primary" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Adopted Dogs Grid */}
            <motion.div 
                variants={{
                    hidden: {},
                    show: {
                        transition: {
                            staggerChildren: 0.06
                        }
                    }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "10%" }}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch"
            >
                {featuredDogs.map((dog) => (
                    <div key={dog.id} className="min-w-[85%] sm:min-w-0 snap-center flex-shrink-0 flex flex-col h-full">
                        {/* @ts-ignore */}
                        <PetCard dog={dog} />
                    </div>
                ))}
            </motion.div>

            {/* Adopt or Give for Adoption - Community Rehoming Pathways */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 sm:mt-14 bg-gradient-to-br from-stone-50 via-white to-orange-50/30 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-800/40 border border-stone-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm"
            >
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                    <h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight mb-2">
                        Adopt a Dog or Give One for Adoption
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Kuttawaala connects individual rescuers, fosters, and adopters across Bangladesh. Choose your pathway below to get started in our community:
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                    {/* Pathway 1: Want to Adopt */}
                    <div className="bg-white dark:bg-zinc-800/80 rounded-2xl p-6 border border-stone-200/70 dark:border-zinc-700/60 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                                <Search className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold font-heading text-foreground">
                                Looking to Adopt a Dog?
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Rescuers across Dhaka, Chattogram, and 64 districts post newly rescued puppies and dogs looking for loving families every day. Connect directly with the rescuer to adopt.
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1.5 pt-1">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Direct communication with rescuers &amp; fosters
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    100% free adoption — Adopt, Don&apos;t Shop
                                </li>
                            </ul>
                        </div>
                        <a
                            href={FB_GROUP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-11 text-sm gap-2">
                                <Facebook className="w-4 h-4 fill-current" />
                                <span>Browse Rescues to Adopt</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                        </a>
                    </div>

                    {/* Pathway 2: Want to Rehome / Put for Adoption */}
                    <div className="bg-white dark:bg-zinc-800/80 rounded-2xl p-6 border border-stone-200/70 dark:border-zinc-700/60 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                                <HeartHandshake className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold font-heading text-foreground">
                                Need to Rehome a Rescue Dog?
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Did you rescue a street dog or newborn pup and need a permanent home? Post your adoption plea in our 17K+ active community to find vetted, responsible adopters.
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1.5 pt-1">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                    Reach 17,000+ passionate dog lovers in BD
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                    Follow community adoption agreement standards
                                </li>
                            </ul>
                        </div>
                        <a
                            href={FB_GROUP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <Button variant="outline" className="w-full border-stone-200 dark:border-zinc-700 hover:bg-secondary/50 text-foreground font-semibold rounded-xl h-11 text-sm gap-2">
                                <Facebook className="w-4 h-4 text-[#1877F2] fill-current" />
                                <span>Post Rehoming Request</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Direct Page Message Support */}
                <div className="mt-6 pt-5 border-t border-stone-200/60 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-muted-foreground">
                    <span>
                        Need guidance on rescue, vet emergencies, or rehoming? Our volunteers are here to help.
                    </span>
                    <a
                        href={FB_PAGE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
                    >
                        <span>Message Our Official Page</span>
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </motion.div>
        </div>
    );
}

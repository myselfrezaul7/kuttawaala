"use client";

import { useEffect, useState } from "react";
import { DogService } from "@/services/DogService";
import { PetCard } from "@/components/shared/PetCard";
import { Dog, dogs as mockDogs } from "@/data/dogs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturedDogs() {
    const [featuredDogs, setFeaturedDogs] = useState<Dog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const allDogs = await DogService.getAll();
                setFeaturedDogs(allDogs.slice(0, 3));
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
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-14 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-white leading-tight">
                        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/90">Stars</span>
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground dark:text-muted-foreground/80 max-w-md">
                        These adorable dogs are looking for their forever homes. Give them a chance at happiness.
                    </p>
                </div>
                <Link href="/adopt" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto justify-between sm:justify-center gap-2 border-primary/20 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-primary hover:bg-secondary/50 text-sm sm:text-base font-semibold rounded-full px-5 sm:px-6 h-12 shadow-sm">
                        View All Dogs <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                </Link>
            </div>

            <motion.div 
                variants={{
                    hidden: {},
                    show: {
                        transition: {
                            staggerChildren: 0.1
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
        </div>
    );
}

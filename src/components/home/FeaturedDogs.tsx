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
                const allDogs = await DogService.getAllDogs();
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
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white leading-tight">
                        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/90">Stars</span>
                    </h2>
                    <p className="text-lg text-muted-foreground dark:text-muted-foreground/80 max-w-md">
                        These adorable dogs are looking for their forever homes. Give them a chance at happiness.
                    </p>
                </div>
                <Link href="/adopt">
                    <Button variant="ghost" className="gap-2 text-primary hover:text-primary hover:bg-secondary/50 dark:hover:bg-secondary/10 text-base font-semibold rounded-full px-6">
                        View All Dogs <ArrowRight className="w-5 h-5" />
                    </Button>
                </Link>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {featuredDogs.map((dog, index) => (
                    <div key={dog.id} className="min-w-[85%] sm:min-w-0 snap-center flex-shrink-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full"
                        >
                            {/* @ts-ignore */}
                            <PetCard dog={dog} />
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { DogService } from "@/services/DogService";
import { PetCard } from "@/components/shared/PetCard";
import { Dog, dogs as mockDogs } from "@/data/dogs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
                    <Button variant="ghost" className="gap-2 text-primary hover:text-primary hover:bg-secondary/50 dark:hover:bg-secondary/500/10 text-base font-semibold rounded-full px-6">
                        View All Dogs <ArrowRight className="w-5 h-5" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {featuredDogs.map((dog) => (
                    // @ts-ignore
                    <PetCard key={dog.id} dog={dog} />
                ))}
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Sparkles, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { motion } from "framer-motion";
import { type Dog as DogType } from "@/data/dogs";

interface DogProps extends DogType { }

export function PetCard({ dog }: { dog: DogProps }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(dog.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-card rounded-[2rem] overflow-hidden border border-border shadow-lg hover:shadow-xl transition-all duration-500"
        >
            <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                    src={dog.imageUrl}
                    alt={dog.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Sophisticated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Favorite button with glass effect */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(dog.id);
                    }}
                    className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 ${favorite
                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                        : "bg-black/20 text-white hover:bg-white/20 hover:scale-110"
                        }`}
                >
                    <Heart className={`w-5 h-5 transition-transform duration-300 ${favorite ? "fill-current" : ""}`} />
                </button>

                {/* Tag badge with glass effect */}
                {dog.tag && (
                    <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg border border-white/10 ${dog.tag === 'Urgent'
                        ? 'bg-rose-500/90 text-white shadow-rose-500/20'
                        : dog.tag === 'New'
                            ? 'bg-blue-500/90 text-white shadow-blue-500/20'
                            : 'bg-emerald-500/90 text-white shadow-emerald-500/20'
                        }`}>
                        {dog.tag}
                    </span>
                )}

                {/* Dog info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-3xl font-bold mb-2 tracking-tight">
                        {dog.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{dog.location}</span>
                    </div>
                </div>
            </div>

            {/* Card content */}
            <div className="p-5 bg-card space-y-4">
                <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/80 bg-secondary/50 px-4 py-2 rounded-xl">
                        <Dog className="w-4 h-4 text-primary" />
                        {dog.breed}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium bg-muted/30 px-3 py-2 rounded-xl">
                        {dog.age}
                    </span>
                </div>

                <Link href={`/adopt/${dog.id}`} className="block">
                    <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-lg shadow-primary/20 transition-all duration-300 group-hover:translate-y-[-2px]">
                        Meet {dog.name}
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}

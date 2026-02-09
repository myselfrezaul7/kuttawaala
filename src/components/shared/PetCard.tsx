"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { motion } from "framer-motion";

interface CatProps {
    id: string;
    name: string;
    breed: string;
    age: string;
    location: string;
    imageUrl: string;
    tag: string | null;
}

export function PetCard({ dog }: { dog: CatProps }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(dog.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group glass-card rounded-[28px] overflow-hidden transition-all duration-500"
        >
            <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                    src={dog.imageUrl}
                    alt={dog.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Sophisticated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Favorite button with glass effect */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(dog.id);
                    }}
                    className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-xl transition-all duration-300 ${favorite
                            ? "bg-secondary/500/90 text-white shadow-lg shadow-secondary0/30"
                            : "bg-white/20 text-white hover:bg-secondary/500/80 hover:shadow-lg hover:shadow-secondary0/20"
                        }`}
                >
                    <Heart className={`w-5 h-5 transition-transform duration-300 ${favorite ? "fill-current scale-110" : "group-hover:scale-110"}`} />
                </button>

                {/* Tag badge with glass effect */}
                {dog.tag && (
                    <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg ${dog.tag === 'Urgent'
                            ? 'bg-secondary/500/90 text-white shadow-secondary0/30'
                            : dog.tag === 'New'
                                ? 'bg-indigo-500/90 text-white shadow-indigo-500/30'
                                : 'bg-emerald-500/90 text-white shadow-emerald-500/30'
                        }`}>
                        {dog.tag}
                    </span>
                )}

                {/* Dog info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {dog.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{dog.location}</span>
                    </div>
                </div>
            </div>

            {/* Card content with glass effect */}
            <div className="p-5 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-primary dark:text-primary/80 bg-secondary/80 dark:bg-secondary/500/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                        {dog.breed}
                    </span>
                    <span className="text-sm text-muted-foreground dark:text-muted-foreground font-medium">
                        {dog.age}
                    </span>
                </div>

                <Link href={`/adopt/${dog.id}`}>
                    <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary text-white font-semibold shadow-lg shadow-secondary0/25 hover:shadow-secondary0/40 transition-all duration-300">
                        <span>Meet {dog.name}</span>
                        <Sparkles className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}

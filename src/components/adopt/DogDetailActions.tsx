"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { ShareModal } from "@/components/shared/ShareModal";

interface DogDetailActionsProps {
    dog: {
        id: string;
        name: string;
        breed?: string;
        age?: string;
        location?: string;
    };
}

export function DogDetailActions({ dog }: DogDetailActionsProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const [isShareOpen, setIsShareOpen] = useState(false);
    const favorite = isFavorite(dog.id);

    const shareUrl = typeof window !== "undefined"
        ? window.location.href
        : `https://www.kuttawaala.com/adopt/${dog.id}`;

    return (
        <>
            <div className="absolute top-4 right-4 flex gap-2 z-10">
                {/* Favorite Heart Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(dog.id);
                    }}
                    aria-label={favorite ? "Remove from favorites" : "Save to favorites"}
                    className={`p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                        favorite
                            ? "bg-rose-500 text-white shadow-rose-500/30 scale-105"
                            : "bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 hover:text-rose-500 hover:scale-105"
                    }`}
                >
                    <Heart className={`w-5 h-5 transition-transform ${favorite ? "fill-current" : ""}`} />
                </button>

                {/* Share Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsShareOpen(true);
                    }}
                    aria-label={`Share ${dog.name}'s profile`}
                    className="p-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full shadow-md text-zinc-700 dark:text-zinc-300 hover:text-primary hover:scale-105 transition-all"
                >
                    <Share2 className="w-5 h-5" />
                </button>
            </div>

            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                title={`Adopt ${dog.name} | Kuttawaala`}
                text={`Meet ${dog.name} (${dog.breed || "Desi Dog"}, ${dog.age || "Young"}), looking for a forever home in ${dog.location || "Bangladesh"}! 🐾`}
                url={shareUrl}
            />
        </>
    );
}

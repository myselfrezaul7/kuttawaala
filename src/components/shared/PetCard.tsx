"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Dog, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { motion } from "framer-motion";
import { type Dog as DogType } from "@/data/dogs";
import { ShareModal } from "@/components/shared/ShareModal";

import { resolveDogImage } from "@/utils/imageFallback";

interface DogProps extends DogType { }

export function PetCard({ dog }: { dog: DogProps }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState(() => resolveDogImage(dog.imageUrl));
    const favorite = isFavorite(dog.id);

    const shareUrl = typeof window !== "undefined"
        ? `${window.location.origin}/adopt/${dog.id}`
        : `https://www.kuttawaala.com/adopt/${dog.id}`;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
            }}
            whileHover={{ y: -4 }}
            className="group relative bg-card rounded-2xl md:rounded-3xl overflow-hidden border border-stone-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
        >
            <div className="relative aspect-[4/5] overflow-hidden shrink-0">
                <Image
                    src={imgSrc}
                    alt={dog.name}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => setImgSrc("/assets/dog_success_1.png")}
                />
                {/* Sophisticated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                {/* Action buttons: Share & Favorite with glass effect */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsShareOpen(true);
                        }}
                        aria-label={`Share ${dog.name}'s profile`}
                        className="p-2.5 rounded-full backdrop-blur-md border border-white/15 bg-black/25 text-white hover:bg-white/20 transition-all duration-200"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(dog.id);
                        }}
                        aria-label={favorite ? "Remove from favorites" : "Save to favorites"}
                        className={`p-2.5 rounded-full backdrop-blur-md border border-white/15 transition-all duration-200 ${favorite
                            ? "bg-rose-500 text-white shadow-sm"
                            : "bg-black/25 text-white hover:bg-white/20"
                            }`}
                    >
                        <Heart className={`w-4 h-4 transition-transform duration-200 ${favorite ? "fill-current" : ""}`} />
                    </button>
                </div>

                {/* Tag badge with glass effect */}
                {dog.tag && (
                    <span className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm border border-white/15 ${dog.tag === 'Urgent'
                        ? 'bg-rose-500/90 text-white'
                        : dog.tag === 'New'
                            ? 'bg-blue-500/90 text-white'
                            : 'bg-emerald-500/90 text-white'
                        }`}>
                        {dog.tag}
                    </span>
                )}

                {/* Dog info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-lg md:text-2xl font-bold mb-1 tracking-tight truncate">
                        {dog.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm font-medium">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate">{dog.location}</span>
                    </div>
                </div>
            </div>

            {/* Card content */}
            <div className="p-4 md:p-5 bg-card space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-foreground/80 bg-secondary/50 px-3 py-1.5 rounded-xl truncate max-w-[62%]">
                        <Dog className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate">{dog.breed}</span>
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium bg-muted/40 px-2.5 py-1.5 rounded-xl whitespace-nowrap">
                        {dog.age}
                    </span>
                </div>

                <Link href={`/adopt/${dog.id}`} className="block mt-auto pt-1">
                    <Button className="w-full h-10 md:h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200">
                        Meet {dog.name}
                    </Button>
                </Link>
            </div>

            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                title={`Adopt ${dog.name} | Kuttawaala`}
                text={`Meet ${dog.name} (${dog.breed}, ${dog.age}), looking for a forever home in ${dog.location}! 🐾`}
                url={shareUrl}
            />
        </motion.div>
    );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dog } from "@/data/dogs"; // Assuming a type exists, or I'll infer
import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PetCardProps {
    cat: any; // Using 'cat' prop name to match page.tsx usage, though it's a dog
}

export function PetCard({ cat }: PetCardProps) {
    return (
        <div className="group relative bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                        {cat.gender}
                    </span>
                </div>

                {/* Like Button */}
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors border border-white/20">
                    <Heart className="w-5 h-5" />
                </button>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <h3 className="text-2xl font-bold font-heading mb-1">{cat.name}</h3>
                            <div className="flex items-center gap-2 text-white/80 text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>{cat.location || "Dhaka"}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="block text-xl font-bold text-orange-400">{cat.age}</span>
                            <span className="text-xs text-white/60">Age</span>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-6">
                        {cat.attributes?.slice(0, 2).map((attr: string) => (
                            <span key={attr} className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm text-xs border border-white/10">
                                {attr}
                            </span>
                        ))}
                    </div>

                    <Link href={`/adopt/${cat.id}`} className="block">
                        <Button className="w-full bg-white/90 text-slate-900 hover:bg-white hover:scale-[1.02] transition-all font-bold rounded-xl border-none">
                            Adopt Me
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

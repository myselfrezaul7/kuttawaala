"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Quote, Flame, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Memorial } from "@/services/server-data";
import { MemorialService } from "@/services/MemorialService";
import { MemorialModal } from "./MemorialModal";
import { SkeletonGrid } from "@/components/shared/SkeletonCard";
import { DataErrorState } from "@/components/shared/DataErrorState";

const DEFAULT_MEMORIALS: Memorial[] = [
    {
        id: "demo-1",
        pet_name: "Sheru",
        image_url: "/assets/dog_memorial_1.png",
        tribute: "You were the bravest little lion. The streets of Dhanmondi miss your happy barks.",
        owner_name: "Rahim",
        created_at: new Date().toISOString(),
        status: "Approved",
    },
    {
        id: "demo-2",
        pet_name: "Bhulu",
        image_url: "/assets/dog_memorial_2.png",
        tribute: "Run free across the rainbow bridge, my sweet Bhulu. No more pain now.",
        owner_name: "Tania",
        created_at: new Date().toISOString(),
        status: "Approved",
    },
    {
        id: "demo-3",
        pet_name: "Lali",
        image_url: "/assets/dog_memorial_3.png",
        tribute: "Our neighborhood guard and best friend. You will never be forgotten.",
        owner_name: "Sector 4 Residents",
        created_at: new Date().toISOString(),
        status: "Approved",
    },
    {
        id: "demo-4",
        pet_name: "Tommy",
        image_url: "/assets/dog_success_1.png",
        tribute: "I hope you have all the biscuits in heaven.",
        owner_name: "Arafat",
        created_at: new Date().toISOString(),
        status: "Approved",
    },
    {
        id: "demo-5",
        pet_name: "Rocky",
        image_url: "/assets/dog_success_2.png",
        tribute: "The gentlest soul I ever met.",
        owner_name: "Sarah",
        created_at: new Date().toISOString(),
        status: "Approved",
    }
];

export function MemorialList() {
    const [memorials, setMemorials] = useState<Memorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [candles, setCandles] = useState<Record<string, number>>({});
    const [litCandles, setLitCandles] = useState<string[]>([]);

    useEffect(() => {
        loadMemorials();
    }, []);

    async function loadMemorials() {
        setLoading(true);
        setError(null);
        try {
            const data = await MemorialService.getAll();
            if (data && data.length > 0) {
                setMemorials(data);
            } else {
                setMemorials(DEFAULT_MEMORIALS);
            }
            // Seed initial candle counters
            const initialCandles: Record<string, number> = {};
            const initialList = (data && data.length > 0) ? data : DEFAULT_MEMORIALS;
            initialList.forEach(m => {
                initialCandles[m.id] = Math.floor(Math.random() * 30) + 15;
            });
            setCandles(initialCandles);
        } catch (err) {
            console.error("Failed to load memorials", err);
            setMemorials(DEFAULT_MEMORIALS);
        } finally {
            setLoading(false);
        }
    }

    const handleAddTribute = (newMemorial: Memorial) => {
        setMemorials(prev => [newMemorial, ...prev]);
    };

    const lightCandle = (id: string) => {
        if (litCandles.includes(id)) return;

        setCandles(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
        setLitCandles(prev => [...prev, id]);
    };

    return (
        <div className="min-h-screen pb-24 relative overflow-hidden bg-[#FFFDF8] dark:bg-zinc-950">
            {/* Header section */}
            <div className="relative pt-32 pb-16 px-4 bg-gradient-to-b from-orange-100/50 to-transparent dark:from-zinc-900 dark:to-transparent text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 font-semibold text-sm mb-6">
                        <Sparkles className="w-4 h-4" /> Rainbow Bridge Memorial
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground dark:text-white mb-6">
                        Forever in Our <span className="text-orange-500">Hearts</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        Lighting a candle in memory of the loyal street companions and beloved pets who filled our lives with unconditional love.
                    </p>
                    <MemorialModal onAddTribute={handleAddTribute} />
                </div>
            </div>

            {/* Content grid */}
            <div className="container mx-auto px-4 mt-8">
                {loading ? (
                    <SkeletonGrid count={6} />
                ) : error ? (
                    <DataErrorState title="Unable to load memorials" message={error} onRetry={loadMemorials} />
                ) : (
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
                        <Masonry gutter="2rem">
                            {memorials.map((memorial) => (
                                <motion.div
                                    key={memorial.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-xl shadow-stone-200/50 dark:shadow-none hover:-translate-y-2 transition-transform duration-500 border border-stone-100 dark:border-zinc-800"
                                >
                                    {memorial.image_url ? (
                                        <div className="relative h-64 bg-stone-100 dark:bg-zinc-800">
                                            <Image
                                                src={memorial.image_url}
                                                alt={memorial.pet_name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <h3 className="text-2xl font-bold font-heading">{memorial.pet_name}</h3>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-6 pb-0 flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-zinc-800 flex items-center justify-center text-orange-500">
                                                <Heart className="w-6 h-6 fill-orange-500" />
                                            </div>
                                            <h3 className="text-2xl font-bold font-heading text-foreground dark:text-white">{memorial.pet_name}</h3>
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <div className="mb-6">
                                            <Quote className="w-8 h-8 text-orange-200 fill-orange-200 mb-2" />
                                            <p className="text-stone-600 dark:text-zinc-300 italic leading-relaxed">
                                                "{memorial.tribute}"
                                            </p>
                                            <p className="text-right text-sm font-bold text-stone-400 dark:text-zinc-500 mt-4">
                                                — {memorial.owner_name}
                                            </p>
                                        </div>

                                        <div className="border-t border-stone-100 dark:border-zinc-800 pt-4 flex justify-between items-center">
                                            <div className="text-sm text-stone-400 dark:text-zinc-500 font-medium">
                                                Running Free 🌈
                                            </div>
                                            <Button
                                                variant="ghost"
                                                onClick={() => lightCandle(memorial.id)}
                                                className={`rounded-full gap-2 transition-all ${litCandles.includes(memorial.id)
                                                    ? "bg-orange-50 dark:bg-orange-950/40 text-orange-500"
                                                    : "text-stone-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-zinc-800"
                                                    }`}
                                            >
                                                <Flame
                                                    className={`w-5 h-5 ${litCandles.includes(memorial.id) ? "fill-orange-500 animate-pulse text-orange-500" : ""}`}
                                                />
                                                <span className="font-bold">{candles[memorial.id] || 0}</span>
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                )}
            </div>
        </div>
    );
}

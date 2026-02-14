"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Quote, Flame, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dummy data for now, ideally fetched from props or API
const TRIBUTES = [
    {
        id: "1",
        petName: "Sheru",
        image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1000&auto=format&fit=crop", // Pug
        message: "You were the bravest little lion. The streets of Dhanmondi miss your happy barks.",
        author: "Rahim",
        candles: 45
    },
    {
        id: "2",
        petName: "Bhulu",
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop", // Beagle Mix
        message: "Run free across the rainbow bridge, my sweet Bhulu. No more pain now.",
        author: "Tania",
        candles: 128
    },
    {
        id: "3",
        petName: "Lali",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000&auto=format&fit=crop", // Golden
        message: "Our neighborhood guard and best friend. You will never be forgotten.",
        author: "Sector 4 Residents",
        candles: 89
    },
    {
        id: "4",
        petName: "Tommy",
        image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1000&auto=format&fit=crop", // Bull terrier
        message: "I hope you have all the biscuits in heaven.",
        author: "Arafat",
        candles: 32
    },
    {
        id: "5",
        petName: "Rocky",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop", // Golden mix
        message: "The gentlest soul I ever met.",
        author: "Sarah",
        candles: 67
    }
];

export function MemorialList() {
    const [tributes, setTributes] = useState(TRIBUTES);
    const [litCandles, setLitCandles] = useState<string[]>([]); // Track which candles user locally lit

    const lightCandle = (id: string) => {
        if (litCandles.includes(id)) return;

        setTributes(prev => prev.map(t =>
            t.id === id ? { ...t, candles: t.candles + 1 } : t
        ));
        setLitCandles(prev => [...prev, id]);
    };

    return (
        <div className="py-12">
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
                <Masonry gutter="2rem">
                    {tributes.map((tribute) => (
                        <motion.div
                            key={tribute.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-stone-200/50 hover:-translate-y-2 transition-transform duration-500 border border-stone-100"
                        >
                            <div className="relative h-64 bg-stone-100">
                                <Image
                                    src={tribute.image}
                                    alt={tribute.petName}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-2xl font-bold font-heading">{tribute.petName}</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="mb-6">
                                    <Quote className="w-8 h-8 text-orange-200 fill-orange-200 mb-2" />
                                    <p className="text-stone-600 italic leading-relaxed">
                                        "{tribute.message}"
                                    </p>
                                    <p className="text-right text-sm font-bold text-stone-400 mt-4">
                                        — {tribute.author}
                                    </p>
                                </div>

                                <div className="border-t border-stone-100 pt-4 flex justify-between items-center">
                                    <div className="text-sm text-stone-400 font-medium">
                                        Running Free 🌈
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={() => lightCandle(tribute.id)}
                                        className={`rounded-full gap-2 transition-all ${litCandles.includes(tribute.id)
                                                ? "bg-orange-50 text-orange-500"
                                                : "text-stone-400 hover:text-orange-500 hover:bg-orange-50"
                                            }`}
                                    >
                                        <Flame
                                            className={`w-5 h-5 ${litCandles.includes(tribute.id) ? "fill-orange-500 animate-pulse" : ""}`}
                                        />
                                        <span className="font-bold">{tribute.candles}</span>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
}

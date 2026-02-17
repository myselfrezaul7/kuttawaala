"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Quote } from "lucide-react";

const SUCCESS_STORIES = [
    {
        id: 1,
        name: "Lalu",
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop", // Beagle/Desi Mix
        quote: "Lalu was shy at first, but now he rules the sofa! He's the best hiking buddy we could ask for.",
        adopter: "Rahim & Family"
    },
    {
        id: 2,
        name: "Rocky",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop", // Golden Retriever Mix
        quote: "We adopted Rocky from Dhanmondi. He's so gentle with our kids. Best decision ever!",
        adopter: "The Ahmeds"
    },
    {
        id: 3,
        name: "Sheru",
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1000&auto=format&fit=crop", // Detailed Desi Dog
        quote: "Sheru protects our home and our hearts. He's a true neighborhood legend.",
        adopter: "Bashir Bhai"
    },
    {
        id: 4,
        name: "Daisy",
        image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop", // Bulldog/Mix
        quote: "Daisy brings so much joy to our office. She's our official Chief Morale Officer!",
        adopter: "TechStart Dhaka"
    },
];

export function SuccessStories() {
    return (
        <section className="py-24 bg-[#FFFDF8] dark:bg-stone-950 overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block p-3 rounded-full bg-orange-100 dark:bg-orange-900/20 mb-4"
                >
                    <Quote className="w-8 h-8 text-orange-500 fill-orange-500" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-stone-100 font-heading mb-4">
                    Happy Tails 🐾
                </h2>
                <p className="text-xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
                    From street survivors to beloved family members. Here are some of our favorite success stories.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative flex w-full overflow-hidden mask-gradient-x">
                <motion.div
                    className="flex gap-8 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                    style={{ width: "fit-content" }}
                >
                    {/* Double the array to create seamless loop */}
                    {[...SUCCESS_STORIES, ...SUCCESS_STORIES].map((story, index) => (
                        <div
                            key={`${story.id}-${index}`}
                            className="relative w-[350px] md:w-[450px] flex-shrink-0 bg-white dark:bg-stone-900 rounded-[2rem] p-6 shadow-lg border border-stone-100/50 dark:border-stone-800 hover:shadow-xl transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-orange-100 dark:border-orange-900/30 shrink-0">
                                    <Image
                                        src={story.image}
                                        alt={story.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 text-orange-400">
                                        ★★★★★
                                    </div>
                                    <p className="text-stone-600 dark:text-stone-300 italic mb-4 text-sm md:text-base leading-relaxed">
                                        "{story.quote}"
                                    </p>
                                    <div>
                                        <h4 className="font-bold text-stone-800 dark:text-stone-100">{story.adopter}</h4>
                                        <p className="text-xs text-stone-400 uppercase tracking-wider">Adopted {story.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

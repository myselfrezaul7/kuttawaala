"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const SUCCESS_STORIES = [
    {
        id: 1,
        name: "Lalu",
        image: "/assets/dog_success_1.png", // Desi Dog
        quote: "Lalu was shy at first, but now he rules the sofa! He's the best hiking buddy we could ask for.",
        adopter: "Rahim & Family"
    },
    {
        id: 2,
        name: "Rocky",
        image: "/assets/dog_success_2.png", // Desi Dog
        quote: "We adopted Rocky from Dhanmondi. He's so gentle with our kids. Best decision ever!",
        adopter: "The Ahmeds"
    },
    {
        id: 3,
        name: "Sheru",
        image: "/assets/dog_success_3.png", // Desi Dog
        quote: "Sheru protects our home and our hearts. He's a true neighborhood legend.",
        adopter: "Bashir Bhai"
    },
    {
        id: 4,
        name: "Daisy",
        image: "/assets/dog_success_4.png", // Desi Dog
        quote: "Daisy brings so much joy to our office. She's our official Chief Morale Officer!",
        adopter: "TechStart Dhaka"
    },
];

export function SuccessStories() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        onSelect(); // Initial call

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    return (
        <section className="py-24 bg-stone-50/50 dark:bg-zinc-900/50 overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-block p-3 rounded-full bg-orange-100 dark:bg-orange-900/20 mb-4">
                        <Quote className="w-8 h-8 text-orange-500 fill-orange-500" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-stone-100 font-heading mb-4">
                        Happy Tails 🐾
                    </h2>
                    <p className="text-xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
                        From street survivors to beloved family members. Here are some of our favorite success stories.
                    </p>
                </motion.div>
            </div>

            {/* Carousel Viewport */}
            <div className="container mx-auto px-4 md:px-12 relative">
                <div className="overflow-hidden cursor-grab active:cursor-grabbing rounded-3xl" ref={emblaRef}>
                    <div className="flex touch-pan-y py-4 px-2">
                        {SUCCESS_STORIES.map((story, index) => (
                            <div
                                key={`${story.id}-${index}`}
                                className="flex-[0_0_85%] sm:flex-[0_0_70%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 md:pl-6"
                            >
                                <div className="h-full relative w-full flex-shrink-0 bg-white dark:bg-stone-900 rounded-2xl md:rounded-[2rem] p-4 md:p-6 shadow-lg border border-stone-100/50 dark:border-stone-800 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                                    <div className="flex items-start gap-4">
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-orange-100 dark:border-orange-900/30 shrink-0">
                                            <Image
                                                src={story.image}
                                                alt={story.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
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
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-stone-100 dark:border-zinc-700 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-primary hover:scale-110 transition-all z-10 hidden md:flex"
                    aria-label="Previous story"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-stone-100 dark:border-zinc-700 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-primary hover:scale-110 transition-all z-10 hidden md:flex"
                    aria-label="Next story"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Swipe Hint */}
            <div className="flex md:hidden items-center justify-center gap-2 mt-4 text-muted-foreground text-xs font-semibold uppercase tracking-widest relative z-10">
                <ChevronLeft className="w-3 h-3" />
                Swipe to explore
                <ChevronRight className="w-3 h-3" />
            </div>

            {/* Pagination Dots (Mobile & Desktop) */}
            <div className="flex justify-center gap-2 mt-8 z-10 relative">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === selectedIndex
                            ? "bg-primary w-8"
                            : "bg-orange-200 dark:bg-zinc-700 hover:bg-orange-300 dark:hover:bg-zinc-600"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

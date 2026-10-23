"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const SUCCESS_STORIES = [
    {
        id: 1,
        name: "Lalu",
        image: "/assets/dog_success_1.png", // Desi Dog
        quote: "Lalu was a tiny 3-week-old puppy when we brought him home. Now he wiggles his tail with so much joy every morning!",
        adopter: "Rahim & Family"
    },
    {
        id: 2,
        name: "Tomi",
        image: "/assets/dog_success_2.png", // Desi Dog
        quote: "We adopted tiny Tomi from Dhanmondi. He's a sweet 4-week-old baby and so gentle with our kids. Best decision ever!",
        adopter: "The Ahmeds"
    },
    {
        id: 3,
        name: "Sheru",
        image: "/assets/dog_success_3.png", // Desi Dog
        quote: "Sheru was a tiny 2-week-old orphan. Watching him grow into a healthy puppy warms our hearts every day.",
        adopter: "Bashir Bhai"
    },
    {
        id: 4,
        name: "Chintu",
        image: "/assets/dog_success_4.png", // Desi Dog
        quote: "Chintu brings so much joy to our office as a 1-month-old rescue puppy. He's our official Chief Morale Officer!",
        adopter: "TechStart Dhaka"
    },
];

export function SuccessStories() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [hasInteracted, setHasInteracted] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("scroll", () => setHasInteracted(true));
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
        <section className="py-16 md:py-24 bg-stone-50/50 dark:bg-zinc-900/40 overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 mb-12 md:mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                        <Quote className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 dark:text-stone-100 font-heading tracking-tight mb-4">
                        Happy Tails
                    </h2>
                    <p className="text-base sm:text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
                        From street survivors to beloved family members. Here are some of our favorite adoption stories.
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
                                <div className="h-full relative w-full flex-shrink-0 bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl p-5 sm:p-6 shadow-sm border border-stone-200/80 dark:border-zinc-800 hover:shadow-md transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-stone-200 dark:border-zinc-700 shrink-0 shadow-sm">
                                            <Image
                                                src={story.image}
                                                alt={story.name}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="mb-2.5 flex items-center gap-0.5 justify-center sm:justify-start">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>
                                            <p className="text-stone-600 dark:text-stone-300 italic mb-4 text-sm leading-relaxed">
                                                &ldquo;{story.quote}&rdquo;
                                            </p>
                                            <div>
                                                <h4 className="font-semibold text-sm text-stone-800 dark:text-stone-100">{story.adopter}</h4>
                                                <p className="text-xs text-stone-400 uppercase tracking-wider mt-0.5">Adopted {story.name}</p>
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
            <div className={`flex md:hidden items-center justify-center gap-2 mt-4 text-muted-foreground text-xs font-semibold uppercase tracking-widest relative z-10 transition-opacity duration-500 ${hasInteracted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ring-4 ring-transparent active:scale-125 ${index === selectedIndex
                            ? "bg-primary w-7"
                            : "bg-orange-200 dark:bg-zinc-700 hover:bg-orange-300 dark:hover:bg-zinc-600 active:bg-orange-400"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

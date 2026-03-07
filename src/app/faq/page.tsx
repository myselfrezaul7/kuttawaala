"use client";

import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Dog, Syringe, Home, Utensils, Search, Heart } from "lucide-react";

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    // Pre-organized FAQ data
    const faqData = [
        {
            category: "adoption",
            icon: Dog,
            color: "orange",
            title: 'Adoption & "Deshi" Dogs',
            items: [
                {
                    id: "deshi-dogs",
                    q: 'Why adopt a "Deshi" dog instead of buying?',
                    a: <>Deshi (local) dogs are <strong>superheroes of survival</strong>. They are naturally adapted to Bangladesh&apos;s humid climate, have incredibly strong immune systems, and rarely need vet visits compared to foreign breeds like Huskies or Persians. Buying encourages cruel puppy mills, while adopting saves a loving life off the streets.</>
                },
                {
                    id: "adoption-process",
                    q: 'What is the adoption process?',
                    a: <><ol className="list-decimal ml-4 space-y-2"><li><strong>Browse & Apply:</strong> Check our Adopt page and send an application.</li><li><strong>Interview:</strong> A quick chat to understand your lifestyle.</li><li><strong>Home Check:</strong> We ensure your home is safe (e.g., stairs/balconies are secure).</li><li><strong>Welcome Home:</strong> You sign an adoption paper and take your new best friend home!</li></ol></>
                },
                {
                    id: "adoption-fee",
                    q: 'Is there an adoption fee?',
                    a: <>Kuttawaala does <strong>not charge adoption fees</strong>. However, we ask adopters to cover vaccination and neutering/spaying costs if the dog hasn&apos;t been treated yet. This ensures every pup goes home healthy and protected.</>
                },
                {
                    id: "return-policy",
                    q: 'What if the adoption doesn&apos;t work out?',
                    a: <>We have a <strong>no-questions-asked return policy</strong>. If for any reason you cannot keep the dog, please contact us and we will take them back. We never want a dog to end up on the streets again.</>
                }
            ]
        },
        {
            category: "diet",
            icon: Utensils,
            color: "blue",
            title: 'Food & Diet',
            items: [
                {
                    id: "fish-rice",
                    q: 'Is fish and rice okay for dogs?',
                    a: <>Yes, but stick to <strong>boiled fish without bones</strong>. Raw fish breaks down Vitamin B1. Rice is a good filler, but dogs need protein. Standard diet: 60% Meat/Fish + 40% Rice/Veggies (Pumpkin/Papaya).<br /><br /><strong>Avoid:</strong> Onions, Garlic, Chocolate, and Grapes/Raisins (Toxic!).</>
                },
                {
                    id: "brands",
                    q: 'Where can I buy dog food in Dhaka?',
                    a: <>You can find dry food (Pedigree, SmartHeart, Drools) at Katabon pet market, Gulshan stick markets, or online via Daraz and Chaldal. Homemade food is often healthier and cheaper!</>
                },
                {
                    id: "toxic-foods",
                    q: 'What foods are dangerous for dogs?',
                    a: <><strong>Chocolate, onions, garlic, grapes, raisins, and xylitol (found in sugar-free gum)</strong> are all highly toxic to dogs. Cooked bones can splinter and cause internal injuries. When in doubt, stick to quality dog food or plain boiled chicken with rice.</>
                }
            ]
        },
        {
            category: "apartment",
            icon: Home,
            color: "purple",
            title: 'Apartment Life',
            items: [
                {
                    id: "potty",
                    q: 'How to potty train in a flat?',
                    a: <>Consistency is key. Take them out at the same times daily (e.g., 7 AM, 7 PM). For indoors, use newspaper or a pee pad in a bathroom. Praise them heavily ("Good boy!") and give a treat immediately when they go in the right spot.</>
                },
                {
                    id: "vaccines",
                    q: 'What vaccines does my dog need?',
                    a: <>All dogs should receive a <strong>DHPP vaccine</strong> (protects against distemper, hepatitis, parvovirus, and parainfluenza) and a <strong>Rabies vaccine</strong>. Puppies need a series of shots starting at 6-8 weeks. Annual boosters are required. Ask your vet about deworming schedules too.</>
                },
                {
                    id: "exercise",
                    q: 'How much exercise does my dog need in a flat?',
                    a: <>Most dogs need at least <strong>30 minutes to 1 hour of exercise daily</strong>. For apartment dogs, two walks per day (morning and evening) is ideal. Indoor play with toys and training sessions can supplement walks. Rooftop visits in the cooler hours work great in Dhaka.</>
                }
            ]
        }
    ];

    // Filter Logic
    const filteredCategories = faqData.map(category => {
        // If searching, ignore tabs
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            const matchedItems = category.items.filter(item =>
                item.q.toLowerCase().includes(query) ||
                (item.a && item.a.toString().toLowerCase().includes(query))
            );
            return { ...category, items: matchedItems };
        }

        // If not searching, use tabs
        if (activeTab === "all" || activeTab === category.category) {
            return category;
        }

        // Tab doesn't match
        return { ...category, items: [] };
    }).filter(category => category.items.length > 0);

    return (
        <div className="min-h-screen bg-stone-50/50 dark:bg-zinc-950 pb-24">
            {/* Header */}
            <div className="bg-secondary/30 dark:bg-zinc-900/50 py-20 text-center px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="container mx-auto relative z-10 max-w-2xl">
                    <div className="inline-block p-3 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm border border-border mb-6">
                        <HelpCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Everything you need to know about adopting, caring for, and living with dogs in Dhaka.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20 max-w-4xl">
                {/* Search & Tabs Controls - Sticky */}
                <div className="sticky top-[64px] z-30 bg-stone-50/90 dark:bg-zinc-950/90 backdrop-blur-md pt-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 border-b border-border/50">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Tabs */}
                        <div className="flex bg-secondary/50 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto hide-scrollbar">
                            {[
                                { id: 'all', label: 'All FAQs' },
                                { id: 'adoption', label: 'Adoption' },
                                { id: 'diet', label: 'Diet & Food' },
                                { id: 'apartment', label: 'Apartment Life' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveTab(tab.id); setSearchQuery(""); }}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeTab === tab.id && searchQuery === ""
                                        ? "bg-white dark:bg-zinc-700 text-primary shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-zinc-700/50"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-medium placeholder:text-muted-foreground shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Filtered Content */}
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => {
                        const Icon = category.icon;

                        // We map the color string to actual tailwind classes for the header badge
                        const badgeClasses = {
                            "orange": "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
                            "blue": "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                            "purple": "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                        }[category.color] || "bg-secondary text-foreground";

                        return (
                            <div key={category.category} className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-8 shadow-xl border border-border/50">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground pb-4 border-b border-border/50">
                                        <div className={`p-2 rounded-xl ${badgeClasses}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        {category.title}
                                    </h2>
                                    <Accordion type="single" collapsible className="w-full space-y-4">
                                        {category.items.map((item) => (
                                            <AccordionItem key={item.id} value={item.id} className="border border-border rounded-xl px-2 data-[state=open]:bg-secondary/30 transition-colors">
                                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4">
                                                    {item.q}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground leading-relaxed px-4 pb-4 text-base">
                                                    {item.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-20 bg-white/50 dark:bg-zinc-900/50 rounded-[2rem] border border-border shadow-inner">
                        <div className="inline-flex w-16 h-16 rounded-full bg-secondary items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">No Matching Questions</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">We couldn't find any FAQs matching "{searchQuery}". Try using different keywords or browsing the tabs above.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
                            className="mt-6 px-6 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold transition-colors"
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* Contact CTA */}
                <div className="text-center bg-zinc-900 dark:bg-zinc-800 rounded-[2rem] p-12 relative overflow-hidden text-white mt-8">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <h3 className="text-2xl font-bold mb-4 relative z-10">Still have questions?</h3>
                    <p className="text-zinc-400 mb-8 relative z-10">Our community admins are happy to help you out.</p>
                    <a href="https://www.facebook.com/groups/721498465956239" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all">
                        Ask in Facebook Group
                    </a>
                </div>

            </div>
        </div>
    );
}

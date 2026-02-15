import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Dog, Syringe, Home, Utensils, Heart } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dog Care FAQ",
    description: "Answers to common questions about dog adoption, diet, health, and apartment living in Bangladesh Context.",
};

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-[#FFFDF8] dark:bg-zinc-950 pb-24">
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

                {/* Adoption & Deshi Dogs */}
                <div className="mb-8">
                    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 shadow-xl border border-border/50">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground pb-4 border-b border-border/50">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400">
                                <Dog className="w-6 h-6" />
                            </div>
                            Adoption & &quot;Deshi&quot; Dogs
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="deshi-dogs" className="border border-border rounded-xl px-2 data-[state=open]:bg-secondary/30 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4">
                                    Why adopt a &quot;Deshi&quot; dog instead of buying?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed px-4 pb-4 text-base">
                                    Deshi (local) dogs are <strong>superheroes of survival</strong>. They are naturally adapted to Bangladesh&apos;s humid climate, have incredibly strong immune systems, and rarely need vet visits compared to foreign breeds like Huskies or Persians. Buying encourages cruel puppy mills, while adopting saves a loving life off the streets.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="adoption-process" className="border border-border rounded-xl px-2 data-[state=open]:bg-secondary/30 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4">
                                    What is the adoption process?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed px-4 pb-4 text-base">
                                    <ol className="list-decimal ml-4 space-y-2">
                                        <li><strong>Browse & Apply:</strong> Check our Adopt page and send an application.</li>
                                        <li><strong>Interview:</strong> A quick chat to understand your lifestyle.</li>
                                        <li><strong>Home Check:</strong> We ensure your home is safe (e.g., stairs/balconies are secure).</li>
                                        <li><strong>Welcome Home:</strong> You sign an adoption paper and take your new best friend home!</li>
                                    </ol>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Food & Diet */}
                <div className="mb-8">
                    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 shadow-xl border border-border/50">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground pb-4 border-b border-border/50">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                                <Utensils className="w-6 h-6" />
                            </div>
                            Food & Diet
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="fish-rice" className="border border-border rounded-xl px-2 data-[state=open]:bg-secondary/30 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4">
                                    Is fish and rice okay for dogs?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed px-4 pb-4 text-base">
                                    Yes, but stick to <strong>boiled fish without bones</strong>. Raw fish breaks down Vitamin B1. Rice is a good filler, but dogs need protein. Standard diet: 60% Meat/Fish + 40% Rice/Veggies (Pumpkin/Papaya).
                                    <br /><br />
                                    <strong>Avoid:</strong> Onions, Garlic, Chocolate, and Grapes/Raisins (Toxic!).
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="brands" className="border border-border rounded-xl px-2 data-[state=open]:bg-secondary/30 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4">
                                    Where can I buy dog food in Dhaka?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed px-4 pb-4 text-base">
                                    You can find dry food (Pedigree, SmartHeart, Drools) at Katabon pet market, Gulshan stick markets, or online via Daraz and Chaldal. Homemade food is often healthier and cheaper!
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Apartment Living */}
                <div className="mb-12">
                    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 shadow-xl border border-border/50">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground pb-4 border-b border-border/50">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
                                <Home className="w-6 h-6" />
                            </div>
                            Apartment Life
                        </h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="potty" className="border border-border rounded-xl px-2 data-[state=open]:bg-secondary/30 transition-colors">
                                <AccordionTrigger className="hover:no-underline font-bold text-left px-4 text-lg py-4">
                                    How to potty train in a flat?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed px-4 pb-4 text-base">
                                    Consistency is key. Take them out at the same times daily (e.g., 7 AM, 7 PM). For indoors, use newspaper or a pee pad in a bathroom. Praise them heavily ("Good boy!") and give a treat immediately when they go in the right spot.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="text-center bg-zinc-900 dark:bg-zinc-800 rounded-[2rem] p-12 relative overflow-hidden text-white">
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

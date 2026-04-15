"use client";

import { useState } from "react";
import { Copy, Check, Heart, Pill, Syringe, Scissors, Wallet, ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type DonationOption = {
    id: string;
    title: string;
    description: string;
    icon: any;
    amount: string;
    color: string;
    bgColor: string;
};

const OPTIONS: DonationOption[] = [
    {
        id: "medicine",
        title: "Donate Medicine",
        description: "Directly fund or send essential medicines for injured strays.",
        icon: Pill,
        amount: "Any Amount",
        color: "text-blue-500",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
        id: "vaccine",
        title: "Sponsor Vaccine",
        description: "Cover the cost of a 7-in-1 vaccine or rabies shot for one dog.",
        icon: Syringe,
        amount: "1000 BDT",
        color: "text-teal-500",
        bgColor: "bg-teal-100 dark:bg-teal-900/30",
    },
    {
        id: "neuter",
        title: "Sponsor Neuter/Spay",
        description: "Fund a sterilization surgery to control the stray population humanely.",
        icon: Scissors,
        amount: "2500 BDT",
        color: "text-purple-500",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
        id: "other",
        title: "General Donation",
        description: "Support our daily operations, food drives, and emergency rescues.",
        icon: Wallet,
        amount: "Custom",
        color: "text-rose-500",
        bgColor: "bg-rose-100 dark:bg-rose-900/30",
    },
];

export function DonatePage() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Number copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-stone-50/50 dark:bg-zinc-950 pb-20">
            {/* Hero Section */}
            <div className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 overflow-hidden bg-secondary/30 dark:bg-zinc-900/50">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                <div className="container mx-auto text-center relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-border mb-6">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                        <span className="text-sm font-bold text-foreground">Save a Life Today</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground mb-6 leading-tight">
                        Your Support = <span className="text-primary">Their Survival</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We rely 100% on community donations. Every taka goes directly towards feeding, treating, and sheltering street dogs in Bangladesh.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {OPTIONS.map((option, index) => {
                        const Icon = option.icon;
                        const isSelected = selectedOption === option.id;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                                viewport={{ once: true, margin: "-50px" }}
                                key={option.id}
                                onClick={() => setSelectedOption(option.id)}
                                className={`
                                    cursor-pointer rounded-2xl md:rounded-[2rem] p-4 sm:p-5 border-[3px] md:border-2 transition-all duration-300 relative overflow-hidden group
                                    ${isSelected
                                        ? "bg-white dark:bg-zinc-900 border-primary shadow-xl scale-[1.02] md:scale-105 z-10"
                                        : "bg-white/80 dark:bg-zinc-900/80 border-border/40 dark:border-border/60 md:border-transparent hover:border-border hover:shadow-lg backdrop-blur-md"}
                                `}
                            >
                                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${option.bgColor} flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`w-5 h-5 md:w-7 md:h-7 ${option.color}`} />
                                </div>
                                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 font-heading">{option.title}</h3>
                                <p className="text-xs md:text-sm text-muted-foreground mb-3">{option.description}</p>
                                <div className={`inline-block px-2 py-1 md:px-3 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider ${option.bgColor} ${option.color}`}>
                                    {option.amount}
                                </div>

                                {isSelected && (
                                    <div className="absolute top-2 right-2 md:top-4 md:right-4 text-primary bg-primary/10 rounded-full p-1 animate-in zoom-in">
                                        <Check className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Donation Contact Hub (Revealed on Selection) */}
                <AnimatePresence>
                    {selectedOption && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="mt-8 md:mt-12 max-w-4xl mx-auto"
                        >
                            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-10 shadow-2xl border border-primary/20 dark:border-zinc-800 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-orange-400" />

                                <div className="text-center mb-6 md:mb-10">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold mb-4">
                                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                        Digital Payments
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 font-heading text-neutral-900 dark:text-neutral-50">
                                        How to Donate
                                    </h2>
                                    <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
                                        We're currently integrating <span className="font-semibold text-primary">bKash, Nagad</span>, and <span className="font-semibold text-primary">Bank Transfers</span>! In the meantime, please reach out directly via <span className="font-semibold">Email</span> or <span className="font-semibold">Facebook</span>.
                                    </p>
                                </div>

                                {/* Contact Action Cards */}
                                <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                                    {/* Email Card */}
                                    <a
                                        href="mailto:kuttawaala@gmail.com"
                                        className="group relative bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center overflow-hidden hover:shadow-xl hover:shadow-primary/5 pb-6"
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50 md:hidden block group-hover:bg-primary transition-colors" />
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700 flex items-center justify-center mb-4 md:mb-6 relative z-10 group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500">
                                            <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                        </div>
                                    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Email Us</h3>
                                    <div className="inline-flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors bg-white dark:bg-zinc-800 px-4 py-2 rounded-full text-xs md:text-sm font-mono border border-zinc-200 dark:border-zinc-700">
                                        kuttawaala@gmail.com
                                    </div>
                                </a>

                                {/* Facebook Card */}
                                <a
                                    href="https://www.facebook.com/kuttawaalaa/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-zinc-200 dark:border-zinc-800 hover:border-[#1877F2]/30 transition-all duration-300 flex flex-col items-center text-center overflow-hidden hover:shadow-xl hover:shadow-[#1877F2]/5 pb-6"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1877F2]/50 md:hidden block group-hover:bg-[#1877F2] transition-colors" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700 flex items-center justify-center mb-4 md:mb-6 relative z-10 group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500">
                                        <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-[#1877F2]" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Message Facebook</h3>
                                    <div className="text-muted-foreground group-hover:text-[#1877F2] transition-colors flex items-center justify-center gap-1 font-medium text-xs md:text-sm">
                                        facebook.com/kuttawaalaa
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </div>
                                </a>
                            </div>

                            {/* Coming Soon Ticker Details */}
                            <div className="bg-zinc-100 dark:bg-zinc-900/40 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-zinc-200/50 dark:border-zinc-800/50">
                                <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                    </span>
                                    Coming within 14 days:
                                </div>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <span className="px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 text-xs font-bold text-pink-600 border border-pink-100 dark:border-pink-900/30 opacity-70">bKash</span>
                                    <span className="px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 text-xs font-bold text-orange-600 border border-orange-100 dark:border-orange-900/30 opacity-70">Nagad</span>
                                    <span className="px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 text-xs font-bold text-purple-600 border border-purple-100 dark:border-purple-900/30 opacity-70">Rocket</span>
                                    <span className="px-3 py-1.5 rounded-md bg-white dark:bg-zinc-800 text-xs font-bold text-blue-600 border border-blue-100 dark:border-blue-900/30 opacity-70">Dutch Bangla</span>
                                </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FAQ / Trust Section */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-3xl mx-auto mt-12 md:mt-24 text-center"
                >
                    <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Where does the money go?</h3>
                    <div className="grid grid-cols-3 gap-3 md:gap-8">
                        <div>
                            <div className="w-10 h-10 md:w-16 md:h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2 md:mb-4 text-lg md:text-2xl">🥬</div>
                            <h4 className="text-xs md:text-base font-bold mb-1 md:mb-2 leading-tight">70% Food & Care</h4>
                            <p className="hidden md:block text-sm text-muted-foreground">Daily meals for 150+ dogs and shelter maintenance.</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 md:w-16 md:h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2 md:mb-4 text-lg md:text-2xl">⚕️</div>
                            <h4 className="text-xs md:text-base font-bold mb-1 md:mb-2 leading-tight">20% Medical</h4>
                            <p className="hidden md:block text-sm text-muted-foreground">Emergency surgeries, vaccinations, and treatments.</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 md:w-16 md:h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2 md:mb-4 text-lg md:text-2xl">📢</div>
                            <h4 className="text-xs md:text-base font-bold mb-1 md:mb-2 leading-tight">10% Outreach</h4>
                            <p className="hidden md:block text-sm text-muted-foreground">Adoption drives and awareness campaigns.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

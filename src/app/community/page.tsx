"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Star, Download, ChevronRight, Users, Heart, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function CommunityPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#FFFDF8] dark:bg-stone-950 transition-colors duration-300">
            {/* Header */}
            {/* Ideally Header is in layout, but putting here if needed or assuming layout wraps it */}

            <main className="flex-1 pb-24">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-100/50 to-transparent dark:from-orange-900/20 pointer-events-none" />
                    <div className="container mx-auto text-center relative z-10">
                        <div className="inline-block p-3 rounded-full bg-white dark:bg-stone-800 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/20 mb-6 border border-orange-100 dark:border-orange-900/30 animate-bounce-slow">
                            <Users className="w-8 h-8 text-orange-500 fill-orange-500" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading text-stone-800 dark:text-stone-100 mb-6 leading-tight">
                            Kuttawaala Community <span className="text-orange-500">Hub</span>
                        </h1>
                        <p className="text-xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed mb-8">
                            Join our pack of dog lovers in Dhaka. From adoption drives to doggy day outs, there's always something happening! 🐕
                        </p>

                        <a
                            href="https://www.facebook.com/groups/721498465956239"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold py-4 px-8 rounded-full shadow-xl shadow-blue-500/20 hover:scale-105 transition-all duration-300 group"
                        >
                            <Facebook className="w-5 h-5 fill-current" />
                            <span>Visit Facebook Community</span>
                            <ChevronRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </section>

                <div className="container mx-auto px-4 max-w-6xl space-y-24">

                    {/* Upcoming Events */}
                    <section>
                        <div className="flex items-end justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 font-heading mb-2">Upcoming Events 📅</h2>
                                <p className="text-stone-500 dark:text-stone-400">Mark your calendars for these paw-some gatherings.</p>
                            </div>
                        </div>

                        <div className="bg-stone-100 dark:bg-stone-900/50 rounded-[2rem] p-12 text-center border-2 border-dashed border-stone-200 dark:border-stone-800">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-500 mb-6">
                                <Calendar className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-3"> exciting events coming soon!</h3>
                            <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-8">
                                We are planning some amazing dog walks, vaccination drives, and workshops. Stay tuned for updates!
                            </p>
                            <Button disabled className="opacity-50 cursor-not-allowed rounded-full bg-stone-800 dark:bg-stone-700 text-white font-bold px-8 py-6">
                                Coming Soon
                            </Button>
                        </div>
                    </section>

                    {/* Volunteer Spotlight */}
                    <section className="bg-gradient-to-br from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-orange-200 dark:shadow-none text-center">
                        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                            <Star className="w-64 h-64 rotate-12" />
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/20">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                Volunteer of the Month
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 !leading-snug">
                                Meet Ruksath Hoqe
                            </h2>
                            <p className="text-orange-100 text-lg mb-8 leading-relaxed">
                                Ruksath has been a dedicated member of our community, helping to organize feeding drives and coordinate rescues across the city.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-xl border border-white/10 text-center min-w-[100px]">
                                    <span className="block text-2xl font-bold">50+</span>
                                    <span className="text-xs uppercase opacity-80">Rescues</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-xl border border-white/10 text-center min-w-[100px]">
                                    <span className="block text-2xl font-bold">3yr</span>
                                    <span className="text-xs uppercase opacity-80">Service</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Resources */}
                    <section>
                        <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 font-heading mb-10 text-center">Canine Resources 📚</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { title: "New Dog Checklist", desc: "Essentials for your new best friend." },
                                { title: "Emergency Vet List", desc: "24/7 clinics in Dhaka." },
                                { title: "Desi Dog Diet Guide", desc: "Healthy food for local breeds." },
                            ].map((resource, i) => (
                                <Link href="#" key={i} className="group glass-card dark:bg-stone-900/60 dark:border-stone-800 p-8 rounded-[2rem] hover:bg-orange-50 dark:hover:bg-stone-800 transition-colors border-2 border-transparent hover:border-orange-100 dark:hover:border-stone-700">
                                    <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                                        <Download className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2">{resource.title}</h3>
                                    <p className="text-stone-500 dark:text-stone-400 mb-4">{resource.desc}</p>
                                    <span className="text-orange-500 font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                                        Download PDF <ChevronRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="text-center py-12">
                        <p className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-6">Want to join the pack?</p>
                        <Link href="/volunteer">
                            <Button className="h-14 px-8 rounded-full bg-stone-800 dark:bg-stone-700 text-white font-bold text-lg hover:bg-stone-900 dark:hover:bg-stone-600 shadow-xl hover:scale-105 transition-all">
                                Become a Volunteer
                            </Button>
                        </Link>
                    </section>
                </div>
            </main>
        </div>
    );
}

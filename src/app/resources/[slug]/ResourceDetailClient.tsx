"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Share2, Printer } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ShareModal } from "@/components/shared/ShareModal";
import type { Resource } from "@/data/resources";

interface ResourceDetailClientProps {
    resource: Resource;
    otherResources: Resource[];
}

export function ResourceDetailClient({ resource, otherResources }: ResourceDetailClientProps) {
    const [progress, setProgress] = useState(0);
    const [isShareOpen, setIsShareOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setProgress(scrollProgress);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Extract headings for TOC
    const headings = resource.content
        .split('\n')
        .filter(line => line.startsWith('## '))
        .map(line => line.replace('##', '').trim());

    return (
        <div className="min-h-screen bg-[#FFFDF8] dark:bg-stone-950 pb-24 relative">
            {/* Reading Progress Bar */}
            <div
                className="fixed top-0 left-0 h-1.5 bg-orange-500 z-50 transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
            />
            {/* Header / Cover Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full">
                <Image
                    src={resource.coverImage}
                    alt={resource.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 container mx-auto">
                    <Link href="/community">
                        <Button variant="outline" className="mb-8 text-white border-white/30 hover:bg-white/20 hover:text-white backdrop-blur-sm rounded-full">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Community
                        </Button>
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading mb-6 leading-tight drop-shadow-lg">
                        {resource.title}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-white/90 font-medium">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-orange-400" />
                            {resource.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-orange-400" />
                            By {resource.author}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content & Sidebar Layout */}
            <div className="container mx-auto px-4 -mt-10 relative z-10 max-w-6xl flex flex-col lg:flex-row gap-8 items-start">

                {/* Main Content Area */}
                <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-6 md:p-16 shadow-xl border border-orange-100/50 dark:border-stone-800 flex-1 w-full lg:max-w-4xl">
                    <div className="prose prose-lg md:prose-xl dark:prose-invert prose-orange mx-auto dark:text-stone-300 text-stone-700 max-w-none">
                        <ReactMarkdown
                            components={{
                                h2: ({ node, children, ...props }) => {
                                    const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                                    return <h2 id={id} className="scroll-mt-32" {...props}>{children}</h2>;
                                },
                            }}
                        >
                            {resource.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <span className="font-bold text-stone-800 dark:text-stone-200">Share or Save this Guide</span>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => window.print()} className="rounded-full gap-2 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800">
                                <Printer className="w-4 h-4" /> Print
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsShareOpen(true)}
                                aria-label="Share this guide"
                                className="rounded-full w-12 h-12 p-0 border-stone-200 dark:border-stone-700 hover:bg-orange-50 dark:hover:bg-stone-800 hover:text-orange-500 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    <ShareModal
                        isOpen={isShareOpen}
                        onClose={() => setIsShareOpen(false)}
                        title={`${resource.title} | Kuttawaala Guide`}
                        text={`Check out "${resource.title}" on Kuttawaala! 🐾`}
                        url={typeof window !== "undefined" ? window.location.href : `https://www.kuttawaala.com/resources/${resource.slug}`}
                    />
                </div>

                {/* Sticky Sidebar */}
                <div className="hidden lg:block w-72 sticky top-32 space-y-8">
                    {/* TOC */}
                    {headings.length > 0 && (
                        <div className="glass-card bg-white/60 dark:bg-stone-900/60 p-6 rounded-3xl border border-orange-100/50 dark:border-stone-800 shadow-sm">
                            <h3 className="font-bold text-stone-800 dark:text-stone-200 mb-4 text-sm uppercase tracking-wider">In this Guide</h3>
                            <ul className="space-y-3 text-sm">
                                {headings.map((heading, i) => {
                                    const slugId = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                                    return (
                                        <li key={i}>
                                            <a
                                                href={`#${slugId}`}
                                                className="text-stone-500 dark:text-stone-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-2"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-200 dark:bg-stone-700 shrink-0" />
                                                <span className="line-clamp-1">{heading}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {/* Related */}
                    {otherResources.length > 0 && (
                        <div className="glass-card bg-white/60 dark:bg-stone-900/60 p-6 rounded-3xl border border-orange-100/50 dark:border-stone-800 shadow-sm">
                            <h3 className="font-bold text-stone-800 dark:text-stone-200 mb-4 text-sm uppercase tracking-wider">Related Reads</h3>
                            <div className="space-y-4">
                                {otherResources.map(other => (
                                    <Link key={other.slug} href={`/resources/${other.slug}`} className="group block border-l-2 border-stone-200 hover:border-orange-400 dark:border-stone-700 dark:hover:border-orange-500 pl-4 py-1 transition-colors">
                                        <p className="font-bold text-stone-800 dark:text-stone-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 text-sm mb-1 line-clamp-2">{other.title}</p>
                                        <p className="text-xs text-stone-500 dark:text-stone-500">{other.readTime}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

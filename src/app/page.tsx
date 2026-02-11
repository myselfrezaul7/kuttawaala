import { Hero } from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Heart, Users, Stethoscope } from "lucide-react";
import { FeaturedDogs } from "@/components/home/FeaturedDogs";

export default function Home() {

    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            {/* Featured Dogs Section */}
            <section className="py-24 gradient-bg relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl" />

                <FeaturedDogs />
            </section>

            {/* Mission Section with Glassmorphism Stats */}
            <section className="py-28 relative overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-white to-indigo-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900" />
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary dark:bg-secondary/500/20 mb-8">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground dark:text-white leading-tight">
                        Our Mission
                    </h2>
                    <p className="text-xl text-muted-foreground dark:text-muted-foreground mb-16 leading-relaxed max-w-2xl mx-auto">
                        We are dedicated to improving the lives of street dogs in Bangladesh through rescue, rehabilitation, and adoption programs.
                    </p>

                    {/* Stats Cards with iOS 26 Glassmorphism */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="glass-card rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
                            <div className="w-14 h-14 rounded-2xl bg-secondary dark:bg-secondary/500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Heart className="w-7 h-7 text-primary" />
                            </div>
                            <span className="block text-4xl font-bold text-primary dark:text-primary/80 mb-2">500+</span>
                            <span className="text-sm font-semibold text-muted-foreground dark:text-muted-foreground/80 uppercase tracking-wider">Dogs TNR&apos;d</span>
                        </div>

                        <div className="glass-card rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-7 h-7 text-indigo-500" />
                            </div>
                            <span className="block text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">200+</span>
                            <span className="text-sm font-semibold text-muted-foreground dark:text-muted-foreground/80 uppercase tracking-wider">Adoptions</span>
                        </div>

                        <div className="glass-card rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Stethoscope className="w-7 h-7 text-emerald-500" />
                            </div>
                            <span className="block text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">50+</span>
                            <span className="text-sm font-semibold text-muted-foreground dark:text-muted-foreground/80 uppercase tracking-wider">Volunteers</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 gradient-bg relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 dark:bg-secondary/500/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="glass-card rounded-[32px] p-12 md:p-16 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-6">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-lg text-muted-foreground dark:text-muted-foreground mb-10 max-w-xl mx-auto">
                            Join our community of dog lovers and help us create a better world for stray dogs in Bangladesh.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/adopt">
                                <Button size="lg" className="h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary text-white font-semibold shadow-lg shadow-secondary0/25 hover:shadow-xl hover:shadow-secondary0/40 transition-all duration-300">
                                    Adopt a Dog
                                </Button>
                            </Link>
                            <Link href="/volunteer">
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-2 border-border dark:border-muted-foreground hover:border-primary dark:hover:border-primary font-semibold transition-all duration-300">
                                    Become a Volunteer
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

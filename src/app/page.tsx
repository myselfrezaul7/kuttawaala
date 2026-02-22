import { Hero } from "@/components/home/Hero";
import { SuccessStories } from "@/components/home/SuccessStories";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Heart, Users, Stethoscope, ArrowRight, Cat } from "lucide-react";
import { FeaturedDogs } from "@/components/home/FeaturedDogs";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";


export default function Home() {

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Hero />

            {/* Success Stories Ticker */}
            <SuccessStories />

            {/* Featured Dogs Section */}
            <section className="py-12 md:py-24 relative overflow-hidden bg-secondary/30 dark:bg-secondary/5">
                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="relative z-10 w-full">
                    <FeaturedDogs />
                </div>
            </section>

            {/* Transformations Section */}
            <section className="py-12 md:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10 md:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-sm mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>Real Life Miracles</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
                            Incredible <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Transformations</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            See the difference love, care, and a warm home can make. Slide to see how we change lives, one dog at a time.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">🏚️</div>
                                        <div>
                                            <h3 className="text-xl font-bold">The Rescue</h3>
                                            <p className="text-muted-foreground">Found abandoned with severe skin issues.</p>
                                        </div>
                                    </div>
                                    <div className="w-0.5 h-12 bg-border ml-6"></div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">🏡</div>
                                        <div>
                                            <h3 className="text-xl font-bold">The Recovery</h3>
                                            <p className="text-muted-foreground">After 3 months of medical care and love.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                                    <p className="italic text-muted-foreground">"Max was scared of his own shadow. Now he's the king of our sofa!"</p>
                                    <p className="font-bold mt-2 text-right">- Sarah, Adopter</p>
                                </div>
                            </div>

                            <div className="order-1 md:order-2 h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-500/10 border-4 border-white dark:border-stone-800">
                                <BeforeAfterSlider
                                    beforeImage="https://images.unsplash.com/photo-1529429617124-95b109e86bb8?q=80&w=600&auto=format&fit=crop"
                                    afterImage="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop"
                                    beforeLabel="Rescued"
                                    afterLabel="Adopted"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Visit Catwaala Section */}
            <section className="py-12 md:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="bg-orange-50 dark:bg-orange-950/30 rounded-[3rem] p-8 md:p-16 text-foreground border border-orange-100 dark:border-orange-900/30 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400/10 dark:bg-orange-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 transition-transform duration-700 group-hover:scale-110" />

                        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                            <div className="flex-1 text-center md:text-left space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-orange-200 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 text-sm font-bold shadow-sm">
                                    <Cat className="w-4 h-4" />
                                    <span>Team Catwaala</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold font-heading text-stone-800 dark:text-stone-100">
                                    More of a Cat Person?
                                </h2>
                                <p className="text-lg text-muted-foreground dark:text-stone-400 max-w-xl leading-relaxed">
                                    Visit our sister organization, <span className="font-bold text-orange-600 dark:text-orange-400">Catwaala</span>, to find your purrfect feline companion. Same mission, different paws.
                                </p>
                                <a
                                    href="https://catwaala.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block pt-2"
                                >
                                    <Button className="h-14 px-8 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-lg shadow-orange-500/20 transition-transform hover:-translate-y-1">
                                        Visit Catwaala.com <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </a>
                            </div>

                            {/* Decorative Cat Icon/Graphic */}
                            <div className="w-full md:w-auto flex justify-center">
                                <div className="w-64 h-64 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-[3rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 flex items-center justify-center border border-orange-100 dark:border-orange-900/30 shadow-xl">
                                    <Cat className="w-32 h-32 text-orange-400 dark:text-orange-500/80 drop-shadow-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 md:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 mb-10 rotate-3">
                        <Sparkles className="w-10 h-10 text-primary" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground font-heading tracking-tight">
                        Our Mission
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-20 leading-relaxed max-w-3xl mx-auto">
                        We are dedicated to improving the lives of street dogs in Bangladesh through rescue, rehabilitation, and adoption programs.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Heart, count: "500+", label: "Dogs Rescued", color: "text-rose-500", bg: "bg-rose-500/10" },
                            { icon: Users, count: "200+", label: "Adoptions", color: "text-blue-500", bg: "bg-blue-500/10" },
                            { icon: Stethoscope, count: "50+", label: "Vet Camps", color: "text-emerald-500", bg: "bg-emerald-500/10" }
                        ].map((stat, index) => (
                            <div key={index} className="glass-card rounded-[2.5rem] p-6 md:p-10 hover:translate-y-[-5px] transition-transform duration-300 border border-border mt-4">
                                <div className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-6`}>
                                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                </div>
                                <span className="block text-5xl font-bold text-foreground mb-3 tracking-tight">{stat.count}</span>
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-24 text-center max-w-5xl mx-auto border border-white/50 dark:border-zinc-800 shadow-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold text-stone-800 dark:text-stone-100 mb-8 font-heading">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-xl text-muted-foreground dark:text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Join our community of dog lovers and help us create a better world for stray dogs in Bangladesh.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/adopt">
                                <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
                                    Adopt a Dog
                                </Button>
                            </Link>
                            <Link href="/volunteer">
                                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-2 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-zinc-800 text-stone-700 dark:text-stone-200 font-bold text-xl hover:-translate-y-1 transition-all duration-300">
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

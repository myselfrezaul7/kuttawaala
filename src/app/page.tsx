import { Hero } from "@/components/home/Hero";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { dogs } from "@/data/dogs";

export default function Home() {
    const featuredDogs = dogs.slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            {/* Featured Dogs */}
            <section className="py-24 bg-white dark:bg-zinc-950">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 font-heading">
                                Meet the <span className="text-orange-600">Stars</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md">
                                These amazing companions are vaccinated, health-checked, and ready to find their forever homes.
                            </p>
                        </div>
                        <Link href="/adopt">
                            <Button variant="ghost" className="gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 text-base">
                                View All Dogs <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {featuredDogs.map(dog => (
                            // @ts-ignore
                            <PetCard key={dog.id} cat={dog} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-24 bg-orange-50 dark:bg-zinc-900 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                    <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-slate-100 font-heading">
                        More Than Just Adoption
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
                        We are building a community of dog lovers who care. From rescue operations to community education, we are changing lives one wag at a time.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg border border-white/20">
                            <span className="block text-3xl font-bold text-orange-600 mb-1">1000+</span>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Rescues</span>
                        </div>
                        <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg border border-white/20">
                            <span className="block text-3xl font-bold text-amber-600 mb-1">850+</span>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Adoptions</span>
                        </div>
                        <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg border border-white/20">
                            <span className="block text-3xl font-bold text-green-600 mb-1">150+</span>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Volunteers</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

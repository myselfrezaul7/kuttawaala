import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { dogs } from "@/data/dogs";
import { DogService } from "@/services/DogService";
import { Button } from "@/components/ui/button";
import { MapPin, Info, CheckCircle, ArrowLeft, Share2, Heart, ShoppingBag } from "lucide-react";
import { AdoptionForm } from "@/components/adopt/AdoptionForm";
import { SponsorshipModal } from "@/components/adopt/SponsorshipModal";

type Props = {
    params: Promise<{ id: string }>;
};

// Revalidate page data every 60 seconds (ISR)
export const revalidate = 60;

export default async function DogDetailPage({ params }: Props) {
    const { id } = await params;
    const dog = (await DogService.getById(id)) || dogs.find(c => c.id === id);

    if (!dog) {
        return notFound();
    }

    const isVaccinated = Boolean(dog.vaccinated || (dog as any).attributes?.vaccinated);
    const isNeutered = Boolean(dog.neutered || (dog as any).attributes?.neutered);
    const isGoodWithKids = Boolean(dog.goodWithKids || (dog as any).attributes?.goodWithKids);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/adopt">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary">
                        <ArrowLeft className="w-4 h-4" /> Back to Dogs
                    </Button>
                </Link>
            </div>

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden border border-border dark:border-zinc-800 shadow-xl shadow-secondary/50 dark:shadow-none">
                        <Image src={dog.imageUrl} alt={dog.name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button className="p-3 bg-white/90 rounded-full shadow-md text-muted-foreground/80 hover:text-primary transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-white/90 rounded-full shadow-md text-muted-foreground/80 hover:text-blue-500 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground dark:text-muted">{dog.name}</h1>
                            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${dog.tag === 'Urgent' ? 'bg-amber-500 text-white' :
                                dog.tag === 'New' ? 'bg-indigo-500 text-white' : 'bg-green-100 text-green-700 dark:bg-zinc-800 dark:text-green-400'
                                }`}>
                                {dog.tag || 'Available'}
                            </span>
                        </div>
                        <p className="text-xl text-primary font-medium flex items-center gap-2">
                            <MapPin className="w-5 h-5" /> {dog.location}
                        </p>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl bg-secondary/30 dark:bg-zinc-900 border border-border dark:border-zinc-800 text-center">
                            <span className="block text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Breed</span>
                            <span className="font-bold text-foreground dark:text-white line-clamp-1">{dog.breed}</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-secondary/30 dark:bg-zinc-900 border border-border dark:border-zinc-800 text-center">
                            <span className="block text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Age</span>
                            <span className="font-bold text-foreground dark:text-white">{dog.age}</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-secondary/30 dark:bg-zinc-900 border border-border dark:border-zinc-800 text-center">
                            <span className="block text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Gender</span>
                            <span className="font-bold text-foreground dark:text-white">{dog.gender}</span>
                        </div>
                    </div>

                    {/* Story / Description */}
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold font-heading text-foreground dark:text-white flex items-center gap-2">
                            <Info className="w-5 h-5 text-primary" /> My Story
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-base">
                            {dog.description || "A very sweet and loving dog looking for their forever family in Bangladesh."}
                        </p>
                    </div>

                    {/* Health & Habits */}
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold font-heading text-foreground dark:text-white flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> Health & Habits
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {isVaccinated && (
                                <span className="px-4 py-2 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium flex items-center gap-2">✓ Vaccinated</span>
                            )}
                            {isNeutered && (
                                <span className="px-4 py-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium flex items-center gap-2">✓ Neutered/Spayed</span>
                            )}
                            {isGoodWithKids ? (
                                <span className="px-4 py-2 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 rounded-lg text-sm font-medium flex items-center gap-2">✓ Great with Kids</span>
                            ) : (
                                <span className="px-4 py-2 bg-secondary/50 dark:bg-primary/20 text-primary dark:text-primary rounded-lg text-sm font-medium flex items-center gap-2">Best in quiet home</span>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-border dark:border-zinc-800 space-y-6">
                        {/* PetBhai Contextual Upsell */}
                        <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 border border-purple-100 dark:border-purple-800/50 p-6 rounded-2xl flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold mb-1 text-purple-900 dark:text-purple-300 flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5" /> Get Ready for {dog.name}
                                </h3>
                                <p className="text-purple-700/80 dark:text-purple-300/80 text-sm">
                                    Grab their starter kit, food, and toys at our new store!
                                </p>
                            </div>
                            <a
                                href="https://www.petbhai.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                            >
                                Shop Now
                            </a>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-zinc-900 dark:to-zinc-800 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-2 font-heading text-stone-800 dark:text-white">Can't adopt right now?</h3>
                            <p className="text-stone-500 dark:text-stone-400 mb-4 text-sm">
                                You can still be a hero! Sponsor {dog.name}'s meals or medical care.
                            </p>
                            <SponsorshipModal dogName={dog.name} />
                        </div>

                        <h3 className="text-2xl font-bold mb-6 font-heading text-foreground dark:text-white">Adopt {dog.name}</h3>
                        <AdoptionForm dogName={dog.name} dogId={dog.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

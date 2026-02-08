import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { dogs } from "@/data/dogs";
import { Button } from "@/components/ui/button";
import { MapPin, Info, CheckCircle, ArrowLeft, Share2, Heart } from "lucide-react";
// import { AdoptionForm } from "@/components/adopt/AdoptionForm"; // Likely missing, commenting out

type Props = {
    params: Promise<{ id: string }>;
};

export default async function DogDetailPage({ params }: Props) {
    const { id } = await params;
    const dog = dogs.find(d => d.id === id);

    if (!dog) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24 pt-10">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/adopt">
                    <Button variant="ghost" className="gap-2 text-slate-500 hover:text-orange-600">
                        <ArrowLeft className="w-4 h-4" /> Back to Dogs
                    </Button>
                </Link>
            </div>

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden border border-orange-100 dark:border-zinc-800 shadow-xl shadow-orange-100/50 dark:shadow-none">
                        <Image src={dog.imageUrl} alt={dog.name} fill className="object-cover" priority />
                        <div className="absolute top-4 right-4 flex gap-2">
                            {/* Mock buttons for visuals */}
                            <button className="p-3 bg-white/90 rounded-full shadow-md text-slate-400 hover:text-orange-500 transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-4xl md:text-6xl font-bold font-heading text-slate-900 dark:text-slate-100">{dog.name}</h1>
                            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${dog.tag === 'Urgent' ? 'bg-red-500 text-white' :
                                    dog.tag === 'New' ? 'bg-indigo-500 text-white' :
                                        'bg-green-100 text-green-700 dark:bg-zinc-800 dark:text-green-400'
                                }`}>
                                {dog.tag || 'Available'}
                            </span>
                        </div>

                        <p className="text-xl text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-6">
                            <MapPin className="w-5 h-5 text-orange-500" /> {dog.location}
                        </p>

                        <div className="grid grid-cols-3 gap-4 border-y border-orange-100 dark:border-zinc-800 py-6">
                            <div className="text-center border-r border-orange-100 dark:border-zinc-800 last:border-0">
                                <span className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Breed</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base">{dog.breed}</span>
                            </div>
                            <div className="text-center border-r border-orange-100 dark:border-zinc-800 last:border-0">
                                <span className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Age</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">{dog.age}</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Gender</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">{dog.gender}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-600 dark:text-orange-400">
                            <Info className="w-5 h-5" /> About {dog.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                            {dog.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {dog.temperamentTags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm text-slate-600 dark:text-slate-300">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Medical Status</h3>
                        <div className="flex flex-wrap gap-3">
                            {dog.vaccinated && <span className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Vaccinated</span>}
                            {dog.neutered && <span className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Spayed/Neutered</span>}
                            {dog.goodWithKids ? (
                                <span className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg text-sm font-medium flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Good with Kids</span>
                            ) : (
                                <span className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-medium flex items-center gap-2">Best in quiet home</span>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-orange-100 dark:border-zinc-800">
                        {/* Placeholder for form */}
                        <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 text-lg rounded-xl shadow-xl shadow-orange-500/20">
                            Apply to Adopt {dog.name}
                        </Button>
                        <p className="text-center text-sm text-slate-500 mt-4">
                            Application process takes 2-3 days.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

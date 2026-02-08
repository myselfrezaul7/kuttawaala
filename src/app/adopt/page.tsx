import { Metadata } from 'next';
import { dogs } from '@/data/dogs';
import { PetCard } from '@/components/shared/PetCard';

export const metadata: Metadata = {
    title: 'Adopt a Dog | Kuttawaala',
    description: 'Find your new best friend. Browse our available dogs for adoption.',
};

export default function AdoptPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
                        Adopt a <span className="text-orange-600">Friend</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        These lovely dogs are waiting for a forever home. Adopt, don&apos;t shop!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dogs.map((dog) => (
                        // @ts-ignore
                        <PetCard key={dog.id} cat={dog} />
                    ))}
                </div>
            </div>
        </div>
    );
}

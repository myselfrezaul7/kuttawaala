"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { dogs } from "@/data/dogs";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import { Heart, Search, Gift, LogOut } from "lucide-react";

export default function DashboardPage() {
    const { user, signOut, loading } = useAuth();
    const { favoriteIds } = useFavorites();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Filter favorite dogs
    const favoriteDogs = dogs.filter(dog => favoriteIds.includes(dog.id));

    // Determine initial based on name
    const getInitials = (name: string) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [seeding, setSeeding] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (user && !seeding) {
            setSeeding(true);
            import("@/utils/seed-data").then(({ seedData }) => {
                seedData().catch(console.error).finally(() => setSeeding(false));
            });
        }
    }, [user, seeding]);

    // Redirect if logic would be here, but we are mocking auth
    if (!user) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-secondary/50/20">
                <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
                <p className="mb-6 text-muted-foreground">You need to sign in to access your dashboard.</p>
                <Link href="/login"><Button>Go to Login</Button></Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary/50/30 dark:bg-zinc-900 pb-24">
            <div className="container mx-auto px-4 py-12">

                {/* Profile Card */}
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-border dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-xl shadow-secondary/50 dark:shadow-none">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar */}
                        <div className="relative group cursor-pointer" onClick={() => alert("Profile editing coming soon!")}>
                            {user.photoURL ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={user.photoURL || ""} alt={user.displayName || "User"} className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-zinc-800 shadow-lg" />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center border-4 border-white dark:border-zinc-800 shadow-lg text-white text-4xl font-bold">
                                    {getInitials(user.displayName || "User")}
                                </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full">
                                <span className="text-white text-xs font-bold">Edit</span>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <h1 className="text-4xl font-bold text-foreground dark:text-muted font-heading">
                                {user.displayName || "User"}
                            </h1>
                            <p className="text-muted-foreground dark:text-muted-foreground/80">{user.email}</p>

                            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                                <div className="bg-white dark:bg-zinc-950 px-6 py-3 rounded-2xl border border-border dark:border-zinc-800 flex items-center gap-3">
                                    <Heart className="w-5 h-5 text-primary" />
                                    <span className="font-bold text-foreground dark:text-muted">{favoriteIds.length}</span>
                                    <span className="text-muted-foreground text-sm">Favorites</span>
                                </div>
                            </div>

                            <div className="pt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                                <Button onClick={() => alert("Coming soon!")} variant="outline" className="rounded-xl border-border text-primary hover:bg-secondary/50">
                                    Edit Profile
                                </Button>
                                <Link href="/adopt">
                                    <Button className="rounded-xl bg-card text-white hover:bg-primary/90">
                                        Find a Dog
                                    </Button>
                                </Link>
                                <Button onClick={signOut} variant="ghost" className="rounded-xl text-muted-foreground hover:text-red-600">
                                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Favorites Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 font-heading">
                        <span className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary">
                            <Heart className="w-5 h-5 fill-current" />
                        </span>
                        Your Favorite Dogs
                    </h2>

                    {favoriteDogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {favoriteDogs.map(dog => (
                                // @ts-ignore
                                <PetCard key={dog.id} dog={dog} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] border border-dashed border-border dark:border-zinc-800">
                            <div className="text-6xl mb-4">😿</div>
                            <h3 className="text-xl font-bold mb-2 text-foreground dark:text-muted">No favorites yet</h3>
                            <p className="text-muted-foreground mb-6">Go find some furry friends to add to your list.</p>
                            <Link href="/adopt">
                                <Button className="bg-primary/90 hover:bg-primary">Browse Dogs</Button>
                            </Link>
                        </div>
                    )}
                </section>

                {/* Quick Actions */}
                <section>
                    <h2 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-primary font-heading">
                        Explore More
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link href="/find-vet" className="group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-border dark:border-zinc-800 flex items-start gap-6">
                            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-500 text-3xl group-hover:scale-110 transition-transform">
                                🏥
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Find a Vet</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Locate trusted veterinary clinics near you.</p>
                            </div>
                        </Link>

                        <Link href="/community" className="group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-border dark:border-zinc-800 flex items-start gap-6">
                            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-500 text-3xl group-hover:scale-110 transition-transform">
                                💬
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">Community</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Join discussions and share your dog stories.</p>
                            </div>
                        </Link>

                        <Link href="/memorial" className="group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-border dark:border-zinc-800 flex items-start gap-6">
                            <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-500 text-3xl group-hover:scale-110 transition-transform">
                                🕊️
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">Memorial Wall</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Honor the memory of beloved pets.</p>
                            </div>
                        </Link>

                        <Link href="/quiz" className="group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-border dark:border-zinc-800 flex items-start gap-6">
                            <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-amber-500 text-3xl group-hover:scale-110 transition-transform">
                                🧩
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors">Dog Personality Quiz</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Find out which dog matches your lifestyle.</p>
                            </div>
                        </Link>

                        <Link href="/volunteer" className="group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-border dark:border-zinc-800 flex items-start gap-6">
                            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-500 text-3xl group-hover:scale-110 transition-transform">
                                🤝
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">Volunteer</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Help us make a difference in the streets.</p>
                            </div>
                        </Link>

                        <div onClick={() => alert("Donation feature coming soon!")} className="cursor-pointer group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-border dark:border-zinc-800 flex items-start gap-6">
                            <div className="w-16 h-16 bg-secondary/50 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">
                                <Gift className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Make a Donation</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Support our rescue missions.</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { dogs } from "@/data/dogs";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import { Heart, Search, Gift, LogOut, Award, Trophy } from "lucide-react";
import { Badges } from "@/components/dashboard/Badges";

export default function DashboardPage() {
    const { user, signOut, loading } = useAuth();
    const { favoriteIds } = useFavorites();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("favorites");

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
                <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar */}
                        <div className="relative group cursor-pointer" onClick={() => alert("Profile editing coming soon!")}>
                            {user.photoURL ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={user.photoURL || ""} alt={user.displayName || "User"} className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-sm" />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-sm text-primary text-4xl font-bold">
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
                                <div className="bg-secondary px-6 py-3 rounded-2xl border border-border flex items-center gap-3">
                                    <Heart className="w-5 h-5 text-primary" />
                                    <span className="font-bold text-foreground">{favoriteIds.length}</span>
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

                {/* Tabs */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    <Button
                        variant={activeTab === 'favorites' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('favorites')}
                        className="rounded-full"
                    >
                        Favorites
                    </Button>
                    <Button
                        variant={activeTab === 'achievements' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('achievements')}
                        className="rounded-full gap-2"
                    >
                        Awards 🏆
                    </Button>
                </div>

                {/* Favorites Tab */}
                {activeTab === 'favorites' && (
                    <section className="mb-20 animate-in fade-in slide-in-from-bottom-4">
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
                            <div className="text-center bg-card p-12 rounded-[2.5rem] border border-dashed border-border">
                                <div className="text-6xl mb-4">😿</div>
                                <h3 className="text-xl font-bold mb-2 text-foreground">No favorites yet</h3>
                                <p className="text-muted-foreground mb-6">Go find some furry friends to add to your list.</p>
                                <Link href="/adopt">
                                    <Button className="bg-primary/90 hover:bg-primary">Browse Dogs</Button>
                                </Link>
                            </div>
                        )}
                    </section>
                )}

                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                    <section className="mb-20 animate-in fade-in slide-in-from-bottom-4">
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="bg-card p-8 rounded-[2.5rem] border border-border shadow-sm">
                                    <h3 className="text-2xl font-bold mb-6 font-heading flex items-center gap-2">
                                        <Award className="w-6 h-6 text-orange-500" /> Your Badges
                                    </h3>
                                    <Badges />
                                </div>
                            </div>
                            <div>
                                <div className="bg-card p-8 rounded-[2.5rem] border border-border shadow-sm">
                                    <h3 className="text-xl font-bold mb-6 font-heading flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Leaderboard
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'Sarah', points: 2400, avatar: '👩' },
                                            { name: 'Rahim', points: 1850, avatar: '👨' },
                                            { name: 'You', points: 450, avatar: getInitials(user.displayName || 'User'), isMe: true },
                                            { name: 'Fatima', points: 300, avatar: '🧕' },
                                        ].map((u, i) => (
                                            <div key={i} className={`flex items-center gap-4 p-3 rounded-2xl ${u.isMe ? 'bg-secondary border border-border' : ''}`}>
                                                <div className="font-bold text-muted-foreground w-4">{i + 1}</div>
                                                <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-lg border border-border">
                                                    {u.avatar}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-foreground">{u.name}</div>
                                                    <div className="text-xs text-muted-foreground">{u.points} pts</div>
                                                </div>
                                                {i === 0 && <span className="text-2xl">🥇</span>}
                                                {i === 1 && <span className="text-2xl">🥈</span>}
                                                {i === 2 && <span className="text-2xl">🥉</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Quick Actions */}
                <section>
                    <h2 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-primary font-heading">
                        Explore More
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link href="/find-vet" className="group bg-card p-8 rounded-[2rem] transition-all border border-border hover:border-primary/50 flex items-start gap-6">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">
                                🏥
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Find a Vet</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Locate trusted veterinary clinics near you.</p>
                            </div>
                        </Link>

                        <Link href="/community" className="group bg-card p-8 rounded-[2rem] transition-all border border-border hover:border-primary/50 flex items-start gap-6">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">
                                💬
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Community</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Join discussions and share your dog stories.</p>
                            </div>
                        </Link>

                        <Link href="/memorial" className="group bg-card p-8 rounded-[2rem] transition-all border border-border hover:border-primary/50 flex items-start gap-6">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">
                                🕊️
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Memorial Wall</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Honor the memory of beloved pets.</p>
                            </div>
                        </Link>

                        <Link href="/quiz" className="group bg-card p-8 rounded-[2rem] transition-all border border-border hover:border-primary/50 flex items-start gap-6">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">
                                🧩
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Dog Personality Quiz</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Find out which dog matches your lifestyle.</p>
                            </div>
                        </Link>

                        <Link href="/volunteer" className="group bg-card p-8 rounded-[2rem] transition-all border border-border hover:border-primary/50 flex items-start gap-6">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">
                                🤝
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Volunteer</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Help us make a difference in the streets.</p>
                            </div>
                        </Link>

                        <div onClick={() => alert("Donation feature coming soon!")} className="cursor-pointer group bg-card p-8 rounded-[2rem] transition-all border border-border hover:border-primary/50 flex items-start gap-6">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">
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

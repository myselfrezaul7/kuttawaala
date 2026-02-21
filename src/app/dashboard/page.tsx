"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { dogs } from "@/data/dogs";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import { Heart, Gift, LogOut, Award, Trophy, FileText, AlertTriangle, FileCheck, FileX, Loader2 } from "lucide-react";
import { Badges } from "@/components/dashboard/Badges";
import { ProfileModal } from "@/components/dashboard/ProfileModal";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export default function DashboardPage() {
    const { user, userData, signOut, loading } = useAuth();
    const { favoriteIds } = useFavorites();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("favorites");

    const [applications, setApplications] = useState<any[]>([]);
    const [reports, setReports] = useState<any[]>([]);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [fetchingData, setFetchingData] = useState(false);

    // Filter favorite dogs based on IDs
    const favoriteDogs = dogs.filter(dog => favoriteIds.includes(dog.id));

    const getInitials = (name: string) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;
            setFetchingData(true);
            try {
                // Fetch Applications
                const appQ = query(collection(db, "adoptions"), where("userId", "==", user.uid));
                const appSnap = await getDocs(appQ);
                setApplications(appSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a: any, b: any) => b.created_at - a.created_at));

                // Fetch Reports
                const repQ = query(collection(db, "reports"), where("user_id", "==", user.uid));
                const repSnap = await getDocs(repQ);
                setReports(repSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a: any, b: any) => (b.created_at || 0) - (a.created_at || 0)));

                // Fetch Leaderboard (sort in JS to avoid missing index errors)
                const leadSnap = await getDocs(collection(db, "users"));
                const usersList = leadSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                usersList.sort((a: any, b: any) => (b.points || 0) - (a.points || 0));
                setLeaderboard(usersList.slice(0, 10));
            } catch (e) {
                console.error("Error fetching user data:", e);
                toast.error("Failed to sync some dashboard data.");
            } finally {
                setFetchingData(false);
            }
        };
        fetchUserData();
    }, [user]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    }

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
                        <div className="relative group cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
                            {user.photoURL ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={user.photoURL || ""} alt={user.displayName || "User"} className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-sm bg-secondary" />
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
                            <h1 className="text-4xl font-bold text-foreground dark:text-muted font-heading flex flex-col sm:flex-row items-center sm:items-baseline gap-2">
                                {user.displayName || "User"}
                                <span className="text-xl text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">{userData?.points || 0} pts</span>
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
                                <Button onClick={() => setIsEditModalOpen(true)} variant="outline" className="rounded-xl border-border text-primary hover:bg-secondary/50">
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
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    <Button variant={activeTab === 'favorites' ? 'default' : 'outline'} onClick={() => setActiveTab('favorites')} className="rounded-full shrink-0">
                        Favorites
                    </Button>
                    <Button variant={activeTab === 'applications' ? 'default' : 'outline'} onClick={() => setActiveTab('applications')} className="rounded-full gap-2 shrink-0">
                        My Applications
                    </Button>
                    <Button variant={activeTab === 'reports' ? 'default' : 'outline'} onClick={() => setActiveTab('reports')} className="rounded-full gap-2 shrink-0">
                        My Reports
                    </Button>
                    <Button variant={activeTab === 'achievements' ? 'default' : 'outline'} onClick={() => setActiveTab('achievements')} className="rounded-full gap-2 shrink-0">
                        Leaderboard 🏆
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

                {/* Applications Tab */}
                {activeTab === 'applications' && (
                    <section className="mb-20 animate-in fade-in slide-in-from-bottom-4">
                        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 font-heading">
                            <span className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary">
                                <FileText className="w-5 h-5" />
                            </span>
                            Adoption Applications
                        </h2>
                        {fetchingData ? (
                            <div className="text-center py-12"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>
                        ) : applications.length > 0 ? (
                            <div className="grid gap-4">
                                {applications.map((app) => (
                                    <div key={app.id} className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold">Application for <span className="text-primary">{app.dogName}</span></h3>
                                            <p className="text-sm text-muted-foreground">Submitted {app.created_at ? formatDistanceToNow(new Date(app.created_at), { addSuffix: true }) : 'recently'}</p>
                                        </div>
                                        <div className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 ${app.status === 'Approved' ? 'bg-green-100/50 text-green-700' : app.status === 'Rejected' ? 'bg-red-100/50 text-red-700' : 'bg-amber-100/50 text-amber-700'}`}>
                                            {app.status === 'Approved' ? <FileCheck className="w-5 h-5" /> : app.status === 'Rejected' ? <FileX className="w-5 h-5" /> : <Loader2 className="w-5 h-5 animate-spin" />}
                                            {app.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center bg-card p-12 rounded-[2.5rem] border border-dashed border-border">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-xl font-bold mb-2">No active applications</h3>
                                <p className="text-muted-foreground mb-6">When you apply to adopt a dog, track the status here.</p>
                                <Link href="/adopt"><Button>Find a Dog</Button></Link>
                            </div>
                        )}
                    </section>
                )}

                {/* Reports Tab */}
                {activeTab === 'reports' && (
                    <section className="mb-20 animate-in fade-in slide-in-from-bottom-4">
                        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 font-heading">
                            <span className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-orange-500 bg-orange-100 dark:bg-orange-900/30">
                                <AlertTriangle className="w-5 h-5" />
                            </span>
                            My Rescue Reports
                        </h2>
                        {fetchingData ? (
                            <div className="text-center py-12"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>
                        ) : reports.length > 0 ? (
                            <div className="grid gap-4">
                                {reports.map((report) => (
                                    <div key={report.id} className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4 hover:border-orange-200 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${report.type === 'Injured' ? 'bg-red-100/80 text-red-700 dark:bg-red-900/40' : report.type === 'Lost' ? 'bg-orange-100/80 text-orange-700 dark:bg-orange-900/40' : 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/40'}`}>
                                                    {report.type} Dog
                                                </span>
                                                <span className="text-xs text-muted-foreground font-medium">
                                                    {report.created_at ? formatDistanceToNow(new Date(report.created_at), { addSuffix: true }) : 'Recently'}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium mb-1 line-clamp-2 leading-relaxed">{report.description}</p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                                                📍 {report.location_text}
                                            </p>
                                        </div>
                                        {report.image_url && (
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-border">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={report.image_url} alt="Reported" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center bg-card p-12 rounded-[2.5rem] border border-dashed border-border border-orange-200">
                                <div className="text-6xl mb-4 opacity-80">🚨</div>
                                <h3 className="text-xl font-bold mb-2">No reports filed</h3>
                                <p className="text-muted-foreground mb-6">If you spot a dog in danger, report it to our volunteer network.</p>
                                <Link href="/report"><Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 font-bold bg-orange-50">Report a Rescue</Button></Link>
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
                                    {fetchingData ? (
                                        <div className="py-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                                    ) : (
                                        <div className="space-y-4">
                                            {leaderboard.length > 0 ? leaderboard.map((u, i) => (
                                                <div key={u.id} className={`flex items-center gap-4 p-3 rounded-2xl ${u.id === user.uid ? 'bg-secondary border border-border scale-105 shadow-sm' : ''}`}>
                                                    <div className="font-bold text-muted-foreground w-4">{i + 1}</div>
                                                    <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-sm border border-border overflow-hidden">
                                                        {u.photoURL ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img src={u.photoURL} className="w-full h-full object-cover" alt="" />
                                                        ) : (
                                                            getInitials(u.name || 'User')
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-foreground text-sm">{u.id === user.uid ? 'You' : u.name}</div>
                                                        <div className="text-xs text-muted-foreground">{u.points || 0} pts</div>
                                                    </div>
                                                    {i === 0 && <span className="text-2xl drop-shadow-sm">🥇</span>}
                                                    {i === 1 && <span className="text-2xl drop-shadow-sm">🥈</span>}
                                                    {i === 2 && <span className="text-2xl drop-shadow-sm">🥉</span>}
                                                </div>
                                            )) : (
                                                <div className="text-center text-sm text-muted-foreground py-4">No points recorded yet.</div>
                                            )}
                                        </div>
                                    )}
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
                        <Link href="/find-vet" className="group bg-card p-8 rounded-[2rem] transition-all border border-border hover:border-primary/50 flex items-start gap-6 shadow-sm hover:shadow-md">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">🏥</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Find a Vet</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Locate trusted veterinary clinics near you.</p>
                            </div>
                        </Link>

                        <Link href="/community" className="group bg-card p-8 rounded-[2rem] transition-all border border-border hover:border-primary/50 flex items-start gap-6 shadow-sm hover:shadow-md">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">💬</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Community</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Join discussions and share your dog stories.</p>
                            </div>
                        </Link>

                        <Link href="/memorial" className="group bg-card p-8 rounded-[2rem] transition-all border border-border hover:border-primary/50 flex items-start gap-6 shadow-sm hover:shadow-md">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">🕊️</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Memorial Wall</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Honor the memory of beloved pets.</p>
                            </div>
                        </Link>

                        <Link href="/quiz" className="group bg-card p-8 rounded-[2rem] transition-all border border-border hover:border-primary/50 flex items-start gap-6 shadow-sm hover:shadow-md">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">🧩</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Dog Personality Quiz</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Find out which dog matches your lifestyle.</p>
                            </div>
                        </Link>

                        <Link href="/donate" className="group bg-card p-8 rounded-[2rem] transition-all border border-border hover:border-primary/50 flex items-start gap-6 shadow-sm hover:shadow-md">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">
                                <Gift className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Make a Donation</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Support our rescue missions.</p>
                            </div>
                        </Link>
                    </div>
                </section>
            </div>

            <ProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
        </div>
    );
}

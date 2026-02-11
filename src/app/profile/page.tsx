"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-muted/30 dark:bg-zinc-950 pt-10 pb-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-border/50 dark:border-zinc-800 p-8">
                    <div className="flex items-center gap-6 mb-8">
                        {user.photoURL ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={user.photoURL}
                                alt={user.displayName || "User"}
                                className="w-20 h-20 rounded-full object-cover border-4 border-border/50 dark:border-zinc-800"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-muted dark:bg-zinc-800 flex items-center justify-center">
                                <User className="w-8 h-8 text-muted-foreground/80" />
                            </div>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold font-heading text-foreground dark:text-white">
                                {user.displayName || "Kuttawaala User"}
                            </h1>
                            <p className="text-muted-foreground">{user.email}</p>
                            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                <Button onClick={() => alert("Coming soon!")} variant="outline" className="rounded-xl border-border text-primary hover:bg-secondary/50">
                                    Edit Profile
                                </Button>
                                <Link href="/admin">
                                    <Button variant="outline" className="rounded-xl border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                                        Admin Dashboard
                                    </Button>
                                </Link>
                                <Link href="/adopt">
                                    <Button className="rounded-xl bg-card text-white hover:bg-primary/90">
                                        Find a Dog
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border/50 dark:border-zinc-800 pt-8">
                        <h2 className="text-lg font-bold mb-4 font-heading">Account Settings</h2>
                        <Button
                            variant="destructive"
                            onClick={signOut}
                            className="flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

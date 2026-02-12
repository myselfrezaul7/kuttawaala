"use client";

// Imports updated
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, User, Heart, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemorialService } from "@/services/MemorialService";
import { ReportService } from "@/services/ReportService";
import { Memorial, Report } from "@/services/server-data";

export default function ProfilePage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [tributes, setTributes] = useState<Memorial[]>([]);
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            MemorialService.getByUserId(user.uid).then(setTributes);
            ReportService.getByUserId(user.uid).then(setReports);
        }
    }, [user, loading, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-muted/30 dark:bg-zinc-950 pt-10 pb-20 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Profile Header */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-border/50 dark:border-zinc-800 p-8 mb-8">
                    <div className="flex items-center gap-6">
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
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold font-heading text-foreground dark:text-white">
                                {user.displayName || "Kuttawaala User"}
                            </h1>
                            <p className="text-muted-foreground">{user.email}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Link href="/admin">
                                    <Button variant="outline" className="rounded-xl border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                                        Admin Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    onClick={signOut}
                                    className="flex items-center gap-2 rounded-xl"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-border/50 dark:border-zinc-800 p-6 min-h-[400px]">
                    <Tabs defaultValue="tributes" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="tributes" className="text-lg">My Tributes</TabsTrigger>
                            <TabsTrigger value="reports" className="text-lg">My Reports</TabsTrigger>
                        </TabsList>

                        <TabsContent value="tributes" className="space-y-4">
                            {tributes.length === 0 ? (
                                <div className="text-center py-10 text-muted-foreground">
                                    <Heart className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>You haven't posted any tributes yet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {tributes.map((tribute) => (
                                        <div key={tribute.id} className="border border-border rounded-xl p-4 flex gap-4 items-start">
                                            {tribute.image_url && (
                                                <img src={tribute.image_url} alt={tribute.pet_name} className="w-16 h-16 rounded-lg object-cover" />
                                            )}
                                            <div>
                                                <h3 className="font-bold">{tribute.pet_name}</h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2">{tribute.tribute}</p>
                                                <span className="text-xs text-muted-foreground mt-2 block">
                                                    {new Date(tribute.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="reports" className="space-y-4">
                            {reports.length === 0 ? (
                                <div className="text-center py-10 text-muted-foreground">
                                    <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>You haven't submitted any reports yet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {reports.map((report) => (
                                        <div key={report.id} className="border border-border rounded-xl p-4 flex justify-between items-center">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${report.type === 'Injured' ? 'bg-red-100 text-red-700' :
                                                        report.type === 'Lost' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-green-100 text-green-700'
                                                        }`}>
                                                        {report.type}
                                                    </span>
                                                    <span className="text-sm font-semibold">{report.location_text}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-1">{report.description}</p>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(report.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${report.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-blue-50 text-blue-800'
                                                    }`}>
                                                    {report.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

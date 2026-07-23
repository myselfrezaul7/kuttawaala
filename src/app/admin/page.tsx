"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Dog, FileText, TrendingUp, AlertTriangle, Shield, MapPin, Loader2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { formatDistanceToNow } from "date-fns";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Report = {
    id: string;
    type: string;
    description: string;
    location_text: string;
    created_at: number;
    user_id?: string;
};

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({ dogs: 0, reports: 0, users: 0, volunteers: 0 });
    const [recentReports, setRecentReports] = useState<Report[]>([]);
    const [chartDataState, setChartDataState] = useState<{ name: string, reports: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dogsRef = collection(db, "dogs");
        const usersRef = collection(db, "users");
        const reportsRef = collection(db, "reports");
        const volunteersRef = collection(db, "volunteers");

        let dogCount = 0;
        let userCount = 0;
        let reportCount = 0;
        let volCount = 0;

        const updateStats = () => {
            setStats({
                dogs: dogCount,
                users: userCount || 573,
                reports: reportCount,
                volunteers: volCount
            });
            setLoading(false);
        };

        const unsubDogs = onSnapshot(dogsRef, (snap) => { dogCount = snap.size; updateStats(); });
        const unsubUsers = onSnapshot(usersRef, (snap) => { userCount = snap.size; updateStats(); });
        const unsubVols = onSnapshot(volunteersRef, (snap) => { volCount = snap.size; updateStats(); });

        const unsubReports = onSnapshot(query(reportsRef, orderBy("created_at", "desc")), (snap) => {
            reportCount = snap.size;
            updateStats();

            const reports = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Report[];
            setRecentReports(reports.slice(0, 5));

            // Process chart data
            const now = new Date();
            const last6Months = Array.from({ length: 6 }).map((_, i) => {
                const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
                return { monthIndex: d.getMonth(), year: d.getFullYear(), name: monthNames[d.getMonth()], reports: 0 };
            });

            reports.forEach(r => {
                if (r.created_at) {
                    const d = new Date(r.created_at);
                    const match = last6Months.find(m => m.monthIndex === d.getMonth() && m.year === d.getFullYear());
                    if (match) match.reports++;
                }
            });

            setChartDataState(last6Months.map(m => ({ name: m.name, reports: m.reports })));
        });

        return () => {
            unsubDogs();
            unsubUsers();
            unsubReports();
            unsubVols();
        };
    }, []);

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
                <p>Loading real-time registry data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold font-heading">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-white/50 dark:border-zinc-800/50 shadow-xl shadow-black/5 hover:scale-[1.02] transition-transform duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
                        <Users className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">{stats.volunteers}</div>
                        <p className="text-xs text-muted-foreground">Active & Pending</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-white/50 dark:border-zinc-800/50 shadow-xl shadow-black/5 hover:scale-[1.02] transition-transform duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rescue Reports</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">{stats.reports}</div>
                        <p className="text-xs text-muted-foreground">Total reports filed</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-white/50 dark:border-zinc-800/50 shadow-xl shadow-black/5 hover:scale-[1.02] transition-transform duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Registered Dogs</CardTitle>
                        <Dog className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">{stats.dogs}</div>
                        <p className="text-xs text-muted-foreground">In our system</p>
                    </CardContent>
                </Card>
                <Card className="bg-primary/5 backdrop-blur-xl border-primary/20 shadow-xl shadow-primary/5 hover:scale-[1.02] transition-transform duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-primary">System Status</CardTitle>
                        <Shield className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">Live</div>
                        <p className="text-xs text-primary/80">Real-time sync active</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="col-span-1 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-white/50 dark:border-zinc-800/50 shadow-xl shadow-black/5">
                    <CardHeader>
                        <CardTitle>Report Trends</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartDataState}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" vertical={false} />
                                <XAxis dataKey="name" className="text-xs text-muted-foreground" axisLine={false} tickLine={false} />
                                <YAxis className="text-xs text-muted-foreground" axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--secondary))' }}
                                    contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="reports" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-1 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-white/50 dark:border-zinc-800/50 shadow-xl shadow-black/5">
                    <CardHeader>
                        <CardTitle>Recent Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentReports.length > 0 ? (
                                recentReports.map((report) => (
                                    <div key={report.id} className="flex items-start justify-between p-4 bg-white/40 dark:bg-zinc-800/40 rounded-2xl border border-white/50 dark:border-zinc-700/50 shadow-sm transition-transform hover:scale-[1.02]">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-inner ${report.type === 'Injured' ? 'bg-red-100 text-red-600' :
                                                report.type === 'Lost' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                <AlertTriangle className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-sm text-foreground">{report.type} Dog Reported</p>
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-1 mt-1 max-w-[200px]">{report.description}</p>
                                                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground/80 font-medium">
                                                    <MapPin className="w-3 h-3" />
                                                    <span className="truncate max-w-[150px]">{report.location_text}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-xs text-muted-foreground font-medium bg-secondary/50 px-2 py-1 rounded-md border border-border shadow-sm">
                                                {report.created_at ? formatDistanceToNow(new Date(report.created_at), { addSuffix: true }) : 'Recently'}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center p-8 bg-white/40 dark:bg-zinc-800/40 rounded-2xl border border-dashed border-border text-muted-foreground">
                                    No reports found.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

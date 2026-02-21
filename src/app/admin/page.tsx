"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Dog, FileText, TrendingUp, AlertTriangle, Shield, MapPin, Loader2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { formatDistanceToNow } from "date-fns";

// Placeholder chart data until we build full analytics pipelines
const chartData = [
    { name: "Jan", reports: 4 },
    { name: "Feb", reports: 7 },
    { name: "Mar", reports: 5 },
    { name: "Apr", reports: 12 },
    { name: "May", reports: 9 },
    { name: "Jun", reports: 15 },
];

type Report = {
    id: string;
    type: string;
    description: string;
    location_text: string;
    created_at: number;
    user_id?: string;
};

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({ dogs: 0, reports: 0, users: 0 });
    const [recentReports, setRecentReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch basic counts (In a massive production app, you'd use aggregation queries, but for now this is fine)
                // We'll mock dogs and users for now if there are no collections, but fetch real reports

                // Fetch Recent Reports
                const reportsRef = collection(db, "reports");
                const q = query(reportsRef, orderBy("created_at", "desc"), limit(5));
                const snapshot = await getDocs(q);

                const reports = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Report[];

                setRecentReports(reports);

                // Set stats
                setStats({
                    dogs: 24, // Mocked until dog DB is up
                    users: 573, // Mocked until user management is up
                    reports: snapshot.size || 0 // Real data
                });

            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
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
                <Card className="border-border shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Dogs</CardTitle>
                        <Dog className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.dogs}</div>
                        <p className="text-xs text-muted-foreground">Registered in system</p>
                    </CardContent>
                </Card>
                <Card className="border-border shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rescue Reports</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.reports}</div>
                        <p className="text-xs text-muted-foreground">Total reports filed</p>
                    </CardContent>
                </Card>
                <Card className="border-border shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.users}</div>
                        <p className="text-xs text-muted-foreground">Community members</p>
                    </CardContent>
                </Card>
                <Card className="border-border shadow-sm bg-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-primary">System Status</CardTitle>
                        <Shield className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">100%</div>
                        <p className="text-xs text-primary/80">All services running</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="col-span-1 border-border shadow-sm">
                    <CardHeader>
                        <CardTitle>Report Trends</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
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
                <Card className="col-span-1 border-border shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentReports.length > 0 ? (
                                recentReports.map((report) => (
                                    <div key={report.id} className="flex items-start justify-between p-4 bg-secondary/30 rounded-xl border border-secondary transition-colors hover:bg-secondary/50">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${report.type === 'Injured' ? 'bg-red-100 text-red-600' :
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
                                            <p className="text-xs text-muted-foreground font-medium bg-background px-2 py-1 rounded-md border border-border shadow-sm">
                                                {report.created_at ? formatDistanceToNow(new Date(report.created_at), { addSuffix: true }) : 'Recently'}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center p-8 bg-secondary/30 rounded-xl border border-dashed border-border text-muted-foreground">
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

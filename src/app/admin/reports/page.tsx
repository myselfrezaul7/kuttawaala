"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, CheckCircle, Trash, MapPin } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

type Report = {
    id: string;
    type: string;
    description: string;
    location_text: string;
    created_at: number;
    status: string;
};

export default function AdminReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const reportsRef = collection(db, "reports");
            const snapshot = await getDocs(reportsRef);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Report[];
            setReports(data.sort((a, b) => (b.created_at || 0) - (a.created_at || 0)));
        } catch (error) {
            console.error("Error fetching reports:", error);
            toast.error("Failed to load reports");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "reports", id), { status: newStatus });
            toast.success(`Report marked as ${newStatus}`);
            fetchReports();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this report permanently?")) return;
        try {
            await deleteDoc(doc(db, "reports", id));
            toast.success("Report deleted");
            fetchReports();
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Failed to delete report");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold font-heading">Rescue Reports</h1>
                <p className="text-muted-foreground">Monitor and manage incoming emergency reports from the community.</p>
            </div>

            <Card className="border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> Active Reports ({reports.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : reports.length > 0 ? (
                        <div className="space-y-4">
                            {reports.map((report) => (
                                <div key={report.id} className={`p-5 rounded-xl border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center ${report.status === 'Resolved' ? 'bg-secondary/10 border-border/50 opacity-80' : 'bg-secondary/20 border-border'}`}>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${report.type === 'Injured' ? 'bg-red-100 text-red-600' :
                                                    report.type === 'Lost' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                <AlertTriangle className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-lg">{report.type} Dog</h3>
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${report.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {report.status || 'Pending'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{report.location_text}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm bg-background p-3 rounded-lg border border-border shadow-sm text-foreground">
                                            {report.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
                                        <p className="text-xs text-muted-foreground font-medium bg-background px-2 py-1 rounded-md border border-border shadow-sm">
                                            {report.created_at ? formatDistanceToNow(new Date(report.created_at), { addSuffix: true }) : 'Recently'}
                                        </p>
                                        <div className="flex gap-2 justify-end">
                                            {report.status !== 'Resolved' && (
                                                <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleUpdateStatus(report.id, 'Resolved')}>
                                                    <CheckCircle className="w-4 h-4 mr-1" /> Mark Resolved
                                                </Button>
                                            )}
                                            <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(report.id)}>
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-12 border-2 border-dashed border-border rounded-xl">
                            <AlertTriangle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <h3 className="text-lg font-bold">No reports found</h3>
                            <p className="text-muted-foreground mt-1">There are no rescue reports in the system.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

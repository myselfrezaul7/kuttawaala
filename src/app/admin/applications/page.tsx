"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, CheckCircle, XCircle, Trash } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

type Application = {
    id: string;
    dogId: string;
    dogName: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    status: "Pending" | "Approved" | "Rejected";
    created_at: number;
    experience: string;
};

export default function AdminApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const appRef = collection(db, "adoptions");
            const snapshot = await getDocs(appRef);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Application[];
            setApplications(data.sort((a, b) => (b.created_at || 0) - (a.created_at || 0)));
        } catch (error) {
            console.error("Error fetching applications:", error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "adoptions", id), { status: newStatus });
            toast.success(`Application marked as ${newStatus}`);
            fetchApplications();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this application log permanently?")) return;
        try {
            await deleteDoc(doc(db, "adoptions", id));
            toast.success("Application deleted");
            fetchApplications();
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Failed to delete application");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold font-heading">Adoption Applications</h1>
                <p className="text-muted-foreground">Review and manage adoption requests from the community.</p>
            </div>

            <Card className="border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" /> Submitted Applications ({applications.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : applications.length > 0 ? (
                        <div className="space-y-4">
                            {applications.map((app) => (
                                <div key={app.id} className="p-5 rounded-xl border border-border bg-secondary/20 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg">{app.applicantName}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-md font-bold ${app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                    app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {app.status || 'Pending'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Applied for: <span className="font-bold text-foreground">{app.dogName}</span></p>
                                        <p className="text-xs text-muted-foreground">
                                            {app.applicantEmail} • {app.applicantPhone}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2 bg-background p-2 rounded border border-border inline-block">
                                            Experience: {app.experience || 'Not provided'}
                                        </p>
                                    </div>
                                    <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
                                        <p className="text-xs text-muted-foreground font-medium bg-background px-2 py-1 rounded-md border border-border shadow-sm">
                                            {app.created_at ? formatDistanceToNow(new Date(app.created_at), { addSuffix: true }) : 'Recently'}
                                        </p>
                                        <div className="flex gap-2">
                                            {app.status !== 'Approved' && (
                                                <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleUpdateStatus(app.id, 'Approved')}>
                                                    <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                                </Button>
                                            )}
                                            {app.status !== 'Rejected' && (
                                                <Button size="sm" variant="outline" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50" onClick={() => handleUpdateStatus(app.id, 'Rejected')}>
                                                    <XCircle className="w-4 h-4 mr-1" /> Reject
                                                </Button>
                                            )}
                                            <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(app.id)}>
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-12 border-2 border-dashed border-border rounded-xl">
                            <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <h3 className="text-lg font-bold">No applications found</h3>
                            <p className="text-muted-foreground mt-1">When users submit adoption forms, they will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

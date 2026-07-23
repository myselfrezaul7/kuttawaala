"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Trash, Mail, HandHeart } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

type Volunteer = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    city: string;
    area: string;
    status: "Pending" | "Approved" | "Rejected";
    created_at: string;
    areas_of_interest: Record<string, boolean>;
    experience?: string;
};

export default function AdminVolunteersPage() {
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "volunteers"), orderBy("created_at", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Volunteer[];
            setVolunteers(data);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching volunteers:", error);
            toast.error("Failed to load volunteers");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "volunteers", id), { status: newStatus });
            toast.success(`Volunteer marked as ${newStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this volunteer application permanently?")) return;
        try {
            await deleteDoc(doc(db, "volunteers", id));
            toast.success("Application deleted");
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Failed to delete application");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold font-heading">Volunteer Applications</h1>
                <p className="text-muted-foreground">Review and manage people who want to help.</p>
            </div>

            <Card className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-white/50 dark:border-zinc-800/50 shadow-xl shadow-black/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HandHeart className="w-5 h-5" /> Submitted Applications ({volunteers.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : volunteers.length === 0 ? (
                        <div className="text-center p-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                            No volunteer applications yet.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {volunteers.map((vol) => (
                                <div key={vol.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/40 dark:bg-zinc-800/40 rounded-2xl border border-white/50 dark:border-zinc-700/50 shadow-sm gap-4 transition-transform hover:scale-[1.01]">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold text-lg">{vol.first_name} {vol.last_name}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${vol.status === 'Approved' ? 'bg-green-100 text-green-700 border-green-200' :
                                                vol.status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200' :
                                                    'bg-amber-100 text-amber-700 border-amber-200'
                                                }`}>
                                                {vol.status || 'Pending'}
                                            </span>
                                        </div>
                                        <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                                            <span><strong>Email:</strong> {vol.email}</span>
                                            <span><strong>Phone:</strong> {vol.phone}</span>
                                            <span><strong>Location:</strong> {vol.area}, {vol.city}</span>
                                        </div>
                                        <div className="mt-2 text-sm bg-secondary/30 p-3 rounded-lg border border-border">
                                            <span className="font-medium">Interests:</span> {
                                                vol.areas_of_interest 
                                                ? Object.entries(vol.areas_of_interest).filter(([_, v]) => v).map(([k]) => k).join(', ') || 'None specified'
                                                : 'None specified'
                                            }
                                            {vol.experience && (
                                                <p className="mt-2 text-muted-foreground line-clamp-2"><strong>Experience:</strong> {vol.experience}</p>
                                            )}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-2">
                                            Submitted {vol.created_at ? formatDistanceToNow(new Date(vol.created_at), { addSuffix: true }) : 'Unknown'}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 md:flex-col md:w-32 flex-shrink-0">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-start text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 dark:border-green-900/30"
                                            onClick={() => handleUpdateStatus(vol.id, "Approved")}
                                            disabled={vol.status === "Approved"}
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 dark:border-red-900/30"
                                            onClick={() => handleUpdateStatus(vol.id, "Rejected")}
                                            disabled={vol.status === "Rejected"}
                                        >
                                            <XCircle className="w-4 h-4 mr-2" /> Reject
                                        </Button>
                                        <a href={`mailto:${vol.email}`} className="w-full">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full justify-start"
                                            >
                                                <Mail className="w-4 h-4 mr-2" /> Email
                                            </Button>
                                        </a>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => handleDelete(vol.id)}
                                        >
                                            <Trash className="w-4 h-4 mr-2" /> Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

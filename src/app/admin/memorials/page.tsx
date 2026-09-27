"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, Trash, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { safeTimeAgo } from "@/utils/safeDateFormat";
import Image from "next/image";
import { Memorial } from "@/services/server-data";

export default function AdminMemorialsPage() {
    const [memorials, setMemorials] = useState<Memorial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "memorials"), orderBy("created_at", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Memorial[];
            setMemorials(data);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching memorials:", error);
            toast.error("Failed to load memorials");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            await updateDoc(doc(db, "memorials", id), {
                status: "Approved"
            });
            toast.success("Memorial approved and live on the wall!");
        } catch (error) {
            console.error("Error approving memorial:", error);
            toast.error("Failed to approve memorial");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this memorial permanently? This cannot be undone.")) return;
        try {
            await deleteDoc(doc(db, "memorials", id));
            toast.success("Memorial deleted");
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Failed to delete memorial");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold font-heading">Memorial Wall</h1>
                <p className="text-muted-foreground">Moderate community tributes and memorial submissions.</p>
            </div>

            <Card className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-white/50 dark:border-zinc-800/50 shadow-xl shadow-black/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-orange-500 fill-orange-500" /> All Memorials ({memorials.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : memorials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {memorials.map((memorial) => (
                                <div key={memorial.id} className="p-6 rounded-3xl border bg-white/40 dark:bg-zinc-800/40 border-border shadow-sm flex items-start gap-5 hover:bg-white/80 dark:hover:bg-zinc-800/70 transition-all group">
                                    <div className="w-20 h-20 rounded-full bg-muted overflow-hidden shrink-0 relative border-2 border-border shadow-sm">
                                        {memorial.image_url ? (
                                            <Image src={memorial.image_url} alt={memorial.pet_name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                <Heart className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-3 mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg text-foreground truncate">{memorial.pet_name}</h3>
                                                <p className="text-xs text-muted-foreground">by {memorial.owner_name || "Anonymous"}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                                    memorial.status === "Approved" 
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                }`}>
                                                    {memorial.status || "Pending"}
                                                </span>
                                                {memorial.status !== "Approved" && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8 gap-1.5 rounded-xl border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 text-xs font-semibold"
                                                        onClick={() => handleApprove(memorial.id)}
                                                    >
                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                        Approve
                                                    </Button>
                                                )}
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl h-8 w-8 opacity-80 group-hover:opacity-100 transition-opacity shrink-0"
                                                    onClick={() => handleDelete(memorial.id)}
                                                >
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm italic line-clamp-3 mb-2">
                                            &quot;{memorial.tribute}&quot;
                                        </p>
                                        <span className="text-[11px] text-muted-foreground font-medium">
                                            {safeTimeAgo(memorial.created_at)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-12 border-2 border-dashed border-border rounded-[2rem]">
                            <Heart className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-foreground">No memorials found</h3>
                            <p className="text-muted-foreground mt-1">There are no memorial submissions in the system yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

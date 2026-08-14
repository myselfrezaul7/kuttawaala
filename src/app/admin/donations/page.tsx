"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash, DollarSign, Search } from "lucide-react";
import { toast } from "sonner";
import { safeTimeAgo } from "@/utils/safeDateFormat";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type Donation = {
    id: string;
    donor_name: string;
    amount: number;
    method: string;
    transaction_id?: string;
    note?: string;
    status: "Pending" | "Confirmed";
    created_at: string;
};

export default function AdminDonationsPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();

    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [form, setForm] = useState({
        donor_name: "",
        amount: "",
        method: "bKash",
        transaction_id: "",
        note: "",
        status: "Confirmed" as "Pending" | "Confirmed",
    });

    const fetchDonations = async () => {
        setLoading(true);
        try {
            const snap = await getDocs(collection(db, "donations"));
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Donation[];
            setDonations(data.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()));
        } catch (e) {
            console.error(e);
            toast.error("Failed to load donations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            if (!user || (user.email !== "kuttawaala@gmail.com" && userData?.role !== "admin")) {
                router.push("/");
            } else {
                fetchDonations();
            }
        }
    }, [user, userData, authLoading, router]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.donor_name || !form.amount) return;

        setSubmitting(true);
        try {
            await addDoc(collection(db, "donations"), {
                donor_name: form.donor_name,
                amount: Number(form.amount),
                method: form.method,
                transaction_id: form.transaction_id || null,
                note: form.note || null,
                status: form.status,
                created_at: new Date().toISOString(),
            });
            toast.success("Donation recorded!");
            setForm({ donor_name: "", amount: "", method: "bKash", transaction_id: "", note: "", status: "Confirmed" });
            setShowForm(false);
            fetchDonations();
        } catch (e) {
            console.error(e);
            toast.error("Failed to save donation");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this donation record?")) return;
        try {
            await deleteDoc(doc(db, "donations", id));
            toast.success("Donation deleted");
            fetchDonations();
        } catch (e) {
            console.error(e);
            toast.error("Failed to delete donation");
        }
    };

    const toggleStatus = async (d: Donation) => {
        const nextStatus = d.status === "Confirmed" ? "Pending" : "Confirmed";
        try {
            await updateDoc(doc(db, "donations", d.id), { status: nextStatus });
            toast.success(`Marked as ${nextStatus}`);
            fetchDonations();
        } catch (e) {
            console.error(e);
            toast.error("Failed to update status");
        }
    };

    const totalConfirmed = donations
        .filter(d => d.status === "Confirmed")
        .reduce((sum, d) => sum + (d.amount || 0), 0);

    if (authLoading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold font-heading">Donation Tracking</h1>
                <p className="text-muted-foreground">Record and manage incoming donations.</p>
            </div>

            {/* Summary Card */}
            <div className="glass-card dark:bg-zinc-900/60 dark:border-zinc-800 p-6 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-4 border border-border shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <DollarSign className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Confirmed</p>
                        <p className="text-3xl font-bold text-primary">৳{totalConfirmed.toLocaleString()}</p>
                    </div>
                </div>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20"
                >
                    <Plus className="w-5 h-5 mr-2" /> Record Donation
                </Button>
            </div>

            {/* Add Form */}
            {showForm && (
                <form onSubmit={handleCreate} className="glass-card dark:bg-zinc-900/60 dark:border-zinc-800 p-8 rounded-[2.5rem] border border-border animate-in slide-in-from-top-2 duration-300 space-y-4">
                    <h3 className="text-lg font-bold">New Donation Entry</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-muted-foreground">Donor Name *</label>
                            <input
                                type="text"
                                required
                                value={form.donor_name}
                                onChange={e => setForm(p => ({ ...p, donor_name: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="e.g. Tanvir Ahmed"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-muted-foreground">Amount (৳) *</label>
                            <input
                                type="number"
                                required
                                value={form.amount}
                                onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-muted-foreground">Payment Method</label>
                            <select
                                value={form.method}
                                onChange={e => setForm(p => ({ ...p, method: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                            >
                                <option value="bKash">bKash</option>
                                <option value="Nagad">Nagad</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Cash">Cash</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-muted-foreground">Transaction ID</label>
                            <input
                                type="text"
                                value={form.transaction_id}
                                onChange={e => setForm(p => ({ ...p, transaction_id: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="Optional (e.g. 9J28DA1)"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-muted-foreground">Note / Reference</label>
                        <input
                            type="text"
                            value={form.note}
                            onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            placeholder="e.g., Medical fund for rescue dogs"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={submitting} className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null} Save Donation
                        </Button>
                    </div>
                </form>
            )}

            {/* Donations List */}
            <div className="glass-card dark:bg-zinc-900/60 dark:border-zinc-800 p-8 rounded-[2.5rem] border border-border shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" /> All Donations ({donations.length})
                    </h2>
                    <div className="relative w-full sm:w-auto">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search donors or TrxID..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-56"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (() => {
                    const filtered = donations.filter(d =>
                        (d.donor_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (d.transaction_id || "").toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    return filtered.length > 0 ? (
                        <div className="space-y-3">
                            {filtered.map(d => (
                                <div key={d.id} className="p-5 rounded-2xl border border-border bg-background/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-background/80 transition-all shadow-sm">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold text-lg">{d.donor_name}</h3>
                                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${d.status === 'Confirmed' ? 'bg-primary/20 text-primary' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                                {d.status}
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-primary">৳{d.amount?.toLocaleString()}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {d.method}{d.transaction_id ? ` · TrxID: ${d.transaction_id}` : ''}{d.note ? ` · ${d.note}` : ''}
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:items-end gap-2">
                                        <span className="text-[11px] text-muted-foreground font-medium">
                                            {safeTimeAgo(d.created_at)}
                                        </span>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" onClick={() => toggleStatus(d)} className="rounded-xl text-xs">
                                                {d.status === 'Confirmed' ? 'Mark Pending' : 'Confirm'}
                                            </Button>
                                            <Button size="icon" variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl h-8 w-8" onClick={() => handleDelete(d.id)}>
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-12 border-2 border-dashed border-border rounded-[2rem] bg-secondary/10">
                            <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-bold">{donations.length === 0 ? "No donations recorded" : "No results found"}</h3>
                            <p className="text-muted-foreground mt-1">{donations.length === 0 ? "Click 'Record Donation' to add the first entry." : "Try adjusting your search."}</p>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}

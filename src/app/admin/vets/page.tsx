"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash, Activity } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MOCK_VET_CLINICS as vets } from "@/data/vets";
import { VetClinic } from "@/services/VetService";
import { VetForm } from "@/components/admin/VetForm";

export default function AdminVetsPage() {
    const [clinics, setClinics] = useState<VetClinic[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVets = async () => {
        setLoading(true);
        try {
            const vetsRef = collection(db, "vets");
            const snapshot = await getDocs(vetsRef);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as unknown as VetClinic[];
            setClinics(data);
        } catch (error) {
            console.error("Error fetching vets:", error);
            toast.error("Failed to load veterinarians");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVets();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this clinic?")) return;
        try {
            await deleteDoc(doc(db, "vets", id));
            toast.success("Clinic deleted");
            fetchVets();
        } catch (error) {
            console.error("Error deleting clinic:", error);
            toast.error("Failed to delete clinic");
        }
    };

    const handleMockSeed = async () => {
        // Seed the hardcoded initial data to firebase
        try {
            const promises = vets.map((v: any) => addDoc(collection(db, "vets"), { ...v }));
            await Promise.all(promises);
            toast.success("Migrated Test Vets to Firebase!");
            fetchVets();
        } catch (error) {
            console.error(error);
            toast.error("Failed to seed database.");
        }
    };

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingVet, setEditingVet] = useState<VetClinic | null>(null);

    const handleOpenForm = (vet: VetClinic | null = null) => {
        setEditingVet(vet);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingVet(null);
    };

    const handleFormSubmit = async (data: Omit<VetClinic, "id">) => {
        try {
            if (editingVet) {
                // Update existing
                await updateDoc(doc(db, "vets", editingVet.id.toString()), data);
                toast.success("Clinic updated successfully!");
            } else {
                // Create new
                await addDoc(collection(db, "vets"), data);
                toast.success("Clinic added successfully!");
            }
            handleCloseForm();
            fetchVets();
        } catch (error) {
            console.error("Error saving vet clinic:", error);
            toast.error("Failed to save clinic. Check your connection.");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Veterinarians Directory</h1>
                    <p className="text-muted-foreground">Manage the public database of verified Vet Clinics.</p>
                </div>
                <div className="flex gap-4">
                    {clinics.length === 0 && (
                        <Button variant="outline" onClick={handleMockSeed}>Seed Initial Vets</Button>
                    )}
                    <Button onClick={() => handleOpenForm(null)} className="gap-2 bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4" /> Add Clinic
                    </Button>
                </div>
            </div>

            <Card className="border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" /> Registered Clinics ({clinics.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : clinics.length > 0 ? (
                        <div className="rounded-xl border border-border overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-secondary/50 text-muted-foreground font-bold uppercase tracking-wider text-xs border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4">Name & Address</th>
                                        <th className="px-6 py-4">District</th>
                                        <th className="px-6 py-4">Contact</th>
                                        <th className="px-6 py-4">Rating</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {clinics.map((vet) => (
                                        <tr key={vet.id} className="hover:bg-secondary/20 transition-colors">
                                            <td className="px-6 py-4 text-foreground">
                                                <div className="font-bold">{vet.name} {vet.services?.some((s: string) => s.toLowerCase().includes('emergency')) && <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-[10px] rounded-full uppercase">Emergency</span>}</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1">{vet.address}</div>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">{vet.district}</td>
                                            <td className="px-6 py-4 text-muted-foreground font-medium">{vet.phone}</td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center font-bold text-yellow-600">
                                                    {vet.rating} ★
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="icon" variant="ghost" onClick={() => handleOpenForm(vet)} className="h-9 w-9 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" onClick={() => handleDelete(vet.id.toString())} className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center p-12 border-2 border-dashed border-border rounded-xl">
                            <Activity className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <h3 className="text-lg font-bold">No clinics found</h3>
                            <p className="text-muted-foreground mt-1">There are no veterinarians in the Firebase database.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Dialog Wrapper for Form */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-3xl maxHeight">
                    <DialogHeader>
                        <DialogTitle>{editingVet ? 'Edit Clinic Profile' : 'Register New Clinic'}</DialogTitle>
                    </DialogHeader>
                    {isFormOpen && (
                        <VetForm
                            initialData={editingVet || undefined}
                            onSubmit={handleFormSubmit}
                            onCancel={handleCloseForm}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

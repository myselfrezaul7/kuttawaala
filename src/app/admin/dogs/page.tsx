"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash, Dog as DogIcon } from "lucide-react";
import { toast } from "sonner";
import { Dog } from "@/data/dogs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DogForm } from "@/components/admin/DogForm";

export default function AdminDogsPage() {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingDog, setEditingDog] = useState<Dog | null>(null);

    const fetchDogs = async () => {
        setLoading(true);
        try {
            const dogsRef = collection(db, "dogs");
            const snapshot = await getDocs(dogsRef);
            const dogsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Dog[];
            setDogs(dogsData);
        } catch (error) {
            console.error("Error fetching dogs:", error);
            toast.error("Failed to load dogs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this dog? This action cannot be undone.")) return;

        try {
            await deleteDoc(doc(db, "dogs", id));
            toast.success("Dog removed from system");
            fetchDogs(); // Refresh list
        } catch (error) {
            console.error("Error deleting dog:", error);
            toast.error("Failed to delete dog");
        }
    };

    const handleMockSeed = async () => {
        // Quick seed function to move mock data to firebase if collection is empty
        const mockDogs: Omit<Dog, "id">[] = [
            {
                name: 'Mimi',
                breed: 'Desi Dog (Bangladeshi Stray)',
                age: '2 years',
                gender: 'Female',
                location: "Dhanmondi, Dhaka",
                description: 'Mimi is the queen of her neighborhood.',
                imageUrl: '/assets/dog1.jpg',
                tag: 'Urgent',
                temperamentTags: ['Smart', 'Affectionate'],
                vaccinated: true,
                neutered: true,
                goodWithKids: true,
            }
        ];

        try {
            const promises = mockDogs.map(d => addDoc(collection(db, "dogs"), { ...d, created_at: serverTimestamp() }));
            await Promise.all(promises);
            toast.success("Test Dogs added to Firebase!");
            fetchDogs();
        } catch (error) {
            console.error(error);
            toast.error("Failed to seed database.");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Manage Dogs</h1>
                    <p className="text-muted-foreground">Add, edit, or remove dogs from the adoption registry.</p>
                </div>
                <div className="flex gap-4">
                    {dogs.length === 0 && (
                        <Button variant="outline" onClick={handleMockSeed}>Seed Test Data</Button>
                    )}
                    <Button onClick={() => { setEditingDog(null); setIsFormOpen(true); }} className="gap-2">
                        <Plus className="w-4 h-4" /> Add New Dog
                    </Button>
                </div>
            </div>

            <Card className="border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DogIcon className="w-5 h-5" /> Registered Dogs ({dogs.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : dogs.length > 0 ? (
                        <div className="rounded-xl border border-border overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-secondary/50 text-muted-foreground font-bold uppercase tracking-wider text-xs border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4 hidden md:table-cell">Breed</th>
                                        <th className="px-6 py-4">Age/Gender</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {dogs.map((dog) => (
                                        <tr key={dog.id} className="hover:bg-secondary/20 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground">
                                                <div className="flex items-center gap-3">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={dog.imageUrl || "/logo.png"} alt={dog.name} className="w-10 h-10 rounded-full object-cover" />
                                                    {dog.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{dog.breed}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{dog.age} • {dog.gender}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${dog.tag === 'Urgent' ? 'bg-red-100 text-red-700' :
                                                    dog.tag === 'Adopted' ? 'bg-green-100 text-green-700' :
                                                        'bg-secondary text-secondary-foreground'
                                                    }`}>
                                                    {dog.tag || 'Available'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="icon" variant="ghost" onClick={() => { setEditingDog(dog); setIsFormOpen(true); }} className="h-9 w-9 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" onClick={() => handleDelete(dog.id)} className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50">
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
                            <DogIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <h3 className="text-lg font-bold">No dogs found</h3>
                            <p className="text-muted-foreground mt-1">There are no dogs in the Firebase database.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingDog ? "Edit Dog Profile" : "Add New Dog Profile"}</DialogTitle>
                    </DialogHeader>
                    <DogForm
                        initialData={editingDog}
                        onSuccess={() => { setIsFormOpen(false); fetchDogs(); }}
                        onCancel={() => setIsFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

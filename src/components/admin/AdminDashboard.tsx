"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dog } from "@/data/dogs";
import { VetClinic } from "@/data/vets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash, LayoutDashboard, FileText } from "lucide-react";

interface AdminDashboardProps {
    initialCats: Dog[];
    initialVets: VetClinic[];
}

export function AdminDashboard({ initialCats, initialVets }: AdminDashboardProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-muted/30 dark:bg-zinc-950 pt-10 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-foreground dark:text-white">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage dogs, vets, and content.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={() => alert("Supabase connnection required for adding data.")} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                            <Plus className="w-4 h-4" /> Add New
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="dogs" className="w-full">
                    <TabsList className="mb-8">
                        <TabsTrigger value="dogs" className="flex items-center gap-2">
                            <LayoutDashboard className="w-4 h-4" /> Dogs ({initialCats.length})
                        </TabsTrigger>
                        <TabsTrigger value="vets" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Vets ({initialVets.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dogs" className="space-y-4">
                        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-border dark:border-zinc-800 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/30 dark:bg-zinc-800 text-muted-foreground font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Breed</th>
                                        <th className="px-6 py-4">Age</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                    {initialCats.map((dog) => (
                                        <tr key={dog.id} className="hover:bg-muted/30 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-foreground dark:text-white">{dog.name}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{dog.breed}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{dog.age}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${dog.tag === 'Urgent' ? 'bg-red-100 text-red-700' :
                                                        dog.tag === 'Adopted' ? 'bg-green-100 text-green-700' :
                                                            'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {dog.tag || 'Available'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>

                    <TabsContent value="vets" className="space-y-4">
                        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-border dark:border-zinc-800 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/30 dark:bg-zinc-800 text-muted-foreground font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">District</th>
                                        <th className="px-6 py-4">Phone</th>
                                        <th className="px-6 py-4">Rating</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                    {initialVets.map((vet) => (
                                        <tr key={vet.id} className="hover:bg-muted/30 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-foreground dark:text-white">{vet.name}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{vet.district}</td>
                                            <td className="px-6 py-4 text-emerald-600">{vet.phone}</td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-1 text-foreground/90 dark:text-muted-foreground">
                                                    {vet.rating} ⭐
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

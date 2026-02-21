"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Users as UsersIcon, Trash, Info, Shield, ShieldOff } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

type UserData = {
    id: string;
    email: string;
    displayName?: string;
    role?: string;
    created_at?: number;
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersRef = collection(db, "users");
            const snapshot = await getDocs(usersRef);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as UserData[];
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            // It's possible the collection doesn't exist
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (id: string, newRole: string) => {
        try {
            await updateDoc(doc(db, "users", id), { role: newRole });
            toast.success(`User role updated to ${newRole}`);
            fetchUsers();
        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("Failed to update user role");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This deletes their profile data (Auth must be managed via Firebase Console).")) return;
        try {
            await deleteDoc(doc(db, "users", id));
            toast.success("User profile deleted");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Failed to delete user");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold font-heading">Manage Users</h1>
                <p className="text-muted-foreground">View community members registered in the database.</p>
            </div>

            <Card className="border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <UsersIcon className="w-5 h-5" /> Registered Users ({users.length})
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : users.length > 0 ? (
                        <div className="rounded-xl border border-border overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-secondary/50 text-muted-foreground font-bold uppercase tracking-wider text-xs border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-secondary/20 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground">
                                                {u.displayName || "Anonymous User"}
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${u.role === 'admin' ? 'bg-primary/20 text-primary' :
                                                    'bg-secondary text-secondary-foreground'
                                                    }`}>
                                                    {u.role || 'Member'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {u.role === 'admin' ? (
                                                        <Button size="sm" variant="outline" onClick={() => handleRoleChange(u.id, 'user')} className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 gap-1">
                                                            <ShieldOff className="w-4 h-4" /> Revoke Admin
                                                        </Button>
                                                    ) : (
                                                        <Button size="sm" variant="outline" onClick={() => handleRoleChange(u.id, 'admin')} className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 gap-1">
                                                            <Shield className="w-4 h-4" /> Make Admin
                                                        </Button>
                                                    )}
                                                    <Button size="icon" variant="ghost" onClick={() => handleDelete(u.id)} className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50">
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
                            <Info className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <h3 className="text-lg font-bold">No user profiles found</h3>
                            <p className="text-muted-foreground mt-1 max-w-sm mx-auto">
                                If users sign in via Google Authentication but this is empty, it means their profiles aren't being synced to the Firestore `users` collection yet. Currently authentications are handled securely by Firebase Auth.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

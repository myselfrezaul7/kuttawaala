"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { X, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ProfileModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { user, userData } = useAuth();
    const [name, setName] = useState(user?.displayName || "");
    const [phone, setPhone] = useState(userData?.phone || "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen || !user) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            let photoURL = user.photoURL;

            // 1. Upload new photo if selected
            if (imageFile) {
                const storageRef = ref(storage, `users/${user.uid}/profile_${Date.now()}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);

                photoURL = await new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        () => { },
                        (error) => reject(error),
                        async () => {
                            const url = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve(url);
                        }
                    );
                });
            }

            // 2. Update Auth Profile
            if (name !== user.displayName || photoURL !== user.photoURL) {
                await updateProfile(user, {
                    displayName: name,
                    photoURL: photoURL
                });
            }

            // 3. Update Firestore Doc
            await updateDoc(doc(db, "users", user.uid), {
                name: name,
                phone: phone,
                photoURL: photoURL
            });

            toast.success("Profile updated successfully!");
            // Quick page reload to reflect changes in auth context across app
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-md p-8 rounded-[2rem] border border-border shadow-2xl relative animate-in slide-in-from-bottom-8">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-bold font-heading mb-6">Edit Profile</h2>

                <div className="space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 group cursor-pointer">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imagePreview || user.photoURL || "/images/placeholder-avatar.png"}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-sm"
                                onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + name + '&background=random' }}
                            />
                            <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="w-6 h-6 text-white" />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Tap to change photo</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-muted-foreground">Display Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-xl bg-secondary/50 border border-border outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-muted-foreground">Phone Number</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Optional"
                            className="w-full p-3 rounded-xl bg-secondary/50 border border-border outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <Button onClick={handleSave} disabled={loading} className="w-full h-12 rounded-xl bg-primary text-white font-bold gap-2 text-lg">
                        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

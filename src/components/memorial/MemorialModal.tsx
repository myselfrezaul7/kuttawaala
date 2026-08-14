"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Plus, Heart, Loader2, X } from "lucide-react";
import { Memorial } from "@/services/server-data";
import { MemorialService } from "@/services/MemorialService";
import { toast } from "sonner";
import Image from "next/image";

interface MemorialModalProps {
    onAddTribute: (memorial: Memorial) => void;
}

export function MemorialModal({ onAddTribute }: MemorialModalProps) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        petName: "",
        ownerName: user?.displayName || "",
        tribute: "",
    });

    useEffect(() => {
        if (user?.displayName) {
            setFormData(prev => ({ ...prev, ownerName: user.displayName || "" }));
        }
    }, [user?.displayName]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleRemoveImage = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl: string | null = null;
            if (selectedFile) {
                imageUrl = await MemorialService.uploadImage(selectedFile);
            }

            const newMemorial = await MemorialService.create({
                pet_name: formData.petName,
                owner_name: formData.ownerName,
                tribute: formData.tribute,
                image_url: imageUrl,
                user_id: user?.uid || null,
            });

            onAddTribute(newMemorial);
            toast.success("Tribute submitted for approval! Thank you for honoring your pet.");
            setOpen(false);
            setFormData({
                petName: "",
                ownerName: user?.displayName || "",
                tribute: ""
            });
            handleRemoveImage();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to post tribute. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200 border-2 border-orange-100 h-14 px-8 text-lg font-bold gap-2 transition-all hover:scale-105">
                    <Plus className="w-5 h-5" /> Add a Tribute
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-zinc-900 border-border shadow-2xl rounded-[2rem] p-0 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-zinc-800 dark:to-zinc-800/60 p-6 border-b border-border">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold font-heading flex items-center gap-2 text-foreground dark:text-white">
                            <Heart className="w-6 h-6 text-orange-500 fill-orange-500" /> Remember a Friend
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground font-medium">
                            Share a photo and a few words to honor your beloved dog.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="petName" className="text-sm font-semibold text-foreground dark:text-zinc-300">Pet's Name</Label>
                            <Input
                                id="petName"
                                required
                                value={formData.petName}
                                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                                className="rounded-xl border-border bg-muted/40 focus:bg-background"
                                placeholder="e.g. Kalu"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ownerName" className="text-sm font-semibold text-foreground dark:text-zinc-300">Your Name</Label>
                            <Input
                                id="ownerName"
                                required
                                value={formData.ownerName}
                                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                                className="rounded-xl border-border bg-muted/40 focus:bg-background"
                                placeholder="e.g. Rahim"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tribute" className="text-sm font-semibold text-foreground dark:text-zinc-300">Tribute Message</Label>
                        <Textarea
                            id="tribute"
                            required
                            value={formData.tribute}
                            onChange={(e) => setFormData({ ...formData, tribute: e.target.value })}
                            className="rounded-xl border-border bg-muted/40 focus:bg-background min-h-[100px] resize-none"
                            placeholder="Tell us what made them special..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground dark:text-zinc-300">Photo (Optional)</Label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*"
                            className="hidden"
                        />

                        {previewUrl ? (
                            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-border group">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer group"
                            >
                                <Upload className="w-8 h-8 mx-auto text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                                <p className="text-sm font-medium text-foreground dark:text-zinc-300">Click to upload pet photo</p>
                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP up to 5MB</p>
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-orange-500/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Posting Tribute...
                                </>
                            ) : (
                                "Post Tribute"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

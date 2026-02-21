"use client";

import { useTheme } from "next-themes";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Monitor, Moon, Sun, Save, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminSettingsPage() {
    const { theme, setTheme } = useTheme();
    const { user } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (user?.displayName) setName(user.displayName);
    }, [user]);

    const handleSaveProfile = () => {
        setSaving(true);
        // Simulate profile save
        setTimeout(() => {
            setSaving(false);
            toast.success("Profile settings updated successfully!");
        }, 800);
    };

    if (!mounted) return null;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold font-heading">Settings</h1>
                <p className="text-muted-foreground">Manage your admin preferences and system configurations.</p>
            </div>

            <div className="grid gap-8">
                {/* Appearance Settings */}
                <Card className="border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor className="w-5 h-5" />
                            Appearance
                        </CardTitle>
                        <CardDescription>Customize how the admin panel looks on your device.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Label>Theme Preference</Label>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    variant={theme === "light" ? "default" : "outline"}
                                    onClick={() => setTheme("light")}
                                    className="gap-2 w-32"
                                >
                                    <Sun className="w-4 h-4" /> Light
                                </Button>
                                <Button
                                    variant={theme === "dark" ? "default" : "outline"}
                                    onClick={() => setTheme("dark")}
                                    className="gap-2 w-32"
                                >
                                    <Moon className="w-4 h-4" /> Dark
                                </Button>
                                <Button
                                    variant={theme === "system" ? "default" : "outline"}
                                    onClick={() => setTheme("system")}
                                    className="gap-2 w-32"
                                >
                                    <Monitor className="w-4 h-4" /> System
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Settings */}
                <Card className="border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserCircle className="w-5 h-5" />
                            Admin Profile
                        </CardTitle>
                        <CardDescription>Update your personal information and contact details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" value={user?.email || ""} disabled className="bg-muted/50" />
                                <p className="text-xs text-muted-foreground mr-auto">Your email cannot be changed.</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>
                        <Button onClick={handleSaveProfile} disabled={saving} className="gap-2">
                            <Save className="w-4 h-4" />
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { signInWithGoogle, user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user && !loading) {
            router.push("/profile");
        }
    }, [user, loading, router]);

    return (
        <div className="min-h-screen bg-muted/30 dark:bg-zinc-950 flex flex-col justify-center items-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-border/50 dark:border-zinc-800 text-center">
                <h1 className="text-3xl font-bold mb-2 font-heading text-foreground dark:text-white">Welcome Back</h1>
                <p className="text-muted-foreground mb-8">Sign in to save your favorite dogs and manage your profile.</p>

                <Button
                    onClick={signInWithGoogle}
                    className="w-full h-12 text-lg bg-white dark:bg-zinc-800 hover:bg-muted/30 dark:hover:bg-zinc-700 text-foreground/90 dark:text-white border border-border dark:border-zinc-700 flex items-center justify-center gap-3"
                >
                    <FcGoogle className="w-6 h-6" />
                    Continue with Google
                </Button>

                <p className="mt-6 text-sm text-muted-foreground/80">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
}

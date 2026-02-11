"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Dog } from "lucide-react"; // Kuttawaala branding

export default function LoginPage() {
    const { signInWithGoogle, signInWithEmail, signUpWithEmail, user, loading } = useAuth();
    const router = useRouter();
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if (user && !loading) {
            router.push("/dashboard"); // Redirect to dashboard
        }
    }, [user, loading, router]);

    const handleGoogleLogin = async () => {
        if (!captchaValue) {
            toast.error("Please verify you are not a robot");
            return;
        }
        await signInWithGoogle();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaValue) {
            toast.error("Please verify you are not a robot");
            return;
        }

        setIsLoading(true);

        try {
            if (isSignUp) {
                if (formData.password !== formData.confirmPassword) {
                    toast.error("Passwords do not match");
                    setIsLoading(false);
                    return;
                }
                await signUpWithEmail(formData.email, formData.password);
            } else {
                await signInWithEmail(formData.email, formData.password);
            }
        } catch (error) {
            // Error handling is done in AuthContext
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 dark:bg-zinc-950 flex flex-col justify-center items-center px-4 py-12">
            <Link href="/" className="mb-8 group">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Dog className="w-10 h-10 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-foreground dark:text-white tracking-tight">KUTTAWAALA</span>
                </div>
            </Link>

            <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-border/50 dark:border-zinc-800">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 font-heading text-foreground dark:text-white">
                        {isSignUp ? "Join the Pack" : "Welcome Back"}
                    </h1>
                    <p className="text-muted-foreground">
                        {isSignUp
                            ? "Create an account to start saving lives"
                            : "Sign in to manage your rescues and favorites"}
                    </p>
                </div>

                <div className="space-y-6">
                    <Button
                        onClick={handleGoogleLogin}
                        disabled={!captchaValue || isLoading}
                        className="w-full h-12 text-base font-medium bg-white dark:bg-zinc-800 hover:bg-muted/50 dark:hover:bg-zinc-700 text-foreground dark:text-white border border-border dark:border-zinc-700 shadow-sm hover:shadow transition-all duration-200"
                    >
                        <FcGoogle className="w-5 h-5 mr-3" />
                        Continue with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border dark:border-zinc-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-zinc-900 px-2 text-muted-foreground">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 h-11 bg-muted/30 dark:bg-zinc-800/50"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-11 bg-muted/30 dark:bg-zinc-800/50"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {isSignUp && (
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 h-11 bg-muted/30 dark:bg-zinc-800/50"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center pt-2">
                            <ReCAPTCHA
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                onChange={setCaptchaValue}
                                theme="light"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                            disabled={isLoading || !captchaValue}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            ) : (
                                isSignUp ? "Create Account" : "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium flex items-center justify-center gap-2 mx-auto"
                        >
                            {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

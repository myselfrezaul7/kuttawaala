"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
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

    // Math Challenge State (Fallback)
    const [useMathChallenge, setUseMathChallenge] = useState(false);
    const [mathChallenge, setMathChallenge] = useState({ q: "3 + 4", a: "7" });
    const [userMathAnswer, setUserMathAnswer] = useState("");
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Initialize Math Challenge
    useEffect(() => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        setMathChallenge({ q: `${n1} + ${n2}`, a: (n1 + n2).toString() });
    }, []);

    useEffect(() => {
        if (user && !loading) {
            router.push("/dashboard"); // Redirect to dashboard
        }
    }, [user, loading, router]);

    const handleGoogleLogin = async () => {
        // For Google Login, we can optionally skip captcha or keep it. 
        // Usually Google Auth handles bot protection itself.
        // But if we want to be strict:
        if (!captchaValue && !useMathChallenge) {
            // If manual captcha is required
            // toast.error("Please verify you are not a robot");
            // return;
        }
        // If using math challenge
        if (useMathChallenge && userMathAnswer.trim() !== mathChallenge.a) {
            toast.error(`Incorrect math answer. Please solve ${mathChallenge.q}`);
            return;
        }

        setIsLoading(true);
        try {
            await signInWithGoogle();
        } catch (error: any) {
            console.error("Google Login Failed:", error);
            if (error.code === 'auth/popup-blocked') {
                toast.error("Popup blocked! Please allow popups for this site.");
            } else if (error.code === 'auth/popup-closed-by-user') {
                toast.warning("Sign-in cancelled.");
            } else {
                toast.error("Google Sign-In failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecaptchaError = () => {
        console.warn("reCAPTCHA failed to load. Falling back to Math Challenge.");
        setUseMathChallenge(true);
        setCaptchaValue("fallback-math-mode"); // Placeholder to allow validation logic to pass if math is solved later
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verification Check
        if (useMathChallenge) {
            if (userMathAnswer.trim() !== mathChallenge.a) {
                toast.error(`Incorrect answer. Please solve ${mathChallenge.q}`);
                return;
            }
        } else {
            if (!captchaValue) {
                toast.error("Please verify you are not a robot");
                return;
            }
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
        <div className="min-h-screen bg-muted/30 dark:bg-zinc-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden transition-colors duration-300">
            {/* Animated Background gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent dark:from-primary/5" />

            <Link href="/" className="mb-8 group relative z-10">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Dog className="w-10 h-10 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-foreground dark:text-white tracking-tight">KUTTAWAALA</span>
                </div>
            </Link>

            {/* Social Proof Badge */}
            <div className="flex justify-center mb-6 relative z-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-border/50 dark:border-zinc-800 backdrop-blur-md shadow-sm">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 bg-primary/20 dark:bg-primary/20 flex items-center justify-center overflow-hidden">
                                <Dog className="w-3 h-3 text-primary" />
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-semibold text-foreground dark:text-stone-300 ml-1">
                        Join <span className="text-primary dark:text-primary">12,000+</span> dog lovers
                    </span>
                </div>
            </div>

            <div className="max-w-md w-full bg-white dark:bg-zinc-900/60 rounded-3xl shadow-2xl p-8 border border-border/50 dark:border-zinc-800 relative z-10 backdrop-blur-xl">
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
                        disabled={isLoading}
                        className="w-full h-12 text-base font-medium bg-white dark:bg-zinc-800 hover:bg-muted/50 dark:hover:bg-zinc-700 text-foreground dark:text-white border border-border dark:border-zinc-700 shadow-sm hover:shadow transition-all duration-200"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <FcGoogle className="w-5 h-5 mr-3" />}
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

                        <div className="flex justify-center pt-2 overflow-hidden max-w-full">
                            {!useMathChallenge ? (
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LchaGgsAAAAAE-tlzeD1ApfHA2C6C-nM9Os41bf"}
                                    onChange={setCaptchaValue}
                                    theme="light"
                                    onError={handleRecaptchaError}
                                />
                            ) : (
                                <div className="text-center space-y-3 w-full">
                                    <div className="bg-muted/30 p-4 rounded-xl border border-border shadow-sm">
                                        <p className="text-sm font-bold mb-2">Verify you are human:</p>
                                        <p className="text-lg font-bold mb-2">What is {mathChallenge.q}?</p>
                                        <Input
                                            type="number"
                                            className="w-full text-center text-lg font-bold bg-background"
                                            placeholder="?"
                                            value={userMathAnswer}
                                            onChange={(e) => setUserMathAnswer(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">reCAPTCHA unavailable. Please solve this math problem.</p>
                                </div>
                            )}
                        </div>

                        {(!captchaValue && !useMathChallenge) && (
                            <p className="text-center text-xs text-primary/70 mt-1 cursor-pointer hover:underline" onClick={() => setUseMathChallenge(true)}>
                                Issues with Captcha? Switch to Math Test.
                            </p>
                        )}


                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                            disabled={isLoading}
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

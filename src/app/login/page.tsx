"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons"; // Assuming icons exist or need to be created/mocked
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const { loading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaValue) {
            alert("Please complete the captcha.");
            return;
        }
        setIsSubmitting(true);
        // Simulate login
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Logged in with:", email);
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen py-32 flex items-center justify-center bg-orange-50/30 dark:bg-zinc-950 px-4">
            <div className="w-full max-w-md bg-white dark:bg-black/40 backdrop-blur-2xl border border-orange-100 dark:border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-2xl">
                <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2 font-heading">Welcome Back!</h1>
                <p className="text-center text-slate-600 dark:text-slate-300 mb-8">Sign in to continue</p>

                <Button variant="outline" className="w-full h-14 mb-6 text-lg font-medium border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-2xl gap-3">
                    <span className="font-bold">Continue with Google</span>
                </Button>

                <div className="flex items-center my-6">
                    <hr className="flex-grow border-slate-200 dark:border-white/10" />
                    <span className="mx-4 text-slate-500 dark:text-slate-400 font-medium text-sm">OR</span>
                    <hr className="flex-grow border-slate-200 dark:border-white/10" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                            <button type="button" className="text-xs font-bold text-orange-600 hover:underline">Forgot?</button>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex justify-center py-2">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                            onChange={(val) => setCaptchaValue(val)}
                        />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl shadow-lg shadow-orange-500/20">
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
                    Don't have an account? <Link href="/signup" className="font-bold text-orange-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

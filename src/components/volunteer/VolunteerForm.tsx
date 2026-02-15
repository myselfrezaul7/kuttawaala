"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Heart, Hand, CheckCircle, AlertTriangle, User, Mail, Phone, MessageSquare } from "lucide-react";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { volunteerSchema, type VolunteerSchema } from "@/lib/schemas";
import confetti from "canvas-confetti";

export function VolunteerForm() {
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<VolunteerSchema>({
        resolver: zodResolver(volunteerSchema),
        defaultValues: {
            interest: "General",
        }
    });

    const onSubmit = async (data: VolunteerSchema) => {
        setServerError(null);

        const result = await submitToWeb3Forms({
            form_name: "Volunteer Application",
            ...data,
        });

        if (result.success) {
            setSubmitted(true);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#F59E0B', '#10B981', '#ffffff'] // Amber, Emerald, White
            });
            reset();
        } else {
            setServerError(result.message || "Failed to submit application. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-bold mb-4 font-heading text-foreground">Application Received!</h2>
                <p className="text-muted-foreground max-w-md mb-8 text-lg">
                    Thank you for offering your time and love. We will review your application and contact you soon.
                </p>
                <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="h-12 px-8 text-base rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 border-emerald-200 dark:border-emerald-800 transition-colors"
                >
                    Submit Another Application
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 px-4 bg-secondary/30 dark:bg-zinc-950">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl mb-4 text-amber-600 dark:text-amber-500">
                        <Hand className="w-8 h-8" />
                    </div>
                    <h1 className="text-5xl font-bold mb-6 font-heading flex items-center justify-center gap-3 text-foreground">
                        Join the Rescue Team
                    </h1>
                    <p className="text-xl text-muted-foreground dark:text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
                        We need more hands to pet dogs (and scoop litter). Whether you can foster, transport, or help with events, we have a spot for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Info Card */}
                    <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-xl border border-border dark:border-zinc-800 sticky top-24">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-foreground">
                            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg text-rose-500">
                                <Heart className="w-6 h-6 fill-rose-500" />
                            </div>
                            Why Volunteer?
                        </h3>
                        <ul className="space-y-6">
                            {[
                                "Make a direct impact on animal welfare in Dhaka.",
                                "Gain experience in rescue operations and care.",
                                "Join a community of passionate animal lovers.",
                                "Unlimited purrs and headbutts (guaranteed)."
                            ].map((item, index) => (
                                <li key={index} className="flex gap-4 items-start text-muted-foreground font-medium text-lg group">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2.5 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-xl border border-border dark:border-zinc-800">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {serverError && (
                                <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-2xl flex items-center gap-3 border border-destructive/20 animate-in slide-in-from-top-2">
                                    <AlertTriangle className="w-5 h-5 shrink-0" /> {serverError}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-foreground/80 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 w-5 h-5" />
                                    <input
                                        {...register("name")}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-muted/30 dark:bg-zinc-800 border-border dark:border-zinc-700 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-muted-foreground/40 text-foreground font-medium"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                {errors.name && <p className="text-destructive text-sm ml-1">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-foreground/80 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 w-5 h-5" />
                                    <input
                                        {...register("email")}
                                        type="email"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-muted/30 dark:bg-zinc-800 border-border dark:border-zinc-700 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-muted-foreground/40 text-foreground font-medium"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                {errors.email && <p className="text-destructive text-sm ml-1">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-foreground/80 ml-1">Phone Number <span className="text-muted-foreground/60 font-normal">(Optional)</span></label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 w-5 h-5" />
                                    <input
                                        {...register("phone")}
                                        type="tel"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-muted/30 dark:bg-zinc-800 border-border dark:border-zinc-700 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-muted-foreground/40 text-foreground font-medium"
                                        placeholder="+880 1XXX XXXXXX"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-foreground/80 ml-1">I want to help with...</label>
                                <div className="relative">
                                    <select
                                        {...register("interest")}
                                        className="w-full pl-4 pr-10 py-4 rounded-2xl border bg-muted/30 dark:bg-zinc-800 border-border dark:border-zinc-700 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-foreground font-medium appearance-none cursor-pointer hover:bg-muted/50 dark:hover:bg-zinc-800/80"
                                    >
                                        <option value="General">General Help</option>
                                        <option value="Fostering">Fostering (Short-term home)</option>
                                        <option value="Transport">Transport (Driving dogs to vet)</option>
                                        <option value="SocialMedia">Social Media / Photography</option>
                                        <option value="AdoptionEvents">Adoption Events</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/60">▼</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-foreground/80 ml-1">Message <span className="text-muted-foreground/60 font-normal">(Optional)</span></label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-5 text-muted-foreground/60 w-5 h-5" />
                                    <textarea
                                        {...register("message")}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-muted/30 dark:bg-zinc-800 border-border dark:border-zinc-700 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-muted-foreground/40 text-foreground font-medium min-h-[120px] resize-none"
                                        placeholder="Tell us a bit about yourself..."
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 text-lg rounded-2xl shadow-xl shadow-amber-500/10 dark:shadow-amber-500/5 active:scale-[0.98] transition-all duration-300" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        Sending Application...
                                    </div>
                                ) : (
                                    "Submit Application"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

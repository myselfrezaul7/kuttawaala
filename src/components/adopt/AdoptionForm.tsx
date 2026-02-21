"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { adoptionSchema, type AdoptionSchema } from "@/lib/schemas";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";

export function AdoptionForm({ dogName }: { dogName: string }) {
    const { user } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<AdoptionSchema>({
        resolver: zodResolver(adoptionSchema),
    });

    const onSubmit = async (data: AdoptionSchema) => {
        setServerError(null);

        const result = await submitToWeb3Forms({
            form_name: `Adoption Application for ${dogName}`,
            dog_name: dogName,
            ...data,
        });

        if (result.success) {
            // Save to Firebase for tracking
            try {
                await addDoc(collection(db, "adoptions"), {
                    dogName: dogName,
                    applicantName: data.name,
                    applicantEmail: data.email || "",
                    applicantPhone: data.phone,
                    status: "Pending",
                    created_at: Date.now(),
                    experience: data.message,
                    userId: user?.uid || null,
                });
            } catch (e) {
                console.error("Failed to save adoption to firestore:", e);
                // Still considering it a success if email sent, but might fail admin tracking
            }

            setSubmitted(true);
            reset();
        } else {
            setServerError(result.message || "Failed to submit. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl border border-green-100 dark:border-green-800 text-center">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Application Sent! 🐶</h3>
                <p className="text-muted-foreground dark:text-muted-foreground">
                    We've received your request to adopt {dogName}. We'll review it and get back to you shortly.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4">
                    Send another
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-secondary/50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-border dark:border-zinc-800">
            {serverError && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                    {serverError}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/90 dark:text-muted-foreground">Name</label>
                    <input
                        {...register("name")}
                        className="w-full p-3 rounded-xl border bg-white dark:bg-black focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Your Name"
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/90 dark:text-muted-foreground">Phone</label>
                    <input
                        {...register("phone")}
                        type="tel"
                        className="w-full p-3 rounded-xl border bg-white dark:bg-black focus:ring-2 focus:ring-primary outline-none"
                        placeholder="017..."
                    />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/90 dark:text-muted-foreground">Email (Optional)</label>
                <input
                    {...register("email")}
                    type="email"
                    className="w-full p-3 rounded-xl border bg-white dark:bg-black focus:ring-2 focus:ring-primary outline-none"
                    placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/90 dark:text-muted-foreground">Why do you want to adopt {dogName}?</label>
                <textarea
                    {...register("message")}
                    className="w-full p-3 rounded-xl border bg-white dark:bg-black focus:ring-2 focus:ring-primary outline-none min-h-[100px]"
                    placeholder="Tell us about your home and experience with dogs..."
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
            </div>
            <div className="hidden">
                <input type="checkbox" {...register("botcheck")} className="hidden" />
            </div>
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full text-lg h-14 shadow-xl shadow-secondary/20 bg-primary/90 hover:bg-primary text-white rounded-2xl">
                {isSubmitting ? "Sending..." : "Submit Adoption Application"}
            </Button>
            <p className="text-center text-xs text-muted-foreground/80 mt-2">
                We will review your application and contact you within 24 hours.
            </p>
        </form>
    );
}

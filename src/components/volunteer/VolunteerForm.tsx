"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Heart, Hand, CheckCircle, AlertTriangle } from "lucide-react";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { volunteerSchema, type VolunteerSchema } from "@/lib/schemas";

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
            reset();
        } else {
            setServerError(result.message || "Failed to submit application. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-heading">Application Received!</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                    Thank you for offering your time and love. We will review your application and contact you soon.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">Submit Another</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 px-4 bg-secondary/50 dark:bg-zinc-950">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 font-heading flex items-center justify-center gap-3">
                        <Hand className="w-10 h-10 text-primary" /> Join the Squad
                    </h1>
                    <p className="text-lg text-muted-foreground dark:text-muted-foreground/80 max-w-2xl mx-auto">
                        We need more hands to pet dogs (and scoop litter). Whether you can foster, transport, or help with events, we have a spot for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-border dark:border-zinc-800">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Heart className="text-primary w-5 h-5" /> Why Volunteer?
                        </h3>
                        <ul className="space-y-3 text-muted-foreground dark:text-muted-foreground/80">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span> Make a direct impact on animal welfare in Dhaka.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span> Gain experience in rescue operations and care.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span> Join a community of passionate animal lovers.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span> Unlimited purrs and headbutts (guaranteed).
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-border dark:border-zinc-800">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {serverError && (
                                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> {serverError}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    {...register("name")}
                                    className="w-full p-3 rounded-xl border bg-muted/30 dark:bg-zinc-800 border-border dark:border-zinc-700 focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Your Name"
                                />
                                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact</label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    className="w-full p-3 rounded-xl border bg-muted/30 dark:bg-zinc-800 border-border dark:border-zinc-700 focus:ring-2 focus:ring-primary outline-none mb-2"
                                    placeholder="Email Address"
                                />
                                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                                <input
                                    {...register("phone")}
                                    type="tel"
                                    className="w-full p-3 rounded-xl border bg-muted/30 dark:bg-zinc-800 border-border dark:border-zinc-700 focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Phone Number (Optional)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">I want to help with...</label>
                                <select
                                    {...register("interest")}
                                    className="w-full p-3 rounded-xl border bg-muted/30 dark:bg-zinc-800 border-border dark:border-zinc-700 focus:ring-2 focus:ring-primary outline-none"
                                >
                                    <option value="General">General Help</option>
                                    <option value="Fostering">Fostering (Short-term home)</option>
                                    <option value="Transport">Transport (Driving dogs to vet)</option>
                                    <option value="SocialMedia">Social Media / Photography</option>
                                    <option value="AdoptionEvents">Adoption Events</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message (Optional)</label>
                                <textarea
                                    {...register("message")}
                                    className="w-full p-3 rounded-xl border bg-muted/30 dark:bg-zinc-800 border-border dark:border-zinc-700 focus:ring-2 focus:ring-primary outline-none h-24"
                                    placeholder="Tell us a bit about yourself..."
                                />
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary text-white font-bold h-12 text-lg rounded-xl shadow-lg shadow-secondary/20" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Submit Application"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Camera, AlertTriangle, CheckCircle, PawPrint, Shield, ChevronRight, ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import dynamic from "next/dynamic";
import { ReportService } from "@/services/ReportService";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

// Dynamically import LocationPicker to avoid SSR issues with Leaflet
const LocationPicker = dynamic(() => import("@/components/shared/LocationPicker"), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-secondary/20 animate-pulse rounded-xl flex items-center justify-center text-muted-foreground">Loading Map...</div>
});

type ReportFormType = {
    type: "Lost" | "Found" | "Injured";
    locationDetails: string;
    latitude?: number;
    longitude?: number;
    description: string;
    contact: string;
    image: FileList;
};

const STEPS = [
    { id: 1, title: "Situation", icon: AlertTriangle },
    { id: 2, title: "Location", icon: MapPin },
    { id: 3, title: "Details", icon: Camera },
    { id: 4, title: "Contact", icon: Shield },
];

export function ReportForm() {
    const { user } = useAuth();
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset, trigger } = useForm<ReportFormType>();
    const [submitted, setSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Verification State
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [useMathChallenge, setUseMathChallenge] = useState(false);
    const [mathChallenge, setMathChallenge] = useState({ q: "3 + 4", a: "7" });
    const [userMathAnswer, setUserMathAnswer] = useState("");
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    // Watch values for previews
    const imageFiles = watch("image");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (imageFiles && imageFiles.length > 0) {
            const file = imageFiles[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    }, [imageFiles]);

    // Initialize Math Challenge
    useEffect(() => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        setMathChallenge({ q: `${n1} + ${n2}`, a: (n1 + n2).toString() });
    }, []);

    const handleRecaptchaError = () => {
        console.warn("reCAPTCHA failed to load. Falling back to Math Challenge.");
        setUseMathChallenge(true);
    };

    const nextStep = async () => {
        let valid = false;
        if (currentStep === 1) valid = await trigger("type");
        if (currentStep === 2) valid = await trigger(["latitude", "longitude", "locationDetails"]);
        if (currentStep === 3) valid = await trigger("description");

        if (valid) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => setCurrentStep(prev => prev - 1);

    const onSubmit = async (data: ReportFormType) => {
        // Verification Check
        if (useMathChallenge) {
            if (userMathAnswer.trim() !== mathChallenge.a) {
                alert(`Incorrect answer. Please solve ${mathChallenge.q}`);
                return;
            }
        } else {
            if (!captchaValue) {
                alert("Please complete the reCAPTCHA verification.");
                return;
            }
        }

        try {
            let imageUrl = null;
            if (data.image && data.image.length > 0) {
                imageUrl = await ReportService.uploadImage(data.image[0]);
            }

            await ReportService.create({
                type: data.type,
                description: data.description,
                latitude: data.latitude,
                longitude: data.longitude,
                location_text: data.locationDetails,
                contact_info: data.contact,
                image_url: imageUrl,
                user_id: user?.uid, // Link report to user
            });

            setSubmitted(true);
            reset();
            setCaptchaValue(null);
            if (recaptchaRef.current) recaptchaRef.current.reset();
            setImagePreview(null);
        } catch (error) {
            console.error(error);
            alert("Failed to submit report. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400 shadow-lg shadow-green-200 dark:shadow-none">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-bold mb-4 font-heading">Report Received</h2>
                <p className="text-muted-foreground max-w-md mb-8 text-lg">
                    We've alerted the Kuttawaala volunteer network. Thank you for being a responsible citizen. 🐶
                </p>
                <Button onClick={() => { setSubmitted(false); setCurrentStep(1); }} className="px-8 py-6 text-lg rounded-full shadow-lg">
                    Submit Another Report
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12 px-4 flex items-center justify-center">
            <div className="w-full max-w-2xl">

                {/* Steps Header */}
                <div className="mb-8 flex justify-between items-center relative px-4">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-secondary/30 -z-10 rounded-full"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-500 -z-10 rounded-full" style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}></div>

                    {STEPS.map((step) => {
                        const Icon = step.icon;
                        const isActive = currentStep >= step.id;
                        const isCurrent = currentStep === step.id;
                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${isActive ? 'bg-primary border-primary/20 text-white shadow-lg shadow-primary/30' : 'bg-background border-secondary text-muted-foreground'}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className={`text-xs font-bold transition-colors ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>{step.title}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden transition-all duration-500 shadow-xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* STEP 1: SITUATION */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold font-heading">What's the situation?</h2>
                                    <p className="text-muted-foreground">Choose the option that best describes the emergency.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {["Lost", "Found", "Injured"].map((type) => (
                                        <label key={type} className="cursor-pointer group">
                                            <input
                                                type="radio"
                                                value={type}
                                                {...register("type", { required: true })}
                                                className="peer sr-only"
                                            />
                                            <div className="h-32 flex flex-col items-center justify-center p-4 rounded-3xl border-2 border-border dark:border-zinc-700 bg-secondary/10 dark:bg-zinc-800/50 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:shadow-xl peer-checked:shadow-primary/10 transition-all group-hover:border-primary/50">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${type === 'Injured' ? 'bg-red-100 text-red-500 dark:bg-red-900/40' : type === 'Lost' ? 'bg-orange-100 text-orange-500 dark:bg-orange-900/40' : 'bg-green-100 text-green-500 dark:bg-green-900/40'}`}>
                                                    {type === 'Injured' ? <AlertTriangle className="w-6 h-6" /> : type === 'Lost' ? <Shield className="w-6 h-6" /> : <PawPrint className="w-6 h-6" />}
                                                </div>
                                                <span className="font-bold text-muted-foreground peer-checked:text-primary text-lg">{type}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.type && <p className="text-center text-red-500 font-medium">Please select a situation type.</p>}
                            </div>
                        )}

                        {/* STEP 2: LOCATION */}
                        {currentStep === 2 && (
                            <div className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold font-heading">Where is it?</h2>
                                    <p className="text-muted-foreground">Pin the exact location to help rescuers find it fast.</p>
                                </div>
                                <div className="rounded-2xl overflow-hidden border-4 border-secondary/20 shadow-inner h-[300px] relative">
                                    <LocationPicker
                                        onLocationSelect={(lat, lng) => {
                                            setValue("latitude", lat);
                                            setValue("longitude", lng);
                                        }}
                                    />
                                    {(!watch("latitude") || !watch("longitude")) && (
                                        <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
                                            <div className="bg-background/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-sm font-bold text-primary animate-bounce">
                                                Click on map to pin location
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                                    <input
                                        {...register("locationDetails", { required: "Please provide specific location details" })}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-none ring-1 ring-border bg-secondary/10 dark:bg-zinc-800 focus:ring-2 focus:ring-primary outline-none font-medium shadow-sm transition-all"
                                        placeholder="Specific details (e.g. Beside the tea stall, under the bridge...)"
                                    />
                                </div>
                                {errors.locationDetails && <p className="text-sm text-red-500 font-bold ml-2">{errors.locationDetails.message}</p>}
                            </div>
                        )}

                        {/* STEP 3: DETAILS */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold font-heading">Add Details</h2>
                                    <p className="text-muted-foreground">A picture says a thousand words.</p>
                                </div>

                                <div className="space-y-4">
                                    <textarea
                                        {...register("description", { required: "Please provide a description" })}
                                        className="w-full p-4 rounded-2xl border-none ring-1 ring-border bg-secondary/10 dark:bg-zinc-800 focus:ring-2 focus:ring-primary outline-none min-h-[120px] resize-none font-medium text-lg leading-relaxed shadow-sm"
                                        placeholder="Describe the dog (color, breed, size, condition)..."
                                    />
                                    {errors.description && <p className="text-sm text-red-500 font-bold ml-2">{errors.description.message}</p>}

                                    <div className="relative group">
                                        <div className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer relative overflow-hidden ${imagePreview ? 'border-primary bg-background' : 'border-border bg-secondary/10 hover:bg-secondary/20 hover:border-primary/50'}`}>
                                            <input type="file" className="absolute inset-0 z-20 opacity-0 cursor-pointer" accept="image/*" {...register("image")} />

                                            {imagePreview ? (
                                                <div className="relative z-10 h-48 w-full">
                                                    <Image src={imagePreview} alt="Preview" fill className="object-cover rounded-2xl" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                                        <p className="text-white font-bold flex items-center gap-2"><Camera /> Change Photo</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="py-6">
                                                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                        <Camera className="w-8 h-8" />
                                                    </div>
                                                    <h3 className="text-lg font-bold">Upload Photo</h3>
                                                    <p className="text-muted-foreground text-sm mt-1">Tap to select from gallery</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: CONTACT & VERIFY */}
                        {currentStep === 4 && (
                            <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold font-heading">Final Step</h2>
                                    <p className="text-muted-foreground">How can we reach you?</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                                        <input
                                            {...register("contact", { required: "Contact info is required" })}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none ring-1 ring-border bg-secondary/10 dark:bg-zinc-800 focus:ring-2 focus:ring-primary outline-none font-bold text-lg shadow-sm"
                                            placeholder="Mobile Number"
                                        />
                                    </div>
                                </div>

                                <div className="bg-secondary/20 p-6 rounded-2xl border border-border">
                                    <p className="text-muted-foreground text-sm font-bold mb-4 text-center uppercase tracking-wider">Security Check</p>
                                    <div className="flex justify-center">
                                        {!useMathChallenge ? (
                                            <ReCAPTCHA
                                                ref={recaptchaRef}
                                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                                onChange={(val) => setCaptchaValue(val)}
                                                onError={handleRecaptchaError} // Trigger fallback on error
                                                onExpired={() => setCaptchaValue(null)}
                                            />
                                        ) : (
                                            <div className="text-center space-y-3 w-full max-w-xs">
                                                <div className="bg-background p-4 rounded-xl border border-border shadow-sm">
                                                    <p className="text-lg font-bold mb-2">What is {mathChallenge.q}?</p>
                                                    <input
                                                        type="number"
                                                        className="w-full p-2 text-center text-xl font-bold border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background"
                                                        placeholder="?"
                                                        value={userMathAnswer}
                                                        onChange={(e) => setUserMathAnswer(e.target.value)}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground">reCAPTCHA failed to load. Please solve this simple math problem.</p>
                                            </div>
                                        )}
                                    </div>
                                    {(!captchaValue && !useMathChallenge) && (
                                        <p className="text-center text-xs text-primary/70 mt-2 cursor-pointer hover:underline" onClick={() => setUseMathChallenge(true)}>
                                            Having trouble with reCAPTCHA? Switch to simple mode.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 pt-4">
                            {currentStep > 1 && (
                                <Button type="button" onClick={prevStep} className="flex-1 h-14 rounded-2xl bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-lg" disabled={isSubmitting}>
                                    Back
                                </Button>
                            )}

                            {currentStep < 4 ? (
                                <Button type="button" onClick={nextStep} className="flex-1 h-14 rounded-2xl shadow-xl shadow-primary/20 font-bold text-lg">
                                    Next Step <ChevronRight className="ml-2 w-5 h-5" />
                                </Button>
                            ) : (
                                <Button type="submit" className="flex-1 h-14 rounded-2xl shadow-xl shadow-primary/20 font-bold text-lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Report"}
                                </Button>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

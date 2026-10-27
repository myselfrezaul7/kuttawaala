"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Clock,
    ExternalLink,
    Star,
    Globe,
    Copy,
    Check,
    ShieldCheck,
    Building2,
    GraduationCap,
    HeartHandshake,
    Stethoscope,
} from "lucide-react";
import { toast } from "sonner";
import { VetClinic } from "@/services/VetService";
import { getClinicType, isClinicEmergency24h, VetClinicType } from "@/data/vets";
import { isSafeUrl } from "@/lib/validation";

interface VetCardProps {
    vet: VetClinic;
    index?: number;
}

const CATEGORY_STYLES: Record<
    VetClinicType,
    { label: string; badgeClass: string; Icon: typeof Stethoscope }
> = {
    Private: {
        label: "Private Clinic",
        badgeClass:
            "bg-amber-50/90 text-amber-800 border-amber-200/80 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50",
        Icon: Stethoscope,
    },
    University: {
        label: "University Hospital",
        badgeClass:
            "bg-blue-50/90 text-blue-700 border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50",
        Icon: GraduationCap,
    },
    NGO: {
        label: "Animal Welfare NGO",
        badgeClass:
            "bg-emerald-50/90 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50",
        Icon: HeartHandshake,
    },
    Government: {
        label: "Govt Hospital",
        badgeClass:
            "bg-stone-100 text-stone-700 border-stone-200/90 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
        Icon: Building2,
    },
};

export function VetCard({ vet, index = 0 }: VetCardProps) {
    const [copied, setCopied] = useState(false);

    const clinicType = getClinicType(vet);
    const categoryMeta = CATEGORY_STYLES[clinicType];
    const CategoryIcon = categoryMeta.Icon;

    const is24h = isClinicEmergency24h(vet);
    const hasEmergencyService =
        is24h ||
        (vet.services || []).some(s => (s || "").toLowerCase().includes("emergency"));

    const isHelpline = vet.usesHelpline || vet.phone === "16358";
    const dialNumber = (vet.phone || "16358").replace(/[^0-9+]/g, "");

    // Filter out redundant category words from service chips
    const displayServices = (vet.services || []).filter(
        s =>
            !["government", "ngo", "university hospital"].includes(
                (s || "").toLowerCase().trim()
            )
    );

    const handleCopyPhone = async () => {
        try {
            await navigator.clipboard.writeText(vet.phone || "16358");
            setCopied(true);
            toast.success(
                isHelpline
                    ? "Copied National Vet Helpline (16358)"
                    : `Copied ${vet.phone} to clipboard`
            );
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Could not copy number");
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.35,
                delay: Math.min(index * 0.03, 0.25),
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-stone-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200 flex flex-col justify-between h-full"
        >
            <div>
                {/* Top Metadata Row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 rounded-full border border-stone-200/70 dark:border-zinc-700/70">
                            <MapPin className="w-3 h-3 text-primary" />
                            {vet.district || "Dhaka"}
                        </span>

                        <span
                            className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${categoryMeta.badgeClass}`}
                        >
                            <CategoryIcon className="w-3 h-3" />
                            {categoryMeta.label}
                        </span>

                        {is24h && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/50 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                24/7 Open
                            </span>
                        )}
                    </div>

                    {/* Rating or Verified Badge */}
                    <div className="shrink-0">
                        {typeof vet.rating === "number" && vet.rating > 0 ? (
                            <div
                                className="inline-flex items-center gap-1 bg-amber-50/90 dark:bg-amber-950/30 px-2 py-0.5 rounded-lg border border-amber-200/70 dark:border-amber-900/40"
                                title={
                                    vet.reviewCount
                                        ? `Rated ${vet.rating} out of 5 (${vet.reviewCount} reviews)`
                                        : `Rated ${vet.rating} out of 5`
                                }
                            >
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                <span className="font-bold text-xs text-amber-800 dark:text-amber-300">
                                    {vet.rating.toFixed(1)}
                                </span>
                                {typeof vet.reviewCount === "number" && vet.reviewCount > 0 && (
                                    <span className="text-[10px] text-amber-700/70 dark:text-amber-400/70">
                                        ({vet.reviewCount})
                                    </span>
                                )}
                            </div>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg bg-stone-100/80 dark:bg-zinc-800/80 text-stone-600 dark:text-zinc-400 border border-stone-200/60 dark:border-zinc-700/60">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                Verified
                            </span>
                        )}
                    </div>
                </div>

                {/* Clinic Name */}
                <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug mb-3.5 group-hover:text-primary transition-colors">
                    {vet.name}
                </h3>

                {/* Details List */}
                <div className="space-y-2.5 text-sm text-muted-foreground mb-4">
                    {/* Address */}
                    <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-stone-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                        <p className="line-clamp-2 leading-snug text-stone-600 dark:text-zinc-300">
                            {vet.address || `${vet.district} Sadar`}
                        </p>
                    </div>

                    {/* Phone + Copy */}
                    <div className="flex items-center justify-between gap-2 bg-stone-50 dark:bg-zinc-800/50 px-3 py-2 rounded-xl border border-stone-200/60 dark:border-zinc-800">
                        <div className="flex items-center gap-2 min-w-0">
                            <Phone className="w-4 h-4 text-primary shrink-0" />
                            {isHelpline ? (
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-bold text-foreground tracking-tight">
                                        16358
                                    </span>
                                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-amber-100/80 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-medium">
                                        DLS National Helpline
                                    </span>
                                </div>
                            ) : (
                                <div className="truncate">
                                    <span className="font-semibold text-foreground">
                                        {vet.phone}
                                    </span>
                                    {vet.altPhone && (
                                        <span className="text-xs text-muted-foreground ml-1.5">
                                            / {vet.altPhone}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleCopyPhone}
                            aria-label={`Copy phone number ${vet.phone}`}
                            title="Copy phone number"
                            className="p-1.5 rounded-lg text-stone-500 hover:text-foreground hover:bg-stone-200/60 dark:hover:bg-zinc-700/60 transition-colors shrink-0"
                        >
                            {copied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                                <Copy className="w-3.5 h-3.5" />
                            )}
                        </button>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-stone-400 dark:text-zinc-500 shrink-0" />
                        <p
                            className={
                                is24h
                                    ? "text-rose-600 dark:text-rose-400 font-semibold text-xs sm:text-sm"
                                    : "text-xs sm:text-sm"
                            }
                        >
                            {vet.hours || "9 AM - 5 PM"}
                            {!is24h && hasEmergencyService && (
                                <span className="ml-1.5 text-[11px] font-medium text-amber-700 dark:text-amber-400">
                                    • Emergency Care
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Website */}
                    {vet.website && isSafeUrl(vet.website) && (
                        <div className="flex items-center gap-2.5">
                            <Globe className="w-4 h-4 text-stone-400 dark:text-zinc-500 shrink-0" />
                            <a
                                href={vet.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs sm:text-sm font-medium hover:underline text-primary truncate max-w-[240px]"
                            >
                                {vet.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                            </a>
                        </div>
                    )}
                </div>

                {/* Service Chips */}
                {displayServices.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                        {displayServices.slice(0, 4).map(service => (
                            <span
                                key={service}
                                className="text-[11px] font-medium px-2.5 py-0.5 bg-stone-100/80 dark:bg-zinc-800/80 text-stone-600 dark:text-zinc-300 rounded-md border border-stone-200/60 dark:border-zinc-700/60"
                            >
                                {service}
                            </span>
                        ))}
                        {displayServices.length > 4 && (
                            <span className="text-[11px] font-medium px-2 py-0.5 bg-stone-100 dark:bg-zinc-800 text-muted-foreground rounded-md">
                                +{displayServices.length - 4}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Action Bar */}
            <div className="grid grid-cols-2 gap-2.5 pt-3.5 border-t border-stone-100 dark:border-zinc-800/80 mt-auto">
                <a
                    href={`tel:${dialNumber}`}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary transition-colors"
                >
                    <Phone className="w-3.5 h-3.5" />
                    {isHelpline ? "Call 16358" : "Call Clinic"}
                </a>
                <a
                    href={vet.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-colors"
                >
                    Directions
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
            </div>
        </motion.article>
    );
}

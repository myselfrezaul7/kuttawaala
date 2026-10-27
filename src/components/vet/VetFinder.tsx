"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { VetService, VetClinic } from "@/services/VetService";
import {
    BANGLADESH_DIVISIONS,
    BangladeshDivision,
    getClinicDivision,
    getClinicType,
    isClinicEmergency24h,
} from "@/data/vets";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    Search,
    X,
    Building2,
    Stethoscope,
    Phone,
    ShieldCheck,
    SlidersHorizontal,
    ArrowUpDown,
    GraduationCap,
    Clock,
} from "lucide-react";
import { VetCard } from "./VetCard";
import { motion } from "framer-motion";
import { DataErrorState } from "@/components/shared/DataErrorState";
import { SkeletonGrid } from "@/components/shared/SkeletonCard";

type QuickCategoryFilter = "all" | "24h" | "private" | "university_ngo" | "government";
type SortOption = "recommended" | "rating" | "emergency" | "district";

const POPULAR_SERVICES = [
    "Vaccination",
    "Surgery",
    "Diagnostics",
    "Spay/Neuter",
    "General Checkup",
    "Emergency",
];

function getSmartPriorityScore(vet: VetClinic): number {
    let score = 0;
    const type = getClinicType(vet);
    const is24h = isClinicEmergency24h(vet);
    const hasEmergency =
        is24h ||
        (vet.services || []).some(s => (s || "").toLowerCase().includes("emergency"));
    const isHelplineOnly = vet.usesHelpline || vet.phone === "16358";

    if (is24h) score += 50;
    else if (hasEmergency) score += 20;

    if (type === "University") score += 45;
    else if (type === "NGO") score += 40;
    else if (type === "Private") score += 35;
    else if (type === "Government" && !isHelplineOnly) score += 20;
    else score += 5;

    if (!isHelplineOnly) score += 15;
    if (typeof vet.rating === "number") score += vet.rating * 3;
    if (typeof vet.reviewCount === "number") score += Math.min(vet.reviewCount / 50, 8);

    return score;
}

export function VetFinder() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("query") || "";

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedDivision, setSelectedDivision] = useState<string>("all");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<QuickCategoryFilter>("all");
    const [selectedService, setSelectedService] = useState<string>("all");
    const [sortBy, setSortBy] = useState<SortOption>("recommended");

    const [vets, setVets] = useState<VetClinic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVets = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await VetService.getAll();
            setVets(data);
        } catch (err) {
            console.error("Failed to load vets", err);
            setError("Could not retrieve clinic list.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVets();
    }, []);

    // Division counts
    const divisionCounts = useMemo(() => {
        const counts: Record<string, number> = { all: vets.length };
        for (const div of BANGLADESH_DIVISIONS) {
            counts[div] = 0;
        }
        for (const vet of vets) {
            const div = getClinicDivision(vet.district, vet.division);
            counts[div] = (counts[div] || 0) + 1;
        }
        return counts;
    }, [vets]);

    // Extract unique districts scoped to selectedDivision
    const availableDistricts = useMemo(() => {
        const scoped =
            selectedDivision === "all"
                ? vets
                : vets.filter(
                      v => getClinicDivision(v.district, v.division) === selectedDivision
                  );
        return Array.from(new Set(scoped.map(v => v.district).filter(Boolean))).sort();
    }, [vets, selectedDivision]);

    // Reset district if division changes and current district is not in that division
    const handleDivisionChange = (division: string) => {
        setSelectedDivision(division);
        if (division !== "all" && selectedDistrict !== "all") {
            const districtDivision = getClinicDivision(selectedDistrict);
            if (districtDivision !== division) {
                setSelectedDistrict("all");
            }
        }
    };

    // Filter & sort vets
    const filteredVets = useMemo(() => {
        const filtered = vets.filter(vet => {
            const division = getClinicDivision(vet.district, vet.division);
            const clinicType = getClinicType(vet);
            const is24h = isClinicEmergency24h(vet);
            const hasEmergency =
                is24h ||
                (vet.services || []).some(s =>
                    (s || "").toLowerCase().includes("emergency")
                );

            // Search query match
            const searchLower = searchQuery.trim().toLowerCase();
            const searchTerms = searchLower.split(/\s+/).filter(Boolean);
            const matchesSearch =
                searchTerms.length === 0 ||
                searchTerms.every(
                    term =>
                        (vet.name || "").toLowerCase().includes(term) ||
                        (vet.address || "").toLowerCase().includes(term) ||
                        (vet.district || "").toLowerCase().includes(term) ||
                        division.toLowerCase().includes(term) ||
                        (vet.phone || "").toLowerCase().includes(term) ||
                        (vet.services || []).some(s => (s || "").toLowerCase().includes(term))
                );

            // Division & District match
            const matchesDivision =
                selectedDivision === "all" || division === selectedDivision;
            const matchesDistrict =
                selectedDistrict === "all" || vet.district === selectedDistrict;

            // Quick category match
            let matchesCategory = true;
            if (selectedCategory === "24h") {
                matchesCategory = hasEmergency;
            } else if (selectedCategory === "private") {
                matchesCategory = clinicType === "Private";
            } else if (selectedCategory === "university_ngo") {
                matchesCategory = clinicType === "University" || clinicType === "NGO";
            } else if (selectedCategory === "government") {
                matchesCategory = clinicType === "Government";
            }

            // Service match
            const matchesService =
                selectedService === "all" ||
                (vet.services || []).some(s =>
                    (s || "").toLowerCase().includes(selectedService.toLowerCase())
                );

            return (
                matchesSearch &&
                matchesDivision &&
                matchesDistrict &&
                matchesCategory &&
                matchesService
            );
        });

        // Sort results
        return [...filtered].sort((a, b) => {
            if (sortBy === "rating") {
                const rA = a.rating || 0;
                const rB = b.rating || 0;
                if (rB !== rA) return rB - rA;
                return (b.reviewCount || 0) - (a.reviewCount || 0);
            }
            if (sortBy === "emergency") {
                const eA = isClinicEmergency24h(a) ? 2 : (a.services || []).some(s => s?.toLowerCase().includes("emergency")) ? 1 : 0;
                const eB = isClinicEmergency24h(b) ? 2 : (b.services || []).some(s => s?.toLowerCase().includes("emergency")) ? 1 : 0;
                if (eB !== eA) return eB - eA;
                return getSmartPriorityScore(b) - getSmartPriorityScore(a);
            }
            if (sortBy === "district") {
                const cmp = (a.district || "").localeCompare(b.district || "");
                if (cmp !== 0) return cmp;
                return getSmartPriorityScore(b) - getSmartPriorityScore(a);
            }
            // Default: "recommended"
            return getSmartPriorityScore(b) - getSmartPriorityScore(a);
        });
    }, [
        vets,
        searchQuery,
        selectedDivision,
        selectedDistrict,
        selectedCategory,
        selectedService,
        sortBy,
    ]);

    // Global directory statistics
    const stats = useMemo(() => {
        const allDistricts = new Set(vets.map(v => v.district).filter(Boolean));
        const emergencyCount = vets.filter(
            v =>
                isClinicEmergency24h(v) ||
                (v.services || []).some(s => (s || "").toLowerCase().includes("emergency"))
        ).length;
        const privateAndUniCount = vets.filter(v => {
            const t = getClinicType(v);
            return t === "Private" || t === "University" || t === "NGO";
        }).length;

        return {
            total: vets.length,
            districts: allDistricts.size,
            emergency: emergencyCount,
            privateAndUni: privateAndUniCount,
        };
    }, [vets]);

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedDivision("all");
        setSelectedDistrict("all");
        setSelectedCategory("all");
        setSelectedService("all");
        setSortBy("recommended");
    };

    const hasActiveFilters =
        searchQuery.trim() !== "" ||
        selectedDivision !== "all" ||
        selectedDistrict !== "all" ||
        selectedCategory !== "all" ||
        selectedService !== "all";

    return (
        <div className="min-h-screen bg-stone-50/60 dark:bg-zinc-950 pb-24">
            {/* Editorial Header */}
            <div className="bg-secondary/25 dark:bg-zinc-900/50 border-b border-stone-200/80 dark:border-zinc-800/80 pt-12 pb-12 md:pt-16 md:pb-14 px-4 relative overflow-hidden">
                <div className="relative z-10 container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-stone-200/80 dark:border-zinc-800 text-primary text-xs font-semibold mb-5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Cross-Checked Bangladesh Veterinary Directory</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading tracking-tight text-foreground">
                            Find Trusted <span className="text-primary">Veterinary Care</span>
                        </h1>

                        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                            Explore {stats.total}+ verified private clinics, university teaching
                            hospitals, and district veterinary centers across all{" "}
                            {stats.districts || 64} districts of Bangladesh.
                        </p>
                    </motion.div>

                    {/* Subtle Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mt-7"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 border border-stone-200/80 dark:border-zinc-800 px-3.5 py-1.5 rounded-full text-xs sm:text-sm shadow-sm">
                            <Building2 className="w-3.5 h-3.5 text-primary" />
                            <span className="font-semibold text-foreground">
                                {stats.total} Verified Centers
                            </span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 border border-stone-200/80 dark:border-zinc-800 px-3.5 py-1.5 rounded-full text-xs sm:text-sm shadow-sm">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            <span className="font-semibold text-foreground">
                                {stats.districts || 64} Districts Covered
                            </span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 border border-stone-200/80 dark:border-zinc-800 px-3.5 py-1.5 rounded-full text-xs sm:text-sm shadow-sm">
                            <GraduationCap className="w-3.5 h-3.5 text-primary" />
                            <span className="font-semibold text-foreground">
                                {stats.privateAndUni} Specialist & Private Clinics
                            </span>
                        </div>
                        <a
                            href="tel:16358"
                            className="inline-flex items-center gap-2 bg-amber-50/90 dark:bg-amber-950/40 hover:bg-amber-100/80 border border-amber-200/80 dark:border-amber-900/50 px-3.5 py-1.5 rounded-full text-xs sm:text-sm shadow-sm transition-colors"
                        >
                            <Phone className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                            <span className="font-semibold text-amber-900 dark:text-amber-300">
                                National Helpline: 16358
                            </span>
                        </a>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-6 md:mt-8 max-w-7xl">
                {/* Search & Multi-Filter Surface */}
                <div className="bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-stone-200/80 dark:border-zinc-800/80 space-y-5">
                    {/* Top Row: Search Input + District Select + Sort Select */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                        {/* Search Input */}
                        <div className="relative lg:col-span-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                            <input
                                type="text"
                                aria-label="Search clinics, areas, districts, or services"
                                placeholder="Search by clinic name, area (e.g. Uttara, Mirpur, Khulshi), or district..."
                                className="w-full pl-11 pr-10 py-3 rounded-xl border border-stone-200/90 dark:border-zinc-800 bg-stone-50/70 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary/50 focus:ring-2 focus:ring-primary/15 outline-none transition-all text-sm sm:text-base"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    aria-label="Clear search"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-stone-200/70 dark:hover:bg-zinc-700 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* District Selector */}
                        <div className="relative lg:col-span-3">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                            <select
                                id="vet-district-select"
                                aria-label="Filter by District"
                                value={selectedDistrict}
                                onChange={e => setSelectedDistrict(e.target.value)}
                                className="w-full appearance-none pl-10 pr-8 py-3 rounded-xl border border-stone-200/90 dark:border-zinc-800 bg-stone-50/70 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary/50 focus:ring-2 focus:ring-primary/15 outline-none transition-all text-sm font-medium cursor-pointer"
                            >
                                <option value="all">
                                    {selectedDivision === "all"
                                        ? `All 64 Districts (${vets.length})`
                                        : `All ${selectedDivision} Districts (${availableDistricts.length})`}
                                </option>
                                {availableDistricts.map(district => {
                                    const count = vets.filter(
                                        v => v.district === district
                                    ).length;
                                    return (
                                        <option key={district} value={district}>
                                            {district} ({count})
                                        </option>
                                    );
                                })}
                            </select>
                            <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                        </div>

                        {/* Sort Selector */}
                        <div className="relative lg:col-span-3">
                            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                            <select
                                id="vet-sort-select"
                                aria-label="Sort clinics"
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value as SortOption)}
                                className="w-full appearance-none pl-10 pr-8 py-3 rounded-xl border border-stone-200/90 dark:border-zinc-800 bg-stone-50/70 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary/50 focus:ring-2 focus:ring-primary/15 outline-none transition-all text-sm font-medium cursor-pointer"
                            >
                                <option value="recommended">Sort: Recommended First</option>
                                <option value="emergency">Sort: 24/7 & Emergency First</option>
                                <option value="rating">Sort: Highest Rated</option>
                                <option value="district">Sort: District (A–Z)</option>
                            </select>
                        </div>
                    </div>

                    {/* Division Tabs */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Browse by Division
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                            <button
                                type="button"
                                onClick={() => handleDivisionChange("all")}
                                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border ${
                                    selectedDivision === "all"
                                        ? "bg-foreground text-background border-foreground shadow-sm"
                                        : "bg-stone-50 dark:bg-zinc-800/60 border-stone-200/80 dark:border-zinc-800 text-muted-foreground hover:text-foreground hover:border-stone-300"
                                }`}
                            >
                                All Bangladesh ({divisionCounts.all || 0})
                            </button>
                            {BANGLADESH_DIVISIONS.map((division: BangladeshDivision) => (
                                <button
                                    key={division}
                                    type="button"
                                    onClick={() =>
                                        handleDivisionChange(
                                            selectedDivision === division ? "all" : division
                                        )
                                    }
                                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors border ${
                                        selectedDivision === division
                                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                            : "bg-stone-50 dark:bg-zinc-800/60 border-stone-200/80 dark:border-zinc-800 text-muted-foreground hover:text-foreground hover:border-primary/40"
                                    }`}
                                >
                                    {division} ({divisionCounts[division] || 0})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Clinic Type & Service Quick Filters */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 border-t border-stone-100 dark:border-zinc-800/80">
                        {/* Category Quick Filter */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Clinic Type
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {(
                                    [
                                        { id: "all", label: "All Types" },
                                        { id: "24h", label: "24/7 & Emergency" },
                                        { id: "private", label: "Private Clinics" },
                                        { id: "university_ngo", label: "University & NGO" },
                                        { id: "government", label: "Govt Hospitals" },
                                    ] as { id: QuickCategoryFilter; label: string }[]
                                ).map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedCategory(
                                                selectedCategory === cat.id && cat.id !== "all"
                                                    ? "all"
                                                    : cat.id
                                            )
                                        }
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                                            selectedCategory === cat.id
                                                ? cat.id === "24h"
                                                    ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                                                    : "bg-primary/15 text-primary border-primary/30 font-semibold"
                                                : "bg-white dark:bg-zinc-900 border-stone-200/80 dark:border-zinc-800 text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Clinical Service Filter */}
                        <div className="space-y-1.5">
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Clinical Service
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => setSelectedService("all")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                                        selectedService === "all"
                                            ? "bg-primary/15 text-primary border-primary/30 font-semibold"
                                            : "bg-white dark:bg-zinc-900 border-stone-200/80 dark:border-zinc-800 text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    All Services
                                </button>
                                {POPULAR_SERVICES.map(service => (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() =>
                                            setSelectedService(
                                                selectedService === service ? "all" : service
                                            )
                                        }
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                                            selectedService === service
                                                ? "bg-primary/15 text-primary border-primary/30 font-semibold"
                                                : "bg-white dark:bg-zinc-900 border-stone-200/80 dark:border-zinc-800 text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Active Results Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-zinc-800/80 text-sm">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-muted-foreground">
                                Showing{" "}
                                <strong className="text-foreground font-semibold">
                                    {filteredVets.length}
                                </strong>{" "}
                                {filteredVets.length === 1 ? "clinic" : "clinics"}
                                {selectedDivision !== "all" && ` in ${selectedDivision} Division`}
                                {selectedDistrict !== "all" && ` • ${selectedDistrict}`}
                            </span>
                        </div>

                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetFilters}
                                className="h-8 px-2.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                            >
                                <X className="w-3.5 h-3.5 mr-1" /> Reset All Filters
                            </Button>
                        )}
                    </div>
                </div>

                {/* Subtle National Helpline Info Bar */}
                <div className="mt-4 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 rounded-2xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                        <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 shrink-0">
                            <Clock className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="font-semibold">
                                Need District Livestock & Veterinary Assistance?
                            </span>{" "}
                            <span className="text-amber-900/80 dark:text-amber-300/80">
                                Call the official Department of Livestock Services (DLS) national
                                toll-free helpline at <strong>16358</strong> to reach district
                                government veterinary officers anywhere in Bangladesh.
                            </span>
                        </div>
                    </div>
                    <a
                        href="tel:16358"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shrink-0 transition-colors shadow-sm"
                    >
                        <Phone className="w-3.5 h-3.5" /> Dial 16358
                    </a>
                </div>

                {/* Results Grid / Loading / Error */}
                {loading ? (
                    <div className="mt-8">
                        <SkeletonGrid count={6} />
                    </div>
                ) : error ? (
                    <div className="py-12 mt-8">
                        <DataErrorState message={error} onRetry={fetchVets} />
                    </div>
                ) : filteredVets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                        {filteredVets.map((vet, index) => (
                            <VetCard key={vet.id} vet={vet} index={index} />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16 px-4 bg-white dark:bg-zinc-900 rounded-2xl border border-stone-200/80 dark:border-zinc-800 mt-8 max-w-md mx-auto shadow-sm">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Stethoscope className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                            No matching clinics found
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            We couldn&apos;t find a clinic matching your current filters. Try
                            switching to &ldquo;All Bangladesh&rdquo; or clearing your search
                            terms.
                        </p>
                        <Button
                            onClick={resetFilters}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                        >
                            Show All {stats.total} Clinics
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

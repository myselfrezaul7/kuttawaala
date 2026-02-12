"use client";

import { useState, useMemo, useEffect } from "react";
import { VetService, VetClinic } from "@/services/VetService";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, ExternalLink, Search, Star, Filter, X, Building2, Stethoscope, Loader2 } from "lucide-react";

export function VetFinder() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
    const [selectedService, setSelectedService] = useState<string>("all");
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
    const [vets, setVets] = useState<VetClinic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVets = async () => {
            try {
                const data = await VetService.getAll();
                setVets(data);
            } catch (error) {
                console.error("Failed to load vets", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVets();
    }, []);

    // Extract unique districts and services
    const districts = useMemo(() => {
        return Array.from(new Set(vets.map(v => v.district))).sort();
    }, [vets]);

    const allServices = useMemo(() => {
        const services = new Set<string>();
        vets.forEach(vet => vet.services.forEach(s => services.add(s)));
        return Array.from(services).sort();
    }, [vets]);

    // Filter vets based on search, district, and service
    const filteredVets = useMemo(() => {
        return vets.filter(vet => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = searchQuery === "" ||
                vet.name.toLowerCase().includes(searchLower) ||
                vet.address.toLowerCase().includes(searchLower) ||
                vet.district.toLowerCase().includes(searchLower) ||
                vet.services.some(s => s.toLowerCase().includes(searchLower));

            const matchesDistrict = selectedDistrict === "all" || vet.district === selectedDistrict;
            const matchesService = selectedService === "all" || vet.services.includes(selectedService);
            const matchesEmergency = showEmergencyOnly ? (vet.services.some(s => s.toLowerCase().includes("24") || s.toLowerCase().includes("emergency"))) : true;

            return matchesSearch && matchesDistrict && matchesService && matchesEmergency;
        });
    }, [vets, searchQuery, selectedDistrict, selectedService, showEmergencyOnly]);

    // Stats
    const stats = useMemo(() => ({
        total: vets.length,
        districts: districts.length,
        emergency: vets.filter(v => v.services.some(s => s.toLowerCase().includes("24") || s.toLowerCase().includes("emergency"))).length,
    }), [vets, districts]);

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedDistrict("all");
        setSelectedService("all");
        setShowEmergencyOnly(false);
    };

    const hasActiveFilters = searchQuery || selectedDistrict !== "all" || selectedService !== "all" || showEmergencyOnly;

    return (
        <div className="min-h-screen bg-muted/30 dark:bg-zinc-950 pb-20">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 text-white py-16 text-center px-4 relative overflow-hidden">
                <div className="relative z-10 container mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Find a Vet Near You</h1>
                    <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
                        Search {stats.total}+ verified veterinary clinics across {stats.districts} districts in Bangladesh
                    </p>

                    {/* Stats Pills */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Building2 className="w-5 h-5" />
                            <span className="font-semibold">{stats.total} Clinics</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <MapPin className="w-5 h-5" />
                            <span className="font-semibold">{stats.districts} Districts</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Stethoscope className="w-5 h-5" />
                            <span className="font-semibold">{stats.emergency} 24/7 Available</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                {/* Search & Filter Card */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-border/50 dark:border-zinc-800 space-y-4">
                    {/* Main Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/80 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by clinic name, area, or service..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-border dark:border-zinc-700 bg-muted/30 dark:bg-zinc-800/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Filter Row */}
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        {/* District Dropdown */}
                        <div className="flex-1 w-full">
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">
                                <MapPin className="w-4 h-4 inline mr-1" /> District
                            </label>
                            <select
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="w-full p-3 rounded-xl border border-border dark:border-zinc-700 bg-muted/30 dark:bg-zinc-800/50 focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
                            >
                                <option value="all">All Districts ({vets.length})</option>
                                {districts.map(district => (
                                    <option key={district} value={district}>
                                        {district} ({vets.filter(v => v.district === district).length})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Service Dropdown */}
                        <div className="flex-1 w-full">
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">
                                <Filter className="w-4 h-4 inline mr-1" /> Service Type
                            </label>
                            <select
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                                className="w-full p-3 rounded-xl border border-border dark:border-zinc-700 bg-muted/30 dark:bg-zinc-800/50 focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
                            >
                                <option value="all">All Services</option>
                                {allServices.map(service => (
                                    <option key={service} value={service}>{service}</option>
                                ))}
                            </select>
                        </div>

                        {/* Emergency Toggle */}
                        <div className="flex items-center pb-1">
                            <label className="flex items-center gap-3 cursor-pointer bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 px-4 py-3 rounded-xl transition-all select-none">
                                <input
                                    type="checkbox"
                                    checked={showEmergencyOnly}
                                    onChange={(e) => setShowEmergencyOnly(e.target.checked)}
                                    className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-gray-300"
                                />
                                <span className="font-bold text-red-700 dark:text-red-400 text-sm whitespace-nowrap">Emergency / 24h</span>
                            </label>
                        </div>
                    </div>

                    {/* Active Filters & Results Count */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50">
                        <p className="text-muted-foreground">
                            Showing <span className="font-bold text-foreground">{filteredVets.length}</span> of {vets.length} clinics
                        </p>
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetFilters}
                                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                            >
                                <X className="w-4 h-4 mr-1" /> Clear All Filters
                            </Button>
                        )}
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                    </div>
                ) : (
                    /* Results Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {filteredVets.map(vet => (
                            <div
                                key={vet.id}
                                className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-border/50 dark:border-zinc-800 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-300 group"
                            >
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-foreground dark:text-white group-hover:text-emerald-600 transition-colors mb-2 line-clamp-2">
                                                {vet.name}
                                            </h3>
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg">
                                                <MapPin className="w-3 h-3" /> {vet.district}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-1.5 rounded-lg shrink-0 ml-2">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="font-bold text-sm text-yellow-700 dark:text-yellow-400">{vet.rating}</span>
                                            <span className="text-xs text-yellow-600/70 dark:text-yellow-500/70">({vet.reviewCount})</span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-2.5 text-sm text-muted-foreground dark:text-muted-foreground/80 mb-4">
                                        <div className="flex items-start gap-2.5">
                                            <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                            <p className="line-clamp-2">{vet.address}</p>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                                            <p>{vet.phone}</p>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                                            <p className={vet.hours.includes("24") ? "text-emerald-600 font-semibold" : ""}>
                                                {vet.hours}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Service Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {vet.services.slice(0, 4).map(service => (
                                            <span
                                                key={service}
                                                className="text-xs px-2 py-0.5 bg-muted dark:bg-zinc-800 text-muted-foreground rounded-md"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                        {vet.services.length > 4 && (
                                            <span className="text-xs px-2 py-0.5 bg-muted dark:bg-zinc-800 text-muted-foreground rounded-md">
                                                +{vet.services.length - 4} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <a
                                            href={`tel:${vet.phone.replace(/[^0-9+]/g, '')}`}
                                            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                                        >
                                            <Phone className="w-4 h-4" /> Call
                                        </a>
                                        <a
                                            href={vet.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
                                        >
                                            Get Directions <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredVets.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-border/50 dark:border-zinc-800 mt-8">
                        <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">No clinics found</h3>
                        <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                        <Button onClick={resetFilters} className="bg-emerald-600 hover:bg-emerald-700">
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

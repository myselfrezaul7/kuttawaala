"use client";

import { useState, useEffect } from "react";
import { PetCard } from "@/components/shared/PetCard";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, Grid, Heart, Bone } from "lucide-react";
import { dogs, getAgeCategory, type AgeCategory, type Dog } from "@/data/dogs";

import { useSearchParams } from "next/navigation";

import { DogService } from "@/services/DogService";

interface AdoptPageContentProps {
    initialDogs?: Dog[];
}

export function AdoptPageContent({ initialDogs }: AdoptPageContentProps) {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [dogList, setDogList] = useState<Dog[]>(initialDogs || []);
    const [isLoading, setIsLoading] = useState(!initialDogs);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const fetchedDogs = await DogService.getAllDogs();
                setDogList(fetchedDogs);
            } catch (error) {
                console.error("Failed to fetch dogs", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!initialDogs) {
            fetchDogs();
        }
    }, [initialDogs]);

    useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    const [selectedGender, setSelectedGender] = useState<string>("All");
    const [selectedAge, setSelectedAge] = useState<AgeCategory | "All">("All");
    const [attributes, setAttributes] = useState({
        vaccinated: false,
        neutered: false,
        goodWithKids: false,
    });

    const allDogs = dogList;

    const filteredDogs = allDogs.filter(dog => {
        // Text Search
        const matchesSearch = searchQuery === "" ||
            dog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dog.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dog.location.toLowerCase().includes(searchQuery.toLowerCase());

        // Category Filters
        const matchesGender = selectedGender === "All" || dog.gender === selectedGender;
        const matchesAge = selectedAge === "All" || getAgeCategory(dog.age) === selectedAge;

        // Attribute Filters (AND logic)
        const matchesAttributes =
            (!attributes.vaccinated || dog.vaccinated) &&
            (!attributes.neutered || dog.neutered) &&
            (!attributes.goodWithKids || dog.goodWithKids);

        return matchesSearch && matchesGender && matchesAge && matchesAttributes;
    });

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedGender("All");
        setSelectedAge("All");
        setAttributes({ vaccinated: false, neutered: false, goodWithKids: false });
    };

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <div className="bg-primary text-primary-foreground py-20 text-center px-4 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading tracking-tight">Find Your Canine Companion</h1>
                    <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg font-medium">
                        Browse through our list of rescued dogs. From playful puppies to snoozy seniors, they are all waiting for love.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-sm font-bold bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 inline-block shadow-lg">
                            We promote "Adopt Don't Shop". No buying/selling.
                        </p>
                    </div>
                </div>
                {/* Abstract Pattern Background */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-white blur-3xl" />
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-card p-6 md:p-8 rounded-[2rem] shadow-xl border border-border space-y-8">
                    {/* Search & Filter Header */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-2 text-foreground/80">
                            <Filter className="w-5 h-5" />
                            <h2 className="text-lg font-bold">Filter Dogs</h2>
                        </div>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name, breed, or location..."
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-muted/30 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="h-px bg-border/60 w-full" />

                    {/* Filter Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Gender */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground/70 ml-1">Gender</label>
                            <select
                                className="w-full p-3 rounded-xl border border-border bg-muted/30 focus:bg-background outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer appearance-none"
                                value={selectedGender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                            >
                                <option value="All">Any Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground/70 ml-1">Age</label>
                            <select
                                className="w-full p-3 rounded-xl border border-border bg-muted/30 focus:bg-background outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer appearance-none"
                                value={selectedAge}
                                onChange={(e) => setSelectedAge(e.target.value as AgeCategory | "All")}
                            >
                                <option value="All">Any Age</option>
                                <option value="Puppy">Puppy (&lt; 1 year)</option>
                                <option value="Adult">Adult (1-7 years)</option>
                                <option value="Senior">Senior (7+ years)</option>
                            </select>
                        </div>

                        {/* Attributes Checklist */}
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-foreground/70 ml-1">Attributes</label>
                            <div className="flex flex-wrap gap-3">
                                <label className={`flex items-center gap-2 cursor-pointer px-4 py-3 rounded-xl border transition-all select-none ${attributes.goodWithKids ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-muted/30 border-border hover:border-primary/50 text-foreground'}`}>
                                    <input
                                        type="checkbox"
                                        checked={attributes.goodWithKids}
                                        onChange={(e) => setAttributes(prev => ({ ...prev, goodWithKids: e.target.checked }))}
                                        className="hidden"
                                    />
                                    Good with Kids
                                </label>
                                <label className={`flex items-center gap-2 cursor-pointer px-4 py-3 rounded-xl border transition-all select-none ${attributes.vaccinated ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-muted/30 border-border hover:border-primary/50 text-foreground'}`}>
                                    <input
                                        type="checkbox"
                                        checked={attributes.vaccinated}
                                        onChange={(e) => setAttributes(prev => ({ ...prev, vaccinated: e.target.checked }))}
                                        className="hidden"
                                    />
                                    Vaccinated
                                </label>
                                <label className={`flex items-center gap-2 cursor-pointer px-4 py-3 rounded-xl border transition-all select-none ${attributes.neutered ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-muted/30 border-border hover:border-primary/50 text-foreground'}`}>
                                    <input
                                        type="checkbox"
                                        checked={attributes.neutered}
                                        onChange={(e) => setAttributes(prev => ({ ...prev, neutered: e.target.checked }))}
                                        className="hidden"
                                    />
                                    Neutered
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results & Stats */}
                <div className="mt-10 flex justify-between items-center text-muted-foreground mb-6 px-2">
                    <p className="font-semibold flex items-center gap-2">
                        <Grid className="w-5 h-5 opacity-70" />
                        Showing {filteredDogs.length} dogs
                    </p>
                    {(searchQuery || selectedGender !== "All" || selectedAge !== "All" || Object.values(attributes).some(Boolean)) && (
                        <Button variant="ghost" onClick={resetFilters} className="text-destructive hover:text-destructive hover:bg-destructive/10 h-auto py-1 px-3 rounded-lg text-sm font-bold transition-all">
                            <X className="w-4 h-4 mr-1.5" /> Clear Filters
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                    {filteredDogs.length > 0 ? (
                        filteredDogs.map(dog => (
                            // @ts-ignore
                            <PetCard key={dog.id} dog={dog} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-24 bg-muted/20 rounded-[3rem] border-2 border-dashed border-border">
                            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                                <Bone className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-3">No dogs matched your filters</h3>
                            <p className="text-muted-foreground max-w-md mx-auto mb-8">
                                Maybe try broadening your search? Our dogs are picky, but you shouldn't have to be!
                            </p>
                            <Button onClick={resetFilters} size="lg" className="rounded-xl px-8 font-bold shadow-lg shadow-primary/20">
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

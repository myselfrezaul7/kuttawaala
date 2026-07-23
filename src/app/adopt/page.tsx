import { Suspense } from "react";
import { Metadata } from "next";
import { AdoptPageContent } from "@/components/adopt/AdoptPageContent";


export const metadata: Metadata = {
    title: "Adopt a Dog",
    description: "Find your perfect companion. Puppies, adults, and seniors available for adoption.",
};

export default function AdoptPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <AdoptPageContent />
        </Suspense>
    );
}

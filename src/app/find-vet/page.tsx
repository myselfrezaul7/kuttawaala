import { Suspense } from "react";
import { Metadata } from "next";
import { VetFinder } from "@/components/vet/VetFinder";

export const metadata: Metadata = {
    title: "Find Verified Vets in Dhaka",
    description: "Locate trusted veterinary clinics and hospitals in Bangladesh. Verified ratings to help you choose the best care for your dog.",
};

export default function FindVetPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading vets...</div>}>
            <VetFinder />
        </Suspense>
    );
}

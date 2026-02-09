import { Metadata } from "next";
import { AdoptPageContent } from "@/components/adopt/AdoptPageContent";
import { dogs } from "@/data/dogs";

export const metadata: Metadata = {
    title: "Adopt a Rescued Dog",
    description: "Browse verified rescued dogs in Bangladesh waiting for a loving home. Kittens, adults, and seniors available for adoption.",
};

export default function AdoptPage() {
    return <AdoptPageContent initialCats={dogs} />;
}

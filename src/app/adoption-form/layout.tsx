import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Adoption Agreement Form",
    description: "Official Kuttawaala dog adoption application and agreement form for adopters in Bangladesh.",
};

export default function AdoptionFormLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

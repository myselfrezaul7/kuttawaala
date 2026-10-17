import { Metadata } from "next";
import { DonatePage } from "@/components/donate/DonatePage";

export const metadata: Metadata = {
    title: "Donate | Save a Street Dog",
    description: "Your contribution provides emergency rescues, vaccinations, sterilization, and daily meals for stray dogs in Bangladesh. Donate via bKash, Nagad, or Bank.",
    openGraph: {
        title: "Donate to Kuttawaala | Save a Street Dog",
        description: "Your contribution provides emergency rescues, vaccinations, sterilization, and daily meals for stray dogs in Bangladesh.",
    },
};

export default function Page() {
    return <DonatePage />;
}

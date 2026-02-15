import { Metadata } from "next";
import { DonatePage } from "@/components/donate/DonatePage";

export const metadata: Metadata = {
    title: "Donate to Kuttawaala | Save a Street Dog",
    description: "Support our mission to rescue, treat, and feed stray dogs in Bangladesh. Your donation provides vaccines, food, and medical care.",
};

export default function Page() {
    return <DonatePage />;
}

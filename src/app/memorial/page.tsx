import { Metadata } from "next";
import { RainbowBridgeClient } from "@/components/memorial/RainbowBridgeClient";
import { MemorialList } from "@/components/memorial/MemorialList";

export const metadata: Metadata = {
    title: "Memorial Wall & Rainbow Bridge Sanctuary | In Loving Memory",
    description: "A tribute to the beloved dogs who have crossed the rainbow bridge. Always loved, never forgotten.",
};

export default function MemorialPage() {
    return (
        <main className="min-h-screen">
            <RainbowBridgeClient />
            <MemorialList />
        </main>
    );
}

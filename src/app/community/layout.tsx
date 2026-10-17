import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Community Hub",
    description: "Read rescue stories, dog care guides, and local welfare updates from Kuttawaala's 17K+ community in Bangladesh.",
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

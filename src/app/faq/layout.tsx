import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Frequently Asked Questions",
    description: "Answers to common questions about stray dog adoption, rabies vaccination, emergency rescue, and fostering in Bangladesh.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

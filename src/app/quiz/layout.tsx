import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Soul-Dog Matcher Quiz",
    description: "Take our quick personality quiz to find your ideal rescued street dog match in Bangladesh.",
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

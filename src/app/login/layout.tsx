import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In or Create Account",
    description: "Sign in to Kuttawaala to track your adoption applications, rescue reports, and community impact.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

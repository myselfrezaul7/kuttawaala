import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const viewport: Viewport = {
    themeColor: "#f43f5e",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: "Kuttawaala | Save a Stray, Gain a Friend",
        template: "%s | Kuttawaala",
    },
    description: "Bangladesh's first dedicated platform for stray dog rescue, adoption, and care. Join our mission to give every street dog a home.",
    keywords: ["dog adoption bangladesh", "stray dog rescue dhaka", "veterinary clinics dhaka", "kuttawaala", "animal welfare bangladesh"],
    authors: [{ name: "Kuttawaala Team" }],
    creator: "Kuttawaala",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Kuttawaala",
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://kuttawaala.com",
        title: "Kuttawaala | Save a Stray, Gain a Friend",
        description: "Connect with rescued dogs, find vets, and report strays in Bangladesh.",
        siteName: "Kuttawaala",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kuttawaala | Save a Stray, Gain a Friend",
        description: "Helping street dogs in Bangladesh find loving homes.",
        creator: "@kuttawaala",
    },
    metadataBase: new URL("https://kuttawaala.com"),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <FavoritesProvider>
                            <div className="flex flex-col min-h-screen">
                                <Header />
                                <main className="flex-grow pt-24">
                                    {children}
                                </main>
                                <Footer />
                            </div>
                        </FavoritesProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

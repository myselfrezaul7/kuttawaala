import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export const metadata: Metadata = {
    title: 'Report a Stray | Kuttawaala',
    description: 'Report a stray dog in need of help.',
};

export default function ReportPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
            <Construction className="w-16 h-16 text-orange-500 mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 text-center">
                Under Maintenance
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md text-center mb-8">
                We are currently updating our reporting system to serve you better. Please check back soon!
            </p>
            <Link href="/">
                <Button className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back Home
                </Button>
            </Link>
        </div>
    );
}

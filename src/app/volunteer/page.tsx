import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
    title: 'Volunteer | Kuttawaala',
    description: 'Join us in helping street dogs.',
};

export default function VolunteerPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
            <HeartHandshake className="w-16 h-16 text-orange-500 mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 text-center">
                Join Our Pack
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md text-center mb-8">
                Our volunteer program is getting a makeover. We'll be accepting new applications shortly!
            </p>
            <Link href="/">
                <Button className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back Home
                </Button>
            </Link>
        </div>
    );
}

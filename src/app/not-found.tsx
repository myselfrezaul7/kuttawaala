import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dog } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-secondary/50 dark:bg-zinc-900 p-8 rounded-full mb-8 animate-bounce">
                <Dog className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4 text-foreground dark:text-white">
                404
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-foreground/90 dark:text-muted-foreground">
                Oops! This page is playing hide and seek.
            </h2>
            <p className="text-muted-foreground dark:text-muted-foreground/80 max-w-md mb-8">
                We couldn't find the page you were looking for. It might have been moved or doesn't exist anymore.
            </p>
            <Link href="/">
                <Button size="lg" className="rounded-full bg-primary/90 hover:bg-primary">
                    Return Home
                </Button>
            </Link>
        </div>
    );
}

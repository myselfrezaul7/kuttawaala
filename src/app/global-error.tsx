"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-4 text-center pb-20">
                    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-full mb-6">
                        <AlertCircle className="w-12 h-12 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-bold font-heading mb-4 text-foreground dark:text-white">
                        System Failure
                    </h2>
                    <p className="text-muted-foreground dark:text-muted-foreground/80 max-w-md mb-8">
                        A critical error occurred. Please refresh the page to try again.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button
                            onClick={() => reset()}
                            className="gap-2 bg-card dark:bg-muted text-white dark:text-foreground hover:bg-card dark:hover:bg-muted"
                        >
                            <RefreshCcw className="w-4 h-4" /> Hard Refresh
                        </Button>
                        <Button variant="outline" onClick={() => window.location.href = '/'}>
                            Go Home
                        </Button>
                    </div>
                </div>
            </body>
        </html>
    );
}

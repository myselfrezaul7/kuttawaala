'use client';

import { Inter } from "next/font/google"; // Import font to keep styling consistent even in error state
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold text-destructive">Critical Error</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Something went wrong in the main layout. We apologize for the inconvenience.
                        </p>
                        {/* Digest is useful for debugging in production logs */}
                        {error.digest && (
                            <p className="text-xs text-muted-foreground/50 font-mono">
                                Error ID: {error.digest}
                            </p>
                        )}
                        <Button
                            onClick={() => reset()}
                            variant="default"
                            className="mt-4"
                        >
                            Try again
                        </Button>
                    </div>
                </div>
            </body>
        </html>
    );
}

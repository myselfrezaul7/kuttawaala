"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";

export interface ShareModalProps {
    title: string;
    text?: string;
    url: string;
    isOpen: boolean;
    onClose: () => void;
}

export function ShareModal({
    title,
    text = "Check this out on Kuttawaala!",
    url,
    isOpen,
    onClose,
}: ShareModalProps) {
    const [copied, setCopied] = useState(false);
    const [canNativeShare, setCanNativeShare] = useState(false);

    useEffect(() => {
        if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
            setCanNativeShare(true);
        }
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast.success("Link copied to clipboard! 🐾");
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Failed to copy link");
        }
    };

    const handleNativeShare = async () => {
        if (!navigator.share) return;
        try {
            await navigator.share({
                title,
                text,
                url,
            });
            toast.success("Shared successfully! 🐾");
        } catch (err: any) {
            if (err.name !== "AbortError") {
                toast.error("Could not share via device dialog");
            }
        }
    };

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${text} ${url}`
    )}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
    )}`;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="sm:max-w-md rounded-3xl p-6 bg-card border-border shadow-2xl">
                <DialogHeader className="space-y-2 text-left">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2 text-foreground font-heading">
                        <Share2 className="w-5 h-5 text-primary" />
                        Share this with friends
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Help spread the word to find forever homes and support rescue dogs across Bangladesh.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                    {/* Native Share button when supported */}
                    {canNativeShare && (
                        <Button
                            onClick={handleNativeShare}
                            className="w-full h-11 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Share2 className="w-4 h-4" />
                            Share via Device Apps
                        </Button>
                    )}

                    {/* Direct Social Shortcuts */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* WhatsApp */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 h-12 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] dark:text-[#25D366] font-semibold text-sm transition-all border border-[#25D366]/20 hover:scale-[1.02]"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.937-.389-1.579-.982-2.073-1.631-.493-.649-.806-1.516-.806-2.38 0-1.114.549-1.66.744-1.855.195-.195.426-.244.571-.244.145 0 .289.002.417.009.135.007.315-.052.492.373.182.438.623 1.517.677 1.628.055.111.09.242.018.386-.071.144-.108.234-.216.361-.108.126-.226.281-.323.377-.108.108-.221.226-.095.443.126.216.562.926 1.205 1.5 1.002.894 1.849 1.171 2.11 1.303.262.131.415.113.57-.066.155-.18.663-.772.842-1.038.18-.266.36-.221.603-.131.243.09 1.541.727 1.806.858.265.131.442.195.508.307.066.113.066.654-.078 1.059zM12 2C6.477 2 2 6.477 2 12c0 1.81.487 3.507 1.334 4.97L2 22l5.191-1.308A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                            </svg>
                            WhatsApp
                        </a>

                        {/* Facebook */}
                        <a
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 h-12 rounded-2xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] font-semibold text-sm transition-all border border-[#1877F2]/20 hover:scale-[1.02]"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </a>
                    </div>

                    {/* Copy Link Input Section */}
                    <div className="space-y-1.5 pt-1">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Page Link
                        </label>
                        <div className="flex gap-2">
                            <Input
                                readOnly
                                value={url}
                                className="h-11 rounded-2xl font-mono text-xs bg-muted/50 border-border select-all"
                            />
                            <Button
                                onClick={handleCopy}
                                variant="outline"
                                className="h-11 px-4 rounded-2xl shrink-0 gap-1.5 border-border hover:bg-secondary font-medium"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-emerald-500" />
                                        <span className="text-emerald-500 text-xs">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        <span className="text-xs">Copy</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            aria-label={language === "en" ? "Switch language to Bengali" : "Switch language to English"}
            className="w-10 h-10 rounded-full font-bold text-sm bg-muted/50 dark:bg-zinc-800/50 border border-border/20 hover:bg-muted dark:hover:bg-zinc-800 transition-all duration-300"
        >
            {language === 'en' ? 'BN' : 'EN'}
        </Button>
    );
}

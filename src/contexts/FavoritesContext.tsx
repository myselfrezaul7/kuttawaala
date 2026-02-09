"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";

type FavoritesContextType = {
    favoriteIds: string[];
    toggleFavorite: (id: string) => Promise<void>;
    isFavorite: (id: string) => boolean;
    isLoading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    // Load favorites on mount or user change
    useEffect(() => {
        const loadFavorites = async () => {
            setIsLoading(true);
            if (user) {
                // Load from Supabase
                const { data, error } = await supabase
                    .from('favorites')
                    .select('dog_id')
                    .eq('user_id', user.id);

                if (data && !error) {
                    setFavoriteIds(data.map(fav => fav.dog_id));
                }
            } else {
                // Load from local storage
                const stored = localStorage.getItem("kuttawaala_favorites");
                if (stored) {
                    setFavoriteIds(JSON.parse(stored));
                }
            }
            setIsLoading(false);
        };

        loadFavorites();
    }, [user, supabase]);

    // Save to local storage on change (only if guest)
    useEffect(() => {
        if (!user) {
            localStorage.setItem("kuttawaala_favorites", JSON.stringify(favoriteIds));
        }
    }, [favoriteIds, user]);

    const toggleFavorite = async (id: string) => {
        const isCurrentlyFavorite = favoriteIds.includes(id);

        // Optimistic update
        setFavoriteIds(prev =>
            isCurrentlyFavorite
                ? prev.filter(fid => fid !== id)
                : [...prev, id]
        );

        if (user) {
            try {
                if (isCurrentlyFavorite) {
                    await supabase
                        .from('favorites')
                        .delete()
                        .eq('user_id', user.id)
                        .eq('dog_id', id);
                } else {
                    await supabase
                        .from('favorites')
                        .insert({ user_id: user.id, dog_id: id });
                }
            } catch (error) {
                console.error("Error syncing favorite:", error);
                // Revert optimistic update on error would go here
            }
        }
    };

    const isFavorite = (id: string) => {
        return favoriteIds.includes(id);
    };

    const value = {
        favoriteIds,
        toggleFavorite,
        isFavorite,
        isLoading
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

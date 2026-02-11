"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/utils/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

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

    // Load favorites on mount or user change
    useEffect(() => {
        const loadFavorites = async () => {
            setIsLoading(true);
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists() && docSnap.data().favorites) {
                        setFavoriteIds(docSnap.data().favorites || []);
                    } else {
                        // Check local storage for guest favorites to merge
                        const stored = localStorage.getItem("kuttawaala_favorites");
                        if (stored) {
                            const localFavorites = JSON.parse(stored);
                            // Merge and save
                            await setDoc(docRef, { favorites: localFavorites }, { merge: true });
                            setFavoriteIds(localFavorites);
                            localStorage.removeItem("kuttawaala_favorites");
                        }
                    }
                } catch (error) {
                    console.error("Error loading favorites from Firestore:", error);
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
    }, [user]);

    // Save to local storage on change (only if guest)
    useEffect(() => {
        if (!user) {
            localStorage.setItem("kuttawaala_favorites", JSON.stringify(favoriteIds));
        }
    }, [favoriteIds, user]);

    const toggleFavorite = async (id: string) => {
        const isCurrentlyFavorite = favoriteIds.includes(id);
        const newFavorites = isCurrentlyFavorite
            ? favoriteIds.filter(fid => fid !== id)
            : [...favoriteIds, id];

        // Optimistic update
        setFavoriteIds(newFavorites);

        if (user) {
            try {
                const docRef = doc(db, "users", user.uid);
                await setDoc(docRef, {
                    favorites: isCurrentlyFavorite ? arrayRemove(id) : arrayUnion(id)
                }, { merge: true });
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

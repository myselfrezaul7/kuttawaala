"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/utils/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";

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

    // Real-time sync with Firestore
    useEffect(() => {
        let unsubscribe: () => void;

        const setupFavorites = async () => {
            setIsLoading(true);
            if (user) {
                const docRef = doc(db, "users", user.uid);

                // Real-time listener
                unsubscribe = onSnapshot(docRef, async (docSnap) => {
                    if (docSnap.exists() && docSnap.data().favorites) {
                        setFavoriteIds(docSnap.data().favorites || []);
                    } else {
                        // Check local storage for guest favorites to merge
                        try {
                            const stored = localStorage.getItem("kuttawaala_favorites");
                            if (stored) {
                                const localFavorites = JSON.parse(stored);
                                if (Array.isArray(localFavorites) && localFavorites.length > 0) {
                                    await setDoc(docRef, { favorites: localFavorites }, { merge: true });
                                    localStorage.removeItem("kuttawaala_favorites");
                                }
                            }
                        } catch (e) {
                            console.warn("Failed to parse local favorites:", e);
                        }
                    }
                    setIsLoading(false);
                }, (error) => {
                    console.error("Error listening to favorites:", error);
                    setIsLoading(false);
                });

            } else {
                // Clear any leftover state on logout, then load from local storage
                try {
                    const stored = localStorage.getItem("kuttawaala_favorites");
                    if (stored) {
                        const parsed = JSON.parse(stored);
                        setFavoriteIds(Array.isArray(parsed) ? parsed : []);
                    } else {
                        setFavoriteIds([]);
                    }
                } catch (e) {
                    console.warn("Failed to parse local favorites:", e);
                    setFavoriteIds([]);
                }
                setIsLoading(false);
            }
        };

        setupFavorites();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [user]);

    // Save to local storage on change (only if guest)
    useEffect(() => {
        if (!user && typeof window !== "undefined") {
            try {
                localStorage.setItem("kuttawaala_favorites", JSON.stringify(favoriteIds));
            } catch (e) {
                console.warn("Failed to persist favorites to localStorage:", e);
            }
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

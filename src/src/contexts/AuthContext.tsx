"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
} | null;

type AuthContextType = {
    currentUser: User;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true });

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    const value = {
        currentUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

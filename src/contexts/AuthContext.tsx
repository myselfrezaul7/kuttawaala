"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { friendlyAuthMessage } from "@/utils/friendlyErrors";
import { rateLimiter } from "@/lib/rate-limit";

export type UserData = {
    email: string;
    displayName: string | null;
    photoURL: string | null;
    role: string;
    createdAt: string;
    points?: number;
    phone?: string;
    id?: string;
};

type AuthContextType = {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    loading: true,
    signInWithGoogle: async () => { },
    signInWithEmail: async () => { },
    signUpWithEmail: async () => { },
    signOut: async () => { },
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setUserData({ id: userDoc.id, ...userDoc.data() });
                    } else {
                        // Create user doc if it doesn't exist
                        const newUser = {
                            name: user.displayName || "User",
                            email: user.email,
                            role: "user",
                            createdAt: Date.now()
                        };
                        await setDoc(doc(db, "users", user.uid), newUser);
                        setUserData({ id: user.uid, ...newUser });
                    }
                } catch (error) {
                    console.error("Error fetching user data", error);
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            toast.success("Successfully signed in with Google!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Error signing in with Google", error);
            toast.error(friendlyAuthMessage(error.code));
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        const normalizedEmail = (email || "").trim().toLowerCase();
        const emailKey = `auth_login_${normalizedEmail || 'anonymous'}`;
        const clientKey = "auth_login_client";

        // Check if user or client is currently locked out under cooldown
        const emailLock = rateLimiter.isLocked(emailKey);
        const clientLock = rateLimiter.isLocked(clientKey);

        if (emailLock.locked || clientLock.locked) {
            toast.error("Too many failed login attempts. Please wait 1 minute before trying again.");
            throw new Error("Too many failed login attempts. Please wait 1 minute before trying again.");
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Reset failed login counter and lockout on successful login
            rateLimiter.reset(emailKey);
            rateLimiter.reset(clientKey);
            toast.success("Welcome back!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Login error", error);
            // Track failed attempts: 5 failures within 5 minutes triggers 60-second cooldown
            const emailFail = rateLimiter.recordFailure(emailKey, 5, 5 * 60 * 1000, 60 * 1000);
            const clientFail = rateLimiter.recordFailure(clientKey, 5, 5 * 60 * 1000, 60 * 1000);

            if (emailFail.locked || clientFail.locked) {
                toast.error("Too many failed login attempts. Please wait 1 minute before trying again.");
            } else {
                toast.error(friendlyAuthMessage(error.code));
            }
            throw error;
        }
    };

    const signUpWithEmail = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success("Account created successfully!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Signup error", error);
            toast.error(friendlyAuthMessage(error.code));
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            toast.success("Signed out successfully");
            router.push("/");
        } catch (error) {
            console.error("Error signing out", error);
            toast.error("Failed to sign out");
        }
    };

    const value = {
        user,
        userData,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

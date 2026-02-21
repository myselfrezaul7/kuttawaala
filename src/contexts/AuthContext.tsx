"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AuthContextType = {
    user: User | null;
    userData: any | null;
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
            toast.error(error.message || "Failed to sign in with Google");
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Welcome back!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Login error", error);
            toast.error(error.message || "Failed to login");
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
            toast.error(error.message || "Failed to create account");
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

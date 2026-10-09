import { db } from "@/utils/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { sanitizeInput } from "@/lib/validation";
import { rateLimiter } from "@/lib/rate-limit";
import { RateLimitError, handleServiceError } from "@/lib/errors";

export type AdoptionApplication = {
    id?: string;
    dogId: string;
    dogName: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    experience?: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    created_at: number | string;
    userId?: string | null;
};

const COLLECTION_NAME = "adoptions";

export const AdoptionService = {
    async submitApplication(application: {
        dogId: string;
        dogName: string;
        applicantName: string;
        applicantEmail: string;
        applicantPhone: string;
        experience?: string;
        userId?: string | null;
    }) {
        // Rate limit check
        const limitKey = `adoption_${application.applicantEmail || application.userId || 'anonymous'}`;
        const rateCheck = rateLimiter.check(limitKey, 5, 10 * 60 * 1000);
        if (!rateCheck.success) {
            throw new RateLimitError("Too many adoption applications. Please wait before submitting another.");
        }

        // Sanitize applicant text inputs to prevent XSS
        const sanitized = {
            dogId: sanitizeInput(application.dogId || ""),
            dogName: sanitizeInput(application.dogName || ""),
            applicantName: sanitizeInput(application.applicantName || ""),
            applicantEmail: sanitizeInput(application.applicantEmail || ""),
            applicantPhone: sanitizeInput(application.applicantPhone || ""),
            experience: application.experience ? sanitizeInput(application.experience) : "",
            status: "Pending" as const,
            created_at: Date.now(),
            userId: application.userId || null,
        };

        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), sanitized);
            return { id: docRef.id, ...sanitized };
        } catch (error) {
            console.error("Error submitting adoption application:", error);
            throw new Error(handleServiceError(error));
        }
    },

    async getByUserId(userId: string) {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("userId", "==", userId)
            );
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AdoptionApplication));
        } catch (error) {
            console.error("Error fetching user adoptions:", error);
            return [];
        }
    }
};

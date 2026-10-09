import { db } from "@/utils/firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { sanitizeInput } from "@/lib/validation";
import { rateLimiter } from "@/lib/rate-limit";
import { RateLimitError, handleServiceError } from "@/lib/errors";

export type VolunteerApplication = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    interest: string;
    message?: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    created_at: string;
};

const COLLECTION_NAME = "volunteers";

export const VolunteerService = {
    async submitApplication(application: {
        name: string;
        email: string;
        phone: string;
        interest: string;
        message?: string;
    }) {
        // Rate limit check
        const limitKey = `volunteer_${application.email || 'anonymous'}`;
        const rateCheck = rateLimiter.check(limitKey, 5, 10 * 60 * 1000);
        if (!rateCheck.success) {
            throw new RateLimitError("Too many volunteer submissions. Please wait before submitting another.");
        }

        // Sanitize applicant text inputs to prevent XSS
        const sanitized = {
            name: sanitizeInput(application.name || ""),
            email: sanitizeInput(application.email || ""),
            phone: sanitizeInput(application.phone || ""),
            interest: sanitizeInput(application.interest || ""),
            message: application.message ? sanitizeInput(application.message) : "",
            status: "Pending" as const,
            created_at: new Date().toISOString(),
        };

        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), sanitized);
            return { id: docRef.id, ...sanitized };
        } catch (error) {
            console.error("Error submitting volunteer application:", error);
            throw new Error(handleServiceError(error));
        }
    },

    async getAll() {
        try {
            const q = query(collection(db, COLLECTION_NAME), orderBy("created_at", "desc"));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VolunteerApplication));
        } catch (error) {
            console.error("Error fetching volunteer applications:", error);
            return [];
        }
    }
};

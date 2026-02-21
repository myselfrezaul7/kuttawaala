import { db } from "@/utils/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { MOCK_VET_CLINICS } from "@/data/vets";

export type VetClinic = {
    id: string; // Firestore ID
    legacy_id?: number; // From mock data
    name: string;
    address: string;
    phone: string;
    website?: string;
    mapUrl: string;
    hours: string;
    district: string;
    rating: number;
    reviewCount: number;
    services: string[];
};

const COLLECTION_NAME = "vets";

export const VetService = {
    async getAll() {
        try {
            const snapshot = await getDocs(collection(db, COLLECTION_NAME));
            if (!snapshot.empty) {
                return snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as VetClinic[];
            }
        } catch (error) {
            console.error("Firebase fetch failed, using fallback mock vets.", error);
        }

        // Fallback to mock data if Firestore is empty or fails
        return MOCK_VET_CLINICS.map(vet => ({
            ...vet,
            id: vet.id.toString(),
            legacy_id: vet.id
        })) as VetClinic[];
    },

    async getByDistrict(district: string) {
        try {
            const q = query(collection(db, COLLECTION_NAME), where("district", "==", district));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                return snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as VetClinic[];
            }
        } catch (error) {
            console.error("Firebase fetch failed, using fallback mock vets.", error);
        }

        return MOCK_VET_CLINICS
            .filter(vet => vet.district === district)
            .map(vet => ({
                ...vet,
                id: vet.id.toString(),
                legacy_id: vet.id
            })) as VetClinic[];
    }
};


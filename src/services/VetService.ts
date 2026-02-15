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
        // Return mock data directly for now to ensure the page is populated
        // In the future, we can merge this with Firestore data if needed
        return MOCK_VET_CLINICS.map(vet => ({
            ...vet,
            id: vet.id.toString(),
            legacy_id: vet.id
        })) as VetClinic[];
    },

    async getByDistrict(district: string) {
        return MOCK_VET_CLINICS
            .filter(vet => vet.district === district)
            .map(vet => ({
                ...vet,
                id: vet.id.toString(),
                legacy_id: vet.id
            })) as VetClinic[];
    }
};


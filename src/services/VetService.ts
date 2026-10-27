import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
    MOCK_VET_CLINICS,
    BangladeshDivision,
    VetClinicType,
    getClinicDivision,
    getClinicType,
    isClinicEmergency24h,
    normalizeDistrictName,
} from "@/data/vets";

export type VetClinic = {
    id: string; // Firestore ID or stringified legacy ID
    legacy_id?: number; // From mock data
    name: string;
    address: string;
    phone: string;
    altPhone?: string;
    website?: string;
    mapUrl: string;
    hours: string;
    district: string;
    division?: BangladeshDivision;
    rating?: number;
    reviewCount?: number;
    services: string[];
    type?: VetClinicType;
    emergency24h?: boolean;
    usesHelpline?: boolean;
};

const COLLECTION_NAME = "vets";

const FAKE_LEGACY_PHONES = new Set([
    "01855-123456",
    "01733-445566",
    "01711-122334",
    "01712-111345",
    "01777-889900",
    "01744-556677",
    "01766-778899",
    "+880 1711-000000",
    "01711-000000",
    "available upon booking",
]);

function normalizeClinic(raw: Partial<VetClinic> & { id: string }): VetClinic {
    const district = normalizeDistrictName(raw.district);
    const division = getClinicDivision(district, raw.division);
    const type = getClinicType(raw);
    const emergency24h = isClinicEmergency24h(raw);
    const phone = (raw.phone || "16358").trim();
    const usesHelpline = raw.usesHelpline ?? phone === "16358";

    return {
        id: raw.id,
        legacy_id: raw.legacy_id,
        name: (raw.name || "Veterinary Clinic").trim(),
        address: (raw.address || `${district} Sadar, ${district}`).trim(),
        phone,
        altPhone: raw.altPhone,
        website: raw.website,
        mapUrl:
            raw.mapUrl ||
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${raw.name || "Veterinary"} ${district}`
            )}`,
        hours: raw.hours || "9 AM - 5 PM",
        district,
        division,
        rating: typeof raw.rating === "number" && raw.rating > 0 ? raw.rating : undefined,
        reviewCount: typeof raw.reviewCount === "number" ? raw.reviewCount : undefined,
        services: Array.isArray(raw.services) ? raw.services : ["General Checkup"],
        type,
        emergency24h,
        usesHelpline,
    };
}

function getNormalizedLocalVets(): VetClinic[] {
    return MOCK_VET_CLINICS.map(vet =>
        normalizeClinic({
            ...vet,
            id: vet.id.toString(),
            legacy_id: vet.id,
        })
    );
}

function mergeFirestoreWithLocal(remoteVets: VetClinic[], localVets: VetClinic[]): VetClinic[] {
    const mergedMap = new Map<string, VetClinic>();

    // Seed with our verified local nationwide directory first
    for (const local of localVets) {
        const key = `${local.name.toLowerCase().replace(/[^a-z0-9]/g, "")}_${local.district.toLowerCase()}`;
        mergedMap.set(key, local);
    }

    // Merge custom or updated clinics from Firestore, ignoring unverified legacy placeholder records
    for (const remoteRaw of remoteVets) {
        const remote = normalizeClinic(remoteRaw);
        const phoneKey = remote.phone.toLowerCase();
        if (FAKE_LEGACY_PHONES.has(phoneKey)) {
            continue;
        }

        const key = `${remote.name.toLowerCase().replace(/[^a-z0-9]/g, "")}_${remote.district.toLowerCase()}`;
        const existing = mergedMap.get(key);

        if (existing) {
            // Keep verified local metadata (altPhone, usesHelpline, corrected address) while preserving Firestore doc ID
            mergedMap.set(key, {
                ...existing,
                id: remote.id || existing.id,
            });
        } else {
            mergedMap.set(key, remote);
        }
    }

    return Array.from(mergedMap.values());
}

export const VetService = {
    async getAll(): Promise<VetClinic[]> {
        const localVets = getNormalizedLocalVets();

        try {
            const snapshot = await getDocs(collection(db, COLLECTION_NAME));
            if (!snapshot.empty) {
                const rawVets = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as VetClinic[];

                return mergeFirestoreWithLocal(rawVets, localVets);
            }
        } catch (error) {
            console.error("Firebase fetch failed, using verified local directory.", error);
        }

        return localVets;
    },

    async getByDistrict(district: string): Promise<VetClinic[]> {
        const normalizedTarget = normalizeDistrictName(district);
        const all = await this.getAll();
        return all.filter(vet => vet.district.toLowerCase() === normalizedTarget.toLowerCase());
    },
};

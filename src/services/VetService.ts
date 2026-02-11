import { db } from "@/utils/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { MOCK_VET_CLINICS, VetClinic } from "@/data/vets";

const COLLECTION_NAME = "vets";

export const VetService = {
    async getAllVets() {
        try {
            const q = query(collection(db, COLLECTION_NAME));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return MOCK_VET_CLINICS;
            }
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as VetClinic));
        } catch (error) {
            console.error("Error fetching vets:", error);
            return MOCK_VET_CLINICS;
        }
    }
};

import { db } from "@/utils/firebase";
import { collection, addDoc, getDocs, query, limit } from "firebase/firestore";
import { dogs } from "@/data/dogs";
import { MOCK_VET_CLINICS } from "@/data/vets";

export const seedData = async () => {
    try {
        // Seed Dogs
        const catsQ = query(collection(db, "dogs"), limit(1));
        const catsSnapshot = await getDocs(catsQ);
        if (catsSnapshot.empty) {
            console.log("Seeding Dogs...");
            for (const dog of dogs) {
                // Ensure ID is handled if needed, or let Firestore generate ID and store original ID as field
                await addDoc(collection(db, "dogs"), { ...dog, original_id: dog.id });
            }
            console.log("Dogs seeded successfully!");
        }

        // Seed Vets
        const vetsQ = query(collection(db, "vets"), limit(1));
        const vetsSnapshot = await getDocs(vetsQ);
        if (vetsSnapshot.empty) {
            console.log("Seeding Vets...");
            for (const vet of MOCK_VET_CLINICS) {
                await addDoc(collection(db, "vets"), vet);
            }
            console.log("Vets seeded successfully!");
        }
    } catch (error) {
        console.error("Error seeding data:", error);
    }
};

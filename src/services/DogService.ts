import { db } from "@/utils/firebase";
import { collection, getDocs, doc, getDoc, query, where, orderBy } from "firebase/firestore";
import { dogs, Dog } from "@/data/dogs";

const COLLECTION_NAME = "dogs";

export const DogService = {
    async getAllDogs() {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                orderBy("id", "asc") // Assuming numeric ID or stable sort
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return dogs; // Fallback to mock if empty
            }
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Dog));
        } catch (error) {
            console.error("Error fetching dogs:", error);
            return dogs; // Fallback
        }
    },

    async getDogById(id: string) {
        try {
            // Try fetching from Firestore
            // If ID is numeric (from mock), it might be stored as string or we need to query field
            // Assuming we store with auto-ID or same ID.
            // Let's try doc ref first if ID is standard string, else query
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as Dog;
            } else {
                // Try querying by 'id' field if it's a custom field (like integer id)
                const q = query(collection(db, COLLECTION_NAME), where("id", "==", parseInt(id)));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as Dog;
                }
            }
            return dogs.find(d => d.id.toString() === id);
        } catch (error) {
            console.error("Error fetching dog:", error);
            return dogs.find(d => d.id.toString() === id);
        }
    }
};

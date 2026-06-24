import { db } from "@/utils/firebase";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { Dog } from "./server-data";
import { dogs } from "@/data/dogs";

const COLLECTION_NAME = "dogs";

export const DogService = {
    async getAll() {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("status", "==", "Available")
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return [...dogs];
            }
            const mappedDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Dog));
            return mappedDocs.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        } catch (error) {
            console.error("Error fetching dogs:", error);
            return [];
        }
    },

    async getById(id: string) {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as Dog;
            } else {
                return dogs.find(d => d.id === id) || null;
            }
        } catch (error) {
            console.error("Error fetching dog by id:", error);
            return dogs.find(d => d.id === id) || null;
        }
    },

    async getByIds(ids: string[]) {
        if (ids.length === 0) return [];
        try {
            const stats = await Promise.all(ids.map(id => this.getById(id)));
            return stats.filter(Boolean) as Dog[];
        } catch (error) {
            console.error("Error fetching dogs by ids:", error);
            return [];
        }
    }
};

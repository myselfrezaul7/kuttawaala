import { db, storage } from "@/utils/firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Memorial } from "./server-data";

const COLLECTION_NAME = "memorials";

export const MemorialService = {
    async getAll() {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("status", "==", "Approved")
            );
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return { id: doc.id, ...data } as Memorial;
            });
            return docs.sort((a, b) => {
                const aTime = a.created_at as any;
                const bTime = b.created_at as any;
                const tA = aTime?.toMillis ? aTime.toMillis() : new Date(aTime || 0).getTime();
                const tB = bTime?.toMillis ? bTime.toMillis() : new Date(bTime || 0).getTime();
                return (isNaN(tB) ? 0 : tB) - (isNaN(tA) ? 0 : tA);
            });
        } catch (error) {
            console.error("Error fetching memorials:", error);
            return [];
        }
    },

    async getByUserId(userId: string) {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("user_id", "==", userId)
            );
            const querySnapshot = await getDocs(q);
            const docs = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return { id: doc.id, ...data } as Memorial;
            });
            return docs.sort((a, b) => {
                const aTime = a.created_at as any;
                const bTime = b.created_at as any;
                const tA = aTime?.toMillis ? aTime.toMillis() : new Date(aTime || 0).getTime();
                const tB = bTime?.toMillis ? bTime.toMillis() : new Date(bTime || 0).getTime();
                return (isNaN(tB) ? 0 : tB) - (isNaN(tA) ? 0 : tA);
            });
        } catch (error) {
            console.error("Error fetching user memorials:", error);
            return [];
        }
    },

    async create(memorial: Omit<Memorial, 'id' | 'created_at' | 'status'>) {
        try {
            const created_at = new Date().toISOString();
            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                ...memorial,
                created_at,
                status: 'Pending'
            });
            return { id: docRef.id, ...memorial, created_at, status: 'Pending' } as Memorial;
        } catch (error) {
            console.error("Error creating memorial:", error);
            throw error;
        }
    },

    async uploadImage(file: File) {
        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const storageRef = ref(storage, `memorial-images/${fileName}`);

            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Memorial image upload failed:", error);
            throw error;
        }
    }
};

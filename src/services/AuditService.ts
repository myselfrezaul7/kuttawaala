import { db } from "@/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface AuditLogPayload {
    adminUid: string;
    adminEmail?: string;
    action: string;
    targetId?: string;
    collectionName?: string;
    details?: Record<string, unknown>;
}

export class AuditService {
    /**
     * Records an administrative action to the audit logs collection.
     */
    static async logAdminAction(payload: AuditLogPayload): Promise<void> {
        try {
            await addDoc(collection(db, "admin_audit_logs"), {
                admin_uid: payload.adminUid,
                admin_email: payload.adminEmail || null,
                action: payload.action,
                target_id: payload.targetId || null,
                collection_name: payload.collectionName || null,
                details: payload.details || {},
                created_at: serverTimestamp(),
            });
        } catch (error) {
            // Fail safe logging - do not crash main user workflow if audit log write fails
            console.error("Failed to record admin audit log:", error);
        }
    }
}

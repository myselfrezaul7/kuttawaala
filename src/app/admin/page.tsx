import { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { dogs } from "@/data/dogs";
import { MOCK_VET_CLINICS } from "@/data/vets";

export const metadata: Metadata = {
    title: "Admin Dashboard | Kuttawaala",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminPage() {
    return <AdminDashboard initialCats={dogs} initialVets={MOCK_VET_CLINICS} />;
}

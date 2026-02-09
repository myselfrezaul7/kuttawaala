import { Metadata } from "next";
import { VolunteerForm } from "@/components/volunteer/VolunteerForm";

export const metadata: Metadata = {
    title: "Volunteer for Dog Rescue",
    description: "Join the Kuttawaala volunteer team. Help with rescues, fostering, or transport to make a difference for street dogs.",
};

export default function VolunteerPage() {
    return <VolunteerForm />;
}

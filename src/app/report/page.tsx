import { Metadata } from "next";
import { ReportForm } from "@/components/report/ReportForm";

export const metadata: Metadata = {
    title: "Report a Rescue - Help a Dog in Need",
    description: "Found a dog in distress or need of rescue? Report the location and details to notify the Kuttawaala volunteer network immediately.",
};

export default function ReportPage() {
    return <ReportForm />;
}

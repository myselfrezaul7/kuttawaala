import { Metadata } from "next";
import { ReportForm } from "@/components/report/ReportForm";

export const metadata: Metadata = {
    title: "Report a Stray or Injured Dog",
    description: "Found a dog in distress? Report location and details to notify the Kuttawaala volunteer network immediately.",
};

export default function ReportPage() {
    return <ReportForm />;
}

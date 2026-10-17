import { resources } from "@/data/resources";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { ResourceDetailClient } from "./ResourceDetailClient";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const resource = resources.find((r) => r.slug === slug);
    if (!resource) return { title: "Article Not Found" };
    return {
        title: resource.title,
        description: resource.description,
        openGraph: {
            title: `${resource.title} | Kuttawaala`,
            description: resource.description,
            type: "article",
            images: [{ url: resource.coverImage, alt: resource.title }],
        },
    };
}

export function generateStaticParams() {
    return resources
        .filter((r) => r.slug !== "emergency-vet-list")
        .map((r) => ({ slug: r.slug }));
}

export default async function ResourcePage({ params }: PageProps) {
    const { slug } = await params;

    if (slug === "emergency-vet-list") {
        redirect("/find-vet");
    }

    const resource = resources.find((r) => r.slug === slug);

    if (!resource) {
        notFound();
    }

    const otherResources = resources.filter(r => r.slug !== slug && r.slug !== "emergency-vet-list").slice(0, 2);

    return <ResourceDetailClient resource={resource} otherResources={otherResources} />;
}

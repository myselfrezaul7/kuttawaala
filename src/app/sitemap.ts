import { MetadataRoute } from "next";
import { DogService } from "@/services/DogService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.kuttawaala.com"; // Replace with actual domain

    // Fetch all available dogs for dynamic routes
    const dogs = await DogService.getAllDogs();
    const dogUrls: MetadataRoute.Sitemap = dogs.map((dog: any) => ({
        url: `${baseUrl}/adopt/${dog.id}`,
        lastModified: new Date(dog.created_at || new Date()),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/adopt`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/report`,
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/volunteer`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/find-vet`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/memorial`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        ...dogUrls,
    ];
}

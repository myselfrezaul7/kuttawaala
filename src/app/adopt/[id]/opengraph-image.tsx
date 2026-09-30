import { ImageResponse } from "next/og";
import { DogService } from "@/services/DogService";
import { dogs } from "@/data/dogs";

export const runtime = "nodejs";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function Image({ params }: Props) {
    const { id } = await params;
    const dog = (await DogService.getById(id)) || dogs.find((d) => d.id === id);

    const name = dog ? dog.name : "Desi Pup";
    const breed = dog?.breed || "Local Rescue";
    const age = dog?.age || "Young";
    const location = dog?.location || "Dhaka, Bangladesh";
    const tag = dog?.tag || "Available for Adoption";

    const baseUrl = "https://www.kuttawaala.com";
    const rawImage = dog?.imageUrl || "/assets/hero-dog.jpg";
    const imageUrl = rawImage.startsWith("http")
        ? rawImage
        : `${baseUrl}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#09090b",
                    backgroundImage:
                        "radial-gradient(circle at 10% 20%, rgba(249, 115, 22, 0.15), transparent 40%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.12), transparent 45%)",
                    padding: "60px 70px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    color: "white",
                }}
            >
                {/* Left Content Column */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        width: "58%",
                    }}
                >
                    {/* Header with Brand & Badge */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 44,
                                    height: 44,
                                    borderRadius: "14px",
                                    backgroundColor: "#f97316",
                                    color: "white",
                                    fontSize: 24,
                                }}
                            >
                                🐾
                            </div>
                            <span
                                style={{
                                    fontSize: 24,
                                    fontWeight: 800,
                                    letterSpacing: "-0.5px",
                                    color: "#f97316",
                                }}
                            >
                                Kuttawaala
                            </span>
                            <span
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "#a1a1aa",
                                    paddingLeft: 8,
                                    borderLeft: "2px solid #27272a",
                                }}
                            >
                                Bangladesh Pet Rescue
                            </span>
                        </div>

                        {/* Rescue Dog Badge */}
                        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "rgba(249, 115, 22, 0.2)",
                                    border: "1px solid rgba(249, 115, 22, 0.4)",
                                    color: "#fb923c",
                                    padding: "6px 16px",
                                    borderRadius: "999px",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                }}
                            >
                                🐕 Rescue Dog
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "rgba(34, 197, 94, 0.2)",
                                    border: "1px solid rgba(34, 197, 94, 0.4)",
                                    color: "#4ade80",
                                    padding: "6px 16px",
                                    borderRadius: "999px",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    letterSpacing: "0.5px",
                                }}
                            >
                                {tag}
                            </div>
                        </div>
                    </div>

                    {/* Dog Name & Breed */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div
                            style={{
                                fontSize: 68,
                                fontWeight: 900,
                                lineHeight: 1.1,
                                letterSpacing: "-1.5px",
                                color: "#ffffff",
                            }}
                        >
                            {name}
                        </div>
                        <div
                            style={{
                                fontSize: 24,
                                fontWeight: 500,
                                color: "#d4d4d8",
                            }}
                        >
                            {breed} • {age}
                        </div>
                    </div>

                    {/* Footer / Location */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            paddingTop: 20,
                            borderTop: "1px solid #27272a",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 18,
                                color: "#a1a1aa",
                            }}
                        >
                            📍 {location}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                marginLeft: "auto",
                                fontSize: 16,
                                fontWeight: 700,
                                color: "#f97316",
                            }}
                        >
                            Adopt don't shop →
                        </div>
                    </div>
                </div>

                {/* Right Photo Column */}
                <div
                    style={{
                        display: "flex",
                        width: "38%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            position: "relative",
                            width: 380,
                            height: 480,
                            borderRadius: 36,
                            overflow: "hidden",
                            border: "4px solid rgba(255, 255, 255, 0.15)",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
                            backgroundColor: "#27272a",
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imageUrl}
                            alt={name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}

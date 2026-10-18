export const DEFAULT_DOG_IMAGES = [
    "/assets/dog_success_1.png",
    "/assets/dog_success_2.png",
    "/assets/dog_success_3.png",
    "/assets/dog_success_4.png",
];

export const DEFAULT_MEMORIAL_IMAGES = [
    "/assets/dog_memorial_1.png",
    "/assets/dog_memorial_2.png",
    "/assets/dog_memorial_3.png",
];

export function resolveDogImage(url?: string | null, fallbackIndex: number = 0): string {
    if (!url || typeof url !== "string") {
        return DEFAULT_DOG_IMAGES[Math.abs(fallbackIndex) % DEFAULT_DOG_IMAGES.length];
    }
    const trimmed = url.trim();
    if (!trimmed) {
        return DEFAULT_DOG_IMAGES[Math.abs(fallbackIndex) % DEFAULT_DOG_IMAGES.length];
    }
    // Check for broken / legacy cat or missing paths
    if (
        trimmed.startsWith("/assets/cat") ||
        trimmed.startsWith("/assets/kitten") ||
        trimmed.startsWith("/assets/dog1") ||
        trimmed.startsWith("/assets/dog2") ||
        trimmed.startsWith("/assets/dog3") ||
        trimmed.startsWith("/assets/dog4") ||
        trimmed.includes("placeholder-dog") ||
        trimmed === "/assets/dog.jpg" ||
        trimmed === "/dog.jpg"
    ) {
        return DEFAULT_DOG_IMAGES[Math.abs(fallbackIndex) % DEFAULT_DOG_IMAGES.length];
    }
    // Valid relative or http(s) URL
    if (trimmed.startsWith("/") || trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
        return trimmed;
    }
    return DEFAULT_DOG_IMAGES[Math.abs(fallbackIndex) % DEFAULT_DOG_IMAGES.length];
}

export function resolveMemorialImage(url?: string | null, fallbackIndex: number = 0): string {
    if (!url || typeof url !== "string") {
        return DEFAULT_MEMORIAL_IMAGES[Math.abs(fallbackIndex) % DEFAULT_MEMORIAL_IMAGES.length];
    }
    const trimmed = url.trim();
    if (!trimmed) {
        return DEFAULT_MEMORIAL_IMAGES[Math.abs(fallbackIndex) % DEFAULT_MEMORIAL_IMAGES.length];
    }
    if (
        trimmed.startsWith("/assets/cat") ||
        trimmed.startsWith("/assets/kitten") ||
        trimmed.startsWith("/assets/dog1") ||
        trimmed.startsWith("/assets/dog2") ||
        trimmed.startsWith("/assets/dog3")
    ) {
        return DEFAULT_MEMORIAL_IMAGES[Math.abs(fallbackIndex) % DEFAULT_MEMORIAL_IMAGES.length];
    }
    if (trimmed.startsWith("/") || trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
        return trimmed;
    }
    return DEFAULT_MEMORIAL_IMAGES[Math.abs(fallbackIndex) % DEFAULT_MEMORIAL_IMAGES.length];
}

import { z } from "zod";

/**
 * Sanitizes raw string input by escaping HTML special characters
 * to prevent XSS attacks.
 */
export function sanitizeInput(str: string): string {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================
// ZOD SCHEMAS
// ==========================================

export const ReportSchema = z.object({
    type: z.enum(["Lost", "Found", "Injured"]),
    description: z.string().max(2000, "Description must be 2000 characters or less").optional().default(""),
    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),
    location_text: z.string().max(200, "Location text must be 200 characters or less").optional().default(""),
    contact_info: z.string().max(200, "Contact info must be 200 characters or less").optional().default(""),
    image_url: z.string().url("Invalid image URL").max(500).optional().nullable(),
});

export const MemorialSchema = z.object({
    pet_name: z.string().min(1, "Pet name is required").max(100, "Pet name must be 100 characters or less"),
    owner_name: z.string().min(1, "Owner name is required").max(100, "Owner name must be 100 characters or less"),
    tribute: z.string().min(1, "Tribute is required").max(2000, "Tribute must be 2000 characters or less"),
    image_url: z.string().url("Invalid image URL").max(500).optional().nullable(),
});

export const ProfileUpdateSchema = z.object({
    full_name: z.string().max(100, "Full name must be 100 characters or less").optional(),
    avatar_url: z.string().url("Invalid avatar URL").max(500).optional().nullable(),
    phone: z.string().max(20, "Phone number must be 20 characters or less").nullable().optional(),
    favorites: z.array(z.string()).optional(),
});

export const AdoptionApplicationSchema = z.object({
    pet_id: z.string().min(1, "Pet ID is required"),
    applicant_name: z.string().min(1, "Applicant name is required").max(100),
    applicant_email: z.string().email("Invalid email address"),
    applicant_phone: z.string().min(5, "Valid phone number required").max(20),
    reason: z.string().min(10, "Please provide a reason of at least 10 characters").max(1000),
    experience: z.string().max(1000).optional(),
});

export const VolunteerApplicationSchema = z.object({
    full_name: z.string().min(1, "Full name is required").max(100),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Valid phone number required").max(20),
    skills: z.string().max(500).optional(),
    availability: z.string().max(200).optional(),
});

import { z } from "zod";

/**
 * Validates if a string is a safe HTTP or HTTPS URL, strictly blocking
 * dangerous protocols such as javascript:, data:, and vbscript:.
 */
export function isSafeUrl(url: string): boolean {
    if (!url || typeof url !== "string") return false;
    const trimmed = url.trim();

    // Strip whitespace, control characters and null bytes to prevent protocol obfuscation
    const cleanProto = trimmed.replace(/[\u0000-\u001F\u007F-\u009F\s]/g, "").toLowerCase();
    if (
        cleanProto.startsWith("javascript:") ||
        cleanProto.startsWith("data:") ||
        cleanProto.startsWith("vbscript:")
    ) {
        return false;
    }

    try {
        const parsed = new URL(trimmed);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

/**
 * Zod schema validator for safe URLs. Strictly permits only http:// and https:// URLs.
 */
export const SafeUrlSchema = z.string()
    .max(500, "URL must be 500 characters or less")
    .refine((url) => isSafeUrl(url), {
        message: "Invalid URL. Only HTTP and HTTPS URLs are allowed.",
    });

export const safeUrlSchema = SafeUrlSchema;

export const SafeOptionalUrlSchema = z.string()
    .max(500, "URL must be 500 characters or less")
    .refine((url) => !url || isSafeUrl(url), {
        message: "Invalid URL. Only HTTP and HTTPS URLs are allowed.",
    })
    .optional()
    .nullable();

/**
 * Sanitizes raw string input by safely escaping dangerous characters (&, <, >, ", ', /)
 * and stripping dangerous patterns (e.g. javascript/vbscript/data protocols, script/iframe tags, event handlers)
 * while preserving normal text for descriptions and notes.
 */
export function sanitizeInput(str: string): string {
    if (!str || typeof str !== "string") return "";

    // 1. Strip null bytes and non-printable control characters (preserving tab \t, newline \n, carriage return \r)
    let sanitized = str.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");

    // 2. Strip dangerous script and iframe tags and their contents
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");

    // 3. Strip dangerous protocol schemes
    sanitized = sanitized.replace(/(javascript|vbscript|data):/gi, "");

    // 4. Strip inline event handlers (e.g., onload=, onerror=, onclick=)
    sanitized = sanitized.replace(/\bon\w+\s*=/gi, "");

    // 5. Safely escape dangerous characters (&, <, >, ", ', /)
    // Note: & must be escaped first to prevent double-escaping
    return sanitized
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\//g, "&#x2F;");
}

// ==========================================
// ZOD SCHEMAS
// ==========================================

export const ReportSchema = z.object({
    type: z.enum(["Lost", "Found", "Injured"]),
    description: z.string().max(3000, "Description must be 2000 characters or less").optional().default(""),
    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),
    location_text: z.string().max(500, "Location text must be 200 characters or less").optional().default(""),
    contact_info: z.string().max(500, "Contact info must be 200 characters or less").optional().default(""),
    image_url: SafeOptionalUrlSchema,
});

export const MemorialSchema = z.object({
    pet_name: z.string().min(1, "Pet name is required").max(300, "Pet name must be 100 characters or less"),
    owner_name: z.string().min(1, "Owner name is required").max(300, "Owner name must be 100 characters or less"),
    tribute: z.string().min(1, "Tribute is required").max(3000, "Tribute must be 2000 characters or less"),
    image_url: SafeOptionalUrlSchema,
});

export const ProfileUpdateSchema = z.object({
    full_name: z.string().max(300, "Full name must be 100 characters or less").optional(),
    avatar_url: SafeOptionalUrlSchema,
    phone: z.string().max(50, "Phone number must be 20 characters or less").nullable().optional(),
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

import { z } from "zod";

export const adoptionSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    phone: z.string().min(11, { message: "Phone number must be valid (min 11 digits)." }),
    email: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal("")),
    message: z.string().min(10, { message: "Please tell us a bit more (min 10 characters)." }),
    botcheck: z.boolean().optional(),
});

export type AdoptionSchema = z.infer<typeof adoptionSchema>;

export const volunteerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    phone: z.string().optional(),
    interest: z.string(),
    message: z.string().optional(),
    botcheck: z.boolean().optional(),
});

export type VolunteerSchema = z.infer<typeof volunteerSchema>;

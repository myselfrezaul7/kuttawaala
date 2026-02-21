export type Resource = {
    slug: string;
    title: string;
    description: string;
    iconName: "FileText" | "MapPin" | "BriefcaseMedical";
    content: string; // Markdown content
    coverImage: string;
    date: string;
    author: string;
};

export const resources: Resource[] = [
    {
        slug: "new-dog-checklist",
        title: "New Dog Checklist",
        description: "Essentials for your new best friend.",
        iconName: "FileText",
        date: "Feb 15, 2026",
        author: "Kuttawaala Team",
        coverImage: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=2000",
        content: `
# Welcome to the Pack!

Bringing a new dog home is a life-changing experience! Here is everything you need to get your home ready for your new best friend.

## Essentials
1.  **High-Quality Dog Food**: Choose wet or dry food tailored to their age, size, and breed (or mix!).
2.  **Water & Food Bowls**: Weighted stainless steel bowls are best because they are durable and easy to clean.
3.  **Collar, Leash, and ID Tag**: Crucial for their safety when exploring the outside world.
4.  **Bedding**: A cozy and supportive bed where they can retreat and rest.
5.  **Poop Bags & Dispensers**: For responsible walks around the neighborhood!

## Grooming & Health
-   **Brush/Comb**: Depending on their coat type, daily or weekly brushing is needed.
-   **Dog-safe Shampoo**: Don't use human shampoo!
-   **Chew Toys**: Perfect for teething puppies or dogs that just love a good chew.
-   **Flea & Tick Prevention**: Especially important in tropical climates.

## Safety First
-   **Puppy-proof your home**: Hide toxic plants, secure trash cans, and cover loose electrical cords.
-   **Vet Visit**: Schedule a check-up within the first week of adoption to establish a health baseline.

Enjoy every moment with your new furry companion!
        `
    },
    {
        slug: "emergency-vet-list",
        title: "Emergency Vet List",
        description: "24/7 clinics across Dhaka.",
        iconName: "MapPin",
        date: "Jan 10, 2026",
        author: "Community",
        coverImage: "https://images.unsplash.com/photo-1517423738875-5ce310aca30b?auto=format&fit=crop&q=80&w=2000",
        content: `
# Trusted Veterinarians & Clinics in Dhaka

When an emergency strikes, every second counts. Finding a good vet is crucial for your dog's long-term health. Keep these verified spots handy!

## Gulshan & Banani
*   **Pet Care Hospital**: Road 11, Banani. Known for 24/7 service and emergency surgery capabilities.
*   **Gulshan Pet Clinic**: Road 34, Gulshan 1. Excellent diagnostic tools and general check-up.

## Dhanmondi & Lalmatia
*   **Paws & Claws**: Satmasjid Road. Great for general checkups, vaccinations, and grooming.
*   **Lalmatia Vet Care**: Block D. Highly experienced surgeons on standby.

## Uttara
*   **Uttara Animal Hospital**: Sector 7. Affordable, reliable, and equipped with a full pharmacy.
*   **Care for Paws**: Sector 13. Excellent post-op care facilities.

> **Note**: Always call ahead for emergencies. Keep your vet's number saved on your fridge and in your phone contacts!
        `
    },
    {
        slug: "desi-dog-diet-guide",
        title: "Desi Dog Diet Guide",
        description: "Healthy food for local breeds.",
        iconName: "BriefcaseMedical",
        date: "Dec 05, 2025",
        author: "Dr. Bark",
        coverImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2000",
        content: `
# Feeding Your Desi Dog Right

Local breeds (Desi dogs) are incredibly resilient, but they still thrive when fed a balanced, nutritious diet! Let's talk about what keeps them running strong.

## The Good Stuff
-   **Proteins**: Boiled chicken, lean beef, and occasionally fish (de-boned).
-   **Fiber & Carbs**: Brown rice, sweet potatoes, and pumpkin are excellent for their digestion.
-   **Hydration**: Always ensure they have access to fresh, clean drinking water. Avoid giving them tap water if you wouldn't drink it yourself.

## Foods to Avoid (Highly Toxic!)
-   🚫 **Onions & Garlic**: Can cause severe anemia.
-   🚫 **Chocolate**: Contains theobromine, which is poisonous.
-   🚫 **Grapes & Raisins**: Can cause sudden kidney failure.
-   🚫 **Cooked Bones**: Bones can splinter and puncture their digestive tract. Only offer safe raw bones or chew toys.
-   🚫 **Spicy Food**: A lot of leftover human food is too spicy/oily and can cause severe pancreatitis.

## Homemade vs. Commercial
If you are cooking at home, a general rule of thumb is 50% meat, 25% vegetables (like carrots and beans), and 25% grains (like rice). Commercial dog foods (like Pedigree or Royal Canin) are fine, but many Desis do beautifully on fresh, dog-safe home-cooked meals if properly balanced.
        `
    }
];

export type Resource = {
    slug: string;
    title: string;
    description: string;
    iconName: "FileText" | "MapPin" | "BriefcaseMedical";
    content: string; // Markdown content
    coverImage: string;
    date: string;
    author: string;
    badge: string;
    readTime: string;
    color: "blue" | "amber" | "teal";
};

export const resources: Resource[] = [
    {
        slug: "new-dog-checklist",
        title: "New Dog Checklist",
        description: "Essentials for your new best friend.",
        iconName: "FileText",
        date: "Feb 15, 2026",
        author: "Kuttawaala Team",
        badge: "Guide",
        readTime: "6 min",
        color: "blue",
        coverImage: "/assets/puppy-guide.png",
        content: `
# Welcome to the Pack!

Bringing a new dog home in Bangladesh is a life-changing experience! Here is everything you need to get your home ready for your new best friend.

## Essentials
1.  **High-Quality Dog Food**: Choose wet or dry food tailored to their age. *Pedigree* and *SmartHeart* are widely available on Chaldal/Daraz.
2.  **Water & Food Bowls**: Weighted stainless steel bowls are best because they are durable and easy to clean in humid weather.
3.  **Collar, Leash, and ID Tag**: Crucial for their safety in Dhaka traffic. A sturdy harness is recommended for walks.
4.  **Bedding**: A cozy and supportive bed, or a clean, cooling mat for summer months.
5.  **Poop Bags & Dispensers**: For responsible walks around your neighborhood or society!

## Grooming & Health
-   **Brush/Comb**: Depending on their coat type, daily or weekly brushing is needed.
-   **Flea & Tick Prevention**: Essential in our tropical climate. Tick fever is very common in Bangladesh.
-   **Heatstroke Prevention**: During the 40°C Dhaka summers, walk your dogs only early morning or late evening. Ensure constant access to cool water.

## Safety First (BD Context)
-   **Rooftop Safety**: If you allow your dog on the roof (common in Dhaka), ensure the boundary walls are sufficiently high and secure to prevent jumping or falling.
-   **Rabies Vaccination**: This is legally and medically crucial in Bangladesh. You can get cheap, verified vaccines from Govt. Livestock offices or local vet clinics (usually ৳200-৳500).
-   **Street Dog Etiquette**: When walking your pet, avoid aggressive street packs. Carry umberllas or sticks purely as a deterrent barrier if approached by territorial street dogs.

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
        badge: "Directory",
        readTime: "Always updated",
        color: "teal",
        coverImage: "/assets/dog_success_2.png",
        content: `Redirecting to the verified directory...`
    },
    {
        slug: "desi-dog-diet-guide",
        title: "Desi Dog Diet Guide",
        description: "Healthy food for local breeds.",
        iconName: "BriefcaseMedical",
        date: "Dec 05, 2025",
        author: "Dr. Bark",
        badge: "Article",
        readTime: "7 min",
        color: "amber",
        coverImage: "/assets/dog_success_4.png",
        content: `
# Feeding Your Desi Dog Right

Local breeds (Desi dogs) are incredibly resilient, but they still thrive when fed a balanced, nutritious diet! Let's talk about what keeps them running strong in Bangladesh.

## Local & Budget-Friendly Proteins
-   **Chicken Bones/Carcass (*Murgi-r har*)**: A massive staple for desi dogs. You can buy chicken frames/necks from local butchers for very cheap (৳60-90/kg). *Warning:* Only feed raw or properly pressure-cooked so they crumble. Never feed boiled bones as they splinter!
-   **Egg & Rice Combos**: Combining boiled rice, a bit of dal, and boiled eggs makes a highly nutritious, budget-friendly meal (≈৳30/meal).
-   **Pumpkin & Sweet Potato**: Excellent, cheap fiber sources available at any local *kachabazar*.

## Commercial Food Availability
*Pedigree*, *Drools*, and *Meat Up* are the most commonly found mid-tier kibbles in supershops. Premium diets like *Royal Canin* or *Taste of the Wild* are restricted to specialized pet stores.

## Foods to Avoid (Highly Toxic!)
-   🚫 **Onions & Garlic**: Very common in local cooking, these cause severe anemia in dogs.
-   🚫 **Hilsha Fish Bones**: Desi dogs love fish, but sharp local fish bones (like Ilish or Rui) can puncture their intestines. 
-   🚫 **Spicy Leftovers (*Bhuna*)**: Do not feed dogs spicy, oily party leftovers. This triggers severe, sometimes fatal, pancreatitis.
-   🚫 **Chocolate & Grapes**: Extremely poisonous.

## Homemade Guidelines
A fast local recipe is boiling rice with chicken liver, a pinch of turmeric (good for joints), and local seasonal vegetables like carrots or papaya. 
        `
    }
];

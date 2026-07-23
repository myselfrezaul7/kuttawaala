export type Dog = {
    id: string;
    name: string;
    breed: string;
    age: string;
    gender: string;
    location: string;
    description: string;
    imageUrl: string;
    tag: string | null;
    temperamentTags: string[];
    vaccinated: boolean;
    neutered: boolean;
    goodWithKids: boolean;
};

export const dogs: Dog[] = [
    {
        id: "1",
        name: 'Mimi',
        breed: 'Desi Puppy (Bangladeshi Stray)',
        age: '3 weeks',
        gender: 'Female',
        location: "Dhanmondi, Dhaka",
        description: 'Mimi is a tiny newborn Desi pup found near a tea stall. She is just opening her big cute eyes, loves warm milk, and wiggles her tail whenever she hears a gentle voice.',
        imageUrl: '/assets/dog1.jpg',
        tag: 'Urgent',
        temperamentTags: ['Newborn', 'Cute', 'Cuddly', 'Needs Milk'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
    {
        id: "2",
        name: 'Billu',
        breed: 'Local Mixed Puppy',
        age: '4 weeks',
        gender: 'Male',
        location: "Uttara, Dhaka",
        description: 'Billu is a adorable 4-week-old baby pup. He loves sleeping in warm towels and taking tiny naps after bottle feeding. He is super gentle and quiet.',
        imageUrl: '/assets/dog2.jpg',
        tag: 'New',
        temperamentTags: ['Newborn', 'Gentle', 'Sleepyhead', 'Loving'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
    {
        id: "3",
        name: 'Motu',
        breed: 'Bangladeshi Desi Puppy',
        age: '2 weeks',
        gender: 'Male',
        location: "Gulshan 1, Dhaka",
        description: 'Motu is a chubby little newborn baby dog! He squeaks with joy when fed and loves snuggling up with his blanket. A bundle of pure joy.',
        imageUrl: '/assets/dog3.jpg',
        tag: null,
        temperamentTags: ['Newborn', 'Chubby', 'Curious', 'Tiny'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
    {
        id: "4",
        name: 'Mishti',
        breed: 'Desi Baby Puppy',
        age: '5 weeks',
        gender: 'Female',
        location: "Mirpur, Dhaka",
        description: 'Mishti is a sweet 5-week-old puppy learning to take her first wobbly steps! She loves soft belly rubs and purrs in her own little puppy way.',
        imageUrl: '/assets/dog1.jpg',
        tag: 'Adopted',
        temperamentTags: ['Puppy', 'Playful', 'Wobbly Steps', 'Apartment Friendly'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
    {
        id: "5",
        name: 'Bagha',
        breed: 'Desi Tiger Mix Puppy',
        age: '3 weeks',
        gender: 'Male',
        location: "Banani, Dhaka",
        description: 'Bagha is a tiny newborn pup with unique tiger-like coat patterns. He loves snuggling into laps and sleeping soundly after a bottle meal.',
        imageUrl: '/assets/dog2.jpg',
        tag: null,
        temperamentTags: ['Newborn', 'Unique Coat', 'Sweet', 'Cuddly'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
    {
        id: "6",
        name: 'Tuni',
        breed: 'Orphaned Newborn Puppy',
        age: '2 weeks',
        gender: 'Female',
        location: "Bashundhara R/A, Dhaka",
        description: 'Tuni is a tiny 2-week-old rescue puppy who was rescued from the rain. She needs extra warmth, milk formula, and a loving foster or permanent home.',
        imageUrl: '/assets/dog3.jpg',
        tag: 'Urgent',
        temperamentTags: ['Newborn', 'Orphan', 'Cuddly', 'Needs Warmth'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
] as const;

export type AgeCategory = 'Puppy' | 'Adult' | 'Senior';

export function getAgeCategory(age: string): AgeCategory {
    const lowerAge = age.toLowerCase();
    if (lowerAge.includes('week') || lowerAge.includes('month') || lowerAge.includes('day') || (lowerAge.includes('year') && parseInt(age) < 1)) {
        return 'Puppy';
    }
    const years = parseInt(age);
    if (!isNaN(years)) {
        if (years >= 7) return 'Senior';
        return 'Adult';
    }
    return 'Puppy'; // Default for newborn/baby pets
}

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
        breed: 'Desi Dog (Bangladeshi Stray)',
        age: '2 years',
        gender: 'Female',
        location: "Dhanmondi, Dhaka",
        description: 'Mimi is the queen of her neighborhood. She was found charming locals for biscuits at a tea stall. She has that classic Desi dog intelligence; she knows exactly how to look adorable when she wants treats.',
        imageUrl: '/assets/dog1.jpg', // Placeholder, in real app would use ported assets
        tag: 'Urgent',
        temperamentTags: ['Smart', 'Affectionate', 'Street-Smart', 'Good Guard'],
        vaccinated: true,
        neutered: true,
        goodWithKids: true,
    },
    {
        id: "2",
        name: 'Billu',
        breed: 'Local Mixed Breed',
        age: '4 years',
        gender: 'Male',
        location: "Uttara, Dhaka",
        description: 'Billu is an old soul in a young body. Life on the streets was tough, and now he just wants a soft rug and zero drama. He\'s the perfect companion: quiet, grateful, and an excellent listener.',
        imageUrl: '/assets/dog2.jpg',
        tag: 'New',
        temperamentTags: ['Calm', 'Gentle', 'Low Energy', 'Loving'],
        vaccinated: true,
        neutered: true,
        goodWithKids: true,
    },
    {
        id: "3",
        name: 'Motu',
        breed: 'Bangladeshi Desi Dog',
        age: '1 year',
        gender: 'Male',
        location: "Gulshan 1, Dhaka",
        description: 'Motu thinks he is a lion. He\'s got that signature Desi dog energy and loves to play and explore. If you want an adventure buddy who will keep you entertained, Motu is your guy.',
        imageUrl: '/assets/dog3.jpg',
        tag: null,
        temperamentTags: ['High Energy', 'Playful', 'Curious', 'Needs Space'],
        vaccinated: true,
        neutered: false,
        goodWithKids: false,
    },
    {
        id: "4",
        name: 'Mishti',
        breed: 'Desi Dog',
        age: '8 months',
        gender: 'Female',
        location: "Mirpur, Dhaka",
        description: 'Mishti has a lot of opinions and she will tell you all of them. A classic Desi stray dog: smart, sassy, but wags her whole body once she trusts you. Excellent ball chaser.',
        imageUrl: '/assets/dog1.jpg',
        tag: 'Adopted',
        temperamentTags: ['Vocal', 'Sassy', 'Ball Chaser', 'Apartment Friendly'],
        vaccinated: true,
        neutered: true,
        goodWithKids: true,
    },
    {
        id: "5",
        name: 'Bagha',
        breed: 'Desi Tiger Mix',
        age: '3 years',
        gender: 'Male',
        location: "Banani, Dhaka",
        description: 'Named for his tiger-like stripes, Bagha is a handsome and distinctive dog. He is very trainable and eager to please with his playful yet gentle nature.',
        imageUrl: '/assets/dog2.jpg',
        tag: null,
        temperamentTags: ['Intelligent', 'Trainable', 'Loyal', 'Unique Coat'],
        vaccinated: true,
        neutered: true,
        goodWithKids: true,
    },
    {
        id: "6",
        name: 'Tuni',
        breed: 'Rescue Puppy',
        age: '3 months',
        gender: 'Female',
        location: "Bashundhara R/A, Dhaka",
        description: 'Tuni was a tiny orphan but is now a bundle of joy. She loves running and chasing tennis balls. Needs a loving home to grow up in.',
        imageUrl: '/assets/dog3.jpg',
        tag: 'Urgent',
        temperamentTags: ['Playful', 'Puppy', 'Cuddly', 'Needs Attention'],
        vaccinated: false,
        neutered: false,
        goodWithKids: true,
    },
] as const;

export type AgeCategory = 'Puppy' | 'Adult' | 'Senior';

export function getAgeCategory(age: string): AgeCategory {
    const lowerAge = age.toLowerCase();
    if (lowerAge.includes('month') || (lowerAge.includes('year') && parseInt(age) < 1)) {
        return 'Puppy';
    }
    const years = parseInt(age);
    if (!isNaN(years)) {
        if (years >= 7) return 'Senior';
        return 'Adult';
    }
    return 'Adult'; // Default
}

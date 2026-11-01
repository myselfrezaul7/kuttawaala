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
    status?: string;
};

export const dogs: Dog[] = [
    {
        id: "1",
        name: 'Mimi',
        breed: 'Desi Puppy (Bangladeshi Stray)',
        age: '3 weeks',
        gender: 'Female',
        location: "Dhanmondi, Dhaka",
        description: 'Mimi was a tiny newborn Desi pup found near a tea stall. She has happily been adopted by a loving family in Dhanmondi and is thriving with warm care!',
        imageUrl: '/assets/dog_success_1.png',
        tag: 'Adopted',
        status: 'Adopted',
        temperamentTags: ['Adopted', 'Cute', 'Cuddly', 'Loving Family'],
        vaccinated: true,
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
        description: 'Billu is an adorable baby pup rescued from Uttara. He found his forever home through our community and enjoys daily playtime and cozy naps!',
        imageUrl: '/assets/dog_success_2.png',
        tag: 'Adopted',
        status: 'Adopted',
        temperamentTags: ['Adopted', 'Gentle', 'Happy', 'Loving'],
        vaccinated: true,
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
        description: 'Motu is a chubby little rescue puppy who stole everyone’s heart. He was adopted by a wonderful home in Gulshan and is growing strong and healthy!',
        imageUrl: '/assets/dog_success_3.png',
        tag: 'Adopted',
        status: 'Adopted',
        temperamentTags: ['Adopted', 'Chubby', 'Playful', 'Cherished'],
        vaccinated: true,
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
        description: 'Mishti was rescued in Mirpur learning her first wobbly steps. She was happily adopted through our community network and is now the joy of her household.',
        imageUrl: '/assets/dog_success_1.png',
        tag: 'Adopted',
        status: 'Adopted',
        temperamentTags: ['Adopted', 'Playful', 'Joyful', 'Apartment Friendly'],
        vaccinated: true,
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
        description: 'Bagha is a tiny newborn pup with unique coat patterns. He was adopted by an amazing foster-turned-adopter in Banani and is adored by everyone.',
        imageUrl: '/assets/dog_success_2.png',
        tag: 'Adopted',
        status: 'Adopted',
        temperamentTags: ['Adopted', 'Unique Coat', 'Sweet', 'Cuddly'],
        vaccinated: true,
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
        description: 'Tuni was rescued from heavy rain as a fragile 2-week-old orphan. Thanks to quick community care, she found a dedicated permanent family.',
        imageUrl: '/assets/dog_success_3.png',
        tag: 'Adopted',
        status: 'Adopted',
        temperamentTags: ['Adopted', 'Orphaned to Cherished', 'Healthy', 'Safe'],
        vaccinated: true,
        neutered: false,
        goodWithKids: true,
    },
];

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

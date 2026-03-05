export type Memorial = {
    id: number;
    petName: string;
    ownerName: string;
    imageUrl: string;
    tribute: string;
    timestamp: string;
};

export const MOCK_MEMORIALS: Memorial[] = [
    {
        id: 1,
        petName: 'Mini',
        ownerName: 'Sadia',
        imageUrl: '/assets/dog_memorial_1.png',
        tribute: 'My little Mini, the bravest dog I ever knew. You fought so hard. The house is too quiet without your happy barks. Thank you for choosing me.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    },
    {
        id: 2,
        petName: 'Tiger',
        ownerName: 'Imran & Faria',
        imageUrl: '/assets/dog_memorial_2.png',
        tribute: 'To our beloved Tiger, the neighborhood king. You brought so much laughter with your silly antics. We\'ll never forget you. Thank you for all the memories.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    },
    {
        id: 3,
        petName: 'Snowball',
        ownerName: 'The Rahman Family',
        imageUrl: '/assets/dog_memorial_3.png',
        tribute: 'Pure white and pure heart. Snowball was our first rescue and changed our lives forever. Run free, sweet angel.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    }
];

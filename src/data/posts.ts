export type Post = {
    id: number;
    author: { id: number; name: string };
    content: string;
    imageUrl?: string;
    timestamp: string;
    likes: number;
    comments: { id: number; author: { id: number; name: string }; content: string; timestamp: string }[];
};

export const MOCK_POSTS: Post[] = [
    {
        id: 1,
        author: { id: 1, name: 'Sadia Ahmed' },
        content: 'Just adopted this little guy! Everyone, meet Mimi. She\'s a bit shy but so full of love. Any tips for helping a rescue dog settle into a new home?',
        imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        likes: 15,
        comments: [
            { id: 1, author: { id: 2, name: 'Rahim' }, content: 'Congratulations! So cute! Give her a small safe space first.', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
        ],
    },
    {
        id: 2,
        author: { id: 2, name: 'Rahim' },
        content: 'Does anyone have recommendations for a good vet in Dhanmondi for dental checkups?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
        likes: 8,
        comments: [],
    },
    {
        id: 3,
        author: { id: 3, name: 'Fatima' },
        content: 'Beautiful day for a nap in the sun! #doglife',
        imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        likes: 22,
        comments: [],
    },
];

export type QuizQuestion = {
    id: number;
    questionText: string;
    options: { text: string; tags: string[] }[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        questionText: 'What is your ideal dog personality?',
        options: [
            { text: 'A lap dog who loves cuddles 🛋️', tags: ['Cuddly', 'Calm', 'Affectionate'] },
            { text: 'A playful hunter always on the move 🎾', tags: ['Playful', 'Active', 'Curious'] },
            { text: 'An independent spirit who does their own thing 👑', tags: ['Independent', 'Calm'] },
        ],
    },
    {
        id: 2,
        questionText: 'How is your home environment?',
        options: [
            { text: 'Quiet and peaceful 🤫', tags: ['Calm', 'Shy'] },
            { text: 'Active with lots of people/kids 👨‍👩‍👧‍👦', tags: ['Friendly', 'Playful', 'Good with Kids'] },
            { text: 'I have other pets 🐶🐱', tags: ['Social', 'Friendly'] },
        ],
    },
    {
        id: 3,
        questionText: 'How much time can you dedicate to play?',
        options: [
            { text: 'Lots of time for fetch and walks! 🎾', tags: ['Active', 'Puppy'] },
            { text: 'Some play, mostly chilling 😌', tags: ['Adult', 'Calm'] },
            { text: 'I prefer a calm dog who relaxes nearby 🦴', tags: ['Independent', 'Senior'] },
        ],
    },
];

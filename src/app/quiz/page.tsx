"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, Check, Sparkles, PawPrint } from "lucide-react";
import { dogs } from "@/data/dogs";
import { PetCard } from "@/components/shared/PetCard";

// Quiz Data specialized for dogs
const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: "What's your ideal weekend activity?",
        options: [
            { text: "Hiking or a long run 🏃‍♂️", icon: "🌲", tags: ["High Energy", "Playful", "Adventure Buddy"] },
            { text: "Chilling at a cafe ☕", icon: "🥐", tags: ["Calm", "Low Energy", "Social"] },
            { text: "Netflix marathon on the couch 📺", icon: "🛋️", tags: ["Cuddly", "Low Energy", "Apartment Friendly"] },
            { text: "Training and learning tricks 🎾", icon: "🧠", tags: ["Intelligent", "Trainable", "Working Dog"] }
        ]
    },
    {
        id: 2,
        question: "How much space do you have?",
        options: [
            { text: "Cozy apartment in the city 🏢", icon: "🏙️", tags: ["Apartment Friendly", "Small", "Low Energy"] },
            { text: "House with a small yard 🏡", icon: "🌳", tags: ["Medium Energy", "Playful"] },
            { text: "Big property with lots of room 🚜", icon: "🌾", tags: ["High Energy", "Adventure Buddy", "Guard Dog"] },
        ]
    },
    {
        id: 3,
        question: "Do you have other pets or kids?",
        options: [
            { text: "Nope, it's just me! 🧍", icon: "✨", tags: ["Needs Attention", "Loyal"] },
            { text: "Yes, I have kids 👶", icon: "🧸", tags: ["Good with Kids", "Gentle", "Patient"] },
            { text: "I have other dogs/cats 🐕", icon: "🐈", tags: ["Social", "Friendly"] },
        ]
    },
    {
        id: 4,
        question: "What's your experience with dogs?",
        options: [
            { text: "First time owner! 🐣", icon: "🔰", tags: ["Easy Going", "Trainable", "Gentle"] },
            { text: "I grew up with dogs 🐾", icon: "🦴", tags: ["Moderate Energy"] },
            { text: "Expert handler 😎", icon: "🎓", tags: ["Intelligent", "Working Dog", "High Energy"] },
        ]
    }
];

export default function QuizPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [matchedDogs, setMatchedDogs] = useState<typeof dogs>([]);

    const handleAnswer = (tags: string[]) => {
        setSelectedTags(prev => [...prev, ...tags]);

        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        setIsCalculating(true);
        setTimeout(() => {
            // Scoring Logic
            const scoredDogs = dogs.map(dog => {
                let score = 0;
                // Add points for matching tags
                selectedTags.forEach(tag => {
                    if (dog.temperamentTags.includes(tag)) score += 2;
                });
                // Random drift to make it feel organic
                score += Math.random();
                return { ...dog, score };
            });

            // Get top 3
            const topDogs = scoredDogs
                .sort((a, b) => b.score - a.score)
                .slice(0, 3);

            // @ts-ignore
            setMatchedDogs(topDogs);
            setIsCalculating(false);
            setShowResults(true);
        }, 2000);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedTags([]);
        setShowResults(false);
        setMatchedDogs([]);
    };

    // Calculate Progress
    const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

    if (isCalculating) {
        return (
            <div className="min-h-screen bg-[#FFFDF8] flex flex-col items-center justify-center p-4">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mb-8 relative"
                >
                    <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center">
                        <PawPrint className="w-16 h-16 text-orange-500" />
                    </div>
                </motion.div>
                <h2 className="text-2xl font-bold text-stone-800 font-heading mb-2">Sniffing out your best friend...</h2>
                <p className="text-stone-500">Analyzing temperament compatibility...</p>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="min-h-screen bg-[#FFFDF8] py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block p-3 rounded-full bg-green-100 mb-6 animate-bounce">
                            <Sparkles className="w-8 h-8 text-green-600 fill-green-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-stone-800 font-heading mb-4">
                            We found your Paw-fect Matches! 🎉
                        </h1>
                        <p className="text-xl text-stone-500 mb-8">
                            Based on your lifestyle, these dogs would love to meet you.
                        </p>
                        <Button onClick={resetQuiz} variant="outline" className="rounded-full border-2 border-stone-200 hover:bg-stone-100 text-stone-600">
                            <RefreshCw className="w-4 h-4 mr-2" /> Retake Quiz
                        </Button>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {matchedDogs.map((dog, index) => (
                            <motion.div
                                key={dog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                            >
                                {/* @ts-ignore */}
                                <PetCard dog={dog} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center bg-stone-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">Not sure about these matches?</h2>
                            <p className="text-stone-400 mb-8 max-w-xl mx-auto">
                                Every dog is unique! Come visit our shelter to meet them in person. Sometimes love happens at first sniff.
                            </p>
                            <Link href="/adopt">
                                <Button className="bg-orange-500 text-white rounded-xl hover:bg-orange-600 px-8 h-12">
                                    Browse All Dogs
                                </Button>
                            </Link>
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFDF8] flex flex-col">
            {/* Header / Nav */}
            <div className="p-6 flex justify-between items-center">
                <Link href="/">
                    <Button variant="ghost" className="rounded-full hover:bg-stone-100">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Exit
                    </Button>
                </Link>
                <div className="text-stone-400 font-bold text-sm tracking-widest uppercase">
                    Step {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                </div>
                <div className="w-20" /> {/* Spacer */}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-stone-100 mb-8 md:mb-12">
                <motion.div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Question Card */}
            <div className="flex-1 container mx-auto px-4 max-w-3xl flex flex-col justify-center pb-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-stone-800 font-heading mb-12 text-center leading-tight">
                            {QUIZ_QUESTIONS[currentQuestion].question}
                        </h1>

                        <div className="grid gap-4">
                            {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => (
                                <motion.button
                                    key={idx}
                                    onClick={() => handleAnswer(option.tags)}
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative group w-full bg-white p-6 rounded-2xl border-2 border-stone-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/50 transition-all text-left flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl bg-stone-50 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                                            {option.icon}
                                        </span>
                                        <span className="text-xl font-bold text-stone-600 group-hover:text-stone-800">
                                            {option.text}
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border-2 border-stone-200 group-hover:border-orange-500 group-hover:bg-orange-500 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                                        <Check className="w-5 h-5 text-white" />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

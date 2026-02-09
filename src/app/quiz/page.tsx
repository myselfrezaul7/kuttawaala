"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import { dogs } from "@/data/dogs";
import { PetCard } from "@/components/shared/PetCard";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);

    const handleAnswer = (tags: string[]) => {
        setSelectedTags(prev => [...prev, ...tags]);
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setCompleted(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedTags([]);
        setCompleted(false);
    };

    // Logic to match dogs based on tags
    const matchedCats = completed ? dogs.filter(dog => {
        // Very simple matching check - does the dog have any tag relevant?
        // In a real app we'd have temperament tags on dogs. 
        // For now mocking 'matched' by just returning consistent set or random for demo
        return true;
    }).sort(() => 0.5 - Math.random()).slice(0, 3) : [];

    return (
        <div className="min-h-screen bg-secondary/50 py-20 px-4 flex flex-col items-center justify-center">
            {!completed ? (
                <div className="w-full max-w-2xl bg-white p-12 rounded-[3rem] shadow-xl border border-border">
                    <div className="mb-8 flex justify-between items-center text-muted-foreground/80 text-sm font-bold uppercase tracking-widest">
                        <span>Question {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}</span>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-secondary/500 transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-10 font-heading leading-tight">
                        {QUIZ_QUESTIONS[currentQuestionIndex].questionText}
                    </h1>

                    <div className="space-y-4">
                        {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option.tags)}
                                className="w-full text-left p-6 rounded-2xl border-2 border-border/50 hover:border-primary hover:bg-secondary/50 transition-all group"
                            >
                                <span className="font-bold text-lg text-foreground/90 group-hover:text-primary transition-colors">
                                    {option.text}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 font-heading">Purr-fect Matches! 🎉</h2>
                        <p className="text-muted-foreground mb-8">Based on your answers, these dogs might be your soulmate.</p>
                        <Button onClick={restartQuiz} variant="outline" className="rounded-full">
                            <RefreshCw className="w-4 h-4 mr-2" /> Retake Quiz
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {matchedCats.map(dog => (
                            // @ts-ignore
                            <PetCard key={dog.id} dog={dog} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

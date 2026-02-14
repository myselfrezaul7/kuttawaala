"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Heart, Gift, Award, CheckCircle, Dog } from "lucide-react";
import confetti from "canvas-confetti";
import Image from "next/image";

type SponsorshipModalProps = {
    dogName: string;
};

const TIERS = [
    {
        id: 'meal',
        name: 'Feed a Belly',
        amount: 500,
        icon: '🍖',
        color: 'bg-orange-100 text-orange-600',
        desc: 'Provides 1 week of nutritious meals.',
        perks: ['Digital Thank You Card', 'Update on eating habits']
    },
    {
        id: 'vaccine',
        name: 'Vaccine Hero',
        amount: 2000,
        icon: '💉',
        color: 'bg-blue-100 text-blue-600',
        desc: 'Covers full vaccination (Rabies + DHPP).',
        perks: ['"Vaccine Hero" Badge', 'Video of vaccination day']
    },
    {
        id: 'guardian',
        name: 'Guardian Angel',
        amount: 5000,
        icon: '👼',
        color: 'bg-indigo-100 text-indigo-600',
        desc: 'Sponsors full medical checkup & sterilization.',
        perks: ['"Guardian Angel" Badge', 'Personal video call with ' + 'dogName', 'Name on kennel']
    }
];

export function SponsorshipModal({ dogName }: SponsorshipModalProps) {
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [step, setStep] = useState<'select' | 'payment' | 'success'>('select');

    const handleSponsor = () => {
        setStep('success');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f97316', '#fbbf24', '#0ea5e9'] // Orange, Ambient, Sky
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl shadow-lg shadow-orange-200/50 transition-all hover:scale-105">
                    <Heart className="w-5 h-5 mr-2 fill-white animate-pulse" />
                    Sponsor {dogName}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-[#FFFDF8] border-none rounded-3xl p-0 overflow-hidden">
                <div className="p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-3xl font-bold text-center font-heading text-stone-800">
                            {step === 'select' && `Sponsor ${dogName} 🐾`}
                            {step === 'payment' && "Complete Sponsorship 💳"}
                            {step === 'success' && "You're a Hero! 🦸‍♂️"}
                        </DialogTitle>
                    </DialogHeader>

                    {step === 'select' && (
                        <div className="space-y-4">
                            <p className="text-center text-stone-500 mb-6">
                                Choose how you want to support {dogName}'s journey.
                            </p>
                            <div className="grid gap-4">
                                {TIERS.map((tier) => (
                                    <div
                                        key={tier.id}
                                        onClick={() => setSelectedTier(tier.id)}
                                        className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedTier === tier.id
                                                ? 'border-orange-500 bg-orange-50/50'
                                                : 'border-stone-100 hover:border-orange-200 bg-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${tier.color}`}>
                                                {tier.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h3 className="font-bold text-stone-800">{tier.name}</h3>
                                                    <span className="font-bold text-orange-600">৳{tier.amount}</span>
                                                </div>
                                                <p className="text-sm text-stone-500">{tier.desc}</p>
                                            </div>
                                        </div>
                                        {selectedTier === tier.id && (
                                            <div className="absolute top-4 right-4">
                                                <CheckCircle className="w-6 h-6 text-orange-500 fill-white" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Button
                                disabled={!selectedTier}
                                onClick={() => setStep('payment')}
                                className="w-full h-12 rounded-xl mt-4 bg-stone-800 hover:bg-stone-900 text-white"
                            >
                                Continue
                            </Button>
                        </div>
                    )}

                    {step === 'payment' && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                <span className="text-4xl">💳</span>
                            </div>
                            <p className="text-stone-600 mb-8">
                                Secure payment gateway simulation...
                            </p>
                            <div className="flex gap-4">
                                <Button variant="outline" onClick={() => setStep('select')} className="flex-1 h-12 rounded-xl">
                                    Back
                                </Button>
                                <Button onClick={handleSponsor} className="flex-1 h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white">
                                    Pay Now
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-4">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <Award className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-stone-800 mb-2">Thank You!</h3>
                            <p className="text-stone-500 mb-8">
                                {dogName} is wagging their tail right now because of you. We've sent the receipt to your email.
                            </p>

                            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 mb-8">
                                <p className="font-bold text-orange-800 mb-2">You earned a new badge!</p>
                                <div className="flex items-center justify-center gap-2 text-orange-600">
                                    <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
                                        <Heart className="w-4 h-4 fill-orange-600" />
                                    </div>
                                    <span>Dog Defender</span>
                                </div>
                            </div>

                            <Button onClick={() => setStep('select')} variant="outline" className="h-12 rounded-xl px-8">
                                Close
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

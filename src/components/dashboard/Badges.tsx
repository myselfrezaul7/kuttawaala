"use client";

import { Award, Bone, Heart, Star, Shield, Zap } from "lucide-react";

// Badges config
const BADGES = [
    { id: 'newbie', name: 'Pack Member', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-100', desc: 'Joined the community' },
    { id: 'donor', name: 'Bowl Filler', icon: Bone, color: 'text-orange-500', bg: 'bg-orange-100', desc: 'Sponsored a meal' },
    { id: 'foster', name: 'Safe Haven', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-100', desc: 'Fostered a dog' },
    { id: 'reporter', name: 'Street Guardian', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100', desc: 'Reported a stray' },
    { id: 'adopter', name: 'Forever Home', icon: Star, color: 'text-purple-500', bg: 'bg-purple-100', desc: 'Adopted a dog' },
    { id: 'legend', name: 'Alpha Dog', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-100', desc: 'Top tier volunteer' },
];

export function Badges({ earned = ['newbie', 'reporter'] }: { earned?: string[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {BADGES.map((badge) => {
                const isEarned = earned.includes(badge.id);
                const Icon = badge.icon;
                return (
                    <div
                        key={badge.id}
                        className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${isEarned
                            ? `bg-white border-stone-100 shadow-sm opacity-100`
                            : 'bg-stone-50 border-transparent opacity-50 grayscale'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${isEarned ? badge.bg : 'bg-stone-200'} ${isEarned ? badge.color : 'text-stone-400'}`}>
                            <Icon className="w-6 h-6 fill-current" />
                        </div>
                        <h4 className="font-bold text-stone-800 text-sm">{badge.name}</h4>
                        <p className="text-stone-400 text-xs mt-1">{badge.desc}</p>
                    </div>
                );
            })}
        </div>
    );
}

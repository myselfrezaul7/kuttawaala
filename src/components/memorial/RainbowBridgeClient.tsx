"use client";

import dynamic from "next/dynamic";

const RainbowBridgeCanvas = dynamic(
    () => import("@/components/3d/RainbowBridgeCanvas").then((mod) => mod.RainbowBridgeCanvas),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[380px] md:h-[480px] pt-16 bg-gradient-to-b from-[#070714] via-[#100d28] to-[#1c1335] flex items-center justify-center text-amber-200/60 text-sm border-b border-orange-500/20">
                <span className="animate-pulse">✨ Illuminating the Rainbow Bridge Sky Sanctuary...</span>
            </div>
        ),
    }
);

export function RainbowBridgeClient() {
    return <RainbowBridgeCanvas />;
}

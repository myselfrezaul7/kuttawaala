"use client";

import { useState } from "react";
import Image from "next/image";
import { resolveDogImage } from "@/utils/imageFallback";

interface DogDetailImageProps {
    imageUrl: string;
    alt: string;
}

export function DogDetailImage({ imageUrl, alt }: DogDetailImageProps) {
    const [imgSrc, setImgSrc] = useState(() => resolveDogImage(imageUrl));

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImgSrc("/assets/dog_success_1.png")}
        />
    );
}

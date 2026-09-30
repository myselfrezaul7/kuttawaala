"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { Sparkles, Heart } from "lucide-react";

interface HeartParticle {
    mesh: THREE.Sprite;
    vx: number;
    vy: number;
    vz: number;
    rotSpeed: number;
    scale: number;
    age: number;
    life: number;
}

export function HeroDogCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const isDarkMode = resolvedTheme === "dark";
    const [pettedCount, setPettedCount] = useState(0);
    const [isHappy, setIsHappy] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const triggerBounceRef = useRef<(() => void) | null>(null);

    // Reduced motion accessibility
    useEffect(() => {
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(motionQuery.matches);
        const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        motionQuery.addEventListener("change", listener);
        return () => motionQuery.removeEventListener("change", listener);
    }, []);

    const handlePetClick = useCallback(() => {
        if (triggerBounceRef.current) {
            triggerBounceRef.current();
            setPettedCount((c) => c + 1);
            setIsHappy(true);
            setTimeout(() => setIsHappy(false), 1200);
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        let animationFrameId: number | null = null;
        let isVisible = true;
        let lastFrameTime = performance.now();
        const TARGET_FRAME_MS = 1000 / 30; // Capped 30 FPS

        // 1. Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const width = container.clientWidth;
        const height = Math.max(container.clientHeight, 1);

        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
        camera.position.set(0, 1.2, 5.5);
        camera.lookAt(0, 0.3, 0);

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // 2. Lighting
        const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.1);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffedd5, 1.6);
        keyLight.position.set(4, 6, 5);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 512;
        keyLight.shadow.mapSize.height = 512;
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xbae6fd, 0.7);
        fillLight.position.set(-4, 2, -2);
        scene.add(fillLight);

        // Ground shadow plane
        const shadowGeo = new THREE.PlaneGeometry(3, 3);
        const shadowMat = new THREE.ShadowMaterial({ opacity: 0.15 });
        const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
        groundShadow.rotation.x = -Math.PI / 2;
        groundShadow.position.y = -1.1;
        groundShadow.receiveShadow = true;
        scene.add(groundShadow);

        // 3. Build Stylized "Lal Tom" Procedural 3D Pup
        const dogRoot = new THREE.Group();
        dogRoot.position.y = -0.3;
        scene.add(dogRoot);

        // Palette materials
        const coatColor = 0xd97706; // Desi warm golden ginger
        const bellyColor = 0xfef3c7; // Cream chest & snout
        const noseColor = 0x18181b; // Glossy dark nose
        const collarColor = 0x0284c7; // Vibrant sky blue
        const goldColor = 0xf59e0b; // Shiny gold tag

        const coatMat = new THREE.MeshStandardMaterial({
            color: coatColor,
            roughness: 0.7,
            metalness: 0.05,
        });
        const bellyMat = new THREE.MeshStandardMaterial({
            color: bellyColor,
            roughness: 0.8,
        });
        const noseMat = new THREE.MeshStandardMaterial({
            color: noseColor,
            roughness: 0.2,
            metalness: 0.3,
        });
        const eyeMat = new THREE.MeshStandardMaterial({
            color: 0x111827,
            roughness: 0.1,
            metalness: 0.8,
        });
        const eyeSpecularMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const collarMat = new THREE.MeshStandardMaterial({ color: collarColor, roughness: 0.4 });
        const tagMat = new THREE.MeshStandardMaterial({ color: goldColor, metalness: 0.8, roughness: 0.2 });
        const tongueMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.5 });

        // Body (torso)
        const bodyGeo = new THREE.CylinderGeometry(0.55, 0.65, 1.2, 10);
        const body = new THREE.Mesh(bodyGeo, coatMat);
        body.position.set(0, 0, 0);
        body.castShadow = true;
        dogRoot.add(body);

        // Chest patch (cream)
        const chestGeo = new THREE.SphereGeometry(0.45, 8, 8, 0, Math.PI);
        const chest = new THREE.Mesh(chestGeo, bellyMat);
        chest.rotation.y = -Math.PI / 2;
        chest.position.set(0, 0.15, 0.35);
        chest.scale.set(0.7, 1.1, 0.5);
        dogRoot.add(chest);

        // Paws (sitting posture)
        const pawGeo = new THREE.SphereGeometry(0.2, 8, 8);
        const leftFrontPaw = new THREE.Mesh(pawGeo, bellyMat);
        leftFrontPaw.position.set(-0.35, -0.65, 0.5);
        leftFrontPaw.scale.set(1, 0.7, 1.3);
        leftFrontPaw.castShadow = true;
        dogRoot.add(leftFrontPaw);

        const rightFrontPaw = new THREE.Mesh(pawGeo, bellyMat);
        rightFrontPaw.position.set(0.35, -0.65, 0.5);
        rightFrontPaw.scale.set(1, 0.7, 1.3);
        rightFrontPaw.castShadow = true;
        dogRoot.add(rightFrontPaw);

        const leftBackPaw = new THREE.Mesh(pawGeo, coatMat);
        leftBackPaw.position.set(-0.65, -0.65, -0.1);
        leftBackPaw.scale.set(1.1, 0.8, 1.4);
        dogRoot.add(leftBackPaw);

        const rightBackPaw = new THREE.Mesh(pawGeo, coatMat);
        rightBackPaw.position.set(0.65, -0.65, -0.1);
        rightBackPaw.scale.set(1.1, 0.8, 1.4);
        dogRoot.add(rightBackPaw);

        // Collar & Tag
        const collarGeo = new THREE.TorusGeometry(0.52, 0.08, 6, 16);
        const collar = new THREE.Mesh(collarGeo, collarMat);
        collar.rotation.x = Math.PI / 2;
        collar.position.set(0, 0.6, 0);
        dogRoot.add(collar);

        const tagGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.03, 12);
        const tag = new THREE.Mesh(tagGeo, tagMat);
        tag.rotation.x = Math.PI / 2;
        tag.position.set(0, 0.5, 0.56);
        dogRoot.add(tag);

        // Wagging Tail
        const tailRoot = new THREE.Group();
        tailRoot.position.set(0, -0.2, -0.6);
        dogRoot.add(tailRoot);

        const tailGeo = new THREE.ConeGeometry(0.12, 0.75, 8);
        const tail = new THREE.Mesh(tailGeo, coatMat);
        tail.position.set(0, 0.35, -0.2);
        tail.rotation.x = -Math.PI / 3;
        tail.castShadow = true;
        tailRoot.add(tail);

        // Head Group (pivot for cursor tracking)
        const headGroup = new THREE.Group();
        headGroup.position.set(0, 0.85, 0.1);
        dogRoot.add(headGroup);

        // Cranium
        const headGeo = new THREE.SphereGeometry(0.58, 12, 10);
        const head = new THREE.Mesh(headGeo, coatMat);
        head.scale.set(1, 0.95, 1.05);
        head.castShadow = true;
        headGroup.add(head);

        // Snout
        const snoutGeo = new THREE.CylinderGeometry(0.24, 0.34, 0.45, 8);
        const snout = new THREE.Mesh(snoutGeo, bellyMat);
        snout.rotation.x = Math.PI / 2;
        snout.position.set(0, -0.1, 0.55);
        snout.scale.set(1.1, 0.9, 1);
        headGroup.add(snout);

        // Nose
        const noseGeo = new THREE.SphereGeometry(0.11, 8, 8);
        const nose = new THREE.Mesh(noseGeo, noseMat);
        nose.position.set(0, -0.02, 0.78);
        nose.scale.set(1.2, 0.8, 1);
        headGroup.add(nose);

        // Tongue (happy pant)
        const tongueGeo = new THREE.BoxGeometry(0.16, 0.22, 0.04);
        const tongue = new THREE.Mesh(tongueGeo, tongueMat);
        tongue.position.set(0, -0.22, 0.65);
        tongue.rotation.x = 0.3;
        tongue.visible = false;
        headGroup.add(tongue);

        // Eyes
        const eyeGeo = new THREE.SphereGeometry(0.1, 8, 8);
        const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
        leftEye.position.set(-0.25, 0.12, 0.5);
        headGroup.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
        rightEye.position.set(0.25, 0.12, 0.5);
        headGroup.add(rightEye);

        // Eye specular highlights
        const glintGeo = new THREE.SphereGeometry(0.035, 6, 6);
        const leftGlint = new THREE.Mesh(glintGeo, eyeSpecularMat);
        leftGlint.position.set(-0.23, 0.15, 0.58);
        headGroup.add(leftGlint);

        const rightGlint = new THREE.Mesh(glintGeo, eyeSpecularMat);
        rightGlint.position.set(0.27, 0.15, 0.58);
        headGroup.add(rightGlint);

        // Floppy Ears
        const earGeo = new THREE.ConeGeometry(0.22, 0.65, 6);

        const leftEar = new THREE.Mesh(earGeo, coatMat);
        leftEar.position.set(-0.48, 0.2, 0);
        leftEar.rotation.z = Math.PI * 0.6;
        leftEar.rotation.x = 0.15;
        leftEar.castShadow = true;
        headGroup.add(leftEar);

        const rightEar = new THREE.Mesh(earGeo, coatMat);
        rightEar.position.set(0.48, 0.2, 0);
        rightEar.rotation.z = -Math.PI * 0.6;
        rightEar.rotation.x = 0.15;
        rightEar.castShadow = true;
        headGroup.add(rightEar);

        // 4. Heart Particle System on Click
        // Generate heart canvas texture
        const heartCanvas = document.createElement("canvas");
        heartCanvas.width = 64;
        heartCanvas.height = 64;
        const hCtx = heartCanvas.getContext("2d")!;
        hCtx.fillStyle = "#f43f5e";
        hCtx.beginPath();
        hCtx.moveTo(32, 48);
        hCtx.bezierCurveTo(32, 48, 12, 34, 12, 20);
        hCtx.bezierCurveTo(12, 10, 20, 8, 26, 8);
        hCtx.bezierCurveTo(30, 8, 32, 14, 32, 14);
        hCtx.bezierCurveTo(32, 14, 34, 8, 38, 8);
        hCtx.bezierCurveTo(44, 8, 52, 10, 52, 20);
        hCtx.bezierCurveTo(52, 34, 32, 48, 32, 48);
        hCtx.closePath();
        hCtx.fill();
        const heartTexture = new THREE.CanvasTexture(heartCanvas);

        const heartParticles: HeartParticle[] = [];

        const spawnHearts = () => {
            const count = 7;
            for (let i = 0; i < count; i++) {
                const material = new THREE.SpriteMaterial({
                    map: heartTexture,
                    transparent: true,
                    opacity: 1,
                    depthWrite: false,
                });
                const sprite = new THREE.Sprite(material);
                const startX = (Math.random() - 0.5) * 0.8;
                const startY = 0.8 + Math.random() * 0.4;
                const startZ = 0.5 + Math.random() * 0.4;
                sprite.position.set(startX, startY, startZ);
                const s = 0.35 + Math.random() * 0.25;
                sprite.scale.set(s, s, 1);

                scene.add(sprite);
                heartParticles.push({
                    mesh: sprite,
                    vx: (Math.random() - 0.5) * 0.04,
                    vy: 0.04 + Math.random() * 0.04,
                    vz: (Math.random() - 0.5) * 0.02,
                    rotSpeed: (Math.random() - 0.5) * 0.05,
                    scale: s,
                    age: 0,
                    life: 50,
                });
            }
        };

        // 5. Bounce animation state
        let bouncePhase = 0;
        let isBouncing = false;

        const triggerBounce = () => {
            if (isBouncing) return;
            isBouncing = true;
            bouncePhase = 0;
            tongue.visible = true;
            spawnHearts();
        };
        triggerBounceRef.current = triggerBounce;

        // 6. Smooth Mouse / Touch Tracking
        let targetLookX = 0;
        let targetLookY = 0;
        let currentLookX = 0;
        let currentLookY = 0;

        const handlePointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            targetLookX = (x - 0.5) * 2;
            targetLookY = (y - 0.5) * 2;
        };
        container.addEventListener("pointermove", handlePointerMove);

        const handlePointerLeave = () => {
            targetLookX = 0;
            targetLookY = 0;
        };
        container.addEventListener("pointerleave", handlePointerLeave);

        // 7. Intersection & Visibility
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0.1 }
        );
        observer.observe(container);

        const handleVisibilityChange = () => {
            isVisible = document.visibilityState === "visible";
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // 8. Resize
        const handleResize = () => {
            if (!container || !renderer || !camera) return;
            const w = container.clientWidth;
            const h = Math.max(container.clientHeight, 1);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        };
        window.addEventListener("resize", handleResize);

        // 9. Animation Loop (Capped 30 FPS)
        let clock = 0;
        const animate = (currentTime: number) => {
            animationFrameId = requestAnimationFrame(animate);

            if (!isVisible) return;

            const elapsed = currentTime - lastFrameTime;
            if (elapsed < TARGET_FRAME_MS) return;
            lastFrameTime = currentTime - (elapsed % TARGET_FRAME_MS);

            clock += 0.033;

            // Smooth head tracking with inertia
            if (!prefersReducedMotion) {
                currentLookX += (targetLookX - currentLookX) * 0.12;
                currentLookY += (targetLookY - currentLookY) * 0.12;

                headGroup.rotation.y = currentLookX * 0.45;
                headGroup.rotation.x = currentLookY * 0.28;

                // Subtle dynamic ear flop
                leftEar.rotation.z = Math.PI * 0.6 + currentLookX * 0.15;
                rightEar.rotation.z = -Math.PI * 0.6 + currentLookX * 0.15;
            }

            // Dark Mode reaction: relaxes/curls slightly down
            if (isDarkMode) {
                dogRoot.rotation.z = THREE.MathUtils.lerp(dogRoot.rotation.z, 0.08, 0.05);
                leftEye.scale.y = THREE.MathUtils.lerp(leftEye.scale.y, 0.35, 0.08); // Sleepy eyes
                rightEye.scale.y = THREE.MathUtils.lerp(rightEye.scale.y, 0.35, 0.08);
                tailRoot.rotation.y = Math.sin(clock * 3) * 0.25; // Gentle lazy wag
            } else {
                dogRoot.rotation.z = THREE.MathUtils.lerp(dogRoot.rotation.z, 0, 0.08);
                leftEye.scale.y = THREE.MathUtils.lerp(leftEye.scale.y, 1, 0.1);
                rightEye.scale.y = THREE.MathUtils.lerp(rightEye.scale.y, 1, 0.1);
                tailRoot.rotation.y = Math.sin(clock * (isBouncing ? 16 : 8)) * 0.55; // Happy wag
            }

            // Idle breathing animation
            if (!prefersReducedMotion) {
                body.scale.y = 1.0 + Math.sin(clock * 2.5) * 0.025;
            }

            // Bounce on click
            if (isBouncing && !prefersReducedMotion) {
                bouncePhase += 0.14;
                const bounceHeight = Math.sin(bouncePhase) * 0.45;
                dogRoot.position.y = -0.3 + Math.max(0, bounceHeight);
                headGroup.rotation.z = Math.sin(bouncePhase * 2) * 0.15;

                if (bouncePhase >= Math.PI) {
                    isBouncing = false;
                    dogRoot.position.y = -0.3;
                    headGroup.rotation.z = 0;
                    tongue.visible = false;
                }
            }

            // Update heart particles
            for (let i = heartParticles.length - 1; i >= 0; i--) {
                const p = heartParticles[i];
                p.age += 1;
                p.mesh.position.y += p.vy;
                p.mesh.position.x += p.vx;
                p.mesh.position.z += p.vz;
                const progress = p.age / p.life;
                (p.mesh.material as THREE.SpriteMaterial).opacity = 1 - progress;
                const currentScale = p.scale * (1 + progress * 0.5);
                p.mesh.scale.set(currentScale, currentScale, 1);

                if (p.age >= p.life) {
                    scene.remove(p.mesh);
                    heartParticles.splice(i, 1);
                }
            }

            renderer.render(scene, camera);
        };

        animationFrameId = requestAnimationFrame(animate);

        // 10. Cleanup
        return () => {
            if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
            container.removeEventListener("pointermove", handlePointerMove);
            container.removeEventListener("pointerleave", handlePointerLeave);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            observer.disconnect();

            heartParticles.forEach((p) => scene.remove(p.mesh));
            heartTexture.dispose();
            renderer.dispose();
        };
    }, [isDarkMode, prefersReducedMotion]);

    return (
        <div
            ref={containerRef}
            onClick={handlePetClick}
            aria-label="Interactive 3D mascot pup Lal Tom. Click or tap to pet him."
            className="group relative w-full h-full cursor-pointer select-none"
        >
            {/* Screen reader description */}
            <div className="sr-only">
                Interactive 3D Desi mascot dog named Lal Tom. Follows your cursor and wags his tail. Click to pet and celebrate with hearts.
            </div>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                role="presentation"
                aria-hidden="true"
                tabIndex={-1}
                className="w-full h-full block"
            />

            {/* Interactive Pill Hint */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none transition-transform group-hover:scale-105">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-amber-500/20 text-xs font-bold text-amber-700 dark:text-amber-300 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: "3s" }} />
                    <span>Meet Lal Tom • 3D Pup</span>
                </span>
            </div>

            {/* Click to Pet Badge */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/10 group-hover:bg-amber-600 transition-colors">
                    <Heart className={`w-3.5 h-3.5 ${isHappy ? "fill-rose-400 text-rose-400 animate-ping" : "fill-white/80"}`} />
                    <span>{pettedCount > 0 ? `Petted ${pettedCount}x` : "Click to Pet!"}</span>
                </span>
            </div>
        </div>
    );
}

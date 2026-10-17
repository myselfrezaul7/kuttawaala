"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LanternInstance {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    wobbleSpeed: number;
    wobblePhase: number;
    scale: number;
}

interface DynamicLantern {
    mesh: THREE.Group;
    light: THREE.PointLight;
    vy: number;
    vx: number;
    rotSpeed: number;
    age: number;
    life: number;
}

export function RainbowBridgeCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [lanternCount, setLanternCount] = useState<number>(42);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const dynamicLanternsRef = useRef<DynamicLantern[]>([]);
    const spawnLanternTriggerRef = useRef<(() => void) | null>(null);

    // Dynamic lantern spawner
    const handleSpawnLantern = useCallback(() => {
        if (spawnLanternTriggerRef.current) {
            spawnLanternTriggerRef.current();
            setLanternCount((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(motionQuery.matches);
        const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        motionQuery.addEventListener("change", handleMotionChange);

        return () => motionQuery.removeEventListener("change", handleMotionChange);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        let animationFrameId: number | null = null;
        let isVisible = true;
        let lastFrameTime = performance.now();
        const TARGET_FRAME_MS = 1000 / 30; // Capped 30 FPS for optimal battery and performance

        // 1. Scene & Camera setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0c0c1e, 0.035);

        const camera = new THREE.PerspectiveCamera(
            55,
            container.clientWidth / Math.max(container.clientHeight, 1),
            0.1,
            100
        );
        camera.position.set(0, 3, 16);
        camera.lookAt(0, 6, 0);

        // 2. Renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(container.clientWidth, container.clientHeight);

        // 3. Ambient & Celestial Lighting
        const ambientLight = new THREE.AmbientLight(0x2d1f4d, 1.2);
        scene.add(ambientLight);

        const celestialLight = new THREE.DirectionalLight(0xffeedd, 0.8);
        celestialLight.position.set(5, 20, 10);
        scene.add(celestialLight);

        // 4. Background Starfield
        const starCount = 350;
        const starGeometry = new THREE.BufferGeometry();
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            starPositions[i3] = (Math.random() - 0.5) * 60;
            starPositions[i3 + 1] = Math.random() * 35 - 5;
            starPositions[i3 + 2] = (Math.random() - 0.5) * 40 - 5;

            // Warm golden and subtle starlight tints
            const isWarm = Math.random() > 0.4;
            starColors[i3] = isWarm ? 1.0 : 0.85;
            starColors[i3 + 1] = isWarm ? 0.88 : 0.9;
            starColors[i3 + 2] = isWarm ? 0.65 : 1.0;
        }

        starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

        const starMaterial = new THREE.PointsMaterial({
            size: 0.22,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
        });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // 5. Stylized Rainbow Bridge Arch
        const rainbowColors = [
            0xef4444, // Red
            0xf97316, // Orange
            0xeab308, // Yellow
            0x22c55e, // Green
            0x06b6d4, // Cyan
            0x6366f1, // Indigo
            0xa855f7, // Violet
        ];

        const bridgeGroup = new THREE.Group();
        rainbowColors.forEach((colorHex, idx) => {
            const radius = 18 + idx * 0.35;
            const archGeometry = new THREE.TorusGeometry(radius, 0.14, 8, 48, Math.PI * 0.75);
            const archMaterial = new THREE.MeshBasicMaterial({
                color: colorHex,
                transparent: true,
                opacity: 0.28 - idx * 0.02,
                blending: THREE.AdditiveBlending,
            });
            const arch = new THREE.Mesh(archGeometry, archMaterial);
            arch.rotation.x = Math.PI * 0.08;
            arch.rotation.y = Math.PI * 0.02;
            arch.rotation.z = Math.PI * 0.125;
            arch.position.set(0, -6, -8);
            bridgeGroup.add(arch);
        });
        scene.add(bridgeGroup);

        // 6. Instanced Ambient Lanterns
        const INSTANCE_COUNT = 45;
        const lanternGeo = new THREE.CylinderGeometry(0.3, 0.25, 0.65, 6);
        const lanternMat = new THREE.MeshStandardMaterial({
            color: 0xffaa33,
            emissive: 0xff7700,
            emissiveIntensity: 0.85,
            roughness: 0.4,
            metalness: 0.1,
            transparent: true,
            opacity: 0.9,
        });

        const instancedLanterns = new THREE.InstancedMesh(lanternGeo, lanternMat, INSTANCE_COUNT);
        instancedLanterns.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        scene.add(instancedLanterns);

        const dummy = new THREE.Object3D();
        const lanternData: LanternInstance[] = [];

        for (let i = 0; i < INSTANCE_COUNT; i++) {
            lanternData.push({
                x: (Math.random() - 0.5) * 26,
                y: (Math.random() - 0.5) * 24 + 4,
                z: (Math.random() - 0.5) * 20 - 4,
                vx: (Math.random() - 0.5) * 0.008,
                vy: 0.015 + Math.random() * 0.02,
                wobbleSpeed: 1 + Math.random() * 2,
                wobblePhase: Math.random() * Math.PI * 2,
                scale: 0.6 + Math.random() * 0.5,
            });
        }

        // 7. Dynamic User-Ignited Lantern Factory
        const spawnLantern = () => {
            const group = new THREE.Group();

            // Inner candle flame core
            const flameGeo = new THREE.SphereGeometry(0.18, 8, 8);
            const flameMat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
            });
            const flameMesh = new THREE.Mesh(flameGeo, flameMat);
            flameMesh.position.y = 0.05;
            group.add(flameMesh);

            // Outer paper lantern shell
            const outerGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.8, 6);
            const outerMat = new THREE.MeshStandardMaterial({
                color: 0xffaa22,
                emissive: 0xff6600,
                emissiveIntensity: 1.4,
                roughness: 0.2,
                transparent: true,
                opacity: 0.92,
            });
            const outerMesh = new THREE.Mesh(outerGeo, outerMat);
            group.add(outerMesh);

            // Point light emitting warm aura
            const light = new THREE.PointLight(0xff9900, 2.5, 6, 2);
            light.position.y = 0.1;
            group.add(light);

            // Start near bottom with slight spread
            const startX = (Math.random() - 0.5) * 6;
            const startZ = 8 + (Math.random() - 0.5) * 3;
            group.position.set(startX, -3, startZ);
            group.scale.set(0.9, 0.9, 0.9);

            scene.add(group);

            dynamicLanternsRef.current.push({
                mesh: group,
                light,
                vy: 0.035 + Math.random() * 0.025,
                vx: (Math.random() - 0.5) * 0.015,
                rotSpeed: (Math.random() - 0.5) * 0.02,
                age: 0,
                life: 380, // ~12 seconds at 30 FPS
            });
        };

        spawnLanternTriggerRef.current = spawnLantern;

        // Custom event listener for external triggers (like MemorialList "Light a Candle")
        const handleCustomEvent = () => {
            spawnLantern();
            setLanternCount((prev) => prev + 1);
        };
        window.addEventListener("kuttawaala:light-candle", handleCustomEvent);

        // 8. Performance Observers
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0.05 }
        );
        observer.observe(container);

        const handleVisibilityChange = () => {
            isVisible = document.visibilityState === "visible";
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // 9. Resize Handling
        const handleResize = () => {
            if (!container || !renderer || !camera) return;
            const width = container.clientWidth;
            const height = Math.max(container.clientHeight, 1);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        };
        window.addEventListener("resize", handleResize);

        // 10. Animation Loop (Capped 30 FPS)
        let clockTime = 0;
        const animate = (currentTime: number) => {
            animationFrameId = requestAnimationFrame(animate);

            if (!isVisible) return;

            const elapsed = currentTime - lastFrameTime;
            if (elapsed < TARGET_FRAME_MS) return;
            lastFrameTime = currentTime - (elapsed % TARGET_FRAME_MS);

            clockTime += 0.033;

            // Subtle starlight shimmer
            if (!prefersReducedMotion) {
                stars.rotation.y = clockTime * 0.01;
            }

            // Update Instanced Ambient Lanterns
            for (let i = 0; i < INSTANCE_COUNT; i++) {
                const data = lanternData[i];
                if (!prefersReducedMotion) {
                    data.y += data.vy;
                    data.x += Math.sin(clockTime * data.wobbleSpeed + data.wobblePhase) * 0.006 + data.vx;

                    // Reset when floating out of top view
                    if (data.y > 18) {
                        data.y = -8;
                        data.x = (Math.random() - 0.5) * 26;
                    }
                }

                dummy.position.set(data.x, data.y, data.z);
                dummy.scale.set(data.scale, data.scale, data.scale);
                dummy.rotation.y = clockTime * 0.3 + data.wobblePhase;
                dummy.rotation.z = Math.sin(clockTime * 0.8 + data.wobblePhase) * 0.08;
                dummy.updateMatrix();

                instancedLanterns.setMatrixAt(i, dummy.matrix);
            }
            instancedLanterns.instanceMatrix.needsUpdate = true;

            // Update Dynamic User Lanterns
            const dynamicList = dynamicLanternsRef.current;
            for (let i = dynamicList.length - 1; i >= 0; i--) {
                const item = dynamicList[i];
                item.age += 1;

                if (!prefersReducedMotion) {
                    item.mesh.position.y += item.vy;
                    item.mesh.position.x += item.vx + Math.sin(clockTime * 2 + i) * 0.005;
                    item.mesh.position.z -= 0.01; // drifts gently into distance
                    item.mesh.rotation.y += item.rotSpeed;
                }

                // Fade out near end of life
                if (item.age > item.life - 60) {
                    const factor = (item.life - item.age) / 60;
                    item.light.intensity = 2.5 * factor;
                }

                if (item.age >= item.life || item.mesh.position.y > 22) {
                    scene.remove(item.mesh);
                    dynamicList.splice(i, 1);
                }
            }

            renderer.render(scene, camera);
        };

        animationFrameId = requestAnimationFrame(animate);

        // 11. Cleanup
        return () => {
            if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("kuttawaala:light-candle", handleCustomEvent);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            observer.disconnect();

            // Clean dynamic meshes
            dynamicLanternsRef.current.forEach((item) => scene.remove(item.mesh));
            dynamicLanternsRef.current = [];

            // Dispose Three.js resources
            starGeometry.dispose();
            starMaterial.dispose();
            lanternGeo.dispose();
            lanternMat.dispose();
            renderer.dispose();
        };
    }, [prefersReducedMotion]);

    return (
        <section
            ref={containerRef}
            aria-label="3D Rainbow Bridge Sky Sanctuary"
            className="relative w-full h-[360px] md:h-[460px] overflow-hidden bg-gradient-to-b from-[#070714] via-[#100d28] to-[#1c1335] border-b border-orange-500/20 shadow-2xl flex flex-col justify-between"
        >
            {/* Accessible screen reader notice */}
            <div className="sr-only">
                Interactive 3D Rainbow Bridge sky sanctuary displaying floating lanterns in tribute to departed pets.
            </div>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                role="presentation"
                aria-hidden="true"
                tabIndex={-1}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* Overlay Header Elements */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-wrap items-center justify-between gap-2 w-full pointer-events-auto">
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/20 text-xs md:text-sm text-amber-200">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Sky Sanctuary • <strong>{lanternCount}</strong> Lanterns Floating</span>
                </div>

                <Button
                    onClick={handleSpawnLantern}
                    className="h-10 px-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs md:text-sm shadow-lg shadow-orange-500/25 flex items-center gap-2 border border-white/20 transition-all hover:scale-105 active:scale-95"
                >
                    <Flame className="w-4 h-4 fill-white" />
                    <span>Release a Lantern</span>
                </Button>
            </div>

            {/* Overlay Footer Note */}
            <div className="relative z-10 p-6 text-center text-xs md:text-sm text-zinc-400/90 pointer-events-none drop-shadow">
                <p>Click <strong className="text-amber-300">Release a Lantern</strong> or light a candle below to send love across the Rainbow Bridge 🌈</p>
            </div>
        </section>
    );
}

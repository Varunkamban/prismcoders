"use client";

import {
    motion,
    useTransform,
    useReducedMotion,
    useMotionValue,
    useSpring,
    type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
    { src: "https://cdn.21st.dev/assets/mirror/c3/c3fbd2afa140223999a441b32ed986f61d473930002708df805a81532a326aac.jpg", title: "Chroma I" },
    { src: "https://cdn.21st.dev/assets/mirror/9d/9d8b2f675a5814476ada3736ce439bcda23c5c389e0ebf9b25d8a0c09f3bbcfe.jpg", title: "Prism III" },
    { src: "https://cdn.21st.dev/assets/mirror/8b/8bb738bf2f00d7f7ed3c3ec034adb9938ad38f4be4ac191d632a6a11ad525574.jpg", title: "Ether IV" },
    { src: "https://cdn.21st.dev/assets/mirror/ac/ac5ac700b188d7ef16ee9dab868098b59f15c440db3f71d4e8c03262a3287577.jpg", title: "Quantum V" },
    { src: "https://cdn.21st.dev/assets/mirror/ef/ef25eff6ce655fba459b3b7e7711524dc92499aa18f6c7dbea9a0fcc56a8f908.jpg", title: "Nebula VI" },
    { src: "https://cdn.21st.dev/assets/mirror/f2/f28b370a5dcbf76240f1504579c4b05fc0ff0bb990a42aff8dc2f73a5dc46072.jpg", title: "Cyber VII" },
    { src: "https://cdn.21st.dev/assets/mirror/f2/f26a1eac85704dda924820392dedfb72d51d8261d35354f83b35d683617295f3.jpg", title: "Flux VIII" },
    { src: "https://cdn.21st.dev/assets/mirror/77/7755d23eaaa0aa5b403343f44afa7a29b2d06d3065fe54c602b14ba01d00f2aa.jpg", title: "Aether IX" },
    { src: "https://cdn.21st.dev/assets/mirror/65/657317761fe9058a1d43711b13c543a71eb5199b7a5d9abf4c28479674e39cf7.jpg", title: "Chroma X" },
];

interface TunnelCardData {
    item: { src: string; title: string };
    angleCos: number;
    angleSin: number;
    radiusFactorX: number;
    radiusFactorY: number;
    rotationZ: number;
    index: number;
}

const TUNNEL_CARDS: TunnelCardData[] = IMAGES.map((item, i) => {
    const goldenAngle = i * 137.5 * (Math.PI / 180);
    const radiusFactorX = 0.28 + (i % 3) * 0.08;
    const radiusFactorY = 0.26 + (i % 2) * 0.09;

    return {
        item,
        angleCos: Math.cos(goldenAngle),
        angleSin: Math.sin(goldenAngle),
        radiusFactorX,
        radiusFactorY,
        rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
        index: i,
    };
});

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
    width: number;
    height: number;
    isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING_CONFIG);
    const y = useSpring(rawY, SPRING_CONFIG);

    useEffect(() => {
        if (!enabled) return;
        const onMove = (e: PointerEvent) => {
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    return { x, y };
}

interface TunnelCardProps {
    card: TunnelCardData;
    progress: MotionValue<number>;
    pointer: { x: MotionValue<number>; y: MotionValue<number> };
    total: number;
    stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
    const staggerSpan = 0.55;
    const start = (card.index / total) * (1 - staggerSpan);
    const end = start + staggerSpan;

    const localProgress = useTransform(progress, [start, end], [0, 1]);

    const farZ = stage.isMobile ? -1200 : -1700;
    const nearZ = stage.isMobile ? 350 : 500;
    const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

    const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

    const cardWidth = stage.isMobile
        ? Math.max(130, Math.min(180, stage.width * 0.38))
        : Math.max(180, Math.min(270, stage.width * 0.18));

    const baseX = card.angleCos * (stage.width * card.radiusFactorX);
    const baseY = card.angleSin * (stage.height * card.radiusFactorY);
    const panStrength = stage.isMobile ? 20 : 45;

    const transform = useTransform(
        [z, pointer.x, pointer.y],
        ([currZ, px, py]: number[]) => {
            const offsetX = baseX - px * panStrength;
            const offsetY = baseY - py * panStrength;
            return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
        }
    );

    return (
        <motion.div
            style={{
                width: cardWidth,
                transform,
                opacity,
                zIndex: card.index + 1,
            }}
            className="tunnel-card"
        >
            <div className="tunnel-card-frame">
                <img
                    src={card.item.src}
                    alt={card.item.title}
                    draggable={false}
                />
                <span className="tunnel-card-label">{card.item.title}</span>
            </div>
        </motion.div>
    );
}

export default function PerspectiveTunnelHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    const [stage, setStage] = useState<StageDimensions>({
        width: 1440,
        height: 900,
        isMobile: false,
    });

    useEffect(() => {
        const updateDimensions = () => {
            setStage({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < 768,
            });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const rawProgress = useMotionValue(0);
    const smoothProgress = useSpring(rawProgress, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.0001,
    });
    const sceneProgress = useTransform(smoothProgress, (value) => reduce ? 0.48 : value);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || reduce) return;

        const handleWheel = (e: WheelEvent) => {
            const current = rawProgress.get();
            const delta = e.deltaY * 0.0008;
            const next = Math.min(1, Math.max(0, current + delta));

            if (next === current) {
                return;
            }

            e.preventDefault();
            rawProgress.set(next);
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => el.removeEventListener("wheel", handleWheel);
    }, [rawProgress, reduce]);

    const pointer = useCameraParallax(!reduce);

    const titleScale = useTransform(sceneProgress, [0, 0.5, 1], [0.7, 1, 1.35]);
    const titleOpacity = useTransform(sceneProgress, [0, 0.12, 0.85, 1], [1, 1, 1, 0]);
    const promptOpacity = useTransform(sceneProgress, [0, 0.12], [1, 0]);

    return (
        <div
            ref={containerRef}
            className="perspective-tunnel-hero"
            style={{
                perspective: stage.isMobile ? "900px" : "1200px",
                transformStyle: "preserve-3d",
            }}
        >
            <div className="tunnel-grid" aria-hidden="true" />
            <div className="tunnel-glow" aria-hidden="true" />

            <div className="tunnel-ring tunnel-ring-one" aria-hidden="true" />
            <div className="tunnel-ring tunnel-ring-two" aria-hidden="true" />

            <motion.div
                style={{ scale: titleScale, opacity: titleOpacity }}
                className="tunnel-copy"
            >
                <p className="eyebrow">
                    <span className="status-dot" aria-hidden="true" />
                    Ideas · Code · Reality
                </p>
                <h1>
                    IDEAS INTO
                    <br />
                    DIGITAL REALITY<span>.</span>
                </h1>
                <p className="tunnel-description">
                    We design and develop websites, applications, AI-powered solutions, and business software that help businesses work smarter, serve customers better, and grow with confidence.
                </p>
                <div className="tunnel-actions">
                    <a className="tunnel-cta" href="/contact">
                        Discuss your project <span aria-hidden="true">↗</span>
                    </a>
                    <a className="tunnel-secondary" href="/#services">
                        Explore our services <span aria-hidden="true">↓</span>
                    </a>
                </div>
            </motion.div>

            <motion.div
                style={{ opacity: promptOpacity }}
                className="tunnel-prompt"
            >
                <span>Scroll to explore</span>
                <span className="tunnel-prompt-arrow" aria-hidden="true">↓</span>
            </motion.div>

            <div
                className="tunnel-plane"
                style={{ transformStyle: "preserve-3d" }}
            >
                {TUNNEL_CARDS.map((card, i) => (
                    <TunnelCard
                        key={i}
                        card={card}
                        progress={sceneProgress}
                        pointer={pointer}
                        total={TUNNEL_CARDS.length}
                        stage={stage}
                    />
                ))}
            </div>
        </div>
    );
}

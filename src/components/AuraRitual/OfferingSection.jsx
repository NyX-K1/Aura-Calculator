import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const PHASES = [
    {
        id: 'vow',
        header: "THE RADIANT VOW",
        quote: "Give warmth without asking for the sun's return.",
        task: "Grant a silent compliment to a stranger.",
        color: "#DAA520"
    },
    {
        id: 'root',
        header: "THE SAPPHIRE ANCHOR",
        quote: "Quiet strength is the root of the oldest forest.",
        task: "Protect a small silence for ten breaths.",
        color: "#008080"
    },
    {
        id: 'insight',
        header: "THE INDIGO ECHO",
        quote: "The void is not empty; it is full of potential.",
        task: "Listen to the space between your own thoughts.",
        color: "#4B0082"
    },
    {
        id: 'prism',
        header: "THE PRISMATIC PATH",
        quote: "Every step forward lights the way for another.",
        task: "Commit to one small act of courage today.",
        color: "#8b5cf6"
    }
];

const OfferingSection = ({ isScrollerReady, scrollContainerRef }) => {
    const containerRef = useRef(null);
    const audioRef = useRef(null);
    const lastPlayedIndex = useRef(-1);

    // Native scroll tracking within the parent "Lenis" wrapper context is tricky.
    // However, since we are moving away from GSAP/Lenis, we assume standard scroll
    // OR we hook into the ref passed down.

    // For now, we use standard target ref for useScroll, but since DarkLanding might still use 
    // a scroll wrapper, we need to be careful. 
    // UPDATE: We are removing Lenis from DarkLanding too, so window scroll will work.

    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: scrollContainerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

    useEffect(() => {
        // Audio
        audioRef.current = new Audio('/sounds/bell-chime.wav');
        audioRef.current.volume = 0.2;

        const unsubscribe = smoothProgress.on("change", (v) => {
            // Calculate which section is active (0 to 3)
            const count = PHASES.length;
            const index = Math.floor(v * count);

            // Boundary checks
            const safeIndex = Math.min(Math.max(index, 0), count - 1);

            // Play sound on phase change, ONLY if within bounds
            if (v > 0.01 && v < 0.99) {
                if (safeIndex !== lastPlayedIndex.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(() => { });
                    lastPlayedIndex.current = safeIndex;
                }
            } else {
                // Stop sound if we are fully out of the section
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
                lastPlayedIndex.current = -1; // Reset so it plays again on re-entry
            }
        });

        return () => {
            unsubscribe();
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [smoothProgress]);

    return (
        <section ref={containerRef} className="h-[400vh] w-full relative z-50">

            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* BEAM */}
                <div className="absolute top-0 left-1/2 w-1 h-full -translate-x-1/2 pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-b from-transparent via-white/40 to-transparent shadow-[0_0_30px_rgba(255,255,255,0.3)]"></div>
                </div>

                {PHASES.map((phase, i) => {
                    // Create Opacity Transform for this specific slice
                    // i=0 -> 0 to 0.25
                    // i=1 -> 0.25 to 0.50
                    const start = i / PHASES.length;
                    const end = (i + 1) / PHASES.length;

                    // Small overlap for crossfade
                    const fadeStart = start;
                    const fadeEnd = start + 0.05; // Fade in quickly
                    const exitStart = end - 0.05;
                    const exitEnd = end;

                    // Compute opacity
                    // We use useTransform to map scroll progress to opacity
                    const opacity = useTransform(
                        smoothProgress,
                        // [gap, start, mid, end, exit]
                        [start - 0.1, start, start + 0.1, end - 0.1, end],
                        [0, 1, 1, 1, 0] // Fade Out at end
                    );

                    // Scale effect
                    const scale = useTransform(smoothProgress, [start, end], [0.95, 1.05]);

                    const holyTextClass = `
                        font-playfair text-4xl md:text-6xl font-bold leading-tight mb-8 max-w-3xl pb-2
                        text-transparent bg-clip-text bg-gradient-to-tr from-[#E2E8F0] via-[#FFFFFF] to-[#E2E8F0]
                        drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]
                    `;

                    const animatedBlueGradient = `
                        font-montserrat text-sm md:text-base tracking-widest uppercase max-w-xl mx-auto
                        bg-[length:200%_auto] animate-[gradient_4s_ease_infinite]
                        bg-gradient-to-r from-[#22d3ee] via-[#818cf8] to-[#22d3ee]
                        text-transparent bg-clip-text
                        font-bold
                        drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]
                    `;

                    return (
                        <motion.div
                            key={phase.id}
                            style={{ opacity, scale, display: i === 0 ? 'flex' : undefined }} // Ensure first is visible initially if needed, though opacity handles it
                            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                        >
                            <h2
                                className="font-montserrat text-xs md:text-sm tracking-[0.5em] uppercase mb-8 drop-shadow-lg"
                                style={{ color: phase.color === '#4B0082' ? '#A78BFA' : phase.color }}
                            >
                                {phase.header}
                            </h2>

                            <h1 className={holyTextClass}>
                                {phase.quote}
                            </h1>

                            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8 mx-auto"></div>

                            <p className={animatedBlueGradient}>
                                {phase.task}
                            </p>
                        </motion.div>
                    );
                })}

                <div className="absolute bottom-10 opacity-40 animate-pulse">
                    <p className="font-montserrat text-[10px] tracking-widest text-white/50 uppercase">Scroll to Ascend</p>
                </div>
            </div>
        </section>
    );
};

export default OfferingSection;

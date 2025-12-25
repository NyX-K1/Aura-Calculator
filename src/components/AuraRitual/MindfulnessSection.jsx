import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MindfulnessSection = ({ onEnter }) => {
    const containerRef = useRef(null);
    // Remove state-based animation to prevent "stuck" text on remount.
    // CSS animations are stateless and robust.

    // 2. REPORT VISIBILITY TO PARENT (For Shader Cooldown)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If we are intersecting (visible), call onEnter(true) -> "Mindfulness Mode"
                if (onEnter) onEnter(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [onEnter]);

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 pb-[400px]"
        >
            {/* Styles moved to global CSS */}

            {/* 1. BREATHING GUIDE */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-32">
                {/* Visual Breath (CSS Optimized) */}
                <div
                    className="absolute inset-0 bg-gradient-to-tr from-[#FFD700] to-white rounded-full blur-xl opacity-30 animate-breathe will-change-transform"
                ></div>

                {/* Text Guide - Pure CSS Toggle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="font-playfair font-light text-4xl md:text-5xl text-white transition-all tracking-widest animate-text-inhale"
                        style={{ textShadow: '0 0 20px rgba(255,255,255,0.4)' }}
                    >
                        Inhale
                    </div>
                    <div
                        className="absolute font-playfair font-light text-4xl md:text-5xl text-white transition-all tracking-widest animate-text-exhale"
                        style={{ textShadow: '0 0 20px rgba(255,255,255,0.4)' }}
                    >
                        Exhale
                    </div>
                </div>
            </div>

            {/* 2. THE FINAL VOW */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-center max-w-2xl px-6"
            >
                <p className="font-playfair text-2xl md:text-4xl italic text-white/90 leading-relaxed"
                    style={{ textShadow: '0 0 15px rgba(255,215,0,0.3)' }}
                >
                    "The sanctuary is not a place,<br />but a state of being."
                </p>
            </motion.div>

        </section>
    );
};

export default MindfulnessSection;

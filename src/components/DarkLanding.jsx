import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import UnicornEmbed from './UnicornEmbed';
import AuraForge from './AuraRitual/AuraForge';
import OfferingSection from './AuraRitual/OfferingSection';
import MindfulnessSection from './AuraRitual/MindfulnessSection';
import SigilReveal from './AuraRitual/SigilReveal';

const DarkLanding = ({ onEnter, onResetSession, onNavigateToBrainrot }) => {
    // State
    const [mistIntensity, setMistIntensity] = useState(0.03); // 3% default
    const [sessionKey, setSessionKey] = useState(0); // For resetting AuraForge
    const [isCoolDown, setIsCoolDown] = useState(false); // OPTIMIZATION: Pause WebGL at bottom

    // Updated State to hold full Reveal Data { category, title, fortune }
    const [revealData, setRevealData] = useState(null);

    // Refs
    const wrapperRef = useRef(null);
    const audioRef = useRef(null);

    // Audio Refs
    const singingBowlRef = useRef(null);
    const gongRef = useRef(null);

    useEffect(() => {
        // Initialize Audio
        singingBowlRef.current = new Audio('/singing-bowl.mp3');
        gongRef.current = new Audio('/binaural-gong.mp3');

        if (singingBowlRef.current) singingBowlRef.current.volume = 0.3;
        if (gongRef.current) gongRef.current.volume = 0.5;

        // Basic Sound Interaction (Global Hover)
        const handleMouseOver = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                if (singingBowlRef.current) {
                    singingBowlRef.current.currentTime = 0;
                    singingBowlRef.current.play().catch(e => { });
                }
            }
        };
        window.addEventListener('mouseover', handleMouseOver);

        // --- LENIS SMOOTH SCROLL ---
        const lenis = new Lenis({
            wrapper: wrapperRef.current,
            // duration: 1.2, // Default is usually fine, but can tweak
            smoothWheel: true,
            syncTouch: true, // For touch devices if needed
        });

        // Sync GSAP ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        const update = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);

        // Optional: Disable lag smoothing for instant feedback
        gsap.ticker.lagSmoothing(0);

        return () => {
            window.removeEventListener('mouseover', handleMouseOver);
            lenis.destroy();
            gsap.ticker.remove(update);
        };
    }, []);

    const splitQuote = (text) => {
        return text.split(' ').map((word, i) => (
            <motion.span
                key={i}
                className="word inline-block mr-2"
                variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                }}
            >
                {word}
            </motion.span>
        ));
    };

    const handleMindfulnessVisibility = (isVisible) => {
        setIsCoolDown(isVisible);
    };
    const handleCalculate = (data) => {
        if (gongRef.current) gongRef.current.play().catch(e => { });
        setRevealData(data);
    };

    // Scroll Progress for Hero Animation
    const { scrollYProgress } = useScroll({
        container: wrapperRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress to hero text styles (Replicating the original scrub)
    // GSAP was: start "top top", end "25% top". The page is long, so 0.25 might be too much if total height is huge.
    // Let's approximate: As we scroll the first screen (0 to say 0.1 of total scroll), we animate out.
    // Actually simpler: Calculate based on pixel scroll if possible, but scrollYProgress is easier.
    // If the page is very long (400vh for Offering + others), 0.1 is roughly 40-50vh, which is good.

    const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 3]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const heroRotateX = useTransform(scrollYProgress, [0, 0.1], [0, 45]);
    const heroBlur = useTransform(scrollYProgress, [0, 0.1], ["0px", "10px"]);
    const heroLetterSpacing = useTransform(scrollYProgress, [0, 0.1], ["0em", "1em"]);
    const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -150]);

    return (
        <div
            ref={wrapperRef}
            id="zen-scroll-wrapper"
            className="fixed inset-0 w-full h-full overflow-y-auto overflow-x-hidden bg-gradient-to-b from-slate-950 via-[#0a0a0a] to-[#1e1b4b] selection:bg-emerald-500/30 selection:text-emerald-100 scrollbar-hide"
            style={{
                zIndex: 9999
            }}
        >

            <div className="w-full relative">

                {/* BACKGROUND */}
                <UnicornEmbed active={!isCoolDown} />
                <div className={`fixed inset-0 bg-gradient-to-b from-slate-950 via-[#0a0a0a] to-[#1e1b4b] -z-10 transition-opacity duration-1000 ${isCoolDown ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* SYSTEM BADGE */}
                <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
                    <button className="group backdrop-blur-md bg-white/5 border border-white/10 px-8 py-3 rounded-full flex items-center gap-4 hover:bg-white/10 transition-all duration-500 hover:border-emerald-500/40">
                        <div className="relative">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse relative z-10 shadow-[0_0_10px_#34d399]"></div>
                        </div>
                        <span className="font-mono text-[10px] tracking-widest text-white/50 group-hover:text-emerald-300 transition-colors uppercase">
                            SYSTEM: HARMONIZED // v2.0
                        </span>
                    </button>
                </div>

                {/* HERO SECTION */}
                <section className="relative h-screen flex flex-col items-center justify-center z-10">
                    <div className="text-center px-4 will-change-transform">
                        <motion.h1
                            style={{
                                scale: heroScale,
                                opacity: heroOpacity,
                                rotateX: heroRotateX,
                                filter: heroBlur,
                                letterSpacing: heroLetterSpacing,
                                y: heroY,
                                transformOrigin: "center center"
                            }}
                            className="font-playfair text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-br from-[#FFD700] via-[#FDBA74] to-[#FFFFFF] bg-clip-text text-transparent leading-tight drop-shadow-[0_0_30px_rgba(255,215,0,0.2)] pb-2"
                        >
                            "HARMONIZE<br />YOUR ESSENCE"
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="font-montserrat text-xs tracking-[0.4em] text-orange-200/80 mb-12 uppercase font-semibold text-shadow-sm"
                        >
                            Find clarity in the chaos
                        </motion.p>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]">
                            <span className="font-montserrat text-[10px] tracking-widest text-white/40 uppercase">Scroll to Begin</span>
                            <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-[drop_2s_cubic-bezier(0.77,0,0.175,1)_infinite]"></div>
                            </div>
                        </div>
                    </div>
                </section >

                {/* SECTION 1: THE FORGE */}
                < AuraForge key={sessionKey} onCalculate={handleCalculate} />

                {/* SECTION 2: THE OFFERING */}
                < OfferingSection scrollContainerRef={wrapperRef} />

                {/* SECTION 3: MINDFULNESS VOID */}
                < MindfulnessSection onEnter={handleMindfulnessVisibility} />

                {/* QUOTE SECTION */}
                < section className="relative h-[50vh] flex flex-col items-center justify-center z-10 py-20 pointer-events-none" >
                    <motion.blockquote
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ margin: "-20%" }}
                        transition={{ staggerChildren: 0.1 }}
                        className="font-playfair text-3xl italic text-white/70 max-w-2xl text-center leading-relaxed drop-shadow-md"
                    >
                        {splitQuote('"The universe is within you."')}
                    </motion.blockquote>
                </section >

                {/* FOOTER */}
                < footer className="w-full p-8 flex justify-center gap-8 border-t border-white/5 bg-black/40 backdrop-blur-md z-50 relative" >
                    <button
                        onClick={onNavigateToBrainrot}
                        className="font-montserrat text-[10px] font-bold text-white/60 hover:text-[#FFD700] transition-colors uppercase tracking-widest group relative"
                    >
                        Go to Brainrot Mode
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <button
                        onClick={() => window.open('https://www.instagram.com/relativexmemes', '_blank')}
                        className="font-montserrat text-[10px] font-bold text-white/60 hover:text-[#FFD700] transition-colors uppercase tracking-widest group relative"
                    >
                        Instagram
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <button
                        onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                        className="font-montserrat text-[10px] font-bold text-white/60 hover:text-[#FFD700] transition-colors uppercase tracking-widest group relative"
                    >
                        Contact
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                </footer >

                {/* SIGIL REVEAL PORTAL (Overlay) */}
                {
                    revealData && createPortal(
                        <SigilReveal
                            category={revealData.category}
                            title={revealData.title}
                            fortune={revealData.fortune}
                            onReset={() => {
                                if (onResetSession) {
                                    // Trigger full parent remount if prop provided
                                    onResetSession();
                                } else {
                                    // Fallback Logic
                                    setIsCoolDown(false);
                                    window.scrollTo(0, 0);
                                    requestAnimationFrame(() => {
                                        setRevealData(null);
                                        setSessionKey(prev => prev + 1);
                                    });
                                }
                            }}
                        />,
                        document.body
                    )
                }

            </div >
        </div >
    );
};

export default DarkLanding;

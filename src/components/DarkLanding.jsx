import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import UnicornEmbed from './UnicornEmbed';
import AuraForge from './AuraRitual/AuraForge';
import OfferingSection from './AuraRitual/OfferingSection';
import MindfulnessSection from './AuraRitual/MindfulnessSection';
import SigilReveal from './AuraRitual/SigilReveal';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const DarkLanding = ({ onEnter, onResetSession, onNavigateToBrainrot }) => {
    // Refs for Lenis Scroller
    const wrapperRef = useRef(null);
    const contentRef = useRef(null);
    const heroTextRef = useRef(null);
    const quoteRef = useRef(null);
    const mistRef = useRef(null);

    // State
    const [mistIntensity, setMistIntensity] = useState(0.03); // 3% default
    const [sessionKey, setSessionKey] = useState(0); // For resetting AuraForge
    const [isCoolDown, setIsCoolDown] = useState(false); // OPTIMIZATION: Pause WebGL at bottom
    const [scrollerReady, setScrollerReady] = useState(false); // Ensure child animations wait for Lenis

    // Updated State to hold full Reveal Data { category, title, fortune }
    const [revealData, setRevealData] = useState(null);

    // Audio Refs
    const singingBowlRef = useRef(null);
    const gongRef = useRef(null);

    useEffect(() => {
        // If we are in "Reveal Mode", we DO NOT want Lenis/GSAP running.
        // The cleanup function from the previous render (when revealData was null) will run,
        // destroying the old Lenis instance and reverting GSAP.
        if (revealData) return;

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

        let lenis;
        const updateLenis = (time) => {
            lenis?.raf(time * 1000);
        };

        try {
            if (wrapperRef.current && contentRef.current) {
                lenis = new Lenis({
                    wrapper: wrapperRef.current,
                    content: contentRef.current,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smooth: true,
                    mouseMultiplier: 1,
                    smoothTouch: false,
                });

                // Sync ScrollTrigger with Lenis
                lenis.on('scroll', ScrollTrigger.update);

                // Define Scroller Proxy
                ScrollTrigger.scrollerProxy(wrapperRef.current, {
                    scrollTop(value) {
                        return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
                    },
                    getBoundingClientRect() {
                        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                    }
                });

                // Use GSAP Ticker for Lenis RAF
                gsap.ticker.add(updateLenis);
                gsap.ticker.lagSmoothing(0);

                // Force Refresh to recognize proxy
                ScrollTrigger.refresh();

                // Signal children that Scroller Proxy is ready
                setScrollerReady(true);
            }
        } catch (err) {
            console.error("Lenis init error:", err);
        }

        const ctx = gsap.context(() => {
            // 1. HERO TRANSITION (Morph feel)
            if (heroTextRef.current) {
                gsap.to(heroTextRef.current, {
                    scale: 3,
                    opacity: 0,
                    rotationX: 45, // Tumble
                    transformOrigin: "center center",
                    filter: "blur(10px)",
                    letterSpacing: "1em",
                    y: -150,
                    ease: "power1.in",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        scroller: wrapperRef.current,
                        start: "top top",
                        end: "25% top",
                        scrub: 1.5 // THROTTLED
                    }
                });
            }

            // 2. QUOTE REVEAL
            if (quoteRef.current) {
                const words = quoteRef.current.querySelectorAll('.word');
                gsap.fromTo(words,
                    { opacity: 0, y: 20, filter: "blur(5px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        stagger: 0.1,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: quoteRef.current,
                            scroller: wrapperRef.current,
                            start: "top 80%",
                        }
                    }
                );
            }
        }, contentRef);

        return () => {
            gsap.ticker.remove(updateLenis);
            if (lenis) {
                lenis.destroy();
                lenis.off('scroll', ScrollTrigger.update);
            }
            ctx.revert();
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [revealData]);

    const splitQuote = (text) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-2">{word}</span>
        ));
    };

    const handleMindfulnessVisibility = (isVisible) => {
        setIsCoolDown(isVisible);
    };

    // Updated Handler to accept Data Object
    const handleCalculate = (data) => {
        if (gongRef.current) gongRef.current.play().catch(e => { });
        setRevealData(data); // Expects { category, title, fortune }
    };

    return (
        <div
            ref={wrapperRef}
            id="zen-scroll-wrapper"
            className="fixed inset-0 w-full h-full overflow-y-auto overflow-x-hidden bg-gradient-to-b from-slate-950 via-[#0a0a0a] to-[#1e1b4b] selection:bg-emerald-500/30 selection:text-emerald-100 scrollbar-hide"
            style={{
                zIndex: 9999
            }}
        >

            <div ref={contentRef} className="w-full relative">

                {/* BACKGROUND */}
                <UnicornEmbed active={!isCoolDown} />
                <div className={`fixed inset-0 bg-gradient-to-b from-slate-950 via-[#0a0a0a] to-[#1e1b4b] -z-10 transition-opacity duration-1000 ${isCoolDown ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* ATMOSPHERIC MIST */}
                {/* ATMOSPHERIC MIST - REMOVED FOR PERFORMANCE */}
                {/* <div ref={mistRef}... /> */}

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
                    {/* ... Hero Content ... */}
                    <div ref={heroTextRef} className="text-center px-4 will-change-transform">
                        <h1 className="font-playfair text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-br from-[#FFD700] via-[#FDBA74] to-[#FFFFFF] bg-clip-text text-transparent leading-tight drop-shadow-[0_0_30px_rgba(255,215,0,0.2)] pb-2">
                            "HARMONIZE<br />YOUR ESSENCE"
                        </h1>
                        <p className="font-montserrat text-xs tracking-[0.4em] text-orange-200/80 mb-12 uppercase font-semibold text-shadow-sm">
                            Find clarity in the chaos
                        </p>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]">
                            <span className="font-montserrat text-[10px] tracking-[0.3em] text-white/40 uppercase">Scroll to Begin</span>
                            <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/30 to-white/0 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-[drop_2s_cubic-bezier(0.77,0,0.175,1)_infinite]"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 1: THE FORGE */}
                <AuraForge key={sessionKey} onCalculate={handleCalculate} />

                {/* SECTION 2: THE OFFERING */}
                <OfferingSection isScrollerReady={scrollerReady} scrollContainerRef={wrapperRef} />

                {/* SECTION 3: MINDFULNESS VOID */}
                <MindfulnessSection onEnter={handleMindfulnessVisibility} />

                {/* QUOTE SECTION */}
                <section className="relative h-[50vh] flex flex-col items-center justify-center z-10 py-20 pointer-events-none">
                    <blockquote ref={quoteRef} className="font-playfair text-3xl italic text-white/70 max-w-2xl text-center leading-relaxed drop-shadow-md">
                        {splitQuote('"The universe is within you."')}
                    </blockquote>
                </section>

                {/* FOOTER */}
                <footer className="w-full p-8 flex justify-center gap-8 border-t border-white/5 bg-black/40 backdrop-blur-md z-50 relative">
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
                </footer>

                {/* SIGIL REVEAL PORTAL (Overlay) */}
                {revealData && createPortal(
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
                                if (wrapperRef.current) {
                                    wrapperRef.current.style.scrollBehavior = 'auto';
                                    wrapperRef.current.scrollTop = 0;
                                }
                                window.scrollTo(0, 0);
                                requestAnimationFrame(() => {
                                    setRevealData(null);
                                    setSessionKey(prev => prev + 1);
                                    if (wrapperRef.current) wrapperRef.current.style.scrollBehavior = '';
                                });
                            }
                        }}
                    />,
                    document.body
                )}

            </div>
        </div>
    );
};

export default DarkLanding;

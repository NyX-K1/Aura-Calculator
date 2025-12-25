import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

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
    const contentRef = useRef(null);

    useEffect(() => {
        // WAIT FOR PARENT WRAPPER & PROXY SETUP
        if (!isScrollerReady || !scrollContainerRef?.current) return;

        let ctx;
        try {
            const scrollerTarget = scrollContainerRef.current;

            // Audio Control
            const bell = new Audio('/bell-chime.wav');
            bell.volume = 0.2;

            const playBell = () => {
                bell.currentTime = 0;
                bell.play().catch(() => { });
            };

            const stopBell = () => {
                bell.pause();
                bell.currentTime = 0;
            };

            ctx = gsap.context(() => {
                const rawSections = gsap.utils.toArray('.obsidian-phase');
                const sections = rawSections.filter(el => el !== null && el !== undefined);

                if (sections.length === 0) return;

                // INITIAL STATE
                gsap.set(sections, { opacity: 0 });
                gsap.set(sections[0], { opacity: 1 });

                // MASTER TIMELINE
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        scroller: scrollerTarget,
                        start: "top top",
                        end: `+=${sections.length * 100}%`,
                        pin: true,
                        scrub: 1,
                        onEnter: () => playBell(),       // Start on Enter
                        onLeave: () => stopBell(),       // Stop on Leave
                        onLeaveBack: () => stopBell(),   // Stop on Leave Back
                        onEnterBack: () => playBell()    // Resume/Start on Return
                    }
                });

                // CROSSFADE LOGIC
                sections.forEach((section, i) => {
                    if (i < sections.length - 1) {
                        const nextSection = sections[i + 1];

                        tl.to({}, { duration: 0.2 });

                        tl.to(section, { opacity: 0, duration: 1, ease: "power1.inOut" }, "crossfade" + i)
                            .to(nextSection, {
                                opacity: 1,
                                duration: 1,
                                ease: "power1.inOut",
                                onStart: playBell
                            }, "crossfade" + i);
                    }
                });

                tl.to({}, { duration: 0.5 });

            }, containerRef);

            // Force refresh one last time to ensure pins are calculated against ready scroller
            ScrollTrigger.refresh();

        } catch (e) {
            console.error("Offering Animation Error:", e);
        }

        return () => {
            if (ctx) ctx.revert();
        };
    }, [isScrollerReady, scrollContainerRef]);

    // DESIGN TOKENS

    // 1. HOLY LIGHT TEXT (Whitish + Glow)
    // To be visible on Dark BG, we need: 
    // - Inner bright Gradient
    // - Outer White Glow (Aura)
    const holyTextClass = `
        font-playfair text-4xl md:text-6xl font-bold leading-tight mb-8 max-w-3xl pb-2
        text-transparent bg-clip-text bg-gradient-to-tr from-[#E2E8F0] via-[#FFFFFF] to-[#E2E8F0]
        drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]
    `;

    // 2. CHANGING BLUE GRADIENT (Subtext)
    // Cyan-Blue-Neon animated gradient for dark mode compatibility
    const animatedBlueGradient = `
        font-montserrat text-sm md:text-base tracking-widest uppercase max-w-xl mx-auto
        bg-[length:200%_auto] animate-[gradient_4s_ease_infinite]
        bg-gradient-to-r from-[#22d3ee] via-[#818cf8] to-[#22d3ee]
        text-transparent bg-clip-text
        font-bold
        drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]
    `;

    return (
        <section ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center relative z-50 overflow-hidden">
            {/* INJECT ANIMATION STYLE */}
            <style>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>

            {/* BEAM (Holy Whitish) */}
            {/* Using a "Shadow Beam" basically, creating a shaft of order in chaos */}
            <div className="absolute top-0 left-1/2 w-1 h-full -translate-x-1/2 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-white/40 to-transparent shadow-[0_0_30px_rgba(255,255,255,0.3)]"></div>
            </div>

            <div ref={contentRef} className="relative w-full max-w-4xl h-full flex items-center justify-center">
                {PHASES.map((phase, index) => (
                    <div
                        key={phase.id}
                        className="obsidian-phase absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                        style={{ zIndex: index + 10 }}
                    >
                        {/* HEADER */}
                        <h2
                            className="font-montserrat text-xs md:text-sm tracking-[0.5em] uppercase mb-8 drop-shadow-lg"
                            style={{ color: phase.color === '#4B0082' ? '#A78BFA' : phase.color }} // Brighten Indigo
                        >
                            {phase.header}
                        </h2>

                        {phase.isButton ? (
                            <button className="group relative px-12 py-6 bg-white/5 border border-white/10 rounded-full overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/30 pointer-events-auto">
                                <span className="relative z-10 font-playfair text-2xl md:text-3xl font-black tracking-widest text-white/90 group-hover:text-white transition-colors">
                                    INITIATE
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                            </button>
                        ) : (
                            <>
                                {/* MAIN QUOTE - HOLY LIGHT */}
                                <h1 className={holyTextClass}>
                                    {phase.quote}
                                </h1>

                                {/* SEPARATOR */}
                                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8 mx-auto"></div>

                                {/* TASK - ANIMATED BLUE GRADIENT */}
                                <p className={animatedBlueGradient}>
                                    {phase.task}
                                </p>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="absolute bottom-10 opacity-40 animate-pulse">
                <p className="font-montserrat text-[10px] tracking-widest text-white/50 uppercase">Scroll to Ascend</p>
            </div>
        </section>
    );
};

export default OfferingSection;

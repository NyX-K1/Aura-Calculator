import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const AuraForgeSection = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const titleChars = titleRef.current.querySelectorAll('.char');

        const ctx = gsap.context(() => {
            // Split Text Animation: Letters falling into place
            gsap.fromTo(titleChars,
                {
                    opacity: 0,
                    y: -50,
                    rotateX: 90
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    stagger: 0.05,
                    duration: 1.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    }
                }
            );

            // Form Fade In
            gsap.fromTo(formRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.5,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Split text helper
    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                {char}
            </span>
        ));
    };

    return (
        <section ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 relative z-10">
            <h2 ref={titleRef} className="font-playfair text-6xl md:text-8xl font-bold text-[#1A3021] mb-16 tracking-tighter text-center">
                {splitText("FORGE YOUR RADIANCE")}
            </h2>

            <div ref={formRef} className="w-full max-w-2xl bg-white/30 backdrop-blur-xl border border-white/50 rounded-3xl p-10 shadow-2xl">
                {/* Vibe Slider */}
                <div className="mb-8">
                    <label className="block font-montserrat font-bold text-[#1A3021] mb-4 tracking-widest text-sm">CURRENT VIBE</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        className="w-full h-2 bg-emerald-900/10 rounded-lg appearance-none cursor-pointer accent-[#50C878]"
                    />
                    <div className="flex justify-between font-montserrat text-xs mt-2 opacity-60">
                        <span>Low Frequency</span>
                        <span>High Frequency</span>
                    </div>
                </div>

                {/* Inner Color Picker */}
                <div className="mb-8">
                    <label className="block font-montserrat font-bold text-[#1A3021] mb-4 tracking-widest text-sm">INNER COLOR</label>
                    <div className="flex gap-4">
                        {['#FFD700', '#50C878', '#6366F1', '#EC4899', '#F97316'].map(color => (
                            <button
                                key={color}
                                className="w-10 h-10 rounded-full border-2 border-white/50 shadow-md hover:scale-110 transition-transform focus:ring-2 ring-emerald-900/20"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Recent Act of Kindness */}
                <div className="mb-8">
                    <label className="block font-montserrat font-bold text-[#1A3021] mb-4 tracking-widest text-sm">RECENT ACT OF KINDNESS</label>
                    <textarea
                        className="w-full bg-white/50 border border-white/60 rounded-xl p-4 font-montserrat text-[#1A3021] focus:outline-none focus:ring-2 focus:ring-[#50C878]/50 placeholder:text-gray-500/50"
                        rows="3"
                        placeholder="I watered a stranger's plant..."
                    />
                </div>

                <div className="text-center mt-4">
                    <button className="px-8 py-3 bg-[#1A3021] text-[#FAF9F6] font-montserrat font-bold rounded-full hover:bg-[#50C878] hover:text-white transition-colors tracking-widest shadow-lg">
                        CALCULATE AURA
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AuraForgeSection;

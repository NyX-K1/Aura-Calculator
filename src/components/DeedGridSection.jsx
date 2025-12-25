import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const DeedCard = ({ title, icon }) => (
    <div className="group relative bg-white/40 backdrop-blur-md border border-white/50 p-8 rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-64 flex flex-col justify-center items-center text-center cursor-default">
        {/* Glow Element */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/0 via-yellow-400/0 to-yellow-400/0 group-hover:via-yellow-400/10 transition-colors duration-700" />

        {/* Border Glow */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/30 rounded-2xl transition-colors duration-500" />

        <div className="font-playfair text-4xl mb-4 text-[#1A3021] opacity-80 group-hover:scale-110 transition-transform duration-500">{icon}</div>
        <h3 className="font-montserrat font-bold text-[#1A3021] tracking-widest uppercase mb-2">{title}</h3>
        <p className="font-montserrat text-xs opacity-60 leading-relaxed max-w-[200px]">
            Small waves create infinite ripples in the garden of time.
        </p>
    </div>
);

const DeedGridSection = () => {
    const containerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const cards = gridRef.current.children;

        const ctx = gsap.context(() => {
            gsap.fromTo(cards,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2, // Stagger entry
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 relative z-10">
            <h2 className="font-playfair text-5xl font-bold text-[#1A3021] mb-20 tracking-wide text-center">
                THE OFFERING
            </h2>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                <DeedCard title="Silent Observation" icon="👁️" />
                <DeedCard title="Generous Spirit" icon="✨" />
                <DeedCard title="Mindful Breath" icon="🍃" />
                <DeedCard title="Rooted Presence" icon="🌳" />
            </div>
        </section>
    );
};

export default DeedGridSection;

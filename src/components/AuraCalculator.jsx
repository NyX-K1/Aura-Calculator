import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LotusSVG from './LotusSVG';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const AuraCalculator = () => {
    const containerRef = useRef(null);
    const resultRef = useRef(null);
    const lotusRef = useRef(null);
    const ringRef = useRef(null);

    // Inputs
    const [colorVibe, setColorVibe] = useState('#FFD700');
    const [gratefulness, setGratefulness] = useState(70);
    const [clutter, setClutter] = useState(30);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ELEGANT TRANSITION: "Ethereal Ascend"
            // Smooth, floaty, sophisticated. No bounce.

            gsap.fromTo(containerRef.current,
                {
                    y: 150,
                    opacity: 0,
                    scale: 0.95,
                    filter: "blur(5px)"
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.8,
                    ease: "power2.out", // Soft deceleration
                    scrollTrigger: {
                        trigger: containerRef.current,
                        scroller: document.getElementById('zen-scroll-wrapper'),
                        start: "top 85%",
                    }
                }
            );

            // Lotus Float
            if (lotusRef.current) {
                gsap.to(lotusRef.current, {
                    y: -20,
                    rotation: 3,
                    duration: 6,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }

            // Ring Pulse
            if (ringRef.current) {
                gsap.to(ringRef.current, {
                    scale: 1.05,
                    opacity: 0.1,
                    duration: 4,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                })
            }

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const calculateAura = () => {
        const score = gratefulness - clutter;
        let auraType = "";
        let description = "";

        if (score > 30) {
            auraType = "RADIANT LUMINESCENCE";
            description = "Your spirit is shining bright. You are a beacon of positivity.";
        } else if (score >= -10) {
            auraType = "BALANCED HARMONY";
            description = "You are grounded and stable. A quiet strength resides within.";
        } else {
            auraType = "MISTY INTROSPECTION";
            description = "Your mind is busy. Seek stillness to clear the fog.";
        }

        setResult({ type: auraType, desc: description });

        setTimeout(() => {
            if (resultRef.current) {
                gsap.fromTo(resultRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                );
            }
        }, 10);
    };

    const colors = [
        { hex: '#50C878', name: 'Emerald' },
        { hex: '#FFD700', name: 'Gold' },
        { hex: '#FF4500', name: 'Nebula' },
        { hex: '#6366F1', name: 'Indigo' },
        { hex: '#EC4899', name: 'Rose' },
    ];

    return (
        <section className="w-full py-20 px-4 flex justify-center items-center perspective-[1000px] relative mt-20">

            {/* LOTUS (Absolute RIGHT) */}
            <div ref={lotusRef} className="absolute -right-16 top-10 hidden lg:block opacity-60 z-0 pointer-events-none mix-blend-multiply">
                <LotusSVG color={colorVibe} scale={1} />
            </div>

            {/* DECORATIVE RING - Subtle */}
            <div ref={ringRef} className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-5">
                <div className="w-[700px] h-[700px] border border-[#1A3021] rounded-full" />
            </div>

            {/* MAIN CARD (Redesigned - Tone on Tone Glass) */}
            {/* Changed bg to transparent with heavy blur and same-color tint to blend perfectly */}
            <div
                ref={containerRef}
                className="w-full max-w-2xl bg-[#FAF9F6]/60 backdrop-blur-xl border border-white/50 rounded-[2rem] p-12 shadow-[0_20px_50px_-20px_rgba(26,48,33,0.15)] relative z-10 overflow-hidden"
            >
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />

                <h2 className="font-playfair text-5xl text-[#1A3021] mb-2 text-center font-bold tracking-tight relative z-10">
                    Aura Calibration
                </h2>
                <p className="text-center font-montserrat text-xs tracking-[0.2em] text-[#C2410C] mb-12 uppercase font-medium relative z-10 opacity-80">
                    Align your inner frequencies
                </p>

                {/* 1. Color Vibe */}
                <div className="mb-12 relative z-10">
                    <label className="block text-center font-montserrat font-bold text-[#1A3021] mb-6 tracking-widest text-[10px] uppercase opacity-70">
                        I Resonate With
                    </label>
                    <div className="flex gap-6 justify-center">
                        {colors.map(c => (
                            <button
                                key={c.hex}
                                onClick={() => setColorVibe(c.hex)}
                                className={`w-12 h-12 rounded-full transition-all duration-300 focus:outline-none shadow-sm hover:shadow-md ${colorVibe === c.hex ? 'scale-110 ring-2 ring-[#1A3021]/20 shadow-lg brightness-110' : 'scale-100 hover:scale-105 opacity-80 hover:opacity-100'}`}
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                            />
                        ))}
                    </div>
                </div>

                {/* 2. Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 relative z-10">
                    {/* Gratefulness */}
                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="font-montserrat font-bold text-[#1A3021] tracking-widest text-[10px] uppercase opacity-70">
                                Gratefulness
                            </label>
                            <span className="font-montserrat text-xs font-bold" style={{ color: colorVibe }}>{gratefulness}%</span>
                        </div>
                        <div className="relative h-1.5 bg-[#1A3021]/5 rounded-full">
                            <div
                                className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                                style={{ width: `${gratefulness}%`, backgroundColor: colorVibe }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={gratefulness}
                                onChange={(e) => setGratefulness(Number(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div
                                className="w-4 h-4 bg-white rounded-full shadow border border-gray-100 absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                                style={{ left: `${gratefulness}%`, transform: `translate(-50%, -50%)` }}
                            />
                        </div>
                    </div>

                    {/* Clutter */}
                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="font-montserrat font-bold text-[#1A3021] tracking-widest text-[10px] uppercase opacity-70">
                                Mind Clutter
                            </label>
                            <span className="font-montserrat text-xs font-bold text-[#C2410C]">{clutter}%</span>
                        </div>
                        <div className="relative h-1.5 bg-[#1A3021]/5 rounded-full">
                            <div
                                className="absolute top-0 left-0 h-full rounded-full bg-[#C2410C] transition-all duration-300"
                                style={{ width: `${clutter}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={clutter}
                                onChange={(e) => setClutter(Number(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div
                                className="w-4 h-4 bg-white rounded-full shadow border border-gray-100 absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                                style={{ left: `${clutter}%`, transform: `translate(-50%, -50%)` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center relative z-10">
                    <button
                        onClick={calculateAura}
                        className="group relative px-10 py-4 bg-[#1A3021] text-[#FAF9F6] font-montserrat font-bold rounded-full overflow-hidden shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
                    >
                        <span className="relative z-10 tracking-[0.2em] text-[10px] uppercase">Reveal Aura</span>
                        {/* Subtle shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    </button>
                </div>

                {/* RESULT */}
                {result && (
                    <div ref={resultRef} className="mt-12 p-8 bg-white/40 rounded-xl border border-white/60 text-center shadow-sm relative z-10 backdrop-blur-md">
                        <h3 className="font-playfair text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1A3021] to-[#C2410C] mb-3">
                            {result.type}
                        </h3>
                        <p className="font-montserrat text-xs text-[#1A3021]/70 leading-relaxed uppercase tracking-widest">
                            {result.desc}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AuraCalculator;

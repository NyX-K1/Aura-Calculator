import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import html2canvas from 'html2canvas';

// --- SVG COMPONENTS ---

const GoldSigil = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
        <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FDBA74" />
                <stop offset="100%" stopColor="#FFAA00" />
            </linearGradient>
            <filter id="goldGlow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g stroke="url(#goldGrad)" strokeWidth="2" fill="none" filter="url(#goldGlow)">
            {/* Central Sun/Eye */}
            <circle cx="100" cy="100" r="20" fill="rgba(255, 215, 0, 0.1)" />
            <circle cx="100" cy="100" r="5" fill="#FFD700" />

            {/* Radiating Rays / Petals */}
            {[...Array(8)].map((_, i) => (
                <path
                    key={i}
                    d="M100 80 Q100 50 100 20"
                    transform={`rotate(${i * 45} 100 100)`}
                    strokeLinecap="round"
                />
            ))}
            {[...Array(8)].map((_, i) => (
                <path
                    key={`inner-${i}`}
                    d="M100 70 Q110 60 100 40 Q90 60 100 70"
                    transform={`rotate(${i * 45 + 22.5} 100 100)`}
                    fill="rgba(255,215,0,0.2)"
                />
            ))}

            {/* Outer Ring */}
            <circle cx="100" cy="100" r="60" strokeDasharray="4 4" opacity="0.6" />
            <circle cx="100" cy="100" r="75" strokeWidth="0.5" opacity="0.3" />
        </g>
    </svg>
);

const EmeraldSigil = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(80,200,120,0.8)]">
        <defs>
            <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#50C878" />
                <stop offset="100%" stopColor="#059669" />
            </linearGradient>
        </defs>
        <g stroke="url(#emeraldGrad)" strokeWidth="1.5" fill="none">
            {/* Geometric Crystal Structure */}
            <path d="M100 20 L150 60 L150 140 L100 180 L50 140 L50 60 Z" fill="rgba(80, 200, 120, 0.1)" />
            <path d="M100 20 L100 180" opacity="0.5" />
            <path d="M50 60 L150 60" opacity="0.5" />
            <path d="M50 140 L150 140" opacity="0.5" />
            <path d="M50 60 L100 100 L150 60" />
            <path d="M50 140 L100 100 L150 140" />

            {/* Floating Orbs */}
            <circle cx="100" cy="100" r="10" fill="#50C878" opacity="0.8" />
            <circle cx="100" cy="40" r="3" fill="#50C878" />
            <circle cx="100" cy="160" r="3" fill="#50C878" />

            {/* Outer Frame */}
            <rect x="30" y="30" width="140" height="140" rx="10" transform="rotate(45 100 100)" strokeOpacity="0.3" />
        </g>
    </svg>
);

const IndigoSigil = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(75,0,130,0.8)]">
        <defs>
            <linearGradient id="indigoGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E0B0FF" />
                <stop offset="100%" stopColor="#4B0082" />
            </linearGradient>
            <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
        </defs>
        <g stroke="url(#indigoGrad)" strokeWidth="2" fill="none">
            {/* Abstract Fluid Shapes */}
            <path
                d="M100 30 C 130 30, 160 60, 160 100 C 160 140, 130 170, 100 170 C 70 170, 40 140, 40 100 C 40 60, 70 30, 100 30 Z"
                fill="rgba(75, 0, 130, 0.15)"
            />
            <path
                d="M100 40 C 120 40, 140 70, 140 100 C 140 130, 120 160, 100 160 C 80 160, 60 130, 60 100 C 60 70, 80 40, 100 40 Z"
                strokeOpacity="0.5"
            />

            {/* Eye / Core */}
            <path d="M70 100 Q100 130 130 100 Q100 70 70 100" fill="#4B0082" opacity="0.3" />
            <circle cx="100" cy="100" r="8" fill="#E0B0FF" />

            {/* Dynamic Lines */}
            <path d="M100 10 L100 30" strokeLinecap="round" />
            <path d="M100 170 L100 190" strokeLinecap="round" />
            <path d="M10 100 L30 100" strokeLinecap="round" />
            <path d="M170 100 L190 100" strokeLinecap="round" />
        </g>
    </svg>
);

const sigils = {
    'GOLD': {
        color: '#FFD700',
        glow: 'rgba(255, 215, 0, 0.4)',
        component: <GoldSigil />
    },
    'EMERALD': {
        color: '#50C878',
        glow: 'rgba(80, 200, 120, 0.4)',
        component: <EmeraldSigil />
    },
    'INDIGO': {
        color: '#4B0082',
        glow: 'rgba(75, 0, 130, 0.4)',
        component: <IndigoSigil />
    }
};

// Reusable Content Component
const RevealContent = ({ data, category, title, fortune }) => (
    <div className="flex flex-col items-center justify-center w-full h-full px-8 pb-32">
        {/* 1. REVEAL ASSET */}
        <div className="relative w-[300px] h-[300px] max-h-[40vh] mb-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full blur-[80px] opacity-40" style={{ backgroundColor: data.glow }}></div>
            <motion.div
                className="relative w-full h-full"
                animate={{ scale: [0.90, 1.10] }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror"
                }}
            >
                {data.component}
            </motion.div>
        </div>

        {/* 2. TEXT CONTENT */}
        <div className="max-w-3xl text-center relative z-10">
            <h1
                className="font-playfair text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ color: data.color }}
            >
                {title || category}
            </h1>

            <p
                className="font-playfair text-xl md:text-3xl italic text-white/90 leading-relaxed px-4"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
            >
                "{fortune}"
            </p>
        </div>
    </div>
);

const SigilReveal = ({ category, title, fortune, onReset }) => {
    const catKey = (category || 'INDIGO').toUpperCase();
    const data = sigils[catKey] || sigils['INDIGO'];

    const [mousePos, setMousePos] = useState({ x: -200, y: -200 }); // Start masking offscreen
    const [enableLens, setEnableLens] = useState(true); // Optimization: Disable lens on low power
    const captureRef = useRef(null); // Ref for capturing the sigil
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring for the lens visual
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Optimization Check
        if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
            setEnableLens(false);
        }

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            setMousePos({ x: clientX, y: clientY });
            mouseX.set(clientX - 100);
            mouseY.set(clientY - 100);
        };
        window.addEventListener('mousemove', handleMouseMove);

        const audio = new Audio('/shimmer.wav');
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play failed:", e));

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const handleSaveSigil = async () => {
        if (!captureRef.current) return;
        try {
            const canvas = await html2canvas(captureRef.current, {
                backgroundColor: '#0a0a0a', // Force dark background
                scale: 2, // Retain high quality
                useCORS: true, // Allow loading local images/fonts
                logging: false,
                ignoreElements: (element) => element.classList.contains('exclude-capture') // Exclude UI elements if tagged
            });
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = `Aura_Sigil_${catKey}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Sigil capture failed:", error);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[10000] overflow-hidden h-screen cursor-none bg-gradient-to-b from-slate-950 via-[#0a0a0a] to-[#1e1b4b]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >

            {/* LAYER 1: CAPTURABLE AREA */}
            {/* We capture the Base Layer essentially since it contains the visual info. 
                Optimally, we disable the mask during capture or capture a clone, 
                but capturing this div should work for the main visual content. */}
            <div
                ref={captureRef}
                className="absolute inset-0 flex items-center justify-center bg-transparent"
            >
                {/* For the visual effect of "Reveal", we still need the mask logic on screen,
                    but for capture we might want the full thing.
                    However, `html2canvas` screenshots what is visible.
                    If the user wants to save the *revealed* sigil, they might assume the mask is gone?
                    Or maybe we should just render the content fully for the screenshot? 
                    
                    For now, let's keep the mask logic for interaction. 
                    If the user hits save, they likely want the 'card' content. 
                    The `RevealContent` component renders the sigil and text. 
                    Let's wrap just THAT in the capture ref, but we need to background too.
                    
                    Let's Ref the Wrapper of the RevealContent.
                 */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* We apply the mask here for the 'hidden' effect... */}
                    <div
                        className="absolute inset-0 flex items-center justify-center w-full h-full"
                        style={{
                            // INVERSE MASK: Transparent at circle, Black (Visible) elsewhere
                            maskImage: enableLens ? `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, transparent 100%, black 100%)` : 'none',
                            WebkitMaskImage: enableLens ? `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, transparent 100%, black 100%)` : 'none'
                        }}
                    >
                        <RevealContent data={data} category={category} title={title} fortune={fortune} />
                    </div>
                </div>

                {/* And the Lens Layer... this is complex to screenshot exactly as is.
                     Let's simplify: When capturing, we might want to capture a clear view. 
                     But the user asked to "Save Sigil". 
                     Use a hidden "Print Version" or just screen capture. 
                     Ref-ing the Base Layer (Layer 1) usually captures what's there. 
                     But if it's masked, it will be masked. 
                     
                     Let's add a separate hidden container that has the FULL content unmasked, 
                     and only render it when capturing? 
                     Or easier: Just capture the 'RevealContent' node directly, ignoring the mask wrapper.
                 */}
            </div>

            {/* Actually, let's render a clean unmasked version specifically for the screenshot 
                positioned absolutely but opacity 0 (or z-index behind) if needed? 
                Or better, we just capture `RevealContent` but we need the background color/gradient to look nice.
                
                Let's stick to capturing the `RevealContent` with a dark bg. 
                I will wrap `RevealContent` in the logic below.
            */}

            {/* LAYER 1: BASE LAYER with MASK */}
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    maskImage: enableLens ? `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, transparent 100%, black 100%)` : 'none',
                    WebkitMaskImage: enableLens ? `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, transparent 100%, black 100%)` : 'none'
                }}
            >
                <RevealContent data={data} category={category} title={title} fortune={fortune} />
            </div>

            {/* LAYER 2: LENS LAYER */}
            {enableLens && (
                <div
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    style={{
                        maskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`,
                        transform: `scale(1.15)`,
                        transformOrigin: `${mousePos.x}px ${mousePos.y}px`
                    }}
                >
                    <RevealContent data={data} category={category} title={title} fortune={fortune} />
                </div>
            )}

            {/* HIDDEN CAPTURE LAYER: A clean version exclusively for screenshotting */}
            <div
                ref={captureRef}
                className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-50 flex items-center justify-center bg-slate-950"
            >
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-[#0a0a0a] to-[#1e1b4b]">
                    <RevealContent data={data} category={category} title={title} fortune={fortune} />
                    <div className="absolute bottom-10 font-montserrat text-white/30 text-[10px] tracking-widest uppercase">
                        Aura Calculator
                    </div>
                </div>
            </div>


            {/* LENS UI */}
            <motion.div
                className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full z-[999] pointer-events-none"
                style={{
                    x: springX,
                    y: springY,
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 0 30px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.2)'
                }}
            />

            {/* FOOTER */}
            <motion.div
                className="absolute bottom-0 left-0 w-full p-8 flex justify-center items-center gap-12 border-t border-white/5 bg-black/40 backdrop-blur-md z-[10001] cursor-auto pointer-events-auto"
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ delay: 2 }}
            >
                <button
                    onClick={() => window.open('https://www.instagram.com/relativexmemes', '_blank')}
                    className="font-montserrat text-[10px] font-bold text-white/60 hover:text-[#FFD700] transition-colors uppercase tracking-widest group relative"
                >
                    Instagram
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
                </button>

                <button
                    onClick={handleSaveSigil}
                    className="font-montserrat text-[10px] font-bold text-white/60 hover:text-[#FFD700] transition-colors uppercase tracking-widest group relative"
                >
                    Save Sigil
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
                </button>

                <button
                    onClick={onReset}
                    className="flex items-center gap-2 font-montserrat text-[10px] font-bold text-emerald-400/80 hover:text-emerald-300 transition-colors uppercase tracking-widest group border border-emerald-500/30 px-4 py-2 rounded-full hover:bg-emerald-500/10"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" />
                        <path d="M3 3v9h9" />
                    </svg>
                    Return to Sanctuary
                </button>
            </motion.div>
        </motion.div>
    );
};

export default SigilReveal;

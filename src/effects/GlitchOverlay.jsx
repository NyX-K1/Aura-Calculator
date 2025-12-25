import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlitchOverlay = ({ isVisible }) => {
    // Audio ref (placeholder for now, user can add 'yeet.mp3' later)
    const audioRef = useRef(null);

    useEffect(() => {
        if (isVisible) {
            // Placeholder for audio trigger
            // const audio = new Audio('/sounds/glitch-yeet.mp3');
            // audio.play().catch(e => console.log('Audio autoplay blocked'));
        }
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100000] bg-[#0a0a0a] overflow-hidden pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                >
                    <style>{`
                        @keyframes glitch-anim-1 {
                            0% { clip-path: inset(20% 0 80% 0); transform: translate(-5px, 0); }
                            20% { clip-path: inset(80% 0 1% 0); transform: translate(5px, 0); }
                            40% { clip-path: inset(10% 0 50% 0); transform: translate(-5px, 0); }
                            60% { clip-path: inset(60% 0 30% 0); transform: translate(5px, 0); }
                            80% { clip-path: inset(5% 0 90% 0); transform: translate(-5px, 0); }
                            100% { clip-path: inset(30% 0 10% 0); transform: translate(5px, 0); }
                        }
                        @keyframes glitch-anim-2 {
                            0% { clip-path: inset(10% 0 60% 0); transform: translate(5px, 0); }
                            20% { clip-path: inset(30% 0 20% 0); transform: translate(-5px, 0); }
                            40% { clip-path: inset(70% 0 5% 0); transform: translate(5px, 0); }
                            60% { clip-path: inset(10% 0 80% 0); transform: translate(-5px, 0); }
                            80% { clip-path: inset(50% 0 30% 0); transform: translate(5px, 0); }
                            100% { clip-path: inset(20% 0 40% 0); transform: translate(-5px, 0); }
                        }
                        @keyframes glitch-flash {
                            0%, 100% { background-color: #0a0a0a; filter: hue-rotate(0deg); }
                            50% { background-color: #ff00ff; filter: hue-rotate(90deg); }
                            20%, 80% { background-color: #00ff00; filter: hue-rotate(180deg); }
                        }
                    `}</style>

                    {/* Glitch Layers */}
                    <div className="absolute inset-0 bg-white mix-blend-difference animate-[glitch-flash_0.2s_infinite]"></div>

                    <div
                        className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"
                        style={{ backgroundSize: '200px 200px' }}
                    ></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="font-black text-9xl text-white animate-[glitch-anim-1_0.3s_infinite_linear] opacity-80 mix-blend-hard-light tracking-tighter">
                            LOADING...
                        </h1>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="font-black text-9xl text-cyan-400 animate-[glitch-anim-2_0.3s_infinite_linear_reverse] opacity-80 mix-blend-difference tracking-tighter">
                            LOADING...
                        </h1>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlitchOverlay;

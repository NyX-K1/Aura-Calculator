import { Canvas } from '@react-three/fiber';
import { CameraShake } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkullImage from './SkullImage';
import MemeMarquee from './MemeMarquee';
import CursorTrail from './CursorTrail';
import BrainrotShader from '../effects/BrainrotShader';

const BrainrotSide = ({ onNavigate }) => {
    const [aura, setAura] = useState(1000000);
    const [isHovered, setIsHovered] = useState(false);

    // Independent interactions
    const [counterHover, setCounterHover] = useState(false);
    const [bannerHover, setBannerHover] = useState(false);

    useEffect(() => {
        // Dynamic interval: 1000ms normal, 20ms (RAPID) if hovered
        const decaySpeed = counterHover ? 20 : 1000;

        const interval = setInterval(() => {
            // Decrease by larger chunks if fast? Or just 1 fast? 
            // -10 every 20ms = -500/sec vs -1/sec. Very fast drain.
            const drainAmount = counterHover ? 10 : 1;
            setAura(prev => Math.max(0, prev - drainAmount));
        }, decaySpeed);

        return () => clearInterval(interval);
    }, [counterHover]); // Re-run effect when hover state changes

    const formattedAura = aura.toLocaleString();

    return (
        <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#1A0033] cursor-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onNavigate} // Trigger Brainrot Transition
        >
            {/* Jitter Container on Hover (General) */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                animate={isHovered ? {
                    x: [0, -4, 4, -2, 2, 0],
                    y: [0, 2, -2, 1, -1, 0]
                } : { x: 0, y: 0 }}
                transition={isHovered ? {
                    duration: 0.1,
                    repeat: Infinity,
                    repeatType: "mirror"
                } : { duration: 0 }}
            >
                {/* Meme Banner */}
                <MemeMarquee
                    speed={bannerHover ? 2 : 20}
                    onMouseEnter={() => setBannerHover(true)}
                    onMouseLeave={() => setBannerHover(false)}
                />

                {/* Aura Counter */}
                <div
                    className="absolute top-4 left-4 z-40 pointer-events-auto cursor-none"
                    onMouseEnter={() => setCounterHover(true)}
                    onMouseLeave={() => setCounterHover(false)}
                >
                    <motion.div
                        // If counter is hovered, shake VIOLENTLY
                        animate={counterHover ? {
                            x: [0, -10, 10, -5, 5, 0],
                            y: [0, 5, -5, 10, -10, 0],
                            scale: [1, 1.2, 0.9, 1.1, 1],
                            color: ["#39FF14", "#FF0000", "#39FF14"]
                        } : {
                            opacity: [1, 0.5, 1],
                            x: 0,
                            y: 0
                        }}
                        transition={counterHover ? {
                            duration: 0.2,
                            repeat: Infinity
                        } : {
                            duration: 0.2,
                            repeat: Infinity
                        }}
                        className="text-2xl font-black font-mono tracking-tighter text-[#39FF14] p-4"
                        style={{ textShadow: '0 0 10px #39FF14, 0 0 20px #39FF14' }}
                    >
                        AURA: {formattedAura}
                    </motion.div>
                </div>

                {/* Background Canvas */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Canvas
                        camera={{ position: [0, 0, 5] }}
                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                        resize={{ debounce: 0 }}
                    >
                        <group position={[0, 0, -1]}>
                            <BrainrotShader />
                        </group>
                        <SkullImage />

                        <CameraShake
                            maxYaw={isHovered ? 0.05 : 0}
                            maxPitch={isHovered ? 0.05 : 0}
                            maxRoll={isHovered ? 0.05 : 0}
                            yawFrequency={isHovered ? 0.5 : 0}
                            pitchFrequency={isHovered ? 0.5 : 0}
                            rollFrequency={isHovered ? 0.5 : 0}
                            intensity={1}
                            decay={false}
                            decayRate={0.65}
                        />
                    </Canvas>
                </div>

                {/* CRT Overlay */}
                <div className="absolute inset-0 pointer-events-none z-20 bg-scanlines opacity-30 mix-blend-overlay"></div>

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle,transparent_50%,#000_150%)]"></div>

                {/* Title */}
                <motion.h2
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-purple-400 font-mono text-2xl tracking-widest z-30 glitch-text font-bold"
                    animate={{
                        x: [0, -2, 2, -1, 1, 0],
                        y: [0, 1, -1, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.2,
                        repeatDelay: Math.random() * 2
                    }}
                >
                    BRAINROT
                </motion.h2>
            </motion.div>

            {/* Red & Blue Circles Cursor - Only on Hover */}
            <AnimatePresence>
                {isHovered && <CursorTrail />}
            </AnimatePresence>
        </div>
    );
};

export default BrainrotSide;

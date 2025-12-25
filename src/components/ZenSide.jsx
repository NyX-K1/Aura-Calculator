import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ZenShader from '../effects/ZenShader';
import GoldParticles from '../effects/GoldParticles';
import LotusSVG from './LotusSVG';
import ZenCursor from './ZenCursor';

const ZenSide = ({ onNavigate }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-none" // ADDED cursor-none
            onClick={onNavigate}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Background: Three.js Canvas */}
            <div className="absolute inset-0 z-0 bg-yellow-900">
                <Canvas
                    camera={{ position: [0, 0, 5] }}
                    style={{ width: '100%', height: '100%', position: 'absolute' }}
                    resize={{ debounce: 0 }}
                    dpr={[1, 1.5]} // Performance Optimization: Clamp pixel ratio
                >
                    <ZenShader hoverSpeed={hover ? 1 : 0} />
                    {/* <GoldParticles /> Removed per request earlier to clean up? Or keep? Request said "reduce movement speed". I'll keep them as they are fine/subtle. */}
                    <ZenCursor />
                </Canvas>
            </div>

            {/* Content */}
            <motion.div
                className="z-20 pointer-events-none"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <LotusSVG />
            </motion.div>

            <motion.h2
                className="absolute bottom-10 text-[#FFD700] font-serif text-2xl tracking-[0.5em] z-20 opacity-80 pointer-events-none"
                style={{ letterSpacing: '0.2em', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
                ZEN
            </motion.h2>
        </div>
    );
};

export default ZenSide;

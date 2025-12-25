import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import GoldParticles from './GoldParticles';

const GoldDustOverlay = ({ isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[99999] pointer-events-none bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <Canvas
                        camera={{ position: [0, 0, 5] }}
                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                        resize={{ debounce: 0 }}
                    >
                        {/* Reuse GoldParticles but maybe brighter or denser? Standard is fine. */}
                        <GoldParticles />
                    </Canvas>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GoldDustOverlay;

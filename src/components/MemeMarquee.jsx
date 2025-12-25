import { motion } from 'framer-motion';

const MemeMarquee = ({ speed = 20, onMouseEnter, onMouseLeave }) => {
    // Keywords: SKIBIDI, FANUM TAX, MOGGING, OHIO, RIZZ, GOAT, SIGMA, DELULU
    const content = "SKIBIDI   FANUM TAX   MOGGING   OHIO   RIZZ   GOAT   SIGMA   DELULU   -1000 AURA   WHAT THE SIGMA   GYATT   KAICENAT   ";

    return (
        // Added pointer-events-auto to enable hover on this specific element
        <div
            className="absolute top-0 left-0 w-full overflow-hidden py-2 bg-purple-900/50 z-10 border-b border-purple-500/30 rotate-3 scale-110 pointer-events-auto cursor-none"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <motion.div
                className="whitespace-nowrap flex"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: speed, // Lower duration = faster speed
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Duplicate content enough times to fill screen + scroll */}
                {Array(20).fill(content).map((text, i) => (
                    <span key={i} className="text-purple-300 font-mono text-lg mx-4">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default MemeMarquee;

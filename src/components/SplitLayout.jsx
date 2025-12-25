import { useState } from 'react';
import { motion } from 'framer-motion';

const SplitLayout = ({ left, right }) => {
    const [hovered, setHovered] = useState(null); // 'left' | 'right' | null
    const [expanded, setExpanded] = useState(null); // 'left' | 'right' | null

    // Determine widths based on expanded state first, then hover state
    const getWidths = () => {
        if (expanded === 'left') return { left: '100%', right: '0%' };
        if (expanded === 'right') return { left: '0%', right: '100%' };

        if (hovered === 'left') return { left: '70%', right: '30%' };
        if (hovered === 'right') return { left: '30%', right: '70%' };

        return { left: '50%', right: '50%' }; // Default
    };

    const widths = getWidths();

    const transition = {
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 1
    };

    const handleLeftClick = () => {
        console.log('Navigate to Rot');
        setExpanded('left');
    };

    const handleRightClick = () => {
        console.log('Navigate to Zen');
        setExpanded('right');
    };

    return (
        <div className="flex w-full h-screen overflow-hidden bg-black relative">
            {/* Left Side (Brainrot) */}
            <motion.div
                initial={false}
                animate={{ width: widths.left }}
                transition={transition}
                className="h-full relative z-0 overflow-hidden"
                onMouseEnter={() => !expanded && setHovered('left')}
                onMouseLeave={() => !expanded && setHovered(null)}
                onClick={handleLeftClick}
            >
                {left}
            </motion.div>

            {/* Central Divider - Hide when expanded */}
            <motion.div
                className="w-1 bg-[#FFD700] h-full absolute z-50 shadow-[0_0_15px_#FFD700]"
                initial={false}
                animate={{
                    left: widths.left,
                    opacity: expanded ? 0 : 1
                }}
                transition={transition}
            />

            {/* Right Side (Zen) */}
            <motion.div
                initial={false}
                animate={{ width: widths.right }}
                transition={transition}
                className="h-full relative z-0 overflow-hidden"
                onMouseEnter={() => !expanded && setHovered('right')}
                onMouseLeave={() => !expanded && setHovered(null)}
                onClick={handleRightClick}
            >
                {right}
            </motion.div>
        </div>
    );
};

export default SplitLayout;

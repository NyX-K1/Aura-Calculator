import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorTrail = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            <motion.div
                className="w-8 h-8 rounded-full border-2 border-red-500 absolute"
                animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
                style={{ mixBlendMode: 'screen' }}
            />
            <motion.div
                className="w-8 h-8 rounded-full border-2 border-cyan-500 absolute"
                animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }} // Lagging
                style={{ mixBlendMode: 'screen' }}
            />
        </div>
    );
};

export default CursorTrail;
